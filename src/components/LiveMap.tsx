import React, { useState } from "react";
import { MapPin, Navigation, Clock, ShieldCheck, AlertTriangle, Users, Compass, ChevronRight, X } from "lucide-react";
import { Complaint } from "../types";

interface LiveMapProps {
  complaints: Complaint[];
  selectedComplaintId?: string | null;
  onCloseMapSelection?: () => void;
}

export default function LiveMap({ complaints, selectedComplaintId, onCloseMapSelection }: LiveMapProps) {
  
  // Selected complaint on the map
  const [selectedComp, setSelectedComp] = useState<Complaint | null>(
    selectedComplaintId ? (complaints.find(c => c.id === selectedComplaintId) || null) : null
  );

  // Before/after toggle slider state per complaint
  const [sliderPercent, setSliderPercent] = useState(50);

  // Focus a specific selected pin if provided by props changes
  React.useEffect(() => {
    if (selectedComplaintId) {
      const found = complaints.find(c => c.id === selectedComplaintId);
      if (found) {
        setSelectedComp(found);
      }
    }
  }, [selectedComplaintId, complaints]);

  // Color mappings for pins
  const getPinColor = (status: string, priority: string) => {
    if (status === "resolved") return "bg-emerald-500 border-white shadow-emerald-200/50";
    if (priority === "high") return "bg-rose-600 border-white shadow-rose-200/50";
    return "bg-amber-500 border-white shadow-amber-200/50";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-slate-800 flex flex-col h-[calc(100vh-80px)] min-h-[600px] font-sans">
      
      {/* Top Banner stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-4">
        <div>
          <span className="text-[10px] font-bold text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
            REAL-TIME TELEMETRY TRACKER
          </span>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-slate-900 flex items-center gap-2">
            <Compass className="w-6 h-6 text-sky-600 animate-spin-slow" strokeWidth={1.5} /> Live Sector GIS Map
          </h2>
          <p className="text-xs text-slate-500 font-light mt-1">
            Real-time vector routing, active reporter dispatches, and public utility crew logs.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm">
          <span className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 bg-rose-600 rounded-full" /> Critical</span>
          <span className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full" /> Medium</span>
          <span className="flex items-center gap-1.5 font-bold"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> Resolved</span>
        </div>
      </div>

      {/* Map Layout splitting into Canvas and Sidebar */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[460px] h-full overflow-hidden">
        
        {/* MAP CANVAS GRID */}
        <div className="lg:col-span-8 bg-slate-50 rounded-[2rem] border border-slate-200 relative overflow-hidden flex flex-col justify-center items-center shadow-inner">
          
          {/* Grid helper */}
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: "linear-gradient(rgba(14, 165, 233, 0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(14, 165, 233, 0.08) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px"
          }} />

          {/* Fake GPS Road Layer SVG */}
          <svg className="absolute inset-0 w-full h-full text-indigo-100/60" viewBox="0 0 600 400">
            {/* Water canal background bar */}
            <path d="M -20 340 c 200 -50, 400 -20, 640 -10" stroke="#BAE6FD" strokeWidth="20" fill="none" opacity="0.6" />
            
            {/* Horizontal express links */}
            <path d="M -20 60 L 620 160" stroke="#E2E8F0" strokeWidth="14" fill="none" />
            <path d="M -20 60 L 620 160" stroke="#FFF" strokeWidth="8" fill="none" />
            
            <path d="M -20 300 Q 200 240 400 320 T 620 280" stroke="#E2E8F0" strokeWidth="10" fill="none" />
            <path d="M -20 300 Q 200 240 400 320 T 620 280" stroke="#FFF" strokeWidth="5" fill="none" />
            
            {/* Vertical corridors */}
            <path d="M 160 -20 L 160 420" stroke="#CBD5E1" strokeWidth="12" fill="none" strokeDasharray="8 6" />
            <path d="M 460 -20 L 360 420" stroke="#E2E8F0" strokeWidth="12" fill="none" />
            <path d="M 460 -20 L 360 420" stroke="#FFF" strokeWidth="6" fill="none" />
            
            <path d="M 300 -20 C 240 100 240 300 360 420" stroke="#E2E8F0" strokeWidth="8" fill="none" />
            <path d="M 300 -20 C 240 100 240 300 360 420" stroke="#FFF" strokeWidth="4" fill="none" />
          </svg>

          {/* Dynamic Interactive Pin placement over SVG stage coordinates */}
          {complaints.map((c) => {
            // Map coordinates to percentage ranges matching sample points
            const relativeY = ((19.09 - c.lat) / (19.09 - 19.05)) * 100;
            const relativeX = ((c.lng - 72.84) / (72.89 - 72.84)) * 100;

            const isSelected = selectedComp?.id === c.id;

            return (
              <button
                key={c.id}
                id={`map-pin-${c.id}`}
                onClick={() => setSelectedComp(c)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform duration-300"
                style={{
                  top: `${relativeY}%`,
                  left: `${relativeX}%`,
                  zIndex: isSelected ? 40 : 20
                }}
              >
                {/* Ping rings for unresolved urgent issues */}
                {c.priority === "high" && c.status !== "resolved" && (
                  <span className="absolute animate-ping inline-flex h-8 w-8 rounded-full bg-rose-500/20 -left-2 -top-2" />
                )}

                <div className={`relative p-2.5 rounded-full border-2 ${getPinColor(c.status, c.priority)} text-white flex items-center justify-center shadow-lg transition-transform ${isSelected ? "scale-140 ring-4 ring-sky-100" : "hover:scale-115"}`}>
                  <MapPin className="w-3.5 h-3.5" />
                </div>

                {/* Minimised subtitle tooltips on hover */}
                <div className="absolute top-11 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {c.id} · {c.category.toUpperCase()}
                </div>
              </button>
            );
          })}

          {/* Map Compass metadata frame indicator */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur border border-slate-200 p-3.5 rounded-2xl text-[10px] font-mono text-slate-500 shadow-md">
            <span className="font-bold text-slate-800 block mb-0.5">METRO WARD DISTRICT: 03</span>
            <span>GPS: ISRO-GZ TELEMETRY</span><br />
            <span className="flex items-center gap-1 mt-1 text-emerald-600 font-bold">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> GRID BUFFER SECURE
            </span>
          </div>

        </div>

        {/* DETAILS SIDEBAR GRID PANEL */}
        <div className="lg:col-span-4 bg-white rounded-[2rem] border border-slate-250 p-6 flex flex-col justify-between overflow-hidden relative shadow-md">
          
          {selectedComp ? (
            <div className="flex flex-col h-full justify-between">
              
              {/* Header block */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100 uppercase">
                      {selectedComp.status.replace("_", " ")}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">ID: {selectedComp.id}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedComp(null);
                      if (onCloseMapSelection) onCloseMapSelection();
                    }}
                    className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-800 rounded-xl cursor-pointer transition-colors border border-slate-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{selectedComp.title}</h3>
                
                {/* Description info */}
                <p className="text-xs text-slate-600 font-light leading-relaxed mt-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-150">
                  {selectedComp.description}
                </p>

                {/* KPI details lists */}
                <div className="grid grid-cols-2 gap-3 mt-4 text-[11px]">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150">
                    <span className="text-[9px] text-slate-400 block uppercase font-mono tracking-wider font-bold">Assigned Responder</span>
                    <strong className="text-slate-800 block truncate mt-0.5 font-bold text-xs">{selectedComp.assignedTeam}</strong>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150">
                    <span className="text-[9px] text-slate-400 block uppercase font-mono tracking-wider font-bold">Completion ETA</span>
                    <strong className="text-sky-600 block mt-0.5 font-bold text-xs">{selectedComp.eta}</strong>
                  </div>
                </div>

                {/* ADVANCED BEFORE / AFTER TELEMETRY SLIDER (Spectacular Premium Touch!) */}
                {selectedComp.status === "resolved" && selectedComp.afterPhoto ? (
                  <div className="mt-5">
                    <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block mb-2">Visual Fix Evidence Verification</span>
                    
                    {/* Sliding frame */}
                    <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-200 select-none shadow">
                      
                      {/* After Photo (Base) */}
                      <img src={selectedComp.afterPhoto} alt="After resolution" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute bottom-2 right-2 text-[9px] font-bold font-mono bg-emerald-600/90 text-white px-2 py-0.5 rounded-full shadow-sm">After Resolution</span>
                      
                      {/* Before Photo (Clamped Overlay) */}
                      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${sliderPercent}%` }}>
                        <img src={selectedComp.beforePhoto} alt="Before damage" className="absolute top-0 left-0 w-full h-full object-cover min-w-[300px]" style={{ width: "300px", height: "100%" }} referrerPolicy="no-referrer" />
                        <span className="absolute bottom-2 left-2 text-[9px] font-bold font-mono bg-rose-600/95 text-white px-2 py-0.5 rounded-full shadow-sm">Before Damage</span>
                      </div>

                      {/* Slider Line handler */}
                      <div className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none" style={{ left: `${sliderPercent}%` }}>
                        <div className="w-7 h-7 bg-white border-2 border-sky-500 rounded-full flex items-center justify-center text-sky-600 text-xs shadow-md font-bold">
                          ↔
                        </div>
                      </div>

                      {/* Invisible range control input */}
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={sliderPercent} 
                        onChange={(e) => setSliderPercent(Number(e.target.value))}
                        className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                      />

                    </div>
                    <p className="text-[10px] text-slate-450 text-center mt-2 font-mono font-bold uppercase tracking-wider">
                      ↔ Slide controller to evaluate repair quality
                    </p>
                  </div>
                ) : (
                  <div className="mt-5">
                    <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Active Hazard Photo
                    </span>
                    <div className="h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                      <img src={selectedComp.beforePhoto || selectedComp.imageUrl} alt="Before incident" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                )}

              </div>

              {/* Work Order Footer dispatcher info */}
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-500" />
                <span className="font-mono">GPS Nodes: <span className="font-bold text-slate-750">{selectedComp.lat.toFixed(4)}, {selectedComp.lng.toFixed(4)}</span></span>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full gap-4 text-slate-450 p-6">
              <div className="w-16 h-16 bg-sky-50 text-sky-600 border border-sky-100 rounded-full flex items-center justify-center mb-1 shadow-inner animate-pulse">
                <Compass className="w-9 h-9" />
              </div>
              <div>
                <p className="font-extrabold text-slate-800 text-sm">No Grid Point Highlighted</p>
                <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed">
                  Tap any colored GPS node marker on the interactive vector map. This will load dispatcher channels, crew telemetry charts, and before/after slider audits.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
