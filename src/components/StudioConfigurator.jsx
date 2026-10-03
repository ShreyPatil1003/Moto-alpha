import React, { useState } from 'react';
import { Car, Shield, Check, Plus, Clock, Award, ArrowRight } from 'lucide-react';

export default function StudioConfigurator({ onReserveConfig }) {
  const [vehicleType, setVehicleType] = useState('coupe'); // 'coupe' | 'supercar' | 'suv'
  const [basePackage, setBasePackage] = useState('pkg2');
  const [selectedAddons, setSelectedAddons] = useState(['wheel', 'glass']);

  const vehicleTypes = [
    { id: 'coupe', name: 'PERFORMANCE SEDAN / COUPE', multiplier: 1.0, sub: 'e.g., BMW M2/M3/M4, Audi RS5, AMG C63' },
    { id: 'supercar', name: 'EXOTIC / SUPERCAR', multiplier: 1.25, sub: 'e.g., Porsche 911 GT3, Ferrari F8, Huracán' },
    { id: 'suv', name: 'PERFORMANCE SUV / TRUCK', multiplier: 1.35, sub: 'e.g., BMW X5M, Lambo Urus, G63 AMG' }
  ];

  const packages = [
    {
      id: 'pkg1',
      title: 'TRACKLANE CERAMIC SPEC',
      hours: 18,
      features: ['Stage 1 Machine Paint Polish', '3-Year Certified Ceramic Coating', 'Wheel Face Decontamination', 'Complete Exterior Hand Wash']
    },
    {
      id: 'pkg2',
      title: 'MOTO-ALPHA 9H GRAPHENE MATRIX',
      hours: 28,
      popular: true,
      features: ['Stage 2 Swirl Correction (90%+ defect removal)', '5-Year Certified 9H Graphene Matrix', 'Leather Upholstery Conditioning', 'Infrared Accelerated Cure Treatment']
    },
    {
      id: 'pkg3',
      title: 'TRACK PACK PPF + CERAMIC',
      hours: 42,
      features: ['Full Front End Self-Healing PPF Wrap', 'Hood, Bumper, Mirrors & Fenders', 'Stage 2 Paint Correction on Unwrapped Panels', '9H Ceramic Coating over PPF & Paint']
    },
    {
      id: 'pkg4',
      title: 'STEALTH FULL-BODY PPF WRAP',
      hours: 72,
      features: ['100% Full Vehicle Self-Healing PPF Wrap', 'Choice of High Gloss or Matte Stealth Film', 'Multi-Stage Paint Preparation', 'Includes Full Wheel & Interior Ceramic Shield']
    }
  ];

  const addonsList = [
    { id: 'wheel', name: 'Wheel Barrel & Caliper Ceramic Coating' },
    { id: 'glass', name: 'Hydrophobic Glass & Windshield Armor' },
    { id: 'alcantara', name: 'Alcantara Suede & Leather Interior Shield' },
    { id: 'engine', name: 'Engine Bay Detailing & Protective Dressing' }
  ];

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const selectedVehicleObj = vehicleTypes.find(v => v.id === vehicleType);
  const selectedPkgObj = packages.find(p => p.id === basePackage);

  const estimatedHours = Math.round(selectedPkgObj.hours * (vehicleType === 'suv' ? 1.2 : 1.0));

  const handleReserve = () => {
    const configData = {
      vehicleType: selectedVehicleObj.name,
      packageName: selectedPkgObj.title,
      estimatedHours,
      addons: selectedAddons.map(id => addonsList.find(a => a.id === id)?.name).filter(Boolean)
    };
    onReserveConfig(configData);
  };

  return (
    <section id="configurator" className="section-padding" style={{ backgroundColor: 'var(--canvas)', borderTop: '1px solid var(--hairline-strong)' }}>
      <div className="container-wide">
        
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div className="m-stripe-badge" />
            <span className="label-uppercase" style={{ fontSize: '13px', color: 'var(--muted)' }}>
              LIVE SPECIFICATION CALCULATOR
            </span>
          </div>
          <h2 className="display-lg" style={{ margin: 0 }}>
            BUILD YOUR DETAILING SPECIFICATION
          </h2>
          <p style={{ marginTop: '8px', fontSize: '16px', color: 'var(--body)' }}>
            Customize your vehicle platform, protective coverage level, and specialized technical add-ons.
          </p>
        </div>

        {/* Configurator 2-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="config-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* Step 1: Vehicle Platform */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--m-blue-dark)', fontWeight: 700 }}>01.</span>
                <span className="label-uppercase" style={{ fontSize: '14px' }}>SELECT VEHICLE PLATFORM</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {vehicleTypes.map(v => (
                  <div
                    key={v.id}
                    onClick={() => setVehicleType(v.id)}
                    style={{
                      backgroundColor: vehicleType === v.id ? 'var(--surface-card)' : 'var(--surface-soft)',
                      border: vehicleType === v.id ? '1px solid var(--primary)' : '1px solid var(--hairline-strong)',
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    {vehicleType === v.id && (
                      <div style={{ position: 'absolute', top: '12px', right: '12px', color: 'var(--m-blue-dark)' }}>
                        <Check size={18} />
                      </div>
                    )}
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>
                      {v.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      {v.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Base Service Package */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--m-blue-dark)', fontWeight: 700 }}>02.</span>
                <span className="label-uppercase" style={{ fontSize: '14px' }}>SELECT PROTECTIVE PACKAGE LEVEL</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {packages.map(pkg => {
                  const isSelected = basePackage === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setBasePackage(pkg.id)}
                      style={{
                        backgroundColor: isSelected ? 'var(--surface-card)' : 'var(--surface-soft)',
                        border: isSelected ? '1px solid var(--m-blue-dark)' : '1px solid var(--hairline-strong)',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      {pkg.popular && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '-12px',
                            right: '16px',
                            backgroundColor: 'var(--m-red)',
                            color: '#fff',
                            fontSize: '10px',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            letterSpacing: '1px',
                            padding: '2px 8px'
                          }}
                        >
                          MOST POPULAR
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--primary)' }}>
                          {pkg.title}
                        </div>
                      </div>

                      <div style={{ margin: '12px 0', borderTop: '1px solid var(--hairline-strong)', paddingTop: '12px' }}>
                        {pkg.features.map((f, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--body)', marginBottom: '6px' }}>
                            <Check size={12} style={{ color: 'var(--m-blue-light)', flexShrink: 0 }} />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Technical Add-ons */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--m-blue-dark)', fontWeight: 700 }}>03.</span>
                <span className="label-uppercase" style={{ fontSize: '14px' }}>TECHNICAL ADD-ONS</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {addonsList.map(addon => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      style={{
                        backgroundColor: isChecked ? 'var(--surface-elevated)' : 'var(--surface-soft)',
                        border: isChecked ? '1px solid var(--primary)' : '1px solid var(--hairline-strong)',
                        padding: '16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            border: isChecked ? '1px solid var(--primary)' : '1px solid var(--hairline)',
                            backgroundColor: isChecked ? 'var(--primary)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#000'
                          }}
                        >
                          {isChecked && <Check size={14} />}
                        </div>
                        <span style={{ fontSize: '13px', color: 'var(--body-strong)', fontWeight: 400 }}>
                          {addon.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live Telemetry Summary Box */}
          <div style={{ position: 'sticky', top: '96px', height: 'fit-content' }}>
            <div
              className="card-surface"
              style={{
                backgroundColor: 'var(--surface-card)',
                border: '1px solid var(--hairline)',
                padding: '32px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div className="m-stripe-badge" />
                <span className="label-uppercase" style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  SUMMARY TELEMETRY
                </span>
              </div>

              <h3 className="display-sm" style={{ fontSize: '24px', margin: '0 0 24px 0' }}>
                CUSTOM DETAILING SPEC
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderBottom: '1px solid var(--hairline)', paddingBottom: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--muted)' }}>PLATFORM:</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)', textAlign: 'right' }}>{selectedVehicleObj.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--muted)' }}>PACKAGE:</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)', textAlign: 'right' }}>{selectedPkgObj.title}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--muted)' }}>EST. DURATION:</span>
                  <span style={{ fontWeight: 600, color: 'var(--m-blue-dark)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> ~{estimatedHours} HOURS
                  </span>
                </div>
              </div>

              {/* Addons summary */}
              {selectedAddons.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <div className="label-uppercase" style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>
                    SELECTED ADD-ONS:
                  </div>
                  {selectedAddons.map(id => {
                    const addon = addonsList.find(a => a.id === id);
                    return (
                      <div key={id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--body)', marginBottom: '4px' }}>
                        <span>• {addon.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Studio Spec Confirmation Display */}
              <div
                style={{
                  backgroundColor: 'var(--surface-soft)',
                  border: '1px solid var(--hairline-strong)',
                  padding: '20px',
                  marginBottom: '24px'
                }}
              >
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-display)', letterSpacing: '1px', color: 'var(--muted)' }}>
                  STUDIO PRICING STATUS
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>
                  QUOTE UPON CONSULTATION
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                  Includes Studio Certificate & Inspection
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleReserve}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                RESERVE THIS SPEC SPECIFICATION <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 1024px) {
          .config-grid {
            grid-template-columns: 1fr 380px !important;
          }
        }
      `}</style>
    </section>
  );
}
