import React, { useState } from 'react';
import { Shield, Check, Award, ArrowRight, Layers, Sparkles, Car, ShieldAlert, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StudioConfigurator({ onReserveConfig, onOpenReview }) {
  // Category state: 'ceramic' | 'ppf' | 'ppf-accidental' | 'ppf-black-matte'
  const [activeCategoryId, setActiveCategoryId] = useState('ceramic');
  const [selectedProductId, setSelectedProductId] = useState('ceramic-10h-graphene');
  const [selectedOption, setSelectedOption] = useState('2 Coats');
  const [selectedVehicle, setSelectedVehicle] = useState('Medium');
  const [customVehicle, setCustomVehicle] = useState('');

  // Catalog configuration
  const categories = [
    {
      id: 'ceramic',
      name: 'CERAMIC COATING PACKAGES',
      shortName: 'CERAMIC COATING',
      icon: Sparkles,
      sub: 'Nanotechnology 9H/10H/Borophene liquid glass shields',
      optionsLabel: 'AVAILABLE COATINGS SPECIFICATION',
      options: ['1 Coat', '2 Coats', '3 Coats', '4 Coats'],
      defaultOption: '2 Coats',
      defaultProduct: 'ceramic-10h-graphene',
      vehicles: [
        { id: 'Small', label: 'SMALL', desc: 'Hatchbacks & Small Coupes' },
        { id: 'Medium', label: 'MEDIUM', desc: 'Mid-size Sedans & Compacts' },
        { id: 'Large', label: 'LARGE', desc: 'Executive Sedans & Mid SUVs' },
        { id: 'X-Large', label: 'X-LARGE', desc: 'Full-size SUVs & Heavy Trucks' },
        { id: 'Small Bike', label: 'SMALL BIKE', desc: 'Sub-400cc / Naked / Commuters' },
        { id: 'Large Bike', label: 'LARGE BIKE', desc: 'Superbikes / Cruisers / Tourers' },
        { id: 'Others', label: 'OTHERS', desc: 'Custom Parameter / Special Build' }
      ],
      products: [
        {
          id: 'ceramic-9h',
          name: '9H Pro Ceramic Armour',
          tag: 'HARDENED SIO2 MATRIX',
          desc: 'Professional-grade 9H high-solid quartz formula with superior hydrophobic surface tension and gloss depth.'
        },
        {
          id: 'ceramic-10h',
          name: '10H Pro Ceramic Armour',
          tag: '10H SURFACE HARDNESS',
          desc: 'High-density inorganic glass matrix delivering superior scratch mitigation, extreme slickness, and chemical resistance.'
        },
        {
          id: 'ceramic-10h-graphene',
          name: '10H Pro Graphene Armour',
          tag: 'GRAPHENE NANOPLATELETS',
          desc: 'Reduced water spotting, thermal heat dissipation, and extreme contact angle for track-ready surface durability.'
        },
        {
          id: 'ceramic-borophene',
          name: 'Borophene Armour',
          tag: 'NEXT-GEN 2D ATOMIC MATRIX',
          desc: 'Next-generation 2D atomic lattice structure engineered for maximum mechanical tensile strength and optical reflection.'
        }
      ]
    },
    {
      id: 'ppf',
      name: 'PAINT PROTECTION FILM (PPF) PACKAGES',
      shortName: 'PPF PACKAGES',
      icon: Shield,
      sub: 'Thermoplastic polyurethane self-healing impact films',
      optionsLabel: 'AVAILABLE WARRANTY PACKAGES',
      options: ['5-Year Warranty', '6-Year Warranty', '8-Year Warranty', '12-Year Warranty'],
      defaultOption: '8-Year Warranty',
      defaultProduct: 'ppf-pro',
      vehicles: [
        { id: 'Small', label: 'SMALL', desc: 'Compact Hatchbacks & Sport Coupes' },
        { id: 'Medium', label: 'MEDIUM', desc: 'Performance Sedans & Fastbacks' },
        { id: 'Large', label: 'LARGE', desc: 'Full-size Sedans & Mid SUVs' },
        { id: 'X-Large', label: 'X-LARGE', desc: 'Full-size SUVs & Off-road Trucks' },
        { id: 'Others', label: 'OTHERS', desc: 'Custom Parameter / Special Bodywork' }
      ],
      products: [
        {
          id: 'ppf-hybrid',
          name: 'PPF Hybrid',
          tag: 'FLEXIBLE GLOSS BLEND',
          desc: 'High-clarity hybrid thermoplastic formulation offering solid stone-chip defense and deep optical sheen.'
        },
        {
          id: 'ppf-pro',
          name: 'PPF Pro',
          tag: 'INSTANT HEAT SELF-HEALING',
          desc: 'Premium TPU film with elastomeric self-healing topcoat responding rapidly to ambient engine and solar heat.'
        },
        {
          id: 'ppf-pro-plus',
          name: 'PPF Pro+',
          tag: 'MAX PUNCTURE DISSIPATION',
          desc: 'Advanced polyurethane matrix with maximum impact tensile dissipation and hydrophobic cross-linked top surface.'
        },
        {
          id: 'ppf-ultra',
          name: 'PPF Ultra',
          tag: 'FLAGSHIP HIGH-MIL ARMOR',
          desc: 'Ultra-thickness optical shield engineered for endurance racing, track days, and zero distortion clarity.'
        }
      ]
    },
    {
      id: 'ppf-accidental',
      name: 'PPF ACCIDENTAL REPLACEMENT PACKAGES',
      shortName: 'PPF ACCIDENTAL REPLACEMENT',
      icon: ShieldAlert,
      sub: 'Certified PPF coverage including accidental panel replacement protection',
      optionsLabel: 'BENEFIT COVERAGE TERMS',
      options: ['Accidental Replacement Coverage (As per Package Terms)'],
      defaultOption: 'Accidental Replacement Coverage (As per Package Terms)',
      defaultProduct: 'ppf-pro-acc',
      vehicles: [
        { id: 'Small', label: 'SMALL', desc: 'Compact Hatchbacks & Sport Coupes' },
        { id: 'Medium', label: 'MEDIUM', desc: 'Performance Sedans & Fastbacks' },
        { id: 'Large', label: 'LARGE', desc: 'Full-size Sedans & Mid SUVs' },
        { id: 'X-Large', label: 'X-LARGE', desc: 'Full-size SUVs & Off-road Trucks' },
        { id: 'Others', label: 'OTHERS', desc: 'Custom Parameter / Special Bodywork' }
      ],
      products: [
        {
          id: 'ppf-hybrid-acc',
          name: 'PPF Hybrid',
          tag: 'HYBRID FILM + ACCIDENTAL COVER',
          desc: 'Hybrid thermoplastic protective film backed by full accidental panel replacement coverage.'
        },
        {
          id: 'ppf-pro-acc',
          name: 'PPF Pro',
          tag: 'PRO FILM + ACCIDENTAL COVER',
          desc: 'Self-healing optical TPU film with guaranteed panel re-installation under package accidental terms.'
        },
        {
          id: 'ppf-pro-plus-acc',
          name: 'PPF Pro+',
          tag: 'PRO+ FILM + ACCIDENTAL COVER',
          desc: 'High-tensile hydrophobic protective barrier integrated with comprehensive accidental damage terms.'
        },
        {
          id: 'ppf-ultra-acc',
          name: 'PPF Ultra',
          tag: 'ULTRA FILM + ACCIDENTAL COVER',
          desc: 'Flagship optical armor providing supreme puncture defense combined with complete accidental replacement.'
        }
      ]
    },
    {
      id: 'ppf-black-matte',
      name: 'PPF BLACK / MATTE PACKAGES',
      shortName: 'PPF BLACK / MATTE',
      icon: Layers,
      sub: 'Factory stealth matte transformation, satin sheen & blackout armor',
      optionsLabel: 'ACCIDENTAL REPLACEMENT OPTION',
      options: ['Without Accidental Replacement Coverage', 'With Accidental Replacement Coverage'],
      defaultOption: 'With Accidental Replacement Coverage',
      defaultProduct: 'pro-bm',
      // Explicit vehicle categories requested by user:
      vehicles: [
        { id: 'Two wheelers', label: 'TWO WHEELERS', desc: 'Motorcycles & Superbikes' },
        { id: 'Hatchback', label: 'HATCHBACK', desc: 'City Cars & Hot Hatches' },
        { id: 'Sedan', label: 'SEDAN', desc: 'Sports Sedans & Coupes' },
        { id: 'Compact SUV', label: 'COMPACT SUV', desc: 'Crossovers & Compact SUVs' },
        { id: 'SUV', label: 'SUV', desc: 'Full-Size SUVs & Heavy Platforms' },
        { id: 'Others', label: 'OTHERS', desc: 'Custom Parameter / Special Vehicle' }
      ],
      products: [
        {
          id: 'pro-bm',
          name: 'Pro B/M',
          tag: 'SATIN MATTE / BLACK TPU',
          desc: 'Factory-grade satin matte blackout conversion with self-healing anti-scratch surface.'
        },
        {
          id: 'pro-plus-bm',
          name: 'Pro+ B/M',
          tag: 'DEEP STEALTH MATTE FINISH',
          desc: 'Deep satin luster with intensified pigmentation, optical depth, and UV resistant barrier.'
        },
        {
          id: 'pro-plus-cool',
          name: 'Pro+ Cool',
          tag: 'INFRARED HEAT REFLECTIVE',
          desc: 'Infrared-reflective matte stealth film engineered to block high surface radiant heat.'
        },
        {
          id: 'pro-bm-acc',
          name: 'Pro B/M with Accidental Coverage',
          tag: 'PRO B/M + ACCIDENTAL COVER',
          desc: 'Pro Satin Matte / Black wrap packaged with dedicated accidental replacement terms.'
        },
        {
          id: 'pro-plus-bm-acc',
          name: 'Pro+ B/M with Accidental Coverage',
          tag: 'PRO+ B/M + ACCIDENTAL COVER',
          desc: 'Pro+ Stealth film packaged with certified accidental replacement panel coverage.'
        }
      ]
    }
  ];

  // Active Category Data
  const currentCategory = categories.find(c => c.id === activeCategoryId) || categories[0];
  const currentProduct = currentCategory.products.find(p => p.id === selectedProductId) || currentCategory.products[0];

  // Category switch handler
  const handleSelectCategory = (catId) => {
    const targetCat = categories.find(c => c.id === catId);
    if (!targetCat) return;
    setActiveCategoryId(catId);
    setSelectedProductId(targetCat.defaultProduct);
    setSelectedOption(targetCat.defaultOption);
    // If the currently selected vehicle is valid in new category, keep it; else set to first vehicle
    const vehicleExists = targetCat.vehicles.some(v => v.id === selectedVehicle);
    if (!vehicleExists) {
      setSelectedVehicle(targetCat.vehicles[0].id);
    }
  };

  // Product selection handler
  const handleSelectProduct = (product) => {
    setSelectedProductId(product.id);

    // Sync accidental coverage option for Black/Matte products
    if (activeCategoryId === 'ppf-black-matte') {
      if (product.name.toLowerCase().includes('accidental coverage')) {
        setSelectedOption('With Accidental Replacement Coverage');
      }
    }
  };

  // Reservation action
  const handleReserve = () => {
    const vehicleLabel = selectedVehicle === 'Others' 
      ? (customVehicle.trim() ? `Others (${customVehicle.trim()})` : 'Others (Custom Spec)')
      : selectedVehicle;

    const configData = {
      category: currentCategory.name,
      packageName: `${currentProduct.name} [${selectedOption}]`,
      productName: currentProduct.name,
      option: selectedOption,
      vehicleType: vehicleLabel,
      customVehicle: selectedVehicle === 'Others' ? customVehicle.trim() : null,
      notes: `Studio Spec: ${currentCategory.shortName} | Product: ${currentProduct.name} | Spec: ${selectedOption} | Vehicle: ${vehicleLabel}`
    };

    if (onReserveConfig) {
      onReserveConfig(configData);
    }
  };

  return (
    <section id="configurator" className="section-padding" style={{ backgroundColor: 'var(--canvas)', borderTop: '1px solid var(--hairline-strong)', overflow: 'hidden' }}>
      <div className="container-wide">
        
        {/* Section Header with Scroll Fade */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '44px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div className="m-stripe-badge" />
            <span className="label-uppercase" style={{ fontSize: '13px', color: 'var(--muted)' }}>
              LIVE SPECIFICATION CALCULATOR
            </span>
          </div>
          <h2 className="display-lg" style={{ margin: 0 }}>
            BUILD YOUR DETAILING SPECIFICATION
          </h2>
          <p style={{ marginTop: '8px', fontSize: '15px', color: 'var(--body)', maxWidth: '780px' }}>
            Configure your technical protection package: choose your service tier, product formulation, warranty or coat specification, and vehicle platform.
          </p>
        </motion.div>

        {/* Category Tabs (Step 01) */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--m-blue-dark)', fontWeight: 700 }}>01.</span>
            <span className="label-uppercase" style={{ fontSize: '14px' }}>SELECT SERVICE CATEGORY</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {categories.map((cat) => {
              const isSelected = activeCategoryId === cat.id;
              const IconComp = cat.icon;
              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    backgroundColor: isSelected ? 'var(--surface-card)' : 'var(--surface-soft)',
                    border: isSelected ? '1px solid var(--m-blue-dark)' : '1px solid var(--hairline-strong)',
                    borderBottom: isSelected ? '3px solid var(--m-blue-dark)' : '1px solid var(--hairline-strong)',
                    outline: 'none',
                    boxShadow: isSelected ? '0 0 16px rgba(28, 105, 212, 0.25)' : 'none',
                    padding: '16px 18px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Sliding Active BMW M Tricolor Indicator Accent */}
                  {isSelected && (
                    <motion.div
                      layoutId="configCategoryActiveIndicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, var(--m-blue-light) 0%, var(--m-blue-dark) 50%, var(--m-red) 100%)',
                        boxShadow: '0 0 8px rgba(28, 105, 212, 0.8)'
                      }}
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}

                  <div
                    style={{
                      padding: '8px',
                      backgroundColor: isSelected ? 'rgba(28, 105, 212, 0.15)' : 'var(--surface-elevated)',
                      color: isSelected ? 'var(--m-blue-light)' : 'var(--muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <IconComp size={20} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, color: isSelected ? 'var(--primary)' : 'var(--body-strong)', letterSpacing: '0.5px', transition: 'color 0.2s ease' }}>
                      {cat.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', lineHeight: 1.3 }}>
                      {cat.sub}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Configuration Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="config-grid">
          
          {/* Left Column: Product, Option & Vehicle Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

            {/* Step 02: Select Product */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--m-blue-dark)', fontWeight: 700 }}>02.</span>
                <span className="label-uppercase" style={{ fontSize: '14px' }}>SELECT PRODUCT SPECIFICATION</span>
                <span style={{ fontSize: '12px', color: 'var(--muted)', marginLeft: 'auto' }}>
                  {currentCategory.products.length} Products Available
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                {currentCategory.products.map((prod) => {
                  const isSelected = selectedProductId === prod.id;
                  return (
                    <motion.div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        backgroundColor: isSelected ? 'var(--surface-card)' : 'var(--surface-soft)',
                        border: isSelected ? '1px solid var(--primary)' : '1px solid var(--hairline-strong)',
                        padding: '20px',
                        cursor: 'pointer',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isSelected && (
                        <div style={{ position: 'absolute', top: '14px', right: '14px', color: 'var(--primary)' }}>
                          <Check size={18} />
                        </div>
                      )}

                      <div>
                        <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', letterSpacing: '1px', color: 'var(--m-blue-light)', fontWeight: 700, marginBottom: '6px' }}>
                          {prod.tag}
                        </div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px', paddingRight: '20px' }}>
                          {prod.name}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--body)', lineHeight: 1.4 }}>
                          {prod.desc}
                        </div>
                      </div>

                      <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--hairline-strong)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '11px', color: isSelected ? 'var(--primary)' : 'var(--muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>
                          {isSelected ? 'SELECTED PRODUCT' : 'CLICK TO SELECT'}
                        </span>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isSelected ? 'var(--m-blue-dark)' : 'transparent', border: isSelected ? 'none' : '1px solid var(--hairline)' }} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Step 03: Select Specification / Option */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--m-blue-dark)', fontWeight: 700 }}>03.</span>
                <span className="label-uppercase" style={{ fontSize: '14px' }}>{currentCategory.optionsLabel}</span>
              </div>

              {/* Accidental Replacement Info Notice for Category 3 */}
              {activeCategoryId === 'ppf-accidental' && (
                <div
                  style={{
                    backgroundColor: 'rgba(28, 105, 212, 0.08)',
                    border: '1px solid var(--m-blue-dark)',
                    padding: '16px 20px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px'
                  }}
                >
                  <Award size={24} style={{ color: 'var(--m-blue-light)', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.5px' }}>
                      CERTIFIED ACCIDENTAL REPLACEMENT COVERAGE
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--body)', marginTop: '2px' }}>
                      Includes panel re-installation and accidental film replacement under comprehensive studio package terms.
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                {currentCategory.options.map((opt) => {
                  const isChecked = selectedOption === opt;
                  return (
                    <motion.div
                      key={opt}
                      onClick={() => setSelectedOption(opt)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        backgroundColor: isChecked ? 'var(--surface-card)' : 'var(--surface-soft)',
                        border: isChecked ? '1px solid var(--primary)' : '1px solid var(--hairline-strong)',
                        padding: '16px 18px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            border: isChecked ? '1px solid var(--primary)' : '1px solid var(--hairline)',
                            backgroundColor: isChecked ? 'var(--primary)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#000000',
                            flexShrink: 0
                          }}
                        >
                          {isChecked && <Check size={13} strokeWidth={3} />}
                        </div>
                        <span style={{ fontSize: '13px', color: isChecked ? 'var(--primary)' : 'var(--body-strong)', fontWeight: isChecked ? 600 : 400 }}>
                          {opt}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Step 04: Vehicle Classification */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--m-blue-dark)', fontWeight: 700 }}>04.</span>
                <span className="label-uppercase" style={{ fontSize: '14px' }}>SELECT VEHICLE CATEGORY</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                {currentCategory.vehicles.map((v) => {
                  const isChecked = selectedVehicle === v.id;
                  return (
                    <motion.div
                      key={v.id}
                      onClick={() => setSelectedVehicle(v.id)}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        backgroundColor: isChecked ? 'var(--surface-card)' : 'var(--surface-soft)',
                        border: isChecked ? '1px solid var(--primary)' : '1px solid var(--hairline-strong)',
                        padding: '16px',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isChecked && (
                        <div style={{ position: 'absolute', top: '10px', right: '10px', color: 'var(--primary)' }}>
                          <Check size={16} />
                        </div>
                      )}
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: isChecked ? 'var(--primary)' : 'var(--body-strong)', marginBottom: '4px' }}>
                        {v.label}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                        {v.desc}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Custom Parameter Field when 'Others' is Selected */}
              {selectedVehicle === 'Others' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    marginTop: '16px',
                    padding: '20px',
                    backgroundColor: 'var(--surface-card)',
                    border: '1px solid var(--m-blue-dark)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Car size={16} style={{ color: 'var(--m-blue-light)' }} />
                    <label className="label-uppercase" style={{ fontSize: '12px', color: 'var(--primary)' }}>
                      SPECIFY CUSTOM VEHICLE PARAMETER / MODEL *
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={customVehicle}
                    onChange={(e) => setCustomVehicle(e.target.value)}
                    placeholder="e.g. 2026 Porsche 911 GT3 RS / Custom Track Build / Quad Bike"
                    className="text-input"
                    style={{ backgroundColor: 'var(--surface-soft)' }}
                  />
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px' }}>
                    Provide make, model, chassis generation, or any custom aero/bodywork parameters for specialized quote mapping.
                  </div>
                </motion.div>
              )}
            </div>

          </div>

          {/* Right Column: Live Telemetry Summary Box */}
          <div style={{ position: 'sticky', top: '96px', height: 'fit-content' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card-surface"
              style={{
                backgroundColor: 'var(--surface-card)',
                border: '1px solid var(--hairline)',
                padding: '32px'
              }}
            >
              {/* Telemetry Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div className="m-stripe-badge" />
                <span className="label-uppercase" style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  SPECIFICATION TELEMETRY
                </span>
              </div>

              <h3 className="display-sm" style={{ fontSize: '22px', margin: '0 0 20px 0' }}>
                {currentProduct.name}
              </h3>

              {/* Telemetry Data Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderBottom: '1px solid var(--hairline)', paddingBottom: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', alignItems: 'baseline' }}>
                  <span style={{ color: 'var(--muted)' }}>CATEGORY:</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)', textAlign: 'right' }}>
                    {currentCategory.shortName}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', alignItems: 'baseline' }}>
                  <span style={{ color: 'var(--muted)' }}>SPECIFICATION:</span>
                  <span style={{ fontWeight: 600, color: 'var(--m-blue-light)', textAlign: 'right' }}>
                    {selectedOption}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', alignItems: 'baseline' }}>
                  <span style={{ color: 'var(--muted)' }}>VEHICLE PLATFORM:</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)', textAlign: 'right' }}>
                    {selectedVehicle === 'Others' 
                      ? (customVehicle.trim() ? customVehicle.trim() : 'OTHERS (CUSTOM)')
                      : selectedVehicle}
                  </span>
                </div>

                {/* Accidental Replacement Benefit Highlight */}
                {(activeCategoryId === 'ppf-accidental' || selectedOption.includes('With Accidental')) && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', alignItems: 'center', backgroundColor: 'rgba(28, 105, 212, 0.12)', padding: '8px 10px', borderLeft: '2px solid var(--m-blue-dark)' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 600 }}>COVERAGE BENEFIT:</span>
                    <span style={{ color: 'var(--m-blue-light)', fontWeight: 700, fontSize: '11px', letterSpacing: '0.5px' }}>
                      ACCIDENTAL REPLACEMENT INCLUDED
                    </span>
                  </div>
                )}
              </div>

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
                  Includes Studio Certificate, Warranty Registration & Multi-Point Inspection
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                onClick={handleReserve}
                className="btn-primary"
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(28, 105, 212, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                RESERVE THIS SPECIFICATION <ArrowRight size={16} />
              </motion.button>

              {/* Option to Leave a Review in Telemetry Section */}
              {onOpenReview && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--hairline-strong)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Star size={13} fill="var(--m-red)" color="var(--m-red)" />
                    <span style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>
                      CLIENT FEEDBACK
                    </span>
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => onOpenReview(`${currentProduct.name} [${selectedOption}]`)}
                    className="text-link"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '11px',
                      color: 'var(--m-blue-light)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      letterSpacing: '0.5px'
                    }}
                  >
                    LEAVE A REVIEW <ArrowRight size={12} />
                  </motion.button>
                </div>
              )}
            </motion.div>
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