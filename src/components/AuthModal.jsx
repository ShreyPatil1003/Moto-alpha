import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Smartphone, Mail, ArrowRight, CheckCircle2, Shield, RefreshCw, AlertCircle, User, Calendar, ExternalLink, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { signInWithOtpPhone, verifyOtpPhone, signInWithOtpEmail, verifyOtpEmail, isSupabaseConfigured, supabase } from '../lib/supabase';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, intentMessage }) {
  const [method, setMethod] = useState('phone'); // 'phone' | 'email'
  const [step, setStep] = useState('input'); // 'input' | 'otp' | 'success'
  
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  // 8-digit segmented OTP state
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '', '', '']);
  const digitInputRefs = useRef([]);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);

  // Auto-focus first OTP digit when entering OTP verification step
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        digitInputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  if (!isOpen) return null;

  // Start resend countdown
  const startCountdown = () => {
    setResendCountdown(60);
    const interval = setInterval(() => {
      setResendCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const cleanUsername = username.trim().slice(0, 10).toUpperCase();

    // 1. Validate Username (Must be non-empty and max 10 letters)
    if (!cleanUsername) {
      setErrorMsg('Please enter a username (maximum 10 letters).');
      setLoading(false);
      return;
    }

    if (cleanUsername.length > 10) {
      setErrorMsg('Username cannot exceed 10 letters.');
      setLoading(false);
      return;
    }

    try {
      if (method === 'phone') {
        if (!phone.trim()) {
          setErrorMsg('Please enter a valid phone number with country code (e.g. +91 98765 43210)');
          setLoading(false);
          return;
        }

        const { error } = await signInWithOtpPhone(phone, {
          username: cleanUsername,
          full_name: cleanUsername
        });

        if (error) {
          if (!isSupabaseConfigured) {
            // Demo fallback mode
            setStep('otp');
            setOtpDigits(['', '', '', '', '', '', '', '']);
            startCountdown();
            setLoading(false);
            return;
          }
          throw error;
        }
      } else {
        if (!email.trim() || !email.includes('@')) {
          setErrorMsg('Please enter a valid email address');
          setLoading(false);
          return;
        }

        const { error } = await signInWithOtpEmail(email, {
          username: cleanUsername,
          full_name: cleanUsername
        });

        if (error) {
          if (!isSupabaseConfigured) {
            // Demo fallback mode
            setStep('otp');
            setOtpDigits(['', '', '', '', '', '', '', '']);
            startCountdown();
            setLoading(false);
            return;
          }
          throw error;
        }
      }

      setStep('otp');
      setOtpDigits(['', '', '', '', '', '', '', '']);
      startCountdown();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to dispatch verification code. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle Individual Digit Change & Auto-Advance (8 Digits)
  const handleDigitChange = (index, value) => {
    // Only accept numeric digits
    const cleaned = value.replace(/\D/g, '');
    const newDigits = [...otpDigits];

    if (!cleaned) {
      newDigits[index] = '';
      setOtpDigits(newDigits);
      return;
    }

    // Take the last entered character if multiple typed
    const digit = cleaned.slice(-1);
    newDigits[index] = digit;
    setOtpDigits(newDigits);
    if (errorMsg) setErrorMsg('');

    // Advance to next box if not on the last box (index 7 is the 8th box)
    if (index < 7) {
      digitInputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all 8 digits are complete
    if (newDigits.every(d => d !== '')) {
      const fullToken = newDigits.join('');
      executeVerifyOtp(fullToken);
    }
  };

  // Handle Backspace, Arrow Keys navigation across digit inputs
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        const newDigits = [...otpDigits];
        newDigits[index - 1] = '';
        setOtpDigits(newDigits);
        digitInputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      digitInputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 7) {
      digitInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Paste for fast 8-digit code insertion
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 8);
    if (!pastedData) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < 8; i++) {
      newDigits[i] = pastedData[i] || '';
    }
    setOtpDigits(newDigits);
    if (errorMsg) setErrorMsg('');

    const nextFocusIndex = Math.min(pastedData.length, 7);
    digitInputRefs.current[nextFocusIndex]?.focus();

    if (pastedData.length === 8) {
      executeVerifyOtp(pastedData);
    }
  };

  // Step 2 Core Verification Execution
  const executeVerifyOtp = async (tokenString) => {
    const token = tokenString || otpDigits.join('');
    setErrorMsg('');
    setLoading(true);

    const cleanUsername = username.trim().slice(0, 10).toUpperCase() || 'CLIENT';

    try {
      if (!token || token.length < 8) {
        setErrorMsg('Please enter all 8 digits of your verification code.');
        setLoading(false);
        return;
      }

      if (!isSupabaseConfigured) {
        // Simulated verification for preview when Supabase credentials are pending
        const mockId = 'user-alpha-preview';
        const mockUser = {
          id: mockId,
          username: cleanUsername,
          phone: method === 'phone' ? phone : null,
          email: method === 'email' ? email : null,
          role: 'customer',
          user_metadata: {
            username: cleanUsername,
            full_name: cleanUsername
          }
        };
        handleSuccess(mockUser);
        return;
      }

      let res;
      if (method === 'phone') {
        res = await verifyOtpPhone(phone, token);
      } else {
        res = await verifyOtpEmail(email, token);
      }

      if (res.error) throw res.error;

      // Update user metadata in Supabase
      try {
        await supabase.auth.updateUser({
          data: {
            username: cleanUsername,
            full_name: cleanUsername
          }
        });
      } catch (err) {
        console.warn('Metadata update note:', err);
      }

      const verifiedUser = res.data?.user || {};
      verifiedUser.username = cleanUsername;
      if (!verifiedUser.user_metadata) verifiedUser.user_metadata = {};
      verifiedUser.user_metadata.username = cleanUsername;
      verifiedUser.user_metadata.full_name = cleanUsername;

      handleSuccess(verifiedUser);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid or expired OTP token. Please check your email or resend code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpFormSubmit = (e) => {
    e.preventDefault();
    executeVerifyOtp(otpDigits.join(''));
  };

  const handleSuccess = (userObj) => {
    const cleanUsername = userObj?.username || username.trim().slice(0, 10).toUpperCase() || 'CLIENT';
    const completeUser = {
      ...userObj,
      username: cleanUsername,
      user_metadata: {
        ...(userObj?.user_metadata || {}),
        username: cleanUsername,
        full_name: cleanUsername
      }
    };

    try {
      localStorage.setItem('moto_alpha_username', cleanUsername);
      localStorage.setItem('moto_alpha_user', JSON.stringify(completeUser));
    } catch {}

    setStep('success');
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#0066b1', '#1c69d4', '#e22718', '#ffffff']
      });
    } catch {}

    if (onAuthSuccess) {
      onAuthSuccess(completeUser);
    }
  };

  const resetAndClose = () => {
    setStep('input');
    setUsername('');
    setPhone('');
    setEmail('');
    setOtpDigits(['', '', '', '', '', '', '', '']);
    setErrorMsg('');
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
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(10px)',
        zIndex: 300,
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
          maxWidth: '520px',
          backgroundColor: '#0d0d0d',
          border: '1px solid #262626',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9)',
          padding: 0,
          position: 'relative'
        }}
      >
        {/* Top BMW M Tricolor Header Bar */}
        <div style={{ display: 'flex', height: '4px', width: '100%' }}>
          <div style={{ flex: 1, backgroundColor: 'var(--m-blue-light)' }} />
          <div style={{ flex: 1, backgroundColor: 'var(--m-blue-dark)' }} />
          <div style={{ flex: 1, backgroundColor: 'var(--m-red)' }} />
        </div>

        {/* Modal Header */}
        <div style={{ padding: '24px 28px 16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f1f1f' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="m-stripe-badge" />
              <span className="label-uppercase" style={{ fontSize: '11px', color: 'var(--muted)' }}>
                MOTO-ALPHA STUDIO SECURITY
              </span>
            </div>
            <h3 className="display-sm" style={{ fontSize: '22px', margin: '4px 0 0 0' }}>
              {step === 'otp' ? 'VERIFY STUDIO ACCESS' : 'CLIENT LOGIN / SIGNUP'}
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
        <div style={{ padding: '28px' }}>

          {/* Slot Booking Gate Message (if user was prompted when attempting to book) */}
          {intentMessage && (
            <div
              style={{
                backgroundColor: 'rgba(28, 105, 212, 0.12)',
                border: '1px solid var(--m-blue-dark)',
                padding: '12px 16px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                fontSize: '12px',
                color: 'var(--primary)'
              }}
            >
              <Calendar size={18} style={{ color: 'var(--m-blue-light)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', color: 'var(--m-blue-light)', marginBottom: '2px', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>
                  SLOT RESERVATION ACCESS REQUIRED
                </strong>
                <span>{intentMessage}</span>
              </div>
            </div>
          )}
          
          {/* Supabase Environment Notice (Helper) */}
          {!isSupabaseConfigured && (
            <div
              style={{
                backgroundColor: 'rgba(28, 105, 212, 0.08)',
                border: '1px solid var(--m-blue-dark)',
                padding: '12px 16px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '11px',
                color: 'var(--body)'
              }}
            >
              <Shield size={18} style={{ color: 'var(--m-blue-light)', flexShrink: 0 }} />
              <div>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>SUPABASE CLIENT READY: </span>
                Configure <code style={{ color: 'var(--m-blue-light)' }}>VITE_SUPABASE_URL</code> in <code style={{ color: 'var(--m-blue-light)' }}>.env</code> for live cloud verification. Local preview testing is enabled.
              </div>
            </div>
          )}

          {/* Success Step */}
          {step === 'success' ? (
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: 'rgba(28, 105, 212, 0.12)', border: '1px solid var(--m-blue-dark)', color: 'var(--m-blue-light)', marginBottom: '16px' }}>
                <CheckCircle2 size={40} />
              </div>
              <div className="label-uppercase" style={{ fontSize: '12px', color: 'var(--m-blue-light)', marginBottom: '6px' }}>
                SESSION AUTHENTICATED
              </div>
              <h4 className="display-sm" style={{ fontSize: '24px', margin: '0 0 8px 0' }}>
                WELCOME, {username.trim().toUpperCase() || 'CLIENT'}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--body)', marginBottom: '24px' }}>
                Verified successfully with username <strong>{username.trim().toUpperCase()}</strong> via {method === 'phone' ? `SMS OTP to ${phone}` : `Email OTP to ${email}`}.
              </p>
              <button
                onClick={resetAndClose}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                PROCEED TO STUDIO
              </button>
            </div>
          ) : (
            <div>
              {/* Method Switcher Tabs */}
              {step === 'input' && (
                <div style={{ display: 'flex', borderBottom: '1px solid var(--hairline-strong)', marginBottom: '24px' }}>
                  <button
                    type="button"
                    onClick={() => { setMethod('phone'); setErrorMsg(''); }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'none',
                      border: 'none',
                      borderBottom: method === 'phone' ? '2px solid var(--m-blue-dark)' : '2px solid transparent',
                      color: method === 'phone' ? 'var(--primary)' : 'var(--muted)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Smartphone size={16} /> PHONE SMS OTP
                  </button>

                  <button
                    type="button"
                    onClick={() => { setMethod('email'); setErrorMsg(''); }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'none',
                      border: 'none',
                      borderBottom: method === 'email' ? '2px solid var(--m-blue-dark)' : '2px solid transparent',
                      color: method === 'email' ? 'var(--primary)' : 'var(--muted)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Mail size={16} /> EMAIL MAGIC LINK / OTP
                  </button>
                </div>
              )}

              {/* Error Banner */}
              {errorMsg && (
                <div
                  style={{
                    backgroundColor: 'rgba(226, 39, 24, 0.1)',
                    border: '1px solid var(--m-red)',
                    padding: '12px 14px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '12px',
                    color: '#ff8a80'
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Step 1: Input Username & Phone / Email */}
              {step === 'input' && (
                <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Username Field (Max 10 Letters) */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label className="label-uppercase" style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={12} style={{ color: 'var(--m-blue-light)' }} /> USERNAME (MAX 10 LETTERS) *
                      </label>
                      <span
                        style={{
                          fontSize: '11px',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          color: username.length >= 10 ? 'var(--m-red)' : 'var(--muted)'
                        }}
                      >
                        {username.length}/10 CHARS
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      autoFocus
                      placeholder="e.g. MAX_V (Max 10 letters)"
                      value={username}
                      onChange={e => {
                        const val = e.target.value.replace(/\s+/g, '').slice(0, 10);
                        setUsername(val);
                        if (errorMsg) setErrorMsg('');
                      }}
                      className="text-input"
                      style={{
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: 700,
                        fontFamily: 'var(--font-display)'
                      }}
                    />
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '6px' }}>
                      This username will be displayed directly on your studio profile icon.
                    </div>
                  </div>

                  {method === 'phone' ? (
                    <div>
                      <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>
                        MOBILE NUMBER (WITH COUNTRY CODE) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210 or +1 202 555 0123"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="text-input"
                      />
                      <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '6px' }}>
                        We will send a 6-digit authentication token via SMS to verify your studio account.
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="label-uppercase" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '8px' }}>
                        ACCOUNT EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="owner@supercar-garage.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="text-input"
                      />
                      <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '6px' }}>
                        Dispatched via Moto-Alpha SMTP with instant 1-click Magic Link and 6-digit verification code.
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <RefreshCw size={16} className="spin-animation" /> DISPATCHING CODE...
                      </span>
                    ) : (
                      <>SEND VERIFICATION CODE <ArrowRight size={16} /></>
                    )}
                  </button>
                </form>
              )}

              {/* Step 2: Segmented 6-Digit PIN & Magic Link Telemetry */}
              {step === 'otp' && (
                <form onSubmit={handleVerifyOtpFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Email Magic Link Notice Header */}
                  {method === 'email' ? (
                    <div
                      style={{
                        backgroundColor: 'rgba(28, 105, 212, 0.08)',
                        border: '1px solid #1c69d4',
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        borderRadius: '2px'
                      }}
                    >
                      <Sparkles size={18} style={{ color: 'var(--m-blue-light)', flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ fontSize: '12px', lineHeight: 1.5, flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                          <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>
                            AUTHENTICATION EMAIL DISPATCHED
                          </strong>
                          <span style={{ fontSize: '10px', color: 'var(--m-blue-light)', fontWeight: 700, letterSpacing: '1px' }}>
                            VIA MOTO-ALPHA
                          </span>
                        </div>
                        <span style={{ color: 'var(--body)' }}>
                          Click the <strong>"AUTHENTICATE STUDIO SESSION"</strong> link in your email to log in instantly, or enter the 8-digit PIN below.
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {/* Telemetry Target Info Box */}
                  <div style={{ backgroundColor: '#141414', padding: '16px', border: '1px solid #262626', borderRadius: '2px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>
                        PILOT HANDLE:
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--primary)', fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '1px' }}>
                        {username.trim().toUpperCase()}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>
                        DISPATCHED TO:
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>
                        {method === 'phone' ? phone : email}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #1f1f1f' }}>
                      <button
                        type="button"
                        onClick={() => { setStep('input'); setErrorMsg(''); setOtpDigits(['', '', '', '', '', '', '', '']); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--m-blue-light)',
                          fontSize: '11px',
                          cursor: 'pointer',
                          padding: 0,
                          textDecoration: 'underline'
                        }}
                      >
                        Change {method === 'phone' ? 'phone' : 'email'}
                      </button>

                      {method === 'email' && (
                        <a
                          href="https://mail.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: 'var(--primary)',
                            fontSize: '11px',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-display)',
                            letterSpacing: '0.5px'
                          }}
                        >
                          OPEN GMAIL <ExternalLink size={12} style={{ color: 'var(--m-blue-light)' }} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* 8-Digit Segmented PIN Input Boxes */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <label className="label-uppercase" style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '1px' }}>
                        ENTER 8-DIGIT VERIFICATION TOKEN *
                      </label>
                      <span style={{ fontSize: '10px', color: 'var(--m-blue-light)', fontFamily: 'var(--font-display)' }}>
                        PASTE SUPPORTED
                      </span>
                    </div>

                    {/* 8 Digit Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(8, 1fr)',
                        gap: '6px'
                      }}
                      onPaste={handlePaste}
                    >
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={el => (digitInputRefs.current[idx] = el)}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={e => handleDigitChange(idx, e.target.value)}
                          onKeyDown={e => handleKeyDown(idx, e)}
                          className="text-input"
                          style={{
                            height: '52px',
                            padding: 0,
                            textAlign: 'center',
                            fontSize: '22px',
                            fontWeight: 800,
                            fontFamily: 'monospace',
                            backgroundColor: digit ? 'rgba(28, 105, 212, 0.08)' : '#141414',
                            borderColor: digit ? 'var(--m-blue-light)' : '#262626',
                            color: 'var(--primary)',
                            boxShadow: digit ? '0 0 10px rgba(28, 105, 212, 0.3)' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Resend Actions & Countdown */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                    <span style={{ color: 'var(--muted)' }}>
                      Didn't receive token?
                    </span>
                    {resendCountdown > 0 ? (
                      <span style={{ color: 'var(--muted)', fontFamily: 'var(--font-display)', fontSize: '11px' }}>
                        Resend code in {resendCountdown}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={loading}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--m-blue-light)',
                          fontWeight: 600,
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        Resend OTP Token
                      </button>
                    )}
                  </div>

                  {/* Manual Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || otpDigits.some(d => d === '')}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      opacity: otpDigits.every(d => d !== '') ? 1 : 0.6
                    }}
                  >
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <RefreshCw size={16} className="spin-animation" /> VERIFYING TOKEN...
                      </span>
                    ) : (
                      <>VERIFY & COMPLETE LOGIN <CheckCircle2 size={16} /></>
                    )}
                  </button>
                </form>
              )}

            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
