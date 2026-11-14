import { useEffect, useState } from 'react';
import { CheckoutScreen } from './components/CheckoutScreen';
import { ClubsScreen } from './components/ClubsScreen';
import { Footer } from './components/Footer';
import { MembershipPlansScreen } from './components/MembershipPlansScreen';
import { Navbar } from './components/Navbar';
import { ProgramsScreen } from './components/ProgramsScreen';
import { TrialModal } from './components/TrialModal';
import { WorkoutTrackerScreen } from './components/WorkoutTrackerScreen';
import {
  CLUB_LOCATIONS,
  type BillingCycle,
  type ScreenId,
  type TierId,
} from './data/membershipData';

const VALID_SCREENS: ScreenId[] = ['plans', 'clubs', 'programs', 'tracker', 'checkout'];

function getInitialScreen(): ScreenId {
  const hash = window.location.hash.replace('#', '') as ScreenId;
  return VALID_SCREENS.includes(hash) ? hash : 'plans';
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>(getInitialScreen);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  const [selectedTierId, setSelectedTierId] = useState<TierId>('pro');
  const [selectedClubId, setSelectedClubId] = useState<string>(CLUB_LOCATIONS[0].id);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [trialModalOpen, setTrialModalOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      const next = window.location.hash.replace('#', '') as ScreenId;
      if (VALID_SCREENS.includes(next)) {
        setActiveScreen(next);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (screen: ScreenId) => {
    setActiveScreen(screen);
    if (window.location.hash !== `#${screen}`) {
      window.history.pushState(null, '', `#${screen}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAddOn = (addOnId: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId],
    );
  };

  const handleProceedToCheckout = (tierId: TierId) => {
    setSelectedTierId(tierId);
    handleNavigate('checkout');
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0f131c] text-[#dfe2ee] overflow-x-hidden">
      {/* Subtle nocturnal ambient underglows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top_right,rgba(0,238,252,0.08),transparent_55%),radial-gradient(ellipse_at_top_left,rgba(202,243,0,0.06),transparent_50%)]"
      />

      <Navbar
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        onOpenTrial={() => setTrialModalOpen(true)}
      />

      <main className="relative z-10 flex-1">
        {activeScreen === 'plans' && (
          <MembershipPlansScreen
            billingCycle={billingCycle}
            onChangeBillingCycle={setBillingCycle}
            selectedTierId={selectedTierId}
            onSelectTier={setSelectedTierId}
            selectedClubId={selectedClubId}
            onSelectClub={setSelectedClubId}
            selectedAddOnIds={selectedAddOnIds}
            onToggleAddOn={handleToggleAddOn}
            onProceedToCheckout={handleProceedToCheckout}
            onNavigate={handleNavigate}
          />
        )}

        {activeScreen === 'clubs' && (
          <ClubsScreen
            selectedClubId={selectedClubId}
            onSelectClub={setSelectedClubId}
            onNavigate={handleNavigate}
            onOpenTrial={() => setTrialModalOpen(true)}
          />
        )}

        {activeScreen === 'programs' && (
          <ProgramsScreen onNavigate={handleNavigate} />
        )}

        {activeScreen === 'tracker' && (
          <WorkoutTrackerScreen defaultClubId={selectedClubId} />
        )}

        {activeScreen === 'checkout' && (
          <CheckoutScreen
            billingCycle={billingCycle}
            onChangeBillingCycle={setBillingCycle}
            selectedTierId={selectedTierId}
            onSelectTier={setSelectedTierId}
            selectedClubId={selectedClubId}
            onSelectClub={setSelectedClubId}
            selectedAddOnIds={selectedAddOnIds}
            onToggleAddOn={handleToggleAddOn}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <TrialModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        defaultClubId={selectedClubId}
      />
    </div>
  );
}
