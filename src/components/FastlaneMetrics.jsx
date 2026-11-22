import React from 'react';
import { ShieldCheck, Zap, Gauge, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FastlaneMetrics() {
  const metrics = [
    {
      value: "9H+ HARDNESS",
      label: "CERTIFIED CERAMIC MATRIX",
      detail: "Ultra-dense nanostructure resistant to chemical etching, road salt & micro-marring.",
      color: "var(--m-blue-light)",
      icon: ShieldCheck
    },
    {
      value: "SELF-HEALING",
      label: "TPU PPF PROTECTION",
      detail: "Thermoplastic polyurethane technology that heals swirl marks under sun heat.",
      color: "var(--m-blue-dark)",
      icon: Award
    },
    {
      value: "0.01 µm",
      label: "PAINT DEPTH GAUGE ACCURACY",
      detail: "Ultrasonic digital micrometer inspection prior to dual-action machine polishing.",
      color: "var(--m-red)",
      icon: Gauge
    },
    {
      value: "< 24 HOURS",
      label: "EXPRESS STUDIO TURNAROUND",
      detail: "Infrared cure lamps accelerate ceramic polymer cross-linking by 400%.",
      color: "var(--primary)",
      icon: Zap
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section
      style={{
        backgroundColor: 'var(--canvas)',
        borderTop: '1px solid var(--hairline-strong)',
        borderBottom: '1px solid var(--hairline-strong)',
        paddingTop: '64px',
        paddingBottom: '64px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container-wide">
        {/* Header with Scroll Fade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div className="m-stripe-badge" />
              <span className="label-uppercase" style={{ fontSize: '12px', color: 'var(--muted)' }}>
                TELEMETRY & ENGINEERING STANDARDS
              </span>
            </div>
            <h2 className="display-sm" style={{ margin: 0 }}>FASTLANE SPECIFICATIONS</h2>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', letterSpacing: '2px', color: 'var(--muted)' }}>
            STUDIO VERIFIED // 2026
          </span>
        </motion.div>

        {/* 4-Up Spec Cell Grid with Scroll-Triggered Stagger */}
        <motion.div
          className="grid-4up"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {metrics.map((m, index) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  borderColor: m.color,
                  boxShadow: '0 14px 35px rgba(0, 0, 0, 0.7)',
                  transition: { duration: 0.25 }
                }}
                className="spec-cell"
                style={{
                  minHeight: '220px',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <Icon size={24} style={{ color: m.color }} />
                    </motion.div>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', color: 'var(--hairline)' }}>
                      0{index + 1}
                    </span>
                  </div>
                  <div className="spec-value" style={{ color: 'var(--primary)', fontSize: '26px' }}>
                    {m.value}
                  </div>
                  <div className="spec-label" style={{ color: m.color }}>
                    {m.label}
                  </div>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--body)', margin: '16px 0 0 0', lineHeight: 1.5 }}>
                  {m.detail}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
