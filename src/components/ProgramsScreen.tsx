import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { TRAINING_PROGRAMS, type ScreenId } from '../data/membershipData';

interface ProgramsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export function ProgramsScreen({ onNavigate }: ProgramsScreenProps) {
  const [selectedId, setSelectedId] = useState(TRAINING_PROGRAMS[0].id);
  const activeProgram =
    TRAINING_PROGRAMS.find((p) => p.id === selectedId) ?? TRAINING_PROGRAMS[0];

  // Build SVG polyline points from hrCurve (60 BPM min to 195 BPM max)
  const points = activeProgram.hrCurve
    .map((bpm, idx) => {
      const x = 16 + (idx / (activeProgram.hrCurve.length - 1)) * 328;
      const normalized = (bpm - 60) / (195 - 60);
      const y = 148 - normalized * 124;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 lg:px-12 lg:py-16 space-y-12">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#00eefc]">
          Curriculum &amp; Telemetry
        </p>
        <h1 className="font-display text-3xl font-extrabold text-white sm:text-5xl [text-wrap:balance]">
          Four structured training tracks included across NCR.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[#9aa1b2] sm:text-base">
          Inspect session pacing, block-by-block workload, and target heart-rate curves before choosing your membership tier.
        </p>
      </div>

      {/* Program Selector Buttons */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TRAINING_PROGRAMS.map((program) => {
          const isActive = program.id === activeProgram.id;
          return (
            <button
              key={program.id}
              type="button"
              onClick={() => setSelectedId(program.id)}
              className={`glass-surface-1 flex flex-col justify-between rounded-2xl p-5 text-left volt-transition cursor-pointer ${
                isActive ? 'glass-surface-2' : 'hover:border-white/20'
              }`}
            >
              <div className="space-y-1.5">
                <div className="text-xs font-medium text-[#00eefc]">
                  {program.discipline} · {program.duration}
                </div>
                <div className="font-display text-xl font-bold text-white">
                  {program.title}
                </div>
              </div>
              <div className="mt-4 font-mono text-xs text-[#c5c9ac] tabular-nums">
                Avg Output: {program.avgBurnKcal}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Program Deep Dive */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="glass-surface-1 space-y-6 rounded-2xl p-6 sm:p-8 lg:col-span-7">
          <div className="space-y-2 border-b border-white/8 pb-5">
            <div className="text-xs font-semibold text-[#caf300]">
              {activeProgram.intensityZone}
            </div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              {activeProgram.title}
            </h2>
            <p className="text-sm leading-relaxed text-[#c5c9ac]">
              {activeProgram.summary}
            </p>
            <div className="pt-1 text-xs text-[#9aa1b2]">
              Program Director: <span className="text-white font-medium">{activeProgram.leadCoach}</span> · {activeProgram.duration}
            </div>
          </div>

          {/* 4 Workout Blocks */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9aa1b2]">
              Session Block Breakdown
            </h3>
            <div className="divide-y divide-white/8 rounded-xl border border-white/8 bg-[#0f131c]">
              {activeProgram.blocks.map((block) => (
                <div
                  key={block.phase}
                  className="flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-white">{block.phase}</div>
                    <p className="text-xs text-[#9aa1b2]">{block.detail}</p>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs shrink-0 tabular-nums">
                    <span className="text-[#00eefc]">{block.minutes}m</span>
                    <span className="text-[#caf300]">{block.targetHr}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Heart Rate Telemetry Curve Panel */}
        <div className="glass-surface-1 flex flex-col justify-between rounded-2xl p-6 sm:p-8 lg:col-span-5">
          <div className="space-y-1">
            <div className="text-xs font-medium text-[#9aa1b2]">
              Telemetry Profile
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Target Heart-Rate Curve (BPM)
            </h3>
          </div>

          <div className="my-6 space-y-3">
            <svg
              viewBox="0 0 360 170"
              className="w-full rounded-xl border border-white/8 bg-[#0a0e16]"
              role="img"
              aria-label={`Heart rate curve for ${activeProgram.title}`}
            >
              {/* Zone bands */}
              <rect x="16" y="18" width="328" height="36" fill="rgba(255,51,102,0.08)" />
              <rect x="16" y="54" width="328" height="46" fill="rgba(202,243,0,0.06)" />
              <rect x="16" y="100" width="328" height="48" fill="rgba(0,238,252,0.05)" />

              <text x="22" y="32" fill="#ff3366" fontSize="9" fontFamily="JetBrains Mono, monospace">
                ZONE 4–5 (165–190 BPM)
              </text>
              <text x="22" y="70" fill="#caf300" fontSize="9" fontFamily="JetBrains Mono, monospace">
                ZONE 2–3 (125–164 BPM)
              </text>
              <text x="22" y="138" fill="#00eefc" fontSize="9" fontFamily="JetBrains Mono, monospace">
                ZONE 1 RECOVERY
              </text>

              <polyline
                fill="none"
                stroke="#caf300"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
            </svg>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-white/8 bg-[#0f131c] p-3.5">
                <div className="text-[#8f9378]">Peak BPM Target</div>
                <div className="font-mono text-lg font-bold text-[#ff3366] tabular-nums">
                  {Math.max(...activeProgram.hrCurve)} BPM
                </div>
              </div>
              <div className="rounded-xl border border-white/8 bg-[#0f131c] p-3.5">
                <div className="text-[#8f9378]">Session Output</div>
                <div className="font-mono text-lg font-bold text-[#caf300] tabular-nums">
                  {activeProgram.avgBurnKcal}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-white/8 pt-5">
            <p className="text-xs text-[#9aa1b2]">
              Volt Pro &amp; Volt Black include unlimited daily access to all four programs. Volt Base includes 2 sessions/month.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('plans')}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#caf300] px-6 py-3 text-sm font-bold text-[#171e00] volt-transition hover:bg-[#d4ff00] cursor-pointer"
            >
              <span>Compare Plans for This Track</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
