import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Plus,
  RotateCcw,
  Search,
  Trash2,
} from 'lucide-react';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { CLUB_LOCATIONS } from '../data/membershipData';

export type WorkoutDiscipline = 'Strength' | 'Conditioning' | 'Run Club' | 'Recovery';

export interface WorkoutSession {
  id: string;
  date: string;
  title: string;
  exerciseKey: string;
  clubName: string;
  discipline: WorkoutDiscipline;
  durationMin: number;
  avgBpm: number;
  calories: number;
  weightKg?: number;
  sets?: number;
  reps?: number;
  volumeKg: number;
  rpe: number;
  isPr: boolean;
  notes?: string;
}

export interface PersonalRecord {
  id: string;
  exerciseKey: string;
  label: string;
  category: 'Barbell Strength' | 'Erg & Endurance';
  unit: 'kg' | 'sec';
  value: number;
  previousValue: number;
  achievedDate: string;
  clubName: string;
}

const SESSIONS_STORAGE_KEY = 'kv_workout_sessions_v1';
const PRS_STORAGE_KEY = 'kv_personal_records_v1';

const BENCHMARK_MOVEMENTS = [
  { key: 'back-squat', label: 'Back Squat', discipline: 'Strength' as WorkoutDiscipline },
  { key: 'deadlift', label: 'Trap-Bar Deadlift', discipline: 'Strength' as WorkoutDiscipline },
  { key: 'bench-press', label: 'Barbell Bench Press', discipline: 'Strength' as WorkoutDiscipline },
  { key: 'overhead-press', label: 'Strict Overhead Press', discipline: 'Strength' as WorkoutDiscipline },
  { key: 'metcon-45', label: 'MetCon 45 Erg Circuit', discipline: 'Conditioning' as WorkoutDiscipline },
  { key: 'run-5k', label: '5K Tempo Run', discipline: 'Run Club' as WorkoutDiscipline },
  { key: 'contrast-recovery', label: 'Contrast Plunge & Sauna', discipline: 'Recovery' as WorkoutDiscipline },
];

const INITIAL_PRS: PersonalRecord[] = [
  {
    id: 'pr-squat',
    exerciseKey: 'back-squat',
    label: 'Back Squat (1RM / Top Set)',
    category: 'Barbell Strength',
    unit: 'kg',
    value: 142.5,
    previousValue: 135,
    achievedDate: '2026-11-08',
    clubName: 'CyberHub Arena',
  },
  {
    id: 'pr-deadlift',
    exerciseKey: 'deadlift',
    label: 'Trap-Bar Deadlift',
    category: 'Barbell Strength',
    unit: 'kg',
    value: 185,
    previousValue: 175,
    achievedDate: '2026-11-04',
    clubName: 'Hauz Khas Foundry',
  },
  {
    id: 'pr-bench',
    exerciseKey: 'bench-press',
    label: 'Barbell Bench Press',
    category: 'Barbell Strength',
    unit: 'kg',
    value: 102.5,
    previousValue: 97.5,
    achievedDate: '2026-10-29',
    clubName: 'CyberHub Arena',
  },
  {
    id: 'pr-ohp',
    exerciseKey: 'overhead-press',
    label: 'Strict Overhead Press',
    category: 'Barbell Strength',
    unit: 'kg',
    value: 67.5,
    previousValue: 65,
    achievedDate: '2026-10-22',
    clubName: 'Khan Market Vault',
  },
  {
    id: 'pr-row',
    exerciseKey: 'row-500m',
    label: '500m Concept2 Row',
    category: 'Erg & Endurance',
    unit: 'sec',
    value: 89,
    previousValue: 93,
    achievedDate: '2026-11-02',
    clubName: 'Noida Sec-18 Lab',
  },
  {
    id: 'pr-5k',
    exerciseKey: 'run-5k',
    label: '5K Threshold Run',
    category: 'Erg & Endurance',
    unit: 'sec',
    value: 1295,
    previousValue: 1342,
    achievedDate: '2026-11-10',
    clubName: 'Khan Market Vault',
  },
];

const INITIAL_SESSIONS: WorkoutSession[] = [
  {
    id: 'sess-101',
    date: '2026-11-12',
    title: 'MetCon 45: Assault & Erg Intervals',
    exerciseKey: 'metcon-45',
    clubName: 'CyberHub Arena',
    discipline: 'Conditioning',
    durationMin: 45,
    avgBpm: 168,
    calories: 640,
    volumeKg: 0,
    rpe: 9,
    isPr: false,
    notes: 'Held 1:48/500m split across final 3 erg rounds.',
  },
  {
    id: 'sess-102',
    date: '2026-11-10',
    title: '5K Threshold Run',
    exerciseKey: 'run-5k',
    clubName: 'Khan Market Vault',
    discipline: 'Run Club',
    durationMin: 38,
    avgBpm: 171,
    calories: 520,
    volumeKg: 0,
    rpe: 8.5,
    isPr: true,
    notes: 'Skillrun threshold block · 21:35 5K split.',
  },
  {
    id: 'sess-103',
    date: '2026-11-08',
    title: 'Back Squat + Posterior Chain',
    exerciseKey: 'back-squat',
    clubName: 'CyberHub Arena',
    discipline: 'Strength',
    durationMin: 58,
    avgBpm: 138,
    calories: 430,
    weightKg: 142.5,
    sets: 4,
    reps: 3,
    volumeKg: 1710,
    rpe: 9,
    isPr: true,
    notes: 'Top single at 142.5 kg clean depth, followed by 3x3 at 125 kg.',
  },
  {
    id: 'sess-104',
    date: '2026-11-06',
    title: 'Contrast Plunge & Thoracic Reset',
    exerciseKey: 'contrast-recovery',
    clubName: 'Hauz Khas Foundry',
    discipline: 'Recovery',
    durationMin: 40,
    avgBpm: 92,
    calories: 135,
    volumeKg: 0,
    rpe: 3,
    isPr: false,
    notes: '15m infrared sauna + two 3m immersions at 4°C.',
  },
  {
    id: 'sess-105',
    date: '2026-11-04',
    title: 'Trap-Bar Deadlift Density',
    exerciseKey: 'deadlift',
    clubName: 'Hauz Khas Foundry',
    discipline: 'Strength',
    durationMin: 55,
    avgBpm: 144,
    calories: 465,
    weightKg: 185,
    sets: 5,
    reps: 3,
    volumeKg: 2775,
    rpe: 9,
    isPr: true,
    notes: 'New top pull at 185 kg on Eleiko platform 4.',
  },
  {
    id: 'sess-106',
    date: '2026-10-29',
    title: 'Barbell Bench Press & Upper Pull',
    exerciseKey: 'bench-press',
    clubName: 'CyberHub Arena',
    discipline: 'Strength',
    durationMin: 52,
    avgBpm: 134,
    calories: 390,
    weightKg: 102.5,
    sets: 4,
    reps: 5,
    volumeKg: 2050,
    rpe: 8,
    isPr: true,
    notes: 'Paused competition grip + weighted chin-ups.',
  },
];

function formatPrValue(pr: PersonalRecord): string {
  if (pr.unit === 'kg') {
    return `${pr.value} kg`;
  }
  const mins = Math.floor(pr.value / 60);
  const secs = Math.round(pr.value % 60);
  return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
}

function formatPrDelta(pr: PersonalRecord): string {
  const diff = pr.value - pr.previousValue;
  if (diff === 0) return 'Baseline';
  if (pr.unit === 'kg') {
    return `${diff > 0 ? '+' : ''}${diff} kg`;
  }
  // For time (sec), negative diff is faster / better
  const abs = Math.abs(Math.round(diff));
  const mins = Math.floor(abs / 60);
  const secs = abs % 60;
  const formatted = mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
  return diff < 0 ? `-${formatted}` : `+${formatted}`;
}

interface WorkoutTrackerScreenProps {
  defaultClubId: string;
}

export function WorkoutTrackerScreen({ defaultClubId }: WorkoutTrackerScreenProps) {
  const defaultClub =
    CLUB_LOCATIONS.find((c) => c.id === defaultClubId) ?? CLUB_LOCATIONS[0];

  const [sessions, setSessions] = useState<WorkoutSession[]>(() => {
    try {
      const saved = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback to seeded sessions
    }
    return INITIAL_SESSIONS;
  });

  const [records, setRecords] = useState<PersonalRecord[]>(() => {
    try {
      const saved = localStorage.getItem(PRS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback to seeded PRs
    }
    return INITIAL_PRS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    } catch {
      // Ignore storage quota errors
    }
  }, [sessions]);

  useEffect(() => {
    try {
      localStorage.setItem(PRS_STORAGE_KEY, JSON.stringify(records));
    } catch {
      // Ignore storage quota errors
    }
  }, [records]);

  // Form state
  const [movementKey, setMovementKey] = useState<string>('back-squat');
  const [customTitle, setCustomTitle] = useState<string>('Back Squat + Posterior Chain');
  const [clubName, setClubName] = useState<string>(defaultClub.name);
  const [discipline, setDiscipline] = useState<WorkoutDiscipline>('Strength');
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [durationMin, setDurationMin] = useState<string>('50');
  const [avgBpm, setAvgBpm] = useState<string>('145');
  const [calories, setCalories] = useState<string>('460');
  const [weightKg, setWeightKg] = useState<string>('145');
  const [sets, setSets] = useState<string>('4');
  const [reps, setReps] = useState<string>('3');
  const [rpe, setRpe] = useState<string>('8.5');
  const [notes, setNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [statusNotice, setStatusNotice] = useState<string>('');

  // PR inline editor state
  const [editingPrId, setEditingPrId] = useState<string | null>(null);
  const [prDraftValue, setPrDraftValue] = useState<string>('');

  // Filter & Chart state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [disciplineFilter, setDisciplineFilter] = useState<'All' | WorkoutDiscipline>('All');
  const [chartMetric, setChartMetric] = useState<'volume' | 'duration'>('volume');

  const handleMovementSelect = (key: string) => {
    setMovementKey(key);
    if (key === 'custom') {
      setCustomTitle('');
      return;
    }
    const found = BENCHMARK_MOVEMENTS.find((m) => m.key === key);
    if (found) {
      setCustomTitle(found.label);
      setDiscipline(found.discipline);
    }
  };

  const handleLogSession = (e: FormEvent) => {
    e.preventDefault();
    const trimmedTitle = customTitle.trim();
    const parsedDuration = Number(durationMin);
    const parsedBpm = Number(avgBpm);
    const parsedCalories = Number(calories);
    const parsedRpe = Number(rpe);

    if (trimmedTitle.length < 2) {
      setFormError('Enter a session or movement title.');
      return;
    }
    if (!Number.isFinite(parsedDuration) || parsedDuration < 5 || parsedDuration > 300) {
      setFormError('Duration must be between 5 and 300 minutes.');
      return;
    }
    if (!Number.isFinite(parsedBpm) || parsedBpm < 50 || parsedBpm > 220) {
      setFormError('Average heart rate must be between 50 and 220 BPM.');
      return;
    }
    if (!Number.isFinite(parsedCalories) || parsedCalories < 10 || parsedCalories > 3000) {
      setFormError('Calories must be between 10 and 3000 kcal.');
      return;
    }

    let parsedWeight: number | undefined;
    let parsedSets: number | undefined;
    let parsedReps: number | undefined;
    let computedVolume = 0;

    if (discipline === 'Strength') {
      parsedWeight = Number(weightKg);
      parsedSets = Number(sets);
      parsedReps = Number(reps);
      if (
        !Number.isFinite(parsedWeight) ||
        parsedWeight <= 0 ||
        !Number.isFinite(parsedSets) ||
        parsedSets <= 0 ||
        !Number.isFinite(parsedReps) ||
        parsedReps <= 0
      ) {
        setFormError('Enter valid positive values for weight (kg), sets, and reps.');
        return;
      }
      computedVolume = Math.round(parsedWeight * parsedSets * parsedReps);
    }

    // Check if this session beats a tracked strength PR
    let hitNewPr = false;
    const matchedPr = records.find(
      (pr) => pr.exerciseKey === movementKey && pr.unit === 'kg',
    );

    if (matchedPr && parsedWeight !== undefined && parsedWeight > matchedPr.value) {
      hitNewPr = true;
      setRecords((prev) =>
        prev.map((pr) =>
          pr.id === matchedPr.id
            ? {
                ...pr,
                previousValue: pr.value,
                value: parsedWeight!,
                achievedDate: date,
                clubName,
              }
            : pr,
        ),
      );
    }

    const newSession: WorkoutSession = {
      id: `sess-${Date.now()}`,
      date,
      title: trimmedTitle,
      exerciseKey: movementKey,
      clubName,
      discipline,
      durationMin: parsedDuration,
      avgBpm: parsedBpm,
      calories: parsedCalories,
      weightKg: parsedWeight,
      sets: parsedSets,
      reps: parsedReps,
      volumeKg: computedVolume,
      rpe: Number.isFinite(parsedRpe) ? Math.min(10, Math.max(1, parsedRpe)) : 8,
      isPr: hitNewPr,
      notes: notes.trim() || undefined,
    };

    setSessions((prev) => [newSession, ...prev]);
    setFormError('');
    setNotes('');
    setStatusNotice(
      hitNewPr
        ? `Session logged and new ${matchedPr?.label} Personal Record saved (${parsedWeight} kg).`
        : `Logged "${trimmedTitle}" at ${clubName}.`,
    );
  };

  const handleDeleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setStatusNotice('Session removed from training log.');
  };

  const handleSavePrEdit = (pr: PersonalRecord) => {
    const val = Number(prDraftValue);
    if (!Number.isFinite(val) || val <= 0) return;

    setRecords((prev) =>
      prev.map((item) =>
        item.id === pr.id
          ? {
              ...item,
              previousValue: item.value,
              value: val,
              achievedDate: new Date().toISOString().slice(0, 10),
              clubName,
            }
          : item,
      ),
    );
    setEditingPrId(null);
    setPrDraftValue('');
    setStatusNotice(`Updated ${pr.label} personal record.`);
  };

  const handleResetDemoData = () => {
    setSessions(INITIAL_SESSIONS);
    setRecords(INITIAL_PRS);
    setDisciplineFilter('All');
    setSearchQuery('');
    setStatusNotice('Restored baseline training history and personal records.');
  };

  // Summary metrics
  const summaryStats = useMemo(() => {
    const count = sessions.length;
    const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMin, 0);
    const totalVolume = sessions.reduce((sum, s) => sum + s.volumeKg, 0);
    const avgCalories =
      count > 0 ? Math.round(sessions.reduce((sum, s) => sum + s.calories, 0) / count) : 0;
    const prCount = sessions.filter((s) => s.isPr).length;
    return { count, totalMinutes, totalVolume, avgCalories, prCount };
  }, [sessions]);

  // Filtered table rows
  const filteredSessions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return sessions.filter((s) => {
      const matchesDisc = disciplineFilter === 'All' || s.discipline === disciplineFilter;
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.clubName.toLowerCase().includes(q) ||
        (s.notes && s.notes.toLowerCase().includes(q));
      return matchesDisc && matchesQuery;
    });
  }, [sessions, disciplineFilter, searchQuery]);

  // Recent 7 sessions for bar visualization (chronological left to right)
  const chartSessions = useMemo(() => {
    return [...sessions].slice(0, 7).reverse();
  }, [sessions]);

  const maxChartValue = useMemo(() => {
    if (chartSessions.length === 0) return 100;
    const values = chartSessions.map((s) =>
      chartMetric === 'volume' ? s.volumeKg : s.durationMin,
    );
    return Math.max(1, ...values);
  }, [chartSessions, chartMetric]);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 lg:px-12 lg:py-14 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#00eefc]">
            Performance Log · {defaultClub.name}
          </p>
          <h1 className="font-display text-3xl font-extrabold text-white sm:text-5xl [text-wrap:balance]">
            Workout Tracker &amp; Personal Records
          </h1>
          <p className="max-w-2xl text-sm text-[#9aa1b2]">
            Log strength sets, conditioning intervals, and club sessions. New barbell top weights automatically update your Personal Record board.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDemoData}
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/12 px-4 py-2 text-xs font-semibold text-[#c5c9ac] volt-transition hover:border-white/30 hover:text-white whitespace-nowrap shrink-0 cursor-pointer sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Baseline Log</span>
        </button>
      </div>

      {/* Status Confirmation Banner */}
      {statusNotice && (
        <div
          role="status"
          className="flex items-center justify-between gap-4 rounded-xl border border-[#caf300]/35 bg-[#caf300]/10 px-4 py-3 text-sm text-[#dfe2ee]"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#caf300]" />
            <span>{statusNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusNotice('')}
            className="text-xs font-medium text-[#c5c9ac] hover:text-white cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Summary Telemetry Strip (Single-Elevation, Tabular Numerals) */}
      <section aria-label="Training Summary Metrics" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="glass-surface-1 rounded-2xl p-5 space-y-1.5">
          <div className="text-xs text-[#9aa1b2]">Sessions Logged</div>
          <div className="font-mono text-3xl font-bold text-white tabular-nums">
            {summaryStats.count}
          </div>
          <div className="font-mono text-xs text-[#00eefc] tabular-nums">
            {(summaryStats.totalMinutes / 60).toFixed(1)} hrs total floor time
          </div>
        </div>

        <div className="glass-surface-1 rounded-2xl p-5 space-y-1.5">
          <div className="text-xs text-[#9aa1b2]">Barbell Volume</div>
          <div className="font-mono text-3xl font-bold text-[#caf300] tabular-nums">
            {summaryStats.totalVolume.toLocaleString('en-IN')} kg
          </div>
          <div className="text-xs text-[#c5c9ac]">Across logged strength sets</div>
        </div>

        <div className="glass-surface-1 rounded-2xl p-5 space-y-1.5">
          <div className="text-xs text-[#9aa1b2]">Avg Session Burn</div>
          <div className="font-mono text-3xl font-bold text-white tabular-nums">
            {summaryStats.avgCalories} kcal
          </div>
          <div className="text-xs text-[#c5c9ac]">Mean energy output per session</div>
        </div>

        <div className="glass-surface-1 rounded-2xl p-5 space-y-1.5">
          <div className="text-xs text-[#9aa1b2]">PR Milestones</div>
          <div className="font-mono text-3xl font-bold text-[#00eefc] tabular-nums">
            {summaryStats.prCount}
          </div>
          <div className="text-xs text-[#c5c9ac]">Sessions setting a club record</div>
        </div>
      </section>

      {/* Main Workspace Split: Left = Log Session Form, Right = Personal Records Board & Chart */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Log Gym Session Form */}
        <form
          onSubmit={handleLogSession}
          className="glass-surface-1 space-y-5 rounded-2xl p-6 sm:p-7 lg:col-span-5"
        >
          <div className="space-y-1 border-b border-white/8 pb-4">
            <h2 className="font-display text-xl font-bold text-white">
              Log Gym Session
            </h2>
            <p className="text-xs text-[#9aa1b2]">
              Select a benchmark lift to auto-check for new personal records.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="log-movement" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                  Movement / Track
                </label>
                <select
                  id="log-movement"
                  value={movementKey}
                  onChange={(e) => handleMovementSelect(e.target.value)}
                  className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3 py-2.5 text-sm text-white focus:border-[#00eefc] focus:outline-none"
                >
                  {BENCHMARK_MOVEMENTS.map((m) => (
                    <option key={m.key} value={m.key}>
                      {m.label}
                    </option>
                  ))}
                  <option value="custom">Custom Session</option>
                </select>
              </div>

              <div>
                <label htmlFor="log-discipline" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                  Discipline
                </label>
                <select
                  id="log-discipline"
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value as WorkoutDiscipline)}
                  className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3 py-2.5 text-sm text-white focus:border-[#00eefc] focus:outline-none"
                >
                  <option value="Strength">Strength</option>
                  <option value="Conditioning">Conditioning</option>
                  <option value="Run Club">Run Club</option>
                  <option value="Recovery">Recovery</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="log-title" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                Session Title
              </label>
              <input
                id="log-title"
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g. Back Squat + Posterior Chain"
                className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3.5 py-2.5 text-sm text-white placeholder:text-[#6b7a90] focus:border-[#00eefc] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="log-club" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                  Club Studio
                </label>
                <select
                  id="log-club"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3 py-2.5 text-sm text-white focus:border-[#00eefc] focus:outline-none"
                >
                  {CLUB_LOCATIONS.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="log-date" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                  Session Date
                </label>
                <input
                  id="log-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3 py-2.5 text-sm text-white focus:border-[#00eefc] focus:outline-none tabular-nums"
                />
              </div>
            </div>

            {discipline === 'Strength' && (
              <div className="grid grid-cols-3 gap-3 rounded-xl border border-white/8 bg-[#0f131c] p-3.5">
                <div>
                  <label htmlFor="log-weight" className="mb-1 block text-[11px] font-medium text-[#9aa1b2]">
                    Top Weight (kg)
                  </label>
                  <input
                    id="log-weight"
                    type="number"
                    step="0.5"
                    min="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full rounded-lg border border-white/12 bg-[#181c24] px-2.5 py-2 font-mono text-sm text-white focus:border-[#caf300] focus:outline-none tabular-nums"
                  />
                </div>
                <div>
                  <label htmlFor="log-sets" className="mb-1 block text-[11px] font-medium text-[#9aa1b2]">
                    Sets
                  </label>
                  <input
                    id="log-sets"
                    type="number"
                    min="1"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    className="w-full rounded-lg border border-white/12 bg-[#181c24] px-2.5 py-2 font-mono text-sm text-white focus:border-[#caf300] focus:outline-none tabular-nums"
                  />
                </div>
                <div>
                  <label htmlFor="log-reps" className="mb-1 block text-[11px] font-medium text-[#9aa1b2]">
                    Reps
                  </label>
                  <input
                    id="log-reps"
                    type="number"
                    min="1"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="w-full rounded-lg border border-white/12 bg-[#181c24] px-2.5 py-2 font-mono text-sm text-white focus:border-[#caf300] focus:outline-none tabular-nums"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div>
                <label htmlFor="log-duration" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                  Min
                </label>
                <input
                  id="log-duration"
                  type="number"
                  min="5"
                  value={durationMin}
                  onChange={(e) => setDurationMin(e.target.value)}
                  className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3 py-2 font-mono text-sm text-white focus:border-[#00eefc] focus:outline-none tabular-nums"
                />
              </div>
              <div>
                <label htmlFor="log-bpm" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                  Avg BPM
                </label>
                <input
                  id="log-bpm"
                  type="number"
                  min="50"
                  max="220"
                  value={avgBpm}
                  onChange={(e) => setAvgBpm(e.target.value)}
                  className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3 py-2 font-mono text-sm text-white focus:border-[#00eefc] focus:outline-none tabular-nums"
                />
              </div>
              <div>
                <label htmlFor="log-kcal" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                  Kcal
                </label>
                <input
                  id="log-kcal"
                  type="number"
                  min="10"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3 py-2 font-mono text-sm text-white focus:border-[#00eefc] focus:outline-none tabular-nums"
                />
              </div>
              <div>
                <label htmlFor="log-rpe" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                  RPE (1–10)
                </label>
                <input
                  id="log-rpe"
                  type="number"
                  step="0.5"
                  min="1"
                  max="10"
                  value={rpe}
                  onChange={(e) => setRpe(e.target.value)}
                  className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3 py-2 font-mono text-sm text-white focus:border-[#00eefc] focus:outline-none tabular-nums"
                />
              </div>
            </div>

            <div>
              <label htmlFor="log-notes" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                Session Notes (optional)
              </label>
              <input
                id="log-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Beltless top set, clean bar speed"
                className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3.5 py-2.5 text-sm text-white placeholder:text-[#6b7a90] focus:border-[#00eefc] focus:outline-none"
              />
            </div>
          </div>

          {formError && (
            <p className="rounded-lg border border-[#ff3366]/40 bg-[#ff3366]/10 px-3.5 py-2.5 text-xs text-[#ffb2ba]">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#caf300] px-6 py-3.5 text-sm font-bold text-[#171e00] volt-transition hover:bg-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.4)] cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Save Workout Session</span>
          </button>
        </form>

        {/* Right Column: Personal Records Board + Recent Output Chart */}
        <div className="space-y-6 lg:col-span-7">
          {/* Personal Records Benchmark Board */}
          <div className="glass-surface-1 space-y-5 rounded-2xl p-6 sm:p-7">
            <div className="flex flex-col gap-1 border-b border-white/8 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  Personal Records Board
                </h2>
                <p className="text-xs text-[#9aa1b2]">
                  Verified strength and ergometer benchmarks · click Update to revise any mark.
                </p>
              </div>
              <span className="font-mono text-xs text-[#caf300] tabular-nums">
                {records.length} Tracked Benchmarks
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {records.map((pr) => {
                const isEditing = editingPrId === pr.id;
                return (
                  <div
                    key={pr.id}
                    className="flex flex-col justify-between rounded-xl border border-white/8 bg-[#0f131c] p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs text-[#8f9378]">{pr.category}</div>
                        <div className="text-sm font-semibold text-white">{pr.label}</div>
                      </div>
                      <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#caf300] tabular-nums shrink-0">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        {formatPrDelta(pr)}
                      </span>
                    </div>

                    {isEditing ? (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="number"
                          step="0.5"
                          value={prDraftValue}
                          onChange={(e) => setPrDraftValue(e.target.value)}
                          aria-label={`New value for ${pr.label} in ${pr.unit}`}
                          placeholder={String(pr.value)}
                          className="w-24 rounded-lg border border-[#00eefc] bg-[#181c24] px-2.5 py-1.5 font-mono text-sm text-white focus:outline-none tabular-nums"
                        />
                        <span className="text-xs text-[#9aa1b2]">{pr.unit}</span>
                        <button
                          type="button"
                          onClick={() => handleSavePrEdit(pr)}
                          className="ml-auto rounded-full bg-[#caf300] px-3 py-1 text-xs font-bold text-[#171e00] cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingPrId(null)}
                          className="text-xs text-[#9aa1b2] hover:text-white cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-end justify-between gap-2">
                        <div>
                          <div className="font-mono text-2xl font-bold text-white tabular-nums">
                            {formatPrValue(pr)}
                          </div>
                          <div className="text-[11px] text-[#8f9378] tabular-nums">
                            {pr.achievedDate} · {pr.clubName}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPrId(pr.id);
                            setPrDraftValue(String(pr.value));
                          }}
                          className="text-xs font-medium text-[#00eefc] hover:underline cursor-pointer"
                        >
                          Update
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Training Output Bar Visualization */}
          <div className="glass-surface-1 space-y-4 rounded-2xl p-6 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-white">
                  Last 7 Sessions Output
                </h2>
                <p className="text-xs text-[#9aa1b2]">
                  Compare barbell volume (kg) or active session duration (min).
                </p>
              </div>
              <div className="inline-flex rounded-full border border-white/10 bg-[#0f131c] p-1 self-start">
                <button
                  type="button"
                  onClick={() => setChartMetric('volume')}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold volt-transition cursor-pointer ${
                    chartMetric === 'volume'
                      ? 'bg-[#caf300] text-[#171e00]'
                      : 'text-[#9aa1b2] hover:text-white'
                  }`}
                >
                  Volume (kg)
                </button>
                <button
                  type="button"
                  onClick={() => setChartMetric('duration')}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold volt-transition cursor-pointer ${
                    chartMetric === 'duration'
                      ? 'bg-[#00eefc] text-[#002022]'
                      : 'text-[#9aa1b2] hover:text-white'
                  }`}
                >
                  Duration (min)
                </button>
              </div>
            </div>

            {chartSessions.length === 0 ? (
              <div className="flex h-36 items-center justify-center rounded-xl border border-white/8 bg-[#0f131c] text-xs text-[#8f9378]">
                Log a session on the left to plot your training load.
              </div>
            ) : (
              <div className="grid grid-cols-7 items-end gap-2 sm:gap-3 rounded-xl border border-white/8 bg-[#0a0e16] px-4 pb-4 pt-6 h-44">
                {chartSessions.map((sess) => {
                  const val = chartMetric === 'volume' ? sess.volumeKg : sess.durationMin;
                  const pct = val > 0 ? Math.max(12, Math.round((val / maxChartValue) * 100)) : 6;
                  const barColor =
                    chartMetric === 'volume'
                      ? sess.isPr
                        ? 'bg-[#caf300]'
                        : 'bg-[#caf300]/55'
                      : 'bg-[#00eefc]/80';

                  return (
                    <div key={sess.id} className="flex h-full flex-col items-center justify-end gap-2">
                      <span className="font-mono text-[10px] text-[#c5c9ac] tabular-nums">
                        {val > 0 ? val : '—'}
                      </span>
                      <div className="flex w-full max-w-[36px] flex-1 items-end justify-center">
                        <div
                          className={`w-full rounded-t-md volt-transition ${barColor}`}
                          style={{ height: `${pct}%` }}
                          title={`${sess.title}: ${val} ${chartMetric === 'volume' ? 'kg' : 'min'}`}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-[#8f9378] tabular-nums">
                        {sess.date.slice(5)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Session History Log Table */}
      <section className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-bold text-white">
              Session History Log
            </h2>
            <p className="text-xs text-[#9aa1b2]">
              Showing {filteredSessions.length} of {sessions.length} logged sessions.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7a90]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movement, club, notes..."
                aria-label="Search workout sessions"
                className="w-full rounded-xl border border-white/10 bg-[#181c24] py-2 pl-9 pr-3.5 text-xs text-white placeholder:text-[#6b7a90] focus:border-[#00eefc] focus:outline-none sm:w-64"
              />
            </div>

            <div className="flex flex-wrap gap-1 rounded-xl border border-white/10 bg-[#181c24] p-1">
              {(['All', 'Strength', 'Conditioning', 'Run Club', 'Recovery'] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setDisciplineFilter(tab)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap volt-transition cursor-pointer ${
                      disciplineFilter === tab
                        ? 'bg-[#31353e] text-white'
                        : 'text-[#9aa1b2] hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {filteredSessions.length === 0 ? (
          <div className="glass-surface-1 flex flex-col items-center justify-center gap-4 rounded-2xl p-10 text-center">
            <div className="space-y-1">
              <h3 className="font-display text-lg font-bold text-white">
                No matching workout sessions
              </h3>
              <p className="text-sm text-[#9aa1b2]">
                Log a new session above or clear your active search and discipline filters.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setDisciplineFilter('All');
                setSearchQuery('');
              }}
              className="rounded-full border border-[#00eefc]/60 px-5 py-2 text-xs font-semibold text-[#00eefc] hover:bg-[#00eefc]/10 cursor-pointer"
            >
              Show All Sessions
            </button>
          </div>
        ) : (
          <div className="glass-surface-1 overflow-x-auto rounded-2xl">
            <table className="w-full min-w-[780px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-[#9aa1b2]">
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Session &amp; Studio</th>
                  <th className="px-5 py-3.5">Discipline</th>
                  <th className="px-5 py-3.5 text-right">Top Load / Volume</th>
                  <th className="px-5 py-3.5 text-right">Duration</th>
                  <th className="px-5 py-3.5 text-right">Avg BPM</th>
                  <th className="px-5 py-3.5 text-right">Output</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8 text-sm">
                {filteredSessions.map((sess) => (
                  <tr key={sess.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3.5 font-mono text-xs text-[#9aa1b2] tabular-nums whitespace-nowrap">
                      {sess.date}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{sess.title}</span>
                        {sess.isPr && (
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#caf300]">
                            <Award className="h-3.5 w-3.5" />
                            PR
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#8f9378]">
                        {sess.clubName}
                        {sess.notes ? ` · ${sess.notes}` : ''}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-[#c5c9ac] whitespace-nowrap">
                      {sess.discipline} · RPE {sess.rpe}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs text-[#dfe2ee] tabular-nums whitespace-nowrap">
                      {sess.weightKg
                        ? `${sess.weightKg} kg (${sess.sets}×${sess.reps}) · ${sess.volumeKg.toLocaleString('en-IN')} kg`
                        : '—'}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs text-[#dfe2ee] tabular-nums whitespace-nowrap">
                      {sess.durationMin} min
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs text-[#00eefc] tabular-nums whitespace-nowrap">
                      {sess.avgBpm} BPM
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs text-[#caf300] tabular-nums whitespace-nowrap">
                      {sess.calories} kcal
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteSession(sess.id)}
                        aria-label={`Delete ${sess.title}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#8f9378] hover:bg-[#ff3366]/15 hover:text-[#ffb2ba] cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
