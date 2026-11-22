import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X, MessageSquare, MapPin, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenBooking, onOpenChat, user, onOpenAuth, onSignOut }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const displayUsername = (
    user?.username ||
    user?.user_metadata?.username ||
    (typeof localStorage !== 'undefined' ? localStorage.getItem('moto_alpha_username') : '') ||
    'CLIENT'
  ).slice(0, 10).toUpperCase();

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
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: '1px solid var(--hairline-strong)',
          zIndex: 100,
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease'
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
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
          </motion.a>

          {/* Nav Links - Desktop */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '32px'
            }}
            className="desktop-nav"
          >
            <motion.a href="#services" whileHover={{ y: -2, color: 'var(--primary)' }} className="text-link" style={{ fontSize: '13px', fontWeight: 400, color: 'var(--body-strong)' }}>
              SERVICES
            </motion.a>
            <motion.a href="#configurator" whileHover={{ y: -2, color: 'var(--primary)' }} className="text-link" style={{ fontSize: '13px', fontWeight: 400, color: 'var(--body-strong)' }}>
              CONFIGURATOR
            </motion.a>
            <motion.a href="#studio" whileHover={{ y: -2, color: 'var(--primary)' }} className="text-link" style={{ fontSize: '13px', fontWeight: 400, color: 'var(--body-strong)' }}>
              STUDIO BAYS
            </motion.a>
            <motion.a href="#reviews" whileHover={{ y: -2, color: 'var(--primary)' }} className="text-link" style={{ fontSize: '13px', fontWeight: 400, color: 'var(--body-strong)' }}>
              TELEMETRY
            </motion.a>
          </nav>

          {/* Right Action Cluster */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.button
              onClick={onOpenChat}
              className="btn-icon"
              title="Studio Chatbot"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              style={{ width: '40px', height: '40px' }}
            >
              <MessageSquare size={18} />
            </motion.button>

            {/* Desktop CTA Cluster: BOOK SESSION -> NAVIGATE TO MOTO-ALPHA -> LOGIN/SIGNUP (or Profile Icon) */}
            <div className="nav-cta-cluster" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* 1. Book Session */}
              <motion.button
                onClick={onOpenBooking}
                className="btn-primary"
                whileHover={{ scale: 1.04, boxShadow: '0 0 15px rgba(28, 105, 212, 0.4)' }}
                whileTap={{ scale: 0.96 }}
                style={{ height: '40px', padding: '0 18px', fontSize: '12px' }}
              >
                <Calendar size={14} />
                BOOK SESSION
              </motion.button>

              {/* 2. Navigate to Moto-alpha */}
              <motion.a
                href="https://www.google.com/maps/dir/?api=1&destination=19.1812343,73.2188796"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                whileHover={{ scale: 1.03, borderColor: 'var(--m-red)', boxShadow: '0 0 15px rgba(226, 39, 24, 0.3)' }}
                whileTap={{ scale: 0.97 }}
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
              </motion.a>

              {/* 3. User Login/SignUp OR Profile Icon with Username (on the right side of Navigate to Moto-alpha) */}
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{
                      height: '40px',
                      padding: '0 12px 0 8px',
                      backgroundColor: 'var(--surface-card)',
                      border: '1px solid var(--m-blue-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '11px',
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '0.5px',
                      color: 'var(--primary)',
                      boxShadow: '0 0 10px rgba(0, 102, 177, 0.25)'
                    }}
                    title={`Studio Pilot: ${displayUsername}`}
                  >
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(28, 105, 212, 0.25)',
                        border: '1px solid var(--m-blue-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--m-blue-light)',
                        flexShrink: 0
                      }}
                    >
                      <User size={13} />
                    </div>
                    <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {displayUsername}
                    </span>
                  </motion.div>
                  <motion.button
                    onClick={onSignOut}
                    className="btn-icon"
                    title="Sign Out"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    style={{ width: '40px', height: '40px' }}
                  >
                    <LogOut size={16} />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  onClick={onOpenAuth}
                  className="btn-outline"
                  whileHover={{ scale: 1.03, borderColor: 'var(--primary)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{ height: '40px', padding: '0 14px', fontSize: '11px', gap: '6px' }}
                >
                  <User size={14} />
                  LOGIN / SIGNUP
                </motion.button>
              )}
            </div>

            {/* Mobile Hamburger toggle */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
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
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
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
                href="#configurator"
                onClick={() => setMobileMenuOpen(false)}
                className="display-heading"
                style={{ fontSize: '24px', textDecoration: 'none' }}
              >
                02. STUDIO CONFIGURATOR
              </a>
              <a
                href="#studio"
                onClick={() => setMobileMenuOpen(false)}
                className="display-heading"
                style={{ fontSize: '24px', textDecoration: 'none' }}
              >
                03. CLEAN ROOM FACILITIES
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="display-heading"
                style={{ fontSize: '24px', textDecoration: 'none' }}
              >
                04. CLIENT TELEMETRY
              </a>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* 1. Book Studio Session Now */}
              <motion.button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn-primary"
                whileTap={{ scale: 0.97 }}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                BOOK STUDIO SESSION NOW
              </motion.button>

              {/* 2. Navigate to Moto-alpha */}
              <motion.a
                href="https://www.google.com/maps/dir/?api=1&destination=19.1812343,73.2188796"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                whileTap={{ scale: 0.97 }}
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
              </motion.a>

              {/* 3. User Login/SignUp OR Profile Icon with Username */}
              {user ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      backgroundColor: 'var(--surface-card)',
                      border: '1px solid var(--m-blue-dark)',
                      fontSize: '12px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(28, 105, 212, 0.25)',
                        border: '1px solid var(--m-blue-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--m-blue-light)',
                        flexShrink: 0
                      }}
                    >
                      <User size={14} />
                    </div>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', textTransform: 'uppercase' }}>
                      {displayUsername}
                    </span>
                  </div>
                  <motion.button
                    onClick={() => { setMobileMenuOpen(false); onSignOut(); }}
                    className="btn-outline"
                    whileTap={{ scale: 0.92 }}
                    style={{ padding: '0 16px' }}
                    title="Sign Out"
                  >
                    <LogOut size={16} />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="btn-outline"
                  whileTap={{ scale: 0.97 }}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <User size={16} /> LOGIN / SIGNUP
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
