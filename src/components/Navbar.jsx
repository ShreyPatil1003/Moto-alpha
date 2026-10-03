import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X, MessageSquare, MapPin } from 'lucide-react';

export default function Navbar({ onOpenBooking, onOpenChat }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.95)' : 'var(--canvas)',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: '1px solid var(--hairline-strong)',
          zIndex: 100,
          transition: 'all 0.3s ease'
        }}
      >
        <div
          className="container-wide"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo with BMW M Tricolor Stripe */}
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none'
            }}
          >
            {/* M Tricolor Badge Marker */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div
                style={{
                  width: '28px',
                  height: '4px',
                  background: 'linear-gradient(90deg, var(--m-blue-light) 0%, var(--m-blue-light) 33.3%, var(--m-blue-dark) 33.3%, var(--m-blue-dark) 66.6%, var(--m-red) 66.6%, var(--m-red) 100%)'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  color: 'var(--primary)',
                  textTransform: 'uppercase',
                  lineHeight: 1
                }}
              >
                MOTO<span style={{ color: 'var(--m-red)' }}>-</span>ALPHA
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  marginTop: '2px'
                }}
              >
                MOTORSPORT DETAILING STUDIO
              </span>
            </div>
          </a>

          {/* Nav Links - Desktop */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '32px'
            }}
            className="desktop-nav"
          >
            <a href="#services" className="text-link" style={{ fontSize: '13px', fontWeight: 400, color: 'var(--body-strong)' }}>
              SERVICES
            </a>
            <a href="#visualizer" className="text-link" style={{ fontSize: '13px', fontWeight: 400, color: 'var(--body-strong)' }}>
              PPF VISUALIZER
            </a>
            <a href="#configurator" className="text-link" style={{ fontSize: '13px', fontWeight: 400, color: 'var(--body-strong)' }}>
              CONFIGURATOR
            </a>
            <a href="#studio" className="text-link" style={{ fontSize: '13px', fontWeight: 400, color: 'var(--body-strong)' }}>
              STUDIO BAYS
            </a>
            <a href="#reviews" className="text-link" style={{ fontSize: '13px', fontWeight: 400, color: 'var(--body-strong)' }}>
              TELEMETRY
            </a>
          </nav>

          {/* Right Action Cluster */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={onOpenChat}
              className="btn-icon"
              title="Studio Chatbot"
              style={{ width: '40px', height: '40px' }}
            >
              <MessageSquare size={18} />
            </button>

            {/* Desktop CTA Cluster */}
            <div className="nav-cta-cluster" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={onOpenBooking}
                className="btn-primary"
                style={{ height: '40px', padding: '0 18px', fontSize: '12px' }}
              >
                <Calendar size={14} />
                BOOK SESSION
              </button>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=19.1812343,73.2188796"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{
                  height: '40px',
                  padding: '0 16px',
                  fontSize: '11px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                  borderColor: 'var(--m-red)',
                  color: 'var(--primary)'
                }}
              >
                <MapPin size={14} style={{ color: 'var(--m-red)' }} />
                NAVIGATE TO MOTO-ALPHA
              </a>
            </div>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
              className="mobile-hamburger"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--canvas)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 24px'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '4px',
              background: 'linear-gradient(90deg, var(--m-blue-light) 0%, var(--m-blue-dark) 50%, var(--m-red) 100%)',
              marginBottom: '32px'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="display-heading"
              style={{ fontSize: '24px', textDecoration: 'none' }}
            >
              01. DETAILING SERVICES & SPECS
            </a>
            <a
              href="#visualizer"
              onClick={() => setMobileMenuOpen(false)}
              className="display-heading"
              style={{ fontSize: '24px', textDecoration: 'none' }}
            >
              02. PPF GLOSS VISUALIZER
            </a>
            <a
              href="#configurator"
              onClick={() => setMobileMenuOpen(false)}
              className="display-heading"
              style={{ fontSize: '24px', textDecoration: 'none' }}
            >
              03. STUDIO CONFIGURATOR
            </a>
            <a
              href="#studio"
              onClick={() => setMobileMenuOpen(false)}
              className="display-heading"
              style={{ fontSize: '24px', textDecoration: 'none' }}
            >
              04. CLEAN ROOM FACILITIES
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="display-heading"
              style={{ fontSize: '24px', textDecoration: 'none' }}
            >
              05. CLIENT TELEMETRY
            </a>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              BOOK STUDIO SESSION NOW
            </button>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=19.1812343,73.2188796"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{
                width: '100%',
                justifyContent: 'center',
                borderColor: 'var(--m-red)',
                color: 'var(--primary)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <MapPin size={16} style={{ color: 'var(--m-red)' }} />
              NAVIGATE TO MOTO-ALPHA
            </a>
          </div>
        </div>
      )}

      {/* Media query styles */}
      <style>{`
        .desktop-nav { display: none !important; }
        .nav-cta-cluster { display: none !important; }
        .mobile-hamburger { display: flex !important; }

        @media (min-width: 768px) {
          .nav-cta-cluster { display: flex !important; }
        }

        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}
