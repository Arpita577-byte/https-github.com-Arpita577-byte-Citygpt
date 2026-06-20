import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);

// Express JSON parsing limit increased for base64 images
app.use(express.json({ limit: "15mb" }));

// Lazy init Gemini AI as per SDK best practices
let aiInstance: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Warning: GEMINI_API_KEY environment variable is missing. CityGPT is running in localized AI fallback mode.");
      return null;
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Seed In-Memory Database - allows persistence during session
let complaints = [
  {
    id: "COMP-101",
    category: "waste",
    title: "Garbage Overflow behind Modern Public School",
    description: "Huge pile of trash left uncleared behind the school boundary wall. Attracting stray dogs and children are exposed to bad smell.",
    imageUrl: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&auto=format&fit=crop&q=60",
    beforePhoto: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&auto=format&fit=crop&q=60",
    afterPhoto: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=60",
    priority: "high",
    lat: 19.0760,
    lng: 72.8777,
    locationDescription: "Behind boundary wall, Modern Public School Road, Ward 3",
    assignedTeam: "Zone 3 Sanitation Patrol",
    status: "resolved",
    votes: 45,
    verified: true,
    eta: "Completed (25 min)",
    dateReported: "2026-06-17T14:30:00Z"
  },
  {
    id: "COMP-102",
    category: "water",
    title: "Major Water Pipe Leakage near Railway Station",
    description: "Drinking water pipeline fractured at Sector 4 Junction. Water has been spraying out onto the road for over 6 hours triggering local flood.",
    imageUrl: "https://images.unsplash.com/photo-1542013936693-8848e5744a70?w=600&auto=format&fit=crop&q=60",
    beforePhoto: "https://images.unsplash.com/photo-1542013936693-8848e5744a70?w=600&auto=format&fit=crop&q=60",
    priority: "high",
    lat: 19.0820,
    lng: 72.8810,
    locationDescription: "Under Station Walkway flyover, Ward 3",
    assignedTeam: "Hydraulics Division Ward 3",
    status: "working",
    votes: 82,
    verified: false,
    eta: "45 mins",
    dateReported: "2026-06-18T05:15:00Z"
  },
  {
    id: "COMP-103",
    category: "pothole",
    title: "Dangerous Potholes on Main flyover heading east",
    description: "Two very deep potholes right after the flyover ascent. Cars are sudden braking and dynamic swerving causing near-miss accidents.",
    imageUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=600&auto=format&fit=crop&q=60",
    beforePhoto: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=600&auto=format&fit=crop&q=60",
    priority: "high",
    lat: 19.0680,
    lng: 72.8730,
    locationDescription: "Eastbound lane, Western Expressway Flyover, Ward 5",
    assignedTeam: "Pavement & Road Maintenance Unit 2",
    status: "assigned",
    votes: 110,
    verified: false,
    eta: "2 hrs",
    dateReported: "2026-06-18T06:40:00Z"
  },
  {
    id: "COMP-104",
    category: "lighting",
    title: "Complete Streetlight Failure along Central Avenue",
    description: "Five consecutive poles are dark. The entire stretch has zero visibility, making pedestrians extremely vulnerable.",
    imageUrl: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600&auto=format&fit=crop&q=60",
    beforePhoto: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600&auto=format&fit=crop&q=60",
    priority: "medium",
    lat: 19.0790,
    lng: 72.8655,
    locationDescription: "Central Avenue from Lane 4 intersections, Ward 1",
    assignedTeam: "Municipal Electrical Grid Repair Team",
    status: "reported",
    votes: 12,
    verified: false,
    eta: "5 hrs",
    dateReported: "2026-06-18T07:15:00Z"
  }
];

let communityPosts = [
  {
    id: "POST-001",
    category: "water",
    title: "Water flooded near Station area - please vote to raise priority!",
    description: "It has flooded again! Station access is completely blocked due to the pipe breakage. Please upvote this so the AI routing elevates priority for repair workers.",
    author: "Arpita Maatta",
    imageUrl: "https://images.unsplash.com/photo-1542013936693-8848e5744a70?w=600&auto=format&fit=crop&q=60",
    date: "2026-06-18T05:25:00Z",
    upvotes: 82,
    hasVotedByMe: true,
    complaintId: "COMP-102"
  },
  {
    id: "POST-002",
    category: "pothole",
    title: "Dangerous descent pothole Western Expressway",
    description: "Be careful everyone, especially motorcyclists. Hit it at 40km/h and almost lost balance.",
    author: "Rahul Sharma",
    imageUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=600&auto=format&fit=crop&q=60",
    date: "2026-06-18T06:55:00Z",
    upvotes: 110,
    hasVotedByMe: false,
    complaintId: "COMP-103"
  }
];

// Seed notifications
let notifications = [
  {
    id: "NOTIF-01",
    type: "success",
    title: "Earned 50 Green Points! 🏆",
    message: "Your reported garbage issue COMP-101 has been marked resolved. Before & After verified by AI.",
    time: "2 hours ago",
    read: false
  },
  {
    id: "NOTIF-02",
    type: "warning",
    title: "Urgent: Water pipeline failure Ward 3",
    message: "Hydraulics team has isolated the main node near Station Flyover. Mild pressure loss spans Sector 4.",
    time: "1 hour ago",
    read: false
  }
];

// Green point statistics for logged citizen
let rewardPoints = {
  totalGreenPoints: 450,
  badges: [
    { id: "badge-1", title: "Smart Citizen", iconName: "Award", description: "Reported 5 valid city issues", unlocked: true },
    { id: "badge-2", title: "Eco Hero", iconName: "TreePine", description: "Removed 100kg of localized garbage footprint", unlocked: true },
    { id: "badge-3", title: "City Guardian", iconName: "ShieldAlert", description: "Verified before/after evidence photos", unlocked: false },
  ],
  history: [
    { id: "rw-1", description: "Successful Waste Detection Validation", points: 50, date: "2026-06-18T06:00:00Z" },
    { id: "rw-2", description: "Pothole Verification Upvote", points: 20, date: "2026-06-17T11:00:00Z" },
    { id: "rw-3", description: "Weekly Active Smart citizen streak", points: 100, date: "2026-06-15T09:00:00Z" }
  ],
  leaderboard: [
    { name: "Priya Patel", points: 850, rank: 1 },
    { name: "Arpita Maatta (You)", points: 450, rank: 2, isSelf: true },
    { name: "Rohit Deshmukh", points: 380, rank: 3 },
    { name: "Amit Saini", points: 310, rank: 4 },
    { name: "Suresh Pillai", points: 250, rank: 5 }
  ]
};

// AI Live predictions
const predictions = [
  {
    id: "PRED-1",
    title: "Water Pipeline Rupture Risk",
    ward: "Ward 3",
    probability: 85,
    expectedWithin: "12 Days",
    recommendedAction: "Pre-emptively clamp connection junctions around Sector 4 Water Station.",
    category: "water",
    lat: 19.0760,
    lng: 72.8890
  },
  {
    id: "PRED-2",
    title: "Sewer Blockage Trigger Point",
    ward: "Ward 4",
    probability: 72,
    expectedWithin: "18 Days",
    recommendedAction: "Flush Central Outflow storm drain before onset of localized monsoonal cloudburst.",
    category: "waste",
    lat: 19.0850,
    lng: 72.8680
  },
  {
    id: "PRED-3",
    title: "Streetlight Circuit Burnout",
    ward: "Ward 1",
    probability: 60,
    expectedWithin: "25 Days",
    recommendedAction: "Deploy substation diagnostics team to examine overhead transformer grid.",
    category: "lighting",
    lat: 19.0720,
    lng: 72.8590
  }
];

// --- ⚙️ API ROUTES ⚙️ ---

// 1. Health Status check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", ai_online: getAI() !== null });
});

// 2. Fetch all Complaints
app.get("/api/complaints", (req, res) => {
  res.json(complaints);
});

// 3. Upvote (Community Vote)
app.post("/api/complaints/:id/vote", (req, res) => {
  const { id } = req.params;
  const complaint = complaints.find(c => c.id === id);
  if (complaint) {
    complaint.votes += 1;
    // Also update associated social post if any
    const socialPost = communityPosts.find(p => p.complaintId === id);
    if (socialPost) {
      socialPost.upvotes += 1;
      socialPost.hasVotedByMe = true;
    }
    // Dynamic rule: If standard complaint gathers more than 50 votes, AI elevates priority!
    if (complaint.votes > 50 && complaint.priority !== "high") {
      complaint.priority = "high";
      notifications.unshift({
        id: `NOTIF-${Date.now()}`,
        type: "emergency",
        title: "Priority Elevated by Citizens 🚨",
        message: `Complaint ${complaint.id} ('${complaint.title}') elevated to HIGH priority due to community support notes!`,
        time: "Just now",
        read: false
      });
    }
    res.json({ success: true, complaint });
  } else {
    res.status(404).json({ error: "Complaint not found" });
  }
});

// 4. Report new issue (Auto detect using Gemini if available, otherwise heuristic smart mock!)
app.post("/api/complaints/report", async (req, res) => {
  const { title, description, category, lat, lng, imageBase64, locationDescription, voiceInput } = req.body;
  const ai = getAI();

  let detectedCategory = category || "waste";
  let detectedPriority = "medium";
  let detectedTitle = title || "Reported City Incident";
  let detectedDescription = description || "No added description details provided.";
  let assignedTeam = "Special Municipal Response Force";
  let eta = "3 hours";

  // Use Gemini to structure and diagnose complaints automatically!
  if (ai) {
    try {
      let prompt = `You are a Municipal Civil Intelligence Engine. 
      Analyze this user complaint submission and output a strict JSON structure.
      
      User provided Title: "${title || ''}"
      User provided Description: "${description || ''}"
      User detected Category: "${category || ''}"
      Synthesized Voice conversion notes: "${voiceInput || ''}"
      
      Categorize into one of these strict categories: 'waste', 'water', 'pothole', 'traffic', 'lighting', 'tree', 'animal', 'emergency'.
      Determine priority Level as 'low', 'medium', or 'high'.
      Produce a high quality, human-oriented official title and formal municipal description.
      Assign a plausible expert municipal cleaning team name.
      Provide realistic estimated restoration time (ETA) based on priority.`;

      const contents: any[] = [];
      contents.push({ text: prompt });

      // If user provided a base64 camera photo, send it to Gemini for real visual inspection!
      if (imageBase64) {
        // Strip data prefix if existing
        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        contents.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Data
          }
        });
      }

      const geminiResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING, description: "Category string MUST be one of waste, water, pothole, traffic, lighting, tree, animal, emergency" },
              priority: { type: Type.STRING, description: "One of: low, medium, high" },
              title: { type: Type.STRING, description: "Polished clean formal title of the incident" },
              description: { type: Type.STRING, description: "Formal technical description of the hazard and impact" },
              assignedTeam: { type: Type.STRING, description: "Municipal department/crew assigned to fix this" },
              eta: { type: Type.STRING, description: "Realistic repair ETA (e.g., '45 mins', '4 hours')" }
            },
            required: ["category", "priority", "title", "description", "assignedTeam", "eta"]
          }
        }
      });

      const responseText = geminiResponse.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        detectedCategory = parsed.category || detectedCategory;
        detectedPriority = parsed.priority || detectedPriority;
        detectedTitle = parsed.title || detectedTitle;
        detectedDescription = parsed.description || detectedDescription;
        assignedTeam = parsed.assignedTeam || assignedTeam;
        eta = parsed.eta || eta;
      }
    } catch (err) {
      console.error("Gemini analysis failed or parsed poorly. Reverting to rule logic:", err);
    }
  }

  // Generate fallback coordinates if not supplied
  const complaintLat = lat || (19.07 + Math.random() * 0.02);
  const complaintLng = lng || (72.86 + Math.random() * 0.02);
  const idNum = complaints.length + 101;
  const newComplaintId = `COMP-${idNum}`;

  // Smart allocation default rule if Gemini was mock or failed
  if (!ai) {
    if (detectedCategory === "emergency") {
      detectedPriority = "high";
      assignedTeam = "Emergency Immediate Response Wing";
      eta = "15 mins";
    } else if (detectedCategory === "water") {
      assignedTeam = "Hydraulics Division Ward 3";
      eta = "1.5 hours";
    } else if (detectedCategory === "pothole") {
      assignedTeam = "Pavement Works Division";
      eta = "24 hours";
    } else if (detectedCategory === "waste") {
      assignedTeam = "Zone 3 Sanitation Patrol";
      eta = "3 hours";
    } else if (detectedCategory === "lighting") {
      assignedTeam = "Electrical Grid Repair Team";
      eta = "6 hours";
    }
  }

  const generatedImage = imageBase64 || "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=60";

  const newComplaint = {
    id: newComplaintId,
    category: detectedCategory as any,
    title: detectedTitle,
    description: detectedDescription,
    imageUrl: generatedImage,
    beforePhoto: generatedImage,
    priority: detectedPriority as any,
    lat: complaintLat,
    lng: complaintLng,
    locationDescription: locationDescription || "Reported Location Ward-3 Corridor",
    assignedTeam,
    status: "ai_detected" as any, // Instant confirmation!
    votes: 0,
    verified: false,
    eta,
    dateReported: new Date().toISOString(),
    voiceRecorded: !!voiceInput
  };

  complaints.unshift(newComplaint);

  // Auto create corresponding social Community post
  const newPost = {
    id: `POST-${Date.now()}`,
    category: detectedCategory as any,
    title: `ALERT: ${detectedTitle}`,
    description: `Reported near ${locationDescription || 'our area'}. Please support and upvote to alert the grid!`,
    author: "Arpita Maatta",
    imageUrl: generatedImage,
    date: new Date().toISOString(),
    upvotes: 1,
    hasVotedByMe: true,
    complaintId: newComplaintId
  };
  communityPosts.unshift(newPost);

  // Adjust notifications
  notifications.unshift({
    id: `NOTIF-${Date.now()}`,
    type: "info",
    title: "New Smart Complaint Logged",
    message: `${detectedTitle} detected and classified. ETA: ${eta}.`,
    time: "Just now",
    read: false
  });

  // Credit 10 startup Green Points!
  rewardPoints.totalGreenPoints += 10;
  rewardPoints.history.unshift({
    id: `rw-${Date.now()}`,
    description: `Smart Reporting Contribution Point`,
    points: 10,
    date: new Date().toISOString()
  });

  res.json({ success: true, complaint: newComplaint });
});

// 5. Worker updates task status (e.g. from assigned -> working -> uploading evidence and mark resolved)
app.post("/api/worker/update-status", (req, res) => {
  const { complaintId, status, afterImageBase64 } = req.body;
  const complaint = complaints.find(c => c.id === complaintId);
  
  if (complaint) {
    complaint.status = status;
    if (afterImageBase64) {
      complaint.afterPhoto = afterImageBase64;
    }
    
    if (status === "resolved") {
      complaint.verified = true;
      complaint.eta = "Completed";
      
      // Notify citizen
      notifications.unshift({
        id: `NOTIF-${Date.now()}`,
        type: "success",
        title: "Citizen Problem Resolved! 🌳",
        message: `Task ${complaintId} has been successfully solved. AI matched and verified the resolution evidence.`,
        time: "Just now",
        read: false
      });

      // Credit 50 points to reporter!
      rewardPoints.totalGreenPoints += 50;
      rewardPoints.history.unshift({
        id: `rw-${Date.now()}`,
        description: `Verified Issue Resolution Rewards`,
        points: 50,
        date: new Date().toISOString()
      });
    }

    res.json({ success: true, complaint });
  } else {
    res.status(404).json({ error: "Complaint task not found" });
  }
});

// 6. Community posts feed
app.get("/api/community", (req, res) => {
  res.json(communityPosts);
});

// 7. Community upvote post
app.post("/api/community/:id/vote", (req, res) => {
  const { id } = req.params;
  const post = communityPosts.find(p => p.id === id);
  if (post) {
    if (!post.hasVotedByMe) {
      post.upvotes += 1;
      post.hasVotedByMe = true;
      
      // Mirror vote to the associated complaint
      if (post.complaintId) {
        const c = complaints.find(comp => comp.id === post.complaintId);
        if (c) {
          c.votes += 1;
          if (c.votes > 50 && c.priority !== "high") {
            c.priority = "high";
          }
        }
      }
    }
    res.json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

// 8. Create new community post (from Reddit view)
app.post("/api/community", (req, res) => {
  const { title, description, category } = req.body;
  const newPost = {
    id: `POST-${Date.now()}`,
    category: category || "emergency",
    title,
    description,
    author: "Arpita Maatta",
    imageUrl: "https://images.unsplash.com/photo-1542013936693-8848e5744a70?w=600&auto=format&fit=crop&q=60",
    date: new Date().toISOString(),
    upvotes: 1,
    hasVotedByMe: true,
    complaintId: ""
  };
  communityPosts.unshift(newPost);
  res.json(newPost);
});

// 9. Fetch user rewards and point stats
app.get("/api/rewards", (req, res) => {
  res.json(rewardPoints);
});

// 10. Fetch notifications list
app.get("/api/notifications", (req, res) => {
  res.json(notifications);
});

// Mark notification read
app.post("/api/notifications/read", (req, res) => {
  notifications.forEach(n => n.read = true);
  res.json({ success: true });
});

// 11. Fetch AI predictive models
app.get("/api/predictions", (req, res) => {
  res.json(predictions);
});

// 12. Central AI chat assistant with database grounding
app.post("/api/chat", async (req, res) => {
  const { message, chatHistory } = req.body;
  const ai = getAI();

  const formattedComplaints = complaints.map(c => 
    `- [ID: ${c.id}] Category: ${c.category}, Title: "${c.title}", Location: "${c.locationDescription}", Status: ${c.status}, Priority: ${c.priority}, Votes: ${c.votes}, Assigned: "${c.assignedTeam}", ETA: "${c.eta}"`
  ).join("\n");

  const queryResponse = `Hello citizen! I am CityGPT your responsive municipal AI Assistant.` ;

  if (ai) {
    try {
      const systemInstruction = `You are CityGPT, an elite, hyper-intelligent smart city AI assistant.
      You help citizens, workers, and admins manage, navigate, and query issues, complaints, and live telemetry.
      
      Here is the complete CURRENT LIVE COMPLAINTS DATABASE in the city:
      ${formattedComplaints}
      
      Active Predictor Analytics on hazards:
      - Ward 3: 85% pipeline rupture hazard within 12 days.
      - Ward 4: Sewer backup chance 72% within 18 days.
      
      Guidelines:
      1. Always address citizens in a helpful, high-integrity tone.
      2. Support regional languages: English, Hindi, Hinglish, regional accents (e.g. translate 'Road pe paani bhar gaya' as a Sector 4 Station Area main line fracture, COMP-102!).
      ... Keep formatting pristine with neat markdown list markers, emoji accents and concise answers (max 200 words).`;

      const contents: any[] = [];
      
      // Inject previous chat history
      if (chatHistory && Array.isArray(chatHistory)) {
        chatHistory.slice(-6).forEach(h => {
          contents.push({
            role: h.sender === "user" ? "user" : "model",
            parts: [{ text: h.text }]
          });
        });
      }
      
      contents.push({ role: "user", parts: [{ text: message }] });

      const modelResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      return res.json({ response: modelResponse.text });
    } catch (err) {
      console.error("Gemini Assistant route failed, using mock heuristics:", err);
    }
  }

  // --- Mock Heuristics fallback responses if key is omitted ---
  const normalizedMsg = message.toLowerCase();
  let fallbackReply = `CityGPT Mode Offline. Here is my assistant evaluation:\n\n`;

  if (normalizedMsg.includes("paani") || normalizedMsg.includes("water") || normalizedMsg.includes("leak")) {
    fallbackReply += `I detected your concerns regarding **Water Pipeline Fracture near Station Flyover** (COMP-102).
- **Status**: Currently at [Working] status.
- **Assigned Worker Force**: Hydraulics Division Ward 3.
- **Estimated Repair ETA**: 45 minutes limit.
- **Green Points Credit**: Upvoting this on our community tab raises priority!`;
  } else if (normalizedMsg.includes("garbage") || normalizedMsg.includes("kachra") || normalizedMsg.includes("waste")) {
    fallbackReply += `Regarding waste accumulation:
- **School garbage overflow** COMP-101 is resolved now! Check out the details on your reports tab. We credited 50 Green Points to your smart account!
- You can scan pole/streetlight QR codes to report any active dump sites immediately.`;
  } else if (normalizedMsg.includes("hospital") || normalizedMsg.includes("nearest")) {
    fallbackReply += `The nearest high-facility hospital is **City General Hospital Corridor 4** (2.1 km away).
- **Accident and Trauma wing**: Open 24/7.
- Traffic index is light; ambulance dispatch time is currently 8 mins. Use the red **SOS Button** if this is an immediate emergency!`;
  } else {
    fallbackReply += `Thank you for contacting CityGPT Assistant! I am checking complaints logs. We currently track **${complaints.length} active incidents** in the metro grid.
    
- Type **"Water leak near station"** to get updates on hydraulics repairs.
- Type **"Traffic reports"** to check occidental congestion.
- Support is active in English, Hindi, and regional voice recordings. Keep making the city smarter!`;
  }

  res.json({ response: fallbackReply });
});


// SOS ALERT Endpoints
app.post("/api/sos", (req, res) => {
  const { category, lat, lng, imageBase64 } = req.body;
  
  // Create urgent high complaint
  const idNum = complaints.length + 101;
  const newId = `COMP-${idNum}`;
  
  const urgentTitle = `🚨 CRITICAL SOS: ${category.toUpperCase()} ALERT`;
  const urgentDesc = `AUTOMATED CITIZEN LIFE SAFETY SIGNAL. Category: ${category.toUpperCase()}. Immediate dispatcher dispatched to coordinate coordinate site GPS.`;

  const newC = {
    id: newId,
    category: "emergency" as any,
    title: urgentTitle,
    description: urgentDesc,
    imageUrl: imageBase64 || "https://images.unsplash.com/photo-1542013936693-8848e5744a70?w=600",
    beforePhoto: imageBase64 || "https://images.unsplash.com/photo-1542013936693-8848e5744a70?w=600",
    priority: "high" as any,
    lat: lat || 19.0760,
    lng: lng || 72.8777,
    locationDescription: "Immediate Citizen SOS coordinates",
    assignedTeam: "METRO HAZMAT DISPATCHER FORCE 1",
    status: "working" as any,
    votes: 200,
    verified: true,
    eta: "7 mins",
    dateReported: new Date().toISOString()
  };
  
  complaints.unshift(newC);

  notifications.unshift({
    id: `NOTIF-${Date.now()}`,
    type: "emergency",
    title: "🚨 SOS Dispatch Activated!",
    message: `${category.toUpperCase()} signal captured. GPS coordinates forwarded to first responders. ETA: 7 mins.`,
    time: "Just now",
    read: false
  });

  res.json({ success: true, complaint: newC });
});


// --- 📦 VITE ASSET BRIDGE MIDDLEWARE 📦 ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode with Vite HMR layer
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving from compiled dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 CityGPT Server running successfully on http://0.0.0.0:${PORT}`);
  });
}

if (process.argv[1] === __filename) {
  startServer();
}
