import React, { useState } from "react";
import { motion } from "motion/react";
import { BarChart3, TrendingUp, Cpu, Activity, Users, ShieldAlert, DollarSign, Clock, CheckCircle2, RefreshCw } from "lucide-react";
import { Complaint, Prediction } from "../types";

interface AdminDashboardProps {
  complaints: Complaint[];
  predictions: Prediction[];
  onTriggerPrediction: () => void;
}

export default function AdminDashboard({
  complaints,
  predictions,
  onTriggerPrediction
}: AdminDashboardProps) {

  const [simulatingscan, setSimulatingScan] = useState(false);

  // Compute stats
  const totalCount = complaints.length;
  const criticalCount = complaints.filter(c => c.priority === "high" && c.status !== "resolved").length;
  const activeCount = complaints.filter(c => c.status !== "resolved").length;
  const resolvedCount = complaints.filter(c => c.status === "resolved").length;

  const handleSimulateScan = () => {
    setSimulatingScan(true);
    setTimeout(() => {
      onTriggerPrediction();
      setSimulatingScan(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-slate-800 font-sans">
      
      {/* Header and trigger forecast */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-bold font-mono uppercase bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1 rounded-full">
              Administration Terminal v4.1
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-sky-700 font-mono font-bold">Telemetry Nodes Live</span>
          </div>
          <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 mt-2">
            Metro Administration & Analytics Hub 🏛️
          </h2>
          <p className="text-xs text-slate-500 font-light mt-1">
            Real-time telemetry, predictive maintenance neural layers, and city-wide asset control logs.
          </p>
        </div>

        {/* Trigger prediction recalculation */}
        <button 
          id="admin-btn-scan"
          disabled={simulatingscan}
          onClick={handleSimulateScan}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-bold cursor-pointer transition-all duration-300 disabled:opacity-50 shadow-md"
        >
          <RefreshCw className={`w-4 h-4 ${simulatingscan ? "animate-spin" : ""}`} />
          {simulatingscan ? "Analyzing neural patterns..." : "Trigger AI Predictions Scan"}
        </button>
      </div>

      {/* KPI Core strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* KPI: Active Complaints */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] font-extrabold font-mono uppercase tracking-wider block">Active Complaints</span>
            <Activity className="w-5 h-5 text-sky-600" />
          </div>
          <p className="text-3.5xl font-black font-display text-slate-900 mt-2">{activeCount}</p>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-50 font-semibold">
            <span>Historical resolved: {resolvedCount}</span>
            <span className="text-emerald-600 font-bold">Progress: {((resolvedCount/totalCount)*100 || 0).toFixed(0)}%</span>
          </div>
        </div>

        {/* KPI: Critical Hazards */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] font-extrabold font-mono uppercase tracking-wider block text-rose-600">Critical Priority Issues</span>
            <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
          </div>
          <p className="text-3.5xl font-black font-display text-rose-600 mt-2">{criticalCount}</p>
          <div className="flex items-center justify-between text-[11px] text-slate-550 mt-2 pt-2 border-t border-slate-50 font-bold">
            <span className="font-light">High-threat vector active</span>
            <span className="text-rose-600">Action Required</span>
          </div>
        </div>

        {/* KPI: Dispatch Efficiency */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] font-extrabold font-mono uppercase tracking-wider block">Avg Resolution speed</span>
            <Clock className="w-5 h-5 text-sky-600" />
          </div>
          <p className="text-3.5xl font-black font-display text-slate-900 mt-2">32 Mins</p>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-50 font-semibold">
            <span>Standard target: 45m</span>
            <span className="text-emerald-600 font-bold">-13m threshold</span>
          </div>
        </div>

        {/* KPI: AI Prediction Accuracy */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] font-extrabold font-mono uppercase tracking-wider block">AI Prediction Accuracy</span>
            <Cpu className="w-5 h-5 text-sky-600" />
          </div>
          <p className="text-3.5xl font-black font-display text-slate-900 mt-2">99.4%</p>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-50 font-semibold font-mono">
            <span>Analyzed over 4.5k feeds</span>
            <span className="text-sky-700 font-bold">Deep Learning</span>
          </div>
        </div>

      </div>

      {/* Main Data Split: Interactive Heatmap Grid and AI Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* SVG Live Area Heatmap Visualization */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-sky-700">Live Incident Density Heatmap</h3>
            <span className="text-[10px] text-slate-450 font-bold font-mono">Ward-wise Concentrated Risks</span>
          </div>

          <div className="relative h-80 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 flex justify-center items-center shadow-inner">
            
            {/* Grid base */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
              backgroundImage: "linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }} />

            {/* Custom SVG city borders and thermal nodes overlay */}
            <svg className="absolute inset-0 w-full h-full text-slate-300" viewBox="0 0 500 300">
              {/* Municipal Districts borders */}
              <path d="M 20 40 L 150 20 L 220 120 L 120 180 Z" stroke="rgba(15,23,42,0.12)" strokeWidth="1" fill="rgba(14,165,233,0.02)" />
              <path d="M 150 20 L 350 10 L 380 140 L 220 120 Z" stroke="rgba(15,23,42,0.12)" strokeWidth="1" fill="rgba(16,185,129,0.01)" />
              <path d="M 220 120 L 380 140 L 480 250 L 300 290 L 180 220 Z" stroke="rgba(15,23,42,0.12)" strokeWidth="1" fill="rgba(239,68,68,0.01)" />
              <path d="M 120 180 L 220 120 L 180 220 L 50 280 L 10 180 Z" stroke="rgba(15,23,42,0.12)" strokeWidth="1" fill="none" />
              
              {/* Rivers / major pipelines */}
              <path d="M 0 100 Q 150 150 300 110 T 500 190" stroke="rgba(14,165,233,0.25)" strokeWidth="4.5" fill="none" />
            </svg>

            {/* Simulated Heat nodes */}
            {/* High heat node Ward 3Station area */}
            <div className="absolute top-[130px] left-[260px] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inline-flex h-32 w-32 rounded-full bg-rose-500/10 animate-pulse" />
              <span className="absolute inline-flex h-16 w-16 rounded-full bg-rose-500/15" />
              <span className="relative flex rounded-full h-3.5 w-3.5 bg-rose-600 border border-white shadow-sm" />
              <span className="absolute left-5 top-0 bg-white border border-rose-100 text-[9px] px-2.5 py-0.5 rounded-full font-bold font-mono text-rose-700 shadow-sm whitespace-nowrap">Station Leak Cluster (Critical)</span>
            </div>

            {/* Medium heat node Ward 5 pothole cluster */}
            <div className="absolute top-[60px] left-[110px] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inline-flex h-20 w-20 rounded-full bg-amber-500/10" />
              <span className="relative flex rounded-full h-2.5 w-2.5 bg-amber-500 border border-white shadow-sm" />
              <span className="absolute left-4 top-0 bg-white border border-amber-100 text-[9px] px-2 py-0.5 rounded-full font-bold font-mono text-amber-600 shadow-sm whitespace-nowrap">Pothole Descent</span>
            </div>

            {/* Small safe node */}
            <div className="absolute top-[210px] left-[410px] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inline-flex h-14 w-14 rounded-full bg-emerald-500/10" />
              <span className="relative flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white shadow-sm" />
              <span className="absolute left-4 top-0 bg-white border border-emerald-100 text-[9px] px-2 py-0.5 rounded-full font-bold font-mono text-emerald-600 shadow-sm whitespace-nowrap">Clear Green Status</span>
            </div>

          </div>

          <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="font-medium">Legend: <span className="text-rose-600 font-bold">🔴 Critical</span> Cluster | <span className="text-amber-600 font-bold">🟡 Pending</span> | <span className="text-emerald-600 font-bold">🟢 Solved</span> Sector</span>
            <span className="font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">Sensor Index: 92%</span>
          </div>

        </div>

        {/* AI PREDICTION PAGE & LIST */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-sky-700 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-sky-600 animate-pulse" /> Predictive AI Forecasting
            </h3>
          </div>

          <p className="text-[11px] text-slate-500 font-light mb-4 leading-relaxed">
            Our machine learning core evaluates pipeline pressure indexes, sewage levels, and lightning anomalies to predict critical malfunctions ahead of time.
          </p>

          <div className="flex flex-col gap-4">
            {predictions.map((p) => {
              const border = p.probability > 80 ? "border-rose-100 bg-rose-50/20" : "border-slate-200 bg-slate-50/50";
              const accentColor = p.probability > 80 ? "text-rose-700 bg-rose-50 border-rose-100" : p.probability > 70 ? "text-amber-700 bg-amber-50 border-amber-100" : "text-sky-700 bg-sky-50 border-sky-100";
              
              return (
                <div key={p.id} className={`${border} border rounded-2xl p-4 flex flex-col gap-2 shadow-inner-sm`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-slate-450 uppercase">{p.id} · {p.ward}</span>
                    <span className={`text-[10px] font-bold ${accentColor} border px-2.5 py-0.5 rounded-full font-mono shadow-sm`}>
                      {p.probability}% Risk
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900">{p.title}</h4>
                  <p className="text-[11px] text-slate-600 font-light leading-snug">
                    <strong className="text-slate-800 font-bold">Action:</strong> {p.recommendedAction}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-450 font-bold">
                    <span>Timeline expectation:</span>
                    <span className="font-bold text-sky-700 uppercase font-mono">{p.expectedWithin}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-bold font-mono uppercase block">Proactive governance mode active</span>
          </div>

        </div>

      </div>

      {/* Complaints telemetry review table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 p-6 shadow-sm">
        <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-sky-700 mb-6 border-b border-slate-100 pb-4">
          Integrated Municipal Active Registry
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-150 text-slate-450 uppercase font-mono text-[10px] font-bold tracking-widest">
                <th className="pb-3.5">Ticket ID</th>
                <th className="pb-3.5">Reporting Title</th>
                <th className="pb-3.5">Category</th>
                <th className="pb-3.5">Priority</th>
                <th className="pb-3.5">Assigned Crew</th>
                <th className="pb-3.5">Status</th>
                <th className="pb-3.5">Community Votes</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 font-mono font-bold text-slate-500">{c.id}</td>
                  <td className="py-4 font-extrabold text-slate-950 max-w-sm truncate">{c.title}</td>
                  <td className="py-4 font-mono font-bold capitalize text-sky-700">
                    <span className="bg-slate-100/80 px-2.5 py-1 rounded-full border border-slate-200/50">
                      {c.category}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${c.priority === "high" ? "bg-rose-50 border-rose-100 text-rose-700" : "bg-slate-50 border-slate-150 text-slate-550"}`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="py-4 text-slate-600 font-light">{c.assignedTeam}</td>
                  <td className="py-4 font-mono font-bold capitalize">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] border font-bold ${
                      c.status === "resolved" 
                        ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
                        : c.status === "working"
                        ? "bg-amber-50 border-amber-100 text-amber-700"
                        : "bg-sky-50 border-sky-100 text-sky-700"
                    }`}>
                      {c.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-4 font-mono text-slate-700 font-bold">{c.votes} votes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
