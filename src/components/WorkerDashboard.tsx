import React, { useState } from "react";
import { Hammer, MapPin, CheckCircle, Navigation, Upload, ShieldCheck, Clock, Check, Info } from "lucide-react";
import { Complaint } from "../types";

interface WorkerDashboardProps {
  complaints: Complaint[];
  onUpdateStatus: (id: string, status: "reported" | "working" | "resolved", afterImage?: string) => Promise<void>;
  onNavigateMap: (complaint: Complaint) => void;
}

export default function WorkerDashboard({
  complaints,
  onUpdateStatus,
  onNavigateMap
}: WorkerDashboardProps) {

  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [navigatingFor, setNavigatingFor] = useState<string | null>(null);
  const [busyItem, setBusyItem] = useState<string | null>(null);
  const [inspectingTelemetryId, setInspectingTelemetryId] = useState<string | null>(null);

  // Active/Assigned tasks filters (all complains that aren't resolved yet)
  const activeTasks = complaints.filter(c => c.status !== "resolved");
  const completedTasks = complaints.filter(c => c.status === "resolved");

  // Handle local simulation of uploading resolved photo
  const handleSimulateEvidence = async (complaintId: string) => {
    setUploadingFor(complaintId);
    setBusyItem(complaintId);

    // Dynamic mock for after photo
    const afterPhotoMock = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop&q=60";
    
    setTimeout(async () => {
      await onUpdateStatus(complaintId, "resolved", afterPhotoMock);
      setUploadingFor(null);
      setBusyItem(null);
    }, 1200);
  };

  // Handle local simulation of marking 'In Progress' / working
  const handleMarkWorking = async (complaintId: string) => {
    setBusyItem(complaintId);
    await onUpdateStatus(complaintId, "working");
    setBusyItem(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-slate-800 font-sans">
      
      {/* Top Welcome Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
        <div>
          <span className="text-xs font-bold font-mono uppercase bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1 rounded-full">
            Municipal Crew Portal
          </span>
          <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 mt-2.5">
            Welcome back, Crew Commander 🛠️
          </h2>
          <p className="text-xs text-slate-500 font-light mt-1">
            Assigned Zone: Sector 4 / Ward 3 Maintenance Depot.
          </p>
        </div>
        
        {/* Quick KPI stats */}
        <div className="flex items-center gap-4">
          <div className="bg-white p-4 w-28 rounded-2xl border border-slate-200 text-center shadow-sm">
            <span className="block text-2xl font-black text-amber-500">{activeTasks.length}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider font-mono font-bold">Assigned Tasks</span>
          </div>
          <div className="bg-white p-4 w-28 rounded-2xl border border-slate-200 text-center shadow-sm">
            <span className="block text-2xl font-black text-emerald-600">{completedTasks.length}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider font-mono font-bold">Completed Today</span>
          </div>
        </div>
      </div>

      {/* Main active tasks list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Tasks Feed Section */}
        <div className="lg:col-span-8">
          <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-sky-700 bg-sky-50/50 px-3 py-1.5 rounded-full border border-sky-100/50 inline-flex items-center gap-2 mb-6">
            <Hammer className="w-3.5 h-3.5 text-sky-600" /> Assigned Tasks In Queue
          </h3>

          {activeTasks.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-12 text-center flex flex-col items-center gap-4 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <p className="font-extrabold text-slate-800">Zero Pending Incidents!</p>
                <p className="text-xs text-slate-500 font-light mt-1.5">Excellent job. The current municipal sector is fully cleared and restored.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {activeTasks.map((task) => (
                <div key={task.id} className="bg-white rounded-[2.5rem] border border-slate-200 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden shadow-sm group">
                  
                  {/* Status Side Indicator Accent */}
                  <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${task.priority === "high" ? "bg-rose-500 animate-pulse" : "bg-amber-400"}`} />

                  {/* Task Image */}
                  <div className="w-full md:w-40 h-40 bg-slate-50 rounded-2xl overflow-hidden border border-slate-150 flex-shrink-0 relative shadow-inner">
                    {task.imageUrl ? (
                      <img src={task.imageUrl} alt={task.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-mono">
                        No Image
                      </div>
                    )}
                    <span className={`absolute top-2.5 left-2.5 text-[9px] font-extrabold font-mono uppercase tracking-widest px-2 py-0.5 rounded-full text-white shadow-sm ${task.priority === "high" ? "bg-rose-600" : "bg-chip bg-amber-600"}`}>
                      {task.priority}
                    </span>
                  </div>

                  {/* Task Data */}
                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold font-mono uppercase text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                          {task.category}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">ID: {task.id}</span>
                        <span className="flex items-center gap-1.5 text-xs text-amber-600 font-mono font-bold">
                          <Clock className="w-3.5 h-3.5" /> ETA: {task.eta}
                        </span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-950">
                        {task.title}
                      </h4>
                      <p className="text-xs text-slate-600 font-light leading-relaxed mt-1.5">
                        {task.description}
                      </p>
                      
                      {/* Location text coordinates */}
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-3 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono">{task.locationDescription} <span className="text-slate-400 text-[11px]">({task.lat.toFixed(4)}, {task.lng.toFixed(4)})</span></span>
                      </p>
                    </div>

                    {/* Operational Action Buttons Container */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-3.5 border-t border-slate-100">
                      
                      {/* Button Navigate */}
                      <button 
                        id={`worker-btn-nav-${task.id}`}
                        onClick={() => {
                          setNavigatingFor(task.id);
                          onNavigateMap(task);
                          setTimeout(() => setNavigatingFor(null), 1500);
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-300 transform"
                      >
                        <Navigation className={`w-3.5 h-3.5 text-sky-600 ${navigatingFor === task.id ? "animate-spin" : ""}`} />
                        {navigatingFor === task.id ? "Calculating..." : "Navigate Route"}
                      </button>

                      {/* Status Action Workflow (working/assigned states) */}
                      {task.status !== "working" ? (
                        <button 
                          id={`worker-btn-work-${task.id}`}
                          onClick={() => handleMarkWorking(task.id)}
                          disabled={busyItem !== null}
                          className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-100 hover:border-amber-200 rounded-xl text-xs font-bold cursor-pointer transition-all duration-300 disabled:opacity-50"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          Mark: Start Working
                        </button>
                      ) : (
                        <button 
                          id={`worker-btn-resolve-${task.id}`}
                          onClick={() => handleSimulateEvidence(task.id)}
                          disabled={busyItem !== null}
                          className="flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-550 text-white rounded-xl text-xs font-extrabold cursor-pointer transition-all duration-300 animate-pulse shadow-sm"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          {uploadingFor === task.id ? "Uploading Fix..." : "Upload Photo & Solve"}
                        </button>
                      )}

                      {/* Stateful details toggler (replaces native alert popup cleanly) */}
                      <button 
                        onClick={() => setInspectingTelemetryId(inspectingTelemetryId === task.id ? null : task.id)}
                        className="text-xs text-slate-400 hover:text-slate-600 font-mono bg-transparent border-0 cursor-pointer p-2 flex items-center gap-1 ml-auto"
                      >
                        <Info className="w-3 h-3 text-sky-500" />
                        {inspectingTelemetryId === task.id ? "[Hide Specs]" : "[Inspect Specs]"}
                      </button>

                    </div>

                    {/* Expandable Inline Telemetry Specifications Log */}
                    {inspectingTelemetryId === task.id && (
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-[11px] text-slate-600 font-mono mt-1 space-y-1 animate-fadeIn">
                        <p className="text-sky-700 font-bold">📡 CORE MAINTENANCE DISPATCH METRICS</p>
                        <p>· Ticket Reference Node: <span className="text-slate-900 font-bold">{task.id}</span></p>
                        <p>· Pre-dispatch AI Score: <span className="text-slate-900 font-bold">96.4/100 (Unmatched Certainty)</span></p>
                        <p>· Compliance Category Verification: <span className="text-emerald-600 font-bold">PASSED</span></p>
                        <p>· Crew Zone Clearance: <span className="text-slate-500">Sector 4 / Ward 3 Maintenance Depot Depot</span></p>
                        <p className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-200">No further manual dispatch logs need evaluation. Proceed to site & solve.</p>
                      </div>
                    )}

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed History sidebar for Worker */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-700 mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> Solved Today ({completedTasks.length})
            </h3>
            
            {completedTasks.length === 0 ? (
              <p className="text-xs text-slate-400 font-mono leading-relaxed p-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 text-center">No tasks completed yet on this shift.</p>
            ) : (
              <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-1">
                {completedTasks.slice(0, 6).map((task) => (
                  <div key={task.id} className="bg-slate-50 p-4 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1 text-[10px] uppercase font-mono font-bold">
                        <span className="text-emerald-600">RESOLVED</span>
                        <span className="text-slate-400">· {task.id}</span>
                      </div>
                      <p className="font-extrabold text-slate-800 line-clamp-1">{task.title}</p>
                      <span className="text-[10px] text-slate-500 font-mono font-bold">Crews: {task.assignedTeam}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 flex-shrink-0 shadow-sm">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Worker Guidelines card */}
            <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500 font-light flex flex-col gap-2.5 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <span className="font-mono text-[10px] text-sky-700 uppercase tracking-widest font-bold">Incident Rules</span>
              <p className="leading-relaxed">✔ Before starting, set ticket state to <strong className="text-slate-700">"Start Working"</strong> via portal.</p>
              <p className="leading-relaxed">✔ Post-restoration requires clear picture uploads to complete automated visual verification routines.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
