import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, MapPin, Brain, History, Bell, Trophy, Activity, User, 
  AlertCircle, Sparkles, Check, ChevronRight, MessageSquare, Send, Mic, HelpCircle, Eye, ShieldAlert 
} from "lucide-react";
import { Complaint, RewardPointInfo, CityNotification } from "../types";

interface CitizenDashboardProps {
  userName: string;
  userEmail: string;
  complaints: Complaint[];
  rewards: RewardPointInfo | null;
  notifications: CityNotification[];
  cityHealthScore: number;
  onNavigate: (page: string) => void;
  onSosToggle: () => void;
}

export default function CitizenDashboard({
  userName,
  userEmail,
  complaints,
  rewards,
  notifications,
  cityHealthScore,
  onNavigate,
  onSosToggle
}: CitizenDashboardProps) {
  
  // Calculate analytics
  const totalReportsCount = complaints.length;
  const resolvedCount = complaints.filter(c => c.status === "resolved").length;
  const unreadNotifs = notifications.filter(n => !n.read).length;

  // Selected complaint state to feed the detailed right tracker panel!
  const [selectedComplaintId, setSelectedComplaintId] = useState<string>(
    complaints.length > 0 ? complaints[0].id : ""
  );

  // Map point filter category state
  const [mapFilter, setMapFilter] = useState<string>("All");

  // AI Assistant embedded conversational state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Hello Arpita! I am CityGPT Assistant. How can I assist you with municipal grids, outages or report diagnostics today?" }
  ]);

  // Handle embedded chat submit
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    // Simulate smart responses based on keywords in light theme style
    setTimeout(() => {
      let botResponse = "I have queried the digital twin grid repository. Ward-3 reports are operating under high priority. Let me know if you would like me to escalate any pending tickets.";
      const query = userText.toLowerCase();
      if (query.includes("garbage") || query.includes("waste")) {
        botResponse = "There are currently 4 active Garbage Outages in Ward-3. Team 4 is on-site at School Road with a 25-minute ETA.";
      } else if (query.includes("water") || query.includes("leak")) {
        botResponse = "A major water main pressure leakage was flagged near MG Road. Ground acoustic nodes are active. Dispatch dispatched to S-3 plumbers.";
      } else if (query.includes("pothole") || query.includes("road")) {
        botResponse = "Two critical road potholes are listed near Shalimar Bagh. AI computer vision has mapped them; repairs are on the weekend backlog.";
      } else if (query.includes("light") || query.includes("street")) {
        botResponse = "3 continuous black lanes are flagged at Rohini Block C. AI predicted a transformer trip; utility technicians reset is scheduled within 2 hours.";
      }
      setChatMessages(prev => [...prev, { sender: "bot", text: botResponse }]);
    }, 700);
  };

  // Quick suggestion clicks for mini AI Assistant
  const handleQuickAiQuery = (query: string) => {
    setChatMessages(prev => [...prev, { sender: "user", text: query }]);
    setTimeout(() => {
      let response = "Based on GIS telemetry logs, there are 8 open reports active in Delhi North. Your neighborhood satisfaction level stays above 95%.";
      if (query.includes("garbage")) {
        response = "There are 3 open garbage complaints in your immediate ward. Team 4 has already accepted the automated dispatch.";
      }
      setChatMessages(prev => [...prev, { sender: "bot", text: response }]);
    }, 600);
  };

  // Get current active selected complaint
  const activeComplaint = complaints.find(c => c.id === selectedComplaintId) || complaints[0];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-slate-800 font-sans">
      
      {/* 1. Header greeting section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-100 pb-6 mb-8">
        <div>
          <span className="text-[11px] font-bold text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
            MUNICIPAL CONTROL CENTRAL
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            Good Morning, {userName} 👋
          </h1>
          <p className="text-xs text-slate-500 font-normal mt-1">
            Let's make our city better together. Telemetry nodes synchronized.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            id="sos-button-dash"
            onClick={onSosToggle}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-full font-bold text-xs transition-all cursor-pointer animate-pulse shadow-sm"
          >
            <AlertCircle className="w-4 h-4 text-rose-500" />
            SOS EMERGENCY TRIPPED
          </button>
        </div>
      </div>

      {/* 2. Main content split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Performance, Quick Actions, recent listings (8cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Top Bento Panel: City Health & Contributions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* City Health Score Widget */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-250 shadow-md flex items-center justify-between gap-4 relative overflow-hidden group">
              <div className="flex flex-col justify-between h-full gap-5">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Dynamic Performance</span>
                  <h3 className="text-sm font-extrabold text-slate-800 mt-0.5">City Health Score</h3>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-black text-slate-900 font-display">{cityHealthScore}</span>
                  <span className="text-xs text-slate-400 font-mono">/100</span>
                  <span className="ml-2 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase">
                    Excellent
                  </span>
                </div>
              </div>

              {/* Sparkline curve representing city rating trend */}
              <div className="flex flex-col items-end gap-1.5">
                <div className="w-32 h-14 relative">
                  <svg className="w-full h-full" viewBox="0 0 120 40">
                    {/* Linear grid lines */}
                    <line x1="0" y1="30" x2="120" y2="30" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="0" y1="15" x2="120" y2="15" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                    
                    {/* Glowing trendline path */}
                    <path 
                      d="M 5,30 Q 25,25 45,15 T 85,22 T 115,5" 
                      fill="none" 
                      stroke="#10B981" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                    />
                    {/* Dot on active point */}
                    <circle cx="115" cy="5" r="3.5" fill="#10B981" />
                    <circle cx="115" cy="5" r="7" stroke="#10B981" strokeWidth="1.5" fill="none" className="animate-ping" />
                  </svg>
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Mon &gt; Sun Trend</span>
              </div>
            </div>

            {/* Your Contributions Stat Widget */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-250 shadow-md flex items-center justify-between gap-6 relative overflow-hidden">
              <div className="flex flex-col justify-between h-full gap-5">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Your Contributions</span>
                  <h3 className="text-sm font-extrabold text-slate-800 mt-0.5">Community Impact</h3>
                </div>
                <div className="flex gap-4">
                  <div>
                    <span className="block text-2xl font-black text-slate-900 font-display">12</span>
                    <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-wider">Reports</span>
                  </div>
                  <div className="border-r border-slate-200 h-9 my-auto" />
                  <div>
                    <span className="block text-2xl font-black text-amber-500 font-display">340</span>
                    <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-wider">Points</span>
                  </div>
                </div>
              </div>

              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100 text-amber-500 shadow-sm animate-pulse">
                <Trophy className="w-7 h-7" />
              </div>
            </div>

          </div>

          {/* Quick Actions (Grid 2x4 Airbnb Style circular tags) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono mb-4">
              Quick Actions Panel
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Report Issue Action */}
              <button 
                onClick={() => onNavigate("report_issue")}
                className="bg-white hover:bg-slate-50 p-5 rounded-2xl border border-slate-180 hover:border-sky-300 shadow-sm transition-all text-center flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 text-sky-600 flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform shadow-inner">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Report Issue</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight font-light">Dispatches instantly</p>
                </div>
              </button>

              {/* Live Map Action */}
              <button 
                onClick={() => onNavigate("live_map")}
                className="bg-white hover:bg-slate-50 p-5 rounded-2xl border border-slate-180 hover:border-emerald-300 shadow-sm transition-all text-center flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform shadow-inner">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Live Map</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight font-light">Outages & grids</p>
                </div>
              </button>

              {/* AI Assistant Action */}
              <button 
                onClick={() => onNavigate("ai_assistant")}
                className="bg-white hover:bg-slate-50 p-5 rounded-2xl border border-slate-180 hover:border-purple-300 shadow-sm transition-all text-center flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 group-hover:scale-105 transition-transform shadow-inner">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">AI Assistant</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight font-light">CityGPT 24/7 Node</p>
                </div>
              </button>

              {/* My Complaints Action */}
              <button 
                onClick={() => onNavigate("my_reports")}
                className="bg-white hover:bg-slate-50 p-5 rounded-2xl border border-slate-180 hover:border-amber-300 shadow-sm transition-all text-center flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform shadow-inner">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">My Complaints</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight font-light">Status tracking</p>
                </div>
              </button>

              {/* Notifications Action */}
              <button 
                onClick={() => onNavigate("notifications")}
                className="bg-white hover:bg-slate-50 p-5 rounded-2xl border border-slate-180 hover:border-pink-300 shadow-sm transition-all text-center flex flex-col items-center gap-3 cursor-pointer group relative"
              >
                {unreadNotifs > 0 && (
                  <span className="absolute top-4 right-8 bg-rose-500 text-white font-extrabold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                    {unreadNotifs}
                  </span>
                )}
                <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-100 group-hover:scale-105 transition-transform shadow-inner">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Notifications</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight font-light">Broadcast feeds</p>
                </div>
              </button>

              {/* Rewards Action */}
              <button 
                onClick={() => onNavigate("profile")}
                className="bg-white hover:bg-slate-50 p-5 rounded-2xl border border-slate-180 hover:border-yellow-300 shadow-sm transition-all text-center flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center border border-yellow-100 group-hover:scale-105 transition-transform shadow-inner">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Rewards</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight font-light">Badges & Subsidies</p>
                </div>
              </button>

              {/* Statistics Action */}
              <button 
                onClick={() => onNavigate("city_health")}
                className="bg-white hover:bg-slate-50 p-5 rounded-2xl border border-slate-180 hover:border-blue-300 shadow-sm transition-all text-center flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100 group-hover:scale-105 transition-transform shadow-inner">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Statistics</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight font-light">Telemetry metrics</p>
                </div>
              </button>

              {/* Profile Action */}
              <button 
                onClick={() => onNavigate("profile")}
                className="bg-white hover:bg-slate-50 p-5 rounded-2xl border border-slate-180 hover:border-teal-300 shadow-sm transition-all text-center flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-[#E0F2FE] text-sky-800 flex items-center justify-center border border-sky-100 group-hover:scale-105 transition-transform shadow-inner">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">My Profile</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight font-light">Citizen credential</p>
                </div>
              </button>

            </div>
          </div>

          {/* Recent Complaints Feed Section */}
          <div className="bg-white border border-slate-200/80 rounded-[2rem] p-6 shadow-sm">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-5">
              <div>
                <h3 className="text-sm font-bold uppercase font-mono text-slate-500 tracking-wider">Recent Local Complaints</h3>
                <p className="text-[11px] text-slate-400">Click a complaint row to sync life tracking detail timelines on the right.</p>
              </div>
              <button 
                onClick={() => onNavigate("my_reports")}
                className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-0.5 cursor-pointer font-mono"
              >
                View Ledger &gt;
              </button>
            </div>

            {complaints.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center">No active municipal files inside current sector cluster.</p>
            ) : (
              <div className="flex flex-col gap-3.5">
                {complaints.map((c) => {
                  const isSelected = c.id === selectedComplaintId;
                  return (
                    <div 
                      key={c.id} 
                      onClick={() => setSelectedComplaintId(c.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                        isSelected 
                          ? "bg-sky-50/50 border-sky-300 shadow-sm shadow-sky-100" 
                          : "bg-slate-50/40 border-slate-200 hover:bg-slate-50/80"
                      }`}
                    >
                      <div className="flex items-start gap-4 truncate">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 shadow-sm relative">
                          <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-sky-500/10 flex items-center justify-center">
                              <Eye className="w-4 h-4 text-sky-600 bg-white/90 rounded-full p-0.5" />
                            </div>
                          )}
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[9px] font-bold font-mono uppercase bg-slate-100 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                              {c.id}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase font-mono">{c.category}</span>
                            <span className="text-[10px] text-slate-400 font-light">• 25 min ago</span>
                          </div>
                          <h4 className="text-xs font-extrabold text-slate-800 mt-1">{c.title}</h4>
                          <p className="text-[10px] text-slate-500 truncate max-w-[260px] md:max-w-md font-light mt-0.5">{c.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4.5 justify-between md:justify-end w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                        <div className="text-left md:text-right">
                          <span className="block text-[8px] uppercase tracking-wider text-slate-450 font-mono">STAFF ETA</span>
                          <span className="text-xs font-bold text-sky-600 font-mono">{c.eta}</span>
                        </div>
                        <span className={`text-[9px] px-2.5 py-1 font-mono uppercase rounded-full font-bold border ${
                          c.status === "resolved" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                            : c.status === "working" || c.status === "assigned"
                            ? "bg-sky-50 text-sky-700 border-sky-100 animate-pulse"
                            : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}>
                          {c.status === "ai_detected" ? "AI Classified" : c.status}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Be a City Hero Promo Banner (Character flat design) */}
          <div className="bg-gradient-to-r from-sky-550 from-[#E0F2FE] via-[#F0FDF4] to-[#EFF6FF] p-6 rounded-[2rem] border border-sky-100/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            {/* Visual background sky rings */}
            <div className="absolute right-[-10%] top-[-10%] w-48 h-48 bg-emerald-300/10 rounded-full blur-2xl" />
            
            <div className="space-y-1.5 max-w-md z-15">
              <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">
                🏆 Top Contributor Prize
              </div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                Be a City Hero! 🌟
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Report local concerns or verify closed-out repair works. Top active residents are awarded direct utility tax relief at the end of each billing cycle.
              </p>
            </div>

            <button 
              onClick={() => onNavigate("report_issue")}
              className="px-6 py-3 bg-sky-600 hover:bg-sky-550 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-sky-500/15 cursor-pointer flex-shrink-0"
            >
              Raise A Complaint →
            </button>
          </div>

        </div>

        {/* Right Side: Map preview, Issue Details + Timeline, AI chatbot widget (4cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* A. GIS Live City Map preview */}
          <div className="bg-white border border-slate-200/80 rounded-[2rem] p-5 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-extrabold uppercase font-mono text-slate-500">
                Live City Map Preview
              </h3>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            </div>

            {/* Custom simulated map panel */}
            <div className="relative w-full h-44 rounded-2xl bg-slate-50 border border-slate-150 overflow-hidden shadow-inner">
              {/* GIS map vector path graphic */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120" fill="none">
                {/* Roads paths */}
                <path d="M 0 30 Q 80 40 200 20" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
                <path d="M 0 30 Q 80 40 200 20" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
                
                <path d="M 50 0 Q 30 60 70 120" stroke="#CBD5E1" strokeWidth="5" strokeLinecap="round" />
                <path d="M 50 0 Q 30 60 70 120" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />

                <path d="M 140 0 L 160 120" stroke="#CBD5E1" strokeWidth="4" />
                <path d="M 140 0 L 160 120" stroke="#FFF" strokeWidth="2" />

                {/* River block */}
                <path d="M 0 100 Q 100 80 200 95" stroke="#BAE6FD" strokeWidth="8" opacity="0.6" fill="none" />

                {/* Simulated Pins */}
                {/* Pin 1: Active Selected */}
                <g className="animate-bounce">
                  <circle cx="95" cy="55" r="5" fill="#EF4444" />
                  <circle cx="95" cy="55" r="9" stroke="#EF4444" strokeWidth="1" fill="none" opacity="0.5" />
                </g>
                <circle cx="45" cy="40" r="4" fill="#3B82F6" />
                <circle cx="150" cy="45" r="4" fill="#10B981" />
                <circle cx="130" cy="20" r="4" fill="#F59E0B" />
              </svg>

              {/* Floating search layer */}
              <div className="absolute top-2 left-2 right-2 flex items-center bg-white/90 backdrop-blur border border-slate-200 rounded-lg p-1 px-2.5 shadow-sm text-[10px] text-slate-500 gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                <span className="truncate">Near School Road, Delhi...</span>
              </div>

              {/* Grid map pointer icon */}
              <div className="absolute bottom-2 right-2 bg-white rounded-lg p-1 shadow border border-slate-200">
                <Brain className="w-4 h-4 text-sky-600" />
              </div>
            </div>

            {/* Micro map category filter buttons */}
            <div className="flex items-center gap-1 flex-wrap mt-3 border-t border-slate-100 pt-3">
              {["All", "Garbage", "Water Leak", "Pothole", "Lights"].map((cat) => {
                const isActive = mapFilter === cat;
                return (
                  <button 
                    key={cat}
                    onClick={() => setMapFilter(cat)}
                    className={`text-[9px] px-2 py-0.5 rounded-full border transition-all font-bold ${
                      isActive 
                        ? "bg-sky-600 border-sky-600 text-white shadow-sm" 
                        : "bg-slate-50 border-slate-150 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* B. Issue Details Track Timeline Panel (Pristine "Track Your Complaint" panel) */}
          <div className="bg-white border border-slate-200/80 rounded-[2rem] p-5 shadow-sm">
            <h3 className="text-xs font-extrabold uppercase font-mono text-slate-500 mb-3.5">
              Track Your Complaint
            </h3>

            {activeComplaint ? (
              <div className="space-y-4">
                {/* Mini card summary */}
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-150">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                    <img src={activeComplaint.imageUrl} className="w-full h-full object-cover" />
                  </div>
                  <div className="truncate">
                    <span className="text-[8px] font-bold font-mono uppercase text-sky-600">{activeComplaint.id}</span>
                    <h4 className="text-xs font-extrabold text-slate-800 truncate">{activeComplaint.title}</h4>
                    <p className="text-[10px] text-slate-400 capitalize">{activeComplaint.category} • {activeComplaint.eta}</p>
                  </div>
                </div>

                {/* Timeline flow tree */}
                <div className="relative pl-5 space-y-4 border-l border-slate-100 ml-2.5 pt-1 text-[11px]">
                  
                  {/* Step 1 */}
                  <div className="relative">
                    <span className="absolute left-[-26px] top-0 w-3 h-3 bg-emerald-500 rounded-full border border-white" />
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>1. Complaint Submitted</span>
                      <span className="text-[9px] text-slate-400 font-mono">Today, 10:30 AM</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Image metadata coordinates locked.</p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <span className="absolute left-[-26px] top-0 w-3 h-3 bg-emerald-500 rounded-full border border-white" />
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>2. AI Automated Classification</span>
                      <span className="text-[9px] text-slate-400 font-mono">Today, 10:31 AM</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Computer vision diagnosed type & set high priority check.</p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <span className={`absolute left-[-26px] top-0 w-3 h-3 rounded-full border border-white ${
                      activeComplaint.status !== "reported" && activeComplaint.status !== "ai_detected"
                        ? "bg-emerald-500" 
                        : "bg-slate-200"
                    }`} />
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>3. Worker Dispatch Team 4</span>
                      <span className="text-[9px] text-slate-400 font-mono">Today, 10:32 AM</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Assigned autonomously to nearest available vehicle.</p>
                  </div>

                  {/* Step 4 */}
                  <div className="relative">
                    <span className={`absolute left-[-26px] top-0 w-3 h-3 rounded-full border border-white ${
                      activeComplaint.status === "working" || activeComplaint.status === "resolved"
                        ? "bg-emerald-500" 
                        : "bg-slate-200"
                    }`} />
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>4. Maintenance In Progress</span>
                      <span className="text-[9px] text-slate-400 font-mono">Today, 11:20 AM</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Acoustic scan and cleanup is underway.</p>
                  </div>

                  {/* Step 5 */}
                  <div className="relative">
                    <span className={`absolute left-[-26px] top-0 w-3 h-3 rounded-full border border-white ${
                      activeComplaint.status === "resolved" 
                        ? "bg-emerald-500 animate-ping-slow" 
                        : "bg-slate-200"
                    }`} />
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>5. Verified Resolution</span>
                      <span className="text-[9px] text-slate-400 font-mono">Pending verification</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Upload photo of target cleaned spot to submit verification lock.</p>
                  </div>

                </div>

              </div>
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-4">No report highlighted.</p>
            )}
          </div>

          {/* C. CityGPT AI Assistant Embed Chat Container (Miniaturized) */}
          <div className="bg-white border border-slate-200/80 rounded-[2rem] p-5 shadow-sm flex flex-col h-80 justify-between">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <Brain className="w-4.5 h-4.5 text-purple-600 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">CityGPT Assist embedding</span>
              </div>
              <span className="text-[8px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-mono font-bold uppercase">Online</span>
            </div>

            {/* Messages Body */}
            <div className="flex-grow overflow-y-auto space-y-2.5 pr-1 text-[11px] py-1">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-sky-600 text-white rounded-br-none" 
                      : "bg-slate-50 text-slate-700 border border-slate-150 rounded-bl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts options */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 border-t border-slate-100">
              <button 
                onClick={() => handleQuickAiQuery("Show garbage complaints near me")}
                className="text-[9px] px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-full flex-shrink-0 cursor-pointer"
              >
                🗑 Garbage stats?
              </button>
              <button 
                onClick={() => handleQuickAiQuery("How to redeem municipal reward points?")}
                className="text-[9px] px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-full flex-shrink-0 cursor-pointer"
              >
                🏆 Points redemption?
              </button>
            </div>

            {/* Submit chat form */}
            <form onSubmit={handleChatSubmit} className="flex items-center gap-2 mt-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type query in English/Hindi..."
                className="flex-grow py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
              <button 
                type="submit" 
                className="p-2.5 bg-sky-600 hover:bg-sky-550 text-white rounded-xl shadow transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
}
