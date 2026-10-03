import React from 'react';
import { ShieldCheck, Zap, Gauge, Flame, Clock, Award } from 'lucide-react';

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

  return (
    <section
      style={{
        backgroundColor: 'var(--canvas)',
        borderTop: '1px solid var(--hairline-strong)',
        borderBottom: '1px solid var(--hairline-strong)',
        paddingTop: '64px',
        paddingBottom: '64px'
      }}
    >
      <div className="container-wide">
        <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
        </div>

        {/* 4-Up Spec Cell Grid */}
        <div className="grid-4up">
          {metrics.map((m, index) => {
            const Icon = m.icon;
            return (
              <div key={index} className="spec-cell" style={{ minHeight: '220px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <Icon size={24} style={{ color: m.color }} />
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
