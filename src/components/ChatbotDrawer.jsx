import React, { useState } from 'react';
import { X, Send, Bot, User, Sparkles, Shield, ChevronRight } from 'lucide-react';

export default function ChatbotDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "MOTO-ALPHA TELEMETRY ADVISOR // Online. Ask me about 9H Ceramic Cure Times, PPF Warranties, Paint Gauge Tolerances, or Package Specs."
    }
  ]);

  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    // Generate intelligent AI response based on automotive detailing query
    setTimeout(() => {
      let reply = "Our Master Technicians inspect every vehicle under 96+ CRI Scangrip lighting before recommending paint correction stages. Would you like to schedule an inspection?";
      const lower = userMsg.toLowerCase();

      if (lower.includes('ppf') || lower.includes('film') || lower.includes('wrap')) {
        reply = "Moto-Alpha utilizes 8.5-mil self-healing TPU Paint Protection Film with a comprehensive Manufacturer Warranty against yellowing, bubbling, and cracking. Heat from sun exposure automatically clears wash swirls.";
      } else if (lower.includes('ceramic') || lower.includes('coating') || lower.includes('9h')) {
        reply = "Our 9H Graphene Ceramic Matrix forms a permanent covalent bond with vehicle clear coat. It provides 115° hydrophobic water repelling and is cured under shortwave infrared lamps for maximum hardness.";
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('package')) {
        reply = "Pricing is customized based on your vehicle platform, paint condition, and tailored specification level. Please reserve a studio session or consult our interactive configurator for details!";
      } else if (lower.includes('time') || lower.includes('hours') || lower.includes('turnaround')) {
        reply = "Express Ceramic treatments take 18-24 hours. Full-body PPF Stealth wraps require 3-5 Studio Days in our clean bays to guarantee air-bubble free edges.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: 'clamp(320px, 90vw, 420px)',
        height: '560px',
        backgroundColor: 'var(--canvas)',
        border: '1px solid var(--hairline)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.9)',
        zIndex: 250,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Top Stripe */}
      <div className="m-stripe-divider" />

      {/* Drawer Header */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: 'var(--surface-card)',
          borderBottom: '1px solid var(--hairline-strong)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: 'var(--m-red)', borderRadius: '50%' }} />
          <div>
            <div className="label-uppercase" style={{ fontSize: '11px', color: 'var(--primary)' }}>
              TELEMETRY DETAILING BOT
            </div>
            <div style={{ fontSize: '10px', color: 'var(--muted)' }}>
              LIVE STUDIO ADVISOR // 24/7
            </div>
          </div>
        </div>

        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>

      {/* Message History */}
      <div
        style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          backgroundColor: 'var(--surface-soft)'
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              backgroundColor: m.sender === 'user' ? 'var(--m-blue-dark)' : 'var(--surface-card)',
              color: 'var(--primary)',
              border: '1px solid var(--hairline-strong)',
              padding: '12px 16px',
              fontSize: '13px',
              lineHeight: 1.5,
              fontWeight: 300
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Quick Prompt Chips */}
      <div
        style={{
          padding: '8px 12px',
          backgroundColor: 'var(--canvas)',
          borderTop: '1px solid var(--hairline-strong)',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto'
        }}
      >
        <button
          onClick={() => setInput("What is the warranty on PPF?")}
          style={{
            fontSize: '10px',
            fontFamily: 'var(--font-display)',
            backgroundColor: 'var(--surface-card)',
            color: 'var(--body-strong)',
            border: '1px solid var(--hairline)',
            padding: '4px 8px',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
        >
          PPF WARRANTY?
        </button>
        <button
          onClick={() => setInput("How long does Ceramic Coating last?")}
          style={{
            fontSize: '10px',
            fontFamily: 'var(--font-display)',
            backgroundColor: 'var(--surface-card)',
            color: 'var(--body-strong)',
            border: '1px solid var(--hairline)',
            padding: '4px 8px',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
        >
          CERAMIC DURABILITY?
        </button>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSend}
        style={{
          padding: '12px',
          backgroundColor: 'var(--canvas)',
          borderTop: '1px solid var(--hairline-strong)',
          display: 'flex',
          gap: '8px'
        }}
      >
        <input
          type="text"
          placeholder="Ask a technical detailing question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          className="text-input"
          style={{ height: '40px', fontSize: '13px' }}
        />
        <button
          type="submit"
          className="btn-primary"
          style={{ width: '40px', height: '40px', padding: 0, justifyContent: 'center' }}
        >
          <Send size={16} />
        </button>
      </form>

    </div>
  );
}
