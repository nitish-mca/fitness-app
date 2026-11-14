import { CheckCircle2, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { CLUB_LOCATIONS } from '../data/membershipData';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultClubId?: string;
}

export function TrialModal({ isOpen, onClose, defaultClubId }: TrialModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [clubId, setClubId] = useState(defaultClubId || CLUB_LOCATIONS[0].id);
  const [error, setError] = useState('');
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanedPhone = phone.replace(/\s+/g, '');
    if (name.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!/^(\+91)?[6-9]\d{9}$/.test(cleanedPhone)) {
      setError('Enter a valid 10-digit Indian mobile number (e.g. +91 9811012345).');
      return;
    }

    setError('');
    setSubmittedCode(`KV-TRIAL-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const resetAndClose = () => {
    setSubmittedCode(null);
    setError('');
    onClose();
  };

  const selectedClub = CLUB_LOCATIONS.find((c) => c.id === clubId) ?? CLUB_LOCATIONS[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="trial-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-white/12 bg-[#181c24] p-6 sm:p-8 shadow-2xl">
        <button
          type="button"
          onClick={resetAndClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#9aa1b2] hover:bg-white/5 hover:text-white cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {submittedCode ? (
          <div className="space-y-5 py-2">
            <div className="flex items-center gap-3 text-[#caf300]">
              <CheckCircle2 className="h-6 w-6 shrink-0" />
              <span className="text-sm font-semibold">3-Day Trial Pass Issued</span>
            </div>
            <h2 id="trial-modal-title" className="font-display text-2xl font-bold text-white">
              You are booked at {selectedClub.name}
            </h2>
            <p className="text-sm leading-relaxed text-[#c5c9ac]">
              Show pass code <span className="font-mono font-bold text-[#00eefc]">{submittedCode}</span> at the biometric desk to activate three consecutive days of open floor and group class access.
            </p>
            <div className="rounded-xl border border-white/10 bg-[#0f131c] p-4 text-xs text-[#9aa1b2] space-y-1">
              <div>Pass Holder: <span className="text-white font-medium">{name}</span></div>
              <div>Club: <span className="text-white font-medium">{selectedClub.name} · {selectedClub.district}</span></div>
              <div>Valid Window: <span className="text-white font-medium">Next 14 days from first check-in</span></div>
            </div>
            <button
              type="button"
              onClick={resetAndClose}
              className="w-full rounded-full bg-[#caf300] px-6 py-3 text-sm font-bold text-[#171e00] volt-transition hover:bg-[#d4ff00] cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5 pr-8">
              <div className="text-xs font-medium text-[#00eefc]">
                Delhi NCR Guest Access · ₹0 Trial Pass
              </div>
              <h2 id="trial-modal-title" className="font-display text-2xl font-bold text-white">
                Book Your 3-Day Club Trial
              </h2>
              <p className="text-sm text-[#9aa1b2]">
                Train on our Olympic racks, join one MetCon 45 class, and tour the recovery suite before picking a plan.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="trial-club" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                  Preferred Club Location
                </label>
                <select
                  id="trial-club"
                  value={clubId}
                  onChange={(e) => setClubId(e.target.value)}
                  className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3.5 py-2.5 text-sm text-white focus:border-[#00eefc] focus:outline-none"
                >
                  {CLUB_LOCATIONS.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.name} — {club.district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="trial-name" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                  Full Name
                </label>
                <input
                  id="trial-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rohan Mehra"
                  className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3.5 py-2.5 text-sm text-white placeholder:text-[#6b7a90] focus:border-[#00eefc] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="trial-email" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                    Email Address
                  </label>
                  <input
                    id="trial-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rohan@domain.in"
                    className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3.5 py-2.5 text-sm text-white placeholder:text-[#6b7a90] focus:border-[#00eefc] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="trial-phone" className="mb-1.5 block text-xs font-medium text-[#c5c9ac]">
                    Mobile Number (+91)
                  </label>
                  <input
                    id="trial-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9811012345"
                    className="w-full rounded-lg border border-white/12 bg-[#0f131c] px-3.5 py-2.5 text-sm text-white placeholder:text-[#6b7a90] focus:border-[#00eefc] focus:outline-none tabular-nums"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="rounded-lg border border-[#ff3366]/40 bg-[#ff3366]/10 px-3 py-2 text-xs text-[#ffb2ba]">
                {error}
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={resetAndClose}
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-[#dfe2ee] hover:border-white/30 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-[#caf300] px-6 py-2.5 text-sm font-bold text-[#171e00] volt-transition hover:bg-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.4)] cursor-pointer"
              >
                Confirm Trial Pass
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
