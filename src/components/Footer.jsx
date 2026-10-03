import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenBooking }) {
  return (
    <footer
      style={{
        backgroundColor: 'var(--canvas)',
        borderTop: '1px solid var(--hairline)',
        paddingTop: '64px',
        paddingBottom: '40px',
        color: 'var(--body)'
      }}
    >
      <div className="container-wide">

        {/* Pre-Footer CTA Band */}
        <div
          style={{
            position: 'relative',
            backgroundColor: 'var(--surface-soft)',
            border: '1px solid var(--hairline)',
            padding: '48px 32px',
            marginBottom: '64px',
            overflow: 'hidden',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px'
          }}
        >
          {/* Subtle M Tricolor Bar at left */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '4px',
              background: 'linear-gradient(180deg, var(--m-blue-light) 0%, var(--m-blue-dark) 50%, var(--m-red) 100%)'
            }}
          />

          <div>
            <div className="label-uppercase" style={{ fontSize: '12px', color: 'var(--m-blue-dark)', marginBottom: '8px' }}>
              EXPERIENCE MOTORSPORT-GRADE DETAILING
            </div>
            <h2 className="display-sm" style={{ margin: 0, fontSize: '28px' }}>
              READY TO PROTECT YOUR SUPERCAR?
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button onClick={onOpenBooking} className="btn-primary">
              RESERVE STUDIO BAY NOW
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
            <a href="tel:+18005556686" className="btn-outline">
              CALL FASTLANE HOTLINE
            </a>
          </div>
        </div>

        {/* 4-Column Links Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '64px'
          }}
        >
          {/* Col 1: Studio Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '20px',
                  height: '4px',
                  background: 'linear-gradient(90deg, var(--m-blue-light) 0%, var(--m-blue-dark) 50%, var(--m-red) 100%)'
                }}
              />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '1px' }}>
                MOTO-ALPHA
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--body)', lineHeight: 1.6, marginBottom: '20px' }}>
              German motorsport-engineered automotive detailing, self-healing Paint Protection Film (PPF), and 9H Graphene Ceramic Coating studio.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--body-strong)', lineHeight: 1.5 }}>
                <MapPin size={16} style={{ color: 'var(--m-red)', flexShrink: 0, marginTop: '2px' }} />
                <span>Shop No. 2, Shreeji Landmark, Next to Tata Showroom, Opposite to Carmel Convent School, Chikhloli, Ambernath(East)</span>
              </div>
              <div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=19.1812343,73.2188796"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    fontSize: '11px',
                    marginTop: '4px',
                    borderColor: 'var(--m-red)',
                    color: 'var(--primary)',
                    textDecoration: 'none'
                  }}
                >
                  <MapPin size={14} style={{ color: 'var(--m-red)' }} />
                  NAVIGATE TO MOTO-ALPHA <ArrowUpRight size={14} />
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--body-strong)', marginTop: '4px' }}>
                <Phone size={14} style={{ color: 'var(--m-blue-dark)' }} />
                <span>+1 (800) 555-MOTO</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--body-strong)' }}>
                <Mail size={14} style={{ color: 'var(--m-blue-light)' }} />
                <span>concierge@moto-alpha.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <div className="label-uppercase" style={{ fontSize: '12px', color: 'var(--primary)', marginBottom: '20px' }}>
              PROTECTION SERVICES
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li><a href="#services" style={{ color: 'var(--body)', textDecoration: 'none' }}>Self-Healing PPF Stealth Wrap</a></li>
              <li><a href="#services" style={{ color: 'var(--body)', textDecoration: 'none' }}>9H Graphene Ceramic Matrix</a></li>
              <li><a href="#services" style={{ color: 'var(--body)', textDecoration: 'none' }}>Stage 3 Dual-Action Paint Restoration</a></li>
              <li><a href="#services" style={{ color: 'var(--body)', textDecoration: 'none' }}>Alcantara & Suede Cockpit Renewal</a></li>
              <li><a href="#services" style={{ color: 'var(--body)', textDecoration: 'none' }}>Ceramic Wheel & Caliper Protection</a></li>
            </ul>
          </div>

          {/* Col 3: Studio Specifications */}
          <div>
            <div className="label-uppercase" style={{ fontSize: '12px', color: 'var(--primary)', marginBottom: '20px' }}>
              FACILITY STANDARDS
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li><a href="#studio" style={{ color: 'var(--body)', textDecoration: 'none' }}>ISO Class 7 Clean Rooms</a></li>
              <li><a href="#studio" style={{ color: 'var(--body)', textDecoration: 'none' }}>Scangrip 96+ CRI Solar Lighting</a></li>
              <li><a href="#studio" style={{ color: 'var(--body)', textDecoration: 'none' }}>Infrared Shortwave Polymer Curing</a></li>
              <li><a href="#studio" style={{ color: 'var(--body)', textDecoration: 'none' }}>Ultrasonic Digital Paint Thickness Gauges</a></li>
              <li><a href="#visualizer" style={{ color: 'var(--body)', textDecoration: 'none' }}>Interactive Optical Visualizer</a></li>
            </ul>
          </div>

          {/* Col 4: Hours & Telemetry */}
          <div>
            <div className="label-uppercase" style={{ fontSize: '12px', color: 'var(--primary)', marginBottom: '20px' }}>
              OPERATING HOURS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div>
                <div style={{ color: 'var(--primary)', fontWeight: 600 }}>MONDAY - FRIDAY</div>
                <div style={{ color: 'var(--muted)' }}>08:00 AM - 07:00 PM</div>
              </div>
              <div>
                <div style={{ color: 'var(--primary)', fontWeight: 600 }}>SATURDAY (FASTLANE)</div>
                <div style={{ color: 'var(--muted)' }}>09:00 AM - 05:00 PM</div>
              </div>
              <div>
                <div style={{ color: 'var(--m-red)', fontWeight: 600 }}>SUNDAY</div>
                <div style={{ color: 'var(--muted)' }}>BY APPOINTMENT ONLY</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with BMW M Style Caption Disclaimer */}
        <div
          style={{
            borderTop: '1px solid var(--hairline-strong)',
            paddingTop: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '12px',
            color: 'var(--muted)'
          }}
        >
          <div>
            © 2026 MOTO-ALPHA DETAILING STUDIO. ALL RIGHTS RESERVED. DESIGNED ACCORDING TO BMW M MOTORSPORT STANDARDS.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: 'var(--muted)', textDecoration: 'none' }}>PRIVACY POLICY</a>
            <a href="#" style={{ color: 'var(--muted)', textDecoration: 'none' }}>TERMS OF SPECIFICATION</a>
            <a href="#" style={{ color: 'var(--muted)', textDecoration: 'none' }}>WARRANTY PORTAL</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
