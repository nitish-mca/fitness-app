import { CalendarCheck, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import { CLUB_LOCATIONS, type ScreenId } from '../data/membershipData';

interface ClubsScreenProps {
  selectedClubId: string;
  onSelectClub: (clubId: string) => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenTrial: () => void;
}

export function ClubsScreen({
  selectedClubId,
  onSelectClub,
  onNavigate,
  onOpenTrial,
}: ClubsScreenProps) {
  const [disciplineFilter, setDisciplineFilter] = useState<string>('All');
  const [reservedClassIds, setReservedClassIds] = useState<string[]>([]);

  const activeClub =
    CLUB_LOCATIONS.find((c) => c.id === selectedClubId) ?? CLUB_LOCATIONS[0];

  const disciplines = ['All', 'Strength', 'Conditioning', 'Run Club', 'Recovery'];
  const filteredClasses =
    disciplineFilter === 'All'
      ? activeClub.todayClasses
      : activeClub.todayClasses.filter((cls) => cls.discipline === disciplineFilter);

  const toggleReserve = (classId: string) => {
    setReservedClassIds((prev) =>
      prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId],
    );
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 lg:px-12 lg:py-16 space-y-12">
      {/* Header & Club Switcher */}
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#00eefc]">
            Delhi NCR Studio Network
          </p>
          <h1 className="font-display text-3xl font-extrabold text-white sm:text-5xl [text-wrap:balance]">
            Four performance clubs engineered for zero wait times.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[#9aa1b2] sm:text-base">
            Volt Pro and Volt Black members train across all four locations seamlessly. Volt Base members select one home club below.
          </p>
        </div>

        {/* Club Selector Tabs */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Club Locations">
          {CLUB_LOCATIONS.map((club) => {
            const isActive = club.id === activeClub.id;
            return (
              <button
                key={club.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectClub(club.id)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold whitespace-nowrap shrink-0 volt-transition cursor-pointer ${
                  isActive
                    ? 'bg-[#caf300] text-[#171e00]'
                    : 'border border-white/10 bg-[#181c24] text-[#dfe2ee] hover:border-white/25'
                }`}
              >
                {club.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Club Details + Architectural Floor Telemetry */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="glass-surface-1 space-y-6 rounded-2xl p-6 sm:p-8 lg:col-span-7">
          <div className="flex flex-col gap-3 border-b border-white/8 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <div className="text-xs font-medium text-[#00eefc]">{activeClub.district}</div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                {activeClub.name}
              </h2>
              <p className="flex items-center gap-1.5 text-xs text-[#9aa1b2]">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#8f9378]" />
                <span>{activeClub.address}</span>
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-[#c5c9ac] space-y-1 shrink-0">
              <div className="flex items-center sm:justify-end gap-1.5 font-mono text-white tabular-nums">
                <Clock className="h-3.5 w-3.5 text-[#caf300]" />
                <span>{activeClub.hours}</span>
              </div>
              <div className="text-[#8f9378]">Peak: {activeClub.peakHours}</div>
            </div>
          </div>

          {/* 4 Metric Highlights */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {activeClub.highlights.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/8 bg-[#0f131c] p-4 space-y-1"
              >
                <div className="font-mono text-xl font-bold text-white tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs text-[#8f9378]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Training Zones List */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#c5c9ac]">
              Equipment &amp; Recovery Zones
            </h3>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {activeClub.zones.map((zone) => (
                <div
                  key={zone}
                  className="rounded-lg border border-white/8 bg-[#0f131c]/70 px-4 py-3 text-sm text-[#dfe2ee]"
                >
                  {zone}
                </div>
              ))}
            </div>
          </div>

          {/* Current Floor Load Bar */}
          <div className="space-y-2 border-t border-white/8 pt-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#9aa1b2]">Typical Evening Floor Load</span>
              <span className="font-mono font-bold text-[#00eefc] tabular-nums">
                {activeClub.occupancyPercent}% Capacity
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#0f131c]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00eefc] to-[#caf300]"
                style={{ width: `${activeClub.occupancyPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Architectural Blueprint / Zone Map Graphic (Clean Vector) */}
        <div className="glass-surface-1 flex flex-col justify-between rounded-2xl p-6 sm:p-8 lg:col-span-5">
          <div className="space-y-1">
            <div className="text-xs font-medium text-[#9aa1b2]">Studio Schematic</div>
            <h3 className="font-display text-xl font-bold text-white">
              Floor Zoning &amp; Flow
            </h3>
          </div>

          <svg
            viewBox="0 0 360 240"
            className="my-6 w-full rounded-xl border border-white/8 bg-[#0a0e16]"
            role="img"
            aria-label={`${activeClub.name} architectural studio zone schematic`}
          >
            <defs>
              <pattern id="volt-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="360" height="240" fill="url(#volt-grid)" />
            {/* Zone A: Olympic Racks */}
            <rect
              x="16"
              y="16"
              width="156"
              height="108"
              rx="8"
              fill="rgba(202,243,0,0.08)"
              stroke="#caf300"
              strokeOpacity="0.45"
            />
            <text x="28" y="38" fill="#caf300" fontSize="10" fontFamily="JetBrains Mono, monospace">
              ZONE A · LIFTING
            </text>
            <text x="28" y="56" fill="#dfe2ee" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif">
              Eleiko Platforms
            </text>
            {/* Rack ticks */}
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={28 + i * 26}
                y="76"
                width="16"
                height="28"
                rx="2"
                fill="rgba(202,243,0,0.22)"
              />
            ))}

            {/* Zone B: Sprint Turf */}
            <rect
              x="188"
              y="16"
              width="156"
              height="108"
              rx="8"
              fill="rgba(0,238,252,0.07)"
              stroke="#00eefc"
              strokeOpacity="0.45"
            />
            <text x="200" y="38" fill="#00eefc" fontSize="10" fontFamily="JetBrains Mono, monospace">
              ZONE B · TURF &amp; ERG
            </text>
            <text x="200" y="56" fill="#dfe2ee" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif">
              Sled &amp; Conditioning
            </text>
            <line x1="200" y1="88" x2="330" y2="88" stroke="#00eefc" strokeDasharray="4 4" strokeOpacity="0.6" />
            <line x1="200" y1="102" x2="330" y2="102" stroke="#00eefc" strokeDasharray="4 4" strokeOpacity="0.6" />

            {/* Zone C: Recovery */}
            <rect
              x="16"
              y="140"
              width="210"
              height="84"
              rx="8"
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.18)"
            />
            <text x="28" y="164" fill="#c5c9ac" fontSize="10" fontFamily="JetBrains Mono, monospace">
              ZONE C · CONTRAST SUITE
            </text>
            <text x="28" y="184" fill="#dfe2ee" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif">
              4°C Plunge &amp; Infrared Sauna
            </text>

            {/* Zone D: Diagnostics */}
            <rect
              x="240"
              y="140"
              width="104"
              height="84"
              rx="8"
              fill="rgba(255,51,102,0.08)"
              stroke="#ff3366"
              strokeOpacity="0.45"
            />
            <text x="252" y="164" fill="#ff3366" fontSize="10" fontFamily="JetBrains Mono, monospace">
              LAB
            </text>
            <text x="252" y="184" fill="#dfe2ee" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
              InBody &amp; VO2
            </text>
          </svg>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onOpenTrial}
              className="rounded-full border border-[#00eefc]/60 px-5 py-2.5 text-xs font-semibold text-[#00eefc] hover:bg-[#00eefc]/10 cursor-pointer"
            >
              Tour {activeClub.name}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('plans')}
              className="rounded-full bg-[#caf300] px-5 py-2.5 text-xs font-bold text-[#171e00] hover:bg-[#d4ff00] cursor-pointer"
            >
              Join With Home Club
            </button>
          </div>
        </div>
      </div>

      {/* Today's Live Session Schedule for Active Club */}
      <section className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              Today’s Schedule at {activeClub.name}
            </h2>
            <p className="text-sm text-[#9aa1b2]">
              Reserve a spot preview with your Volt Pro or trial pass.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 rounded-xl border border-white/10 bg-[#181c24] p-1">
            {disciplines.map((disc) => (
              <button
                key={disc}
                type="button"
                onClick={() => setDisciplineFilter(disc)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap volt-transition cursor-pointer ${
                  disciplineFilter === disc
                    ? 'bg-[#31353e] text-white'
                    : 'text-[#9aa1b2] hover:text-white'
                }`}
              >
                {disc}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {filteredClasses.map((cls) => {
            const isReserved = reservedClassIds.includes(cls.id);
            return (
              <article
                key={cls.id}
                className="glass-surface-1 flex flex-col justify-between space-y-5 rounded-2xl p-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#caf300] tabular-nums">
                      {cls.time} IST · {cls.durationMin} min
                    </span>
                    <span className="text-[#00eefc]">{cls.hrZone}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {cls.title}
                  </h3>
                  <p className="text-xs text-[#9aa1b2]">
                    Coach: {cls.coach} · {cls.discipline}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/8 pt-4">
                  <span className="font-mono text-xs text-[#c5c9ac] tabular-nums">
                    {isReserved ? cls.spotsLeft - 1 : cls.spotsLeft} spots open
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleReserve(cls.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold volt-transition cursor-pointer ${
                      isReserved
                        ? 'bg-[#00eefc]/15 text-[#00eefc] border border-[#00eefc]/50'
                        : 'bg-[#caf300] text-[#171e00] hover:bg-[#d4ff00]'
                    }`}
                  >
                    {isReserved && <CalendarCheck className="h-3.5 w-3.5" />}
                    <span>{isReserved ? 'Spot Held' : 'Hold Spot'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
