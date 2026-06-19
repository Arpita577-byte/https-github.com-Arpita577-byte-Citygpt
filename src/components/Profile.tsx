import React from "react";
import { Award, Zap, Shield, Sparkles, Trophy, Calendar, Check, Mail, User, History, ArrowRight } from "lucide-react";
import { RewardPointInfo, Complaint } from "../types";

interface ProfileProps {
  userName: string;
  userEmail: string;
  rewards: RewardPointInfo | null;
  complaints: Complaint[];
  cityHealthScore: number;
}

export default function Profile({ userName, userEmail, rewards, complaints, cityHealthScore }: ProfileProps) {
  if (!rewards) {
    return (
      <div className="max-w-4xl mx-auto px-6 pt-24 py-16 text-center text-slate-500 font-mono">
        Loading citizen profile credentials...
      </div>
    );
  }

  const renderBadgeIcon = (iconName: string) => {
    if (iconName === "Award") return <Award className="w-5 h-5 text-sky-600" />;
    if (iconName === "TreePine") return <Zap className="w-5 h-5 text-emerald-600" />;
    return <Shield className="w-5 h-5 text-purple-600" />;
  };

  const totalReportsCount = complaints.length;
  const resolvedCount = complaints.filter(c => c.status === "resolved").length;

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-16 text-slate-800 font-sans">
      
      {/* Upper header */}
      <div className="border-b border-slate-100 pb-5 mb-8">
        <span className="text-xs font-bold font-mono uppercase text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
          Digital Twin ID Node
        </span>
        <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 mt-3">
          Citizen Profile & Analytics 👤
        </h2>
        <p className="text-xs text-slate-500 font-normal mt-1.5">
          Verify digital twin credentials, track your community reports, and view active subsidy metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Info & Balance & Badges */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Information CRED Card */}
          <div className="relative bg-gradient-to-br from-[#EFF8FF] via-white to-slate-50 p-6 rounded-[2rem] border border-slate-200 overflow-hidden shadow-lg">
            <div className="absolute top-[-20%] right-[-10%] w-56 h-56 bg-sky-100 rounded-full blur-[70px] pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-sky-100 border border-sky-200 text-sky-700 font-black text-xl flex items-center justify-center shadow-inner">
                  AM
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-1.5 flex-wrap">
                    {userName}
                    <span className="text-[9px] uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                      VERIFIED CITIZEN
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 font-light mt-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> {userEmail}
                  </p>
                </div>
              </div>

              {/* Total Reports Stat Widget */}
              <div className="flex gap-4 border-t sm:border-t-0 border-slate-100 pt-4 sm:pt-0">
                <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-center min-w-[100px] shadow-sm">
                  <span className="block text-[8px] text-slate-450 font-mono uppercase tracking-wider">Total Reports</span>
                  <span className="text-lg font-black text-slate-900">{totalReportsCount}</span>
                </div>
                <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-center min-w-[100px] shadow-sm">
                  <span className="block text-[8px] text-slate-450 font-mono uppercase tracking-wider">Resolved</span>
                  <span className="text-lg font-black text-emerald-600">{resolvedCount}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Points Card */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-250 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative overflow-hidden shadow-sm">
            <div className="flex flex-col gap-1 relative z-10">
              <span className="text-[10px] text-[#0EA5E9] font-mono uppercase tracking-widest font-bold">Accumulated Subsidy Balance</span>
              <p className="text-3xl font-black text-slate-900 mt-2">
                {rewards.totalGreenPoints} Green Points
              </p>
              <div className="text-xs text-slate-500 mt-2 flex items-center gap-1.5 font-light">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
                Saves up to 3.4% of monthly municipal city tax quotas.
              </div>
            </div>

            <div className="h-16 w-16 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100 text-amber-600 shadow-sm relative z-10">
              <Trophy className="w-8 h-8" />
            </div>
          </div>

          {/* Badges unlocked */}
          <div>
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-[#0EA5E9] mb-4 flex items-center gap-1.5">
              Civic Badges Earned
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {rewards.badges.map((b) => (
                <div 
                  key={b.id} 
                  className={`p-5 rounded-2xl border flex flex-col items-center text-center gap-3 relative overflow-hidden transition-all shadow-sm ${
                    b.unlocked 
                      ? "bg-white border-slate-200" 
                      : "bg-slate-50/50 border-slate-150 opacity-40"
                  }`}
                >
                  {b.unlocked && (
                    <span className="absolute top-2.5 right-2.5 bg-emerald-50 border border-emerald-250 rounded-full p-0.5 text-emerald-600">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                  
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    b.unlocked ? "bg-sky-50 border-sky-150" : "bg-slate-50 border-slate-150"
                  }`}>
                    {renderBadgeIcon(b.iconName)}
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{b.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 lines-clamp-2 leading-relaxed font-light">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reward History Logs */}
          <div>
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-[#0EA5E9] mb-4">
              Points Ledger History
            </h3>
            
            <div className="flex flex-col gap-3">
              {rewards.history.map((h) => (
                <div key={h.id} className="bg-white border border-slate-205 p-4 rounded-xl flex items-center justify-between text-xs font-light shadow-sm">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="font-bold text-slate-800">{h.description}</p>
                      <span className="text-[9px] text-slate-400 font-mono">{new Date(h.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <span className="font-bold font-mono text-[#10B981] bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full text-[10px]">
                    +{h.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Competitive Leaderboard & Ranks */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-slate-205 p-6 shadow-sm">
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-[#0EA5E9] mb-6 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500 animate-pulse" /> Leaderboard Rank
            </h3>

            <div className="flex flex-col gap-3.5">
              {rewards.leaderboard.map((user, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 text-xs ${
                  user.isSelf 
                    ? "bg-sky-50 border-sky-300 shadow-md shadow-sky-100" 
                    : "bg-slate-50/40 border-slate-150"
                }`}>
                  
                  <div className="flex items-center gap-3 truncate">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold font-mono text-[10px] ${
                      user.rank === 1 
                        ? "bg-amber-500 text-white" 
                        : user.rank === 2
                        ? "bg-slate-400 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}>
                      #{user.rank}
                    </div>
                    
                    <span className="font-bold text-slate-800 truncate">{user.name}</span>
                  </div>

                  <span className="font-bold font-mono text-slate-500 flex-shrink-0">{user.points} pts</span>

                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-400 font-mono text-center mt-6 leading-relaxed">
              Leaderboards reset monthly.<br />Top 3 active citizens win structural utility subsidies.
            </p>

          </div>
        </div>

      </div>

    </div>
  );
}
