import React, { useState } from "react";
import { motion } from "motion/react";
import { Shield, Hammer, Users, Lock, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Role } from "../types";

interface LoginPageProps {
  onLogin: (role: Role, email: string) => void;
  onNavigateHome: () => void;
}

export default function LoginPage({ onLogin, onNavigateHome }: LoginPageProps) {
  const [email, setEmail] = useState("arpita@citygpt.gov");
  const [password, setPassword] = useState("citizen123");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<Role>("citizen");

  const handleRoleQuickSelect = (role: Role) => {
    setActiveTab(role);
    if (role === "citizen") {
      setEmail("arpita@citygpt.gov");
      setPassword("citizen123");
    } else if (role === "worker") {
      setEmail("worker.sharma@citygpt.gov");
      setPassword("worker123");
    } else if (role === "admin") {
      setEmail("admin.control@citygpt.gov");
      setPassword("admin123");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(activeTab, email || `${activeTab}@citygpt.gov`);
  };

  const handleGoogleSuccess = () => {
    onLogin(activeTab, email || `${activeTab}@citygpt.gov`);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col justify-center items-center px-4 overflow-hidden py-16 font-sans">
      
      {/* Light accent glowing backdrops */}
      <div className="absolute top-[15%] left-[10%] w-[350px] h-[350px] bg-sky-100/50 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[10%] w-[350px] h-[350px] bg-emerald-100/40 rounded-full blur-[90px] pointer-events-none" />

      {/* Back button */}
      <button 
        onClick={onNavigateHome}
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-all group cursor-pointer z-10 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Landing
      </button>

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-700 border border-sky-100 rounded-full text-xs font-bold tracking-wide uppercase mb-3"
          >
            🌆 CityGPT Municipal Hub
          </motion.div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500 font-light mt-1.5">
            Log in to manage, report, and maintain our smart urban grid.
          </p>
        </div>

        {/* Custom White Elegant Box */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-xl relative overflow-hidden"
        >
          {/* Subtle upper gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-500 via-emerald-400 to-indigo-500" />
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@citygpt.gov"
                  required
                  className="w-full py-3.5 pl-11 pr-4 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-sky-500 text-sm text-slate-800 rounded-2xl focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full py-3.5 pl-11 pr-11 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-sky-500 text-sm text-slate-800 rounded-2xl focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-sky-600 hover:bg-sky-550 text-white font-bold text-sm transition-all transform active:scale-98 shadow-md shadow-sky-500/15 cursor-pointer"
            >
              Sign In to Dashboard
            </button>

            {/* Continue with Google */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-[10px] uppercase font-bold text-slate-400 tracking-wider">or sign in with</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSuccess}
              className="w-full py-3.5 px-4 rounded-2xl bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

          </form>

          {/* Quick Role Fill Controls */}
          <div className="mt-8 pt-6 border-t border-slate-150">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Quick System Roles (Autofill credentials)
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRoleQuickSelect("citizen")}
                className={`py-2 rounded-xl border text-[11px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${activeTab === "citizen" ? "bg-sky-50 border-sky-400 text-sky-600 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-550 hover:bg-slate-100"}`}
              >
                <Users className="w-3.5 h-3.5 text-sky-500" />
                Citizen (Arpita)
              </button>
              
              <button
                type="button"
                onClick={() => handleRoleQuickSelect("worker")}
                className={`py-2 rounded-xl border text-[11px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${activeTab === "worker" ? "bg-emerald-50 border-emerald-400 text-emerald-600 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-550 hover:bg-slate-100"}`}
              >
                <Hammer className="w-3.5 h-3.5 text-emerald-500" />
                Field Worker
              </button>
              
              <button
                type="button"
                onClick={() => handleRoleQuickSelect("admin")}
                className={`py-2 rounded-xl border text-[11px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${activeTab === "admin" ? "bg-purple-50 border-purple-400 text-purple-600 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-550 hover:bg-slate-100"}`}
              >
                <Shield className="w-3.5 h-3.5 text-purple-500" />
                Admin Panel
              </button>
            </div>
          </div>

        </motion.div>

        {/* Footer info lock */}
        <p className="text-center text-[10px] text-slate-400 font-mono mt-6">
          🔒 PUBLIC CRYPTO-BOUND MUNICIPAL GRID CLIENT
        </p>

      </div>
    </div>
  );
}
