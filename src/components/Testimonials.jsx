import React from 'react';
import { Star, ShieldCheck, Award, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
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

  return (
    <section id="reviews" className="section-padding" style={{ backgroundColor: 'var(--canvas)' }}>
      <div className="container-wide">
        
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div className="m-stripe-badge" />
            <span className="label-uppercase" style={{ fontSize: '13px', color: 'var(--muted)' }}>
              CLIENT TELEMETRY & VERIFIED REVIEWS
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
            <h2 className="display-lg" style={{ margin: 0, maxWidth: '650px' }}>
              VERIFIED OWNER EXPERIENCES
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', color: 'var(--m-red)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="var(--m-red)" />
                ))}
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--primary)' }}>
                5.0 / 5.0 RATING (180+ SUPERCAR PLATFORMS)
              </span>
            </div>
          </div>
        </div>

        {/* 3-Up Reviews Grid */}
        <div className="grid-3up">
          {reviews.map((r, index) => (
            <div key={index} className="card-surface" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--primary)' }}>
                  {r.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--m-blue-light)', fontWeight: 600, marginTop: '2px' }}>
                  {r.vehicle}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                  {r.service}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
