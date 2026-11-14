import type { ScreenId } from '../data/membershipData';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-white/8 bg-[#0a0e16]">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5 space-y-3">
            <div className="font-display text-lg font-extrabold text-white">Kinetic Volt</div>
            <p className="max-w-sm text-sm leading-relaxed text-[#9aa1b2]">
              Strength, metabolic conditioning, and contrast recovery studios engineered for urban athletes across Delhi NCR.
            </p>
            <p className="text-xs text-[#8f9378]">
              CyberHub Gurugram · Khan Market · Hauz Khas · Noida Sector 18
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-[#c5c9ac] uppercase">
              Club Navigation
            </h3>
            <ul className="space-y-2 text-sm text-[#9aa1b2]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('plans')}
                  className="hover:text-[#caf300] volt-transition cursor-pointer"
                >
                  Membership Plans
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('clubs')}
                  className="hover:text-[#caf300] volt-transition cursor-pointer"
                >
                  Delhi NCR Clubs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('programs')}
                  className="hover:text-[#caf300] volt-transition cursor-pointer"
                >
                  Training Programs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('tracker')}
                  className="hover:text-[#caf300] volt-transition cursor-pointer"
                >
                  Workout Tracker
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('checkout')}
                  className="hover:text-[#caf300] volt-transition cursor-pointer"
                >
                  Pass Checkout
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-[#c5c9ac] uppercase">
              Member Desk &amp; Hours
            </h3>
            <p className="text-sm text-[#9aa1b2] tabular-nums">
              05:00 – 00:00 IST · 7 Days a Week
            </p>
            <p className="text-sm text-[#9aa1b2]">
              Concierge: concierge@kineticvolt.in
            </p>
            <p className="text-sm text-[#9aa1b2] tabular-nums">
              +91 11 4902 8800
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-[#8f9378] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Kinetic Volt Performance Clubs Pvt. Ltd. All rights reserved.</span>
          <span>Prices inclusive of digital club pass activation · 18% GST itemized at checkout</span>
        </div>
      </div>
    </footer>
  );
}
