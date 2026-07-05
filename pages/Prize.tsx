import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Trophy, Gift, Calendar, Clock, MapPin, Bell, ThumbsUp, MessageCircle, Users,
  CheckCircle, Facebook, Instagram, Sparkles, ArrowRight, Award, Hourglass, ExternalLink,
} from 'lucide-react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';

const SEO_TITLE = 'RYD Predict & Win — FIFA World Cup 2026 Prizes & Winners | RYD Nepal';
const SEO_DESCRIPTION =
  'Every FIFA World Cup 2026 knockout match, its Nepal kickoff time, the cash prize, and the winners — all in one place. Win Rs. 500–3,000 per match plus a Rs. 20,000 bumper. Free entry.';

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
  winners: string[];    // announced RYD cash winner names/handles
  sources?: [string, string]; // ids of the two matches whose winners feed this one (bracket)
  score?: [string, string];   // final score per slot, e.g. ['2 (4)', '2 (2)'] for a shootout
}

const MATCHES: Match[] = [
  // ── Round of 16 · Rs. 500 × 2 winners (kickoffs in Nepal Time) ──
  {
    id: 'r16-1', stage: 'Round of 16', stageNe: 'राउन्ड अफ १६',
    teams: 'Canada vs Morocco', venue: 'Houston · NRG Stadium', venueNe: 'ह्युस्टन · NRG स्टेडियम',
    date: 'July 4, 2026', dateNe: 'जुलाई ४, २०२६', time: '10:45 PM', timeNe: 'राति १०:४५',
    prize: 'Rs. 500 × 2 winners', prizeNe: 'रु. ५०० × २ विजेता',
    detail: 'Predict the match winner.', detailNe: 'खेलको विजेता प्रेडिक्ट गर्नुहोस्।',
    status: 'finished', postUrl: '', winners: ["On progress"], winnerTeam: 'Morocco', score: ['0', '3']
  },
  {
    id: 'r16-2', stage: 'Round of 16', stageNe: 'राउन्ड अफ १६',
    teams: 'Paraguay vs France', venue: 'Philadelphia · Lincoln Financial Field', venueNe: 'फिलाडेल्फिया · लिंकन फाइनान्सियल फिल्ड',
    date: 'July 5, 2026', dateNe: 'जुलाई ५, २०२६', time: '2:45 AM', timeNe: 'राति २:४५',
    prize: 'Rs. 500 × 2 winners', prizeNe: 'रु. ५०० × २ विजेता',
    detail: 'Predict the match winner.', detailNe: 'खेलको विजेता प्रेडिक्ट गर्नुहोस्।',
    status: 'finished', postUrl: '', winners: ["On progress"], winnerTeam: 'France', score: ['0', '1']
  },
  {
    id: 'r16-3', stage: 'Round of 16', stageNe: 'राउन्ड अफ १६',
    teams: 'Brazil vs Norway', venue: 'East Rutherford · MetLife Stadium', venueNe: 'इस्ट रदरफोर्ड · मेटलाइफ स्टेडियम',
    date: 'July 6, 2026', dateNe: 'जुलाई ६, २०२६', time: '1:45 AM', timeNe: 'राति १:४५',
    prize: 'Rs. 500 × 2 winners', prizeNe: 'रु. ५०० × २ विजेता',
    detail: 'Predict the match winner.', detailNe: 'खेलको विजेता प्रेडिक्ट गर्नुहोस्।',
    status: 'open', postUrl: '', winners: [],
  },
  {
    id: 'r16-4', stage: 'Round of 16', stageNe: 'राउन्ड अफ १६',
    teams: 'Mexico vs England', venue: 'Mexico City · Estadio Azteca', venueNe: 'मेक्सिको सिटी · एस्टाडियो अज्टेका',
    date: 'July 6, 2026', dateNe: 'जुलाई ६, २०२६', time: '5:45 AM', timeNe: 'बिहान ५:४५',
    prize: 'Rs. 500 × 2 winners', prizeNe: 'रु. ५०० × २ विजेता',
    detail: 'Predict the match winner.', detailNe: 'खेलको विजेता प्रेडिक्ट गर्नुहोस्।',
    status: 'open', postUrl: '', winners: [],
  },
  {
    id: 'r16-5', stage: 'Round of 16', stageNe: 'राउन्ड अफ १६',
    teams: 'Spain vs Portugal', venue: 'Arlington · AT&T Stadium', venueNe: 'अर्लिंगटन · AT&T स्टेडियम',
    date: 'July 7, 2026', dateNe: 'जुलाई ७, २०२६', time: '12:45 AM', timeNe: 'राति १२:४५',
    prize: 'Rs. 500 × 2 winners', prizeNe: 'रु. ५०० × २ विजेता',
    detail: 'Predict the match winner.', detailNe: 'खेलको विजेता प्रेडिक्ट गर्नुहोस्।',
    status: 'open', postUrl: '', winners: [],
  },
  {
    id: 'r16-6', stage: 'Round of 16', stageNe: 'राउन्ड अफ १६',
    teams: 'USA vs Belgium', venue: 'Seattle · Lumen Field', venueNe: 'सिएटल · लुमेन फिल्ड',
    date: 'July 7, 2026', dateNe: 'जुलाई ७, २०२६', time: '5:45 AM', timeNe: 'बिहान ५:४५',
    prize: 'Rs. 500 × 2 winners', prizeNe: 'रु. ५०० × २ विजेता',
    detail: 'Predict the match winner.', detailNe: 'खेलको विजेता प्रेडिक्ट गर्नुहोस्।',
    status: 'open', postUrl: '', winners: [],
  },
  {
    id: 'r16-7', stage: 'Round of 16', stageNe: 'राउन्ड अफ १६',
    teams: 'Egypt vs Argentina', venue: 'Atlanta · Mercedes-Benz Stadium', venueNe: 'अट्लान्टा · मर्सिडिज-बेन्ज स्टेडियम',
    date: 'July 7, 2026', dateNe: 'जुलाई ७, २०२६', time: '9:45 PM', timeNe: 'राति ९:४५',
    prize: 'Rs. 500 × 2 winners', prizeNe: 'रु. ५०० × २ विजेता',
    detail: 'Teams confirmed after the Round of 32.', detailNe: 'राउन्ड अफ ३२ पछि टोली पक्का हुन्छ।',
    status: 'upcoming', postUrl: '', winners: [],
  },
  {
    id: 'r16-8', stage: 'Round of 16', stageNe: 'राउन्ड अफ १६',
    teams: 'Switzerland vs Colombia', venue: 'Vancouver · BC Place', venueNe: 'भ्यानकुभर · BC प्लेस',
    date: 'July 8, 2026', dateNe: 'जुलाई ८, २०२६', time: '1:45 AM', timeNe: 'राति १:४५',
    prize: 'Rs. 500 × 2 winners', prizeNe: 'रु. ५०० × २ विजेता',
    detail: 'Opponent confirmed after the Round of 32.', detailNe: 'राउन्ड अफ ३२ पछि प्रतिद्वन्द्वी पक्का हुन्छ।',
    status: 'upcoming', postUrl: '', winners: [],
  },
  // ── Quarter Finals · Rs. 1,000 × 2 winners ──
  {
    id: 'qf-1', stage: 'Quarter Final', stageNe: 'क्वाटर फाइनल', sources: ['r16-1', 'r16-2'],
    teams: 'TBD vs TBD', venue: 'Boston · Gillette Stadium', venueNe: 'बोस्टन · जिलेट स्टेडियम',
    date: 'July 10, 2026', dateNe: 'जुलाई १०, २०२६', time: 'Kickoff TBC', timeNe: 'किकअफ पुष्टि हुँदै',
    prize: 'Rs. 1,000 × 2 winners', prizeNe: 'रु. १,००० × २ विजेता',
    detail: 'Predict the winner — counts toward the bumper.', detailNe: 'विजेता प्रेडिक्ट गर्नुहोस् — बम्परमा गनिन्छ।',
    status: 'upcoming', postUrl: '', winners: [],
  },
  {
    id: 'qf-2', stage: 'Quarter Final', stageNe: 'क्वाटर फाइनल', sources: ['r16-5', 'r16-6'],
    teams: 'TBD vs TBD', venue: 'Los Angeles · SoFi Stadium', venueNe: 'लस एन्जलस · SoFi स्टेडियम',
    date: 'July 11, 2026', dateNe: 'जुलाई ११, २०२६', time: 'Kickoff TBC', timeNe: 'किकअफ पुष्टि हुँदै',
    prize: 'Rs. 1,000 × 2 winners', prizeNe: 'रु. १,००० × २ विजेता',
    detail: 'Predict the winner — counts toward the bumper.', detailNe: 'विजेता प्रेडिक्ट गर्नुहोस् — बम्परमा गनिन्छ।',
    status: 'upcoming', postUrl: '', winners: [],
  },
  {
    id: 'qf-3', stage: 'Quarter Final', stageNe: 'क्वाटर फाइनल', sources: ['r16-7', 'r16-8'],
    teams: 'TBD vs TBD', venue: 'Kansas City · Arrowhead Stadium', venueNe: 'कान्सस सिटी · एरोहेड स्टेडियम',
    date: 'July 11, 2026', dateNe: 'जुलाई ११, २०२६', time: 'Kickoff TBC', timeNe: 'किकअफ पुष्टि हुँदै',
    prize: 'Rs. 1,000 × 2 winners', prizeNe: 'रु. १,००० × २ विजेता',
    detail: 'Predict the winner — counts toward the bumper.', detailNe: 'विजेता प्रेडिक्ट गर्नुहोस् — बम्परमा गनिन्छ।',
    status: 'upcoming', postUrl: '', winners: [],
  },
  {
    id: 'qf-4', stage: 'Quarter Final', stageNe: 'क्वाटर फाइनल', sources: ['r16-3', 'r16-4'],
    teams: 'TBD vs TBD', venue: 'Miami · Hard Rock Stadium', venueNe: 'मायामी · हार्ड रक स्टेडियम',
    date: 'July 12, 2026', dateNe: 'जुलाई १२, २०२६', time: 'Kickoff TBC', timeNe: 'किकअफ पुष्टि हुँदै',
    prize: 'Rs. 1,000 × 2 winners', prizeNe: 'रु. १,००० × २ विजेता',
    detail: 'Predict the winner — counts toward the bumper.', detailNe: 'विजेता प्रेडिक्ट गर्नुहोस् — बम्परमा गनिन्छ।',
    status: 'upcoming', postUrl: '', winners: [],
  },
  // ── Semi Finals · Rs. 2,000 × 2 winners ──
  {
    id: 'sf-1', stage: 'Semi Final', stageNe: 'सेमी फाइनल', sources: ['qf-1', 'qf-2'],
    teams: 'TBD vs TBD', venue: 'Dallas · AT&T Stadium', venueNe: 'डलास · AT&T स्टेडियम',
    date: 'July 15, 2026', dateNe: 'जुलाई १५, २०२६', time: 'Kickoff TBC', timeNe: 'किकअफ पुष्टि हुँदै',
    prize: 'Rs. 2,000 × 2 winners', prizeNe: 'रु. २,००० × २ विजेता',
    detail: 'Predict the winner — counts toward the bumper.', detailNe: 'विजेता प्रेडिक्ट गर्नुहोस् — बम्परमा गनिन्छ।',
    status: 'upcoming', postUrl: '', winners: [],
  },
  {
    id: 'sf-2', stage: 'Semi Final', stageNe: 'सेमी फाइनल', sources: ['qf-4', 'qf-3'],
    teams: 'TBD vs TBD', venue: 'Atlanta · Mercedes-Benz Stadium', venueNe: 'अट्लान्टा · मर्सिडिज-बेन्ज स्टेडियम',
    date: 'July 16, 2026', dateNe: 'जुलाई १६, २०२६', time: 'Kickoff TBC', timeNe: 'किकअफ पुष्टि हुँदै',
    prize: 'Rs. 2,000 × 2 winners', prizeNe: 'रु. २,००० × २ विजेता',
    detail: 'Predict the winner — counts toward the bumper.', detailNe: 'विजेता प्रेडिक्ट गर्नुहोस् — बम्परमा गनिन्छ।',
    status: 'upcoming', postUrl: '', winners: [],
  },
  // ── Final · Rs. 3,000 × 2 winners ──
  {
    id: 'final', stage: 'Final', stageNe: 'फाइनल', sources: ['sf-1', 'sf-2'],
    teams: 'TBD vs TBD', venue: 'East Rutherford · MetLife Stadium', venueNe: 'इस्ट रदरफोर्ड · मेटलाइफ स्टेडियम',
    date: 'July 20, 2026', dateNe: 'जुलाई २०, २०२६', time: 'Kickoff TBC', timeNe: 'किकअफ पुष्टि हुँदै',
    prize: 'Rs. 3,000 × 2 winners', prizeNe: 'रु. ३,००० × २ विजेता',
    detail: 'Predict the champion — the final bumper leg.', detailNe: 'च्याम्पियन प्रेडिक्ट गर्नुहोस् — बम्परको अन्तिम खुड्किलो।',
    status: 'upcoming', postUrl: '', winners: [],
  },
];

// Country name → ISO code for flagcdn.com (England uses the subdivision code).
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
        src={`https://flagcdn.com/${code}.svg`}
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
const winnerOf = (id?: string): string | undefined =>
  id ? MATCHES.find((m) => m.id === id)?.winnerTeam : undefined;

// One team's line in the bracket: country, its score, and whether it advanced.
interface BracketSlot { name?: string; score?: string; won: boolean }
type BracketMatch = [BracketSlot, BracketSlot];

// Bracket per stage. Round of 16 fills from its fixtures; later rounds
// auto-advance from the winners of the two matches named in `sources`, so
// setting `winnerTeam`/`score` on a match flows straight up into the bracket.
const bracketMatches = (stage: string): BracketMatch[] =>
  MATCHES.filter((m) => m.stage === stage).map((m) => {
    const names = m.sources ? m.sources.map(winnerOf) : parseSlots(m.teams);
    return [0, 1].map((i) => ({
      name: names[i],
      score: m.score?.[i],
      won: !!(names[i] && names[i] === m.winnerTeam),
    })) as BracketMatch;
  });

const BRACKET: { label: string; labelNe: string; matches: BracketMatch[] }[] = [
  { label: 'Round of 16', labelNe: 'राउन्ड अफ १६', matches: bracketMatches('Round of 16') },
  { label: 'Quarter Finals', labelNe: 'क्वाटर फाइनल', matches: bracketMatches('Quarter Final') },
  { label: 'Semi Finals', labelNe: 'सेमी फाइनल', matches: bracketMatches('Semi Final') },
  { label: 'Final', labelNe: 'फाइनल', matches: bracketMatches('Final') },
];

const STAGE_ORDER = ['Round of 16', 'Quarter Final', 'Semi Final', 'Final'];

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

  useSEO({
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    keywords:
      'RYD Nepal giveaway prize, FIFA World Cup 2026 prize, RYD predict and win, world cup prediction winners Nepal, RYD Nepal prizes',
    path: '/prize',
    ogTitle: 'Predict the World Cup. Win Up to Rs. 20,000 Cash.',
    ogDescription: SEO_DESCRIPTION,
    ogImage: 'https://www.rydnepal.com/og/predict-win-worldcup.jpg',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://www.rydnepal.com/' },
        { name: 'Prize Details', url: 'https://www.rydnepal.com/prize' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Prize Details',
        description: SEO_DESCRIPTION,
        url: 'https://www.rydnepal.com/prize',
      },
    ],
  });

  const grouped = useMemo(
    () =>
      STAGE_ORDER.map((stage) => ({
        stage,
        stageNe: MATCHES.find((m) => m.stage === stage)?.stageNe ?? stage,
        matches: MATCHES.filter((m) => m.stage === stage),
      })).filter((g) => g.matches.length > 0),
    [],
  );

  const totalWinners = MATCHES.reduce((n, m) => n + m.winners.length, 0);

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
              <>Every Match. Every Prize. <span className="text-primary-300">Every Winner.</span></>
            ) : (
              <>हरेक खेल। हरेक पुरस्कार। <span className="text-primary-300">हरेक विजेता।</span></>
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
              {BRACKET.map((round, ri) => {
                const isLast = ri === BRACKET.length - 1;
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
              {en ? 'Matches, Prizes & Winners' : 'खेल, पुरस्कार र विजेता'}
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
                          {m.teams}
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
                        {m.status === 'finished' && m.winners.length > 0 ? (
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
                            <ul className="flex flex-wrap gap-2">
                              {m.winners.map((w) => (
                                <li
                                  key={w}
                                  className="inline-flex items-center gap-1.5 rounded-full bg-white border border-emerald-100 px-3 py-1 text-sm font-semibold text-slate-800"
                                >
                                  <Trophy className="w-3.5 h-3.5 text-primary" />{w}
                                </li>
                              ))}
                            </ul>
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
