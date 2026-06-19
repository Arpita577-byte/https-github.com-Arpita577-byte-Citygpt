import React, { useState, useEffect } from "react";
import { 
  Building2, MapPin, Brain, History, Bell, Award, 
  Sparkles, MessageSquare, AlertTriangle, Hammer, Shield, 
  Menu, X, CircleDot, Info, Calendar, ChevronRight, Check, Activity,
  Sun, Moon
} from "lucide-react";

import { 
  Complaint, CommunityPost, RewardPointInfo, 
  CityNotification, Role, ChatMessage, ComplaintCategory, Prediction 
} from "./types";

import {
  MOCK_COMPLAINTS,
  MOCK_COMMUNITY_POSTS,
  MOCK_REWARDS,
  MOCK_NOTIFICATIONS,
  MOCK_PREDICTIONS
} from "./mocks";

// Import custom screens
import LandingPage from "./components/LandingPage";
import CitizenDashboard from "./components/CitizenDashboard";
import WorkerDashboard from "./components/WorkerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ReportIssue from "./components/ReportIssue";
import LiveMap from "./components/LiveMap";
import AIAssistant from "./components/AIAssistant";
import Profile from "./components/Profile";
import Sosemergency from "./components/Sosemergency";
import LoginPage from "./components/LoginPage";

export default function App() {
  
  // Actor state tracking: citizen, worker, or administrative official
  const [activeRole, setActiveRole] = useState<Role>("citizen");
  
  // Navigation: landing, dashboard, report_issue, live_map, ai_assistant, my_reports, community, rewards, notifications, city_health
  const [activePage, setActivePage] = useState<string>("landing");
  
  // Database states
  const [complaints, setComplaints] = useState<Complaint[]>(MOCK_COMPLAINTS);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  const [rewards, setRewards] = useState<RewardPointInfo | null>(MOCK_REWARDS);
  const [notifications, setNotifications] = useState<CityNotification[]>(MOCK_NOTIFICATIONS);
  const [predictions, setPredictions] = useState<Prediction[]>(MOCK_PREDICTIONS);
  
  const [bellOpen, setBellOpen] = useState(false);
  const [sosOpen, setSosOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityHealthScore, setCityHealthScore] = useState(91);

  // Focus a specific selected complaint on LiveMap
  const [mapSelectedId, setMapSelectedId] = useState<string | null>(null);

  // Next-Gen Premium Dark/Light theme mode state requested by user
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  // Fetch initial telemetry databases from Express server-side
  const syncTelemetry = async () => {
    try {
      const [cRes, pRes, rRes, nRes, prRes] = await Promise.all([
        fetch("/api/complaints"),
        fetch("/api/community"),
        fetch("/api/rewards"),
        fetch("/api/notifications"),
        fetch("/api/predictions")
      ]);

      if (cRes.ok) setComplaints(await cRes.json());
      if (pRes.ok) setCommunityPosts(await pRes.json());
      if (rRes.ok) setRewards(await rRes.json());
      if (nRes.ok) setNotifications(await nRes.json());
      if (prRes.ok) setPredictions(await prRes.json());
    } catch (err) {
      console.warn("Telemetry fetch: fallback to pre-seeded local mocks", err);
    }
  };

  useEffect(() => {
    syncTelemetry();
    // Intermittent poll to keep dashboards fully cohesive
    const timer = setInterval(syncTelemetry, 6000);
    return () => clearInterval(timer);
  }, []);

  // API Call handlers
  const handleReportIssue = async (payload: {
    title: string;
    description: string;
    category: ComplaintCategory;
    locationDescription: string;
    imageBase64: string | null;
    voiceInput?: string;
  }) => {
    try {
      const res = await fetch("/api/complaints/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      await syncTelemetry();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTaskStatus = async (
    complaintId: string, 
    status: "reported" | "working" | "resolved", 
    afterImage?: string
  ) => {
    try {
      const res = await fetch("/api/worker/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complaintId, status, afterImageBase64: afterImage })
      });
      if (res.ok) {
        await syncTelemetry();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpvotePost = async (id: string) => {
    try {
      const res = await fetch(`/api/community/${id}/vote`, { method: "POST" });
      if (res.ok) {
        await syncTelemetry();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleComposeSocialPost = async (payload: { title: string; description: string; category: ComplaintCategory }) => {
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await syncTelemetry();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTriggerSOS = async (payload: { category: string; lat: number; lng: number }) => {
    try {
      const res = await fetch("/api/sos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      await syncTelemetry();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleTriggerAICredsScan = () => {
    // Simulated prediction scan adds a temporary predictive insight alert
    setNotifications(prev => [
      {
        id: `NOTIF-${Date.now()}`,
        type: "warning",
        title: "Proactive AI pipeline warning",
        message: "Neural analysis completed. Ward 3 water failure risk recalculated from 80% to 85% based on station water leakage. Pre-emptive node support recommended.",
        time: "Just now",
        read: false
      },
      ...prev
    ]);
    alert("Predictive neural layers scan complete. System compiled 3 pipeline and drainage hazards successfully.");
  };

  const handleSendMessageToAI = async (text: string, history: ChatMessage[]) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, chatHistory: history })
    });
    const data = await res.json();
    return data.response;
  };

  const markAllNotificationsRead = async () => {
    try {
      await fetch("/api/notifications/read", { method: "POST" });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  // Navigations route switcher
  const renderActiveScreen = () => {
    if (activePage === "landing") {
      return (
        <LandingPage 
          onNavigate={(page) => setActivePage(page)} 
          onSetRole={(role) => setActiveRole(role)}
          cityHealth={cityHealthScore}
          isDarkMode={theme === "dark"}
          onToggleTheme={toggleTheme}
        />
      );
    }

    if (activePage === "login") {
      return (
        <LoginPage 
          onLogin={(role, email) => {
            setActiveRole(role);
            setActivePage("dashboard");
          }}
          onNavigateHome={() => setActivePage("landing")}
        />
      );
    }

    if (activeRole === "citizen") {
      switch (activePage) {
        case "dashboard":
          return (
            <CitizenDashboard
              userName="Arpita 👋"
              userEmail="mattaarpita04@gmail.com"
              complaints={complaints}
              rewards={rewards}
              notifications={notifications}
              cityHealthScore={cityHealthScore}
              onNavigate={(page) => setActivePage(page)}
              onSosToggle={() => setSosOpen(true)}
            />
          );
        case "report_issue":
          return <ReportIssue onSubmitReport={handleReportIssue} onNavigate={(page) => setActivePage(page)} />;
        case "live_map":
          return (
            <LiveMap 
              complaints={complaints} 
              selectedComplaintId={mapSelectedId} 
              onCloseMapSelection={() => setMapSelectedId(null)} 
            />
          );
        case "ai_assistant":
          return <AIAssistant onSendMessage={handleSendMessageToAI} />;
        case "profile":
        case "rewards":
          return (
            <Profile 
              userName="Arpita Maatta"
              userEmail="mattaarpita04@gmail.com"
              rewards={rewards} 
              complaints={complaints}
              cityHealthScore={cityHealthScore}
            />
          );
        
        case "my_reports":
          // Citizen reports history list showing detailed track timelines
          return (
            <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-slate-800 font-sans">
              <div className="border-b border-slate-200 pb-5 mb-8">
                <span className="text-xs font-bold font-mono uppercase text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  Personal Filing History
                </span>
                <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 mt-3">My Reports History 📜</h2>
                <p className="text-xs text-slate-500 font-light mt-1">Track resolution sequences, assigned crew divisions, and earn dynamic Green rewards.</p>
              </div>

              {complaints.length === 0 ? (
                <div className="text-center py-16 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                  <span className="text-4xl block mb-2">📂</span>
                  <p className="font-bold text-slate-700 text-sm">No reports recorded in current cache.</p>
                  <p className="text-xs text-slate-500 mt-1">File a complaint to get started tracking municipal repair progress.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {complaints.map((c) => (
                    <div key={c.id} className="bg-white rounded-[2.5rem] border border-slate-200 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:border-slate-300 hover:shadow-md transition-all shadow-sm">
                      <div className="w-full md:w-36 h-36 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                        <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="text-[10px] font-bold font-mono uppercase bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                              {c.id}
                            </span>
                            <span className="text-xs text-slate-500 font-semibold capitalize bg-slate-550/5 px-2 py-0.5 rounded-full">Category: {c.category}</span>
                            <span className={`text-[10px] uppercase px-2 py-0.5 border font-mono rounded-full font-bold ${c.priority === "high" ? "bg-rose-50 border-rose-100 text-rose-700" : "bg-slate-50 border-slate-150 text-slate-550"}`}>{c.priority}</span>
                          </div>
                          <h4 className="text-sm font-extrabold text-slate-900">{c.title}</h4>
                          <p className="text-xs text-slate-650 font-light mt-1.5 leading-relaxed">{c.description}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-2 flex items-center gap-1 font-bold">
                            <MapPin className="w-3.5 h-3.5 text-sky-555" /> Location: <span className="text-slate-800 font-light">{c.locationDescription}</span>
                          </p>
                        </div>

                        {/* Tracker sequential timeline */}
                        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-5 text-center text-[10px] text-slate-400 font-bold">
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-4.5 h-4.5 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold font-mono text-[9px] shadow-sm">✓</div>
                            <span className="font-bold text-slate-800">Reported</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-4.5 h-4.5 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold font-mono text-[9px] shadow-sm">✓</div>
                            <span className="font-bold text-slate-800">AI Detected</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-white font-bold font-mono text-[9px] ${c.status !== "reported" && c.status !== "ai_detected" ? "bg-sky-600 shadow-sm" : "bg-slate-100 text-slate-400"}`}>
                              {c.status !== "reported" && c.status !== "ai_detected" ? "✓" : "3"}
                            </div>
                            <span className={c.status !== "reported" && c.status !== "ai_detected" ? "font-bold text-slate-800" : ""}>Assigned</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-white font-bold font-mono text-[9px] ${c.status === "working" || c.status === "resolved" ? "bg-sky-600 shadow-sm" : "bg-slate-100 text-slate-400"}`}>
                              {c.status === "working" || c.status === "resolved" ? "✓" : "4"}
                            </div>
                            <span className={c.status === "working" || c.status === "resolved" ? "font-bold text-slate-800" : ""}>Working</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-white font-bold font-mono text-[9px] ${c.status === "resolved" ? "bg-emerald-500 shadow-sm" : "bg-slate-100 text-slate-400"}`}>
                              {c.status === "resolved" ? "✓" : "5"}
                            </div>
                            <span className={c.status === "resolved" ? "font-bold text-emerald-600" : ""}>Resolved</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

        case "city_health":
          // Deep performance statistics page
          return (
            <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-slate-800 font-sans">
              <div className="border-b border-slate-200 pb-4 mb-8">
                <span className="text-xs font-bold font-mono uppercase text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  Grid diagnostics
                </span>
                <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 mt-3">Grid Status Metrics 📊</h2>
                <p className="text-xs text-slate-500 font-light mt-1 font-mono">Telemetry performance metrics gathered via automated city sensors.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-xs">
                <div className="bg-white p-6 border border-slate-200 rounded-[2rem] flex flex-col gap-2 shadow-sm">
                  <h4 className="font-extrabold text-slate-800 uppercase font-mono text-[10px] text-amber-600">Waste Management: 84%</h4>
                  <p className="text-slate-500 leading-relaxed font-light">Solid waste removal, commercial dumpster emptying intervals, litter sweeps. High density clusters present Ward 3 School strip.</p>
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "84%" }} />
                  </div>
                </div>

                <div className="bg-white p-6 border border-slate-200 rounded-[2rem] flex flex-col gap-2 shadow-sm">
                  <h4 className="font-extrabold text-slate-800 uppercase font-mono text-[10px] text-sky-600">Hydraulic Pipe Grid: 96%</h4>
                  <p className="text-slate-500 leading-relaxed font-light">Municipal pressure networks, main canal filtration, flooded lane drainage channels. Section 4 flyover water leak repair under restoration.</p>
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-sky-500 h-full rounded-full" style={{ width: "96%" }} />
                  </div>
                </div>

                <div className="bg-white p-6 border border-slate-200 rounded-[2rem] flex flex-col gap-2 shadow-sm">
                  <h4 className="font-extrabold text-slate-800 uppercase font-mono text-[10px] text-emerald-600">Pavement Highways: 91%</h4>
                  <p className="text-slate-500 leading-relaxed font-light">Structural asphalt potholes repaired, line markings, flyover descents. Western express way maintenance scheduled.</p>
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "91%" }} />
                  </div>
                </div>

                <div className="bg-white p-6 border border-slate-200 rounded-[2rem] flex flex-col gap-2 shadow-sm">
                  <h4 className="font-extrabold text-slate-800 uppercase font-mono text-[10px] text-purple-600">Electrical Lighting: 88%</h4>
                  <p className="text-slate-500 leading-relaxed font-light">Avenue streetlight nodes operating, transformer burnout parameters, dark lanes resolved. Primary circuit Ward 1 resolved.</p>
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>
              </div>

              <div className="bg-sky-50/60 p-8 rounded-[2.5rem] border border-sky-100 text-center flex flex-col gap-3 shadow-sm">
                <span className="text-xs uppercase font-mono text-sky-700 font-bold">Composite Index Performance</span>
                <p className="text-5xl font-black font-display text-emerald-600">91/100</p>
                <p className="text-slate-655 leading-relaxed max-w-md mx-auto text-xs mt-1 font-light">Excellent Performance Grade. The metro grid operates 13% more efficiently than comparable regional capitals with standard manual complaint pipelines.</p>
              </div>

            </div>
          );

        default:
          return <p className="pt-24 text-center">Screen matching Citizen role failed.</p>;
      }
    }

    if (activeRole === "worker") {
      return (
        <WorkerDashboard 
          complaints={complaints} 
          onUpdateStatus={handleUpdateTaskStatus}
          onNavigateMap={(c) => {
            setMapSelectedId(c.id);
            setActivePage("live_map");
          }} 
        />
      );
    }

    if (activeRole === "admin") {
      return (
        <AdminDashboard 
          complaints={complaints} 
          predictions={predictions} 
          onTriggerPrediction={handleTriggerAICredsScan} 
        />
      );
    }

    return <p className="pt-24 text-center">Unimplemented role match detected.</p>;
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-[#F8FAFC] text-slate-800"}`}>
      
      {/* PERSISTENT LUXURY NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-colors duration-350 px-6 py-4 ${theme === "dark" ? "bg-slate-900/95 border-slate-800/80 text-white" : "bg-white/95 border-slate-200/80 text-slate-800"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => { setActivePage("landing"); setMobileMenuOpen(false); }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className={`text-lg font-extrabold font-display tracking-tight flex items-center gap-1.5 uppercase ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              🌆 CityGPT
            </span>
          </div>

          {/* Desktop Nav Selection Links */}
          <div className="hidden lg:flex items-center gap-6">
            <button onClick={() => setActivePage("landing")} className={`premium-nav-item text-xs font-bold cursor-pointer transition-colors nav-blue ${activePage === "landing" ? "active" : ""} ${theme === "dark" ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>Home</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("dashboard"); }} className={`premium-nav-item text-xs font-bold cursor-pointer transition-colors nav-green ${activePage === "dashboard" ? "active" : ""} ${theme === "dark" ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>Citizen Hub</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("report_issue"); }} className={`premium-nav-item text-xs font-bold cursor-pointer transition-colors nav-orange ${activePage === "report_issue" ? "active" : ""} ${theme === "dark" ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>Report Issue</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("live_map"); }} className={`premium-nav-item text-xs font-bold cursor-pointer transition-colors nav-purple ${activePage === "live_map" ? "active" : ""} ${theme === "dark" ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>Live Map</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("city_health"); }} className={`premium-nav-item text-xs font-bold cursor-pointer transition-colors nav-rose ${activePage === "city_health" ? "active" : ""} ${theme === "dark" ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>Outages & Statistics</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("ai_assistant"); }} className={`premium-nav-item text-xs font-bold cursor-pointer transition-colors nav-yellow ${activePage === "ai_assistant" ? "active" : ""} ${theme === "dark" ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>AI Assistant</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("my_reports"); }} className={`premium-nav-item text-xs font-bold cursor-pointer transition-colors nav-teal ${activePage === "my_reports" ? "active" : ""} ${theme === "dark" ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>My Complaints</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("profile"); }} className={`premium-nav-item text-xs font-bold cursor-pointer transition-colors nav-pink ${activePage === "profile" ? "active" : ""} ${theme === "dark" ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>Profile</button>
          </div>

          {/* DYNAMIC ROLE SELECTOR (SPECTACULAR SEAMLESS TESTING PROTOCOL!) */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Nav role select dropdown selector */}
            <div className={`flex items-center rounded-xl p-1 text-[11px] font-bold gap-1 ${theme === "dark" ? "bg-slate-800 border border-slate-700" : "bg-slate-100 border border-slate-200"}`}>
              <button 
                id="role-btn-citizen"
                onClick={() => { setActiveRole("citizen"); if (activePage === "landing") setActivePage("dashboard"); }}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeRole === "citizen" 
                    ? theme === "dark" 
                      ? "bg-slate-700 border-slate-600 text-sky-400 font-bold shadow-sm" 
                      : "bg-white border-slate-200 text-sky-700 font-bold shadow-sm"
                    : theme === "dark" ? "border-transparent text-slate-400 hover:text-white" : "border-transparent text-slate-550 hover:text-slate-900"
                }`}
              >
                Citizen
              </button>
              <button 
                id="role-btn-worker"
                onClick={() => { setActiveRole("worker"); }}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeRole === "worker" 
                    ? theme === "dark"
                      ? "bg-slate-700 border-slate-600 text-emerald-400 font-bold flex items-center gap-1 shadow-sm"
                      : "bg-white border-slate-200 text-emerald-700 font-bold flex items-center gap-1 shadow-sm"
                    : theme === "dark" ? "border-transparent text-slate-400 hover:text-white" : "border-transparent text-slate-550 hover:text-slate-900"
                }`}
              >
                <Hammer className="w-3.5 h-3.5 text-emerald-400" /> Worker
              </button>
              <button 
                id="role-btn-admin"
                onClick={() => { setActiveRole("admin"); }}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeRole === "admin" 
                    ? theme === "dark"
                      ? "bg-slate-700 border-slate-600 text-purple-400 font-bold shadow-sm"
                      : "bg-white border-slate-200 text-purple-700 font-bold shadow-sm"
                    : theme === "dark" ? "border-transparent text-slate-400 hover:text-white" : "border-transparent text-slate-550 hover:text-slate-900"
                }`}
              >
                Official
              </button>
            </div>

            {/* Notification Alert Bell Badge */}
            <div className="relative">
              <button 
                id="nav-bell-btn"
                onClick={() => { setBellOpen(!bellOpen); if (!bellOpen) markAllNotificationsRead(); }}
                className={`p-3 rounded-xl transition-all cursor-pointer relative shadow-sm border ${
                  theme === "dark" 
                    ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750" 
                    : "bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Bell className="w-4 h-4" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                )}
              </button>

              {/* Notification drop collapse */}
              {bellOpen && (
                <div className={`absolute right-0 mt-2 w-80 rounded-2xl p-4 shadow-xl z-50 flex flex-col gap-3 border ${
                  theme === "dark" ? "bg-slate-900 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-800"
                }`}>
                  <div className={`flex items-center justify-between border-b pb-2 mb-1 ${theme === "dark" ? "border-slate-800" : "border-slate-100"}`}>
                    <span className={`text-[10px] font-bold font-mono uppercase ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Incident Broadcast Stream</span>
                    <button onClick={() => setBellOpen(false)} className="text-[9px] text-slate-400 hover:text-slate-300 font-bold">Close</button>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-[10px] text-slate-400">No telemetry warnings.</p>
                  ) : (
                    <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                      {notifications.map((n) => (
                        <div key={n.id} className={`p-2.5 rounded-xl text-[11px] leading-snug border flex flex-col gap-1 ${
                          theme === "dark" ? "bg-slate-800/80 border-slate-750" : "bg-slate-50 border-slate-150"
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${n.type === "success" ? "bg-emerald-500" : n.type === "emergency" ? "bg-rose-500 animate-pulse" : "bg-indigo-500"}`} />
                            <strong className={`${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>{n.title}</strong>
                          </div>
                          <p className={`${theme === "dark" ? "text-slate-400" : "text-slate-650"} font-light`}>{n.message}</p>
                          <span className="text-[9px] text-slate-400 font-mono mt-0.5">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Next-Gen Premium Dark/Light theme mode switch button */}
            <button 
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all cursor-pointer relative shadow-sm border flex items-center justify-center font-bold gap-1 ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700 hover:scale-105"
                  : "bg-white border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 hover:scale-105"
              }`}
              title={theme === "light" ? "Switch to Cyber Dark Mode" : "Switch to Premium Light Mode"}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-indigo-500" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              )}
            </button>

            {/* Profile Avatar identifier */}
            <div className={`w-10 h-10 font-black flex items-center justify-center rounded-xl cursor-pointer transition-all shadow-sm border ${
              theme === "dark" 
                ? "bg-slate-800 border-slate-700 text-sky-400 hover:bg-slate-750 hover:text-white"
                : "bg-sky-50 text-sky-700 border-sky-100 hover:bg-sky-100"
            }`} onClick={() => setActivePage("profile")}>
              AM
            </div>

          </div>

          {/* Mobile Menu Action trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 cursor-pointer transition-colors ${theme === "dark" ? "text-slate-200 hover:text-white" : "text-slate-400 hover:text-slate-800"}`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </nav>

      {/* MOBILE COLLAPSIBILITY NAVIGATION MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 top-[60px] z-30 backdrop-blur-md flex flex-col p-6 gap-6 lg:hidden border-b overflow-y-auto shadow-lg animate-fade-in ${
          theme === "dark" ? "bg-slate-900/95 text-slate-350 border-slate-800" : "bg-white/95 text-slate-600 border-slate-200"
        }`}>
          
          {/* Main Links */}
          <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-wider">
            <button onClick={() => { setActivePage("landing"); setMobileMenuOpen(false); }} className={`text-left w-full ${theme === "dark" ? "hover:text-white text-slate-200" : "hover:text-slate-950 text-slate-700"}`}>Home Landing</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("dashboard"); setMobileMenuOpen(false); }} className={`text-left w-full ${theme === "dark" ? "hover:text-white text-slate-200" : "hover:text-slate-950 text-slate-700"}`}>Citizen Dashboard</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("report_issue"); setMobileMenuOpen(false); }} className={`text-left w-full ${theme === "dark" ? "hover:text-white text-slate-200" : "hover:text-slate-950 text-slate-700"}`}>Report Issue</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("live_map"); setMobileMenuOpen(false); }} className={`text-left w-full ${theme === "dark" ? "hover:text-white text-slate-200" : "hover:text-slate-950 text-slate-700"}`}>See Live Map</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("ai_assistant"); setMobileMenuOpen(false); }} className={`text-left w-full ${theme === "dark" ? "hover:text-white text-slate-200" : "hover:text-slate-950 text-slate-700"}`}>CityGPT AI Assistant</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("my_reports"); setMobileMenuOpen(false); }} className={`text-left w-full ${theme === "dark" ? "hover:text-white text-slate-200" : "hover:text-slate-955 text-slate-700"}`}>My Complaints</button>
            <button onClick={() => { setActiveRole("citizen"); setActivePage("profile"); setMobileMenuOpen(false); }} className={`text-left w-full ${theme === "dark" ? "hover:text-white text-slate-200" : "hover:text-slate-955 text-slate-700"}`}>Profile Credentials</button>
          </div>

          {/* Quick Role Selectors */}
          <div className={`pt-6 border-t ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3 font-bold">Testing Role simulation</p>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => { setActiveRole("citizen"); setActivePage("dashboard"); setMobileMenuOpen(false); }} className={`py-2 rounded-xl text-xs font-bold ${activeRole === "citizen" ? "bg-sky-650 text-white" : theme === "dark" ? "bg-slate-800 text-slate-300" : "bg-slate-100"}`}>Citizen</button>
              <button onClick={() => { setActiveRole("worker"); setMobileMenuOpen(false); }} className={`py-2 rounded-xl text-xs font-bold ${activeRole === "worker" ? "bg-emerald-650 text-white" : theme === "dark" ? "bg-slate-800 text-slate-300" : "bg-slate-100"}`}>Worker</button>
              <button onClick={() => { setActiveRole("admin"); setMobileMenuOpen(false); }} className={`py-2 rounded-xl text-xs font-bold ${activeRole === "admin" ? "bg-purple-650 text-white" : theme === "dark" ? "bg-slate-800 text-slate-300" : "bg-slate-100"}`}>Official</button>
            </div>
          </div>
        </div>
      )}

      {/* RENDER DYNAMIC SCREEN MODULE STAGE */}
      <main className="flex-grow min-h-screen">
        {renderActiveScreen()}
      </main>

      {/* EMERGENCY SOS RADAR MODAL PANEL */}
      {sosOpen && (
        <Sosemergency 
          onTriggerSos={handleTriggerSOS} 
          onClose={() => setSosOpen(false)} 
        />
      )}

      {/* PERSISTENT STRUCTURAL FOOTER */}
      <footer className={`border-t py-8 relative z-10 font-light transition-colors duration-200 ${
        theme === "dark" ? "bg-slate-900 border-slate-800/80 text-slate-400" : "bg-white border-slate-200 py-8 text-slate-500"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            <span className={`font-bold block ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>© 2026 CityGPT Municipal Network Control</span>
            <span>Real-time Smart City Framework. All node components compiled successfully.</span>
          </div>
          <div className="flex gap-4.5 text-slate-400 font-bold">
            <span className="cursor-pointer hover:text-slate-300">Subsidy Subscriptions</span>
            <span className="cursor-pointer hover:text-slate-300">Telemetry safety rules</span>
            <span className="cursor-pointer hover:text-slate-300">Smart API Licences</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
