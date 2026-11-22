import React from 'react';
import { Star, Quote, MessageSquarePlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Testimonials({ reviews = [], onOpenReview }) {
  const defaultReviews = [
    {
      name: "MAXIMILIAN V.",
      vehicle: "2025 BMW M4 COMPETITION xDRIVE",
      service: "FULL STEALTH PPF & 9H CERAMIC",
      quote: "Moto-Alpha treated my M4 CS with surgical precision. The stealth matte wrap alignment is flawless — not a single visible seam or edge distortion. Outstanding motorsport-grade studio.",
      rating: 5,
      date: "SEPTEMBER 2026",
      telemetry: "0.00 SWIRLS // 100% CLEARANCE"
    },
    {
      name: "CARLOS R.",
      vehicle: "PORSCHE 911 GT3 RS (992)",
      service: "STAGE 3 CORRECTION + GRAPHENE MATRIX",
      quote: "Track days had left heavy peppered micro-marring on the rear arches. Moto-Alpha brought the paint back to a deep wet mirror reflections. The hydrophobic water sheet on track days is unreal.",
      rating: 5,
      date: "AUGUST 2026",
      telemetry: "116° HYDROPHOBIC ANGLE"
    },
    {
      name: "DAVID L.",
      vehicle: "FERRARI F8 TRIBUTO",
      service: "TRACK PACK PPF & ALCANTARA CARE",
      quote: "Handing over a Ferrari key requires 100% confidence. Moto-Alpha's climate-controlled facility and digital depth inspection prove they operate at a different engineering standard.",
      rating: 5,
      date: "OCTOBER 2026",
      telemetry: "VERIFIED SUPERCAR BAY"
    }
  ];

  const displayReviews = reviews && reviews.length > 0 ? reviews : defaultReviews;

  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.98 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <section id="reviews" className="section-padding" style={{ backgroundColor: 'var(--canvas)', overflow: 'hidden' }}>
      <div className="container-wide">
        
        {/* Header with Scroll Fade */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '48px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div className="m-stripe-badge" />
            <span className="label-uppercase" style={{ fontSize: '13px', color: 'var(--muted)' }}>
              CLIENT TELEMETRY & VERIFIED REVIEWS
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
            <div>
              <h2 className="display-lg" style={{ margin: 0, maxWidth: '650px' }}>
                VERIFIED OWNER EXPERIENCES
              </h2>
              <p style={{ marginTop: '8px', fontSize: '15px', color: 'var(--body)' }}>
                Direct telemetry metrics, optical clarity feedback, and verified studio build logs.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', color: 'var(--m-red)' }}>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 400 }}
                    >
                      <Star size={18} fill="var(--m-red)" />
                    </motion.div>
                  ))}
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--primary)' }}>
                  5.0 / 5.0 RATING ({displayReviews.length > 3 ? `${displayReviews.length * 60}+` : '180+'} PLATFORMS)
                </span>
              </div>

              {onOpenReview && (
                <motion.button
                  type="button"
                  onClick={onOpenReview}
                  className="btn-outline"
                  whileHover={{ scale: 1.04, borderColor: 'var(--m-blue-light)' }}
                  whileTap={{ scale: 0.96 }}
                  style={{ height: '44px', padding: '0 20px', gap: '8px', fontSize: '12px' }}
                >
                  <MessageSquarePlus size={16} /> LEAVE A REVIEW
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* 3-Up Reviews Grid with Staggered Scroll Animation */}
        <div className="grid-3up">
          {displayReviews.map((r, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{
                y: -8,
                borderColor: 'var(--m-blue-dark)',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.85)',
                transition: { duration: 0.25 }
              }}
              className="card-surface"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div className="label-uppercase" style={{ fontSize: '11px', color: 'var(--m-blue-dark)' }}>
                    {r.telemetry}
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-display)' }}>
                    {r.date}
                  </span>
                </div>

                <Quote size={28} style={{ color: 'var(--hairline)', marginBottom: '12px' }} />

                <p style={{ fontSize: '15px', color: 'var(--body-strong)', lineHeight: 1.6, marginBottom: '24px', fontStyle: 'normal' }}>
                  "{r.quote}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--hairline-strong)', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--primary)' }}>
                    {r.name}
                  </div>
                  <div style={{ display: 'flex', color: 'var(--m-red)' }}>
                    {[...Array(r.rating || 5)].map((_, i) => (
                      <Star key={i} size={12} fill="var(--m-red)" />
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--m-blue-light)', fontWeight: 600, marginTop: '2px' }}>
                  {r.vehicle}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                  {r.service}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
