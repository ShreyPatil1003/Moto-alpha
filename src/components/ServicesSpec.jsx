import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServicesSpec({ onSelectPackage }) {
  const [activeTab, setActiveTab] = useState('ALL');

  const categories = [
    { id: 'ALL', label: 'ALL SERVICES' },
    { id: 'PPF', label: 'PAINT PROTECTION FILM (PPF)' },
    { id: 'CERAMIC', label: '9H CERAMIC COATING' },
    { id: 'PAINT', label: 'MULTI-STAGE PAINT CORRECTION' },
    { id: 'INTERIOR', label: 'ALCANTARA & LEATHER RESTORATION' }
  ];

  const services = [
    {
      id: 'ppf-stealth',
      category: 'PPF',
      tag: 'STEALTH & ULTRA CLEAR',
      title: 'MOTO-ALPHA PPF STEALTH WRAP',
      image: '/images/ppf.jpg',
      badge: 'SELF-HEALING PPF',
      badgeColor: 'var(--m-blue-dark)',
      description: 'Precision computer-cut self-healing thermoplastic polyurethane film. Shields against stone chips, highway gravel, bird droppings, and key scratches with zero optical distortion.',
      specs: [
        { label: 'THICKNESS', value: '8.5 Mils (215 microns)' },
        { label: 'TOP COAT', value: 'Hydrophobic Heat-Self Healing' },
        { label: 'COVERAGE', value: 'Full Front, Track Pack, or Full Body' },
        { label: 'TURNAROUND', value: '3 - 5 Studio Days' }
      ]
    },
    {
      id: 'ceramic-9h',
      category: 'CERAMIC',
      tag: 'NANOTECHNOLOGY',
      title: '9H GRAPHENE CERAMIC MATRIX',
      image: '/images/ceramic.jpg',
      badge: '9H+ CERTIFIED',
      badgeColor: 'var(--m-blue-light)',
      description: 'Covalently bonded glass-graphene coating providing extreme hydrophobic water repelling (115° contact angle), intense gloss depth, and UV oxidation resistance.',
      specs: [
        { label: 'HARDNESS', value: '9H Graphene Hardness' },
        { label: 'CONTACT ANGLE', value: '115° Water Beading' },
        { label: 'LAYER MATRIX', value: '2 Base + 1 Top Coat Hydrophobic' },
        { label: 'DURABILITY', value: '5 - 7 Years Guaranteed' }
      ]
    },
    {
      id: 'paint-correction',
      category: 'PAINT',
      tag: 'OPTICAL CORRECTION',
      title: 'STAGE 3 MIRROR GLOSS RESTORATION',
      image: '/images/correction.jpg',
      badge: '99% SWIRL REMOVAL',
      badgeColor: 'var(--m-red)',
      description: 'Defect-free paintwork perfection. Multi-step dual-action rotary polishing removes heavy swirl marks, buffer trails, orange peel, and scratches down to micron-level tolerance.',
      specs: [
        { label: 'MEASUREMENT', value: 'Digital Ultrasonic Micrometer' },
        { label: 'PROCESS', value: 'Heavy Cut -> Medium Polish -> Jewel' },
        { label: 'LIGHTING', value: 'Scangrip High-CRI 96+ Inspection' },
        { label: 'INSPECTION', value: '100% Surface Micro-marring Clearance' }
      ]
    },
    {
      id: 'interior-alcantara',
      category: 'INTERIOR',
      tag: 'COCKPIT DETAILING',
      title: 'ALCANTARA & LEATHER PRESERVATION',
      image: '/images/interior.jpg',
      badge: 'UV COCKPIT SHIELD',
      badgeColor: 'var(--primary)',
      description: 'Deep steam extraction of carpet, anti-fungal sanitation, Alcantara nap restoration with suede rejuvenation, and ceramic barrier coating for matte leather upholstery.',
      specs: [
        { label: 'LEATHER SEAL', value: 'Ceramic Leather Shield (Non-greasy)' },
        { label: 'ALCANTARA', value: 'Degrease & Fibers Nap Rejuvenation' },
        { label: 'OZONE TREATMENT', value: 'Complete Bacteria Sanitation' },
        { label: 'STEERING WHEEL', value: 'Matte Factory Finish Restoration' }
      ]
    }
  ];

  const filteredServices = activeTab === 'ALL'
    ? services
    : services.filter(s => s.category === activeTab);

  return (
    <section id="services" className="section-padding" style={{ backgroundColor: 'var(--canvas)' }}>
      <div className="container-wide">
        
        {/* Section Header with Scroll Reveal */}
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
              MOTORSPORT PRESERVATION ARCHITECTURE
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
            <h2 className="display-lg" style={{ margin: 0, maxWidth: '700px' }}>
              GERMAN DETAILING PACKAGES & SPECS
            </h2>
            <p style={{ maxWidth: '480px', fontSize: '15px', color: 'var(--body)' }}>
              Each service is executed in our climate-controlled clean bays utilizing Scangrip 96+ CRI inspection lights and certified nano-coatings.
            </p>
          </div>
        </motion.div>

        {/* Category Tabs (BMW M Style) with Animated Underline */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            borderBottom: '1px solid var(--hairline)',
            marginBottom: '48px',
            paddingBottom: '4px'
          }}
        >
          {categories.map(cat => {
            const isActive = activeTab === cat.id;
            return (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  padding: '12px 0',
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  color: isActive ? 'var(--primary)' : 'var(--muted)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'color 0.25s ease'
                }}
              >
                {cat.label}
                {isActive && (
                  <motion.div
                    layoutId="servicesActiveTabUnderline"
                    style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, var(--m-blue-light) 0%, var(--m-blue-dark) 50%, var(--m-red) 100%)'
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Services Spec Grid with Crossfade Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '32px'
            }}
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  borderColor: 'var(--m-blue-dark)',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.85)',
                  transition: { duration: 0.25 }
                }}
                className="card-surface"
                style={{
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                {/* Photo Band inside Card with Image Zoom */}
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.85) contrast(1.1)'
                    }}
                  />
                  
                  {/* Badge Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: 'rgba(0,0,0,0.85)',
                      border: `1px solid ${service.badgeColor}`,
                      padding: '4px 12px',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    <span className="label-uppercase" style={{ fontSize: '11px', color: service.badgeColor }}>
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Card Body Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className="label-uppercase" style={{ fontSize: '12px', color: 'var(--m-blue-dark)', marginBottom: '8px' }}>
                    {service.tag}
                  </div>

                  <h3 className="display-sm" style={{ fontSize: '22px', margin: '0 0 12px 0' }}>
                    {service.title}
                  </h3>

                  <p style={{ fontSize: '14px', color: 'var(--body)', marginBottom: '24px', lineHeight: 1.6 }}>
                    {service.description}
                  </p>

                  {/* Specs Table */}
                  <div
                    style={{
                      backgroundColor: 'var(--surface-soft)',
                      border: '1px solid var(--hairline-strong)',
                      padding: '16px',
                      marginBottom: '24px',
                      marginTop: 'auto'
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {service.specs.map((spec, i) => (
                        <div key={i} style={{ borderBottom: i < 2 ? '1px solid var(--hairline-strong)' : 'none', paddingBottom: i < 2 ? '8px' : '0' }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            {spec.label}
                          </div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--body-strong)', marginTop: '2px' }}>
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Button with Tap Effect */}
                  <motion.button
                    onClick={() => onSelectPackage(service.id)}
                    className="btn-outline"
                    whileHover={{ scale: 1.02, borderColor: 'var(--m-blue-light)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    SELECT & CONFIGURE <ChevronRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
