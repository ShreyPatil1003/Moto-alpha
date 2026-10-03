import React, { useState, useRef } from 'react';
import { Sliders, Eye, Sparkles, Check } from 'lucide-react';

export default function PPFVisualizer() {
  const [sliderPos, setSliderPos] = useState(50);
  const [finishMode, setFinishMode] = useState('gloss'); // 'gloss' | 'stealth'
  const isDragging = useRef(false);

  const handleMove = (clientX, rect) => {
    const x = clientX - rect.left;
    let pos = (x / rect.width) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;
    setSliderPos(pos);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <section id="visualizer" className="section-padding" style={{ backgroundColor: 'var(--surface-soft)', borderTop: '1px solid var(--hairline-strong)' }}>
      <div className="container-wide">
        
        {/* Section Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div className="m-stripe-badge" />
            <span className="label-uppercase" style={{ fontSize: '13px', color: 'var(--muted)' }}>
              INTERACTIVE OPTICAL COMPARISON
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
            <div>
              <h2 className="display-lg" style={{ margin: 0 }}>
                PPF & PAINT CORRECTION VISUALIZER
              </h2>
              <p style={{ marginTop: '8px', fontSize: '16px', color: 'var(--body)', maxWidth: '600px' }}>
                Drag the interactive slider to analyze micron-level defect removal and surface gloss reflection before and after Moto-Alpha treatment.
              </p>
            </div>

            {/* Finish Selector Toggles */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                backgroundColor: 'var(--canvas)',
                padding: '4px',
                border: '1px solid var(--hairline)'
              }}
            >
              <button
                onClick={() => setFinishMode('gloss')}
                className="label-uppercase"
                style={{
                  background: finishMode === 'gloss' ? 'var(--surface-card)' : 'transparent',
                  color: finishMode === 'gloss' ? 'var(--primary)' : 'var(--muted)',
                  border: finishMode === 'gloss' ? '1px solid var(--m-blue-dark)' : '1px solid transparent',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                9H HIGH GLOSS
              </button>
              <button
                onClick={() => setFinishMode('stealth')}
                className="label-uppercase"
                style={{
                  background: finishMode === 'stealth' ? 'var(--surface-card)' : 'transparent',
                  color: finishMode === 'stealth' ? 'var(--primary)' : 'var(--muted)',
                  border: finishMode === 'stealth' ? '1px solid var(--m-red)' : '1px solid transparent',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                STEALTH MATTE PPF
              </button>
            </div>
          </div>
        </div>

        {/* Visualizer Canvas Frame */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(380px, 50vh, 580px)',
            backgroundColor: '#000',
            border: '1px solid var(--hairline)',
            overflow: 'hidden',
            userSelect: 'none',
            cursor: 'ew-resize'
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Layer 1: AFTER Image (Treated Gloss or Stealth) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url('${finishMode === 'gloss' ? '/images/ceramic.jpg' : '/images/ppf.jpg'}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: finishMode === 'gloss' ? 'contrast(1.15) brightness(1.05)' : 'contrast(1.1)'
            }}
          >
            {/* Tag Badge Right */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                backgroundColor: 'rgba(0,0,0,0.85)',
                border: '1px solid var(--m-blue-dark)',
                padding: '8px 16px',
                backdropFilter: 'blur(6px)'
              }}
            >
              <span className="label-uppercase" style={{ color: 'var(--primary)', fontSize: '12px' }}>
                AFTER: MOTO-ALPHA {finishMode === 'gloss' ? '9H GRAPHENE CERAMIC' : 'STEALTH MATTE PPF'}
              </span>
            </div>
          </div>

          {/* Layer 2: BEFORE Image (Swirled Paint, clipped by slider position) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${sliderPos}%`,
              height: '100%',
              backgroundImage: `url('${finishMode === 'gloss' ? '/images/ceramic.jpg' : '/images/ppf.jpg'}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'sepia(0.3) contrast(0.85) brightness(0.65) blur(0.5px)', // Simulated untreated swirled look
              overflow: 'hidden',
              borderRight: '2px solid var(--primary)'
            }}
          >
            {/* Tag Badge Left */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                backgroundColor: 'rgba(0,0,0,0.85)',
                border: '1px solid var(--m-red)',
                padding: '8px 16px',
                backdropFilter: 'blur(6px)'
              }}
            >
              <span className="label-uppercase" style={{ color: 'var(--m-red)', fontSize: '12px' }}>
                BEFORE: FACTORY SWIRLS & OXIDATION
              </span>
            </div>
          </div>

          {/* Slider Handle Divider Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPos}%`,
              transform: 'translateX(-50%)',
              width: '4px',
              backgroundColor: 'var(--primary)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0,0,0,0.8)'
            }}
          >
            {/* Center Drag Button */}
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--canvas)',
                border: '2px solid var(--primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.8)'
              }}
            >
              <Sliders size={20} />
            </div>
          </div>
        </div>

        {/* Visualizer Footer Technical Highlights */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginTop: '32px'
          }}
        >
          <div className="spec-cell">
            <div className="spec-value" style={{ fontSize: '24px' }}>115° ANGLE</div>
            <div className="spec-label">SUPER-HYDROPHOBIC CONTACT</div>
            <p style={{ fontSize: '13px', margin: '8px 0 0 0' }}>Water sheeting action pushes mud & road grime off without contact.</p>
          </div>

          <div className="spec-cell">
            <div className="spec-value" style={{ fontSize: '24px' }}>99.4% GLOSS</div>
            <div className="spec-label">GU GLOSSMETER RATING</div>
            <p style={{ fontSize: '13px', margin: '8px 0 0 0' }}>Reflective mirror shine verified using precision optical glossmeters.</p>
          </div>

          <div className="spec-cell">
            <div className="spec-value" style={{ fontSize: '24px' }}>SELF-HEAL</div>
            <div className="spec-label">THERMAL MEMORY RECOVERY</div>
            <p style={{ fontSize: '13px', margin: '8px 0 0 0' }}>Minor wash scratches vanish automatically when exposed to ambient sun heat.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
