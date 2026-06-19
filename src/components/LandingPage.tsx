import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Zap, MapPin, Brain, ShieldAlert, ArrowRight, CheckCircle, Users, Activity, Play, X, Globe, Cpu, AlertCircle, Trophy, Sparkles } from "lucide-react";

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onSetRole: (role: "citizen" | "worker" | "admin") => void;
  cityHealth: number;
}

const POWERFUL_FEATURES = [
  { title: "AI Detection", desc: "Identify and categorize municipal issues instantly from uploaded images.", icon: Brain, color: "bg-blue-50 text-blue-600 border-blue-100", highlight: "border-blue-200" },
  { title: "Live Tracking", desc: "Monitor incident resolution status in real-time on our interactive GIS map.", icon: MapPin, color: "bg-emerald-50 text-emerald-600 border-emerald-100", highlight: "border-emerald-200" },
  { title: "Smart Assignment", desc: "Directly dispatch reports to nearest municipal repair crew autonomously.", icon: Users, color: "bg-purple-50 text-purple-600 border-purple-100", highlight: "border-purple-200" },
  { title: "Predictive AI", desc: "Temporal analytics predict water line bursts and road degradation.", icon: Sparkles, color: "bg-amber-50 text-amber-600 border-amber-100", highlight: "border-amber-200" },
  { title: "Multi-Language", desc: "Chat or submit recordings in Hindi, English, or locally spoken dialects.", icon: Globe, color: "bg-teal-50 text-teal-600 border-teal-100", highlight: "border-teal-200" },
  { title: "Rewards Panel", desc: "Accrue valuable municipal Green Points and unlock utility tax subsidies.", icon: Trophy, color: "bg-rose-50 text-rose-600 border-rose-100", highlight: "border-rose-200" }
];

export default function LandingPage({ onNavigate, onSetRole, cityHealth }: LandingPageProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-800">
      
      {/* Dynamic light grid background pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(#0EA5E9_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F1F5F9]/80 via-white/40 to-[#F8FAFC]" />
      </div>

      {/* TOP NAVIGATION HEADER (AirBnb Elegant Style) */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo brand */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate("landing")}>
            <div className="bg-gradient-to-tr from-sky-500 to-emerald-400 p-2 rounded-xl text-white shadow-md shadow-sky-400/20">
              {/* Skyline Icon */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 2c-.6 0-1 .4-1 1v1h-2V3c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v3H8V5c0-.6-.4-1-1-1H3c-.6 0-1 .4-1 1v16h20V3c0-.6-.4-1-1-1zM6 20H4v-2h2zm0-4H4v-2h2zm0-4H4v-2h2zm0-4H4V6h2zm6 12h-2v-2h2zm0-4h-2v-2h2zm0-4V8h-2V6h2zm6 12h-2v-2h2zm0-4h-2v-2h2zm0-4V8h-2V6h2z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display">
              City<span className="text-sky-555 text-sky-600 bg-clip-text">GPT</span>
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#landing-features" className="hover:text-sky-600 transition-colors">Features</a>
            <a href="#landing-how-works" className="hover:text-sky-600 transition-colors">How It Works</a>
            <button onClick={() => { onSetRole("citizen"); onNavigate("live_map"); }} className="hover:text-sky-600 transition-colors pointer-events-auto">Live Map</button>
            <a href="#landing-faq" className="hover:text-sky-600 transition-colors">About Us</a>
          </nav>

          {/* Action Login */}
          <div className="flex items-center gap-3">
            <button 
              id="landing-header-login"
              onClick={() => onNavigate("login")}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-550 text-white rounded-full text-xs font-bold transition-all shadow-md hover:shadow-sky-500/20 cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Block */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-bold tracking-wide uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-spin-slow" />
              AI Powered Smart City Assistant
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <h1 className="text-5xl sm:text-7xl font-extrabold font-display tracking-tight text-slate-900 leading-none">
                Building <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 font-black">
                  Smarter Cities
                </span> <br />
                with AI
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-slate-600 text-base md:text-lg font-normal leading-relaxed max-w-lg"
            >
              Report issues, track progress, and help your city become cleaner, safer and better with the power of AI. Connecting municipal teams, sensors, and citizens seamlessly.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap gap-4 pt-2 w-full sm:w-auto"
            >
              <button 
                id="hero-report-btn"
                onClick={() => onNavigate("login")}
                className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-sky-600 hover:bg-sky-500 text-white rounded-full font-extrabold text-sm shadow-xl shadow-sky-600/15 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Report an Issue
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                id="hero-watch-demo-btn"
                onClick={() => setDemoOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 hover:text-slate-900 rounded-full font-bold text-sm shadow-sm transition-all duration-300 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-700 text-slate-700" />
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Right Column: Airbnb style vector city visual */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Soft decorative glow circles */}
            <div className="absolute w-[450px] h-[450px] bg-sky-100 rounded-full blur-[100px] opacity-60 -z-10" />
            <div className="absolute w-[300px] h-[300px] bg-emerald-100 rounded-full blur-[80px] opacity-40 -z-10" />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="relative w-full max-w-lg aspect-[5/4] bg-white rounded-[2.5rem] p-1.5 border border-slate-100 shadow-2xl overflow-hidden"
            >
              {/* Inner container simulating modern smart landscape */}
              <div className="relative w-full h-full bg-gradient-to-b from-[#EFF8FF] to-[#F0FDF4] rounded-[2.2rem] overflow-hidden">
                
                {/* SVG vector skyline art layout */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid overlay */}
                  <defs>
                    <pattern id="city-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(14, 165, 233, 0.05)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="500" height="400" fill="url(#city-grid)" />

                  {/* Sun / Tech hub backdrop glow */}
                  <circle cx="250" cy="180" r="120" fill="url(#techSun)" opacity="0.85" />
                  <defs>
                    <radialGradient id="techSun" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#E0F2FE" />
                      <stop offset="100%" stopColor="#EFF8FF" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Delicate outline mountains / back clouds */}
                  <path d="M-50,280 Q70,220 200,280 T450,280" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="4 4" />

                  {/* Tower building shapes (Smart City Tech style in pastel shades) */}
                  {/* Tower 1 */}
                  <rect x="70" y="100" width="45" height="180" rx="4" fill="#60A5FA" opacity="0.35" />
                  <rect x="70" y="100" width="45" height="180" rx="4" stroke="#2563EB" strokeWidth="1.5" strokeOpacity="0.15" fill="none" />
                  {/* Grid of building windows */}
                  <line x1="80" y1="120" x2="105" y2="120" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
                  <line x1="80" y1="140" x2="105" y2="140" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
                  <line x1="80" y1="160" x2="105" y2="160" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
                  <line x1="80" y1="180" x2="105" y2="180" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
                  <line x1="80" y1="200" x2="105" y2="200" stroke="white" strokeWidth="2" strokeDasharray="2 2" />

                  {/* Tower 2 (Center sleek skyscrapers) */}
                  <rect x="140" y="60" width="60" height="220" rx="6" fill="#38BDF8" opacity="0.25" />
                  <rect x="140" y="60" width="60" height="220" rx="6" stroke="#0284C7" strokeWidth="1.5" strokeOpacity="0.15" fill="none" />
                  <line x1="155" y1="80" x2="185" y2="80" stroke="white" strokeWidth="2.5" />
                  <line x1="155" y1="100" x2="185" y2="100" stroke="white" strokeWidth="2" strokeDasharray="4 2" />
                  <line x1="155" y1="120" x2="185" y2="120" stroke="white" strokeWidth="2" strokeDasharray="4 2" />
                  <line x1="155" y1="140" x2="185" y2="140" stroke="white" strokeWidth="2" strokeDasharray="4 2" />
                  <line x1="155" y1="160" x2="185" y2="160" stroke="white" strokeWidth="2" strokeDasharray="4 2" />
                  <line x1="155" y1="180" x2="185" y2="180" stroke="white" strokeWidth="2" strokeDasharray="4 2" />
                  <line x1="155" y1="200" x2="185" y2="200" stroke="white" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Tower 3 (Prism skyscraper) */}
                  <path d="M260,80 L310,40 L310,280 L260,280 Z" fill="#93C5FD" opacity="0.3" />
                  <path d="M310,40 L360,80 L360,280 L310,280 Z" fill="#2563EB" opacity="0.15" />
                  <path d="M310,40 L310,280" stroke="#1D4ED8" strokeWidth="1.5" strokeOpacity="0.15" />

                  {/* Tower 4 */}
                  <rect x="380" y="110" width="50" height="170" rx="4" fill="#34D399" opacity="0.2" />
                  <rect x="380" y="110" width="50" height="170" rx="4" stroke="#059669" strokeWidth="1.5" strokeOpacity="0.15" fill="none" />
                  <line x1="392" y1="130" x2="418" y2="130" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
                  <line x1="392" y1="150" x2="418" y2="150" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
                  <line x1="392" y1="170" x2="418" y2="170" stroke="white" strokeWidth="2" strokeDasharray="2 2" />
                  <line x1="392" y1="190" x2="418" y2="190" stroke="white" strokeWidth="2" strokeDasharray="2 2" />

                  {/* Floating Eco Green Canopy Base Hillside */}
                  <path d="M-20,380 C120,350 220,320 520,380 L520,420 L-20,420 Z" fill="#10B981" opacity="0.8" />
                  <path d="M10,380 C150,330 350,310 520,360" stroke="#059669" strokeWidth="3" fill="none" />
                  <path d="M-20,400 C150,380 320,385 520,410 L520,430 L-20,430 Z" fill="#047857" />

                  {/* Dynamic Highspeed Train line / float monorail curving */}
                  <motion.path 
                    d="M 500 280 Q 250 270, 0 310" 
                    fill="none" 
                    stroke="url(#trainLineGradient)" 
                    strokeWidth="10" 
                    strokeLinecap="round"
                  />
                  <motion.path 
                    d="M 500 280 Q 250 270, 0 310" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeDasharray="8 8"
                  />
                  <defs>
                    <linearGradient id="trainLineGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0EA5E9" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>

                  {/* Bullet train model cruising */}
                  <g>
                    <rect x="210" y="260" width="70" height="12" rx="6" fill="#1E3A8A" />
                    <rect x="230" y="262" width="20" height="5" rx="1.5" fill="#38BDF8" />
                    <polygon points="210,266 220,260 220,272" fill="#38BDF8" />
                    <circle cx="215" cy="272" r="2.5" fill="white" />
                  </g>

                  {/* Soft Vector Clouds */}
                  <ellipse cx="60" cy="80" rx="30" ry="12" fill="white" opacity="0.9" />
                  <ellipse cx="440" cy="120" rx="25" ry="10" fill="white" opacity="0.8" />
                </svg>

                {/* Floating telemetry alerts inside vector scene */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur shadow-lg border border-slate-150 rounded-2xl p-3 flex items-center gap-3 animate-bounce">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-800">Issue Resolved</p>
                    <p className="text-[9px] text-[#10B981] font-mono font-bold uppercase">Sector-4 Cleaned</p>
                  </div>
                </div>

                <div className="absolute top-28 right-6 bg-white/95 backdrop-blur shadow-lg border border-slate-150 rounded-2xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 animate-pulse">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-800">New Report</p>
                    <p className="text-[9px] text-sky-500 font-mono font-bold uppercase">Water Leakage Det</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* STRIP: LIVE STATISTICS CHRONOLOGY */}
      <div className="bg-white border-y border-slate-100 py-10 relative z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="flex flex-col items-center gap-1.5 border-r border-slate-100 last:border-0">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/40">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="block text-3xl font-extrabold text-slate-900 font-display">2,450+</span>
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Issues Solved</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 md:border-r border-slate-100 last:border-0">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100/40">
                <Activity className="w-5 h-5" />
              </div>
              <span className="block text-3xl font-extrabold text-[#10B981] font-display">95%</span>
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Citizen Satisfaction</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 border-r border-slate-100 last:border-0">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100/40">
                <Users className="w-5 h-5" />
              </div>
              <span className="block text-3xl font-extrabold text-slate-900 font-display">18</span>
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Active Teams</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 last:border-0">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100/40">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="block text-3xl font-extrabold text-slate-900 font-display">30 min</span>
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Average Response</span>
            </div>

          </div>
        </div>
      </div>

      {/* HOW CALM-FLOW WORKS SECTION */}
      <section id="landing-how-works" className="max-w-7xl mx-auto px-6 py-20 relative z-10 scroll-mt-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-sky-600 font-bold mb-2">INTELLIGENT PIPELINE</h2>
          <p className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">How CityGPT Works</p>
          <p className="text-sm text-slate-500 mt-2">The streamlined, closed-loop municipal operations pipeline from photo log to crew completion.</p>
        </div>

        {/* Horizontal Flow layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all relative flex flex-col items-center text-center gap-4 group">
            {/* Number badge */}
            <div className="absolute top-4 left-4 w-6 h-6 bg-slate-100 rounded-full text-[11px] font-bold text-slate-500 flex items-center justify-center">
              1
            </div>
            <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center border border-sky-100 group-hover:scale-105 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Snap Photo</h3>
              <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                Take a photo or record audio describing the localized outage.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all relative flex flex-col items-center text-center gap-4 group">
            <div className="absolute top-4 left-4 w-6 h-6 bg-slate-100 rounded-full text-[11px] font-bold text-slate-500 flex items-center justify-center">
              2
            </div>
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">AI Detects</h3>
              <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                Computer vision classifies the hazard category and priority instantly.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all relative flex flex-col items-center text-center gap-4 group">
            <div className="absolute top-4 left-4 w-6 h-6 bg-slate-100 rounded-full text-[11px] font-bold text-slate-500 flex items-center justify-center">
              3
            </div>
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center border border-purple-100 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Team Assigned</h3>
              <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                Repairs are autonomously dispatched to the nearest specialized field worker.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all relative flex flex-col items-center text-center gap-4 group">
            <div className="absolute top-4 left-4 w-6 h-6 bg-slate-100 rounded-full text-[11px] font-bold text-slate-500 flex items-center justify-center">
              4
            </div>
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Issue Resolved</h3>
              <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                Close verification photos updated, boosting your community score.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* POWERFUL FEATURES SECTION */}
      <section id="landing-features" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-100 scroll-mt-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-bold mb-2">POWERFUL FEATURES</h2>
          <p className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">Everything you need for a smarter city</p>
          <p className="text-sm text-slate-500 mt-2">Comprehensive frameworks streamlining civic diagnostics, telemetry tracking, and reward points.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POWERFUL_FEATURES.map((feat, i) => {
            const IconComp = feat.icon;
            return (
              <motion.div 
                key={i}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-white p-6 rounded-3xl border border-slate-150 flex flex-col items-start gap-4 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className={`p-3 rounded-2xl border ${feat.color}`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 font-light leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* WATCH LIVE DEMO CONSOLE MODAL */}
      <AnimatePresence>
        {demoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white max-w-lg w-full rounded-[2rem] p-6 relative shadow-2xl overflow-hidden border border-slate-200"
            >
              <button 
                onClick={() => setDemoOpen(false)}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center py-5">
                <div className="inline-flex p-3 bg-sky-50 text-sky-600 rounded-2xl mb-4 border border-sky-100">
                  <Cpu className="w-8 h-8 animate-pulse" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-display">
                  CityGPT Smart Demo Console
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2">
                  Triggers computer vision scanning pipelines on reported incident datasets inside CityGPT boundaries.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl font-mono text-[11px] text-[#10B981] space-y-2.5 leading-relaxed shadow-inner">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold border-b border-neutral-900 pb-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  INITIATING MUNICIPAL COMPLIANCE PIPELINE...
                </div>
                <p>&gt; Loaded visual classification node #G-4509</p>
                <p>&gt; Scanning garbage heap pixel grid (Ward-3 School Rd)...</p>
                <p className="text-blue-400">&gt; AI CONFIDENCE: 99.1% [SOLID WASTE DETECTED]</p>
                <p className="text-amber-400">&gt; PRIORITY LEVEL ASSIGNED: HIGH [SAFETY METRIC ALERT]</p>
                <p className="text-purple-400">&gt; WORKER DISPATCH VECTOR CALC: S-3 Crew assigned.</p>
                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-[10px] mt-2">
                  CityGPT automatically triggers instant detection pipelines upon submission, removing all bureaucratic complexity.
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 font-semibold text-xs">
                <button 
                  onClick={() => setDemoOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer"
                >
                  Close Console
                </button>
                <button 
                  onClick={() => { setDemoOpen(false); onNavigate("login"); }}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-550 text-white rounded-full transition-colors shadow-md shadow-sky-500/20 cursor-pointer"
                >
                  Report Issue Now
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ COGNITIVE EXPANSION SCREEN */}
      <section id="landing-faq" className="max-w-4xl mx-auto px-6 py-20 relative z-10 border-t border-slate-150 scroll-mt-10">
        <div className="text-center mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-bold mb-2">QUESTIONS & ANSWERS</h2>
          <p className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">Frequently Asked Questions</p>
        </div>

        <div className="space-y-4">
          {[
            { q: "What is CityGPT?", a: "CityGPT is a smart light-themed civic administration coordination system allowing citizens to snap high-contrast incident files, automatically detect priority categories via AI, trace worker dispatch schedules, and earn municipal points to claim subsidies." },
            { q: "How is the priority of my complaint decided?", a: "AI vision nodes analyze the size, type, and physical location proximity (e.g. near schools or waterways) to assign severity categories—Critical, Medium, or Low—notifying workers dynamically." },
            { q: "Can I earn points for reporting?", a: "Yes. Reporting and verifying resolutions provides Green Points. Points are integrated into leaderboards and citizen badge awards, yielding key utility deductions on water/power municipal grids." },
            { q: "How does the Worker dashboard coordinate dispatches?", a: "Workers view assigned tasks, download optimal GPS navigation vectors, snap 'Before' photos, report resolutions, and snap 'After' verification photos to successfully close complaints." }
          ].map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all shadow-sm"
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-5 flex items-center justify-between font-bold text-sm text-slate-800 hover:text-slate-900 transition-colors cursor-pointer focus:outline-none"
              >
                <span>{faq.q}</span>
                <span className="text-sky-500 text-lg font-extrabold">{faqOpen === index ? "−" : "+"}</span>
              </button>
              <AnimatePresence>
                {faqOpen === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-100 px-5 pb-5 text-xs text-slate-500 leading-relaxed font-light pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER SECTION: AIRBNB SOPHISTICATED SUB-MARGINS */}
      <footer className="bg-white border-t border-slate-200/80 py-16 relative z-10 text-slate-500 text-xs font-light">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="flex flex-col gap-4">
            <span className="text-lg font-extrabold tracking-tight text-slate-900 font-display">
              City<span className="text-sky-600">GPT</span>
            </span>
            <p className="leading-relaxed">
              Primacy platform for real-time civic grid monitoring, bridging the gap between inhabitants and municipalities via smart computer vision.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-4 font-mono uppercase tracking-wider text-[11px]">Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-sky-600 transition-colors">
                  GitHub Directory ↗
                </a>
              </li>
              <li>Privacy Guidelines</li>
              <li>Terms of Service</li>
              <li>Help Center</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-4 font-mono uppercase tracking-wider text-[11px]">Contact Support</h4>
            <ul className="space-y-2.5">
              <li>📍 Ward 3, Municipal Headquarters</li>
              <li>✉️ administrative.inbox@citygpt.gov</li>
              <li>📞 1-800-CITY-GPT</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-4 font-mono uppercase tracking-wider text-[11px]">Smart Access</h4>
            <div className="flex flex-col gap-2.5 items-start">
              <button 
                onClick={() => onNavigate("login")}
                className="hover:text-sky-600 transition-colors font-bold text-left cursor-pointer"
              >
                Sign In to Dashboard →
              </button>
              <button 
                onClick={() => { onSetRole("admin"); onNavigate("dashboard"); }}
                className="text-slate-400 hover:text-purple-600 transition-colors text-left font-mono text-[10px]"
              >
                Admin Direct Bypass
              </button>
              <button 
                onClick={() => { onSetRole("worker"); onNavigate("dashboard"); }}
                className="text-slate-400 hover:text-amber-600 transition-colors text-left font-mono text-[10px]"
              >
                Worker Direct Bypass
              </button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
