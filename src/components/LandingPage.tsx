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

export default function LandingPage({ onNavigate, onSetRole, cityHealth }: LandingPageProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [activeFaqTab, setActiveFaqTab] = useState<string>("all");
  
  // Interactive Live Map Section State
  const [selectedMapItem, setSelectedMapItem] = useState<MapSample>(MAP_SAMPLES[0]);
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [votedMapItems, setVotedMapItems] = useState<Record<string, boolean>>({});

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
    <div className="relative min-h-screen bg-[#FDFEFE] text-slate-800 overflow-x-hidden font-sans selection:bg-blue-500/10 selection:text-blue-600">
      
      {/* Dynamic light grid background pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Mesh Gradients */}
        <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[60%] rounded-full bg-gradient-to-br from-blue-300/20 via-purple-300/10 to-transparent blur-[120px]" />
        <div className="absolute top-[20%] right-[-25%] w-[70%] h-[70%] rounded-full bg-gradient-to-bl from-pink-300/20 via-orange-300/10 to-transparent blur-[130px]" />
        <div className="absolute bottom-[10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-green-300/15 via-blue-200/10 to-transparent blur-[110px]" />

        {/* Crisp grid lines mimicking elegant modern architecture */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(37,99,235,0.05)_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70" />
      </div>

      {/* TOP FLOATING NAVBAR */}
      <header className="sticky top-4 z-50 mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-full px-6 py-3.5 flex items-center justify-between shadow-lg shadow-slate-100/40 relative">
          
          {/* Logo brand */}
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => onNavigate("landing")}>
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2.5 rounded-full text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              City<span className="text-blue-600">GPT</span>
            </span>
          </div>

          {/* Menu Items */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-600">
            <a href="#landing-features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
            <button 
              onClick={() => { onSetRole("citizen"); onNavigate("live_map"); }} 
              className="hover:text-blue-600 transition-colors uppercase tracking-wider font-bold cursor-pointer"
            >
              Live Map
            </button>
            <button 
              onClick={() => { onSetRole("citizen"); onNavigate("ai_assistant"); }} 
              className="hover:text-blue-600 transition-colors uppercase tracking-wider font-bold cursor-pointer"
            >
              AI Assistant
            </button>
            <a href="#city-health" className="hover:text-blue-600 transition-colors">Health Metric</a>
            <a href="#rewards-leaderboard" className="hover:text-blue-600 transition-colors">Rewards</a>
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
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-blue-500/20 hover:scale-103 cursor-pointer"
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50/50 text-blue-700 border border-blue-100 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              ✨ AI Powered Smart City Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-slate-900 leading-tight"
            >
              Building Smarter Cities, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 pb-1">
                Together with AI.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-500 text-sm sm:text-base leading-relaxed font-light max-w-lg"
            >
              Report issues in seconds, track progress in real time and help your city become cleaner, safer and smarter. Powered by high-contrast computer vision, autonomous dispatch, and public utility incentives.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={() => { onSetRole("citizen"); onNavigate("login"); }}
                className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-600/15 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                🚀 Report Issue
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => setDemoOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 rounded-full font-bold text-sm shadow-sm transition-all duration-300 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-slate-700 text-slate-700" />
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
                <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-blue-600">+4k</div>
              </div>
              <p className="text-xs text-slate-400 font-bold tracking-wide">
                Trusted by 5+ cities and over 12,000 citizens.
              </p>
            </motion.div>

          </div>

          {/* RIGHT SIDE FUTURISTIC ISOMETRIC ARTWORK */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Background mesh glow */}
            <div className="absolute w-[450px] h-[450px] bg-blue-200/40 rounded-full blur-[100px] -top-10 -z-10 animate-pulse" />
            <div className="absolute w-[300px] h-[300px] bg-purple-200/30 rounded-full blur-[80px] -bottom-10 -z-10" />

            <div className="relative w-full max-w-lg aspect-[5/4] bg-white rounded-[2rem] p-1.5 border border-slate-200/70 shadow-2xl relative overflow-hidden group">
              
              <div className="relative w-full h-full bg-gradient-to-b from-[#EFF6FF] via-[#EEF2F6] to-[#F0FDF4] rounded-[1.8rem] overflow-hidden p-4 flex items-center justify-center">
                
                {/* SVG Isometric Smart City Layout */}
                <svg className="absolute inset-0 w-full h-full text-slate-300" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid Lines */}
                  <pattern id="smart-grid" width="30" height="15" patternUnits="userSpaceOnUse" patternTransform="rotate(26)">
                    <path d="M 30 0 L 0 0 0 15" fill="none" stroke="rgba(37,99,235,0.06)" strokeWidth="1" />
                  </pattern>
                  <rect width="500" height="400" fill="url(#smart-grid)" />

                  {/* Sun / Solar power background accent */}
                  <circle cx="250" cy="160" r="140" fill="url(#heroSunGlow)" opacity="0.9" />
                  <defs>
                    <radialGradient id="heroSunGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#DBEAFE" />
                      <stop offset="100%" stopColor="#EEF2F6" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Isometric Skyscrapers outlines */}
                  {/* Building 1 (Left) */}
                  <g transform="translate(60, 110)">
                    <path d="M 0 60 L 30 40 L 60 60 L 60 160 L 30 180 L 0 160 Z" fill="#BFDBFE" opacity="0.7" />
                    <path d="M 30 40 L 60 60 L 60 160 L 30 180 Z" fill="#93C5FD" opacity="0.5" />
                    {/* Isometric outline streetlights */}
                    <path d="M 30 40 L 30 180" stroke="#2563EB" strokeWidth="1" opacity="0.30" />
                    <line x1="12" y1="75" x2="25" y2="68" stroke="white" strokeWidth="1.5" />
                    <line x1="12" y1="95" x2="25" y2="88" stroke="white" strokeWidth="1.5" />
                    <line x1="12" y1="115" x2="25" y2="108" stroke="white" strokeWidth="1.5" />
                    <line x1="12" y1="135" x2="25" y2="128" stroke="white" strokeWidth="1.5" />
                  </g>

                  {/* Building 2 (Center Highrise) */}
                  <g transform="translate(180, 50)">
                    <path d="M 0 80 L 40 50 L 80 80 L 80 230 L 40 260 L 0 230 Z" fill="#93C5FD" opacity="0.75" />
                    <path d="M 40 50 L 80 80 L 80 230 L 40 260 Z" fill="#60A5FA" opacity="0.6" />
                    <path d="M 40 50 L 40 260" stroke="#1E40AF" strokeWidth="1.5" opacity="0.25" />
                    {/* Windows on side */}
                    <circle cx="20" cy="95" r="2.5" fill="white" />
                    <circle cx="20" cy="115" r="2.5" fill="white" />
                    <circle cx="20" cy="135" r="2.5" fill="white" />
                    <circle cx="20" cy="155" r="2.5" fill="white" />
                    <circle cx="20" cy="175" r="2.5" fill="white" />
                    <circle cx="60" cy="110" r="2" fill="white" opacity="0.9" />
                    <circle cx="60" cy="130" r="2" fill="white" opacity="0.9" />
                    <circle cx="60" cy="150" r="2" fill="white" opacity="0.9" />
                    <circle cx="60" cy="170" r="2" fill="white" opacity="0.9" />
                  </g>

                  {/* Building 3 (Eco-Glass Tower Right) */}
                  <g transform="translate(320, 80)">
                    <path d="M 0 70 L 35 45 L 70 70 L 70 200 L 35 220 L 0 200 Z" fill="#A7F3D0" opacity="0.6" />
                    <path d="M 35 45 L 70 70 L 70 200 L 35 220 Z" fill="#6EE7B7" opacity="0.5" />
                    <path d="M 35 45 L 35 220" stroke="#047857" strokeWidth="1" opacity="0.30" />
                    <line x1="15" y1="90" x2="30" y2="82" stroke="white" strokeWidth="2" />
                    <line x1="15" y1="120" x2="30" y2="112" stroke="white" strokeWidth="2" />
                    <line x1="15" y1="150" x2="30" y2="142" stroke="white" strokeWidth="2" />
                  </g>

                  {/* Curved smart roads */}
                  <path d="M 0 320 C 150 280, 250 290, 500 350" stroke="#94A3B8" strokeWidth="22" fill="none" opacity="0.9" />
                  <path d="M 0 320 C 150 280, 250 290, 500 350" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="6 6" fill="none" />
                  
                  {/* Highspeed Metro train route curving on top piers */}
                  <path d="M 0 260 Q 250 210, 500 280" stroke="rgba(37,99,235,0.4)" strokeWidth="8" fill="none" />
                  <path d="M 0 260 Q 250 210, 500 280" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />

                  {/* Drones flying in airspace */}
                  <g transform="translate(130, 130)">
                    <ellipse cx="15" cy="15" rx="12" ry="5" fill="#3D4E64" />
                    <line x1="3" y1="15" x2="27" y2="15" stroke="#3D4E64" strokeWidth="1.5" />
                    <circle cx="3" cy="11" r="2.5" fill="#38BDF8" />
                    <circle cx="27" cy="11" r="2.5" fill="#38BDF8" />
                  </g>
                  
                  <g transform="translate(380, 110)">
                    <ellipse cx="12" cy="12" rx="10" ry="4" fill="#374151" />
                    <line x1="2" y1="12" x2="22" y2="12" stroke="#4B5563" strokeWidth="1" />
                    <circle cx="22" cy="9" r="2" fill="#E11D48 animate-pulse" />
                  </g>

                  {/* Small vector Cars on Roads */}
                  <g transform="translate(80, 300)">
                    <rect x="0" y="0" width="16" height="8" rx="2.5" fill="#EF4444" />
                    <circle cx="4" cy="8" r="1.8" fill="#1E293B" />
                    <circle cx="12" cy="8" r="1.8" fill="#1E293B" />
                  </g>
                  <g transform="translate(340, 318)">
                    <rect x="0" y="0" width="18" height="8" rx="2.5" fill="#2563EB" />
                    <circle cx="4" cy="8" r="1.8" fill="#1E293B" />
                    <circle cx="14" cy="8" r="1.8" fill="#1E293B" />
                  </g>

                  {/* Tiny isometric trees and characters walking */}
                  {/* Trees */}
                  <circle cx="30" cy="350" r="7" fill="#10B981" />
                  <circle cx="35" cy="345" r="5" fill="#047857" />
                  <circle cx="140" cy="330" r="8" fill="#10B981" />
                  <circle cx="450" cy="370" r="9" fill="#10B981" />

                  {/* People walking */}
                  <circle cx="280" cy="315" r="2.5" fill="#475569" />
                  <line x1="280" y1="317" x2="280" y2="323" stroke="#475569" strokeWidth="1" />
                  
                  <circle cx="295" cy="318" r="2.5" fill="#EC4899" />
                  <line x1="295" y1="320" x2="295" y2="326" stroke="#EC4899" strokeWidth="1" />

                  {/* Pin Drop Wave Rings */}
                  <g transform="translate(250, 240)">
                    <circle cx="0" cy="0" r="12" fill="none" stroke="#2563EB" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                    <circle cx="0" cy="0" r="5" fill="#2563EB" />
                  </g>
                </svg>

                {/* Floating Dynamic AI Cards */}
                {/* Float Card 1 */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur border border-slate-200 p-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg shadow-slate-200/50 hover:scale-105 transition-transform duration-300">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <Radio className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-mono font-bold uppercase">💧 Water Leak</p>
                    <p className="text-[11px] font-black text-slate-900">Priority High</p>
                  </div>
                </div>

                {/* Float Card 2 */}
                <div className="absolute bottom-16 right-4 bg-white/90 backdrop-blur border border-slate-200 p-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg shadow-slate-200/50 hover:scale-105 transition-transform duration-300">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-mono font-bold uppercase">🚮 Garbage Overflow</p>
                    <p className="text-[11px] font-black text-slate-900">Team Assigned</p>
                  </div>
                </div>

                {/* Float Card 3 */}
                <div className="absolute top-1/3 right-6 bg-white/90 backdrop-blur border border-slate-200 p-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg shadow-slate-200/50 hover:scale-105 transition-transform duration-300">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-mono font-bold uppercase">💡 Street Light</p>
                    <p className="text-[11px] font-black text-emerald-600">Resolved</p>
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
          <div className="bg-white rounded-[2rem] border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col items-start gap-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-bl-full" />
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black font-display text-slate-900">2,450+</p>
              <h3 className="text-sm font-extrabold text-slate-700 mt-0.5">Issues Solved</h3>
              <p className="text-xs text-slate-400 mt-2 font-light">Direct repair actions performed and archived.</p>
            </div>
          </div>

          {/* Green Stat Card */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col items-start gap-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-100/30 to-transparent rounded-bl-full" />
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black font-display text-emerald-600">95%</p>
              <h3 className="text-sm font-extrabold text-slate-700 mt-0.5">Citizen Satisfaction</h3>
              <p className="text-xs text-slate-400 mt-2 font-light">High approval collected via automated polls.</p>
            </div>
          </div>

          {/* Purple Stat Card */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col items-start gap-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-100/30 to-transparent rounded-bl-full" />
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black font-display text-slate-900">18</p>
              <h3 className="text-sm font-extrabold text-slate-700 mt-0.5">Active Teams</h3>
              <p className="text-xs text-slate-400 mt-2 font-light">Specialist crews actively on patrol zones.</p>
            </div>
          </div>

          {/* Orange Stat Card */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col items-start gap-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-100/30 to-transparent rounded-bl-full" />
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black font-display text-slate-900">30 min</p>
              <h3 className="text-sm font-extrabold text-slate-700 mt-0.5">Average Response Time</h3>
              <p className="text-xs text-slate-400 mt-2 font-light">Fastest response envelope compared to peer states.</p>
            </div>
          </div>

        </div>
      </section>

      {/* TRUSTED BY CITIES */}
      <section className="bg-slate-50/50 border-y border-slate-100 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Helping cities become proactive, not reactive.
          </p>
          {/* Logo cloud */}
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 mt-8">
            {["Bhopal", "Indore", "Delhi", "Pune", "Bangalore"].map((city, idx) => (
              <div key={idx} className="flex items-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                <Building2 className="w-4.5 h-4.5 text-blue-600" />
                <span className="text-lg font-extrabold tracking-tight text-slate-800 font-display">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 relative z-10 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold font-mono tracking-widest text-blue-600 uppercase mb-2">Automated Pipeling</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">Seamless Problem-Solving</h3>
          <p className="text-slate-500 text-xs sm:text-sm font-light mt-2.5">
            Four simple steps. Zero bureaucracy. Just snap, analyze, and dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* STEP 1 */}
          <div className="bg-white p-6.5 rounded-[2rem] border border-slate-200 shadow-sm relative group flex flex-col items-center text-center gap-4 transition-all hover:shadow-lg">
            <span className="absolute top-4 left-4 text-xs font-mono font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">01</span>
            <div className="w-14 h-14 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
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
          <div className="bg-white p-6.5 rounded-[2rem] border border-slate-200 shadow-sm relative group flex flex-col items-center text-center gap-4 transition-all hover:shadow-lg">
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
          <div className="bg-white p-6.5 rounded-[2rem] border border-slate-200 shadow-sm relative group flex flex-col items-center text-center gap-4 transition-all hover:shadow-lg">
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
          <div className="bg-white p-6.5 rounded-[2rem] border border-slate-200 shadow-sm relative group flex flex-col items-center text-center gap-4 transition-all hover:shadow-lg">
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
      <section id="landing-features" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-slate-100 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold font-mono tracking-widest text-[#10B981] uppercase mb-2">Platform Features Area</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">Modular Bento Framework</h3>
          <p className="text-slate-500 text-xs sm:text-sm font-light mt-2.5">
            Dribbble-quality SaaS architecture featuring six high-fidelity modules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* BENTO CARD 1: AI DETECTION */}
          <div className="md:col-span-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-[2rem] p-8 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group flex flex-col justify-between min-h-[280px]">
            <div className="absolute top-[-30px] right-[-30px] w-52 h-52 bg-white/10 rounded-full blur-xl group-hover:scale-110 transition-transform" />
            <div className="flex justify-between items-start">
              <div className="p-4 bg-white/20 border border-white/20 rounded-2xl text-white">
                <Brain className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-white/15 px-3 py-1 rounded-full border border-white/10">Computer Vision Core</span>
            </div>
            <div className="mt-8">
              <h4 className="text-2xl font-extrabold tracking-tight">🤖 AI Detection</h4>
              <p className="text-xs font-light text-blue-105/90 text-blue-100 mt-2.5 leading-relaxed max-w-md">
                Instantly classify raw photos of garbage, damaged light transformers, or pipe leaks. Computer vision saves municipal offices hundreds of manual triage hours.
              </p>
            </div>
          </div>

          {/* BENTO CARD 2: LIVE TRACKING */}
          <div className="md:col-span-4 bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group flex flex-col justify-between min-h-[280px]">
            <div className="absolute bottom-[-10px] right-[-10px] w-36 h-36 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center opacity-50 group-hover:scale-105 transition-transform" />
            <div className="p-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl w-fit">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-800">🗺 Live Tracking</h4>
              <p className="text-xs font-light text-slate-500 mt-2 leading-relaxed">
                Audit dispatch vectors, ETAs, and assigned crew ids on an active client GIS canvas seamlessly.
              </p>
            </div>
          </div>

          {/* BENTO CARD 3: PREDICTIVE AI */}
          <div className="md:col-span-4 bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group flex flex-col justify-between min-h-[280px]">
            <div className="p-4 bg-amber-50 text-amber-600 border border-amber-100 rounded-2xl w-fit">
              <Activity className="w-6 h-6 font-bold" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-800">📊 Predictive AI</h4>
              <p className="text-xs font-light text-slate-500 mt-2 leading-relaxed">
                Utilize deep temporal layers to anticipate main pipelines fatigue or sewer grid backlogs before outages.
              </p>
            </div>
          </div>

          {/* BENTO CARD 4: MULTILINGUAL CHAT */}
          <div className="md:col-span-8 bg-gradient-to-br from-[#10B981] to-[#047857] text-white rounded-[2rem] p-8 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group flex flex-col justify-between min-h-[280px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-full" />
            <div className="flex justify-between items-start">
              <div className="p-4 bg-white/20 border border-white/10 rounded-2xl text-white">
                <Globe className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">NLP Localization Engine</span>
            </div>
            <div className="mt-8">
              <h4 className="text-2xl font-extrabold tracking-tight">🌐 Multilingual AI</h4>
              <p className="text-xs font-light text-emerald-100 mt-2.5 leading-relaxed max-w-sm">
                Chat or speak recordings in Hindi, English, and regional dialects. NLP engines process spoken sentences to automatically compile complaints without friction.
              </p>
            </div>
          </div>

          {/* BENTO CARD 5: SMART ASSIGNMENT */}
          <div className="md:col-span-6 bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group flex flex-col justify-between min-h-[280px]">
            <div className="p-4 bg-purple-50 text-purple-600 border border-purple-100 rounded-2xl w-fit animate-pulse">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-800">⚡ Smart Assignment</h4>
              <p className="text-xs font-light text-slate-500 mt-2 leading-relaxed">
                Eliminate manual municipal desk routing. Incidents are categorized and dispatched autonomously to active neighborhood depots based on load and distance filters.
              </p>
            </div>
          </div>

          {/* BENTO CARD 6: TROPHY REWARDS */}
          <div className="md:col-span-6 bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group flex flex-col justify-between min-h-[280px]">
            <div className="p-4 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl w-fit">
              <Trophy className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-800">🏆 Civic Rewards</h4>
              <p className="text-xs font-light text-slate-500 mt-2 leading-relaxed">
                Accrue dynamic utility deduction point buffers ("Green Credits") with every resolved filing. Deduct water or electricity bills easily in the profile workspace.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* PREDICTIVE AI DIAGNOSTICS DEEP SECTION */}
      <section className="bg-slate-900 text-white py-20 md:py-28 relative z-10 overflow-hidden rounded-[3rem] mx-4 sm:mx-6 my-12 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(244,63,94,0.06)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[130px]" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/15 border border-rose-500/30 text-rose-400 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit font-mono">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> Neural Diagnostic Pipeline
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight leading-tight">
              From Reactive Governance <br />
              to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Predictive Governance.</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
              We analyze water canal pressure buffers, pavement degradation telemetry, and local meteorological sensors to calculate risk ratings. This lets the city deploy municipal engineers before severe piping fractures or streetlights black out.
            </p>

            {/* Glowing Analytics Metric Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
              <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
                <span className="block text-xl font-bold text-blue-400">92% accuracy</span>
                <span className="text-slate-400 text-[11px] font-light mt-1 block">In pipeline leakage previews.</span>
              </div>
              <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
                <span className="block text-xl font-bold text-emerald-400">3-day margin</span>
                <span className="text-slate-400 text-[11px] font-light mt-1 block">Pre-emptively warning depots.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center">
            {/* Card Example requested */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-[2.5rem] p-6 w-full max-w-md relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-bl-full" />
              
              <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-rose-600 rounded-full animate-ping" />
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">⚠ Sector 5 Warning</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono font-semibold">Node #DIAG-2051</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-black text-rose-500 font-display">80% Risk Rating</h4>
                  <p className="text-xs text-slate-300 mt-1 font-light leading-relaxed">
                    Detected high pressure anomaly trend in central hydraulic water pipe feeding Avenue 4. Prediction model projects fracture within 15 days.
                  </p>
                </div>

                <div className="p-4 bg-slate-800/40 border border-slate-700/40 rounded-2xl">
                  <p className="text-[11px] font-bold text-slate-400 font-mono uppercase tracking-wide">Suggested Pre-emptive Action:</p>
                  <p className="text-xs text-slate-200 mt-1.5 font-light">
                    Schedule crew maintenance of pressure release node Ward 5 within 48 hours to secure structural pipeline equilibrium.
                  </p>
                </div>

                {/* Simulated Graph Vector */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono mb-1">
                    <span>SENSOR VOLTS (DAILY)</span>
                    <span className="text-rose-400 font-bold">CRITICAL TREND</span>
                  </div>
                  <div className="w-full bg-slate-900 h-11 border border-slate-800 rounded-lg flex items-end p-1 gap-1 justify-between">
                    <div className="bg-slate-800 w-full h-[20%] rounded" />
                    <div className="bg-slate-800 w-full h-[30%] rounded" />
                    <div className="bg-slate-800 w-full h-[25%] rounded" />
                    <div className="bg-slate-800 w-full h-[45%] rounded" />
                    <div className="bg-rose-500 w-full h-[70%] rounded animate-pulse" />
                    <div className="bg-rose-600 w-full h-[85%] rounded animate-pulse" />
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono border-t border-slate-800 pt-3">
                  <span>METRIC SCORE SECURED</span>
                  <span className="text-emerald-500 font-bold">STATUS ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* **LIVE CITY MAP SECTION - PREMIUM GOOGLE MAPS STYLE INTERACTIVE WIDGET** */}
      <section className="bg-white py-16 px-4 sm:px-6 relative z-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold font-mono tracking-widest text-blue-600 uppercase mb-2">TELEMETRY PREVIEW</h2>
            <h3 className="text-3xl font-extrabold font-display text-slate-900">Live Active Incident Map Preview</h3>
            <p className="text-slate-500 text-xs sm:text-sm font-light mt-2">
              Filter by priorities, click map coordinates, and inspect active dispatch logs right from our landing page portal.
            </p>
          </div>

          <div className="bg-[#FAFBFD] border border-slate-200 rounded-[2.5rem] p-1.5 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Interactive map visualization canvas */}
            <div className="lg:col-span-8 bg-sky-50 rounded-[2.2rem] h-[450px] relative overflow-hidden flex flex-col justify-center items-center p-4">
              
              {/* Map grid */}
              <div className="absolute inset-0 opacity-40" style={{
                backgroundImage: "linear-gradient(rgba(14, 165, 233, 0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(14, 165, 233, 0.08) 1.5px, transparent 1.5px)",
                backgroundSize: "32px 32px"
              }} />

              {/* Vector GIS Overlay Lines */}
              <svg className="absolute inset-0 w-full h-full text-blue-100" viewBox="0 0 600 400" fill="none">
                <path d="M 0 100 Q 250 160, 600 240" stroke="#BAE6FD" strokeWidth="18" fill="none" opacity="0.6" />
                <path d="M 0 100 Q 250 160, 600 240" stroke="#FFF" strokeWidth="2" fill="none" />
                <path d="M 120 0 L 120 400" stroke="#E2E8F0" strokeWidth="10" fill="none" />
                <path d="M 120 0 L 120 400" stroke="#FFF" strokeWidth="4" fill="none" />
                <path d="M 450 0 L 320 400" stroke="#E2E8F0" strokeWidth="10" fill="none" />
                <path d="M 0 320 Q 300 260, 600 340" stroke="#E2E8F0" strokeWidth="12" fill="none" />
                <path d="M 0 320 Q 300 260, 600 340" stroke="#FFF" strokeWidth="6" fill="none" />
              </svg>

              {/* Map Filter Controls Top Bar */}
              <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search active pins (e.g. water, lights, garbage)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/95 backdrop-blur shadow-sm border border-slate-200 rounded-full py-2 pl-9 pr-4 text-xs text-slate-800 outline-none focus:border-blue-500 font-semibold"
                  />
                </div>
                <div className="flex gap-1.5">
                  {["All", "Critical", "High", "Medium", "Resolved"].map((filt) => (
                    <button
                      key={filt}
                      onClick={() => setPriorityFilter(filt)}
                      className={`px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer ${
                        priorityFilter === filt 
                          ? "bg-blue-600 text-white" 
                          : "bg-white/95 text-slate-600 hover:bg-slate-50 border border-slate-200"
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
                  item.priority === "Medium" ? "bg-blue-500 border-white" :
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
                      isSelected ? "scale-140 ring-4 ring-blue-100" : "scale-100"
                    }`}>
                      <MapPin className="w-3.5 h-3.5" />
                    </div>

                    <span className="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.id} (Click)
                    </span>
                  </button>
                );
              })}

              <div className="absolute bottom-3 left-4 bg-white/95 backdrop-blur p-2.5 rounded-xl border border-slate-200 text-[10px] font-bold text-slate-500 flex items-center gap-2 shadow-sm z-30 font-mono">
                <SpinnerBadge /> Interactive Mock Sandbox Active
              </div>

              {filteredMapItems.length === 0 && (
                <div className="bg-white/95 backdrop-blur border border-slate-200 p-6 rounded-2xl text-center max-w-xs z-30 shadow">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="font-extrabold text-xs text-slate-800">No active incidents match criteria.</p>
                  <p className="text-[11px] text-slate-500 font-light mt-1">Try changing priority filters or your search string query.</p>
                </div>
              )}

            </div>

            {/* Right side live telemetry inspector panel */}
            <div className="lg:col-span-4 bg-white rounded-r-[2.2rem] border-l border-slate-150 p-6 flex flex-col justify-between h-[450px]">
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                    Live Telemetry Core
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 font-bold">{selectedMapItem.id}</span>
                </div>

                <div className="w-full h-28 rounded-2xl bg-slate-50 border border-slate-150 overflow-hidden relative mb-4">
                  <img src={selectedMapItem.imageUrl} alt={selectedMapItem.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-2 left-2 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full text-white shadow-sm ${
                    selectedMapItem.priority === "Critical" ? "bg-rose-600" :
                    selectedMapItem.priority === "High" ? "bg-orange-500" :
                    selectedMapItem.priority === "Medium" ? "bg-blue-500" :
                    "bg-emerald-600"
                  }`}>
                    {selectedMapItem.priority}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-2">
                  {selectedMapItem.title}
                </h4>

                <div className="space-y-1.5 text-xs text-slate-500 font-light mt-3">
                  <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> <strong>Location:</strong> {selectedMapItem.locationDescription}</p>
                  <p className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" /> <strong>Crew Pool:</strong> {selectedMapItem.assignedTeam}</p>
                  <p className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-slate-400" /> <strong>ETA/Status:</strong> <span className="font-semibold text-blue-600 capitalize">{selectedMapItem.status} ({selectedMapItem.eta})</span></p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button 
                  onClick={() => handleVoteMapItem(selectedMapItem.id)}
                  disabled={votedMapItems[selectedMapItem.id]}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 border rounded-xl text-xs font-bold transition-all ${
                    votedMapItems[selectedMapItem.id] 
                      ? "bg-slate-50 text-slate-400 border-slate-200" 
                      : "bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:scale-102 cursor-pointer"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${votedMapItems[selectedMapItem.id] ? "fill-red-500 text-red-500 animate-pulse" : "text-slate-500"}`} />
                  {votedMapItems[selectedMapItem.id] ? "Voted!" : "Upvote ticket"} ({selectedMapItem.votes})
                </button>
                <button
                  onClick={() => { onSetRole("citizen"); onNavigate("live_map"); }}
                  className="p-2 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow shadow-blue-500/10 cursor-pointer"
                >
                  Open Map →
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CITY HEALTH SCORE SECTION */}
      <section id="city-health" className="bg-[#FAFBFD] py-20 px-4 sm:px-6 relative z-10 border-y border-slate-200/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel breakdown cards */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div>
              <span className="text-xs font-bold font-mono uppercase bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full">Telemetry Diagnostics</span>
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-3 font-display">Grid Health Indices</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-light mt-2.5">
                Composite scoring calculated across public infrastructure pipelines using automated field hardware trackers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HEALTH_BREAKDOWN.map((item, idx) => (
                <div key={idx} className="bg-white p-5 border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-extrabold text-slate-900">{item.name}</span>
                    <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded">{item.score}%</span>
                  </div>
                  {/* Progress Line */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.score}%` }} />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
                    <span>{item.raw}</span>
                    <span className="font-mono font-semibold text-slate-500">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Circular Gauge indicator */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col items-center justify-center text-center max-w-md w-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full" />
              
              <h4 className="text-xs font-bold font-mono tracking-widest text-slate-400 uppercase mb-4">COMPOSITE LIVE INDEX</h4>
              
              {/* Circular SVG Gauge widget */}
              <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#EEF2F6" strokeWidth="8" fill="transparent" />
                  <circle 
                    cx="50" cy="50" r="40" 
                    stroke="url(#metricsGrad)" strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 - (251.2 * cityHealth) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="metricsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Numeric core text */}
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-black text-slate-900 font-display">{cityHealth}</span>
                  <span className="text-[10px] text-emerald-600 font-mono font-bold tracking-wider uppercase">Excellent</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-light mt-2 max-w-xs">
                Excellent Performance. The community grid registers 13% faster clearance cycles than compared legacy manual complaint pipelines.
              </p>

              <button 
                onClick={() => { onSetRole("admin"); onNavigate("login"); }}
                className="w-full mt-6 py-2.5 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-all cursor-pointer"
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
              <span className="text-xs font-bold font-mono uppercase bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1 rounded-full">Citizen Perks Hub</span>
              <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-3 leading-tight flex items-center gap-2">
                <Trophy className="w-8 h-8 text-amber-500 animate-bounce" /> Citizens Leaderboard & Rewards
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-light mt-2.5 leading-relaxed">
                Unlock prestigious, glowing community badges by filing high-accuracy alerts, participating in validation votes, and monitoring municipal grid health. Claim utility tax exemptions easily!
              </p>
            </div>

            <div className="space-y-4">
              {/* Badge 1 */}
              <div className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform flex-shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">🏆 City Guardian Achievement</h4>
                  <p className="text-[11px] text-slate-400 mt-1 font-light">Granted upon reporting 10 high-precision validated incidents within public lines.</p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform flex-shrink-0">
                  <CheckCheck />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">🌱 Eco Hero Achievement</h4>
                  <p className="text-[11px] text-slate-400 mt-1 font-light">Earned for solid waste cleanup logs and zero-waste community filings.</p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform flex-shrink-0">
                  <Award className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">🥇 Smart Citizen Achievement</h4>
                  <p className="text-[11px] text-slate-400 mt-1 font-light">Granted to top ranking individuals on regional monthly metrics charts.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right leaderboard core */}
          <div className="lg:col-span-6">
            <div className="bg-[#FAFBFD] border border-slate-200 rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full" />
              
              <div className="border-b border-slate-200/60 pb-5 mb-5 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-black text-slate-800">Monthly Top Citizens</h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">ZONE SECTOR-4 HIGH PERFORMERS</p>
                </div>
                <span className="text-[10px] font-bold font-mono tracking-wider bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">Live Updates</span>
              </div>

              <div className="space-y-3">
                {LEADERBOARD.map((item, id) => (
                  <div key={id} className="bg-white p-4 border border-slate-200/85 rounded-2xl flex items-center justify-between shadow-sm hover:translate-x-1.5 transition-transform">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center ${
                        item.rank === 1 ? "bg-amber-100 text-amber-700 font-mono" :
                        item.rank === 2 ? "bg-slate-100 text-slate-600 font-mono" :
                        item.rank === 3 ? "bg-orange-100 text-orange-700 font-mono" :
                        "bg-slate-100 text-slate-400 font-mono"
                      }`}>
                        {item.rank}
                      </span>
                      <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover border border-slate-100" />
                      <div>
                        <h5 className="text-xs font-black text-slate-900">{item.name}</h5>
                        <p className="text-[10px] text-slate-400 font-mono">{item.badge}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black font-mono text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">{item.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CITIZEN TESTIMONIALS SECTION */}
      <section className="bg-[#FAFBFD] py-20 px-4 sm:px-6 relative z-10 border-t border-slate-150">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-xl mx-auto mb-14">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold mb-2">CITIZEN FEEDBACKS</h2>
            <h3 className="text-3xl font-extrabold font-display text-slate-900">Voices of the Community</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-150 shadow-sm hover:shadow-lg transition-all text-left relative flex flex-col justify-between">
              <span className="absolute top-6 right-6 text-6xl text-blue-200/30 font-serif font-black">“</span>
              <p className="text-slate-600 text-sm leading-relaxed font-light pt-4 italic">
                "The response time dropped from 3 days to 4 hours. Once I filed a pothole warning, the system automatically dispatched Sector-4 crews, and I tracked them directly on my map."
              </p>
              <div className="flex items-center gap-3.5 mt-6 border-t border-slate-100 pt-4">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=80" alt="Mun officer avatar" className="w-[36px] h-[36px] rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">— Devanshu Roy</h4>
                  <p className="text-[10px] text-slate-400 font-mono font-bold">MUNICIPAL DEPUTY OFFICER</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-150 shadow-sm hover:shadow-lg transition-all text-left relative flex flex-col justify-between">
              <span className="absolute top-6 right-6 text-6xl text-purple-200/30 font-serif font-black">“</span>
              <p className="text-slate-600 text-sm leading-relaxed font-light pt-4 italic">
                "Reporting problems is now incredibly easy and transparent. Being able to track ticket changes in real-time and even earn Green incentives makes me feel like a true stakeholder."
              </p>
              <div className="flex items-center gap-3.5 mt-6 border-t border-slate-100 pt-4">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80" alt="Citizen Avatar" className="w-[36px] h-[36px] rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">— Shreya Iyer</h4>
                  <p className="text-[10px] text-slate-400 font-mono font-semibold">ACTIVE CITIZEN (SECTOR-3)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="landing-faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-20 relative z-10 border-t border-slate-150 scroll-mt-10">
        <div className="text-center mb-12">
          <span className="text-xs font-bold font-mono uppercase bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">KNOWLEDGE BASE</span>
          <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-3">Frequently Asked Questions</h3>
          <p className="text-[11px] text-slate-400 font-mono mt-1 uppercase font-bold">Bridging municipal understanding</p>
        </div>

        {/* Categories toggler */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {["All", "Detection", "Language Compatibility", "Crews & Dispatch", "Rewards"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFaqTab(tab.toLowerCase())}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                activeFaqTab === tab.toLowerCase() ? "bg-blue-600 text-white shadow" : "bg-white text-slate-600 shadow-sm border border-slate-200 hover:bg-slate-50"
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
              className="bg-white border border-slate-200 rounded-[1.8rem] overflow-hidden transition-all shadow-sm"
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-5 flex items-center justify-between font-bold text-sm text-slate-800 hover:text-slate-900 transition-colors cursor-pointer focus:outline-none"
              >
                <span>{faq.q}</span>
                <span className="text-blue-500 font-extrabold text-lg">{faqOpen === index ? "−" : "+"}</span>
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

      {/* FOOTER: FEATURING SKYLINE GRAPHICS & DIRECT ACCESS ROW */}
      <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 relative z-10 text-slate-500 text-xs font-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            
            <div className="md:col-span-4 flex flex-col gap-4">
              <span className="text-xl font-black tracking-tight text-slate-900 font-display">
                City<span className="text-blue-600">GPT</span>
              </span>
              <p className="leading-relaxed">
                Primacy platform for real-time civic grid monitoring, bridging the gap between inhabitants and municipalities via smart computer vision.
              </p>
              <div className="flex gap-3 mt-1">
                <span className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"><Mail size={14} /></span>
                <span className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"><Phone size={14} /></span>
                <span className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"><Radio size={14} /></span>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold text-slate-800 mb-4 font-mono uppercase tracking-wider text-[10px]">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#landing-features" className="hover:text-blue-600 transition-colors text-slate-500">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-blue-600 transition-colors text-slate-500">About Platform</a></li>
                <li>Civic Trust Code</li>
                <li>News & Journal</li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold text-slate-800 mb-4 font-mono uppercase tracking-wider text-[10px]">Resources</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors text-slate-500">GitHub Code ↗</a></li>
                <li>Documentation API</li>
                <li>Municipal Guidelines</li>
                <li>Data Safety Laws</li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold text-slate-800 mb-4 font-mono uppercase tracking-wider text-[10px]">Community</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Green Credit Subsidy</li>
                <li>Citizen Hall of Fame</li>
                <li>Volunteer Groups</li>
                <li>Local Hackathons</li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold text-slate-800 mb-4 font-mono uppercase tracking-wider text-[10px]">Contact Us</h4>
              <ul className="space-y-2 text-slate-500 font-light">
                <li>📍 Ward 3 Head Office</li>
                <li>✉️ support@citygpt.gov</li>
                <li>📞 1-800-CITY-GPT</li>
              </ul>
            </div>

          </div>

          {/* SVG skyline illustration requested for the footer */}
          <div className="w-full h-20 bg-slate-50 border border-slate-200 rounded-[2rem] overflow-hidden relative mb-8 flex items-end">
            <svg className="w-full h-full text-slate-200" viewBox="0 0 1000 80" preserveAspectRatio="none">
              <path d="M 0 80 L 10 70 L 10 50 L 30 50 L 30 70 L 40 65 L 40 40 L 60 40 L 60 65 L 70 70 L 90 70 L 90 30 L 120 30 L 120 70 L 140 70 L 140 45 L 170 45 L 170 70 L 190 70 L 210 20 L 240 20 L 240 70 L 260 70 L 260 50 L 290 50 L 290 70 L 310 70 L 310 10 L 350 10 L 350 70 L 370 70 L 370 40 L 400 40 L 400 70 L 420 70 L 420 55 L 450 55 L 450 70 L 480 70 L 480 35 L 510 35 L 510 70 L 530 70 L 530 45 L 560 45 L 560 70 L 580 70 L 600 20 L 630 20 L 630 70 L 650 70 L 650 48 L 680 48 L 680 70 L 700 70 L 700 30 L 740 30 L 740 70 L 760 70 L 760 50 L 790 50 L 790 70 L 810 70 L 810 15 L 850 15 L 850 70 L 870 70 L 870 40 L 900 40 L 900 70 L 920 70 L 920 55 L 950 55 L 950 70 L 980 70 L 980 35 L 1000 35 L 1000 80 Z" fill="currentColor" opacity="0.6"/>
              <path d="M 0 80 L 20 65 L 20 55 L 45 55 L 45 65 L 65 60 L 65 30 L 95 30 L 95 65 L 115 70 L 135 48 L 165 48 L 165 70 L 185 70 L 185 35 L 215 35 L 215 70 L 235 70 L 235 40 L 265 40 L 265 70 L 285 70 L 305 15 L 345 15 L 345 70 L 365 70 L 365 45 L 395 45 L 395 70 L 415 70 L 445 50 L 475 50 L 475 70 L 495 70 L 515 25 L 545 25 L 545 70 L 565 70 L 585 35 L 615 35 L 615 70 L 635 70 L 665 45 L 695 45 L 695 70 L 715 70 L 735 15 L 775 15 L 775 70 L 795 70 L 815 45 L 845 45 L 845 70 L 865 70 L 885 35 L 915 35 L 915 70 L 935 70 L 965 48 L 995 48 L 995 80 Z" fill="currentColor" opacity="0.4"/>
            </svg>
            <div className="absolute top-2.5 left-6 bg-white/90 border border-slate-200 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400 font-mono flex items-center gap-1">
              🏢 METROPOLITAN INFRASTRUCTURE CONTOUR
            </div>
            <div className="absolute top-2.5 right-6 text-[10px] text-slate-400/80 font-mono font-bold tracking-widest uppercase">
              GRID v4.1 SECURED
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-250/20 text-slate-400 font-medium">
            <p>© 2026 CityGPT Tech Inc. Active telemetry logged under safe private sandbox rules.</p>
            <div className="flex gap-4 font-mono text-[10px] font-bold">
              <button onClick={() => { onSetRole("admin"); onNavigate("login"); }} className="hover:text-blue-600 transition-colors uppercase cursor-pointer">[Admin Bypass]</button>
              <button onClick={() => { onSetRole("worker"); onNavigate("login"); }} className="hover:text-blue-600 transition-colors uppercase cursor-pointer">[Worker Bypass]</button>
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
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white max-w-lg w-full rounded-[2.5rem] p-7 relative shadow-2xl overflow-hidden border border-slate-250"
            >
              <button 
                onClick={() => setDemoOpen(false)}
                className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center py-4">
                <div className="inline-flex p-3 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl mb-4">
                  <Cpu className="w-8 h-8 animate-pulse" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-display">
                  CityGPT Smart Demo Console
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2">
                  Simulating computer vision scanning pipelines on live incident datasets for verification.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl font-mono text-[11px] text-[#10B981] space-y-3.5 leading-relaxed shadow-inner">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold border-b border-neutral-900 pb-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  INITIATING MUNICIPAL COMPLIANCE SCAN...
                </div>
                <p>&gt; Loaded visual classification node #G-4509</p>
                <p>&gt; Scanning garbage heap pixel grid (Ward-3 Alley)...</p>
                <p className="text-blue-400">&gt; AI CONFIDENCE: 99.4% [GARBAGE OVERFLOW DETECTED]</p>
                <p className="text-amber-400">&gt; PRIORITY LEVEL ASSIGNED: HIGH [SAFETY METRIC WARNING]</p>
                <p className="text-purple-400">&gt; WORKER DISPATCH SYSTEM: S-3 Crew alerted automatically.</p>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-[10px] mt-2">
                  CityGPT automatically triggers instant detection pipelines upon submission, bypassing legacy manual desk routing.
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 font-bold text-xs">
                <button 
                  onClick={() => setDemoOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer"
                >
                  Close Console
                </button>
                <button 
                  onClick={() => { setDemoOpen(false); onNavigate("login"); }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
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
    <svg className="animate-spin h-3.5 w-3.5 text-blue-650 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}

function CheckCheck() {
  return (
    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
