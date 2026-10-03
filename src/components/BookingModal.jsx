import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Car, CheckCircle2, Shield, ArrowRight, MapPin, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ isOpen, onClose, prefilledConfig }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    service: '9H GRAPHENE CERAMIC MATRIX',
    date: '',
    time: '10:00 AM',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    if (prefilledConfig) {
      setFormData(prev => ({
        ...prev,
        vehicle: prefilledConfig.vehicleType || prev.vehicle,
        service: prefilledConfig.packageName || prev.service,
        notes: prefilledConfig.addons ? `Addons: ${prefilledConfig.addons.join(', ')}` : prev.notes
      }));
    }
  }, [prefilledConfig]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomId = 'MOTO-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);
    setSubmitted(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0066b1', '#1c69d4', '#e22718', '#ffffff']
      });
    } catch (err) {
      // fallback silent
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={(e) => e.target === e.currentTarget && resetAndClose()}
    >
      <div
        className="card-surface"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--canvas)',
          border: '1px solid var(--hairline)',
          padding: 0,
          position: 'relative'
        }}
      >
        {/* Top M Tricolor Bar */}
        <div className="m-stripe-divider" />

        {/* Modal Header */}
        <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--hairline-strong)' }}>
          <div>
            <span className="label-uppercase" style={{ fontSize: '11px', color: 'var(--muted)' }}>
              STUDIO APPOINTMENT RESERVATION
            </span>
            <h3 className="display-sm" style={{ fontSize: '24px', margin: '4px 0 0 0' }}>
              RESERVE STUDIO BAY
            </h3>
          </div>

          <button
            onClick={resetAndClose}
            className="btn-icon"
            style={{ width: '40px', height: '40px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body or Success State */}
        <div style={{ padding: '32px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ width: '64px', height: '64px', margin: '0 auto 24px auto', borderRadius: '50%', backgroundColor: 'var(--surface-card)', border: '2px solid var(--m-blue-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--m-blue-dark)' }}>
                <CheckCircle2 size={36} />
              </div>

              <div className="label-uppercase" style={{ fontSize: '12px', color: 'var(--m-blue-dark)', marginBottom: '8px' }}>
                RESERVATION CONFIRMED
              </div>

              <h2 className="display-sm" style={{ fontSize: '28px', margin: '0 0 16px 0' }}>
                SPEC RESERVED: {bookingId}
              </h2>

              <p style={{ fontSize: '15px', color: 'var(--body)', maxWidth: '480px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
                Thank you, <strong style={{ color: '#fff' }}>{formData.name}</strong>. Our Master Detailing Technician will call you at <strong style={{ color: '#fff' }}>{formData.phone}</strong> within 30 minutes to confirm vehicle drop-off and paint inspection logistics.
              </p>

              <div
                style={{
                  backgroundColor: 'var(--surface-soft)',
                  border: '1px solid var(--hairline-strong)',
                  padding: '20px',
                  maxWidth: '440px',
                  margin: '0 auto 32px auto',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '1px', fontFamily: 'var(--font-display)' }}>
                  RESERVATION TELEMETRY:
                </div>
                <div style={{ fontSize: '14px', color: '#fff', marginTop: '8px' }}>
                  • Vehicle: {formData.vehicle || 'Exotic Platform'}
                </div>
                <div style={{ fontSize: '14px', color: '#fff', marginTop: '4px' }}>
                  • Service Spec: {formData.service}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--m-blue-light)', marginTop: '4px' }}>
                  • Date: {formData.date || 'Earliest Studio Slot'} at {formData.time}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--body-strong)', marginTop: '8px', borderTop: '1px solid var(--hairline)', paddingTop: '8px' }}>
                  • Drop-off Studio: Shop no. 2, Shreeji Landmark, Next to tata showroom, opposite to carmel convent school, Chikhloli, Ambernath(East)
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=19.1812343,73.2188796"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    fontSize: '11px',
                    marginTop: '12px',
                    width: '100%',
                    justifyContent: 'center',
                    borderColor: 'var(--m-red)',
                    color: 'var(--primary)',
                    textDecoration: 'none'
                  }}
                >
                  <MapPin size={14} style={{ color: 'var(--m-red)' }} />
                  NAVIGATE TO MOTO-ALPHA <ArrowUpRight size={14} />
                </a>
              </div>

              <button onClick={resetAndClose} className="btn-primary" style={{ minWidth: '200px' }}>
                CLOSE WINDOW
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Row 1: Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <div>
                  <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Alexander Vance"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="text-input"
                  />
                </div>

                <div>
                  <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="text-input"
                  />
                </div>
              </div>

              {/* Row 2: Email & Vehicle */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <div>
                  <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alexander@domain.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="text-input"
                  />
                </div>

                <div>
                  <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    VEHICLE YEAR / MAKE / MODEL *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 2025 BMW M4 Competition CS"
                    value={formData.vehicle}
                    onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
                    className="text-input"
                  />
                </div>
              </div>

              {/* Row 3: Service Selection */}
              <div>
                <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  TARGET SERVICE SPECIFICATION *
                </label>
                <select
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                  className="text-input"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="9H GRAPHENE CERAMIC MATRIX">9H GRAPHENE CERAMIC MATRIX</option>
                  <option value="STEALTH MATTE PPF WRAP">STEALTH MATTE PPF WRAP</option>
                  <option value="STAGE 3 MIRROR GLOSS RESTORATION">STAGE 3 MIRROR GLOSS RESTORATION</option>
                  <option value="ALCANTARA & LEATHER RESTORATION">ALCANTARA & LEATHER RESTORATION</option>
                  <option value="CUSTOM DETAILING SPEC">CUSTOM SPECIFICATION (FROM CONFIGURATOR)</option>
                </select>
              </div>

              {/* Row 4: Preferred Date & Time */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <div>
                  <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    PREFERRED STUDIO DATE
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="text-input"
                  />
                </div>

                <div>
                  <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    DROP-OFF TIME SLOT
                  </label>
                  <select
                    value={formData.time}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    className="text-input"
                  >
                    <option value="08:00 AM">08:00 AM (Early Fastlane Drop-off)</option>
                    <option value="10:00 AM">10:00 AM (Standard Slot)</option>
                    <option value="01:00 PM">01:00 PM (Afternoon Slot)</option>
                    <option value="04:00 PM">04:00 PM (Evening Prep Slot)</option>
                  </select>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  SPECIAL VEHICLE NOTES / PAINT CONCERNS
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention stone chip repairs, custom wraps, ceramic history, or delicate matte carbon trims..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="text-input"
                  style={{ height: 'auto', padding: '12px 16px' }}
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', height: '52px', marginTop: '8px' }}
              >
                CONFIRM STUDIO RESERVATION <ArrowRight size={16} />
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
