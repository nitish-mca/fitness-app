import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { ScreenId } from '../data/membershipData';

interface NavbarProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenTrial: () => void;
}

const NAV_ITEMS: { id: ScreenId; label: string }[] = [
  { id: 'plans', label: 'Plans' },
  { id: 'clubs', label: 'Clubs' },
  { id: 'programs', label: 'Programs' },
  { id: 'tracker', label: 'Tracker' },
  { id: 'checkout', label: 'Checkout' },
];

export function Navbar({ activeScreen, onNavigate, onOpenTrial }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (screen: ScreenId) => {
    onNavigate(screen);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#0f131c]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-4 py-3.5 sm:px-8 lg:px-12">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleNav('plans')}
          className="font-display text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#caf300] cursor-pointer"
        >
          Kinetic Volt
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 volt-transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#caf300] ${
                  isActive ? 'text-[#caf300]' : 'text-[#c5c9ac] hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[15px] h-[2px] bg-[#caf300]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action + mobile drawer trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenTrial}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#caf300] px-5 py-2 text-xs font-bold tracking-wide text-[#171e00] whitespace-nowrap shrink-0 volt-transition hover:bg-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.4)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00eefc]"
          >
            Book 3-Day Trial
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[#dfe2ee] md:hidden hover:border-white/25 cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/8 bg-[#0f131c] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium volt-transition cursor-pointer ${
                    isActive
                      ? 'bg-[#1c2028] text-[#caf300]'
                      : 'text-[#dfe2ee] hover:bg-[#181c24]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs font-mono text-[#caf300]">Active</span>}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenTrial();
              }}
              className="mt-3 w-full rounded-full bg-[#caf300] px-5 py-3 text-center text-sm font-bold text-[#171e00] cursor-pointer"
            >
              Book 3-Day Trial
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
