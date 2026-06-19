import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, Zap, MapPin, Brain, ShieldAlert, ArrowRight, CheckCircle, 
  Users, Activity, Play, X, Globe, Cpu, AlertCircle, Trophy, Sparkles,
  Filter, Search, ChevronDown, Award, Star, Compass, AlertTriangle, 
  Send, Check, Heart, ShieldCheck, Mail, Phone, Flame, Radio, Building2
} from "lucide-react";

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onSetRole: (role: "citizen" | "worker" | "admin") => void;
  cityHealth: number;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

// Sample dataset for our interactive inline Google-Maps-style widget
interface MapSample {
  id: string;
  title: string;
  category: string;
  priority: "Critical" | "High" | "Medium" | "Resolved";
  assignedTeam: string;
  eta: string;
  status: string;
  lat: number; 
  lng: number;
  locationDescription: string;
  imageUrl: string;
  votes: number;
}

const MAP_SAMPLES: MapSample[] = [
  {
    id: "REP-4091",
    title: "Commercial Water Pipe Fracture & Flooding",
    category: "water",
    priority: "Critical",
    assignedTeam: "Hydraulics Unit Sector 4",
    eta: "15 Mins",
    status: "working",
    lat: 40,
    lng: 35,
    locationDescription: "Avenue 7 Corridor, near Metro Station",
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&q=80&w=400",
    votes: 48
  },
  {
    id: "REP-8021",
    title: "Sidewalk Garbage Accumulation & Litter Overflow",
    category: "garbage",
    priority: "High",
    assignedTeam: "Zone 3 Sanitation Depot",
    eta: "30 Mins",
    status: "reported",
    lat: 55,
    lng: 60,
    locationDescription: "Ward 3 School District Main Alley",
    imageUrl: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400",
    votes: 31
  },
  {
    id: "REP-1025",
    title: "Streetlight Circuit Burnout",
    category: "lights",
    priority: "Medium",
    assignedTeam: "Electrical Grid Response Team 1",
    eta: "2 Hours",
    status: "reported",
    lat: 25,
    lng: 70,
    locationDescription: "Residential Lane 4, Ward 1",
    imageUrl: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&q=80&w=400",
    votes: 14
  },
  {
    id: "REP-5561",
    title: "Pothole Fracture Re-paving Scheme Completed",
    category: "roads",
    priority: "Resolved",
    assignedTeam: "Asphalt Division Ward 5",
    eta: "Completed",
    status: "resolved",
    lat: 70,
    lng: 25,
    locationDescription: "West Flyover Descent Ramp",
    imageUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=400",
    votes: 82
  }
];

export default function LandingPage({ 
  onNavigate, 
  onSetRole, 
  cityHealth,
  isDarkMode = false,
  onToggleTheme
}: LandingPageProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [activeFaqTab, setActiveFaqTab] = useState<string>("all");
  
  // Interactive Live Map Section State
  const [selectedMapItem, setSelectedMapItem] = useState<MapSample>(MAP_SAMPLES[0]);
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [votedMapItems, setVotedMapItems] = useState<Record<string, boolean>>({});

  // Next-Gen Interactive 3D Parallax & Scroll States
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const rx = (e.clientX / innerWidth) - 0.5;
      const ry = (e.clientY / innerHeight) - 0.5;
      setMousePos({ x: rx, y: ry });
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight || 600;
      setScrollProgress(Math.min(scrolled / maxScroll, 1));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // City Health interactive stats breakdown
  const HEALTH_BREAKDOWN = [
    { name: "Waste Management", score: 84, color: "bg-amber-500", raw: "8.4 / 10 tons", text: "Optimal route dispatches" },
    { name: "Hydraulic Network & Water", score: 96, color: "bg-blue-600", raw: "12 leaks solved", text: "Canal locks fully monitored" },
    { name: "Pavement Highways", score: 91, color: "bg-emerald-500", raw: "91% structural strength", text: "Asphalt wear indexes logged" },
    { name: "Electrical Streetlights", score: 88, color: "bg-purple-600", raw: "450 light nodes repaired", text: "Darkness lanes resolved" }
  ];

  // Community Leaderboard Mock Dataset
  const LEADERBOARD = [
    { rank: 1, name: "Arpita Maatta", points: 850, badge: "🌱 Eco Guardian", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" },
    { rank: 2, name: "Kabir Dev", points: 720, badge: "🏆 City Hero", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" },
    { rank: 3, name: "Priya Sharma", points: 640, badge: "💡 Grid Inspector", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" },
    { rank: 4, name: "Amit Verma", points: 590, badge: "🤝 Active Neighbor", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120" }
  ];

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const handleVoteMapItem = (id: string) => {
    if (votedMapItems[id]) return;
    setVotedMapItems(prev => ({ ...prev, [id]: true }));
    setSelectedMapItem(curr => curr.id === id ? { ...curr, votes: curr.votes + 1 } : curr);
    // Also update structural sample references smoothly
    const idx = MAP_SAMPLES.findIndex(m => m.id === id);
    if (idx !== -1) MAP_SAMPLES[idx].votes += 1;
  };

  const filteredMapItems = MAP_SAMPLES.filter(item => {
    const matchesPriority = priorityFilter === "All" || item.priority === priorityFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  return (
    <div className={`relative min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-[#F8FAFC] text-slate-800"} overflow-x-hidden font-sans selection:bg-indigo-500/10 selection:text-indigo-900`}>
      
      {/* Dynamic light mesh grid background pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft elegant light mesh gradients */}
        <div className={`absolute top-[-10%] left-[-20%] w-[90%] h-[70%] rounded-full blur-[140px] transition-colors duration-350 ${isDarkMode ? "bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-transparent" : "bg-gradient-to-br from-indigo-100/50 via-purple-50/30 to-transparent"}`} />
        <div className={`absolute top-[20%] right-[-25%] w-[80%] h-[80%] rounded-full blur-[150px] transition-colors duration-350 ${isDarkMode ? "bg-gradient-to-bl from-blue-950/50 via-violet-900/10 to-transparent" : "bg-gradient-to-bl from-blue-100/40 via-violet-50/20 to-transparent"}`} />
        <div className={`absolute bottom-[10%] left-[-15%] w-[70%] h-[70%] rounded-full blur-[120px] transition-colors duration-350 ${isDarkMode ? "bg-gradient-to-tr from-cyan-950/30 via-slate-950/20 to-transparent" : "bg-gradient-to-tr from-cyan-50/30 via-slate-100/20 to-transparent"}`} />

        {/* Crisp grid lines mimicking elegant modern architecture */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.04)_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-85" />
      </div>

      {/* TOP FLOATING NAVBAR */}
      <header className="sticky top-4 z-50 mx-auto max-w-7xl px-4 sm:px-6">
        <nav className={`backdrop-blur-2xl border rounded-full px-6 py-3.5 flex items-center justify-between transition-all duration-300 ${
          isDarkMode 
            ? "bg-slate-900/85 border-slate-800/80 shadow-2xl shadow-slate-950/40" 
            : "bg-white/80 border-slate-200/80 shadow-xl shadow-slate-200/40"
        } relative`}>
          
          {/* Logo brand */}
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => onNavigate("landing")}>
            <div className="bg-gradient-to-tr from-indigo-600 to-purple-500 p-2.5 rounded-full text-white shadow-lg shadow-indigo-650/20 group-hover:scale-105 transition-all">
              <Compass className="w-5 h-5 animate-spin-slow text-indigo-100" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 font-display">
              City<span className="text-indigo-600">GPT</span>
            </span>
          </div>

          {/* Menu Items */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-600">
            <a href="#landing-features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</a>
            <button 
              onClick={() => { onSetRole("citizen"); onNavigate("live_map"); }} 
              className="hover:text-indigo-600 transition-colors uppercase tracking-wider font-bold cursor-pointer"
            >
              Live Map
            </button>
            <button 
              onClick={() => { onSetRole("citizen"); onNavigate("ai_assistant"); }} 
              className="hover:text-indigo-600 transition-colors uppercase tracking-wider font-bold cursor-pointer"
            >
              AI Assistant
            </button>
            <a href="#city-health" className="hover:text-indigo-600 transition-colors">Health Metric</a>
            <a href="#rewards-leaderboard" className="hover:text-indigo-600 transition-colors">Rewards</a>
          </nav>

          {/* Buttons */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => { onSetRole("citizen"); onNavigate("login"); }}
              className="px-4 py-2 hover:bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-700 transition-all cursor-pointer"
            >
              Login
            </button>
            <button 
              onClick={() => { onSetRole("citizen"); onNavigate("login"); }}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 hover:scale-103 cursor-pointer"
            >
              Get Started
            </button>
          </div>

        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 md:pt-24 md:pb-32 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE HERO CONTENT */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 text-left">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              ✨ AI Powered Smart City Platform
            </motion.div>

             <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-slate-900 leading-tight"
            >
              Build Smarter Cities <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-pink-600 pb-1">
                with AI.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-indigo-650 text-sm sm:text-lg leading-relaxed font-black uppercase tracking-widest"
            >
              Predict. Solve. Transform.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light max-w-lg"
            >
              Transforming cities from reactive governance to predictive governance. High-contrast computer vision, autonomous worker routing, and civic reward point ecosystems built on secure smart nodes.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={() => { onSetRole("citizen"); onNavigate("login"); }}
                className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                🚀 Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-indigo-200" />
              </button>

              <button 
                onClick={() => setDemoOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-750 hover:text-slate-900 rounded-full font-bold text-sm shadow-sm transition-all duration-300 cursor-pointer hover:bg-slate-50"
              >
                <Play className="w-3.5 h-3.5 fill-slate-500 text-slate-500" />
                Watch Demo
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3.5"
            >
              <div className="flex -space-x-2.5">
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80" alt="Citizen 1" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80" alt="Citizen 2" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80" alt="Citizen 3" />
                <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-indigo-600">+4k</div>
              </div>
              <p className="text-xs text-slate-500 font-bold tracking-wide">
                Trusted by 5+ cities and over 12,000 citizens.
              </p>
            </motion.div>
          </div>

            {/* RIGHT SIDE NEXT-GEN INTERACTIVE 3D SUSPENDED CITY ISLAND */}
          <div className="lg:col-span-6 relative flex justify-center items-center min-h-[560px] w-full">
            
            {/* Nex-Gen Hero Visual Accents (Mesh Gradients, Aurora Glow, Grid, Bubbles, Particles) */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-purple-100/30 via-indigo-50/20 to-blue-100/30 blur-[130px] rounded-full -z-10" />
            <div className="absolute w-[450px] h-[450px] bg-gradient-to-br from-cyan-400/10 via-indigo-500/10 to-transparent rounded-full blur-[100px] -top-12 -right-12 -z-10 animate-pulse" />
            <div className="absolute w-[350px] h-[350px] bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-[80px] -bottom-16 -left-16 -z-10" />
            
            {/* Subtle Cyber Grid Layer behind the island */}
            <div className="absolute inset-0 cyber-grid opacity-30 -z-10 pointer-events-none" />

            {/* Simulated Floating Glass Bubbles & Noise Texture in Hero Atmosphere */}
            <div className="absolute top-10 left-12 w-3.5 h-3.5 rounded-full bg-white/40 border border-white/60 shadow-inner blur-[0.5px] animate-float-slow -z-10" />
            <div className="absolute bottom-20 left-4 w-5 h-5 rounded-full bg-white/30 border border-white/50 shadow-inner blur-[1px] animate-float-medium -z-10" />
            <div className="absolute top-24 right-10 w-2.5 h-2.5 rounded-full bg-indigo-200/40 border border-white/60 shadow-inner blur-[0.5px] animate-float-fast -z-10" />
            <div className="absolute bottom-12 right-24 w-4 h-4 rounded-full bg-purple-200/35 border border-white/50 shadow-inner blur-[1px] animate-float-slow -z-10" />

            {/* Ultra-Precise Cursor Parallax Container */}
            <div 
              style={{
                transform: `perspective(1000px) rotateX(${-mousePos.y * 14}deg) rotateY(${mousePos.x * 14}deg) scale(${1 + scrollProgress * 0.04})`,
                transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)"
              }}
              className={`relative w-full max-w-xl aspect-[11/10] backdrop-blur-xl rounded-[2.5rem] p-2 border shadow-2xl overflow-visible group flex items-center justify-center transition-all duration-300 ${
                isDarkMode 
                  ? "bg-slate-900/40 border-slate-800/80 shadow-slate-950/50" 
                  : "bg-white/40 border-white/50 shadow-slate-200/50"
              }`}
            >
              <div className={`relative w-full h-full rounded-[2.3rem] overflow-hidden p-2 flex items-center justify-center border transition-all duration-300 ${
                isDarkMode 
                  ? "bg-gradient-to-b from-slate-955/95 via-slate-900/60 to-slate-955/95 border-slate-800/80" 
                  : "bg-gradient-to-b from-white/90 via-slate-50/50 to-white/95 border-slate-100"
              }`}>
                
                {/* SVG 3D Isometric suspended Island, Buildings & Infrastructure Canvas */}
                <svg className="absolute inset-0 w-full h-full overflow-hidden" viewBox="0 0 600 550" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Neon Glow & Drop Shadows Definitions */}
                  <defs>
                    <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#818CF8" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="grass-grad" x1="120" y1="330" x2="300" y2="430" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ECFDF5" />
                      <stop offset="50%" stopColor="#D1FAE5" />
                      <stop offset="100%" stopColor="#A7F3D0" />
                    </linearGradient>
                    <linearGradient id="rock-left" x1="120" y1="330" x2="300" y2="490" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#475569" />
                      <stop offset="100%" stopColor="#1E293B" />
                    </linearGradient>
                    <linearGradient id="rock-right" x1="300" y1="430" x2="480" y2="490" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                    <linearGradient id="river-glow" x1="280" y1="241" x2="270" y2="413" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity="0.95" />
                    </linearGradient>
                    
                    {/* Glass Tower Shader Gradients (Semi-Transparent Multi-tone) */}
                    <linearGradient id="yellow-glass-left" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(254, 240, 138, 0.75)" />
                      <stop offset="100%" stopColor="rgba(234, 179, 8, 0.35)" />
                    </linearGradient>
                    <linearGradient id="yellow-glass-right" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255, 253, 222, 0.85)" />
                      <stop offset="100%" stopColor="rgba(250, 204, 21, 0.45)" />
                    </linearGradient>

                    <linearGradient id="purple-glass-left" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(233, 213, 255, 0.75)" />
                      <stop offset="100%" stopColor="rgba(168, 85, 247, 0.4)" />
                    </linearGradient>
                    <linearGradient id="purple-glass-right" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(245, 243, 255, 0.85)" />
                      <stop offset="100%" stopColor="rgba(192, 132, 252, 0.5)" />
                    </linearGradient>

                    <linearGradient id="orange-glass-left" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255, 237, 213, 0.75)" />
                      <stop offset="100%" stopColor="rgba(249, 115, 22, 0.4)" />
                    </linearGradient>
                    <linearGradient id="orange-glass-right" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255, 247, 237, 0.85)" />
                      <stop offset="100%" stopColor="rgba(251, 146, 60, 0.5)" />
                    </linearGradient>

                    <linearGradient id="rose-glass-left" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255, 228, 230, 0.75)" />
                      <stop offset="100%" stopColor="rgba(244, 63, 94, 0.4)" />
                    </linearGradient>
                    <linearGradient id="rose-glass-right" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255, 241, 242, 0.85)" />
                      <stop offset="100%" stopColor="rgba(251, 113, 133, 0.5)" />
                    </linearGradient>

                    <linearGradient id="emerald-glass-left" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(209, 250, 229, 0.75)" />
                      <stop offset="100%" stopColor="rgba(16, 185, 129, 0.4)" />
                    </linearGradient>
                    <linearGradient id="emerald-glass-right" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(240, 253, 244, 0.85)" />
                      <stop offset="100%" stopColor="rgba(52, 211, 153, 0.5)" />
                    </linearGradient>

                    <linearGradient id="teal-glass-left" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(204, 251, 241, 0.75)" />
                      <stop offset="100%" stopColor="rgba(20, 184, 166, 0.4)" />
                    </linearGradient>
                    <linearGradient id="teal-glass-right" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(240, 253, 250, 0.85)" />
                      <stop offset="100%" stopColor="rgba(45, 212, 191, 0.5)" />
                    </linearGradient>

                    <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.25" />
                    </filter>
                  </defs>

                  {/* Sun Rise Ambient Background Glow */}
                  <circle cx="300" cy="270" r="220" fill="url(#sun-glow)" opacity="0.9" />

                  {/* 1. SUSPENDED ISOMETRIC PLATFORM ISLAND BASE */}
                  <g filter="url(#soft-shadow)">
                    {/* Dark under-rocks thickness first to create the high-altitude floating illusion */}
                    {/* Geological Left face */}
                    <path d="M 120 330 L 300 430 L 300 485 L 120 385 Z" fill="url(#rock-left)" />
                    {/* Geological Right face */}
                    <path d="M 300 430 L 480 330 L 480 385 L 300 485 Z" fill="url(#rock-right)" />
                    {/* Shard protrusion 1 */}
                    <path d="M 180 363 L 230 460 L 230 480 L 180 380 Z" fill="#334155" opacity="0.85" />
                    {/* Shard protrusion 2 */}
                    <path d="M 400 373 L 340 470 L 340 485 L 400 385 Z" fill="#1E293B" opacity="0.9" />

                    {/* Top Grassland Surface */}
                    <path d="M 300 230 L 120 330 L 300 430 L 480 330 Z" fill="url(#grass-grad)" stroke="#FFFFFF" strokeWidth="2" />
                  </g>

                  {/* 2. THE FLOWING CONICAL GLOWING RIVER (With Reflections) */}
                  <path d="M 285 242 L 270 413 C 275 420, 290 425, 305 422 L 315 242 Z" fill="url(#river-glow)" opacity="0.95" />
                  {/* Moving River highlights */}
                  <path d="M 288 245 L 274 410" stroke="#E0F7FA" strokeWidth="1.5" strokeDasharray="10 25" opacity="0.7" />
                  <path d="M 310 250 L 298 420" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="15 30" opacity="0.8" />

                  {/* 3. ROADS WITH FLOWING TESLA FSD LIGHT TRAILS */}
                  {/* Base Road Track (Dark Slate) */}
                  <path d="M 134 322 C 220 280, 260 360, 466 322" stroke="#1E293B" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.9" />
                  <path d="M 150 250 C 190 320, 390 320, 430 250" stroke="#334155" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.85" />
                  
                  {/* Flowing animated blue neon guide markings */}
                  <path className="animate-road-glow" d="M 134 322 C 220 280, 260 360, 466 322" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="12 40" fill="none" filter="url(#neon-glow)" />
                  <path className="animate-road-glow" style={{ animationDirection: "reverse" }} d="M 150 250 C 190 320, 390 320, 430 250" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="10 30" fill="none" filter="url(#neon-glow)" />

                  {/* Tiny moving cars along the lanes */}
                  {/* Red Car */}
                  <g className="animate-road-glow" style={{ animationDuration: "5s" }}>
                    <rect x="0" y="0" width="10" height="5" rx="1.5" fill="#EF4444" transform="translate(180, 305) rotate(-15)" />
                    <circle cx="182" cy="308" r="1" fill="#E2E8F0" />
                  </g>
                  {/* Cyan Tech Vehicle */}
                  <g className="animate-road-glow" style={{ animationDuration: "4s", animationDirection: "reverse" }}>
                    <rect x="0" y="0" width="11" height="5.5" rx="1.5" fill="#06B6D4" transform="translate(350, 290) rotate(10)" />
                    <circle cx="359" cy="293" r="1.2" fill="#FFFFFF" />
                  </g>

                  {/* 4. DRAGGABLE/RISING HIGH-FIDELITY GLASS SKYSCRAPERS */}
                  {/* Scroll trigger vertical compression applied dynamically below */}

                  {/* TOWER 1: AI Assistant Core (Yellow Glass Tower - Center back) */}
                  <g transform="translate(275, 120)" style={{ transform: `translate(275px, ${120 + scrollProgress * 15}px) scaleY(${1.1 - scrollProgress * 0.1})`, transformOrigin: "bottom center" }}>
                    <polygon points="0,110 -25,95 -25,0 0,15" fill="url(#yellow-glass-left)" stroke="#EAB308" strokeWidth="1" strokeOpacity="0.5" />
                    <polygon points="0,110 25,95 25,0 0,15" fill="url(#yellow-glass-right)" stroke="#EAB308" strokeWidth="1" strokeOpacity="0.5" />
                    <polygon points="0,15 -25,0 0,-15 25,0" fill="rgba(255, 253, 222, 0.95)" stroke="#FDE047" strokeWidth="0.8" />
                    {/* Glowing Server Rack horizontal slices */}
                    <line x1="-15" y1="30" x2="15" y2="45" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
                    <line x1="-15" y1="50" x2="15" y2="65" stroke="#FDE047" strokeWidth="1" opacity="0.9" />
                    <line x1="-15" y1="70" x2="15" y2="85" stroke="#EAB308" strokeWidth="1.2" opacity="0.8" />
                    {/* Antenna */}
                    <line x1="0" y1="-15" x2="0" y2="-40" stroke="#EAB308" strokeWidth="1.5" />
                    <circle cx="0" cy="-40" r="3" fill="#EF4444" className="animate-pulse" />
                  </g>

                  {/* TOWER 2: Live Map Satellite Node (Purple Glass Tower - Mid Left) */}
                  <g transform="translate(195, 175)" style={{ transform: `translate(195px, ${175 + scrollProgress * 10}px) scaleY(${1.08 - scrollProgress * 0.08})`, transformOrigin: "bottom center" }}>
                    <polygon points="0,105 -22,90 -22,0 0,15" fill="url(#purple-glass-left)" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.5" />
                    <polygon points="0,105 22,90 22,0 0,15" fill="url(#purple-glass-right)" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.5" />
                    <polygon points="0,15 -22,0 0,-15 22,0" fill="rgba(243, 232, 255, 0.9)" stroke="#C084FC" strokeWidth="1" />
                    {/* Glowing circuit nodes */}
                    <circle cx="-10" cy="40" r="2" fill="#A78BFA" />
                    <circle cx="10" cy="55" r="2" fill="#D8B4FE" />
                    {/* Radar Dish */}
                    <path d="M -10 -5 L 10 -5 A 10 10 0 0 1 -10 -5 Z" fill="#8B5CF6" transform="translate(0, -10) rotate(-15)" />
                    <line x1="0" y1="-10" x2="10" y2="-22" stroke="#A78BFA" strokeWidth="1.5" />
                  </g>

                  {/* TOWER 3: Report Issue Dispatch Hub (Orange Glass Tower - Mid Right) */}
                  <g transform="translate(365, 185)" style={{ transform: `translate(365px, ${185 + scrollProgress * 20}px) scaleY(${1.15 - scrollProgress * 0.12})`, transformOrigin: "bottom center" }}>
                    <polygon points="0,110 -24,95 -24,0 0,15" fill="url(#orange-glass-left)" stroke="#F97316" strokeWidth="1" strokeOpacity="0.4" />
                    <polygon points="0,110 24,95 24,0 0,15" fill="url(#orange-glass-right)" stroke="#F97316" strokeWidth="1" strokeOpacity="0.4" />
                    <polygon points="0,15 -24,0 0,-15 24,0" fill="rgba(254, 243, 199, 0.95)" stroke="#FDBA74" strokeWidth="0.8" />
                    {/* Glass architectural diagonal stripes */}
                    <line x1="-18" y1="20" x2="18" y2="50" stroke="#FFEDD5" strokeWidth="1.5" opacity="0.65" />
                    <line x1="-18" y1="50" x2="18" y2="80" stroke="#FFD8A8" strokeWidth="1.5" opacity="0.65" />
                  </g>

                  {/* TOWER 4: Outages & Statistics Tracker (Rose Glass Tower - Front Left) */}
                  <g transform="translate(155, 230)" style={{ transform: `translate(155px, ${230 + scrollProgress * 5}px) scaleY(${1.05 - scrollProgress * 0.05})`, transformOrigin: "bottom center" }}>
                    <polygon points="0,95 -20,80 -20,0 0,15" fill="url(#rose-glass-left)" stroke="#F43F5E" strokeWidth="0.8" strokeOpacity="0.4" />
                    <polygon points="0,95 20,80 20,0 0,15" fill="url(#rose-glass-right)" stroke="#F43F5E" strokeWidth="0.8" strokeOpacity="0.4" />
                    <polygon points="0,15 -20,0 0,-15 20,0" fill="rgba(254, 241, 242, 0.95)" stroke="#FDA4AF" strokeWidth="0.8" />
                    {/* Step telemetry displays */}
                    <rect x="-12" y="30" width="6" height="15" fill="#FDA4AF" opacity="0.9" />
                    <rect x="6" y="45" width="6" height="25" fill="#F43F5E" opacity="0.9" />
                  </g>

                  {/* TOWER 5: Citizen Hub & Eco-Rewards Terminal (Emerald Glass Tower - Front Right) */}
                  <g transform="translate(425, 220)" style={{ transform: `translate(425px, ${220 + scrollProgress * 12}px) scaleY(${1.1 - scrollProgress * 0.1})`, transformOrigin: "bottom center" }}>
                    <polygon points="0,100 -21,85 -21,0 0,15" fill="url(#emerald-glass-left)" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.4" />
                    <polygon points="0,100 21,85 21,0 0,15" fill="url(#emerald-glass-right)" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.4" />
                    <polygon points="0,15 -21,0 0,-15 21,0" fill="rgba(240, 253, 244, 0.95)" stroke="#6EE7B7" strokeWidth="0.8" />
                    
                    {/* Embedded micro wind turbine */}
                    <g transform="translate(0, 35)">
                      <line x1="0" y1="0" x2="0" y2="40" stroke="#34D399" strokeWidth="1.5" />
                      {/* Spinning blades cross */}
                      <g className="animate-spin-blades">
                        <line x1="-12" y1="-12" x2="12" y2="12" stroke="#FFFFFF" strokeWidth="1.5" />
                        <line x1="12" y1="-12" x2="-12" y2="12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                      </g>
                    </g>
                  </g>

                  {/* TOWER 6: My Complaints Registry (Teal Glass Tower - Front Center) */}
                  <g transform="translate(305, 260)" style={{ transform: `translate(305px, ${260 + scrollProgress * 8}px) scaleY(${1.06 - scrollProgress * 0.06})`, transformOrigin: "bottom center" }}>
                    <polygon points="0,95 -20,80 -20,0 0,15" fill="url(#teal-glass-left)" stroke="#14B8A6" strokeWidth="0.8" strokeOpacity="0.4" />
                    <polygon points="0,95 20,80 20,0 0,15" fill="url(#teal-glass-right)" stroke="#14B8A6" strokeWidth="0.8" strokeOpacity="0.4" />
                    <polygon points="0,15 -20,0 0,-15 20,0" fill="rgba(204, 251, 241, 0.95)" stroke="#5EEAD4" strokeWidth="0.8" />
                  </g>

                  {/* 5. METRO BULLET TRAIN CONTINUOUSLY MOVING */}
                  {/* Raised monorail rail track piers & concrete curve */}
                  <path d="M 100 290 Q 300 240, 500 290" stroke="rgba(255,255,255,0.3)" strokeWidth="5" fill="none" />
                  <path d="M 100 290 Q 300 240, 500 290" stroke="#6366F1" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.8" />
                  <line x1="180" y1="274" x2="180" y2="330" stroke="#94A3B8" strokeWidth="1.5" opacity="0.5" />
                  <line x1="300" y1="264" x2="300" y2="320" stroke="#94A3B8" strokeWidth="1.5" opacity="0.5" />
                  <line x1="420" y1="274" x2="420" y2="330" stroke="#94A3B8" strokeWidth="1.5" opacity="0.5" />

                  {/* Cyber metro train moving on custom loop keyframe */}
                  <g className="animate-metro">
                    {/* Multi-compartment glass bullet train */}
                    {/* Car 1 */}
                    <rect x="0" y="0" width="22" height="7.5" rx="3" fill="#FFFFFF" fillOpacity="0.9" stroke="#4F46E5" strokeWidth="1" transform="translate(0, 0) rotate(2)" />
                    <rect x="4" y="2" width="14" height="2" fill="#38BDF8" />
                    {/* Car 2 (Connected) */}
                    <rect x="-26" y="0" width="22" height="7.5" rx="3" fill="#FFFFFF" fillOpacity="0.9" stroke="#4F46E5" strokeWidth="1" transform="translate(0, 0) rotate(2)" />
                    <rect x="-22" y="2" width="14" height="2" fill="#38BDF8" />
                  </g>

                  {/* 6. SWAYING TREES & SPINNING MICRO SOLAR ARRAYS */}
                  {/* Tree cluster Left */}
                  <g transform="translate(160, 345)" className="animate-sway">
                    <circle cx="0" cy="0" r="10" fill="url(#grass-grad)" />
                    <circle cx="5" cy="-4" r="8" fill="#10B981" opacity="0.9" />
                    <line x1="0" y1="4" x2="0" y2="15" stroke="#10B981" strokeWidth="1.5" />
                  </g>
                  {/* Tree cluster Right */}
                  <g transform="translate(435, 345)" className="animate-sway" style={{ animationDelay: "1s" }}>
                    <circle cx="0" cy="0" r="12" fill="#059669" />
                    <circle cx="-6" cy="-4" r="9" fill="#34D399" opacity="0.95" />
                    <line x1="0" y1="5" x2="0" y2="18" stroke="#047857" strokeWidth="2" />
                  </g>

                  {/* Micro Solar Panels Array */}
                  <g transform="translate(240, 360)">
                    {/* Panel 1 */}
                    <polygon points="0,10 15,5 20,12 5,17" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="0.8" />
                    <line x1="10" y1="11" x2="10" y2="22" stroke="#475569" strokeWidth="1" />
                    {/* Panel 2 */}
                    <polygon points="18,12 33,7 38,14 23,19" fill="#1e3A8A" stroke="#3B82F6" strokeWidth="0.8" />
                    <line x1="28" y1="13" x2="28" y2="24" stroke="#475569" strokeWidth="1" />
                  </g>

                  {/* 7. FLYING DRONES & PULSING INCIDENT PINS */}
                  {/* Bobbing drone */}
                  <g className="animate-float-medium" style={{ animationDuration: "5s" }}>
                    <path d="M 230 180 Q 240 170, 250 180" stroke="#475569" strokeWidth="3" fill="none" />
                    <line x1="225" y1="175" x2="255" y2="175" stroke="#334155" strokeWidth="1.5" />
                    <circle cx="225" cy="172" r="2" fill="#10B981" />
                    <circle cx="255" cy="172" r="2" fill="#10B981" />
                    <circle cx="240" cy="180" r="3" fill="#1E293B" />
                  </g>

                  {/* Active pulsing GIS map pins */}
                  <g transform="translate(305, 305)">
                    {/* Pointer 1 */}
                    <circle cx="0" cy="0" r="14" fill="none" stroke="#F43F5E" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                    <circle cx="0" cy="0" r="5" fill="#F43F5E" />
                  </g>
                  <g transform="translate(210, 240)">
                    {/* Pointer 2 */}
                    <circle cx="0" cy="0" r="11" fill="none" stroke="#3B82F6" strokeWidth="1.2" className="animate-ping" opacity="0.5" style={{ animationDelay: "1s" }} />
                    <circle cx="0" cy="0" r="4" fill="#3B82F6" />
                  </g>

                  {/* Dynamic Drifting Atmosphere Clouds (drifting behind central orb) */}
                  <path className="animate-float-slow" d="M 120 110 C 130 100, 150 100, 160 110 C 170 105, 185 110, 180 120 C 170 130, 130 130, 120 110 Z" fill="#FFFFFF" fillOpacity="0.75" />
                  <path className="animate-float-medium" style={{ animationDelay: "2.5s" }} d="M 410 140 C 420 130, 440 130, 450 140 C 460 135, 470 140, 465 150 C 455 160, 420 160, 410 140 Z" fill="#FFFFFF" fillOpacity="0.7" />

                  {/* 8. 3D HOLOGRAPHIC AI BRAIN ORB (Brain of CityGPT) */}
                  <g transform="translate(300, 90)" className="animate-orb">
                    {/* Energy glow waves */}
                    <circle cx="0" cy="0" r="45" fill="none" stroke="#818CF8" strokeWidth="0.8" className="animate-ping" opacity="0.3" />
                    <circle cx="0" cy="0" r="30" fill="none" stroke="#C084FC" strokeWidth="1.2" className="animate-ping" opacity="0.5" style={{ animationDelay: "1.5s" }} />
                    
                    {/* Concentric rotating glowing rings */}
                    <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="2.5" strokeDasharray="14 14" className="animate-spin-blades" style={{ animationDuration: "12s" }} />
                    <circle cx="0" cy="0" r="16" fill="none" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="1.5" strokeDasharray="10 10" className="animate-spin-blades" style={{ animationDuration: "8s", animationDirection: "reverse" }} />

                    {/* Central glowing gradient Core Orb */}
                    <circle cx="0" cy="0" r="12" fill="url(#orb-grad)" filter="url(#neon-glow)" />
                    <defs>
                      <radialGradient id="orb-grad" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="40%" stopColor="#38BDF8" />
                        <stop offset="80%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#4F46E5" />
                      </radialGradient>
                    </defs>

                    {/* Neural Network connector nodes projecting downwards to buildings */}
                    <line x1="0" y1="12" x2="-25" y2="55" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="0" y1="12" x2="25" y2="60" stroke="rgba(249, 115, 22, 0.5)" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="0" y1="12" x2="0" y2="35" stroke="rgba(234, 179, 8, 0.5)" strokeWidth="1" strokeDasharray="3 3" />
                  </g>

                  {/* 9. HIGH-VISIBILITY CONNECTING NEON VECTOR LASER MARKERS TO PORTAL CARDS */}
                  {/* Floating cards are positioned absolutely around outer bounds and linked here dynamically */}
                  <g opacity="0.65">
                    {/* 💧 Water Leak Link (HTML Top Left -> Incident Teal Hub) */}
                    <path d="M 60 70 Q 120 120, 305 260" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="3 5" className="animate-road-glow" fill="none" filter="url(#neon-glow)" />
                    {/* 🚮 Garbage Overflow Link (HTML Bottom Left -> Island Base center) */}
                    <path d="M 60 480 Q 150 440, 270 410" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 5" className="animate-road-glow" style={{ animationDirection: "reverse" }} fill="none" filter="url(#neon-glow)" />
                    {/* 💡 Street Light Link (HTML Mid Right -> Purple Satellite node) */}
                    <path d="M 540 150 Q 420 160, 195 175" stroke="#EAB308" strokeWidth="1.5" strokeDasharray="4 4" className="animate-road-glow" fill="none" filter="url(#neon-glow)" />
                    {/* 🚦 Traffic Link (HTML Bottom Right -> Central road junction) */}
                    <path d="M 540 450 Q 430 400, 310 325" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3 5" className="animate-road-glow" fill="none" filter="url(#neon-glow)" />
                    {/* ⚡ Power Outage Link (HTML Bottom Center -> Emerald eco terminal) */}
                    <path d="M 300 520 L 425 220" stroke="#10B981" strokeWidth="1.2" strokeDasharray="3 4" fill="none" />
                    {/* 🌳 Fallen Tree Link (HTML Mid Left -> Green Grassland park) */}
                    <path d="M 60 210 Q 180 230, 435 345" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 4" fill="none" filter="url(#neon-glow)" />
                  </g>
                </svg>

                {/* 10. PREMIUM INTERACTIVE GLASSMORPHIC CARDS ORBITING THEREOF */}

                {/* CARD 1: 💧 Water Leak (Top Left) */}
                <div 
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePos.y * 10}deg) rotateY(${-mousePos.x * 10}deg)`,
                    transition: "transform 0.2s ease-out"
                  }}
                  className={`absolute top-2 left-2 backdrop-blur-xl border p-3 rounded-2xl flex items-center gap-3 shadow-xl hover:scale-105 transition-all duration-300 animate-float-slow select-none cursor-pointer ${
                    isDarkMode 
                      ? "bg-slate-900/80 border-cyan-500/30 text-white hover:bg-slate-850 hover:shadow-cyan-400/20" 
                      : "bg-white/75 border-white/60 text-slate-800 hover:bg-white/85 hover:shadow-cyan-400/25"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-inner ${
                    isDarkMode ? "bg-cyan-950/80 text-cyan-400 border border-cyan-500/20" : "bg-cyan-50 text-cyan-500 border border-cyan-150"
                  }`}>
                    <Radio className="w-4.5 h-4.5 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <p className={`text-[9px] font-mono font-bold uppercase tracking-widest ${isDarkMode ? "text-cyan-400" : "text-slate-450"}`}>💧 Water Leak</p>
                    <p className={`text-xs font-black font-display ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>Priority High</p>
                  </div>
                </div>

                {/* CARD 2: 🚮 Garbage Overflow (Bottom Left) */}
                <div 
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePos.y * 10}deg) rotateY(${-mousePos.x * 10}deg)`,
                    transition: "transform 0.2s ease-out"
                  }}
                  className={`absolute bottom-2 left-2 backdrop-blur-xl border p-3 rounded-2xl flex items-center gap-3 shadow-xl hover:scale-105 transition-all duration-300 animate-float-medium select-none cursor-pointer ${
                    isDarkMode 
                      ? "bg-slate-900/80 border-purple-500/30 text-white hover:bg-slate-850 hover:shadow-purple-400/20" 
                      : "bg-white/75 border-white/60 text-slate-800 hover:bg-white/85 hover:shadow-purple-400/25"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-inner ${
                    isDarkMode ? "bg-purple-950/80 text-purple-400 border border-purple-500/20" : "bg-purple-50 text-purple-600 border border-purple-150"
                  }`}>
                    <Users className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <p className={`text-[9px] font-mono font-bold uppercase tracking-widest ${isDarkMode ? "text-purple-400" : "text-slate-450"}`}>🚮 Waste Overflow</p>
                    <p className={`text-xs font-black font-display ${isDarkMode ? "text-purple-305" : "text-purple-700"}`}>Team Assigned</p>
                  </div>
                </div>

                {/* CARD 3: 💡 Street Light (Top Right) */}
                <div 
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePos.y * 10}deg) rotateY(${-mousePos.x * 10}deg)`,
                    transition: "transform 0.2s ease-out"
                  }}
                  className={`absolute top-2 right-2 backdrop-blur-xl border p-3 rounded-2xl flex items-center gap-3 shadow-xl hover:scale-105 transition-all duration-300 animate-float-fast select-none cursor-pointer ${
                    isDarkMode 
                      ? "bg-slate-900/80 border-yellow-500/30 text-white hover:bg-slate-850 hover:shadow-yellow-400/20" 
                      : "bg-white/75 border-white/60 text-slate-800 hover:bg-white/85 hover:shadow-yellow-400/25"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-inner ${
                    isDarkMode ? "bg-yellow-950/80 text-amber-400 border border-yellow-500/20" : "bg-yellow-50 text-amber-500 border border-yellow-150"
                  }`}>
                    <Check className="w-4.5 h-4.5 font-bold" />
                  </div>
                  <div className="text-left">
                    <p className={`text-[9px] font-mono font-bold uppercase tracking-widest ${isDarkMode ? "text-amber-405" : "text-slate-450"}`}>💡 Street Light</p>
                    <p className={`text-xs font-black font-display ${isDarkMode ? "text-amber-300" : "text-amber-600"}`}>Resolved</p>
                  </div>
                </div>

                {/* CARD 4: 🚦 Traffic Congestion (Bottom Right) */}
                <div 
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePos.y * 10}deg) rotateY(${-mousePos.x * 10}deg)`,
                    transition: "transform 0.2s ease-out"
                  }}
                  className={`absolute bottom-12 right-2 backdrop-blur-xl border p-3 rounded-2xl flex items-center gap-3 shadow-xl hover:scale-105 transition-all duration-300 animate-float-slow select-none cursor-pointer ${
                    isDarkMode 
                      ? "bg-slate-900/80 border-rose-500/30 text-white hover:bg-slate-850 hover:shadow-rose-400/20" 
                      : "bg-white/75 border-white/60 text-slate-800 hover:bg-white/85 hover:shadow-rose-400/25"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-inner ${
                    isDarkMode ? "bg-rose-950/80 text-rose-400 border border-rose-500/20" : "bg-rose-50 text-rose-500 border border-rose-150"
                  }`}>
                    <Activity className="w-4.5 h-4.5 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <p className={`text-[9px] font-mono font-bold uppercase tracking-widest ${isDarkMode ? "text-rose-400" : "text-slate-450"}`}>🚦 Traffic Node</p>
                    <p className={`text-xs font-black font-display ${isDarkMode ? "text-rose-300" : "text-rose-600"}`}>Heavy Congestion</p>
                  </div>
                </div>

                {/* CARD 5: ⚡ Power Outage (Bottom Center) */}
                <div 
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePos.y * 10}deg) rotateY(${-mousePos.x * 10}deg)`,
                    transition: "transform 0.2s ease-out"
                  }}
                  className={`absolute bottom-2 left-1/3 -translate-x-1/12 backdrop-blur-xl border p-2.5 rounded-2xl flex items-center gap-2.5 shadow-xl hover:scale-105 transition-all duration-300 animate-float-medium select-none cursor-pointer ${
                    isDarkMode 
                      ? "bg-slate-900/80 border-emerald-500/30 text-white hover:bg-slate-850 hover:shadow-emerald-400/20" 
                      : "bg-white/75 border-white/60 text-slate-800 hover:bg-white/85 hover:shadow-emerald-400/25"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isDarkMode ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/20" : "bg-emerald-50 text-emerald-550 border border-emerald-150"
                  }`}>
                    <Zap className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="text-left">
                    <p className={`text-[9px] font-mono font-bold uppercase tracking-wider ${isDarkMode ? "text-emerald-400" : "text-slate-450"}`}>⚡ Grid Substation</p>
                    <p className={`text-[11px] font-black ${isDarkMode ? "text-emerald-300" : "text-emerald-600"}`}>Active Repair</p>
                  </div>
                </div>

                {/* CARD 6: 🌳 Fallen Tree (Mid Left) */}
                <div 
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePos.y * 10}deg) rotateY(${-mousePos.x * 10}deg)`,
                    transition: "transform 0.2s ease-out"
                  }}
                  className={`absolute top-1/3 left-2 backdrop-blur-xl border p-2.5 rounded-2xl flex items-center gap-2.5 shadow-xl hover:scale-105 transition-all duration-300 animate-float-fast select-none cursor-pointer ${
                    isDarkMode 
                      ? "bg-slate-900/80 border-green-500/30 text-white hover:bg-slate-850 hover:shadow-green-400/20" 
                      : "bg-white/75 border-white/60 text-slate-800 hover:bg-white/85 hover:shadow-green-400/25"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isDarkMode ? "bg-emerald-950/80 text-emerald-405 border border-emerald-500/20" : "bg-green-50 text-emerald-500 border border-green-150"
                  }`}>
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className={`text-[9px] font-mono font-bold uppercase tracking-wider ${isDarkMode ? "text-emerald-405" : "text-slate-450"}`}>🌳 Fallen Tree</p>
                    <p className={`text-[11px] font-black ${isDarkMode ? "text-emerald-300" : "text-emerald-700"}`}>En Route</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE CITY STATS SECTION */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Blue Stat Card */}
          <div className="bg-white rounded-[2rem] border border-slate-150 p-7 shadow-xl hover:border-indigo-500/55 transition-all duration-305 group relative overflow-hidden flex flex-col items-start gap-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full" />
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center group-hover:scale-105 transition-transform animate-pulse">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black font-display text-slate-900">2,450+</p>
              <h3 className="text-sm font-extrabold text-slate-700 mt-0.5">Issues Solved</h3>
              <p className="text-xs text-slate-500 mt-2 font-light">Direct repair actions performed and archived.</p>
            </div>
          </div>

          {/* Green Stat Card */}
          <div className="bg-white rounded-[2rem] border border-slate-150 p-7 shadow-xl hover:border-emerald-500/55 transition-all duration-305 group relative overflow-hidden flex flex-col items-start gap-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-full" />
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Star className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-3xl font-black font-display text-emerald-650">95%</p>
              <h3 className="text-sm font-extrabold text-slate-700 mt-0.5">Citizen Satisfaction</h3>
              <p className="text-xs text-slate-500 mt-2 font-light">High approval collected via automated polls.</p>
            </div>
          </div>

          {/* Purple Stat Card */}
          <div className="bg-white rounded-[2rem] border border-slate-150 p-7 shadow-xl hover:border-fuchsia-500/55 transition-all duration-305 group relative overflow-hidden flex flex-col items-start gap-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-fuchsia-50 to-transparent rounded-bl-full" />
            <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black font-display text-slate-900">18</p>
              <h3 className="text-sm font-extrabold text-slate-700 mt-0.5">Active Teams</h3>
              <p className="text-xs text-slate-500 mt-2 font-light">Specialist crews actively on patrol zones.</p>
            </div>
          </div>

          {/* Orange Stat Card */}
          <div className="bg-white rounded-[2rem] border border-slate-150 p-7 shadow-xl hover:border-amber-500/55 transition-all duration-305 group relative overflow-hidden flex flex-col items-start gap-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-50 to-transparent rounded-bl-full" />
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black font-display text-slate-900">30 min</p>
              <h3 className="text-sm font-extrabold text-slate-700 mt-0.5">Response Time</h3>
              <p className="text-xs text-slate-500 mt-2 font-light">Fastest response envelope compared to peer states.</p>
            </div>
          </div>

        </div>
      </section>

      {/* TRUSTED BY CITIES */}
      <section className="bg-slate-100/50 border-y border-slate-200 py-12 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#64748B]">
            Helping cities become proactive, not reactive.
          </p>
          {/* Logo cloud */}
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 mt-8">
            {["Bhopal", "Indore", "Delhi", "Pune", "Bangalore"].map((city, idx) => (
              <div key={idx} className="flex items-center gap-2 grayscale stroke-slate-400 opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                <Building2 className="w-4.5 h-4.5 text-indigo-600" />
                <span className="text-lg font-extrabold tracking-tight text-slate-705 font-display">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 relative z-10 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold font-mono tracking-widest text-indigo-600 uppercase mb-2">Automated Pipeline</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">Seamless Problem-Solving</h3>
          <p className="text-slate-500 text-xs sm:text-sm font-light mt-2.5">
            Four simple steps. Zero bureaucracy. Just snap, analyze, and dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* STEP 1 */}
          <div className="bg-white p-6.5 rounded-[2rem] border border-slate-150 shadow-lg relative group flex flex-col items-center text-center gap-4 transition-all hover:border-indigo-400 hover:shadow-xl duration-300">
            <span className="absolute top-4 left-4 text-xs font-mono font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">01</span>
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900">📷 Snap Photo</h4>
              <p className="text-xs text-slate-500 mt-2 font-light leading-relaxed">
                Take a quick photo of the road hazard, water burst, or garbage overflow using any phone.
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="bg-white p-6.5 rounded-[2rem] border border-slate-150 shadow-lg relative group flex flex-col items-center text-center gap-4 transition-all hover:border-indigo-400 hover:shadow-xl duration-300">
            <span className="absolute top-4 left-4 text-xs font-mono font-black text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">02</span>
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900">🤖 AI Detects</h4>
              <p className="text-xs text-slate-500 mt-2 font-light leading-relaxed">
                Our computer vision instantly categorizes the issue and logs GPS coordinate telemetry tags.
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="bg-white p-6.5 rounded-[2rem] border border-slate-150 shadow-lg relative group flex flex-col items-center text-center gap-4 transition-all hover:border-indigo-400 hover:shadow-xl duration-300">
            <span className="absolute top-4 left-4 text-xs font-mono font-black text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">03</span>
            <div className="w-14 h-14 bg-purple-50 text-purple-600 border border-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900">🚀 Team Assigned</h4>
              <p className="text-xs text-slate-500 mt-2 font-light leading-relaxed">
                The smart platform automatically alerts the closest and best equipped repair crew in the region.
              </p>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="bg-white p-6.5 rounded-[2rem] border border-slate-150 shadow-lg relative group flex flex-col items-center text-center gap-4 transition-all hover:border-indigo-400 hover:shadow-xl duration-300">
            <span className="absolute top-4 left-4 text-xs font-mono font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">04</span>
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900">✅ Problem Solved</h4>
              <p className="text-xs text-slate-500 mt-2 font-light leading-relaxed">
                Work division uploads the fix verification photo, resolving tickets, and giving citizens points.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* MODERN BENTO GRID FEATURES SECTION */}
      <section id="landing-features" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-slate-200 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold font-mono tracking-widest text-[#10B981] uppercase mb-2">Platform Features Area</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 font-display">Modular Bento Framework</h3>
          <p className="text-slate-500 text-xs sm:text-sm font-light mt-2.5">
            Dribbble-quality SaaS architecture featuring six high-fidelity modules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* BENTO CARD 1: AI VISION */}
          <div className="md:col-span-8 card-premium-yellow text-slate-900 rounded-[2rem] p-8 shadow-md relative overflow-hidden group flex flex-col justify-between min-h-[280px]">
             <div className="absolute top-[-30px] right-[-30px] w-52 h-52 bg-yellow-55/10 rounded-full blur-xl group-hover:scale-110 transition-transform" />
            <div className="flex justify-between items-start">
              <div className="p-4 bg-yellow-50 border border-yellow-101 rounded-2xl text-amber-650">
                <Brain className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-yellow-100 text-amber-705 px-3 py-1 rounded-full border border-yellow-200">Computer Vision Core</span>
            </div>
            <div className="mt-8">
              <h4 className="text-2xl font-extrabold tracking-tight text-slate-900">🤖 AI Vision (AI Assistant)</h4>
              <p className="text-xs font-normal text-amber-900/70 mt-2.5 leading-relaxed max-w-md">
                Instantly classify raw photos of garbage, damaged light transformers, or pipe leaks. Computer vision saves municipal offices hundreds of manual triage hours.
              </p>
            </div>
          </div>

          {/* BENTO CARD 2: LIVE TRACKING */}
          <div className="md:col-span-4 card-premium-purple rounded-[2rem] p-8 shadow-md relative overflow-hidden group flex flex-col justify-between min-h-[280px]">
            <div className="absolute bottom-[-10px] right-[-10px] w-36 h-36 bg-purple-50/20 rounded-full flex items-center justify-center opacity-30 group-hover:scale-105 transition-transform" />
            <div className="p-4 bg-purple-50 text-purple-600 border border-purple-100 rounded-2xl w-fit">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900">🗺 Live Tracking (Live Map)</h4>
              <p className="text-xs font-normal text-purple-900/70 mt-2 leading-relaxed">
                Audit dispatch vectors, ETAs, and assigned crew ids on an active client GIS canvas seamlessly.
              </p>
            </div>
          </div>

          {/* BENTO CARD 3: PREDICTIVE AI */}
          <div className="md:col-span-4 card-premium-rose rounded-[2rem] p-8 shadow-md relative overflow-hidden group flex flex-col justify-between min-h-[280px]">
            <div className="p-4 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl w-fit">
              <Activity className="w-6 h-6 font-bold" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900">📊 Predictive AI (Outages & Stats)</h4>
              <p className="text-xs font-normal text-rose-900/70 mt-2 leading-relaxed">
                Utilize deep temporal layers to anticipate main pipelines fatigue or sewer grid backlogs before outages.
              </p>
            </div>
          </div>

          {/* BENTO CARD 4: MULTILINGUAL AI */}
          <div className="md:col-span-8 card-premium-teal text-slate-900 rounded-[2rem] p-8 shadow-md relative overflow-hidden group flex flex-col justify-between min-h-[280px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-bl-full" />
            <div className="flex justify-between items-start">
              <div className="p-4 bg-teal-50 border border-teal-101 rounded-2xl text-teal-600">
                <Globe className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-teal-100 text-teal-750 px-3 py-1 rounded-full border border-teal-101">NLP Localization Engine</span>
            </div>
            <div className="mt-8">
              <h4 className="text-2xl font-extrabold tracking-tight text-slate-900">🌐 Multilingual Support (My Complaints)</h4>
              <p className="text-xs font-normal text-teal-900/70 mt-2.5 leading-relaxed max-w-sm">
                Chat or speak recordings in Hindi, English, and regional dialects. NLP engines process spoken sentences to automatically compile complaints without friction.
              </p>
            </div>
          </div>

          {/* BENTO CARD 5: SMART ASSIGNMENT */}
          <div className="md:col-span-6 card-premium-orange rounded-[2rem] p-8 shadow-md relative overflow-hidden group flex flex-col justify-between min-h-[280px]">
            <div className="p-4 bg-orange-50 text-orange-600 border border-orange-100 rounded-2xl w-fit animate-pulse">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900">⚡ Smart Assignment (Report Issue)</h4>
              <p className="text-xs font-normal text-orange-950/70 mt-2 leading-relaxed">
                Eliminate manual municipal desk routing. Incidents are categorized and dispatched autonomously to active neighborhood depots based on load and distance filters.
              </p>
            </div>
          </div>

          {/* BENTO CARD 6: REWARDS */}
          <div className="md:col-span-6 card-premium-green rounded-[2rem] p-8 shadow-md relative overflow-hidden group flex flex-col justify-between min-h-[280px]">
            <div className="p-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl w-fit">
              <Trophy className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900">🏆 Rewards (Citizen Hub)</h4>
              <p className="text-xs font-normal text-emerald-900/70 mt-2 leading-relaxed">
                Accrue dynamic utility deduction point buffers ("Green Credits") with every resolved filing. Deduct water or electricity bills easily in the profile workspace.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* PREDICTIVE AI DIAGNOSTICS DEEP SECTION */}
      <section className="bg-slate-50 text-slate-900 py-20 md:py-28 relative z-10 overflow-hidden rounded-[3rem] mx-4 sm:mx-6 my-12 border border-slate-200 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.06)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-500/5 blur-[130px]" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-100 text-rose-600 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit font-mono">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> Neural Diagnostic Pipeline
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight leading-tight text-slate-900">
              From Reactive Governance <br />
              to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Predictive Governance.</span>
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
              We analyze water canal pressure buffers, pavement degradation telemetry, and local meteorological sensors to calculate risk ratings. This lets the city deploy municipal engineers before severe piping fractures or streetlights black out.
            </p>

            {/* Glowing Analytics Metric Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
              <div className="p-4 bg-white border border-slate-205 rounded-2xl shadow-sm">
                <span className="block text-xl font-bold text-blue-600">92% accuracy</span>
                <span className="text-slate-500 text-[11px] font-light mt-1 block">In pipeline leakage previews.</span>
              </div>
              <div className="p-4 bg-white border border-slate-205 rounded-2xl shadow-sm">
                <span className="block text-xl font-bold text-emerald-650 font-black">3-day margin</span>
                <span className="text-slate-500 text-[11px] font-light mt-1 block">Pre-emptively warning depots.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center">
            {/* Card Example requested */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 w-full max-w-md relative overflow-hidden shadow-2xl text-slate-900">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full" />
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-rose-600 rounded-full animate-ping" />
                  <span className="text-xs font-mono font-bold text-rose-600 uppercase tracking-widest font-bold">⚠ Sector 5 Warning</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-semibold">Node #DIAG-2051</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-black text-rose-600 font-display">80% Risk Rating</h4>
                  <p className="text-xs text-slate-600 mt-1 font-light leading-relaxed">
                    Detected high pressure anomaly trend in central hydraulic water pipe feeding Avenue 4. Prediction model projects fracture within 15 days.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                  <p className="text-[11px] font-bold text-slate-500 font-mono uppercase tracking-wide">Suggested Pre-emptive Action:</p>
                  <p className="text-xs text-slate-600 mt-1.5 font-light">
                    Schedule crew maintenance of pressure release node Ward 5 within 48 hours to secure structural pipeline equilibrium.
                  </p>
                </div>

                {/* Simulated Graph Vector */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono mb-1">
                    <span>SENSOR VOLTS (DAILY)</span>
                    <span className="text-rose-500 font-bold">CRITICAL TREND</span>
                  </div>
                  <div className="w-full bg-slate-50 h-11 border border-slate-200/80 rounded-lg flex items-end p-1 gap-1 justify-between">
                    <div className="bg-slate-200 w-full h-[20%] rounded" />
                    <div className="bg-slate-200 w-full h-[30%] rounded" />
                    <div className="bg-slate-200 w-full h-[25%] rounded" />
                    <div className="bg-slate-200 w-full h-[45%] rounded" />
                    <div className="bg-rose-500 w-full h-[70%] rounded animate-pulse" />
                    <div className="bg-rose-600 w-full h-[85%] rounded animate-pulse" />
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-3">
                  <span>METRIC SCORE SECURED</span>
                  <span className="text-emerald-600 font-bold">STATUS ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* **LIVE CITY MAP SECTION - PREMIUM GOOGLE MAPS STYLE INTERACTIVE WIDGET** */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 relative z-10 border-t border-slate-201 text-slate-900">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold font-mono tracking-widest text-indigo-650 uppercase mb-2">TELEMETRY PREVIEW</h2>
            <h3 className="text-3xl font-extrabold font-display text-slate-900">Live Active Incident Map Preview</h3>
            <p className="text-slate-500 text-xs sm:text-sm font-light mt-2">
              Filter by priorities, click map coordinates, and inspect active dispatch logs right from our landing page portal.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-1.5 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 backdrop-blur-md">
            
            {/* Interactive map visualization canvas */}
            <div className="lg:col-span-8 bg-slate-100 rounded-[2.2rem] h-[450px] relative overflow-hidden flex flex-col justify-center items-center p-4 border border-slate-200">
              
              {/* Map grid */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "linear-gradient(rgba(99, 102, 241, 0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1.5px, transparent 1.5px)",
                backgroundSize: "32px 32px"
              }} />

              {/* Vector GIS Overlay Lines */}
              <svg className="absolute inset-0 w-full h-full text-[#F3F4F6]" viewBox="0 0 600 400" fill="none">
                <path d="M 0 100 Q 250 160, 600 240" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="18" fill="none" />
                <path d="M 0 100 Q 250 160, 600 240" stroke="#4F46E5" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M 120 0 L 120 400" stroke="rgba(168, 85, 247, 0.05)" strokeWidth="10" fill="none" />
                <path d="M 120 0 L 120 400" stroke="#A855F7" strokeWidth="2" fill="none" opacity="0.3" />
                <path d="M 450 0 L 320 400" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="10" fill="none" />
                <path d="M 0 320 Q 300 260, 600 340" stroke="rgba(244, 63, 94, 0.05)" strokeWidth="12" fill="none" opacity="0.3" />
                <path d="M 0 320 Q 300 260, 600 340" stroke="#F43F5E" strokeWidth="2" fill="none" opacity="0.3" />
              </svg>

              {/* Map Filter Controls Top Bar */}
              <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search active pins (e.g. water, lights, garbage)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/95 backdrop-blur shadow-md border border-slate-205 rounded-full py-2 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 font-semibold"
                  />
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {["All", "Critical", "High", "Medium", "Resolved"].map((filt) => (
                    <button
                      key={filt}
                      onClick={() => setPriorityFilter(filt)}
                      className={`px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer ${
                        priorityFilter === filt 
                          ? "bg-indigo-600 text-white" 
                          : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                      }`}
                    >
                      {filt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Coordinate Pins placement */}
              {filteredMapItems.map((item) => {
                const isSelected = selectedMapItem.id === item.id;
                // Pin backgrounds depending on priority level
                const pinBgColor = 
                  item.priority === "Critical" ? "bg-rose-600 border-white" :
                  item.priority === "High" ? "bg-orange-500 border-white" :
                  item.priority === "Medium" ? "bg-indigo-600 border-white" :
                  "bg-emerald-500 border-white";

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMapItem(item)}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 transform hover:scale-115"
                    style={{
                      top: `${item.lat}%`,
                      left: `${item.lng}%`
                    }}
                  >
                    {/* Ring for high threat */}
                    {(item.priority === "Critical" || item.priority === "High") && (
                      <span className="absolute animate-ping inline-flex h-8 w-8 rounded-full bg-rose-500/30 -left-2 -top-2" />
                    )}

                    <div className={`p-2.5 rounded-full border-2 ${pinBgColor} text-white flex items-center justify-center shadow-lg ${
                      isSelected ? "scale-140 ring-4 ring-indigo-500/30" : "scale-100"
                    }`}>
                      <MapPin className="w-3.5 h-3.5 text-white" />
                    </div>

                    <span className="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.id} (Click)
                    </span>
                  </button>
                );
              })}

              <div className="absolute bottom-3 left-4 bg-white/95 backdrop-blur p-2.5 rounded-xl border border-slate-200 text-[10px] font-bold text-slate-550 flex items-center gap-2 shadow-md z-30 font-mono">
                <SpinnerBadge /> Interactive Mock Sandbox Active
              </div>

              {filteredMapItems.length === 0 && (
                <div className="bg-white backdrop-blur border border-slate-200 p-6 rounded-2xl text-center max-w-xs z-30 shadow">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="font-extrabold text-xs text-slate-900">No active incidents match criteria.</p>
                  <p className="text-[11px] text-slate-500 font-light mt-1">Try changing priority filters or your search string query.</p>
                </div>
              )}

            </div>

            {/* Right side live telemetry inspector panel */}
            <div className="lg:col-span-4 bg-white rounded-r-[2.2rem] border-l border-slate-200 p-6 flex flex-col justify-between h-[450px]">
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold font-mono bg-indigo-50 text-indigo-650 px-3 py-1 rounded-full border border-indigo-100">
                    Live Telemetry Core
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-bold">{selectedMapItem.id}</span>
                </div>

                <div className="w-full h-28 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative mb-4">
                  <img src={selectedMapItem.imageUrl} alt={selectedMapItem.title} className="w-full h-full object-cover opacity-90" />
                  <span className={`absolute top-2 left-2 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full text-white shadow-sm ${
                    selectedMapItem.priority === "Critical" ? "bg-rose-600" :
                    selectedMapItem.priority === "High" ? "bg-orange-500" :
                    selectedMapItem.priority === "Medium" ? "bg-indigo-600" :
                    "bg-emerald-600"
                  }`}>
                    {selectedMapItem.priority}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-2">
                  {selectedMapItem.title}
                </h4>

                <div className="space-y-1.5 text-xs text-slate-650 font-light mt-3 text-slate-600">
                  <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> <strong className="text-slate-800">Location:</strong> {selectedMapItem.locationDescription}</p>
                  <p className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" /> <strong className="text-slate-800">Crew Pool:</strong> {selectedMapItem.assignedTeam}</p>
                  <p className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-slate-400" /> <strong className="text-slate-800">ETA/Status:</strong> <span className="font-semibold text-indigo-605 capitalize">{selectedMapItem.status} ({selectedMapItem.eta})</span></p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <button 
                  onClick={() => handleVoteMapItem(selectedMapItem.id)}
                  disabled={votedMapItems[selectedMapItem.id]}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 border rounded-xl text-xs font-bold transition-all ${
                    votedMapItems[selectedMapItem.id] 
                      ? "bg-slate-105 text-slate-400 border-slate-150" 
                      : "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:scale-102 cursor-pointer hover:bg-slate-50 shadow-sm"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${votedMapItems[selectedMapItem.id] ? "fill-red-500 text-red-500 animate-pulse" : "text-slate-450"}`} />
                  {votedMapItems[selectedMapItem.id] ? "Voted!" : "Upvote ticket"} ({selectedMapItem.votes})
                </button>
                <button
                  onClick={() => { onSetRole("citizen"); onNavigate("live_map"); }}
                  className="p-2 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Open Map →
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CITY HEALTH SCORE SECTION */}
      <section id="city-health" className="bg-white py-20 px-4 sm:px-6 relative z-10 border-y border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel breakdown cards */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div>
              <span className="text-xs font-bold font-mono uppercase bg-indigo-50 text-indigo-650 border border-indigo-100 px-3 py-1 rounded-full">Telemetry Diagnostics</span>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-3 font-display">Grid Health Indices</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-light mt-2.5">
                Composite scoring calculated across public infrastructure pipelines using automated field hardware trackers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HEALTH_BREAKDOWN.map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-5 border border-slate-150 rounded-3xl shadow-md hover:border-slate-300 transition-all backdrop-blur-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-extrabold text-slate-800">{item.name}</span>
                    <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{item.score}%</span>
                  </div>
                  {/* Progress Line */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.score}%` }} />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2">
                    <span className="font-mono">{item.raw}</span>
                    <span className="font-mono font-semibold text-slate-600">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Circular Gauge indicator */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col items-center justify-center text-center max-w-md w-full relative overflow-hidden group backdrop-blur-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full" />
              
              <h4 className="text-xs font-bold font-mono tracking-widest text-[#64748B] uppercase mb-4">COMPOSITE LIVE INDEX</h4>
              
              {/* Circular SVG Gauge widget */}
              <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#E2E8F0" strokeWidth="8" fill="transparent" />
                  <circle 
                    cx="50" cy="50" r="40" 
                    stroke="url(#metricsGrad2)" strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 - (251.2 * cityHealth) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="metricsGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#4F46E5" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Numeric core text */}
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-black text-slate-900 font-display">{cityHealth}</span>
                  <span className="text-[10px] text-emerald-600 font-mono font-bold tracking-wider uppercase">Excellent</span>
                </div>
              </div>

              <p className="text-xs text-slate-505 leading-relaxed font-light mt-2 max-w-xs">
                Excellent Performance. The community grid registers 13% faster clearance cycles than compared legacy manual complaint pipelines.
              </p>

              <button 
                onClick={() => { onSetRole("admin"); onNavigate("login"); }}
                className="w-full mt-6 py-2.5 bg-slate-900 hover:bg-slate-800 hover:text-indigo-100 border border-transparent rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-md"
              >
                Inspect Infrastructure Telemetry →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* COMMUNITY ACHIEVEMENT & REWARDS LEADERBOARD PANEL */}
      <section id="rewards-leaderboard" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative z-10 scroll-mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel badges & achievements */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div>
              <span className="text-xs font-bold font-mono uppercase bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1 rounded-full">Citizen Perks Hub</span>
              <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-3 leading-tight flex items-center gap-2">
                <Trophy className="w-8 h-8 text-amber-500 animate-bounce" /> Citizens Leaderboard & Rewards
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-light mt-2.5 leading-relaxed">
                Unlock prestigious, glowing community badges by filing high-accuracy alerts, participating in validation votes, and monitoring municipal grid health. Claim utility tax exemptions easily!
              </p>
            </div>

            <div className="space-y-4">
              {/* Badge 1 */}
              <div className="bg-slate-50 border border-slate-250 p-5 rounded-3xl shadow-sm hover:border-slate-300 transition-all flex items-center gap-4 group">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-650 rounded-2xl flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">🏆 City Guardian Achievement</h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-light">Granted upon reporting 10 high-precision validated incidents within public lines.</p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="bg-slate-50 border border-slate-250 p-5 rounded-3xl shadow-sm hover:border-slate-300 transition-all flex items-center gap-4 group">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
                  <CheckCheck />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">🌱 Eco Hero Achievement</h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-light">Earned for solid waste cleanup logs and zero-waste community filings.</p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="bg-slate-50 border border-slate-250 p-5 rounded-3xl shadow-sm hover:border-slate-300 transition-all flex items-center gap-4 group">
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-650 rounded-2xl flex items-center justify-center border border-indigo-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
                  <Award className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Smart Citizen Achievement</h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-light">Granted to top ranking individuals on regional monthly metrics charts.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right leaderboard core */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full" />
              
              <div className="border-b border-slate-200 pb-5 mb-5 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-black text-slate-900">Monthly Top Citizens</h4>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">ZONE SECTOR-4 HIGH PERFORMERS</p>
                </div>
                <span className="text-[10px] font-bold font-mono tracking-wider bg-indigo-50 text-indigo-650 px-3 py-1 rounded-full border border-indigo-150">Live Updates</span>
              </div>

              <div className="space-y-3">
                {LEADERBOARD.map((item, id) => (
                  <div key={id} className="bg-slate-50 p-4 border border-slate-205 rounded-2xl flex items-center justify-between shadow-sm hover:translate-x-1.5 transition-transform hover:border-slate-300">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center ${
                        item.rank === 1 ? "bg-amber-100 text-amber-700 font-mono" :
                        item.rank === 2 ? "bg-slate-200 text-slate-700 font-mono" :
                        item.rank === 3 ? "bg-orange-100 text-orange-700 font-mono" :
                        "bg-slate-100 text-slate-500 font-mono"
                      }`}>
                        {item.rank}
                      </span>
                      <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                      <div>
                        <h5 className="text-xs font-black text-slate-900">{item.name}</h5>
                        <p className="text-[10px] text-slate-505 font-mono">{item.badge}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black font-mono text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">{item.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CITIZEN TESTIMONIALS SECTION */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6 relative z-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-xl mx-auto mb-14">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-650 font-bold mb-2">CITIZEN FEEDBACKS</h2>
            <h3 className="text-3xl font-extrabold font-display text-slate-900">Voices of the Community</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl hover:border-slate-300 transition-all text-left relative flex flex-col justify-between backdrop-blur-md">
              <span className="absolute top-6 right-6 text-6xl text-indigo-500/10 font-serif font-black">“</span>
              <p className="text-slate-600 text-sm leading-relaxed font-light pt-4 italic">
                "The response time dropped from 3 days to 4 hours. Once I filed a pothole warning, the system automatically dispatched Sector-4 crews, and I tracked them directly on my map."
              </p>
              <div className="flex items-center gap-3.5 mt-6 border-t border-slate-200 pt-4">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=80" alt="Mun officer avatar" className="w-[36px] h-[36px] rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">— Devanshu Roy</h4>
                  <p className="text-[10px] text-slate-450 font-mono font-bold">MUNICIPAL DEPUTY OFFICER</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl hover:border-slate-300 transition-all text-left relative flex flex-col justify-between backdrop-blur-md">
              <span className="absolute top-6 right-6 text-6xl text-purple-500/10 font-serif font-black">“</span>
              <p className="text-slate-600 text-sm leading-relaxed font-light pt-4 italic">
                "Reporting problems is now incredibly easy and transparent. Being able to track ticket changes in real-time and even earn Green incentives makes me feel like a true stakeholder."
              </p>
              <div className="flex items-center gap-3.5 mt-6 border-t border-slate-200 pt-4">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80" alt="Citizen Avatar" className="w-[36px] h-[36px] rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">— Shreya Iyer</h4>
                  <p className="text-[10px] text-slate-450 font-mono font-semibold">ACTIVE CITIZEN (SECTOR-3)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="landing-faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-20 relative z-10 border-t border-slate-200 scroll-mt-10">
        <div className="text-center mb-12">
          <span className="text-xs font-bold font-mono uppercase bg-indigo-50 text-indigo-650 px-3 py-1 rounded-full border border-indigo-150">KNOWLEDGE BASE</span>
          <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-3">Frequently Asked Questions</h3>
          <p className="text-[11px] text-slate-500 font-mono mt-1 uppercase font-bold">Bridging municipal understanding</p>
        </div>

        {/* Categories toggler */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {["All", "Detection", "Language Compatibility", "Crews & Dispatch", "Rewards"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFaqTab(tab.toLowerCase())}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                activeFaqTab === tab.toLowerCase() ? "bg-indigo-600 text-white shadow" : "bg-white text-slate-600 shadow-sm border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {[
            { q: "How does AI detect issues?", a: "AI vision nodes analyze the size, type, and physical location severity descriptors in any submitted photo. For instance, computer vision instantly classifies if a pile of waste matches high hazardous solids, allocating dispatch prioritizations within seconds.", cat: "detection" },
            { q: "Can I report in Hindi or other regional languages?", a: "Yes. Our Natural Language Processing core supports language strings in Hindi, English, and local dialects. You can type natively or submit spoken audio clips which the AI parses with top-tier semantic conversion models.", cat: "language compatibility" },
            { q: "How are field teams dispatched and assigned?", a: "Once a complaint clears the AI visual scanner, the platform searches our active crew telemetry map. It assigns the repair ticket to the closest specialized field crew unit's dashboard automatically, removing manual routing gates.", cat: "crews & dispatch" },
            { q: "Can workers and field supervisors track complaints in real-time?", a: "Absolutely. Specialist workers use a dedicated Crew Commander UI allowing them to trace step-by-step route navigation directions, toggle tickets to 'Working' state, and update resolve reports with 'After' photos.", cat: "crews & dispatch" },
            { q: "How do I claim utility rewards or Green Credits?", a: "Every verified hazard report triggers points added to your personal profile. Citizens can redeem points in the portal for municipal subsidy codes, which are deducted directly on subsequent municipal power/water billing systems.", cat: "rewards" }
          ].filter(item => activeFaqTab === "all" || item.cat.includes(activeFaqTab) || activeFaqTab.includes(item.cat)).map((faq, index) => (
            <div 
              key={index}
              className="bg-white border border-slate-200 rounded-[1.8rem] overflow-hidden transition-all shadow-md hover:border-slate-300"
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-5 flex items-center justify-between font-bold text-sm text-slate-700 hover:text-slate-900 transition-colors cursor-pointer focus:outline-none"
              >
                <span>{faq.q}</span>
                <span className="text-indigo-600 font-extrabold text-lg">{faqOpen === index ? "−" : "+"}</span>
              </button>
              
              <AnimatePresence>
                {faqOpen === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-150 px-5 pb-5 text-xs text-slate-650 leading-relaxed font-light pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER: FEATURING SKYLINE GRAPHICS & DIRECT ACCESS ROW */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12 relative z-10 text-slate-500 text-xs font-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 text-left">
            
            <div className="md:col-span-4 flex flex-col gap-4">
              <span className="text-xl font-black tracking-tight text-slate-800 font-display">
                City<span className="text-indigo-600">GPT</span>
              </span>
              <p className="leading-relaxed text-slate-550">
                Primacy platform for real-time civic grid monitoring, bridging the gap between inhabitants and municipalities via smart computer vision.
              </p>
              <div className="flex gap-3 mt-1">
                <span className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-650 hover:text-indigo-600 transition-colors cursor-pointer shadow-sm"><Mail size={14} /></span>
                <span className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-650 hover:text-indigo-600 transition-colors cursor-pointer shadow-sm"><Phone size={14} /></span>
                <span className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-650 hover:text-indigo-600 transition-colors cursor-pointer shadow-sm"><Radio size={14} /></span>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold text-slate-700 mb-4 font-mono uppercase tracking-wider text-[10px]">Company</h4>
              <ul className="space-y-2 text-slate-550">
                <li><a href="#landing-features" className="hover:text-indigo-600 transition-colors text-slate-550">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-indigo-600 transition-colors text-slate-550">About Platform</a></li>
                <li className="text-slate-400">Civic Trust Code</li>
                <li className="text-slate-400">News & Journal</li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold text-slate-700 mb-4 font-mono uppercase tracking-wider text-[10px]">Resources</h4>
              <ul className="space-y-2 text-slate-550">
                <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors text-slate-550">GitHub Code ↗</a></li>
                <li className="text-slate-400">Documentation API</li>
                <li className="text-slate-400">Municipal Guidelines</li>
                <li className="text-slate-400">Data Safety Laws</li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold text-slate-700 mb-4 font-mono uppercase tracking-wider text-[10px]">Community</h4>
              <ul className="space-y-2 text-slate-550">
                <li className="text-slate-400">Green Credit Subsidy</li>
                <li className="text-slate-400">Citizen Hall of Fame</li>
                <li className="text-slate-400">Volunteer Groups</li>
                <li className="text-slate-400">Local Hackathons</li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold text-slate-700 mb-4 font-mono uppercase tracking-wider text-[10px]">Contact Us</h4>
              <ul className="space-y-2 text-slate-555 font-light">
                <li>📍 Ward 3 Head Office</li>
                <li>✉️ support@citygpt.gov</li>
                <li>📞 1-800-CITY-GPT</li>
              </ul>
            </div>

          </div>

          {/* SVG skyline illustration requested for the footer */}
          <div className="w-full h-20 bg-slate-100 border border-slate-200 rounded-[2rem] overflow-hidden relative mb-8 flex items-end">
            <svg className="w-full h-full text-indigo-150" viewBox="0 0 1000 80" preserveAspectRatio="none">
              <path d="M 0 80 L 10 70 L 10 50 L 30 50 L 30 70 L 40 65 L 40 40 L 60 40 L 60 65 L 70 70 L 90 70 L 90 30 L 120 30 L 120 70 L 140 70 L 140 45 L 170 45 L 170 70 L 190 70 L 210 20 L 240 20 L 240 70 L 260 70 L 260 50 L 290 50 L 290 70 L 310 70 L 310 10 L 350 10 L 350 70 L 370 70 L 370 40 L 400 40 L 400 70 L 420 70 L 420 55 L 450 55 L 450 70 L 480 70 L 480 35 L 510 35 L 510 70 L 530 70 L 530 45 L 560 45 L 560 70 L 580 70 L 600 20 L 630 20 L 630 70 L 650 70 L 650 48 L 680 48 L 680 70 L 700 70 L 700 30 L 740 30 L 740 70 L 760 70 L 760 50 L 790 50 L 790 70 L 810 70 L 810 15 L 850 15 L 850 70 L 870 70 L 870 40 L 900 40 L 900 70 L 920 70 L 920 55 L 950 55 L 950 70 L 980 70 L 980 35 L 1000 35 L 1000 80 Z" fill="currentColor" opacity="0.6"/>
              <path d="M 0 80 L 20 65 L 20 55 L 45 55 L 45 65 L 65 60 L 65 30 L 95 30 L 95 65 L 115 70 L 135 48 L 165 48 L 165 70 L 185 70 L 185 35 L 215 35 L 215 70 L 235 70 L 235 40 L 265 40 L 265 70 L 285 70 L 305 15 L 345 15 L 345 70 L 365 70 L 365 45 L 395 45 L 395 70 L 415 70 L 445 50 L 475 50 L 475 70 L 495 70 L 515 25 L 545 25 L 545 70 L 565 70 L 585 35 L 615 35 L 615 70 L 635 70 L 665 45 L 695 45 L 695 70 L 715 70 L 735 15 L 775 15 L 775 70 L 795 70 L 815 45 L 845 45 L 845 70 L 865 70 L 885 35 L 915 35 L 915 70 L 935 70 L 965 48 L 995 48 L 995 80 Z" fill="currentColor" opacity="0.4"/>
            </svg>
            <div className="absolute top-2.5 left-6 bg-white/90 border border-slate-200 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500 font-mono flex items-center gap-1 shadow-sm">
              🏢 METROPOLITAN INFRASTRUCTURE CONTOUR
            </div>
            <div className="absolute top-2.5 right-6 text-[10px] text-slate-400 font-mono font-bold tracking-widest uppercase">
              GRID v4.1 SECURED
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-205 text-slate-500 font-medium">
            <p>© 2026 CityGPT Tech Inc. Active telemetry logged under safe private sandbox rules.</p>
            <div className="flex gap-4 font-mono text-[10px] font-bold">
              <button onClick={() => { onSetRole("admin"); onNavigate("login"); }} className="hover:text-indigo-650 transition-colors uppercase cursor-pointer">[Admin Bypass]</button>
              <button onClick={() => { onSetRole("worker"); onNavigate("login"); }} className="hover:text-indigo-650 transition-colors uppercase cursor-pointer">[Worker Bypass]</button>
            </div>
          </div>

        </div>
      </footer>

      {/* WATCH LIVE DEMO CONSOLE MODAL */}
      <AnimatePresence>
        {demoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white max-w-lg w-full rounded-[2.5rem] p-7 relative shadow-2xl overflow-hidden border border-slate-200 text-slate-800"
            >
              <button 
                onClick={() => setDemoOpen(false)}
                className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-850 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center py-4">
                <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-2xl mb-4">
                  <Cpu className="w-8 h-8 animate-pulse" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-950 font-display">
                  CityGPT Smart Demo Console
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 font-light">
                  Simulating computer vision scanning pipelines on live incident datasets for verification.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl font-mono text-[11px] text-[#10B981] space-y-3.5 leading-relaxed shadow-inner border border-slate-900">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold border-b border-slate-900 pb-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  INITIATING MUNICIPAL COMPLIANCE SCAN...
                </div>
                <p>&gt; Loaded visual classification node #G-4509</p>
                <p>&gt; Scanning garbage heap pixel grid (Ward-3 Alley)...</p>
                <p className="text-indigo-400">&gt; AI CONFIDENCE: 99.4% [GARBAGE OVERFLOW DETECTED]</p>
                <p className="text-amber-400">&gt; PRIORITY LEVEL ASSIGNED: HIGH [SAFETY METRIC WARNING]</p>
                <p className="text-purple-400">&gt; WORKER DISPATCH SYSTEM: S-3 Crew alerted automatically.</p>
                <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl text-slate-400 text-[10px] mt-2 leading-relaxed">
                  CityGPT automatically triggers instant detection pipelines upon submission, bypassing legacy manual desk routing.
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 font-bold text-xs">
                <button 
                  onClick={() => setDemoOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors cursor-pointer border border-slate-200"
                >
                  Close Console
                </button>
                <button 
                  onClick={() => { setDemoOpen(false); onNavigate("login"); }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-colors shadow-md cursor-pointer"
                >
                  Report Issue Now
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Inline minimalist spinner SVG for mock maps
function SpinnerBadge() {
  return (
    <svg className="animate-spin h-3.5 w-3.5 text-indigo-450 text-indigo-405 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}

function CheckCheck() {
  return (
    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
