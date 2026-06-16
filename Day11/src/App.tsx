/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { PortfolioData, ThemeConfig } from "./types";
import { defaultPortfolioData } from "./defaultData";
import { generateBootstrapHtml } from "./utils/exporter";
import BuilderPanel from "./components/BuilderPanel";
import PortfolioPreview from "./components/PortfolioPreview";
import { Sparkles, CheckCircle, Eye, Settings, Menu, Layers } from "lucide-react";

export default function App() {
  // 1. Initial State Initialization & LocalStorage persistence standard
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem("portfolio_content_v2");
    return saved ? JSON.parse(saved) : defaultPortfolioData;
  });

  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem("portfolio_theme_v2");
    return saved ? JSON.parse(saved) : {
      primaryColor: "Slate",
      fontFamily: "Space Grotesk",
      visualStyle: "minimal"
    };
  });

  const [inboxMessages, setInboxMessages] = useState<any[]>(() => {
    const saved = localStorage.getItem("portfolio_inbox_v2");
    return saved ? JSON.parse(saved) : [];
  });

  // Client display UI states
  const [activeMobileView, setActiveMobileView] = useState<"builder" | "preview">("preview");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [generatedAutoReply, setGeneratedAutoReply] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("portfolio_content_v2", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("portfolio_theme_v2", JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("portfolio_inbox_v2", JSON.stringify(inboxMessages));
  }, [inboxMessages]);

  // Reset form success state after some delay
  useEffect(() => {
    if (contactSuccess) {
      const timer = setTimeout(() => {
        setContactSuccess(false);
        setGeneratedAutoReply(null);
      }, 10000); // 10 seconds display
      return () => clearTimeout(timer);
    }
  }, [contactSuccess]);

  // 2. Interactive message delivery handler (Connects to fullstack Express /api/contact-reply)
  const handleContactSubmit = async (senderName: string, senderEmail: string, senderMessage: string) => {
    setSendingMessage(true);
    setGeneratedAutoReply(null);

    try {
      const payload = {
        senderName,
        senderEmail,
        senderMessage,
        portfolioOwnerName: data.fullName,
        portfolioOwnerTitle: data.title
      };

      const res = await fetch("/api/contact-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const resData = await res.json();
      const aiReply = resData.reply || `Hi ${senderName}, thanks for connecting! I will get back to you shortly.`;

      // Log the message inside the builder dashboard inbox
      const newMail = {
        id: `msg-${Date.now()}`,
        senderName,
        senderEmail,
        senderMessage,
        receivedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " (Today)",
        aiReply
      };

      setInboxMessages(prev => [newMail, ...prev]);
      setGeneratedAutoReply(aiReply);
      setContactSuccess(true);
    } catch (err) {
      console.error("Error submitting contact inquiry:", err);
      // Failover beautifully to standard local simulation if express server has transient errors
      const fallbackReply = `Hi ${senderName},\n\nThank you for reaching out! I've received your query about: "${senderMessage.substring(0, 30)}...". I appreciate your interest and will provide a concrete reply very shortly.\n\nBest regards,\n${data.fullName}`;
      
      const pageMail = {
        id: `msg-${Date.now()}`,
        senderName,
        senderEmail,
        senderMessage,
        receivedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " (Offline-mock)",
        aiReply: fallbackReply
      };

      setInboxMessages(prev => [pageMail, ...prev]);
      setGeneratedAutoReply(fallbackReply);
      setContactSuccess(true);
    } finally {
      setSendingMessage(false);
    }
  };

  // 3. Compile portfolio details & Trigger local device download of Bootstrap HTML
  const handleExportHtml = () => {
    try {
      const parsedHtml = generateBootstrapHtml(data, theme);
      
      // Generate virtual object download
      const element = document.createElement("a");
      const file = new Blob([parsedHtml], { type: "text/html;charset=utf-8" });
      element.href = URL.createObjectURL(file);
      element.download = `${data.fullName.toLowerCase().replace(/\s+/g, "_")}_portfolio.html`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (err) {
      console.error("Failed to export HTML code segment:", err);
    }
  };

  return (
    <div className="w-full h-screen bg-[#0d0e15] flex flex-col overflow-hidden font-inter text-slate-100">
      
      {/* Primary Workspace responsive grid split */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* VIEW COLUMN 1: Customizer builder (Visible on desktop, or if 'builder' tab active on mobile) */}
        <div className={`w-full lg:w-[35%] xl:w-[30%] h-full flex flex-col ${
          activeMobileView === "builder" ? "block" : "hidden lg:flex"
        }`}>
          <BuilderPanel 
            data={data}
            setData={setData}
            theme={theme}
            setTheme={setTheme}
            onExport={handleExportHtml}
            inboxMessages={inboxMessages}
          />
        </div>

        {/* VIEW COLUMN 2: Real-time visual iframe/preview simulator (Visible on desktop, or if 'preview' tab active on mobile) */}
        <div className={`w-full lg:w-[65%] xl:w-[70%] h-full overflow-y-auto flex flex-col bg-slate-900 ${
          activeMobileView === "preview" ? "block" : "hidden lg:block"
        }`}>
          <PortfolioPreview 
            data={data}
            theme={theme}
            onContactSubmit={handleContactSubmit}
            sendingMessage={sendingMessage}
            contactSuccess={contactSuccess}
            generatedAutoReply={generatedAutoReply}
          />
        </div>

      </div>

      {/* MOBILE SWITCHER BAR: Rendered only on viewport small screens */}
      <div className="lg:hidden border-t border-slate-800 bg-[#161720] py-3.5 px-6 flex justify-around items-center z-50 shadow-2xl">
        <button 
          type="button"
          onClick={() => setActiveMobileView("builder")}
          className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all ${
            activeMobileView === "builder" 
              ? "bg-[#00ffcc] text-black font-semibold shadow-[0_0_10px_rgba(0,255,204,0.25)]" 
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Settings className="w-4 h-4" /> Customize Content
        </button>

        <button 
          type="button"
          onClick={() => setActiveMobileView("preview")}
          className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all ${
            activeMobileView === "preview" 
              ? "bg-[#00ffcc] text-black font-semibold shadow-[0_0_10px_rgba(0,255,204,0.25)]" 
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Eye className="w-4 h-4" /> Live Web Preview
        </button>
      </div>

    </div>
  );
}
