import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import {
  ADD_ON_PACKS,
  CLUB_LOCATIONS,
  MEMBERSHIP_TIERS,
  formatInr,
  type BillingCycle,
  type ScreenId,
  type TierId,
} from '../data/membershipData';

interface CheckoutScreenProps {
  billingCycle: BillingCycle;
  onChangeBillingCycle: (cycle: BillingCycle) => void;
  selectedTierId: TierId;
  onSelectTier: (tierId: TierId) => void;
  selectedClubId: string;
  onSelectClub: (clubId: string) => void;
  selectedAddOnIds: string[];
  onToggleAddOn: (addOnId: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

type PaymentMethod = 'upi' | 'card' | 'netbanking';

export function CheckoutScreen({
  billingCycle,
  onChangeBillingCycle,
  selectedTierId,
  onSelectTier,
  selectedClubId,
  onSelectClub,
  selectedAddOnIds,
  onToggleAddOn,
  onNavigate,
}: CheckoutScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [formError, setFormError] = useState('');
  const [issuedPassId, setIssuedPassId] = useState<string | null>(null);

  const tier =
    MEMBERSHIP_TIERS.find((t) => t.id === selectedTierId) ?? MEMBERSHIP_TIERS[1];
  const club =
    CLUB_LOCATIONS.find((c) => c.id === selectedClubId) ?? CLUB_LOCATIONS[0];
  const chosenAddOns = ADD_ON_PACKS.filter((a) => selectedAddOnIds.includes(a.id));

  const tierMonthly =
    billingCycle === 'annual' ? tier.annualMonthlyPriceInr : tier.monthlyPriceInr;
  const addOnsMonthly = chosenAddOns.reduce((sum, a) => sum + a.monthlyPriceInr, 0);
  const cycleMultiplier = billingCycle === 'annual' ? 12 : 1;

  const subtotal = (tierMonthly + addOnsMonthly) * cycleMultiplier;
  const discount = promoApplied ? Math.round(subtotal * 0.15) : 0;
  const discountedSubtotal = subtotal - discount;
  const gstAmount = Math.round(discountedSubtotal * 0.18);
  const grandTotal = discountedSubtotal + gstAmount;

  const handleApplyPromo = () => {
    const normalized = promoInput.trim().toUpperCase();
    if (normalized === 'NCRVOLT15') {
      setPromoApplied(true);
      setPromoMessage('NCRVOLT15 applied: 15% off your first billing cycle.');
    } else {
      setPromoApplied(false);
      setPromoMessage('Code not recognized. Try NCRVOLT15 for 15% first-cycle savings.');
    }
  };

  const handleConfirmCheckout = (e: FormEvent) => {
    e.preventDefault();
    const cleanedPhone = phone.replace(/\s+/g, '');

    if (fullName.trim().length < 2) {
      setFormError('Enter your full name for biometric club pass registration.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Enter a valid email address for GST invoice delivery.');
      return;
    }
    if (!/^(\+91)?[6-9]\d{9}$/.test(cleanedPhone)) {
      setFormError('Enter a valid 10-digit Indian mobile number (e.g. +91 9811012345).');
      return;
    }
    if (paymentMethod === 'upi' && upiId.trim() && !upiId.includes('@')) {
      setFormError('Enter a valid UPI ID (e.g. name@okaxis) or leave blank for QR pay.');
      return;
    }

    setFormError('');
    setIssuedPassId(`KV-${tier.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  if (issuedPassId) {
    return (
      <div className="mx-auto max-w-[920px] px-4 py-12 sm:px-8 lg:py-16">
        <div className="glass-surface-2 space-y-8 rounded-2xl p-6 sm:p-10">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#caf300]">
                <CheckCircle2 className="h-5 w-5" />
                <span>Membership Activated</span>
              </div>
              <h1 className="font-display text-3xl font-extrabold text-white">
                Welcome to {tier.name}, {fullName}
              </h1>
              <p className="text-sm text-[#c5c9ac]">
                Your digital club pass is ready for immediate turnstile entry at {tier.id === 'base' ? club.name : 'all 4 Delhi NCR clubs'}.
              </p>
            </div>

            {/* Clean Vector QR Pass Badge */}
            <div className="flex flex-col items-center rounded-xl border border-white/15 bg-white p-3 shrink-0 self-start">
              <svg viewBox="0 0 84 84" className="h-20 w-20" aria-label="Digital Club Entry Pass QR">
                <rect width="84" height="84" fill="#ffffff" />
                <rect x="6" y="6" width="22" height="22" fill="#0f131c" />
                <rect x="10" y="10" width="14" height="14" fill="#ffffff" />
                <rect x="13" y="13" width="8" height="8" fill="#0f131c" />
                <rect x="56" y="6" width="22" height="22" fill="#0f131c" />
                <rect x="60" y="10" width="14" height="14" fill="#ffffff" />
                <rect x="63" y="13" width="8" height="8" fill="#0f131c" />
                <rect x="6" y="56" width="22" height="22" fill="#0f131c" />
                <rect x="10" y="60" width="14" height="14" fill="#ffffff" />
                <rect x="13" y="63" width="8" height="8" fill="#0f131c" />
                <rect x="34" y="8" width="6" height="6" fill="#0f131c" />
                <rect x="44" y="14" width="6" height="10" fill="#0f131c" />
                <rect x="34" y="34" width="16" height="16" fill="#0f131c" />
                <rect x="38" y="38" width="8" height="8" fill="#caf300" />
                <rect x="8" y="36" width="12" height="6" fill="#0f131c" />
                <rect x="56" y="36" width="8" height="14" fill="#0f131c" />
                <rect x="68" y="42" width="10" height="8" fill="#0f131c" />
                <rect x="36" y="58" width="14" height="6" fill="#0f131c" />
                <rect x="56" y="58" width="10" height="10" fill="#0f131c" />
                <rect x="70" y="66" width="8" height="12" fill="#0f131c" />
              </svg>
              <span className="mt-1 font-mono text-[10px] font-bold text-[#0f131c]">
                {issuedPassId}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-sm">
            <div className="rounded-xl border border-white/10 bg-[#0f131c] p-4 space-y-1">
              <div className="text-xs text-[#8f9378]">Plan &amp; Cadence</div>
              <div className="font-semibold text-white">
                {tier.name} ({billingCycle === 'annual' ? 'Annual' : 'Monthly'})
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0f131c] p-4 space-y-1">
              <div className="text-xs text-[#8f9378]">Home Studio</div>
              <div className="font-semibold text-white">{club.name}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0f131c] p-4 space-y-1">
              <div className="text-xs text-[#8f9378]">Total Paid (incl. GST)</div>
              <div className="font-mono font-bold text-[#caf300] tabular-nums">
                {formatInr(grandTotal)}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => setIssuedPassId(null)}
              className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold text-[#dfe2ee] hover:border-white/30 cursor-pointer"
            >
              Edit Membership Details
            </button>
            <button
              type="button"
              onClick={() => onNavigate('clubs')}
              className="rounded-full bg-[#caf300] px-6 py-2.5 text-xs font-bold text-[#171e00] hover:bg-[#d4ff00] cursor-pointer"
            >
              Book First Class at {club.name}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 lg:px-12 lg:py-16 space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onNavigate('plans')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00eefc] hover:underline cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Membership Plans</span>
          </button>
          <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
            Configure &amp; Activate Your Club Pass
          </h1>
        </div>
      </div>

      <form onSubmit={handleConfirmCheckout} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Plan Options + Member Profile + Payment */}
        <div className="space-y-6 lg:col-span-7">
          {/* Tier & Cadence Switch */}
          <div className="glass-surface-1 space-y-5 rounded-2xl p-6">
            <h2 className="font-display text-lg font-bold text-white">
              01. Plan &amp; Home Club
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {MEMBERSHIP_TIERS.map((t) => {
                const active = t.id === tier.id;
                const price =
                  billingCycle === 'annual' ? t.annualMonthlyPriceInr : t.monthlyPriceInr;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => onSelectTier(t.id)}
                    className={`rounded-xl border p-4 text-left volt-transition cursor-pointer ${
                      active
                        ? 'border-[#caf300] bg-[#caf300]/10'
                        : 'border-white/10 bg-[#0f131c] hover:border-white/25'
                    }`}
                  >
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="mt-1 font-mono text-sm font-semibold text-[#caf300] tabular-nums">
                      {formatInr(price)}/mo
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="checkout-cycle" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                  Billing Cycle
                </label>
                <select
                  id="checkout-cycle"
                  value={billingCycle}
                  onChange={(e) => onChangeBillingCycle(e.target.value as BillingCycle)}
                  className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3.5 py-2.5 text-sm text-white focus:border-[#00eefc] focus:outline-none"
                >
                  <option value="monthly">Monthly Flexibility</option>
                  <option value="annual">Annual Billing (Save 20%)</option>
                </select>
              </div>
              <div>
                <label htmlFor="checkout-club" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                  Primary Home Club
                </label>
                <select
                  id="checkout-club"
                  value={selectedClubId}
                  onChange={(e) => onSelectClub(e.target.value)}
                  className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3.5 py-2.5 text-sm text-white focus:border-[#00eefc] focus:outline-none"
                >
                  {CLUB_LOCATIONS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.district})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Member Registration Details */}
          <div className="glass-surface-1 space-y-5 rounded-2xl p-6">
            <h2 className="font-display text-lg font-bold text-white">
              02. Member Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="member-name" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                  Full Legal Name (for biometric pass)
                </label>
                <input
                  id="member-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ananya Sharma"
                  className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3.5 py-2.5 text-sm text-white placeholder:text-[#6b7a90] focus:border-[#00eefc] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="member-email" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                    Email Address
                  </label>
                  <input
                    id="member-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ananya@domain.in"
                    className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3.5 py-2.5 text-sm text-white placeholder:text-[#6b7a90] focus:border-[#00eefc] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="member-phone" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                    Mobile Number (+91)
                  </label>
                  <input
                    id="member-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9811012345"
                    className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3.5 py-2.5 text-sm text-white placeholder:text-[#6b7a90] focus:border-[#00eefc] focus:outline-none tabular-nums"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="glass-surface-1 space-y-5 rounded-2xl p-6">
            <h2 className="font-display text-lg font-bold text-white">
              03. Payment Method
            </h2>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: 'upi', label: 'UPI (GPay / PhonePe)' },
                  { id: 'card', label: 'Credit / Debit Card' },
                  { id: 'netbanking', label: 'NetBanking' },
                ] as { id: PaymentMethod; label: string }[]
              ).map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold volt-transition cursor-pointer ${
                    paymentMethod === method.id
                      ? 'bg-[#00eefc] text-[#002022]'
                      : 'border border-white/12 bg-[#0f131c] text-[#dfe2ee] hover:border-white/25'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>

            {paymentMethod === 'upi' && (
              <div>
                <label htmlFor="upi-id" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                  UPI ID (optional — leave blank for instant QR)
                </label>
                <input
                  id="upi-id"
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="ananya@okhdfcbank"
                  className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3.5 py-2.5 text-sm text-white placeholder:text-[#6b7a90] focus:border-[#00eefc] focus:outline-none"
                />
              </div>
            )}

            {paymentMethod === 'card' && (
              <p className="rounded-lg border border-white/8 bg-[#0f131c] p-3.5 text-xs text-[#9aa1b2]">
                Visa, Mastercard, RuPay, and Amex tokenized auto-mandate supported with RBI e-mandate compliance.
              </p>
            )}

            {paymentMethod === 'netbanking' && (
              <p className="rounded-lg border border-white/8 bg-[#0f131c] p-3.5 text-xs text-[#9aa1b2]">
                Supports HDFC, ICICI, SBI, Axis, and Kotak instant settlement.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Promo */}
        <div className="space-y-6 lg:col-span-5">
          <div className="glass-surface-1 sticky top-24 space-y-6 rounded-2xl p-6 sm:p-8">
            <div className="border-b border-white/8 pb-4">
              <h2 className="font-display text-xl font-bold text-white">
                Order Summary
              </h2>
              <p className="text-xs text-[#9aa1b2]">
                {tier.name} · {billingCycle === 'annual' ? '12-Month Commitment' : 'Monthly Plan'}
              </p>
            </div>

            {/* Optional Add-ons quick toggle */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8f9378]">
                Included Add-Ons
              </div>
              {ADD_ON_PACKS.map((pack) => {
                const active = selectedAddOnIds.includes(pack.id);
                return (
                  <label
                    key={pack.id}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-white/8 bg-[#0f131c] px-3.5 py-2.5 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => onToggleAddOn(pack.id)}
                        className="accent-[#caf300]"
                      />
                      <span className={active ? 'text-white font-medium' : 'text-[#9aa1b2]'}>
                        {pack.name}
                      </span>
                    </div>
                    <span className="font-mono text-[#00eefc] tabular-nums">
                      +{formatInr(pack.monthlyPriceInr)}/mo
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Promo Code */}
            <div className="space-y-2">
              <label htmlFor="promo-code" className="block text-xs font-medium text-[#c5c9ac]">
                Promo Code (try <span className="font-mono text-[#caf300]">NCRVOLT15</span>)
              </label>
              <div className="flex gap-2">
                <input
                  id="promo-code"
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="NCRVOLT15"
                  className="flex-1 rounded-lg border border-white/12 bg-[#0f131c] px-3.5 py-2 text-xs font-mono uppercase text-white placeholder:text-[#6b7a90] focus:border-[#00eefc] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-white hover:border-[#caf300] hover:text-[#caf300] cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className={`text-xs ${promoApplied ? 'text-[#caf300]' : 'text-[#ffb2ba]'}`}>
                  {promoMessage}
                </p>
              )}
            </div>

            {/* Totals Breakdown */}
            <div className="space-y-2.5 border-t border-white/8 pt-4 text-sm tabular-nums">
              <div className="flex justify-between text-[#c5c9ac]">
                <span>
                  {tier.name} ({billingCycle === 'annual' ? '12 mo' : '1 mo'})
                </span>
                <span>{formatInr(tierMonthly * cycleMultiplier)}</span>
              </div>
              {addOnsMonthly > 0 && (
                <div className="flex justify-between text-[#c5c9ac]">
                  <span>Selected Add-Ons ({chosenAddOns.length})</span>
                  <span>{formatInr(addOnsMonthly * cycleMultiplier)}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-[#caf300]">
                  <span>Promo (NCRVOLT15)</span>
                  <span>-{formatInr(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#9aa1b2]">
                <span>GST (18%)</span>
                <span>{formatInr(gstAmount)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3 font-display text-lg font-bold text-white">
                <span>Total Due Today</span>
                <span className="font-mono text-[#caf300]">{formatInr(grandTotal)}</span>
              </div>
            </div>

            {formError && (
              <p className="rounded-lg border border-[#ff3366]/40 bg-[#ff3366]/10 px-3.5 py-2.5 text-xs text-[#ffb2ba]">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-[#caf300] px-6 py-3.5 text-sm font-bold text-[#171e00] volt-transition hover:bg-[#d4ff00] hover:shadow-[0_0_24px_rgba(212,255,0,0.4)] cursor-pointer"
            >
              Activate Membership Pass
            </button>

            <div className="flex items-center gap-2 text-xs text-[#8f9378]">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#00eefc]" />
              <span>Instant digital QR turnstile access · 15-day freeze guarantee</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
