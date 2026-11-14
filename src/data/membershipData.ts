export type ScreenId = 'plans' | 'clubs' | 'programs' | 'tracker' | 'checkout';
export type BillingCycle = 'monthly' | 'annual';
export type TierId = 'base' | 'pro' | 'black';

export interface MembershipTier {
  id: TierId;
  name: string;
  kicker: string;
  tagline: string;
  monthlyPriceInr: number;
  annualMonthlyPriceInr: number;
  featured: boolean;
  accessSummary: string;
  ctaLabel: string;
  features: string[];
  limitations?: string[];
}

export interface AddOnPack {
  id: string;
  name: string;
  category: string;
  monthlyPriceInr: number;
  summary: string;
}

export interface ComparisonRow {
  feature: string;
  category: string;
  base: string;
  pro: string;
  black: string;
}

export interface ClubLocation {
  id: string;
  name: string;
  district: string;
  address: string;
  hours: string;
  floorAreaSqFt: string;
  peakHours: string;
  occupancyPercent: number;
  zones: string[];
  highlights: { label: string; value: string }[];
  todayClasses: {
    id: string;
    time: string;
    title: string;
    discipline: 'Strength' | 'Conditioning' | 'Run Club' | 'Recovery';
    coach: string;
    durationMin: number;
    spotsLeft: number;
    hrZone: string;
  }[];
}

export interface TrainingProgram {
  id: string;
  title: string;
  discipline: 'Strength' | 'Conditioning' | 'Run Club' | 'Recovery';
  duration: string;
  intensityZone: string;
  avgBurnKcal: string;
  leadCoach: string;
  summary: string;
  blocks: { phase: string; minutes: number; targetHr: string; detail: string }[];
  hrCurve: number[];
}

export interface MemberOutcome {
  id: string;
  memberName: string;
  role: string;
  club: string;
  tier: string;
  metric: string;
  timeframe: string;
  quote: string;
}

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'base',
    name: 'Volt Base',
    kicker: 'Single-Club Floor Access',
    tagline: 'Full access to Olympic lifting platforms, conditioning turf, and calibrated machines at your chosen home club.',
    monthlyPriceInr: 4499,
    annualMonthlyPriceInr: 3599,
    featured: false,
    accessSummary: '1 Home Club · 05:00 – 23:00',
    ctaLabel: 'Select Volt Base',
    features: [
      'Unlimited open-floor access at 1 selected Delhi NCR club',
      '2 coach-led group conditioning sessions per month',
      'InBody 770 composition scan every 60 days',
      'Locker, cold towel service, and biometric turnstile entry',
      'App workout log & barbell velocity tracking',
    ],
  },
  {
    id: 'pro',
    name: 'Volt Pro',
    kicker: 'Most Popular · All-Club & Recovery',
    tagline: 'Unrestricted access across all four Delhi NCR arenas, daily high-output group classes, and contrast recovery suites.',
    monthlyPriceInr: 6999,
    annualMonthlyPriceInr: 5599,
    featured: true,
    accessSummary: 'All 4 NCR Clubs · 05:00 – 00:00',
    ctaLabel: 'Select Volt Pro',
    features: [
      'All-access entry to CyberHub, Khan Market, Hauz Khas & Noida',
      'Unlimited Volt Strength, MetCon 45 & Zone 4/5 Run Club classes',
      'Unlimited Infrared Sauna & 4°C Cold Plunge contrast suite',
      'Monthly InBody 770 scan + heart-rate threshold calibration',
      '2 guest day passes every month for training partners',
      'Priority 7-day advance class booking window',
    ],
  },
  {
    id: 'black',
    name: 'Volt Black',
    kicker: 'Private Coaching & Lab Suite',
    tagline: 'Built for competitive hybrid athletes and executives seeking dedicated 1-on-1 coaching, VO2 testing, and private lockers.',
    monthlyPriceInr: 12999,
    annualMonthlyPriceInr: 10399,
    featured: false,
    accessSummary: 'All 4 Clubs · 24/7 Keycard + Valet',
    ctaLabel: 'Select Volt Black',
    features: [
      'Everything in Volt Pro across all Delhi NCR locations',
      '4 private 1-on-1 strength or boxing sessions every month',
      'Quarterly VO2 Max & Lactate Threshold metabolic lab test',
      'Dedicated ventilated gear locker with overnight laundry service',
      '4 guest passes per month + priority valet parking at CyberHub & Khan Market',
      'Custom macro & hydration protocol reviewed bi-weekly',
    ],
  },
];

export const ADD_ON_PACKS: AddOnPack[] = [
  {
    id: 'cryo-suite',
    name: 'Cryo & Normatec Recovery Pass',
    category: 'Recovery',
    monthlyPriceInr: 1499,
    summary: '4 whole-body cryotherapy sessions and unlimited Normatec compression boot access.',
  },
  {
    id: 'metabolic-lab',
    name: 'Metabolic & Blood Biomarker Panel',
    category: 'Diagnostics',
    monthlyPriceInr: 1999,
    summary: 'Quarterly resting metabolic rate test plus sports-panel ferritin, vitamin D, and lipid tracking.',
  },
  {
    id: 'boxing-pod',
    name: '4-Pack Private Boxing & Conditioning',
    category: 'Coaching',
    monthlyPriceInr: 3499,
    summary: 'Four 50-minute technical padwork and rotational power sessions with pro-circuit coaches.',
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Club Access Scope',
    category: 'Access',
    base: '1 Home Club',
    pro: 'All 4 Delhi NCR Clubs',
    black: 'All 4 Clubs + 24/7 Keycard',
  },
  {
    feature: 'Group Training Classes',
    category: 'Training',
    base: '2 Sessions / Month',
    pro: 'Unlimited Daily Classes',
    black: 'Unlimited + Priority Waitlist',
  },
  {
    feature: 'Contrast Suite (Sauna + 4°C Plunge)',
    category: 'Recovery',
    base: 'Pay-per-use (₹650)',
    pro: 'Unlimited Included',
    black: 'Unlimited + Private Suite Slot',
  },
  {
    feature: '1-on-1 Performance Coaching',
    category: 'Coaching',
    base: 'Optional Add-on',
    pro: '1 Strategy Check-in / Mo',
    black: '4 Private Sessions / Month',
  },
  {
    feature: 'InBody 770 & VO2 Diagnostics',
    category: 'Telemetry',
    base: 'Bi-monthly InBody',
    pro: 'Monthly InBody + HR Zones',
    black: 'Monthly InBody + Quarterly VO2',
  },
  {
    feature: 'Guest Partner Passes',
    category: 'Perks',
    base: 'Not Included',
    pro: '2 Passes / Month',
    black: '4 Passes / Month',
  },
  {
    feature: 'Gear Locker & Laundry',
    category: 'Perks',
    base: 'Day Locker Only',
    pro: 'Day Locker + Towel Service',
    black: 'Dedicated Locker + Laundry',
  },
  {
    feature: 'Membership Freeze Window',
    category: 'Flexibility',
    base: '15 Days / Year',
    pro: '45 Days / Year',
    black: '90 Days / Year',
  },
];

export const CLUB_LOCATIONS: ClubLocation[] = [
  {
    id: 'cyberhub',
    name: 'CyberHub Arena',
    district: 'DLF Phase 2, Gurugram',
    address: 'Level B1, Building 10C, DLF CyberHub, Gurugram 122002',
    hours: '05:00 – 00:00 Daily',
    floorAreaSqFt: '18,500 sq ft',
    peakHours: '18:30 – 21:00',
    occupancyPercent: 62,
    zones: [
      '14 Eleiko Competition Lifting Platforms',
      '40m Indoor Sled & Sprint Turf',
      'Acoustic Dark-Room MetCon Arena',
      'Dual 4°C Cold Plunge & Cedar Infrared Sauna',
    ],
    highlights: [
      { label: 'Lifting Racks', value: '14' },
      { label: 'Sprint Turf', value: '40 m' },
      { label: 'Plunge Temp', value: '4.0 °C' },
      { label: 'Floor Area', value: '18.5k ft²' },
    ],
    todayClasses: [
      {
        id: 'ch-1',
        time: '06:30',
        title: 'Volt Strength: Posterior Chain',
        discipline: 'Strength',
        coach: 'Raghav Menon',
        durationMin: 55,
        spotsLeft: 4,
        hrZone: 'Zone 2–3',
      },
      {
        id: 'ch-2',
        time: '18:30',
        title: 'MetCon 45: Assault & Erg Intervals',
        discipline: 'Conditioning',
        coach: 'Aanya Kapoor',
        durationMin: 45,
        spotsLeft: 2,
        hrZone: 'Zone 4–5',
      },
      {
        id: 'ch-3',
        time: '20:00',
        title: 'Contrast Plunge & Thoracic Reset',
        discipline: 'Recovery',
        coach: 'Dr. Kabir Sethi',
        durationMin: 40,
        spotsLeft: 7,
        hrZone: 'Zone 1',
      },
    ],
  },
  {
    id: 'khan-market',
    name: 'Khan Market Vault',
    district: 'Central New Delhi',
    address: 'Middle Lane Loft, 44B Khan Market, New Delhi 110003',
    hours: '05:30 – 23:30 Daily',
    floorAreaSqFt: '11,200 sq ft',
    peakHours: '07:00 – 09:30',
    occupancyPercent: 48,
    zones: [
      '8 Calibrated Squat & Deadlift Stations',
      'Technogym Skillrun & Concept2 Erg Deck',
      'Metabolic Testing Lab & InBody Alcove',
      'Private Contrast Recovery Rooms',
    ],
    highlights: [
      { label: 'Lifting Racks', value: '8' },
      { label: 'Skillrun Decks', value: '12' },
      { label: 'Plunge Temp', value: '4.5 °C' },
      { label: 'Floor Area', value: '11.2k ft²' },
    ],
    todayClasses: [
      {
        id: 'km-1',
        time: '07:15',
        title: 'Zone 4/5 Threshold Treadmill Lab',
        discipline: 'Run Club',
        coach: 'Vikramaditya Rao',
        durationMin: 50,
        spotsLeft: 5,
        hrZone: 'Zone 4–5',
      },
      {
        id: 'km-2',
        time: '19:00',
        title: 'Volt Strength: Upper Push / Pull',
        discipline: 'Strength',
        coach: 'Meera Krishnan',
        durationMin: 55,
        spotsLeft: 6,
        hrZone: 'Zone 2–3',
      },
      {
        id: 'km-3',
        time: '20:30',
        title: 'Evening Mobility & Breathwork',
        discipline: 'Recovery',
        coach: 'Dr. Kabir Sethi',
        durationMin: 35,
        spotsLeft: 9,
        hrZone: 'Zone 1',
      },
    ],
  },
  {
    id: 'hauz-khas',
    name: 'Hauz Khas Foundry',
    district: 'South Delhi',
    address: 'Plot 18, Aurobindo Marg, Hauz Khas, New Delhi 110016',
    hours: '05:00 – 00:00 Daily',
    floorAreaSqFt: '15,800 sq ft',
    peakHours: '19:00 – 21:30',
    occupancyPercent: 71,
    zones: [
      '12 Olympic Platforms + Velocity Trackers',
      'Rooftop Night Run & Kettlebell Courtyard',
      'Heavy Bag Boxing & Rotational Power Bay',
      'Cryo Chamber & Normatec Lounge',
    ],
    highlights: [
      { label: 'Lifting Racks', value: '12' },
      { label: 'Boxing Bags', value: '16' },
      { label: 'Plunge Temp', value: '3.8 °C' },
      { label: 'Floor Area', value: '15.8k ft²' },
    ],
    todayClasses: [
      {
        id: 'hk-1',
        time: '06:00',
        title: 'Deer Park 8K Tempo & Track Splits',
        discipline: 'Run Club',
        coach: 'Vikramaditya Rao',
        durationMin: 60,
        spotsLeft: 8,
        hrZone: 'Zone 3–4',
      },
      {
        id: 'hk-2',
        time: '19:30',
        title: 'MetCon 45: Boxing & Sled Relay',
        discipline: 'Conditioning',
        coach: 'Aanya Kapoor',
        durationMin: 45,
        spotsLeft: 3,
        hrZone: 'Zone 4–5',
      },
      {
        id: 'hk-3',
        time: '21:00',
        title: 'Volt Strength: Olympic Barbell Tech',
        discipline: 'Strength',
        coach: 'Raghav Menon',
        durationMin: 55,
        spotsLeft: 5,
        hrZone: 'Zone 2–3',
      },
    ],
  },
  {
    id: 'noida',
    name: 'Noida Sec-18 Lab',
    district: 'Sector 18, Noida',
    address: 'Tower 2 Podium, Sector 18 Commercial Belt, Noida 201301',
    hours: '05:30 – 23:30 Daily',
    floorAreaSqFt: '14,000 sq ft',
    peakHours: '18:00 – 20:30',
    occupancyPercent: 44,
    zones: [
      '10 Power Racks with Force-Plate Flooring',
      '30m Conditioning Turf & SkiErg Wall',
      'VO2 Max & Lactate Testing Room',
      'Sauna & Cold Plunge Hydro Zone',
    ],
    highlights: [
      { label: 'Lifting Racks', value: '10' },
      { label: 'Sprint Turf', value: '30 m' },
      { label: 'Plunge Temp', value: '4.2 °C' },
      { label: 'Floor Area', value: '14.0k ft²' },
    ],
    todayClasses: [
      {
        id: 'nd-1',
        time: '07:00',
        title: 'Volt Strength: Squat & Core Density',
        discipline: 'Strength',
        coach: 'Meera Krishnan',
        durationMin: 55,
        spotsLeft: 7,
        hrZone: 'Zone 2–3',
      },
      {
        id: 'nd-2',
        time: '18:45',
        title: 'MetCon 45: Zero-Rest Erg Circuit',
        discipline: 'Conditioning',
        coach: 'Aanya Kapoor',
        durationMin: 45,
        spotsLeft: 4,
        hrZone: 'Zone 4–5',
      },
      {
        id: 'nd-3',
        time: '20:15',
        title: 'Cold Plunge & Parasympathetic Downshift',
        discipline: 'Recovery',
        coach: 'Dr. Kabir Sethi',
        durationMin: 35,
        spotsLeft: 6,
        hrZone: 'Zone 1',
      },
    ],
  },
];

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'volt-strength',
    title: 'Volt Strength',
    discipline: 'Strength',
    duration: '55 min',
    intensityZone: 'Zone 2–3 · Hypertrophy & Force',
    avgBurnKcal: '440 kcal',
    leadCoach: 'Raghav Menon',
    summary:
      'Periodized 8-week barbell cycles pairing primary compound lifts with unilateral stability work and bar-speed feedback.',
    blocks: [
      { phase: '01. Joint Prep & Velocity Primer', minutes: 10, targetHr: '115–130 BPM', detail: 'Dynamic hip capsule drills, plyo hops, empty-bar tempo triples.' },
      { phase: '02. Primary Compound Lift', minutes: 22, targetHr: '135–152 BPM', detail: 'Back squat, trap-bar deadlift, or incline press at 78–86% 1RM.' },
      { phase: '03. Accessory Density Supersets', minutes: 18, targetHr: '140–158 BPM', detail: '4-round paired hypertrophy blocks targeting weak-link stabilizers.' },
      { phase: '04. Down-Regulation', minutes: 5, targetHr: '95–110 BPM', detail: 'Nasal box breathing and posterior chain decompression.' },
    ],
    hrCurve: [98, 122, 138, 149, 144, 152, 146, 156, 148, 132, 112, 102],
  },
  {
    id: 'metcon-45',
    title: 'MetCon 45',
    discipline: 'Conditioning',
    duration: '45 min',
    intensityZone: 'Zone 4–5 · Anaerobic Threshold',
    avgBurnKcal: '680 kcal',
    leadCoach: 'Aanya Kapoor',
    summary:
      'High-output team ergometer, sled push, and kettlebell intervals engineered inside acoustic dark-room arenas.',
    blocks: [
      { phase: '01. Neural Ignition', minutes: 7, targetHr: '125–140 BPM', detail: 'Progressive SkiErg ramps and medicine-ball rotational slams.' },
      { phase: '02. Threshold Interval Blocks', minutes: 18, targetHr: '162–178 BPM', detail: '3 x 4-minute maximum-output relays across Concept2 rowers & heavy sleds.' },
      { phase: '03. Finisher EMOM', minutes: 14, targetHr: '170–186 BPM', detail: 'Every minute on the minute alternating burpee box-overs and kettlebell cleans.' },
      { phase: '04. Recovery Flush', minutes: 6, targetHr: '110–125 BPM', detail: 'Zone 1 spin flush and electrolyte hydration protocol.' },
    ],
    hrCurve: [108, 138, 156, 172, 164, 179, 170, 184, 181, 165, 135, 116],
  },
  {
    id: 'run-club',
    title: 'Zone 4/5 Run Club',
    discipline: 'Run Club',
    duration: '50 min',
    intensityZone: 'Zone 3–5 · VO2 & Pace Calibration',
    avgBurnKcal: '610 kcal',
    leadCoach: 'Vikramaditya Rao',
    summary:
      'Structured Skillrun incline sprints and outdoor Deer Park / CyberHub tempo loops with split-time pacing.',
    blocks: [
      { phase: '01. Running Mechanics & Ankles', minutes: 10, targetHr: '120–135 BPM', detail: 'A-skips, pogos, and cadence calibration at 176–182 spm.' },
      { phase: '02. Lactate Threshold Repeats', minutes: 24, targetHr: '160–175 BPM', detail: '5 x 800m paced efforts at 10K goal pace with 90s active float.' },
      { phase: '03. Neuromuscular Strides', minutes: 10, targetHr: '168–182 BPM', detail: '4 x 20s steep-incline sprints focused on forefoot stiffness.' },
      { phase: '04. Stride Cooldown', minutes: 6, targetHr: '105–120 BPM', detail: 'Easy jog downshift and calf/soleus release.' },
    ],
    hrCurve: [102, 128, 152, 166, 154, 170, 158, 174, 178, 160, 128, 108],
  },
  {
    id: 'contrast-recovery',
    title: 'Cold Plunge & Mobility',
    discipline: 'Recovery',
    duration: '40 min',
    intensityZone: 'Zone 1 · Parasympathetic Reset',
    avgBurnKcal: '140 kcal',
    leadCoach: 'Dr. Kabir Sethi',
    summary:
      'Guided contrast hydrotherapy cycling between 75°C infrared sauna and 4°C cold plunge paired with end-range joint work.',
    blocks: [
      { phase: '01. End-Range Joint CARs', minutes: 12, targetHr: '90–105 BPM', detail: 'Controlled articular rotations for spine, shoulders, and hip flexors.' },
      { phase: '02. Infrared Sauna Heat Cycle', minutes: 15, targetHr: '108–122 BPM', detail: 'Full-spectrum heat exposure to elevate core circulation.' },
      { phase: '03. 4°C Cold Plunge Immersion', minutes: 6, targetHr: '82–96 BPM', detail: 'Controlled nasal cadence during two 3-minute cold immersions.' },
      { phase: '04. Vagal Downshift', minutes: 7, targetHr: '64–74 BPM', detail: 'Legs-up decompression and extended-exhale breath cadence.' },
    ],
    hrCurve: [88, 96, 102, 114, 120, 118, 92, 86, 80, 72, 68, 65],
  },
];

export const MEMBER_OUTCOMES: MemberOutcome[] = [
  {
    id: 'out-1',
    memberName: 'Siddharth Malhotra',
    role: 'Product Lead, Gurugram',
    club: 'CyberHub Arena',
    tier: 'Volt Pro · Annual',
    metric: '-11.4% Body Fat & +38 kg Deadlift',
    timeframe: '16 Weeks',
    quote:
      'Having 05:00 to midnight access plus contrast plunge right at CyberHub meant I stopped skipping evening sessions after sprint reviews.',
  },
  {
    id: 'out-2',
    memberName: 'Nandini Verma',
    role: 'Architect, New Delhi',
    club: 'Khan Market Vault',
    tier: 'Volt Black',
    metric: '10K PB dropped from 54:20 to 46:08',
    timeframe: '12 Weeks',
    quote:
      'Quarterly VO2 testing took the guesswork out of my Zone 4 intervals. Every run block had an exact pace target backed by data.',
  },
  {
    id: 'out-3',
    memberName: 'Arjun Khurana',
    role: 'Founder, South Delhi',
    club: 'Hauz Khas Foundry',
    tier: 'Volt Pro · Monthly',
    metric: '52 Consecutive Active Weeks',
    timeframe: '1 Year',
    quote:
      'All-club reciprocity lets me train at Hauz Khas on mornings I stay in South Delhi and hit Noida Sec-18 between partner meetings.',
  },
];

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
