import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import EditorPlayground from "./EditorPlayground";
import Features from "./Features";
import Pricing from "./Pricing";
import Everywhere from "./Everywhere";
import DataSection from "./DataSection";
import Integrations from "./Integrations";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

// Types for elements metadata inside the Figma Inspect panel
interface SectionSpecs {
  name: string;
  id: string;
  x: number;
  y: number;
  width: string;
  height: string;
  backgroundColor: string;
  padding: string;
  fonts: string;
  features: string[];
  codeSnippet: string;
}

// Coordinate mappings for inspecting and overlaying selections
const SECTIONS_METADATA: Record<string, SectionSpecs> = {
  navbar: {
    name: "main-nav-header",
    id: "navbar",
    x: 0,
    y: 0,
    width: "1440px",
    height: "80px",
    backgroundColor: "#043873 (whitepace-navy)",
    padding: "16px top/bottom, container auto horizontal",
    fonts: "Inter (Bold), System UI",
    features: ["Sticky on scroll", "Products/Solutions dropdowns", "Auth login trigger"],
    codeSnippet: `<nav className="navbar navbar-expand-lg fixed-top bg-whitepace-navy">\n  <div className="container">\n    <a className="brand-logo" href="#">whitepace</a>\n    {/* ... dropdown navigators */}\n  </div>\n</nav>`
  },
  hero: {
    name: "hero-intro-section",
    id: "hero",
    x: 0,
    y: 80,
    width: "1440px",
    height: "720px",
    backgroundColor: "#043873 (whitepace-navy)",
    padding: "120px top, 100px bottom",
    fonts: "Inter (Extra Bold), size: 52px, lh: 1.2",
    features: ["Interactive project board mockup", "Dynamic tab selector (Board/Analytics/Checklists)", "Call-To-Actions triggers"],
    codeSnippet: `<section className="bg-whitepace-navy text-white py-5" id="hero">\n  <div className="container">\n    <h1>Get More Done with whitepace</h1>\n    {/* Interactive Workspace Mockup */}\n  </div>\n</section>`
  },
  playground: {
    name: "live-editor-playground",
    id: "playground",
    x: 0,
    y: 800,
    width: "1440px",
    height: "640px",
    backgroundColor: "#FFFFFF (white)",
    padding: "80px top/bottom",
    fonts: "Space Grotesk, Inter (Light), Fira Code",
    features: ["Dynamic markdown editing notes", "Add checklist items", "Live word counter stats"],
    codeSnippet: `<section id="playground" className="py-5 bg-white">\n  <div className="container">\n    <textarea onChange={(e) => setMarkdown(e.target.value)} />\n  </div>\n</section>`
  },
  features: {
    name: "project-features-list",
    id: "features",
    x: 0,
    y: 1440,
    width: "1440px",
    height: "580px",
    backgroundColor: "#FFFFFF (white)",
    padding: "80px top/bottom",
    fonts: "Inter, bootstrap-icons",
    features: ["Formula engine preview", "Audio recording player simulation", "Responsive media layout cards"],
    codeSnippet: `<div id="features" className="bg-white">\n  <section className="py-5" id="project-management">\n    {/* Equations calculator */}\n  </section>\n</div>`
  },
  collaboration: {
    name: "cooperative-collaboration",
    id: "collaboration",
    x: 0,
    y: 2020,
    width: "1440px",
    height: "620px",
    backgroundColor: "#F8F9FA (light-bg)",
    padding: "80px top/bottom",
    fonts: "Inter",
    features: ["Alex typing simulator", "Sarah content edits simulation", "Real-time auto-saved flag logs"],
    codeSnippet: `<section className="py-5 bg-light" id="collaboration">\n  {/* Simulate user editing blocks */}\n  <button onClick={() => triggerEdit('Alex')}>Alex</button>\n</section>`
  },
  pricing: {
    name: "pricing-tier-matrix",
    id: "pricing",
    x: 0,
    y: 2640,
    width: "1440px",
    height: "880px",
    backgroundColor: "#FFFFFF (white)",
    padding: "100px top, 80px bottom",
    fonts: "Space Grotesk, Inter, monospace",
    features: ["Interactive pricing checkout popup", "Calculated organization size constraints", "Checkmark status items"],
    codeSnippet: `<section id="pricing" className="py-5 bg-white">\n  <div className="row">\n    <div className="pricing-card rounded shadow">...</div>\n  </div>\n</section>`
  },
  everywhere: {
    name: "everywhere-device-syncing",
    id: "everywhere",
    x: 0,
    y: 3520,
    width: "1440px",
    height: "600px",
    backgroundColor: "#043873 (whitepace-navy)",
    padding: "80px top, 100px bottom",
    fonts: "Inter, JetBrains Mono",
    features: ["Interactive Device Mockups (Tablet, Laptop, Mobile)", "Tri-directional list check state updates", "Glowing backdrop effects"],
    codeSnippet: `<section id="everywhere" className="bg-whitepace-navy py-5 text-white">\n  {/* Real-time checklist sync layout */}\n  <div className="col-laptop">...</div>\n</section>`
  },
  data: {
    name: "data-exporter-section",
    id: "data-section",
    x: 0,
    y: 4120,
    width: "1440px",
    height: "540px",
    backgroundColor: "#FFFFFF (white)",
    padding: "80px top, 100px bottom",
    fonts: "Inter",
    features: ["Instant JSON backup file downloads", "Simulated security AES-256 seal badges", "Direct link to interactive playground"],
    codeSnippet: `<section id="data-section" className="py-5 bg-white">\n  <button onClick={handleDownloadBackup}>Export JSON</button>\n</section>`
  },
  integrations: {
    name: "live-apps-integrations",
    id: "favorite-apps",
    x: 0,
    y: 4660,
    width: "1440px",
    height: "680px",
    backgroundColor: "#041935 (dark-navy-slate)",
    padding: "80px top, 100px bottom",
    fonts: "Inter, Mono fonts (console)",
    features: ["Dynamic App Syncer selection", "JSON Log simulation panel", "Live status test connector webhooks"],
    codeSnippet: `<section id="favorite-apps" className="bg-whitepace-navy text-white">\n  <button onClick={() => runTestTrigger('slack')}>Test Slack Webhook</button>\n</section>`
  },
  testimonials: {
    name: "testimonials-reviews",
    id: "testimonials",
    x: 0,
    y: 5340,
    width: "1440px",
    height: "560px",
    backgroundColor: "#FFFFFF (white)",
    padding: "80px top/bottom",
    fonts: "Inter (Italic), System fonts",
    features: ["Flickity slide animation layout mockup", "Custom quotes bubbles with author rating reviews", "Figma feedback formatters"],
    codeSnippet: `<section id="testimonials" className="py-5 bg-white">\n  <div className="card shadow-sm">"Whitepace has changed my teams workflow..."</div>\n</section>`
  },
  footer: {
    name: "site-detailed-footer",
    id: "footer",
    x: 0,
    y: 5900,
    width: "1440px",
    height: "420px",
    backgroundColor: "#043873 (whitepace-navy)",
    padding: "80px top, 40px bottom",
    fonts: "Inter, Space Grotesk (Brand)",
    features: ["Sitemap links categories", "Form newsletter email updates simulator", "Language select picker dropdown", "Copyright brand lines"],
    codeSnippet: `<footer className="bg-whitepace-navy text-white py-5">\n  <div className="container">\n    {/* Sitemap cols & copyright footer content */}\n  </div>\n</footer>`
  }
};

interface FigmaSimulatorProps {
  onOpenLogin: () => void;
  onOpenCheckout: (plan: string) => void;
}

export default function FigmaSimulator({ onOpenLogin, onOpenCheckout }: FigmaSimulatorProps) {
  // Modes: 'figma' (Figma Editor Workspace) or 'presentation' (Standard Full-screen Web View)
  const [viewMode, setViewMode] = useState<"figma" | "presentation">("figma");
  
  // Figma Editor States
  const [zoom, setZoom] = useState<number>(0.25); // Start at 25% to see the frames clearly side-by-side, exactly matching figma presentation from screenshot!
  const [panX, setPanX] = useState<number>(100);
  const [panY, setPanY] = useState<number>(40);
  const [activeTool, setActiveTool] = useState<"select" | "hand" | "shape" | "text" | "comment">("select");
  const [selectedLayer, setSelectedLayer] = useState<string>("hero");
  const [figmaTheme, setFigmaTheme] = useState<"dark" | "light">("dark");
  const [inspectTab, setInspectTab] = useState<"design" | "dev">("design");
  
  // Custom interactive mockups generated from toolbar clicks
  const [shapeCount, setShapeCount] = useState<number>(0);
  const [drawnShapes, setDrawnShapes] = useState<Array<{ id: number; x: number; y: number; w: number; h: number; type: string }>>([]);
  const [comments, setComments] = useState<Array<{ id: number; x: number; y: number; text: string; author: string; time: string }>>([
    { id: 1, x: 250, y: 150, text: "Excellent hero copy! The underline effect with SVG is really clean.", author: "Figma Reviewer", time: "Just now" },
    { id: 2, x: 920, y: 1100, text: "Can we ensure the interactive backup file exporter validates schemas?", author: "Lead Architect", time: "5m ago" }
  ]);
  const [activeCommentText, setActiveCommentText] = useState("");
  const [pendingCommentCoords, setPendingCommentCoords] = useState<{ x: number; y: number } | null>(null);

  // References for drag-to-pan implementation
  const canvasRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Reset pan to center anytime zoom is updated or manually triggered
  const resetToCenter = () => {
    if (viewMode === "presentation") return;
    setPanX(60);
    setPanY(20);
    setZoom(0.25);
  };

  // Drag-to-Pan engine
  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode === "presentation") return;
    if (activeTool !== "hand") return; // Hand tool must be active
    
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX - panX,
      y: e.clientY - panY
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (viewMode === "presentation") return;
    if (!isDraggingRef.current) return;
    
    setPanX(e.clientX - dragStartRef.current.x);
    setPanY(e.clientY - dragStartRef.current.y);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewMode === "presentation") return;
    
    // Calculate coordinates relative to the canvas workspace
    if (canvasRef.current && (activeTool === "comment" || activeTool === "shape")) {
      const rect = canvasRef.current.getBoundingClientRect();
      const localX = (e.clientX - rect.left - panX) / zoom;
      const localY = (e.clientY - rect.top - panY) / zoom;

      if (activeTool === "comment") {
        setPendingCommentCoords({ x: Math.round(localX), y: Math.round(localY) });
      } else if (activeTool === "shape") {
        const newShape = {
          id: shapeCount + 1,
          x: Math.round(localX - 50),
          y: Math.round(localY - 30),
          w: 100,
          h: 60,
          type: "rectangle"
        };
        setDrawnShapes([...drawnShapes, newShape]);
        setShapeCount(shapeCount + 1);
        setActiveTool("select"); // Return to pointer
      }
    }
  };

  const handleAddComment = () => {
    if (activeCommentText.trim() && pendingCommentCoords) {
      const newComment = {
        id: comments.length + 1,
        x: pendingCommentCoords.x,
        y: pendingCommentCoords.y,
        text: activeCommentText,
        author: "You (Reviewer)",
        time: "Just now"
      };
      setComments([...comments, newComment]);
      setActiveCommentText("");
      setPendingCommentCoords(null);
      setActiveTool("select");
    }
  };

  // Scroll viewport smoothly to center the selected layer
  const scrollCanvasToLayer = (layerId: string) => {
    setSelectedLayer(layerId);
    const element = SECTIONS_METADATA[layerId];
    if (element) {
      // Calculate screen layout offsets to center the layer appropriately
      setPanX(-element.x * zoom + 150);
      setPanY(-element.y * zoom + 80);
    }
  };

  // Trigger alert backup or pricing popups
  const handlePricingCta = (plan: string) => {
    if (viewMode === "figma") {
      alert(`⚠️ You clicked are browsing the Figma file spec. Select "Play / Presentation View" in the top right to load standard active forms, register, or unlock templates live!`);
    } else {
      onOpenCheckout(plan);
    }
  };

  return (
    <div className={`figma-wrapper min-h-screen d-flex flex-column text-stone-900 overflow-hidden select-none ${viewMode === "figma" ? "bg-stone-900" : "bg-white"}`} id="app-root-simulator">
      
      {/* 1. Figma Layout Wrapper View */}
      {viewMode === "figma" ? (
        <div className="d-flex flex-column vh-screen overflow-hidden text-stone-300" style={{ height: "100vh" }}>
          
          {/* A. Figma TOPBAR */}
          <div 
            className="figma-topbar d-flex justify-content-between align-items-center px-3 border-bottom border-secondary-subtle py-2 bg-neutral-900" 
            style={{ 
              backgroundColor: "#2c2c2c", 
              borderBottom: "1px solid #3c3c3c !important",
              zIndex: 1060,
              fontSize: "0.85rem",
              height: "46px"
            }}
            id="workspace-topbar"
          >
            {/* Left Brand Menu Option */}
            <div className="d-flex align-items-center gap-2.5">
              {/* Figma Custom colors pill logo */}
              <div className="d-flex flex-column align-items-center justify-content-center" style={{ width: "20px", height: "30px" }}>
                <div className="d-flex gap-0.5">
                  <span className="rounded-circle" style={{ width: "6px", height: "6px", backgroundColor: "#F24E1E" }}></span>
                  <span className="rounded-circle" style={{ width: "6px", height: "6px", backgroundColor: "#A259FF" }}></span>
                </div>
                <div className="d-flex gap-0.5 mt-0.5">
                  <span className="rounded-circle" style={{ width: "6px", height: "6px", backgroundColor: "#1ABC9C" }}></span>
                  <span className="rounded-circle" style={{ width: "6px", height: "6px", backgroundColor: "#1ABC9C" }}></span>
                </div>
              </div>
              
              <div className="divider-vr mx-1 bg-stone-700" style={{ width: "1px", height: "20px" }}></div>
              
              <div className="d-flex align-items-center gap-1.5 cursor-pointer hover-text-white">
                <span className="fw-semibold text-white">Whitepace - SaaS Landing Page (Community)</span>
                <i className="bi bi-chevron-down text-stone-500" style={{ fontSize: "11px" }}></i>
              </div>
            </div>

            {/* Middle Tools Menu Info */}
            <div className="d-flex align-items-center gap-4 text-xs text-stone-400">
              <span className="text-stone-500">Draft</span>
              <div className="d-flex gap-1 bg-neutral-800 p-1 rounded" style={{ backgroundColor: "#1e1e1e" }}>
                <span className="px-2 text-stone-400">Design</span>
                <span className="px-2 bg-stone-700 text-white rounded font-medium">Prototype</span>
              </div>
            </div>

            {/* Right Interactive Option Tools */}
            <div className="d-flex align-items-center gap-3">
              {/* Developers Account Avatars */}
              <div className="d-none d-md-flex -space-x-2 align-items-center me-2">
                <span 
                  className="rounded-circle border border-dark d-flex align-items-center justify-content-center fw-bold bg-whitepace-yellow text-whitepace-navy shadow-sm" 
                  style={{ width: "26px", height: "26px", fontSize: "10px" }}
                  title="ar3359499@gmail.com"
                >
                  AR
                </span>
                <span 
                  className="rounded-circle border border-dark d-flex align-items-center justify-content-center fw-bold bg-primary text-white shadow-sm" 
                  style={{ width: "26px", height: "26px", fontSize: "10px", marginLeft: "-6px" }}
                  title="Google AI Agent"
                >
                  AI
                </span>
              </div>

              {/* Development Mode Switcher */}
              <button 
                onClick={() => setInspectTab(inspectTab === "design" ? "dev" : "design")} 
                className={`btn btn-xs p-1.5 rounded text-white d-flex align-items-center gap-1 border-0 ${inspectTab === "dev" ? "bg-success bg-opacity-20 text-success" : "text-stone-400 hover-text-white"}`}
                title="Toggle Dev Mode"
                style={{ fontSize: "11px" }}
              >
                <i className="bi bi-code-slash font-bold"></i>
                <span className="d-none d-lg-inline">Dev Mode</span>
              </button>

              {/* Share Trigger Action Button */}
              <button 
                onClick={() => alert("✨ Shared template link copied! Send to your teammates to collaborate on this Whitepace Figma design.")}
                className="btn btn-sm text-xs bg-primary hover:bg-primary-dark text-white font-medium px-3 py-1 rounded"
                style={{ fontSize: "11px", backgroundColor: "#0d99ff" }}
                id="figma-share-btn"
              >
                Share
              </button>

              {/* Play Presentation Indicator matching screenshot play dropdown */}
              <button 
                onClick={() => setViewMode("presentation")}
                className="btn btn-sm btn-dark text-white p-1 rounded-circle d-flex align-items-center justify-content-center hover:bg-stone-700"
                style={{ width: "28px", height: "28px" }}
                title="Present Mode (Review full-screen live application)"
                id="presentation-play-btn"
              >
                <i className="bi bi-play-fill text-success" style={{ fontSize: "14px" }}></i>
              </button>

              <div className="divider-vr bg-stone-700" style={{ width: "1px", height: "20px" }}></div>

              {/* Zoom selection dropdown representing % options */}
              <div className="dropdown">
                <button 
                  className="btn btn-xs btn-dark p-1.5 text-stone-300 border-0 hover-text-white d-flex align-items-center gap-1 bg-stone-800"
                  type="button"
                  data-bs-toggle="dropdown"
                  style={{ fontSize: "11px", backgroundColor: "#1e1e1e" }}
                  id="figma-zoom-dropdown"
                >
                  <span>{Math.round(zoom * 100)}%</span>
                  <i className="bi bi-chevron-down"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-dark shadow border-0 text-xs py-1" style={{ fontSize: "11px" }}>
                  <li><button onClick={() => setZoom(0.03)} className="dropdown-item py-1.5">3% (遠景 Overview)</button></li>
                  <li><button onClick={() => setZoom(0.15)} className="dropdown-item py-1.5">15%</button></li>
                  <li><button onClick={() => setZoom(0.25)} className="dropdown-item py-1.5">25% (Figma Community Stack)</button></li>
                  <li><button onClick={() => setZoom(0.5)} className="dropdown-item py-1.5">50%</button></li>
                  <li><button onClick={() => setZoom(0.85)} className="dropdown-item py-1.5">85%</button></li>
                  <li><button onClick={() => setZoom(1.0)} className="dropdown-item py-1.5">100% (Actual Scale Size)</button></li>
                  <li><hr className="dropdown-divider bg-stone-700" /></li>
                  <li><button onClick={() => setZoom(1.5)} className="dropdown-item py-1.5">150% Zoom In</button></li>
                  <li><button onClick={resetToCenter} className="dropdown-item py-1.5 text-primary"><i className="bi bi-arrows-expand me-1"></i> Zoom & Center Fit</button></li>
                </ul>
              </div>
            </div>
          </div>

          {/* B. Core Interactive Canvas and Sidebars Grid */}
          <div className="row g-0 flex-grow-1 position-relative overflow-hidden">
            
            {/* PANEL I: LEFT SIDEBAR (Layers tree) */}
            <div 
              className="col-md-2 d-none d-md-flex flex-column border-end border-secondary-subtle bg-neutral-900 select-none text-stone-400"
              style={{ 
                backgroundColor: "#2c2c2c", 
                borderRight: "1px solid #3c3c3c !important",
                fontSize: "0.80rem"
              }}
              id="layers-sidebar"
            >
              <div className="p-2 border-bottom border-dark-subtle d-flex justify-content-between align-items-center">
                <span className="fw-bold tracking-wider text-xs text-stone-200">LAYERS</span>
                <i className="bi bi-filter" style={{ cursor: "pointer" }}></i>
              </div>

              {/* Pages folder picker */}
              <div className="p-2 bg-stone-800 bg-opacity-70 text-stone-300 font-medium border-bottom border-dark border-opacity-30">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-1.5">
                    <i className="bi bi-files text-primary"></i>
                    <span>SaaS Design Frames</span>
                  </div>
                  <i className="bi bi-caret-down-fill text-xxs"></i>
                </div>
              </div>

              {/* Sections list trigger layers scroll */}
              <div className="flex-grow-1 overflow-y-auto p-1 py-2 d-flex flex-column gap-0.5">
                <span className="px-2 text-stone-500 mb-1 font-bold text-xxs tracking-wider mt-1 block">ARTBOARD SECTIONS</span>
                
                {Object.keys(SECTIONS_METADATA).map((sectionId) => {
                  const data = SECTIONS_METADATA[sectionId];
                  const isSelected = selectedLayer === sectionId;
                  return (
                    <button
                      key={sectionId}
                      onClick={() => scrollCanvasToLayer(sectionId)}
                      className={`btn btn-sm border-0 text-start py-1.5 px-3 rounded select-none text-xs flex align-items-center justify-content-between ${
                        isSelected 
                          ? "bg-secondary bg-opacity-30 text-white font-semibold" 
                          : "text-stone-300 hover:bg-stone-800"
                      }`}
                      style={{ fontSize: "11px" }}
                    >
                      <span className="d-flex align-items-center gap-2 overflow-hidden text-truncate">
                        <i className={`bi ${isSelected ? "bi-eye-fill text-primary" : "bi-folder-fill text-stone-500"}`}></i>
                        {data.name}
                      </span>
                      <span className="text-stone-500 text-xxs font-mono">#{data.id}</span>
                    </button>
                  );
                })}

                <span className="px-2 text-stone-500 mb-1 font-bold text-xxs tracking-wider mt-4 block">ACTIVE CANVAS SHAPES</span>
                <div className="px-3 text-stone-500 font-light text-xxs italic">
                  {drawnShapes.length === 0 ? "No manual shapes drawn yet." : `${drawnShapes.length} custom vector paths`}
                </div>
              </div>

              {/* Quick status feedback info in bottom of left sidebar */}
              <div className="p-3 border-top border-dark border-opacity-30 text-xxs bg-stone-800 text-stone-500 d-flex flex-column gap-1">
                <div className="d-flex justify-content-between">
                  <span>Renderer Engine:</span>
                  <span className="text-success fw-bold">Live React</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Selected Node:</span>
                  <span className="text-stone-300 font-mono">#{selectedLayer}</span>
                </div>
              </div>
            </div>

            {/* PANEL II: CENTER CANVAS VIEWPORT (Checkered Grid background) */}
            <div 
              className="col flex-grow-1 position-relative overflow-hidden"
              style={{
                backgroundColor: "#1e1e1e",
                backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                cursor: activeTool === "hand" ? (isDraggingRef.current ? "grabbing" : "grab") : "default"
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onClick={handleCanvasClick}
            >
              
              {/* Figma Ruler lines & coordinates indicator */}
              <div className="position-absolute text-stone-600 border-bottom text-xxs p-1 d-flex justify-content-between w-100 select-none" style={{ top: 0, left: 0, borderBottom: "1px solid #2d2d2d !important", pointerEvents: "none", zIndex: 10 }}>
                <span>X: {panX}px | Y: {panY}px</span>
                <span>Zoom Level: {Math.round(zoom * 100)}%</span>
                <span>Press Space + Drag to Pan Canvas</span>
              </div>

              {/* The Panning Canvas Workspace Block */}
              <div 
                ref={canvasRef}
                className="position-relative transition-all duration-75 text-stone-900 border"
                style={{
                  transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                  transformOrigin: "top left",
                  width: "1600px",
                  height: "6400px",
                  border: "2px dashed #444",
                  padding: "60px",
                  pointerEvents: activeTool === "hand" ? "none" : "auto"
                }}
              >
                
                {/* Simulated Figma Artboard Cover label */}
                <div className="position-absolute" style={{ top: "0px", left: "60px", pointerEvents: "none" }}>
                  <div className="d-flex align-items-center gap-2 text-stone-400 font-medium">
                    <span 
                      className="px-2 py-1 rounded bg-secondary text-white text-xs fw-bold" 
                      style={{ backgroundColor: "#a259ff" }}
                    >
                      ❖ master_page_layouts
                    </span>
                    <span className="text-stone-500 font-mono">Main Canvas Frame (Container 1440px)</span>
                  </div>
                </div>

                {/* THE ACTIVE REACT PREVIEW FRAME */}
                <div 
                  className="card border-0 bg-white rounded-3 shadow-lg position-relative"
                  style={{ 
                    width: "1440px", 
                    minHeight: "6000px", 
                    top: "30px", 
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
                    border: "8px solid #a259ff !important" // Figma component purple boundary tag!
                  }}
                  id="figma-artboard-render"
                >
                  
                  {/* Master element selection highlighter node overlays */}
                  <div 
                    className="position-absolute transition-all duration-300 border border-3 pointer-events-none"
                    style={{
                      borderColor: "#0d99ff", // Figma Blue selection border!
                      top: SECTIONS_METADATA[selectedLayer]?.y,
                      left: SECTIONS_METADATA[selectedLayer]?.x,
                      width: SECTIONS_METADATA[selectedLayer]?.width,
                      height: SECTIONS_METADATA[selectedLayer]?.height,
                      pointerEvents: "none",
                      zIndex: 1040,
                      boxShadow: "0 0 0 4px rgba(13, 153, 255, 0.15)"
                    }}
                  >
                    {/* Floating coordinate tooltip badge */}
                    <div className="position-absolute badge bg-primary text-white text-xxs font-mono translate-middle-y" style={{ top: "-10px", left: "10px", backgroundColor: "#0d99ff" }}>
                      {selectedLayer} ({SECTIONS_METADATA[selectedLayer]?.width} × {SECTIONS_METADATA[selectedLayer]?.height})
                    </div>
                  </div>

                  {/* CUSTOM DRAWN SHAPE VECTOR PREVIEWS (Canvas sandbox tools) */}
                  {drawnShapes.map((shape) => (
                    <div
                      key={shape.id}
                      className="position-absolute border border-dashed rounded text-center d-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary fw-medium"
                      style={{
                        left: shape.x,
                        top: shape.y,
                        width: shape.w,
                        height: shape.h,
                        zIndex: 1035,
                        borderColor: "#0d99ff",
                        fontSize: "10px",
                        cursor: "pointer"
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Custom manual vector rectangle node #${shape.id} clicked!`);
                      }}
                    >
                      Rect #{shape.id}
                    </div>
                  ))}

                  {/* ACTIVE FEEDBACK AND REVIEW COMMENTS FLOATING MARKERS */}
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="position-absolute dropdown"
                      style={{
                        left: comment.x,
                        top: comment.y,
                        zIndex: 1050
                      }}
                    >
                      <button
                        className="btn p-0 rounded-circle d-flex align-items-center justify-content-center bg-danger text-white border-2 border-white shadow hover-scale"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ width: "24px", height: "24px" }}
                      >
                        <i className="bi bi-chat-fill-text" style={{ fontSize: "10px" }}></i>
                      </button>
                      <div className="dropdown-menu shadow-lg border-0 p-3 bg-dark text-white text-xs rounded-3" style={{ width: "220px", fontSize: "11px" }}>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-1.5 mb-1.5">
                          <span className="fw-bold text-warning">{comment.author}</span>
                          <span className="text-white-50 text-xxs font-light">{comment.time}</span>
                        </div>
                        <p className="text-stone-300 mb-0 font-light leading-snug">{comment.text}</p>
                      </div>
                    </div>
                  ))}

                  {/* Render the full interactive Whitepace Components suite inside our Artboard */}
                  <div className="w-100 position-relative">
                    
                    {/* Artboard Section 1: Header navbar Mock */}
                    <div onClick={() => setSelectedLayer("navbar")} className="cursor-pointer">
                      <Navbar onOpenLogin={onOpenLogin} activeSection={selectedLayer} />
                    </div>

                    {/* Artboard Section 2: Hero Intro with mockup togglor */}
                    <div onClick={() => setSelectedLayer("hero")} className="cursor-pointer" style={{ marginTop: "78px" }}>
                      <Hero onStartTrial={() => scrollCanvasToLayer("pricing")} />
                    </div>

                    {/* Artboard Section 3: Live Markdown workspace editor */}
                    <div onClick={() => setSelectedLayer("playground")} className="cursor-pointer">
                      <EditorPlayground />
                    </div>

                    {/* Artboard Section 4: General feature cards calculations */}
                    <div onClick={() => setSelectedLayer("features")} className="cursor-pointer">
                      <Features />
                    </div>

                    {/* Artboard Section 5: Target Plan checkout options */}
                    <div onClick={() => setSelectedLayer("pricing")} className="cursor-pointer">
                      <Pricing onSelectPlan={handlePricingCta} />
                    </div>

                    {/* Artboard Section 6: Tablet laptop mobile syncing */}
                    <div onClick={() => setSelectedLayer("everywhere")} className="cursor-pointer">
                      <Everywhere />
                    </div>

                    {/* Artboard Section 7: Secure open formats export checks */}
                    <div onClick={() => setSelectedLayer("data")} className="cursor-pointer">
                      <DataSection />
                    </div>

                    {/* Artboard Section 8: Live app integrations */}
                    <div onClick={() => setSelectedLayer("integrations")} className="cursor-pointer">
                      <Integrations />
                    </div>

                    {/* Artboard Section 9: Client reviews carousel */}
                    <div onClick={() => setSelectedLayer("testimonials")} className="cursor-pointer">
                      <Testimonials />
                    </div>

                    {/* Artboard Section 10: Footer brand sitemap links */}
                    <div onClick={() => setSelectedLayer("footer")} className="cursor-pointer">
                      <Footer onNewsletterSignup={(email) => alert(`Successfully mockup subscribed email: ${email}`)} />
                    </div>

                  </div>

                </div>

              </div>

              {/* FLOATING PENDING COMMENT FORM OVERLAY */}
              {pendingCommentCoords && (
                <div 
                  className="position-absolute card bg-dark text-white border border-secondary shadow-lg p-3 rounded" 
                  style={{ 
                    top: "100px", 
                    left: "220px", 
                    zIndex: 1080, 
                    width: "280px" 
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold text-xs text-xs text-primary"><i className="bi bi-chat-right-text-fill"></i> Drop Comment Node</span>
                    <button onClick={() => setPendingCommentCoords(null)} className="btn-close btn-close-white btn-xs p-1"></button>
                  </div>
                  <span className="text-stone-400 text-xxs d-block mb-3">Adding coordinate point: X:{pendingCommentCoords.x} Y:{pendingCommentCoords.y}</span>
                  <textarea
                    className="form-control form-control-sm text-xs bg-stone-800 text-white border-secondary mb-2.5"
                    rows={3}
                    placeholder="Type your design review feedback..."
                    value={activeCommentText}
                    onChange={(e) => setActiveCommentText(e.target.value)}
                  ></textarea>
                  <button onClick={handleAddComment} className="btn btn-sm btn-primary w-100 py-1 fw-bold text-xs" style={{ backgroundColor: "#0d99ff" }}>
                    Pin Comment
                  </button>
                </div>
              )}

              {/* C. FLOATING FIGMA BOTTOM COMPONENT TOOLBAR */}
              <div 
                className="position-absolute start-50 translate-middle-x bg-neutral-900 border border-secondary border-opacity-30 p-1.5 rounded-3 d-flex justify-content-center gap-1 shadow-lg"
                style={{ 
                  bottom: "105px", 
                  zIndex: 1060, 
                  backgroundColor: "#2c2c2c",
                  border: "1px solid #3c3c3c !important"
                }}
                id="figma-toolbar"
              >
                {/* Pointer / Cursor Select tool */}
                <button 
                  onClick={() => { setActiveTool("select"); setPendingCommentCoords(null); }} 
                  className={`btn btn-sm border-0 px-2.5 py-1.5 rounded-2 d-flex align-items-center justify-content-center text-white ${activeTool === "select" ? "bg-primary text-white" : "hover-scale"}`}
                  style={{ backgroundColor: activeTool === "select" ? "#0d99ff" : "transparent" }}
                  title="Move / Select Cursor"
                >
                  <i className="bi bi-cursor-fill" style={{ fontSize: "13px" }}></i>
                </button>

                {/* Hand Pan Tool */}
                <button 
                  onClick={() => { setActiveTool("hand"); setPendingCommentCoords(null); }} 
                  className={`btn btn-sm border-0 px-2.5 py-1.5 rounded-2 d-flex align-items-center justify-content-center text-white ${activeTool === "hand" ? "bg-primary text-white" : "hover-scale"}`}
                  style={{ backgroundColor: activeTool === "hand" ? "#0d99ff" : "transparent" }}
                  title="Hand Tool (Hold space & drag grid to pan visual folders)"
                >
                  <i className="bi bi-hand-index-thumb-fill" style={{ fontSize: "13px" }}></i>
                </button>

                {/* Shape / Rectangle drawer */}
                <button 
                  onClick={() => { setActiveTool("shape"); setPendingCommentCoords(null); }} 
                  className={`btn btn-sm border-0 px-2.5 py-1.5 rounded-2 d-flex align-items-center justify-content-center text-white ${activeTool === "shape" ? "bg-primary text-white" : "hover-scale"}`}
                  style={{ backgroundColor: activeTool === "shape" ? "#0d99ff" : "transparent" }}
                  title="Rectangle / Vector Shape Tool (Click on components layer to draw mockup rects)"
                >
                  <i className="bi bi-square" style={{ fontSize: "13px" }}></i>
                </button>

                {/* Text editor box mockup */}
                <button 
                  onClick={() => { setActiveTool("text"); setPendingCommentCoords(null); alert("Select Text tool active template! Click on sections to view text properties in the right Inspect Panel."); }} 
                  className={`btn btn-sm border-0 px-2.5 py-1.5 rounded-2 d-flex align-items-center justify-content-center text-white ${activeTool === "text" ? "bg-primary" : "hover-scale"}`}
                  style={{ backgroundColor: activeTool === "text" ? "#0d99ff" : "transparent" }}
                  title="Text Vector System"
                >
                  <i className="bi bi-type" style={{ fontSize: "13px" }}></i>
                </button>

                <div className="divider-vr mx-1 bg-stone-700" style={{ width: "1px", height: "24px" }}></div>

                {/* Comments box tool */}
                <button 
                  onClick={() => setActiveTool("comment")} 
                  className={`btn btn-sm border-0 px-2.5 py-1.5 rounded-2 d-flex align-items-center justify-content-center text-white ${activeTool === "comment" ? "bg-danger text-white shadow-sm" : "hover-scale"}`}
                  style={{ backgroundColor: activeTool === "comment" ? "#dc3545" : "transparent" }}
                  title="Pin Comment Review Bubble Pin"
                >
                  <i className="bi bi-chat-left-text" style={{ fontSize: "13px" }}></i>
                  {comments.length > 0 && (
                    <span className="badge bg-warning text-dark text-xxs ms-1 rounded-circle" style={{ fontSize: "9px" }}>{comments.length}</span>
                  )}
                </button>
              </div>

            </div>

            {/* PANEL III: RIGHT SIDEBAR (Properties Inspect & Spec panel) */}
            <div 
              className="col-md-2 d-none d-md-flex flex-column border-start border-secondary-subtle bg-neutral-900 select-none text-stone-400"
              style={{ 
                backgroundColor: "#2c2c2c", 
                borderLeft: "1px solid #3c3c3c !important",
                fontSize: "0.80rem"
              }}
              id="inspect-properties-sidebar"
            >
              <div className="p-2 border-bottom border-dark border-opacity-30 d-flex justify-content-around align-items-center">
                <button 
                  onClick={() => setInspectTab("design")} 
                  className={`btn btn-xs flex-grow-1 border-0 text-white rounded font-bold py-1 ${inspectTab === "design" ? "bg-stone-700" : "text-stone-500 hover:text-stone-300"}`}
                  style={{ fontSize: "11px" }}
                >
                  Inspect Design
                </button>
                <button 
                  onClick={() => setInspectTab("dev")} 
                  className={`btn btn-xs flex-grow-1 border-0 text-white rounded font-bold py-1 ${inspectTab === "dev" ? "bg-stone-700" : "text-stone-500 hover:text-stone-300"}`}
                  style={{ fontSize: "11px" }}
                >
                  Inspect Code
                </button>
              </div>

              {/* Element Properties Specs Panel */}
              {inspectTab === "design" ? (
                <div className="flex-grow-1 overflow-y-auto p-3 d-flex flex-column gap-3.5">
                  <div>
                    <span className="text-stone-500 font-bold text-xxs tracking-wider uppercase">Selection Parameters</span>
                    <h6 className="fw-bold text-white mb-1" style={{ fontSize: "0.85rem" }}>
                      #{SECTIONS_METADATA[selectedLayer]?.id}
                    </h6>
                    <span className="text-primary font-mono text-xxs d-block text-truncate">
                      master.{SECTIONS_METADATA[selectedLayer]?.name}
                    </span>
                  </div>

                  <hr className="my-1 border-stone-800" />

                  {/* Size box elements */}
                  <div>
                    <span className="text-stone-500 font-bold text-xxs tracking-wider uppercase block mb-1.5">Alignment & Spacing</span>
                    <div className="row g-2 font-mono text-xxs text-stone-300 text-center">
                      <div className="col-6">
                        <div className="bg-stone-800 p-1.5 rounded text-truncate border border-dark">
                          <span className="text-stone-500 d-block text-xxs">WIDTH</span>
                          <span className="fw-bold">{SECTIONS_METADATA[selectedLayer]?.width}</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="bg-stone-800 p-1.5 rounded text-truncate border border-dark">
                          <span className="text-stone-500 d-block text-xxs">HEIGHT</span>
                          <span className="fw-bold">{SECTIONS_METADATA[selectedLayer]?.height}</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="bg-stone-800 p-1.5 rounded text-truncate border border-dark">
                          <span className="text-stone-500 d-block text-xxs">COORDS X</span>
                          <span className="fw-bold">0px</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="bg-stone-800 p-1.5 rounded text-truncate border border-dark">
                          <span className="text-stone-500 d-block text-xxs">COORDS Y</span>
                          <span className="fw-bold">{SECTIONS_METADATA[selectedLayer]?.y}px</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Colors and styling profiles */}
                  <div>
                    <span className="text-stone-500 font-bold text-xxs tracking-wider uppercase block mb-1">Theme Styles</span>
                    <div className="bg-stone-800 p-2.5 rounded border border-dark d-flex flex-column gap-1">
                      <div className="d-flex align-items-center gap-2">
                        <span className="rounded-circle d-inline-block" style={{ width: "12px", height: "12px", border: "1px solid #777", backgroundColor: selectedLayer === "playground" || selectedLayer === "features" || selectedLayer === "pricing" || selectedLayer === "data" || selectedLayer === "testimonials" ? "#fff" : "#043873" }}></span>
                        <span className="text-stone-200 text-xxs font-mono">{SECTIONS_METADATA[selectedLayer]?.backgroundColor}</span>
                      </div>
                      <span className="text-xxs text-stone-500 mt-1">Border Radius: 0px (Static Sections)</span>
                    </div>
                  </div>

                  {/* Typography information details */}
                  <div>
                    <span className="text-stone-500 font-bold text-xxs tracking-wider uppercase block mb-1">Typography Specs</span>
                    <div className="bg-stone-800 p-2.5 rounded border border-dark">
                      <span className="text-stone-200 text-xxs font-mono d-block text-truncate">
                        {SECTIONS_METADATA[selectedLayer]?.fonts}
                      </span>
                      <span className="text-stone-500 text-xxs d-block mt-1">Font Family: Inter, Space Grotesk</span>
                    </div>
                  </div>

                  {/* Components Features listing */}
                  <div>
                    <span className="text-stone-500 font-bold text-xxs tracking-wider uppercase block mb-1">Inspect Layers Features</span>
                    <ul className="ps-3 mb-0 text-xxs text-stone-300 font-light" style={{ fontSize: "10.5px" }}>
                      {SECTIONS_METADATA[selectedLayer]?.features.map((feat, i) => (
                        <li key={i} className="mb-1">{feat}</li>
                      ))}
                    </ul>
                  </div>

                  <hr className="my-1 border-stone-800" />

                  {/* Interactive Quick Action trigger */}
                  <div className="bg-primary bg-opacity-10 text-primary p-2.5 rounded text-center border border-primary border-opacity-20">
                    <span className="fw-bold d-block text-xxs text-white mb-1">Prototype Sync Interaction</span>
                    <button 
                      onClick={() => {
                        setViewMode("presentation");
                        setTimeout(() => {
                          const el = document.getElementById(SECTIONS_METADATA[selectedLayer]?.id);
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }, 200);
                      }}
                      className="btn btn-xs btn-primary d-inline-flex gap-1 align-items-center py-1.5 px-3 rounded w-100 font-bold mt-1 text-xs"
                      style={{ fontSize: "11px", backgroundColor: "#0d99ff" }}
                    >
                      <i className="bi bi-play-circle"></i> Run Active Preview
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-grow-1 overflow-y-auto p-3 d-flex flex-column gap-3.5">
                  <div>
                    <span className="text-success font-bold text-xxs tracking-wider uppercase">Active JSX Code View</span>
                    <h6 className="fw-bold text-white mb-1" style={{ fontSize: "0.85rem" }}>
                      #{SECTIONS_METADATA[selectedLayer]?.id} Component
                    </h6>
                    <span className="text-stone-400 text-xxs block mb-2">Double click or tap to select block code parameters</span>
                  </div>

                  {/* Component Node code preview block */}
                  <div className="bg-stone-950 p-2.5 rounded border border-dark font-mono text-xxs text-success" style={{ minHeight: "150px", fontSize: "9px" }}>
                    <pre className="mb-0 overflow-x-auto text-stone-300 leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>
                      {SECTIONS_METADATA[selectedLayer]?.codeSnippet}
                    </pre>
                  </div>

                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(SECTIONS_METADATA[selectedLayer]?.codeSnippet || "");
                      alert("Code snippet copied to clipboard successfully!");
                    }} 
                    className="btn btn-xs btn-secondary py-2 text-white font-bold w-100 bg-stone-800"
                    style={{ fontSize: "11px" }}
                  >
                    <i className="bi bi-clipboard me-1"></i> Copy React Code Block
                  </button>

                  <div className="mt-3 p-2 bg-stone-800 rounded text-xxs border border-stone-700">
                    <span className="fw-bold d-block text-warning text-xxs mb-1"><i className="bi bi-info-circle"></i> Tailwind Specs Enabled</span>
                    <p className="text-stone-400 mb-0 font-light" style={{ fontSize: "10px" }}>
                      All colors map directly to background specifications declared inside Tailwind @theme directives inside index.css.
                    </p>
                  </div>
                </div>
              )}

              {/* Developer credentials bottom box */}
              <div className="p-2 border-top border-dark border-opacity-30 bg-stone-800 text-stone-500 text-xxs">
                <span>Selected Element:</span>
                <span className="text-stone-300 font-mono d-block text-truncate">#{selectedLayer}</span>
              </div>
            </div>

          </div>

          {/* D. Figma Bottom floating Sign-Up prompt (replica of Figma communities banner) */}
          <div 
            className="figma-blue-banner px-4 py-2 text-white d-flex flex-column flex-sm-row justify-content-between align-items-center bg-primary"
            style={{ 
              backgroundColor: "#2c2c2c", 
              borderTop: "1px solid #3c3c3c !important",
              zIndex: 1070,
              fontSize: "0.85rem"
            }}
            id="signup-floating-banner"
          >
            <div className="d-flex align-items-center gap-2 mb-2 mb-sm-0 text-center text-sm-start text-stone-300">
              <i className="bi bi-info-circle-fill text-primary" style={{ color: "#0d99ff !important" }}></i>
              <span>Sign up to comment, edit, inspect variables and retrieve high fidelity open formats templates.</span>
            </div>
            <div className="d-flex gap-2">
              <button 
                onClick={onOpenLogin}
                className="btn btn-sm text-xs font-bold text-white px-3 py-1.5 border border-secondary"
                style={{ fontSize: "11px", borderColor: "#444 !important" }}
                id="banner-login-btn"
              >
                Log In
              </button>
              <button 
                onClick={onOpenLogin}
                className="btn btn-sm btn-primary text-xs font-bold px-3.5 py-1.5"
                style={{ fontSize: "11px", backgroundColor: "#0d99ff", borderColor: "#0d99ff" }}
                id="banner-signup-btn"
              >
                Sign up
              </button>
            </div>
          </div>

          {/* Bottom elements question help action */}
          <button 
            className="btn rounded-circle d-flex align-items-center justify-content-center bg-stone-700 text-white border border-secondary shadow position-absolute hover-scale"
            style={{ width: "32px", height: "32px", bottom: "60px", right: "20px", zIndex: 1080 }}
            onClick={() => alert("💡 FIGMA WORKSPACE SIMULATOR\n\n1. Use the left layers panel or click directly on any element to select and inspect its properties on the right.\n2. In design tool bar at bottom select Comment (bubble) and click anywhere to place custom notes on the elements.\n3. Change zoom percentage in top-right or switch to 'Dev Mode' to extract codebase snippets.\n4. Click 'Play / Presentation arrow' in top right toolbar to view the actual clean page fullscreen.")}
            id="help-floating-btn"
          >
            <i className="bi bi-question" style={{ fontSize: "16px" }}></i>
          </button>

        </div>
      ) : (
        /* 2. Standard Web-Site Presentation Mode (Hides all Figma interface and shows clean landing page) */
        <div className="presentation-view position-relative w-100 min-h-screen bg-white">
          
          {/* Micro toolbar at the top of fullpage presentation preview */}
          <div 
            className="p-2 bg-dark text-white d-flex justify-content-between align-items-center px-4 w-100"
            style={{ zIndex: 2000, position: "sticky", top: 0, opacity: 0.95 }}
            id="presentation-info-bar"
          >
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-success text-xxs">Live Presentation</span>
              <span className="text-white-50 text-xs d-none d-md-inline">Reviewing Whitepace Production Landing Page</span>
            </div>

            <div className="d-flex gap-2">
              <button 
                onClick={() => setViewMode("figma")}
                className="btn btn-sm btn-outline-light text-xs py-1 px-3 d-flex align-items-center gap-1 border-stone-600 rounded-pill"
                style={{ fontSize: "11px" }}
                id="back-to-editor-btn"
              >
                <i className="bi bi-chevron-left"></i> Back to Figma Editor
              </button>
              <button 
                onClick={resetToCenter}
                className="btn btn-sm btn-primary text-xs py-1 px-3 d-flex align-items-center gap-1 rounded-pill"
                style={{ fontSize: "11px", backgroundColor: "#0d99ff" }}
                id="presentation-reset-btn"
              >
                <i className="bi bi-arrows-expand"></i> Zoom to Fit Artboards
              </button>
            </div>
          </div>

          {/* Render Navbar */}
          <Navbar onOpenLogin={onOpenLogin} activeSection={selectedLayer} />

          {/* Complete scrollable landing page segments */}
          <div style={{ marginTop: "78px" }}>
            <Hero onStartTrial={() => scrollCanvasToLayer("pricing")} />
            <EditorPlayground />
            <Features />
            <Pricing onSelectPlan={onOpenCheckout} />
            <Everywhere />
            <DataSection />
            <Integrations />
            <Testimonials />
            <Footer onNewsletterSignup={(email) => alert(`Mockup Newsletter Subscribed for email: ${email}`)} />
          </div>

        </div>
      )}

    </div>
  );
}
