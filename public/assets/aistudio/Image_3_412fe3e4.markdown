---
name: Kinetic Volt
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353942'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#dfe2ee'
  on-surface-variant: '#c5c9ac'
  inverse-surface: '#dfe2ee'
  inverse-on-surface: '#2c3039'
  outline: '#8f9378'
  outline-variant: '#444932'
  surface-tint: '#b0d500'
  primary: '#ffffff'
  on-primary: '#2a3400'
  primary-container: '#caf300'
  on-primary-container: '#596c00'
  inverse-primary: '#536600'
  secondary: '#d3fbff'
  on-secondary: '#00363a'
  secondary-container: '#00eefc'
  on-secondary-container: '#00686f'
  tertiary: '#ffffff'
  on-tertiary: '#670020'
  tertiary-container: '#ffd9dc'
  on-tertiary-container: '#c90046'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#caf300'
  primary-fixed-dim: '#b0d500'
  on-primary-fixed: '#171e00'
  on-primary-fixed-variant: '#3e4c00'
  secondary-fixed: '#7df4ff'
  secondary-fixed-dim: '#00dbe9'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f54'
  tertiary-fixed: '#ffd9dc'
  tertiary-fixed-dim: '#ffb2ba'
  on-tertiary-fixed: '#400011'
  on-tertiary-fixed-variant: '#910030'
  background: '#0f131c'
  on-background: '#dfe2ee'
  surface-variant: '#31353e'
typography:
  display-lg:
    fontFamily: Syne
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Syne
    fontSize: 38px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Syne
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
  metric-display:
    fontFamily: Space Grotesk
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 2rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers an intense, high-octane dark aesthetic engineered for urban Zillennial fitness enthusiasts across Delhi NCR. It merges the athletic grit of strength training with late-night underground club culture, creating a digital environment that feels electric, hyper-motivating, and distinctly premium.

The visual direction combines **Dark Mode Glassmorphism** with **Technical High-Contrast Typography**. Frosted translucent slate surfaces allow vibrant ambient underglows to bleed through, paired with razor-sharp telemetry widgets and electric fluorescent accents. The interface avoids conventional flat athletic tropes in favor of an immersive, nocturnal fitness club atmosphere.

## Colors

The palette relies on deep abyssal slates paired with ultra-saturated phosphor accents:

- **Primary (`#D4FF00` - Cyber Lime):** The core kinetic driver. Reserved for primary calls-to-action, active workout states, personal record highlights, and high-energy telemetry.
- **Secondary (`#00F0FF` - Electric Cyan):** Used for secondary metrics (pace, hydration, recovery), interactive links, and split-interval data.
- **Tertiary (`#FF3366` - Hyper Coral):** Dedicated to exertion indicators, high heart rate zones (Zone 4/5), alerts, and urgent motivational cues.
- **Neutral Dark Canvas (`#0B0F17` to `#131A26`):** Deep oceanic slates that serve as the base substrate, preventing optical fatigue while maintaining extreme contrast against phosphor accents.

Apply colored glows and high-saturation fills sparingly. Backgrounds must remain grounded in dark, semi-translucent layers so bright neons retain maximum punch.

## Typography

The typographic hierarchy balances expressive, sculptural display headlines with clean readability and machine-calibrated telemetry:

- **Syne (Headlines & Display):** Wide, architectural, and defiant. Used in uppercase or tight tracking for hero banners, workout program titles, and high-impact motivational slogans.
- **Plus Jakarta Sans (Body & Titles):** Clean, geometric, and highly legible across dark backdrops. Handles user profiles, workout breakdowns, and instruction text.
- **Space Grotesk (Labels, Badges & Metrics):** Monospaced-leaning, technical grotesque. Used for heart rate monitors, caloric burn readouts, reps, sets, and pill metadata. Labels should often be rendered in uppercase with generous letter spacing.

## Layout & Spacing

The layout is built upon an 8pt spatial cadence with an adaptive fluid grid model:

- **Mobile (< 768px):** 4-column layout, `1rem` margins, `1rem` gutters. Metric cards stack or horizontally snap-scroll.
- **Tablet (768px – 1024px):** 8-column layout, `2rem` margins, `1rem` gutters.
- **Desktop (> 1024px):** 12-column layout with a maximum container boundary of `1280px`, centered with `3rem` margins and `1.5rem` gutters.

Dynamic workout sessions utilize a dense, high-frequency dashboard arrangement where key telemetry stays docked or pinned above the fold.

## Elevation & Depth

Visual hierarchy is achieved through stacked frosted-glass surfaces, dark slate luminous borders, and concentrated neon halos:

- **Base Layer:** `#0B0F17` matte canvas.
- **Surface Level 1 (Cards, Modules):** Background `#131A26` with `85%` opacity, backdrop-filter `blur(16px)`, bound by a 1px border of `rgba(255, 255, 255, 0.08)`.
- **Surface Level 2 (Active/Hover States, Modals):** Background `rgba(26, 35, 51, 0.75)`, backdrop-filter `blur(24px)`, with a subtle inset edge highlight `rgba(212, 255, 0, 0.15)`.
- **Neon Atmosphere:** Hovering interactive elements and high-tier workout rings cast diffused ambient drop shadows (`0 8px 32px rgba(212, 255, 0, 0.2)` or `0 8px 32px rgba(0, 240, 255, 0.18)`). Hard drop shadows are strictly prohibited.

## Shapes

The shape system employs rounded geometric containers (`0.5rem` to `1rem`) for structural elements like workout cards and panels, preserving crisp visual architecture. Badges, pill counters, metric chips, and primary action buttons utilize full capsule radius (`9999px`) to create an athletic, tactile aesthetic.

## Components

### Buttons
- **Primary Kinetic:** Capsule (`9999px`), solid `#D4FF00` fill, dark text (`#0B0F17`) in Space Grotesk bold. On hover/active: bloom glow `0 0 20px rgba(212, 255, 0, 0.45)`.
- **Secondary Ghost:** Capsule (`9999px`), transparent fill, 1.5px border `#00F0FF`, text `#00F0FF`. Hover initiates a translucent background tint `rgba(0, 240, 255, 0.12)`.
- **Destructive/Critical:** Semi-translucent `#FF3366` surface with high-contrast white typography.

### Workout Cards
- Built with Surface Level 1 glass styling (`backdrop-filter: blur(16px)`).
- Top edge features a subtle 1px gradient stroke shifting from primary neon to transparent.
- Internal layout displays session duration, coach avatar, and intensity level badges.

### Metric Widgets & Counters
- Compact slate containers featuring an oversized `metric-display` Space Grotesk number.
- Upper right corner hosts a directional icon or delta indicator (`+14%`, `BPM`, `KCAL`) rendered in uppercase `label-sm`.
- Accent progress bars feature animated linear gradients terminating in a bright neon circular bead.

### Chips & Badges
- Strict pill styling (`9999px`), height `24px` to `28px`.
- Inactive: `rgba(255, 255, 255, 0.06)` background with muted white text.
- Active/Intensity Tags: `rgba(212, 255, 0, 0.15)` background, `#D4FF00` border, `#D4FF00` label text.

### Input Fields
- Dark translucent slate background (`#131A26`), 1px outline in `rgba(255, 255, 255, 0.12)`, `rounded-md` (0.5rem).
- Active focus triggers a solid `#00F0FF` or `#D4FF00` 1.5px border with a faint matching glow.
- Monospaced technical placeholder text in muted cool grey (`#6B7A90`).

### Checkboxes & Radios
- Checkboxes: `0.375rem` rounded corners, dark border. Checked state renders solid `#D4FF00` with deep slate icon mark.
- Radios: Circular pill with an electric cyan core ring on selection.