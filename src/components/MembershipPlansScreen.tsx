import { ArrowRight, Check, MapPin } from 'lucide-react';
import {
  ADD_ON_PACKS,
  CLUB_LOCATIONS,
  COMPARISON_ROWS,
  MEMBER_OUTCOMES,
  MEMBERSHIP_TIERS,
  formatInr,
  type BillingCycle,
  type ScreenId,
  type TierId,
} from '../data/membershipData';

interface MembershipPlansScreenProps {
  billingCycle: BillingCycle;
  onChangeBillingCycle: (cycle: BillingCycle) => void;
  selectedTierId: TierId;
  onSelectTier: (tierId: TierId) => void;
  selectedClubId: string;
  onSelectClub: (clubId: string) => void;
  selectedAddOnIds: string[];
  onToggleAddOn: (addOnId: string) => void;
  onProceedToCheckout: (tierId: TierId) => void;
  onNavigate: (screen: ScreenId) => void;
}

export function MembershipPlansScreen({
  billingCycle,
  onChangeBillingCycle,
  selectedTierId,
  onSelectTier,
  selectedClubId,
  onSelectClub,
  selectedAddOnIds,
  onToggleAddOn,
  onProceedToCheckout,
  onNavigate,
}: MembershipPlansScreenProps) {
  const selectedTier =
    MEMBERSHIP_TIERS.find((t) => t.id === selectedTierId) ?? MEMBERSHIP_TIERS[1];
  const basePrice =
    billingCycle === 'annual'
      ? selectedTier.annualMonthlyPriceInr
      : selectedTier.monthlyPriceInr;
  const addOnTotal = ADD_ON_PACKS.filter((a) => selectedAddOnIds.includes(a.id)).reduce(
    (sum, a) => sum + a.monthlyPriceInr,
    0,
  );
  const combinedMonthlyTotal = basePrice + addOnTotal;
  const selectedClub =
    CLUB_LOCATIONS.find((c) => c.id === selectedClubId) ?? CLUB_LOCATIONS[0];

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 lg:px-12 lg:py-16 space-y-20">
      {/* Section 1: Hero Proposition */}
      <section className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="flex flex-col justify-between space-y-8 lg:col-span-7">
          <div className="space-y-5">
            <p className="text-xs font-semibold tracking-wider text-[#00eefc] uppercase">
              Delhi NCR Performance Clubs · 05:00 – 00:00 Daily
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[54px] [text-wrap:balance]">
              Membership plans built for strength, output, and recovery.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#c5c9ac] sm:text-lg">
              Train on calibrated Eleiko racks, indoor sprint turf, and 4°C cold plunge suites across CyberHub, Khan Market, Hauz Khas, and Noida with transparent monthly or annual pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#tiers-grid"
              className="inline-flex items-center gap-2 rounded-full bg-[#caf300] px-7 py-3.5 text-sm font-bold text-[#171e00] volt-transition hover:bg-[#d4ff00] hover:shadow-[0_0_24px_rgba(212,255,0,0.4)] whitespace-nowrap shrink-0"
            >
              <span>Compare Membership Tiers</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => onNavigate('clubs')}
              className="inline-flex items-center gap-2 rounded-full border border-[#00eefc]/60 px-6 py-3.5 text-sm font-semibold text-[#00eefc] volt-transition hover:bg-[#00eefc]/10 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Inspect 4 NCR Studios</span>
            </button>
          </div>
        </div>

        {/* Architectural Club Capacity & Specs Panel */}
        <div className="glass-surface-1 flex flex-col justify-between rounded-2xl p-6 sm:p-8 lg:col-span-5">
          <div className="space-y-2 border-b border-white/8 pb-5">
            <div className="text-xs font-medium text-[#9aa1b2]">
              Active Club Network · Delhi NCR
            </div>
            <div className="font-display text-2xl font-bold text-white">
              One biometric pass, four arenas.
            </div>
          </div>

          <div className="my-6 grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="font-mono text-3xl font-bold text-[#caf300] tabular-nums">
                44
              </div>
              <div className="text-xs text-[#c5c9ac]">
                Eleiko Competition Racks
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl font-bold text-[#00eefc] tabular-nums">
                4.0 °C
              </div>
              <div className="text-xs text-[#c5c9ac]">
                Contrast Cold Plunges
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl font-bold text-white tabular-nums">
                59.5k
              </div>
              <div className="text-xs text-[#c5c9ac]">
                Total Sq Ft Training Floor
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl font-bold text-[#ff3366] tabular-nums">
                05–00h
              </div>
              <div className="text-xs text-[#c5c9ac]">
                Daily Operating Window
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/8 pt-4 text-xs text-[#9aa1b2]">
            <span>No lock-in penalty on monthly plans</span>
            <span className="font-mono text-[#dfe2ee]">GST Invoiced</span>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive Billing & Home Club Controls + 3-Tier Grid */}
      <section id="tiers-grid" className="space-y-8 scroll-mt-24">
        <div className="flex flex-col gap-5 border-b border-white/8 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold text-white [text-wrap:balance]">
              01. Choose Your Access Tier
            </h2>
            <p className="text-sm text-[#9aa1b2]">
              Switch between monthly flexibility and annual billing (20% lower monthly rate).
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Home Club Selector */}
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#181c24] px-3 py-2">
              <MapPin className="h-4 w-4 shrink-0 text-[#00eefc]" />
              <label htmlFor="home-club-select" className="sr-only">
                Select Home Club
              </label>
              <select
                id="home-club-select"
                value={selectedClubId}
                onChange={(e) => onSelectClub(e.target.value)}
                className="bg-transparent text-xs font-medium text-[#dfe2ee] focus:outline-none cursor-pointer"
              >
                {CLUB_LOCATIONS.map((club) => (
                  <option key={club.id} value={club.id} className="bg-[#181c24] text-white">
                    Home: {club.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Segmented Billing Cycle Switch */}
            <div
              className="inline-flex items-center rounded-full border border-white/10 bg-[#181c24] p-1"
              role="group"
              aria-label="Billing Cycle"
            >
              <button
                type="button"
                onClick={() => onChangeBillingCycle('monthly')}
                className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 volt-transition cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-[#31353e] text-white'
                    : 'text-[#9aa1b2] hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => onChangeBillingCycle('annual')}
                className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 volt-transition cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-[#caf300] text-[#171e00]'
                    : 'text-[#9aa1b2] hover:text-white'
                }`}
              >
                Annual · Save 20%
              </button>
            </div>
          </div>
        </div>

        {/* 3 Membership Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier) => {
            const activePrice =
              billingCycle === 'annual' ? tier.annualMonthlyPriceInr : tier.monthlyPriceInr;
            const annualSavings = (tier.monthlyPriceInr - tier.annualMonthlyPriceInr) * 12;
            const isSelected = selectedTierId === tier.id;
            const isHighlighted = tier.featured;

            return (
              <article
                key={tier.id}
                onClick={() => onSelectTier(tier.id)}
                className={`flex flex-col justify-between rounded-2xl p-6 sm:p-8 volt-transition cursor-pointer ${
                  isHighlighted
                    ? 'glass-surface-2'
                    : 'glass-surface-1 hover:border-white/20'
                } ${isSelected && !isHighlighted ? 'ring-1 ring-[#00eefc]/60' : ''}`}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div
                      className={`text-xs font-semibold ${
                        isHighlighted ? 'text-[#caf300]' : 'text-[#00eefc]'
                      }`}
                    >
                      {tier.kicker}
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl font-bold text-white">
                        {tier.name}
                      </h3>
                      {isSelected && (
                        <span className="font-mono text-[11px] font-semibold text-[#caf300]">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-[#9aa1b2]">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price Readout */}
                  <div className="border-y border-white/8 py-5 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-4xl font-bold tracking-tight text-white tabular-nums">
                        {formatInr(activePrice)}
                      </span>
                      <span className="text-xs text-[#9aa1b2]">/ month</span>
                    </div>
                    <div className="text-xs text-[#c5c9ac] tabular-nums">
                      {billingCycle === 'annual'
                        ? `Billed ${formatInr(activePrice * 12)} annually · Saves ${formatInr(annualSavings)}/yr`
                        : `Flexible month-to-month · Cancel with 15 days notice`}
                    </div>
                    <div className="pt-1 text-xs font-medium text-[#9aa1b2]">
                      {tier.id === 'base'
                        ? `${selectedClub.name} · 05:00 – 23:00`
                        : tier.accessSummary}
                    </div>
                  </div>

                  {/* Feature List */}
                  <ul className="space-y-3">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm text-[#dfe2ee]">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            isHighlighted ? 'text-[#caf300]' : 'text-[#00eefc]'
                          }`}
                        />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onProceedToCheckout(tier.id);
                    }}
                    className={`w-full rounded-full px-6 py-3.5 text-sm font-bold whitespace-nowrap volt-transition cursor-pointer ${
                      isHighlighted
                        ? 'bg-[#caf300] text-[#171e00] hover:bg-[#d4ff00] hover:shadow-[0_0_24px_rgba(212,255,0,0.4)]'
                        : 'border border-[#00eefc]/60 text-[#00eefc] hover:bg-[#00eefc]/12'
                    }`}
                  >
                    {tier.ctaLabel}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 3: Optional Recovery & Coaching Add-On Configurator */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl [text-wrap:balance]">
            02. Customize With Recovery &amp; Diagnostic Add-Ons
          </h2>
          <p className="text-sm text-[#9aa1b2]">
            Attach specialized recovery or metabolic testing packs to {selectedTier.name} and preview your live monthly rate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {ADD_ON_PACKS.map((pack) => {
            const checked = selectedAddOnIds.includes(pack.id);
            return (
              <label
                key={pack.id}
                className={`glass-surface-1 flex cursor-pointer items-start gap-4 rounded-xl p-5 volt-transition ${
                  checked ? 'border-[#caf300]/50 bg-[#1c2028]' : 'hover:border-white/20'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleAddOn(pack.id)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[0.375rem] border volt-transition ${
                    checked
                      ? 'border-[#caf300] bg-[#caf300] text-[#171e00]'
                      : 'border-white/25 bg-[#0f131c] text-transparent'
                  }`}
                >
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-white">
                      {pack.name}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#00eefc] tabular-nums shrink-0">
                      +{formatInr(pack.monthlyPriceInr)}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[#8f9378]">{pack.category}</div>
                  <p className="text-xs leading-relaxed text-[#9aa1b2]">{pack.summary}</p>
                </div>
              </label>
            );
          })}
        </div>

        {/* Live Configured Pass Summary Strip */}
        <div className="glass-surface-1 flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="text-xs font-medium text-[#9aa1b2]">
              Configured Pass · {billingCycle === 'annual' ? 'Annual Plan' : 'Monthly Plan'} · {selectedClub.name}
            </div>
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-display text-xl font-bold text-white">
                {selectedTier.name}
              </span>
              {selectedAddOnIds.length > 0 && (
                <span className="text-sm text-[#00eefc]">
                  + {selectedAddOnIds.length} add-on{selectedAddOnIds.length > 1 ? 's' : ''}
                </span>
              )}
              <span className="font-mono text-2xl font-bold text-[#caf300] tabular-nums">
                {formatInr(combinedMonthlyTotal)}/mo
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onProceedToCheckout(selectedTier.id)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#caf300] px-7 py-3 text-sm font-bold text-[#171e00] whitespace-nowrap shrink-0 volt-transition hover:bg-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.4)] cursor-pointer"
          >
            <span>Continue to Pass Checkout</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Section 4: Full Feature Comparison Matrix */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl [text-wrap:balance]">
            03. Full Entitlement Matrix
          </h2>
          <p className="text-sm text-[#9aa1b2]">
            Side-by-side breakdown of club access, recovery suite privileges, and diagnostic allowances.
          </p>
        </div>

        <div className="glass-surface-1 overflow-x-auto rounded-2xl">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-[#9aa1b2]">
                <th className="px-6 py-4">Entitlement</th>
                <th className="px-6 py-4">Volt Base</th>
                <th className="px-6 py-4 text-[#caf300]">Volt Pro</th>
                <th className="px-6 py-4">Volt Black</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8 text-sm">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{row.feature}</div>
                    <div className="text-xs text-[#8f9378]">{row.category}</div>
                  </td>
                  <td className="px-6 py-4 text-[#c5c9ac] tabular-nums">{row.base}</td>
                  <td className="px-6 py-4 font-medium text-white tabular-nums">{row.pro}</td>
                  <td className="px-6 py-4 text-[#dfe2ee] tabular-nums">{row.black}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Proof of Member Outcomes (Claim-to-Proof Adjacency) */}
      <section className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl [text-wrap:balance]">
              04. Measured Delhi NCR Member Outcomes
            </h2>
            <p className="text-sm text-[#9aa1b2]">
              Documented InBody 770 and race-split progressions across our active studio cohorts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('programs')}
            className="text-sm font-semibold text-[#00eefc] hover:underline self-start sm:self-auto cursor-pointer"
          >
            Inspect Training Programs →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {MEMBER_OUTCOMES.map((item) => (
            <article
              key={item.id}
              className="glass-surface-1 flex flex-col justify-between space-y-6 rounded-2xl p-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs text-[#8f9378]">
                  <span>{item.club}</span>
                  <span className="font-mono text-[#00eefc] tabular-nums">{item.timeframe}</span>
                </div>
                <div className="font-display text-lg font-bold text-[#caf300] tabular-nums">
                  {item.metric}
                </div>
                <p className="text-sm leading-relaxed text-[#dfe2ee]">
                  “{item.quote}”
                </p>
              </div>
              <div className="border-t border-white/8 pt-4 text-xs">
                <div className="font-semibold text-white">{item.memberName}</div>
                <div className="text-[#9aa1b2]">
                  {item.role} · {item.tier}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
