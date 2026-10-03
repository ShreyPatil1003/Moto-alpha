import React from 'react';
import { Shield, Sparkles, Sun, Cpu, CheckCircle2, MapPin, Navigation, ExternalLink } from 'lucide-react';

export default function StudioCleanroom() {
  const highlights = [
    {
      title: "CLIMATE-CONTROLLED CLEAN ROOM BAYS",
      subtitle: "HEPA air filtration preventing micro-dust contamination during PPF and ceramic polymer curing.",
      image: "/images/hero.jpg",
      badge: "ISO CLASS 7 AIR PURITY"
    },
    {
      title: "SCANGRIP 96+ CRI LIGHT INSPECTION",
      subtitle: "Multi-spectrum LED array replicating direct sunlight to surface micro-scratches and hologram swirls.",
      image: "/images/correction.jpg",
      badge: "OPTICAL PRECISION"
    },
    {
      title: "INFRARED SHORTWAVE CURING LAMPS",
      subtitle: "Accelerates ceramic graphene cross-linking by 400%, guaranteeing maximum surface hardness upon delivery.",
      image: "/images/ceramic.jpg",
      badge: "THERMAL CROSS-LINKING"
    }
  ];

  return (
    <section id="studio" className="section-padding" style={{ backgroundColor: 'var(--surface-soft)', borderTop: '1px solid var(--hairline-strong)' }}>
      <div className="container-wide">
        
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div className="m-stripe-badge" />
            <span className="label-uppercase" style={{ fontSize: '13px', color: 'var(--muted)' }}>
              MOTORSPORT CLEAN BAY ARCHITECTURE
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
            <h2 className="display-lg" style={{ margin: 0, maxWidth: '650px' }}>
              GERMAN ENGINEERING FACILITY & BAYS
            </h2>
            <p style={{ maxWidth: '480px', fontSize: '15px', color: 'var(--body)' }}>
              Our studio environment was purpose-built to eliminate environmental variables that compromise ceramic adhesion and film clarity.
            </p>
          </div>
        </div>

        {/* 3-Up Feature Cards Grid */}
        <div className="grid-3up">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="card-surface"
              style={{
                padding: 0,
                backgroundColor: 'var(--canvas)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Photo Band */}
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.85) contrast(1.1)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    border: '1px solid var(--hairline)',
                    padding: '4px 12px'
                  }}
                >
                  <span className="label-uppercase" style={{ fontSize: '11px', color: 'var(--primary)' }}>
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="label-uppercase" style={{ fontSize: '11px', color: 'var(--m-blue-light)', marginBottom: '8px' }}>
                  FACILITY SPEC 0{index + 1}
                </div>

                <h3 className="display-sm" style={{ fontSize: '20px', margin: '0 0 12px 0' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '14px', color: 'var(--body)', margin: 0, lineHeight: 1.6 }}>
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Location Band */}
        <div
          style={{
            marginTop: '48px',
            backgroundColor: 'var(--canvas)',
            border: '1px solid var(--hairline-strong)',
            padding: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', maxWidth: '680px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--surface-soft)',
                border: '1px solid var(--m-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--m-red)',
                flexShrink: 0
              }}
            >
              <MapPin size={24} />
            </div>
            <div>
              <div className="label-uppercase" style={{ fontSize: '11px', color: 'var(--m-red)', marginBottom: '4px' }}>
                VISIT OUR DETAILING STUDIO
              </div>
              <h3 className="display-sm" style={{ fontSize: '20px', margin: '0 0 6px 0' }}>
                STUDIO LOCATION & DROP-OFF BAY
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--body-strong)', margin: 0, lineHeight: 1.5 }}>
                Shop no. 2, Shreeji Landmark, Next to tata showroom, opposite to carmel convent school, Chikhloli, Ambernath(East)
              </p>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=19.1812343,73.2188796"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none' }}
          >
            <Navigation size={16} /> NAVIGATE TO MOTO-ALPHA <ExternalLink size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}
