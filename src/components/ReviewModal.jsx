import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitReviewToDb } from '../lib/supabase';

export default function ReviewModal({ isOpen, onClose, onSubmitReview, prefilledService }) {
  const [formData, setFormData] = useState({
    name: '',
    vehicle: '',
    service: '',
    rating: 5,
    telemetry: '0.00 SWIRLS // 100% CLEARANCE',
    quote: ''
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({
        ...prev,
        service: prefilledService
      }));
    }
  }, [prefilledService, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const monthNames = [
      'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];
    const now = new Date();
    const currentDate = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    const newReview = {
      name: formData.name.toUpperCase(),
      vehicle: formData.vehicle.toUpperCase(),
      service: formData.service || 'CUSTOM DETAILING SPEC',
      quote: formData.quote,
      rating: formData.rating,
      date: currentDate,
      telemetry: formData.telemetry.toUpperCase()
    };

    onSubmitReview(newReview);
    setSubmitted(true);

    // Persist to Supabase if configured
    try {
      submitReviewToDb({
        customer_name: newReview.name,
        vehicle_model: newReview.vehicle,
        service_specification: newReview.service,
        rating: newReview.rating,
        telemetry_metric: newReview.telemetry,
        quote: newReview.quote,
        status: 'verified'
      }).catch(() => {});
    } catch {}

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0066b1', '#1c69d4', '#e22718', '#ffffff']
      });
    } catch {
      // silent fallback
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      vehicle: '',
      service: '',
      rating: 5,
      telemetry: '0.00 SWIRLS // 100% CLEARANCE',
      quote: ''
    });
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
        zIndex: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={(e) => e.target === e.currentTarget && resetAndClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="card-surface"
        style={{
          width: '100%',
          maxWidth: '620px',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="m-stripe-badge" />
              <span className="label-uppercase" style={{ fontSize: '11px', color: 'var(--muted)' }}>
                CLIENT TELEMETRY LOG
              </span>
            </div>
            <h3 className="display-sm" style={{ fontSize: '22px', margin: '4px 0 0 0' }}>
              SUBMIT OWNER REVIEW
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--muted)',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '32px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: 'rgba(28, 105, 212, 0.1)', border: '1px solid var(--m-blue-dark)', color: 'var(--m-blue-light)', marginBottom: '20px' }}>
                <CheckCircle2 size={44} />
              </div>
              <h3 className="display-sm" style={{ fontSize: '24px', margin: '0 0 8px 0' }}>
                TELEMETRY LOGGED
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--body)', marginBottom: '24px', maxWidth: '420px', margin: '0 auto 24px auto' }}>
                Your verified review and telemetry record have been published to the studio archive.
              </p>
              <button
                onClick={resetAndClose}
                className="btn-primary"
                style={{ minWidth: '180px' }}
              >
                DONE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Star Rating Selection */}
              <div>
                <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>
                  EXPERIENCE RATING *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating || formData.rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          color: isFilled ? 'var(--m-red)' : 'var(--hairline)'
                        }}
                      >
                        <Star size={24} fill={isFilled ? 'var(--m-red)' : 'transparent'} />
                      </button>
                    );
                  })}
                  <span style={{ fontSize: '12px', color: 'var(--primary)', fontFamily: 'var(--font-display)', fontWeight: 700, marginLeft: '8px' }}>
                    {formData.rating}.0 / 5.0
                  </span>
                </div>
              </div>

              {/* Row 1: Name and Vehicle */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    OWNER NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MARCUS V."
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="text-input"
                  />
                </div>
                <div>
                  <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    VEHICLE MODEL / PLATFORM *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2025 BMW M3 CS / PORSCHE GT3"
                    value={formData.vehicle}
                    onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
                    className="text-input"
                  />
                </div>
              </div>

              {/* Row 2: Service & Telemetry Metric */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    SERVICE SPECIFICATION
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10H Pro Graphene Armour / PPF Ultra"
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                    className="text-input"
                  />
                </div>
                <div>
                  <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                    TELEMETRY STAT / METRIC
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 0.00 SWIRLS // 100% CLEARANCE"
                    value={formData.telemetry}
                    onChange={e => setFormData({ ...formData, telemetry: e.target.value })}
                    className="text-input"
                  />
                </div>
              </div>

              {/* Row 3: Review Text */}
              <div>
                <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  YOUR REVIEW & FEEDBACK *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your studio experience, optical clarity, finish quality, and paintwork results..."
                  value={formData.quote}
                  onChange={e => setFormData({ ...formData, quote: e.target.value })}
                  className="text-input"
                  style={{ height: 'auto', padding: '12px', resize: 'vertical' }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
              >
                PUBLISH TELEMETRY REVIEW <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
