import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FastlaneMetrics from './components/FastlaneMetrics';
import ServicesSpec from './components/ServicesSpec';
import PPFVisualizer from './components/PPFVisualizer';
import StudioConfigurator from './components/StudioConfigurator';
import StudioCleanroom from './components/StudioCleanroom';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import ChatbotDrawer from './components/ChatbotDrawer';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [prefilledConfig, setPrefilledConfig] = useState(null);

  const handleOpenBooking = () => {
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

  const handleReserveConfig = (configData) => {
    setPrefilledConfig(configData);
    setIsBookingOpen(true);
  };

  const handleSelectPackage = (packageId) => {
    // Scroll smoothly to configurator
    const element = document.getElementById('configurator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh', color: 'var(--body)' }}>
      {/* Top Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenChat={handleOpenChat}
      />

      {/* Main Content Sections */}
      <main>
        {/* 01. Hero Band */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 02. Fastlane Metrics Grid */}
        <FastlaneMetrics />

        {/* 03. Services & Technical Specifications */}
        <ServicesSpec onSelectPackage={handleSelectPackage} />

        {/* 04. PPF & Gloss Optical Visualizer */}
        <PPFVisualizer />

        {/* 05. Live Interactive Configurator */}
        <StudioConfigurator onReserveConfig={handleReserveConfig} />

        {/* 06. Clean Room Facilities */}
        <StudioCleanroom />

        {/* 07. Verified Client Telemetry Reviews */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Interactive Booking Modal Drawer */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        prefilledConfig={prefilledConfig}
      />

      {/* Interactive Detailing Chatbot Drawer */}
      <ChatbotDrawer
        isOpen={isChatOpen}
        onClose={handleCloseChat}
      />
    </div>
  );
}
