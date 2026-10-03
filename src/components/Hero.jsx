import React from 'react';
import { ArrowRight, Shield, Award, Sparkles, ChevronRight, MapPin } from 'lucide-react';

export default function Hero({ onOpenBooking }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--canvas)',
        paddingTop: '64px',
        overflow: 'hidden'
      }}
    >
      {/* Full Bleed Background Image with Dark Scrim Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('/images/hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          filter: 'brightness(0.55) contrast(1.15)',
          zIndex: 1
        }}
      />

      {/* Edge Gradients for seamless dark canvas integration */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.95) 100%)',
          zIndex: 2
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 2
        }}
      />

      {/* Hero Content Band */}
      <div
        className="container-wide"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          paddingTop: '64px',
          paddingBottom: '64px'
        }}
      >
        <div style={{ maxWidth: '840px' }}>
          {/* Top Tag & M Tricolor Marker */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '6px 16px 6px 12px',
              border: '1px solid var(--hairline)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <div
              style={{
                width: '18px',
                height: '4px',
                background: 'linear-gradient(90deg, var(--m-blue-light) 0%, var(--m-blue-dark) 50%, var(--m-red) 100%)'
              }}
            />
            <span className="label-uppercase" style={{ fontSize: '12px', color: 'var(--body-strong)', letterSpacing: '2px' }}>
              GERMAN-ENGINEERED AUTO DETAILING & PPF
            </span>
          </div>

          {/* Headline Display XL */}
          <h1
            className="display-xl"
            style={{
              margin: '0 0 24px 0',
              color: 'var(--primary)',
              textTransform: 'uppercase',
              textShadow: '0 4px 30px rgba(0,0,0,0.8)'
            }}
          >
            ENGINEERED<br />
            <span style={{ color: 'var(--primary)' }}>PERFECTION.</span>
          </h1>

          {/* Editorial Subtitle (Light 300 Weight) */}
          <p
            style={{
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              fontWeight: 300,
              color: 'var(--body-strong)',
              maxWidth: '680px',
              lineHeight: 1.6,
              marginBottom: '40px'
            }}
          >
            Moto-Alpha operates at the pinnacle of automotive preservation. We deliver multi-stage paint correction, self-healing Paint Protection Film (PPF), and 9H Ceramic Coatings tailored for exotic & supercar platforms.
          </p>

          {/* M Tricolor Stripe Divider */}
          <div
            className="m-stripe-divider"
            style={{ width: '120px', marginBottom: '40px' }}
          />

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <button onClick={onOpenBooking} className="btn-primary">
              BOOK STUDIO SESSION <ArrowRight size={16} />
            </button>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=19.1812343,73.2188796"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderColor: 'var(--m-red)',
                color: 'var(--primary)',
                textDecoration: 'none'
              }}
            >
              <MapPin size={16} style={{ color: 'var(--m-red)' }} />
              NAVIGATE TO MOTO-ALPHA
            </a>

            <a href="#configurator" className="btn-outline">
              CONFIGURE DETAILING SPEC
            </a>

            <a href="#visualizer" className="text-link" style={{ marginLeft: '12px' }}>
              VIEW PPF GLOSS DEMO <ChevronRight size={16} />
            </a>
          </div>

          {/* Quick Telemetry Callouts */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '24px',
              marginTop: '64px',
              paddingTop: '32px',
              borderTop: '1px solid var(--hairline-strong)'
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--primary)' }}>
                100%
              </div>
              <div className="label-uppercase" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                CLEAN ROOM BAY
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--m-blue-dark)' }}>
                SELF-HEALING
              </div>
              <div className="label-uppercase" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                PPF FILM SHIELD
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--m-red)' }}>
                0.01 µm
              </div>
              <div className="label-uppercase" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                PAINT GAUGE PRECISION
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
