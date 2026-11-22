# Moto-Alpha // Motorsport Preservation Architecture

**Moto-Alpha** is a motorsport-inspired auto detailing web application engineered with BMW M design aesthetics. Built for high-performance automotive preservation, the platform delivers interactive specification calculation, cleanroom bay telemetry, verified client reviews, live detailing advisory chat, and Supabase client authentication.

---

## Technical Stack

- **Framework**: React 19 + Vite 8
- **Animation & Physics**: Framer Motion 14 (multi-layer parallax, layout springs, scroll-driven progress)
- **Icons**: Lucide React
- **Micro-Interactions**: Canvas Confetti
- **Backend / Authentication**: Supabase (Phone / Email OTP Verification, Real-Time Database)
- **Styling**: Pure CSS Architecture with BMW M Design Tokens (`#0066b1`, `#1c69d4`, `#e22718`, `#000000`)
- **Linting & Code Quality**: Oxlint

---

## Core Features

1. **Multi-Plane Parallax Hero**:
   - Depth-separated background scaling and content dissipation driven by viewport scroll progress.
   - Ambient radar loop and studio telemetry entrance choreography.

2. **BMW M Tricolor Scroll Progress & Dynamics**:
   - Viewport-fixed 3px brand gradient progress bar tracking live scroll position.
   - Dynamic dark-glass navbar blur and floating return-to-top spring button.

3. **Live Interactive Configurator**:
   - 4-tier selection: Service Category &rarr; Product Armor Tier &rarr; Coat/Warranty Spec &rarr; Vehicle Platform.
   - Synchronized telemetry box with instant quote mapping and custom parameter handling.
   - Smooth BMW M tricolor active indicator gliding across tabs with Framer Motion `layoutId`.

4. **Motorsport Technical Specifications**:
   - Detailed PPF, 9H Ceramic Matrix, Paint Correction, and Interior restoration specs.
   - Animated tab switching with image hover zoom and border illumination.

5. **Client Authentication & Gated Booking**:
   - Phone and Email OTP authentication with 8-digit segmented auto-advancing input.
   - Persistent client username badge displayed in navbar navigation.
   - Gated reservation modal with studio slot selection and confetti celebration.

6. **Verified Telemetry Reviews**:
   - Real-time client feedback submission with star-rating spring micro-animations.

7. **Studio Detailing AI Assistant**:
   - Slide-up floating telemetry chatbot drawer providing instant technical guidance on cure times, film microns, and ceramic hardness.

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ShreyPatil1003/Moto-alpha.git
cd Moto-alpha
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase project credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Development Server
```bash
npm run dev
```

### 5. Production Build & Lint
```bash
npm run build
npm run lint
```

---

## License
Private / Proprietary &copy; Moto-Alpha Studio. All rights reserved.
