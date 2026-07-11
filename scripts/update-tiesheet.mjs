/**
 * Auto-update the World Cup 2026 tie sheet (data/tiesheet.json) from ESPN's
 * public scoreboard API. Run by .github/workflows/update-tiesheet.yml daily
 * during the tournament, or manually: node scripts/update-tiesheet.mjs
 *
 * Updates per match: teams, Nepal-time date/time (EN + NE), venue, status,
 * winnerTeam, score. NEVER touches the manually-entered fields: winners
 * (RYD cash-prize winner names), postUrl, prize, detail.
 *
 * Exits 0 always; prints "changed" or "unchanged" and rewrites the JSON only
 * when something actually changed (so CI can skip the commit/deploy).
 *
 * Requires Node 18+ (built-in fetch). No npm dependencies.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../data/tiesheet.json');

const SCOREBOARD_URL =
  'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260704-20260721';

const STAGE_ORDER = ['Round of 16', 'Quarter Final', 'Semi Final', 'Final'];
const STAGE_SLUG = {
  'Round of 16': 'round-of-16',
  'Quarter Final': 'quarterfinals',
  'Semi Final': 'semifinals',
  Final: 'final',
};

// ESPN display names → the short names used in the tie sheet / flag map.
const TEAM_ALIAS = { 'United States': 'USA' };
const shortName = (n) => TEAM_ALIAS[n] ?? n;
// "Quarterfinal 4 Winner", "TBD", … — ESPN placeholders for unresolved fixtures.
const isPlaceholder = (n) => /winner|loser|tbd/i.test(n);

const NE_DIGIT = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
const neDigits = (s) => s.replace(/\d/g, (d) => NE_DIGIT[+d]);
const NE_MONTH = {
  January: 'जनवरी', February: 'फेब्रुअरी', March: 'मार्च', April: 'अप्रिल', May: 'मे', June: 'जुन',
  July: 'जुलाई', August: 'अगस्ट', September: 'सेप्टेम्बर', October: 'अक्टोबर', November: 'नोभेम्बर', December: 'डिसेम्बर',
};

// Format a UTC kickoff in Nepal Time, in both languages. Field names match the
// tie sheet so the result can be Object.assign-ed onto a match.
const nptStrings = (iso) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kathmandu', month: 'long', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  }).formatToParts(new Date(iso));
  const get = (t) => parts.find((p) => p.type === t)?.value ?? '';
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

const winnerOf = (list, id) => (id ? list.find((m) => m.id === id)?.winnerTeam : undefined);

const parseSlots = (teams) => {
  const norm = (s) => {
    const t = s?.trim();
    return !t || t.includes('/') || t === 'TBD' ? undefined : t;
  };
  const [a, b] = teams.split(' vs ');
  return [norm(a), norm(b)];
};

// One ESPN scoreboard event → the bits we merge. Returns null on shape changes.
const parseLive = (ev) => {
  try {
    const comp = ev.competitions[0];
    const teams = comp.competitors.map((c) => ({
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
      names: teams.map((t) => t.name),
      scores: Object.fromEntries(teams.map((t) => [t.name, t.score])),
      winner: teams.find((t) => t.winner)?.name,
    };
  } catch {
    return null;
  }
};

// Merge live data into the campaign data. Stages are processed in bracket
// order so a quarter-final winner immediately resolves the semi-final fixture
// it feeds. Events are matched by team names when the fixture is known,
// falling back to kickoff order within the stage.
const mergeLive = (base, events) => {
  const live = events.map(parseLive).filter(Boolean);
  const out = base.map((m) => ({ ...m }));
  const used = new Set();
  for (const stage of STAGE_ORDER) {
    const ours = out.filter((m) => m.stage === stage);
    const theirs = live
      .filter((e) => e.stageSlug === STAGE_SLUG[stage])
      .sort((x, y) => x.when.localeCompare(y.when));
    ours.forEach((m, i) => {
      const slots = m.sources ? m.sources.map((id) => winnerOf(out, id)) : parseSlots(m.teams);
      const known = slots.every(Boolean);
      const ev =
        theirs.find((e) => !used.has(e) && known && slots.every((n) => e.names.includes(n))) ??
        (theirs[i] && !used.has(theirs[i]) ? theirs[i] : undefined);
      if (!ev) return;
      used.add(ev);
      // Slot order: our bracket order when the fixture is known, else ESPN's.
      const [a, b] = known ? slots : ev.names.some(isPlaceholder) ? [undefined, undefined] : ev.names;
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

// ── main ──────────────────────────────────────────────────────────────────────
const sheet = JSON.parse(fs.readFileSync(FILE, 'utf-8'));

const res = await fetch(SCOREBOARD_URL);
if (!res.ok) {
  console.error(`ESPN API returned ${res.status} — keeping existing tie sheet.`);
  console.log('unchanged');
  process.exit(0);
}
const data = await res.json();
const merged = mergeLive(sheet.matches, data?.events ?? []);

if (JSON.stringify(merged) === JSON.stringify(sheet.matches)) {
  console.log('unchanged');
  process.exit(0);
}

// Today in Nepal time — drives the /prize sitemap lastmod in prerender.mjs.
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kathmandu' }).format(new Date());
fs.writeFileSync(FILE, JSON.stringify({ updated: today, matches: merged }, null, 2) + '\n');
console.log('changed');
