import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FastlaneMetrics from './components/FastlaneMetrics';
import ServicesSpec from './components/ServicesSpec';
import StudioConfigurator from './components/StudioConfigurator';
import StudioCleanroom from './components/StudioCleanroom';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import ChatbotDrawer from './components/ChatbotDrawer';
import ReviewModal from './components/ReviewModal';
import AuthModal from './components/AuthModal';
import { getUser, signOut as supabaseSignOut, onAuthStateChange } from './lib/supabase';

const initialReviews = [
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

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authIntentMessage, setAuthIntentMessage] = useState('');
  const [pendingBookingAction, setPendingBookingAction] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const [user, setUser] = useState(null);
  const [prefilledReviewService, setPrefilledReviewService] = useState('');
  const [prefilledConfig, setPrefilledConfig] = useState(null);

  // Global scroll progress and scroll-to-top tracking
  const { scrollYProgress, scrollY } = useScroll();

  useEffect(() => {
    const unsubscribeScroll = scrollY.on('change', (latest) => {
      setShowBackToTop(latest > 420);
    });
    return () => unsubscribeScroll();
  }, [scrollY]);

  useEffect(() => {
    // Check initial user session
    getUser().then(u => {
      if (u) {
        const savedUsername = localStorage.getItem('moto_alpha_username');
        if (savedUsername && !u.username) {
          u.username = savedUsername;
        } else if (u.user_metadata?.username) {
          u.username = u.user_metadata.username;
        }
        setUser(u);
      } else {
        const savedMock = localStorage.getItem('moto_alpha_user');
        if (savedMock) {
          try {
            setUser(JSON.parse(savedMock));
          } catch {}
        }
      }
    }).catch(() => {});

    // Subscribe to auth state updates (including Magic Link verification callbacks)
    const subscription = onAuthStateChange((_event, session) => {
      const u = session?.user || null;
      if (u) {
        const savedUsername = localStorage.getItem('moto_alpha_username');
        if (savedUsername && !u.username) {
          u.username = savedUsername;
        } else if (u.user_metadata?.username) {
          u.username = u.user_metadata.username;
        }
        setIsAuthOpen(false);
      }
      setUser(u);
    });

    return () => {
      if (subscription?.unsubscribe) subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabaseSignOut();
    try {
      localStorage.removeItem('moto_alpha_username');
      localStorage.removeItem('moto_alpha_user');
    } catch {}
    setUser(null);
  };

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('moto_alpha_reviews');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return initialReviews;
  });

  // Slot booking triggers: intercept if user is not authenticated
  const handleOpenBooking = () => {
    if (!user) {
      setAuthIntentMessage('Authentication required: Please login or signup with your username (max 10 letters) to book a studio slot.');
      setPendingBookingAction(true);
      setIsAuthOpen(true);
      return;
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleOpenReview = (serviceName) => {
    setPrefilledReviewService(typeof serviceName === 'string' ? serviceName : '');
    setIsReviewOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewOpen(false);
  };

  const handleAddReview = (newReview) => {
    setReviews(prev => {
      const updated = [newReview, ...prev];
      try {
        localStorage.setItem('moto_alpha_reviews', JSON.stringify(updated));
      } catch {
        // silent fallback
      }
      return updated;
    });
  };

  const handleReserveConfig = (configData) => {
    setPrefilledConfig(configData);
    if (!user) {
      setAuthIntentMessage('Authentication required: Please login or signup with your username to book this specification slot.');
      setPendingBookingAction(true);
      setIsAuthOpen(true);
      return;
    }
    setIsBookingOpen(true);
  };

  const handleSelectPackage = (_packageId) => {
    const element = document.getElementById('configurator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuthModal = () => {
    setAuthIntentMessage('');
    setPendingBookingAction(false);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    setIsAuthOpen(false);
    setAuthIntentMessage('');
    // If the user was trying to book a slot before logging in, immediately open the booking modal
    if (pendingBookingAction) {
      setPendingBookingAction(false);
      setIsBookingOpen(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh', color: 'var(--body)', position: 'relative' }}>
      
      {/* Global BMW M Tricolor Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          transformOrigin: '0%',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--m-blue-light) 0%, var(--m-blue-dark) 50%, var(--m-red) 100%)',
          zIndex: 9999,
          boxShadow: '0 0 10px rgba(28, 105, 212, 0.8)'
        }}
      />

      {/* Top Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenChat={handleOpenChat}
        user={user}
        onOpenAuth={handleOpenAuthModal}
        onSignOut={handleSignOut}
      />

      {/* Main Content Sections */}
      <main>
        {/* 01. Hero Band with Parallax Depth & Staggered Animations */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 02. Fastlane Metrics Grid with Scroll-Triggered Stagger */}
        <FastlaneMetrics />

        {/* 03. Services & Technical Specifications with Category Transitions */}
        <ServicesSpec onSelectPackage={handleSelectPackage} />

        {/* 04. Live Interactive Configurator & Specification Telemetry */}
        <StudioConfigurator
          onReserveConfig={handleReserveConfig}
          onOpenReview={handleOpenReview}
        />

        {/* 05. Clean Room Facilities with Scroll-Triggered Entrance */}
        <StudioCleanroom />

        {/* 06. Verified Client Telemetry Reviews */}
        <Testimonials
          reviews={reviews}
          onOpenReview={handleOpenReview}
        />
      </main>

      {/* Footer with Pre-Footer CTA Animations */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Floating Return-To-Top Button (Appears on Scroll) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, borderColor: 'var(--m-red)', boxShadow: '0 0 20px rgba(226, 39, 24, 0.5)' }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: '44px',
              height: '44px',
              backgroundColor: 'rgba(13, 13, 13, 0.92)',
              border: '1px solid var(--hairline-strong)',
              color: 'var(--primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 90,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7)',
              transition: 'border-color 0.25s ease'
            }}
            title="Return to Top"
          >
            <ArrowUp size={18} style={{ color: 'var(--m-red)' }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Interactive Booking Modal Drawer (Gated by Authentication) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        prefilledConfig={prefilledConfig}
        user={user}
        onOpenAuth={() => {
          setIsBookingOpen(false);
          setAuthIntentMessage('Authentication required: Please login or signup with your username to book a studio slot.');
          setPendingBookingAction(true);
          setIsAuthOpen(true);
        }}
      />

      {/* Interactive Detailing Chatbot Drawer */}
      <ChatbotDrawer
        isOpen={isChatOpen}
        onClose={handleCloseChat}
      />

      {/* Client Telemetry Review Modal */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={handleCloseReview}
        onSubmitReview={handleAddReview}
        prefilledService={prefilledReviewService}
      />

      {/* Supabase Client Portal Auth / OTP Verification Modal with Username input */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setPendingBookingAction(false);
          setAuthIntentMessage('');
        }}
        onAuthSuccess={handleAuthSuccess}
        intentMessage={authIntentMessage}
      />
    </div>
  );
}
