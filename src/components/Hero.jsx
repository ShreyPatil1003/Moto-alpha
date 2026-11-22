import React, { useRef } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero({ onOpenBooking }) {
  const heroRef = useRef(null);
  
  // Parallax scroll hook linked to hero container
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "50px"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '94vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--canvas)',
        paddingTop: '64px',
        overflow: 'hidden'
      }}
    >
      {/* Full Bleed Parallax Background Image */}
      <motion.div
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
          y: bgY,
          scale: bgScale,
          zIndex: 1,
          willChange: 'transform'
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
          background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.98) 100%)',
          zIndex: 2
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '55%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 2
        }}
      />

      {/* Floating Ambient Parallax Glows */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(28, 105, 212, 0.18) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Hero Content Band with Scroll Parallax */}
      <motion.div
        className="container-wide"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          paddingTop: '64px',
          paddingBottom: '64px',
          y: contentY,
          opacity: contentOpacity
        }}
      >
        <div style={{ maxWidth: '840px' }}>
          
          {/* Top Tag & M Tricolor Marker */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
              backgroundColor: 'rgba(0,0,0,0.75)',
              padding: '6px 16px 6px 12px',
              border: '1px solid var(--hairline)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
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
          </motion.div>

          {/* Headline Display XL with Smooth Staggered Rise */}
          <motion.h1
            className="display-xl"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              margin: '0 0 24px 0',
              color: 'var(--primary)',
              textTransform: 'uppercase',
              textShadow: '0 4px 30px rgba(0,0,0,0.85)',
              letterSpacing: '-1px'
            }}
          >
            ENGINEERED<br />
            <span style={{ color: 'var(--primary)' }}>PERFECTION.</span>
          </motion.h1>

          {/* Editorial Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              fontWeight: 300,
              color: 'var(--body-strong)',
              maxWidth: '680px',
              lineHeight: 1.6,
              marginBottom: '36px'
            }}
          >
            Moto-Alpha operates at the pinnacle of automotive preservation. We deliver multi-stage paint correction, self-healing Paint Protection Film (PPF), and 9H Ceramic Coatings tailored for exotic & supercar platforms.
          </motion.p>

          {/* M Tricolor Stripe Divider with Scale Animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="m-stripe-divider"
            style={{ width: '120px', marginBottom: '36px', transformOrigin: 'left' }}
          />

          {/* Action CTAs with Interactive Spring Physics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <motion.button
              onClick={onOpenBooking}
              className="btn-primary"
              whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(28, 105, 212, 0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              BOOK STUDIO SESSION <ArrowRight size={16} />
            </motion.button>

            <motion.a
              href="https://www.google.com/maps/dir/?api=1&destination=19.1812343,73.2188796"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              whileHover={{ scale: 1.03, borderColor: 'var(--m-red)', boxShadow: '0 0 15px rgba(226, 39, 24, 0.4)' }}
              whileTap={{ scale: 0.97 }}
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
            </motion.a>

            <motion.a
              href="#configurator"
              className="btn-outline"
              whileHover={{ scale: 1.03, borderColor: 'var(--m-blue-light)' }}
              whileTap={{ scale: 0.97 }}
            >
              CONFIGURE DETAILING SPEC
            </motion.a>
          </motion.div>

          {/* Quick Telemetry Callouts with Scroll-Triggered Rise */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '24px',
              marginTop: '56px',
              paddingTop: '28px',
              borderTop: '1px solid var(--hairline-strong)'
            }}
          >
            <motion.div whileHover={{ y: -3 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--primary)' }}>
                100%
              </div>
              <div className="label-uppercase" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                CLEAN ROOM BAY
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -3 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--m-blue-dark)' }}>
                SELF-HEALING
              </div>
              <div className="label-uppercase" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                PPF FILM SHIELD
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -3 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--m-red)' }}>
                0.01 µm
              </div>
              <div className="label-uppercase" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                PAINT GAUGE PRECISION
              </div>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
