---
name: Cyber-Professional Noir
colors:
  surface: '#151217'
  surface-dim: '#151217'
  surface-bright: '#3b383d'
  surface-container-lowest: '#100d11'
  surface-container-low: '#1d1b1f'
  surface-container: '#231e27'
  surface-container-high: '#2c292d'
  surface-container-highest: '#373438'
  on-surface: '#e8e0e7'
  on-surface-variant: '#cdc3d0'
  inverse-surface: '#e8e0e7'
  inverse-on-surface: '#332f34'
  outline: '#968e99'
  outline-variant: '#4b444f'
  surface-tint: '#ddb7ff'
  primary: '#f0daff'
  on-primary: '#40215e'
  primary-container: '#ddb7ff'
  on-primary-container: '#644483'
  inverse-primary: '#715090'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#ffddaa'
  on-tertiary: '#432c00'
  tertiary-container: '#f9bb4d'
  on-tertiary-container: '#6e4b00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f0dbff'
  primary-fixed-dim: '#ddb7ff'
  on-primary-fixed: '#2a0848'
  on-primary-fixed-variant: '#583876'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffdeac'
  tertiary-fixed-dim: '#fabc4e'
  on-tertiary-fixed: '#281900'
  on-tertiary-fixed-variant: '#604100'
  background: '#16111b'
  on-background: '#e8e0e7'
  surface-variant: '#373438'
  glass-border: rgba(255, 255, 255, 0.1)
  neon-cyan: '#06B6D4'
  neon-magenta: '#D946EF'
  success-emerald: '#10B981'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1200px
---

## Brand & Style
The brand personality is high-tech, precise, and authoritative, blending an IT professional's technical rigor with a "Cyberpunk-lite" aesthetic. It targets a tech-savvy audience that values modern productivity tools and high-resolution craftsmanship. 

The visual style is **Glassmorphism** integrated with **Minimalist Typography**. It utilizes deep midnight surfaces, vibrant neon accents, and semi-transparent layers to create a sense of digital depth and "infra-structure" core aesthetics. The emotional response should be one of sophisticated reliability and cutting-edge efficiency.

## Colors
The palette is rooted in a deep violet-black background (`#16111b`) to ensure high contrast for glowing elements. 

- **Primary (Lavender Glow):** Used for highlights, active states, and brand identity. It should feel luminous against the dark background.
- **Secondary (Neon Cyan):** Reserved for technical indicators, small labels, and icon accents to reinforce the "high-tech" feel.
- **Surface Strategy:** Uses a tiered system of dark purples. Surfaces are never pure black but are tinted with the primary hue to maintain depth.
- **Accents:** Neon magenta and emerald are used sparingly for status indicators and interactive feedback.

## Typography
The system employs a three-font strategy to balance character and utility:

1.  **Display (Space Grotesk):** A geometric, technical sans-serif used for headlines. It conveys innovation and boldness.
2.  **Interface (Hanken Grotesk):** A clean, sharp contemporary sans-serif for body text and long-form reading, ensuring high legibility.
3.  **Data (JetBrains Mono):** A monospaced font used for labels, dates, and technical tags, reinforcing the developer/technician persona.

Large headlines use tight letter spacing and heavy weights to command attention, while body text uses generous line heights for comfort.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for desktop (centered with a 1200px max-width) and a **Fluid** approach for mobile. 

- **Vertical Rhythm:** Built on an 8px base unit. Sections are separated by large gaps (80px to 128px) to allow the "ambient glow" effects to breathe.
- **Margins:** Desktop uses a substantial 64px gutter to maintain a premium, editorial feel. Mobile scales down to 16px to maximize screen real estate.
- **Reflow:** Content moves from a multi-column desktop layout (e.g., Timeline text vs. Card) to a single-column stacked layout on mobile devices.

## Elevation & Depth
Depth is created through **Glassmorphism** and **Luminous Accents** rather than traditional shadows:

- **Surface Layers:** The base background features a subtle radial dot grid (`rgba(221, 183, 255, 0.03)`). Overlays use `backdrop-blur` (12px to 16px) and a semi-transparent surface color.
- **Borders:** "Ghost borders" using `rgba(255, 255, 255, 0.1)` define shapes without adding visual weight.
- **Glow Effects:** Interactive elements use `box-shadow` with the primary color at low opacity (e.g., `0 0 20px rgba(221, 183, 255, 0.15)`) to simulate light emission.
- **Gradients:** Subtle top-to-bottom gradients (Primary to Transparent) are used for vertical lines and decorative accents.

## Shapes
The system uses a "Soft Tech" shape language. 

- **Base Components:** 0.125rem (2px) for a sharp, precision-tool look on buttons and inputs.
- **Containers:** 0.75rem to 1rem (12px-16px) for cards and sections to provide a modern, approachable feel.
- **Pills:** Full rounding is used exclusively for status chips and "AI-augmented" indicators to distinguish them from structural elements.

## Components

### Buttons
- **Primary:** Solid Lavender (`#ddb7ff`) with dark text. 2px corner radius. Includes a trailing Material Symbol.
- **Outline:** Surface-container background with a Primary border at 50% opacity. Hover state increases border opacity and adds a subtle glow.

### Cards
- **Glass Cards:** Semi-transparent background, 12px backdrop blur, 1px white-alpha border. On hover, the border color shifts toward the primary hue and a light-bloom shadow is applied.

### Chips & Tags
- **Technical Tags:** Monospaced font, small text (12px), background matches `surface-bright`.
- **Status Pills:** Fully rounded, featuring a leading icon in a secondary accent color (Cyan).

### Navigation
- **Sticky Header:** Blurred background (`80%` opacity) with a bottom border. Active links are marked with a Primary-colored bottom border (2px) and bold monospaced text.

### Timeline
- A 2px vertical line using a Primary-to-Transparent gradient. Active nodes are marked with a solid Primary circle and a surrounding outer glow.