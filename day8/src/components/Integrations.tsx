import { useState } from "react";

export default function Integrations() {
  const [selectedApp, setSelectedApp] = useState<"slack" | "dropbox" | "drive" | "zoom">("slack");

  const appDetails = {
    slack: {
      title: "Slack Notification Hub",
      badge: "CHAT INTEGRATED",
      desc: "Receive real-time notifications about workspace edits, task completions, and status updates directly in designated Slack channels.",
      event: "SUCCESS: Connected to slack workspace (#whitepace-updates)",
      action: "Send Test Webhook Message",
      colorClass: "text-warning",
      icon: "bi-slack"
    },
    dropbox: {
      title: "Dropbox Cloud Repository",
      badge: "FILE ACCESS ACTIVE",
      desc: "Synchronize local folder backups and export single notes or complete canvases into PDF and markdown formats under secure Dropbox directory paths.",
      event: "READY: 24 active notes synced securely",
      action: "Trigger Directory Audit",
      colorClass: "text-primary",
      icon: "bi-box"
    },
    drive: {
      title: "Google Drive File Sync",
      badge: "DRIVE MOUNTED",
      desc: "Auto-generate Google Docs or save large spreadsheet attachments directly from your workspace canvas nodes with instant background synchronization.",
      event: "SUCCESS: Account synced to google-cloud storage",
      action: "Run Clean Sync Backup",
      colorClass: "text-success",
      icon: "bi-google"
    },
    zoom: {
      title: "Zoom Screen Sync",
      badge: "MEETING ENGINE MOUNTED",
      desc: "Generate active Zoom meeting links directly inside your project checklist node so that team members can hop on calls instantly from the canvas.",
      event: "IDLE: Ready to spawn active room links",
      action: "Generate Test Meeting URL",
      colorClass: "text-info",
      icon: "bi-camera-video-fill"
    },
  };

  const [simulatedLog, setSimulatedLog] = useState<string>("Click 'Test integration' below to simulate active API logs...");

  const runTestTrigger = (appKey: "slack" | "dropbox" | "drive" | "zoom") => {
    setSimulatedLog(`INITIALIZING: Handshake request to ${appKey}...`);
    setTimeout(() => {
      if (appKey === "slack") {
        setSimulatedLog(`[API HOOK] Sent Slack payload successfully! Alert dispatched to channel #whitepace-updates: 'Launch checklist complete'`);
      } else if (appKey === "dropbox") {
        setSimulatedLog(`[API STORAGE] Indexed directory: /Apps/Whitepace_Backups/. 24 components successfully uploaded and verified.`);
      } else if (appKey === "drive") {
        setSimulatedLog(`[API DRIVE] Syncing complete. Created file 'whitepace_notes_backup_june2026.json' inside Google Drive Root Folder.`);
      } else {
        setSimulatedLog(`[API ZOOM] Room link spawned successfully: https://zoom.us/j/9821430985 (Passcode: WHP2026)`);
      }
    }, 450);
  };

  return (
    <div id="integrations-container" className="bg-white">
      {/* 1. Work with Your Favorite Apps Section */}
      <section className="py-5 bg-whitepace-navy text-white" style={{ paddingBottom: "100px !important", paddingTop: "80px !important" }} id="favorite-apps">
        <div className="container">
          <div className="row align-items-center gy-5">
            {/* Left Column: Visual Mockup with interactive connections */}
            <div className="col-lg-6" id="favorite-apps-image">
              <div className="card shadow-lg border-0 bg-dark text-white p-4 rounded-4" style={{ minHeight: "360px", backgroundColor: "#062247 !important", border: "1px solid #1a3250 !important" }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="mono-font text-xs text-uppercase text-whitepace-yellow fw-bold">
                    🚀 Live Apps Synchronizer
                  </span>
                  <span className="badge bg-danger text-xxs" style={{ fontSize: "10px" }}><i className="bi bi-broadcast"></i> Sync Relay: Active</span>
                </div>

                <div className="row g-3">
                  {/* Selector circles simulating connection nodes */}
                  <div className="col-12 text-center py-2.5">
                    <div className="d-flex justify-content-center align-items-center gap-4">
                      {/* Whitepace Center Logo */}
                      <div className="bg-whitepace-blue p-2 rounded-circle shadow border border-3 border-white animate-bounce" style={{ width: "60px", height: "60px" }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 12L12 4L20 12L12 20L4 12Z" fill="#FFE492" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* App selectors buttons layout inside visual mock */}
                  <div className="col-12 mt-4">
                    <div className="row g-2">
                      <div className="col-3">
                        <button 
                          onClick={() => { setSelectedApp("slack"); setSimulatedLog("Click 'Send Test Webhook' to test Slack communication..."); }}
                          className={`btn w-100 py-3 rounded-3 border-0 transition-all ${selectedApp === "slack" ? "bg-whitepace-blue text-white shadow-md font-bold" : "bg-dark text-white-50"}`}
                          style={{ minHeight: "65px", backgroundColor: selectedApp === "slack" ? "#4F9CF9" : "#041935" }}
                        >
                          <i className="bi bi-slack fs-4"></i>
                        </button>
                      </div>
                      <div className="col-3">
                        <button 
                          onClick={() => { setSelectedApp("dropbox"); setSimulatedLog("Click 'Trigger Directory Audit' to sync Dropbox folders..."); }}
                          className={`btn w-100 py-3 rounded-3 border-0 transition-all ${selectedApp === "dropbox" ? "bg-whitepace-blue text-white shadow-md font-bold" : "bg-dark text-white-50"}`}
                          style={{ minHeight: "65px", backgroundColor: selectedApp === "dropbox" ? "#4F9CF9" : "#041935" }}
                        >
                          <i className="bi bi-box fs-4"></i>
                        </button>
                      </div>
                      <div className="col-3">
                        <button 
                          onClick={() => { setSelectedApp("drive"); setSimulatedLog("Click 'Run Clean Sync' to push files inside Drive..."); }}
                          className={`btn w-100 py-3 rounded-3 border-0 transition-all ${selectedApp === "drive" ? "bg-whitepace-blue text-white shadow-md font-bold" : "bg-dark text-white-50"}`}
                          style={{ minHeight: "65px", backgroundColor: selectedApp === "drive" ? "#4F9CF9" : "#041935" }}
                        >
                          <i className="bi bi-google fs-4"></i>
                        </button>
                      </div>
                      <div className="col-3">
                        <button 
                          onClick={() => { setSelectedApp("zoom"); setSimulatedLog("Click 'Generate Test Meeting' to spawn active URLs..."); }}
                          className={`btn w-100 py-3 rounded-3 border-0 transition-all ${selectedApp === "zoom" ? "bg-whitepace-blue text-white shadow-md font-bold" : "bg-dark text-white-50"}`}
                          style={{ minHeight: "65px", backgroundColor: selectedApp === "zoom" ? "#4F9CF9" : "#041935" }}
                        >
                          <i className="bi bi-camera-video-fill fs-4"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Simulated interaction logger console */}
                  <div className="col-12">
                    <div className="bg-dark p-3 rounded border border-light-dark" style={{ backgroundColor: "#041935 !important", borderColor: "#1a3250 !important" }}>
                      <div className="d-flex justify-content-between align-items-center mb-1.5 pb-1 select-none">
                        <span className="text-xxs text-muted mono-font" style={{ fontSize: "9px" }}>API LOGGER TERMINAL</span>
                        <div className="d-flex gap-1">
                          <span className="bg-danger rounded-circle" style={{ width: "6px", height: "6px" }}></span>
                          <span className="bg-warning rounded-circle" style={{ width: "6px", height: "6px" }}></span>
                        </div>
                      </div>
                      <p className="text-success text-xxs mono-font mb-0 text-truncate" style={{ fontSize: "10.5px" }}>
                        {simulatedLog}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text content */}
            <div className="col-lg-6" id="favorite-apps-content">
              <div className="ps-lg-5">
                <span className="badge bg-whitepace-blue text-white px-3 py-2 text-xs mb-3 text-uppercase fw-semibold rounded-pill">
                  ⚡ Absolute Integration
                </span>
                <h2 className="display-5 fw-bold mb-4">
                  Work with Your Favorite Apps
                </h2>
                <p className="text-whitepace-muted mb-4 leading-relaxed" style={{ fontSize: "1.1rem" }}>
                  Whitepace integrates with your favorite personal and professional tools to maximize efficiency and keep all your insights in one place.
                </p>
                <p className="text-whitepace-muted mb-4 leading-relaxed">
                  Avoid bouncing around tabs. By binding Slack API nodes, DropBox storage feeds, and calendar agendas together, you can compile and publish notes in seconds.
                </p>

                {/* Simulated active information details based on selectedApp */}
                <div className="card p-3 border-start border-3 border-whitepace-blue bg-dark text-white mb-5 rounded-3" style={{ backgroundColor: "#062247 !important", border: "1px solid #1a3250 !important", borderLeft: "4px solid #4F9CF9 !important" }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold text-white text-xs">{appDetails[selectedApp].title}</span>
                    <span className="badge bg-success py-1 text-xxs">{appDetails[selectedApp].badge}</span>
                  </div>
                  <p className="text-whitepace-muted text-xs mb-3">{appDetails[selectedApp].desc}</p>
                  <button 
                    onClick={() => runTestTrigger(selectedApp)}
                    className="btn btn-sm btn-whitepace-primary text-xs py-1.5 px-3 self-start align-self-start gap-1 d-flex align-items-center"
                  >
                    <i className={`bi ${appDetails[selectedApp].icon}`}></i>
                    {appDetails[selectedApp].action}
                  </button>
                </div>

                <a href="#pricing" className="btn btn-whitepace-yellow py-3 px-5 rounded d-inline-flex align-items-center gap-2">
                  Explore integrations <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Sponsors Section */}
      <section className="py-5 bg-white border-top border-bottom" id="sponsors">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold text-whitepace-navy mb-1 text-uppercase tracking-wider">
              Our Sponsors
            </h2>
            <p className="text-muted text-sm mb-0">Powering collaborative workforces around the globe</p>
          </div>

          <div className="row align-items-center justify-content-center text-center g-5 py-3">
            {/* Sponsor 1: Apple */}
            <div className="col-4 col-md-2" id="sponsor-apple">
              <div className="text-secondary opacity-50 hover:opacity-100 transition-opacity" style={{ cursor: "pointer" }}>
                <i className="bi bi-apple display-6 d-block mb-2"></i>
                <span className="fw-semibold small">Apple Inc.</span>
              </div>
            </div>
            {/* Sponsor 2: Microsoft */}
            <div className="col-4 col-md-2" id="sponsor-microsoft">
              <div className="text-secondary opacity-50 hover:opacity-100 transition-opacity" style={{ cursor: "pointer" }}>
                <i className="bi bi-microsoft display-6 d-block mb-2 text-primary"></i>
                <span className="fw-semibold small">Microsoft</span>
              </div>
            </div>
            {/* Sponsor 3: Slack */}
            <div className="col-4 col-md-2" id="sponsor-slack">
              <div className="text-secondary opacity-50 hover:opacity-100 transition-opacity" style={{ cursor: "pointer" }}>
                <i className="bi bi-slack display-6 d-block mb-2 text-warning"></i>
                <span className="fw-semibold small">Slack</span>
              </div>
            </div>
            {/* Sponsor 4: Google */}
            <div className="col-4 col-md-2" id="sponsor-google">
              <div className="text-secondary opacity-50 hover:opacity-100 transition-opacity" style={{ cursor: "pointer" }}>
                <i className="bi bi-google display-6 d-block mb-2 text-danger"></i>
                <span className="fw-semibold small">Google</span>
              </div>
            </div>
            {/* Sponsor 5: GitHub */}
            <div className="col-4 col-md-2" id="sponsor-github">
              <div className="text-secondary opacity-50 hover:opacity-100 transition-opacity" style={{ cursor: "pointer" }}>
                <i className="bi bi-github display-6 d-block mb-2 text-dark"></i>
                <span className="fw-semibold small">GitHub</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
