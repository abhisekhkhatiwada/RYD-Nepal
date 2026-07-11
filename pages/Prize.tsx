import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Trophy, Gift, Calendar, Clock, MapPin, Bell, ThumbsUp, MessageCircle, Users,
  CheckCircle, Facebook, Instagram, Sparkles, ArrowRight, Award, Hourglass, ExternalLink,
} from 'lucide-react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';
import tiesheet from '../data/tiesheet.json';

const SEO_TITLE = 'FIFA World Cup 2026 Predict & Win — Prizes, Bracket & Winners | RYD Nepal';
const SEO_DESCRIPTION =
  'Every FIFA World Cup 2026 knockout match with Nepal-time kickoff, live bracket, prizes and winners. Win Rs. 500–3,000 per match plus a Rs. 20,000 bumper. Free entry.';

// RYD Nepal's official Facebook page — used as the fallback when a match's
// specific prediction post URL hasn't been added yet.
const FB_PAGE = 'https://www.facebook.com/rydnp2025';

// ── Campaign data ────────────────────────────────────────────────────────────
// Kickoff times are Nepal Time (NPT = ET + 9:45), converted from the official
// FIFA World Cup 2026 schedule. To wire a match to its Facebook prediction post,
// paste the post URL into `postUrl` (clicking the card then opens that post).
// When a fixture with "/" teams is confirmed, replace `teams` with the final
// matchup and flip `status` to 'open'. To publish a result, fill `winners` and
// set `status: 'finished'`.
type Status = 'finished' | 'open' | 'upcoming';

interface Match {
  id: string;
  stage: string;
  stageNe: string;
  teams: string;        // e.g. "Canada vs Morocco"
  venue: string;        // host city + stadium
  venueNe: string;
  date: string;         // Nepal-time date
  dateNe: string;
  time: string;         // Nepal-time kickoff
  timeNe: string;
  prize: string;        // per-match prize
  prizeNe: string;
  detail: string;       // what to predict
  detailNe: string;
  status: Status;
  postUrl: string;      // Facebook prediction post — '' falls back to FB_PAGE
  winnerTeam?: string;  // country that won the match (must match a COUNTRY key)
  /** Announced RYD cash winners. Plain string, or { name, url } to link the
   *  winner's Facebook / Instagram / TikTok profile:
   *  "winners": ["Ram B.", { "name": "Sita KC", "url": "https://facebook.com/sita.kc" }] */
  winners: (string | { name: string; url?: string })[];
  sources?: [string, string]; // ids of the two matches whose winners feed this one (bracket)
  score?: [string, string];   // final score per slot, e.g. ['2 (4)', '2 (2)'] for a shootout
}

// Campaign data lives in data/tiesheet.json so the auto-update script
// (scripts/update-tiesheet.mjs, run daily by GitHub Actions) and prerender.mjs
// share one source of truth. Edit that file to add RYD cash-winner names and
// Facebook post URLs — everything match-related updates itself.
const MATCHES = tiesheet.matches as Match[];

// Country name → ISO code for the self-hosted flags in public/images/flags/
// (80px PNGs from flagcdn.com; England uses the subdivision code). When a new
// country reaches the knockouts, download its flag there and add it here.
const COUNTRY: Record<string, string> = {
  Canada: 'ca', Morocco: 'ma', Paraguay: 'py', France: 'fr', Brazil: 'br',
  Norway: 'no', Mexico: 'mx', England: 'gb-eng', Spain: 'es', Portugal: 'pt',
  USA: 'us', Belgium: 'be', Australia: 'au', Egypt: 'eg', Argentina: 'ar',
  'Cape Verde': 'cv', Switzerland: 'ch', Colombia: 'co', Ghana: 'gh',
};

// A flag chip. Unknown / undecided teams render a "TBD" placeholder.
// The country name shows as a native tooltip on hover.
const Flag: React.FC<{ name?: string; className?: string }> = ({ name, className }) => {
  const size = className ?? 'w-7 h-5';
  const code = name ? COUNTRY[name] : undefined;
  if (code) {
    return (
      <img
        src={`/images/flags/${code}.png`}
        width={80}
        height={53}
        alt={name}
        title={name}
        loading="lazy"
        className={`${size} rounded-[3px] object-cover ring-1 ring-black/10`}
      />
    );
  }
  return (
    <span
      title="To be decided"
      aria-label="To be decided"
      className={`${size} inline-flex items-center justify-center rounded-[3px] bg-slate-200 text-[9px] font-bold text-slate-400`}
    >
      TBD
    </span>
  );
};

// Split a "A vs B" fixture into two flag slots; "/" alternates or "TBD" → undecided.
const parseSlots = (teams: string): (string | undefined)[] => {
  const norm = (s?: string) => {
    const t = s?.trim();
    return !t || t.includes('/') || t === 'TBD' ? undefined : t;
  };
  const [a, b] = teams.split(' vs ');
  return [norm(a), norm(b)];
};

// The country that won a given match (only set once status is 'finished').
const winnerOf = (list: Match[], id?: string): string | undefined =>
  id ? list.find((m) => m.id === id)?.winnerTeam : undefined;

// Resolve a fixture's display name. Later-round matches list 'TBD vs TBD' until
// confirmed, but as soon as both feeder matches have a winner we can name the
// matchup — real team names are what fans (and search engines) look for.
const fixture = (list: Match[], m: Match): string => {
  if (!m.sources) return m.teams;
  const [a, b] = m.sources.map((id) => winnerOf(list, id));
  if (a || b) return `${a ?? 'TBD'} vs ${b ?? 'TBD'}`;
  return m.teams;
};

// "July 4, 2026" + "10:45 PM" → ISO 8601 in Nepal Time (+05:45) for SportsEvent
// schema. Returns date-only when the kickoff is still TBC.
const MONTH_NUM: Record<string, string> = {
  January: '01', February: '02', March: '03', April: '04', May: '05', June: '06',
  July: '07', August: '08', September: '09', October: '10', November: '11', December: '12',
};
const isoKickoff = (m: Match): string | undefined => {
  const d = m.date.match(/^(\w+) (\d+), (\d+)$/);
  if (!d || !MONTH_NUM[d[1]]) return undefined;
  const day = `${d[3]}-${MONTH_NUM[d[1]]}-${d[2].padStart(2, '0')}`;
  const t = m.time.match(/^(\d+):(\d+) (AM|PM)$/);
  if (!t) return day;
  let h = parseInt(t[1], 10) % 12;
  if (t[3] === 'PM') h += 12;
  return `${day}T${String(h).padStart(2, '0')}:${t[2]}:00+05:45`;
};

// SportsEvent list for every knockout fixture whose teams are known.
// prerender.mjs derives the identical list from data/tiesheet.json at build
// time, so the crawler-facing copy stays in sync automatically.
const eventsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'FIFA World Cup 2026 Knockout Matches — RYD Predict & Win',
  itemListElement: MATCHES.filter((m) => !fixture(MATCHES, m).includes('TBD')).map((m, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'SportsEvent',
      name: `FIFA World Cup 2026 ${m.stage}: ${fixture(MATCHES, m)}`,
      startDate: isoKickoff(m),
      location: { '@type': 'Place', name: m.venue },
      url: 'https://www.rydnepal.com/prize',
    },
  })),
};

// Bilingual FAQ. English q/a feed the FAQPage schema (kept in sync with the
// /prize entry in prerender.mjs); qNe/aNe render in the Nepali view.
const FAQ: { q: string; a: string; qNe: string; aNe: string }[] = [
  {
    q: 'How do I enter the RYD Predict & Win contest for a World Cup 2026 match?',
    a: 'Four steps on the match prediction post: follow RYD Nepal on Facebook, Instagram, or TikTok, like the post, comment which team will win, and tag 2 friends. Entry is free and takes about 30 seconds per match.',
    qNe: 'विश्वकप २०२६ को खेलमा RYD Predict & Win मा कसरी भाग लिने?',
    aNe: 'म्याच प्रेडिक्सन पोस्टमा चार चरण: फेसबुक, इन्स्टाग्राम वा टिकटकमा RYD Nepal फलो गर्नुहोस्, पोस्ट लाइक गर्नुहोस्, कुन टोली जित्छ कमेन्ट गर्नुहोस्, र २ साथी ट्याग गर्नुहोस्। निःशुल्क — हरेक खेलमा करिब ३० सेकेन्ड।',
  },
  {
    q: 'What time are the FIFA World Cup 2026 knockout matches in Nepal?',
    a: 'Most knockout matches kick off late night or early morning Nepal Time (NPT), roughly between 9:45 PM and 5:45 AM, because the tournament is hosted in the USA, Canada, and Mexico. Every match card on this page shows the exact Nepal-time kickoff.',
    qNe: 'फिफा विश्वकप २०२६ का नकआउट खेल नेपाली समयअनुसार कति बजे हुन्छन्?',
    aNe: 'प्रतियोगिता अमेरिका, क्यानडा र मेक्सिकोमा भइरहेकाले धेरैजसो नकआउट खेल नेपाली समयअनुसार राति ९:४५ देखि बिहान ५:४५ बीच सुरु हुन्छन्। यो पेजका हरेक म्याच कार्डमा नेपाल समयको ठ्याक्कै किकअफ देखिन्छ।',
  },
  {
    q: 'How much can I win on each World Cup 2026 match?',
    a: 'Every knockout match pays 2 lucky winners: Rs. 500 each in the Round of 16, Rs. 1,000 each in the quarter-finals, Rs. 2,000 each in the semi-finals, and Rs. 3,000 each for the final. Predicting all 7 big results (4 quarter-finals, 2 semi-finals, and the final) wins the Rs. 20,000 bumper prize.',
    qNe: 'विश्वकप २०२६ को हरेक खेलमा कति जित्न सकिन्छ?',
    aNe: 'हरेक नकआउट खेलमा २ भाग्यशाली विजेता: राउन्ड अफ १६ मा रु. ५००/व्यक्ति, क्वाटर फाइनलमा रु. १,०००, सेमी फाइनलमा रु. २,००० र फाइनलमा रु. ३,०००। सबै ७ ठूला नतिजा (४ क्वाटर फाइनल, २ सेमी फाइनल र फाइनल) मिलाउनेले रु. २०,००० बम्पर जित्छ।',
  },
  {
    q: 'Where are the RYD Predict & Win winners announced?',
    a: 'Winners are announced on RYD Nepal\'s official Facebook, Instagram, and TikTok pages after each match, and this page is updated with the result, score, and winner names — so you can always check back here.',
    qNe: 'RYD Predict & Win का विजेता कहाँ घोषणा हुन्छन्?',
    aNe: 'हरेक खेलपछि RYD Nepal का आधिकारिक फेसबुक, इन्स्टाग्राम र टिकटक पेजमा विजेता घोषणा हुन्छ, र यही पेजमा नतिजा, स्कोर र विजेताको नाम अपडेट गरिन्छ — जहिले पनि यहाँ फर्केर हेर्न सकिन्छ।',
  },
  {
    q: 'Is the contest free? Do I need to be an RYD rider to participate?',
    a: 'Completely free, and no — anyone in Nepal with a Facebook, Instagram, or TikTok account can enter. You never pay anything to participate. If the World Cup inspires you to start earning, RYD Nepal rents bikes from Rs. 700/day for Pathao, InDrive, Yango, and Uber Bike.',
    qNe: 'के प्रतियोगिता निःशुल्क छ? भाग लिन RYD राइडर हुनुपर्छ?',
    aNe: 'पूर्ण निःशुल्क, र होइन — फेसबुक, इन्स्टाग्राम वा टिकटक अकाउन्ट भएका नेपालका जो कोहीले भाग लिन सक्छन्। भाग लिन केही तिर्नु पर्दैन। विश्वकपले कमाउने जोश जगायो भने RYD Nepal ले पाठाओ, इनड्राइभ, यांगो र उबर बाइकका लागि दिनको रु. ७०० देखि बाइक भाडामा दिन्छ।',
  },
];

// One team's line in the bracket: country, its score, and whether it advanced.
interface BracketSlot { name?: string; score?: string; won: boolean }
type BracketMatch = [BracketSlot, BracketSlot];

// Bracket rows for a column. Round of 16 fills from its fixtures; later rounds
// auto-advance from the winners of the two matches named in `sources`, so
// setting `winnerTeam`/`score` on a match flows straight up into the bracket.
const bracketMatches = (list: Match[], column: Match[]): BracketMatch[] =>
  column.map((m) => {
    const names = m.sources ? m.sources.map((id) => winnerOf(list, id)) : parseSlots(m.teams);
    return [0, 1].map((i) => ({
      name: names[i],
      score: m.score?.[i],
      won: !!(names[i] && names[i] === m.winnerTeam),
    })) as BracketMatch;
  });

// Column order is derived by walking DOWN from the final through `sources`, so
// adjacent pairs always sit next to the match they feed and the connector
// lines are correct. (The tie sheet JSON keeps matches in kickoff order, which
// is NOT bracket order — e.g. Spain vs Belgium kicked off before Norway vs
// England but feeds the other semi-final.)
const buildBracket = (list: Match[]): { label: string; labelNe: string; matches: BracketMatch[] }[] => {
  const feeders = (round: Match[]): Match[] =>
    round
      .flatMap((m) => m.sources ?? [])
      .map((id) => list.find((x) => x.id === id))
      .filter((m): m is Match => !!m);
  const final = list.filter((m) => m.stage === 'Final');
  const semis = feeders(final);
  const quarters = feeders(semis);
  const r16 = feeders(quarters);
  return [
    { label: 'Round of 16', labelNe: 'राउन्ड अफ १६', matches: bracketMatches(list, r16) },
    { label: 'Quarter Finals', labelNe: 'क्वाटर फाइनल', matches: bracketMatches(list, quarters) },
    { label: 'Semi Finals', labelNe: 'सेमी फाइनल', matches: bracketMatches(list, semis) },
    { label: 'Final', labelNe: 'फाइनल', matches: bracketMatches(list, final) },
  ];
};

const STAGE_ORDER = ['Round of 16', 'Quarter Final', 'Semi Final', 'Final'];

// ── Live tie sheet (auto-fetch) ──────────────────────────────────────────────
// ESPN's public World Cup scoreboard keeps fixtures, Nepal-time kickoffs,
// venues, scores, and match winners current automatically — only the RYD
// cash-winner names in MATCHES need manual editing. If the fetch fails
// (offline, API changed), the static MATCHES data above still renders, and it
// is also what crawlers see in the prerendered HTML either way.
const SCOREBOARD_URL =
  'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260704-20260721';

const STAGE_SLUG: Record<string, string> = {
  'Round of 16': 'round-of-16',
  'Quarter Final': 'quarterfinals',
  'Semi Final': 'semifinals',
  Final: 'final',
};

// ESPN display names → the short names used in COUNTRY / MATCHES.
const TEAM_ALIAS: Record<string, string> = { 'United States': 'USA' };
const shortName = (n: string) => TEAM_ALIAS[n] ?? n;
// "Quarterfinal 4 Winner", "TBD", … — ESPN placeholders for unresolved fixtures.
const isPlaceholder = (n: string) => /winner|loser|tbd/i.test(n);

const NE_DIGIT = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
const neDigits = (s: string) => s.replace(/\d/g, (d) => NE_DIGIT[+d]);
const NE_MONTH: Record<string, string> = {
  January: 'जनवरी', February: 'फेब्रुअरी', March: 'मार्च', April: 'अप्रिल', May: 'मे', June: 'जुन',
  July: 'जुलाई', August: 'अगस्ट', September: 'सेप्टेम्बर', October: 'अक्टोबर', November: 'नोभेम्बर', December: 'डिसेम्बर',
};

// Format a UTC kickoff in Nepal Time, in both languages. Field names match
// Match so the result can be Object.assign-ed onto a match.
const nptStrings = (iso: string) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kathmandu', month: 'long', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  }).formatToParts(new Date(iso));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const ampm = get('dayPeriod').toUpperCase();
  const h24 = (parseInt(get('hour'), 10) % 12) + (ampm === 'PM' ? 12 : 0);
  const period = h24 < 4 ? 'राति' : h24 < 12 ? 'बिहान' : h24 < 16 ? 'दिउँसो' : h24 < 19 ? 'साँझ' : 'राति';
  return {
    date: `${get('month')} ${get('day')}, ${get('year')}`,
    time: `${get('hour')}:${get('minute')} ${ampm}`,
    dateNe: `${NE_MONTH[get('month')] ?? get('month')} ${neDigits(get('day'))}, ${neDigits(get('year'))}`,
    timeNe: `${period} ${neDigits(`${get('hour')}:${get('minute')}`)}`,
  };
};

interface LiveMatch {
  stageSlug: string;
  when: string;                    // kickoff, UTC ISO
  venue?: string;                  // "City · Stadium"
  completed: boolean;
  names: string[];                 // both teams (short names, may be placeholders)
  scores: Record<string, string>;  // team → "2" or "0 (4)" after a shootout
  winner?: string;
}

// One ESPN scoreboard event → the bits we merge. Returns null on shape changes.
const parseLive = (ev: any): LiveMatch | null => {
  try {
    const comp = ev.competitions[0];
    const teams = comp.competitors.map((c: any) => ({
      name: shortName(c.team.displayName),
      score: c.shootoutScore != null ? `${c.score} (${c.shootoutScore})` : `${c.score ?? ''}`,
      winner: !!c.winner,
    }));
    const city = comp.venue?.address?.city?.split(',')[0];
    return {
      stageSlug: ev.season?.slug ?? '',
      when: ev.date,
      venue: comp.venue?.fullName ? `${city ? `${city} · ` : ''}${comp.venue.fullName}` : undefined,
      completed: !!comp.status?.type?.completed,
      names: teams.map((t: { name: string }) => t.name),
      scores: Object.fromEntries(teams.map((t: { name: string; score: string }) => [t.name, t.score])),
      winner: teams.find((t: { winner: boolean }) => t.winner)?.name,
    };
  } catch {
    return null;
  }
};

// Merge live data into the static campaign data. Stages are processed in
// bracket order so a quarter-final winner immediately resolves the semi-final
// fixture it feeds. Events are matched by team names when the fixture is
// known, falling back to kickoff order within the stage.
const mergeLive = (base: Match[], events: any[]): Match[] => {
  const live = events.map(parseLive).filter((e): e is LiveMatch => !!e);
  const out = base.map((m) => ({ ...m }));
  const used = new Set<LiveMatch>();
  for (const stage of STAGE_ORDER) {
    const ours = out.filter((m) => m.stage === stage);
    const theirs = live
      .filter((e) => e.stageSlug === STAGE_SLUG[stage])
      .sort((x, y) => x.when.localeCompare(y.when));
    ours.forEach((m, i) => {
      const slots = m.sources ? m.sources.map((id) => winnerOf(out, id)) : parseSlots(m.teams);
      const known = slots.every(Boolean);
      const ev =
        theirs.find((e) => !used.has(e) && known && (slots as string[]).every((n) => e.names.includes(n))) ??
        (!used.has(theirs[i]) ? theirs[i] : undefined);
      if (!ev) return;
      used.add(ev);
      // Slot order: our bracket order when the fixture is known, else ESPN's.
      const [a, b] = known
        ? (slots as string[])
        : ev.names.some(isPlaceholder) ? [undefined, undefined] : ev.names;
      if (a && b) m.teams = `${a} vs ${b}`;
      Object.assign(m, nptStrings(ev.when));
      if (ev.venue && ev.venue !== m.venue) {
        m.venue = ev.venue;
        m.venueNe = ev.venue; // stadium names stay in Latin script
      }
      if (ev.completed && a && b) {
        m.status = 'finished';
        m.winnerTeam = ev.winner;
        m.score = [ev.scores[a] ?? '', ev.scores[b] ?? ''];
      } else if (m.status === 'upcoming' && a && b) {
        m.status = 'open';
      }
    });
  }
  return out;
};

// [Icon, titleEn, descEn, titleNe, descNe]
const STEPS: [React.ComponentType<{ className?: string }>, string, string, string, string][] = [
  [Bell, 'Follow the page', 'Follow RYD Nepal on Facebook, Instagram, or TikTok — wherever you saw the match post.', 'पेज फलो गर्नुहोस्', 'फेसबुक, इन्स्टाग्राम वा टिकटकमा RYD Nepal फलो गर्नुहोस् — जहाँ म्याच पोस्ट देख्नुभयो।'],
  [ThumbsUp, 'Like the post', 'Like the match prediction post so your entry counts.', 'पोस्ट लाइक गर्नुहोस्', 'म्याच प्रेडिक्सन पोस्टमा लाइक गर्नुहोस् — इन्ट्री गनिनको लागि।'],
  [MessageCircle, 'Comment the winner', 'Comment which team you think will win that match.', 'विजेता कमेन्ट गर्नुहोस्', 'त्यो खेलमा कुन टोली जित्छ कमेन्टमा लेख्नुहोस्।'],
  [Users, 'Tag 2 friends', 'Tag 2 friends in your comment. That’s your entry — done in 30 seconds.', '२ साथी ट्याग गर्नुहोस्', 'कमेन्टमा २ जना साथीलाई ट्याग गर्नुहोस्। ३० सेकेन्डमा तपाईंको इन्ट्री पूरा।'],
];

const statusMeta: Record<Status, { en: string; ne: string; cls: string }> = {
  finished: { en: 'Winners announced', ne: 'विजेता घोषित', cls: 'bg-emerald-100 text-emerald-700' },
  open: { en: 'Prediction open', ne: 'प्रेडिक्सन खुला', cls: 'bg-primary/10 text-primary' },
  upcoming: { en: 'Coming up', ne: 'आउँदै', cls: 'bg-slate-100 text-slate-500' },
};

const Prize: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ne'>('en');
  const en = lang === 'en';

  // Static campaign data, upgraded in place once the live tie sheet arrives.
  const [matches, setMatches] = useState<Match[]>(MATCHES);
  useEffect(() => {
    const ctrl = new AbortController();
    fetch(SCOREBOARD_URL, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => setMatches(mergeLive(MATCHES, data?.events ?? [])))
      .catch(() => { /* static data remains the fallback */ });
    return () => ctrl.abort();
  }, []);

  useSEO({
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    keywords:
      'FIFA World Cup 2026 prediction Nepal, world cup 2026 schedule Nepal time, world cup 2026 bracket, FIFA 2026 knockout results, predict and win Nepal, RYD predict and win, world cup prediction contest Nepal, world cup 2026 quarter final Nepal time, RYD Nepal giveaway prize, win cash Nepal world cup',
    path: '/prize',
    ogTitle: 'FIFA World Cup 2026: Predict Every Match. Win Up to Rs. 20,000 Cash.',
    ogDescription: SEO_DESCRIPTION,
    ogImage: 'https://www.rydnepal.com/og/predict-win-worldcup.jpg',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://www.rydnepal.com/' },
        { name: 'FIFA World Cup 2026 Predict & Win — Prizes & Winners', url: 'https://www.rydnepal.com/prize' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'FIFA World Cup 2026 Predict & Win — Prizes, Bracket & Winners',
        description: SEO_DESCRIPTION,
        url: 'https://www.rydnepal.com/prize',
        inLanguage: ['en', 'ne'],
        isPartOf: { '@type': 'WebSite', name: 'RYD Nepal', url: 'https://www.rydnepal.com' },
        about: [
          { '@type': 'Thing', name: 'FIFA World Cup 2026' },
          { '@type': 'Thing', name: 'Football Prediction Contest Nepal' },
        ],
        dateModified: tiesheet.updated,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      eventsJsonLd,
    ],
  });

  const grouped = useMemo(
    () =>
      STAGE_ORDER.map((stage) => ({
        stage,
        stageNe: matches.find((m) => m.stage === stage)?.stageNe ?? stage,
        matches: matches.filter((m) => m.stage === stage),
      })).filter((g) => g.matches.length > 0),
    [matches],
  );

  const bracket = useMemo(() => buildBracket(matches), [matches]);

  const totalWinners = matches.reduce((n, m) => n + m.winners.length, 0);

  return (
    <div className="animate-in fade-in duration-700">
      <Helmet>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={SEO_DESCRIPTION} />
        <link rel="canonical" href="https://www.rydnepal.com/prize" />
      </Helmet>

      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-primary-300 text-xs font-bold uppercase tracking-widest mb-5">
            <Trophy className="w-4 h-4" />
            <span>{en ? 'RYD Predict & Win · FIFA World Cup 2026' : 'RYD Predict & Win · फिफा विश्वकप २०२६'}</span>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${en ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
            >
              English
            </button>
            <button
              onClick={() => setLang('ne')}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${!en ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
            >
              नेपाली
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
            {en ? (
              <>FIFA World Cup 2026: Every Match. Every Prize. <span className="text-primary-300">Every Winner.</span></>
            ) : (
              <>फिफा विश्वकप २०२६: हरेक खेल। हरेक पुरस्कार। <span className="text-primary-300">हरेक विजेता।</span></>
            )}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            {en
              ? 'Predict FIFA World Cup 2026 knockout results with RYD Nepal. Win Rs. 500–3,000 cash on every match, plus a Rs. 20,000 bumper for calling all 7 big results. Free entry.'
              : 'RYD Nepal सँग फिफा विश्वकप २०२६ नकआउट नतिजा प्रेडिक्ट गर्नुहोस्। हरेक खेलमा रु. ५००–३,००० नगद, साथै सबै ७ ठूला नतिजा मिलाए रु. २०,००० बम्पर। निःशुल्क।'}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 font-semibold">
              <Gift className="w-4 h-4 text-primary-300" />{en ? '15 matches · cash on each' : '१५ खेल · हरेकमा नगद'}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 font-semibold">
              <Trophy className="w-4 h-4 text-primary-300" />{en ? 'Rs. 20,000 bumper' : 'रु. २०,००० बम्पर'}
            </span>
            <a
              href="#matches"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 font-bold hover:bg-primary-600 transition-all"
            >
              {en ? 'See all matches' : 'सबै खेल हेर्नुहोस्'}<ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* World Cup bracket */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
            {en ? 'World Cup 2026 Bracket' : 'विश्वकप २०२६ ब्राकेट'}
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            {en
              ? 'The road to the final.'
              : 'फाइनलसम्मको यात्रा। '}
          </p>

          <div className="overflow-x-auto pb-2">
            <div className="flex gap-8 min-w-[920px] min-h-[640px]">
              {bracket.map((round, ri) => {
                const isLast = ri === bracket.length - 1;
                return (
                  <div key={round.label} className="flex-1 min-w-[200px] flex flex-col">
                    <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                      {en ? round.label : round.labelNe}
                    </p>
                    <div className="flex-1 flex flex-col">
                      {round.matches.map((match, mi) => {
                        const topOfPair = mi % 2 === 0;
                        return (
                          <div key={mi} className="flex-1 flex items-center relative">
                            {/* connectors */}
                            {ri > 0 && (
                              <span aria-hidden="true" className="absolute left-0 top-1/2 -translate-x-full w-4 h-px bg-slate-300" />
                            )}
                            {!isLast && (
                              <>
                                <span aria-hidden="true" className="absolute right-0 top-1/2 translate-x-full w-4 h-px bg-slate-300" />
                                <span
                                  aria-hidden="true"
                                  className={`absolute right-0 translate-x-4 w-px bg-slate-300 ${topOfPair ? 'top-1/2 h-1/2' : 'bottom-1/2 h-1/2'}`}
                                />
                              </>
                            )}
                            {/* match card */}
                            <div
                              className={`w-full rounded-lg overflow-hidden m-2 ${
                                isLast ? 'bg-white ring-2 ring-primary/60 shadow-md' : 'bg-slate-50 border border-slate-100'
                              }`}
                            >
                              {[0, 1].map((si) => {
                                const slot = match[si];
                                return (
                                  <div
                                    key={si}
                                    className={`flex items-center gap-2.5 px-3 py-2 ${si === 0 ? 'border-b border-slate-100' : ''}`}
                                  >
                                    <Flag name={slot.name} className="w-6 h-4" />
                                    <span
                                      className={`flex-1 min-w-0 truncate text-sm ${
                                        slot.won ? 'font-bold text-slate-900' : slot.name ? 'text-slate-600' : 'text-slate-400'
                                      }`}
                                    >
                                      {slot.name ?? 'TBD'}
                                    </span>
                                    {slot.score != null && (
                                      <span
                                        className={`text-sm tabular-nums ${slot.won ? 'font-bold text-slate-900' : 'text-slate-500'}`}
                                      >
                                        {slot.score}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* How to enter — 4 steps */}
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
          {en ? 'How to Enter — 30 Seconds Per Match' : 'कसरी भाग लिने — हरेक खेलमा ३० सेकेन्ड'}
        </h2>
        <p className="text-slate-500 mb-8">
          {en ? 'Do all four on the match post. Free, every time.' : 'म्याच पोस्टमा चारै काम गर्नुहोस्। हरेक पटक निःशुल्क।'}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STEPS.map(([Icon, titleEn, descEn, titleNe, descNe], i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
              <div className="bg-primary w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-100 mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{`${i + 1}. ${en ? titleEn : titleNe}`}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{en ? descEn : descNe}</p>
            </div>
          ))}
        </div>

        {/* Matches — the heart of the page */}
        <div id="matches" className="scroll-mt-24">
          <div className="flex items-end justify-between mb-2">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {en ? 'World Cup 2026 Matches, Prizes & Winners — Nepal Time' : 'विश्वकप २०२६ का खेल, पुरस्कार र विजेता — नेपाल समय'}
            </h2>
          </div>
          <p className="text-slate-500 text-sm mb-8">
            {en
              ? 'All times are Nepal Time (NPT). Tap a live match to open its Facebook prediction post.'
              : 'सबै समय नेपाल समय (NPT) अनुसार। लाइभ म्याचमा ट्याप गरेर फेसबुक प्रेडिक्सन पोस्ट खोल्नुहोस्।'}
          </p>

          {grouped.map((group) => (
            <div key={group.stage} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest px-4 py-2">
                  <Sparkles className="w-3.5 h-3.5 text-primary-300" />
                  {en ? group.stage : group.stageNe}
                </span>
                <span className="h-px flex-1 bg-slate-100" />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {group.matches.map((m) => {
                  const st = statusMeta[m.status];
                  const clickable = m.status === 'open' || m.status === 'finished';
                  const href = m.postUrl || FB_PAGE;
                  const CardTag: React.ElementType = clickable ? 'a' : 'div';
                  const linkProps = clickable
                    ? { href, target: '_blank', rel: 'noopener noreferrer' }
                    : {};
                  return (
                    <CardTag
                      key={m.id}
                      // {...linkProps}
                      className={`group flex flex-col rounded-3xl border border-slate-100 bg-white shadow-sm transition-all overflow-hidden ${
                        clickable ? 'hover:shadow-lg hover:border-primary/30 cursor-pointer' : ''
                      }`}
                    >
                      <div className="p-6 flex-1">
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${st.cls}`}>
                            {en ? st.en : st.ne}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold px-2.5 py-1">
                            <Gift className="w-3.5 h-3.5" />{en ? m.prize : m.prizeNe}
                          </span>
                        </div>

                        <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-primary transition-colors">
                          {fixture(matches, m)}
                        </h3>

                        <div className="space-y-1.5 text-sm text-slate-600">
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            {en ? m.date : m.dateNe}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            {en ? m.time : m.timeNe} {en ? '· Nepal time' : '· नेपाल समय'}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            {en ? m.venue : m.venueNe}
                          </p>
                          <p className="flex items-center gap-2 text-slate-500">
                            <CheckCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            {en ? m.detail : m.detailNe}
                          </p>
                        </div>
                      </div>

                      {/* Winner / action section */}
                      <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
                        {m.status === 'finished' ? (
                          <div>
                            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">
                              <Award className="w-4 h-4" />{en ? 'Winners' : 'विजेता'}
                            </p>
                            {m.winnerTeam && (
                              <div className="flex items-center gap-2 mb-3">
                                <Flag name={m.winnerTeam} className="w-6 h-4" />
                                <span className="text-sm font-bold text-slate-900">{m.winnerTeam}</span>
                                <span className="text-xs text-slate-500">{en ? 'won the match' : 'खेल जित्यो'}</span>
                              </div>
                            )}
                            {m.winners.length > 0 ? (
                              <ul className="flex flex-wrap gap-2">
                                {m.winners.map((w) => {
                                  const name = typeof w === 'string' ? w : w.name;
                                  const url = typeof w === 'string' ? undefined : w.url;
                                  const pill = 'inline-flex items-center gap-1.5 rounded-full bg-white border border-emerald-100 px-3 py-1 text-sm font-semibold text-slate-800';
                                  return (
                                    <li key={name}>
                                      {url ? (
                                        <a
                                          href={url}
                                          target="_blank"
                                          rel="nofollow noopener noreferrer"
                                          className={`${pill} hover:border-primary hover:text-primary transition-colors`}
                                        >
                                          <Trophy className="w-3.5 h-3.5 text-primary" />
                                          {name}
                                          <ExternalLink className="w-3 h-3 text-slate-400" />
                                        </a>
                                      ) : (
                                        <span className={pill}>
                                          <Trophy className="w-3.5 h-3.5 text-primary" />
                                          {name}
                                        </span>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : (
                              <p className="text-sm text-slate-500">
                                {en ? 'Cash winners announced soon on our pages.' : 'नगद विजेता चाँडै हाम्रा पेजमा घोषणा हुनेछ।'}
                              </p>
                            )}
                          </div>
                        ) : m.status === 'open' ? (
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs text-slate-400 hidden sm:inline">
                              {en ? '2 winners' : '२ विजेता'}
                            </span>
                          </div>
                        ) : (
                          <p className="flex items-center gap-2 text-sm text-slate-500">
                            <Hourglass className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            {en ? 'Prediction post opens once the fixture is confirmed.' : 'फिक्स्चर पक्का भएपछि प्रेडिक्सन पोस्ट खुल्छ।'}
                          </p>
                        )}
                      </div>
                    </CardTag>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bumper prize */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 mb-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-primary p-4 rounded-2xl shadow-lg shadow-primary-900/40 flex-shrink-0">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-primary-300 text-xs font-bold uppercase tracking-widest mb-1">
                {en ? 'Bumper Giveaway' : 'बम्पर गिभअवे'}
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                {en ? 'Rs. 20,000 Cash — Predict All 7 Big Results' : 'रु. २०,००० नगद — सबै ७ ठूला नतिजा प्रेडिक्ट गर्नुहोस्'}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                {en
                  ? 'Call the winners of all 4 quarter-finals, both semi-finals, and the final correctly, and Rs. 20,000 cash is yours. If more than one participant gets a perfect 7, the winner is drawn from among them.'
                  : 'सबै ४ क्वाटर फाइनल, दुवै सेमी फाइनल र फाइनलको विजेता सही भन्नुहोस्, अनि रु. २०,००० नगद तपाईंको। एकभन्दा बढीले पूरै ७ मिलाए भने तिनीहरूमध्येबाट गोलाप्रथाबाट विजेता निकालिन्छ।'}
              </p>
            </div>
          </div>
        </div>

        {/* Where to enter */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-100 rounded-3xl p-6 sm:p-8 mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
            {en ? 'Prediction posts & winners drop here' : 'प्रेडिक्सन पोस्ट र विजेता यहाँ आउँछ'}
          </p>
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            {en ? 'Follow all three pages so you never miss a match' : 'तीनवटै पेज फलो गर्नुहोस् — कुनै खेल नछुटोस्'}
          </h3>
          <div className="flex flex-wrap gap-3">
            <a href={FB_PAGE} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition-all font-semibold text-slate-700 text-sm">
              <Facebook className="w-5 h-5 text-blue-600" />
              <span>RYD Nepal | Kathmandu</span>
            </a>
            <a href="https://www.instagram.com/ryd.nepal/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition-all font-semibold text-slate-700 text-sm">
              <Instagram className="w-5 h-5 text-pink-500" />
              <span>@ryd.nepal</span>
            </a>
            <a href="https://www.tiktok.com/@ryd.nepal" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition-all font-semibold text-slate-700 text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z"/></svg>
              <span>@ryd.nepal</span>
            </a>
          </div>
          <Link to="/blog/ryd-predict-win-fifa-world-cup-2026" className="inline-flex items-center gap-1.5 mt-5 text-sm font-bold text-primary hover:text-primary-700 transition-colors">
            {en ? 'Read the full giveaway rules' : 'पूरा गिभअवे नियम पढ्नुहोस्'}<ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* FAQ */}
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
          {en ? 'World Cup 2026 Predict & Win — FAQ' : 'विश्वकप २०२६ Predict & Win — बारम्बार सोधिने प्रश्न'}
        </h2>
        <div className="space-y-4 mb-14">
          {FAQ.map((f, i) => (
            <details key={i} className="group bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
              <summary className="flex items-start justify-between cursor-pointer px-6 py-5 font-bold text-slate-900 list-none">
                <span className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  {en ? f.q : f.qNe}
                </span>
              </summary>
              <p className="px-6 pb-5 pl-14 text-sm text-slate-600 leading-relaxed">{en ? f.a : f.aNe}</p>
            </details>
          ))}
        </div>

        {/* Fine print */}
        <p className="text-xs text-slate-400 leading-relaxed">
          {en
            ? 'This giveaway is organised by RYD Nepal Pvt. Ltd. and is not sponsored, endorsed, or administered by FIFA, Meta, or TikTok. Fixtures, kickoff times, and matchups are confirmed as the tournament progresses; this page is updated accordingly. Kickoff times shown are Nepal Time. Prizes are paid in Nepali Rupees and are subject to applicable TDS as per prevailing Government of Nepal regulations. Winners are contacted through the platform they entered on and announced publicly on RYD Nepal\'s pages.'
            : 'यो गिभअवे RYD Nepal Pvt. Ltd. द्वारा आयोजित हो र FIFA, Meta वा TikTok द्वारा प्रायोजित वा व्यवस्थापन गरिएको होइन। फिक्स्चर, किकअफ समय र भिडन्त प्रतियोगिता अघि बढ्दै जाँदा पक्का हुन्छन्; यो पेज सोहीअनुसार अपडेट हुन्छ। देखाइएको किकअफ समय नेपाल समय अनुसार हो। पुरस्कार नेपाली रुपैयाँमा दिइनेछ र प्रचलित नेपाल सरकारको नियमअनुसार लागू हुने TDS कटाइनेछ। विजेतालाई उनीहरूले भाग लिएकै प्लेटफर्ममार्फत सम्पर्क गरी RYD Nepal का पेजमा सार्वजनिक घोषणा गरिनेछ।'}
        </p>
      </div>
    </div>
  );
};

export default Prize;
