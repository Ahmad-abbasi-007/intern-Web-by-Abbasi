import { useState, useEffect } from "react";

export default function Features() {
  // Cooperative typing state (Work Together Section)
  const [collabNotes, setCollabNotes] = useState<string>("Colleague edits will appear here...");
  const [editorTarget, setEditorTarget] = useState<"Alex" | "Sarah">("Alex");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Customization Section theme preview state
  const [customTheme, setCustomTheme] = useState<"clean" | "midnight" | "sage">("clean");
  const [layoutType, setLayoutType] = useState<"editor" | "split" | "outline">("editor");

  // Extension activation state
  const [extensions, setExtensions] = useState({
    slack: true,
    drive: false,
    trello: true,
    github: false,
  });

  // Math interactive input (Project Management Section)
  const [mathA, setMathA] = useState<number>(3);
  const [mathB, setMathB] = useState<number>(4);

  // Cooperative typing handler
  const triggerCollabEdit = (user: "Alex" | "Sarah") => {
    setEditorTarget(user);
    setIsTyping(true);
    let phrases = {
      Alex: "Alex: Added the competitive analysis slides from yesterday. Check note #14!",
      Sarah: "Sarah: Refined the pricing plans. We should match the organization tier features!"
    };
    
    let currentText = "";
    let targetText = phrases[user];
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < targetText.length) {
        currentText += targetText.charAt(index);
        setCollabNotes(currentText);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 45);
  };

  // Download user backup (100% Data ownership section)
  const handleDownloadBackup = () => {
    const dataObj = {
      whitepace_space_version: "1.0",
      notes_count: 5,
      export_date: new Date().toISOString(),
      notes: [
        { id: 1, title: "Competitor Audit", content: "Collect competitors design specs and responsive components." },
        { id: 2, title: "Launch Checklists", content: "Ensure proper navigation drawers are configured." },
        { id: 3, title: "Pricing Framework", content: "Review tiers against organizations size limits." }
      ]
    };

    const fileData = JSON.stringify(dataObj, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `whitepace_open_data_backup.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="features" className="bg-white">
      {/* 1. Project Management Section */}
      <section className="py-5" style={{ paddingBottom: "80px !important" }}>
        <div className="container">
          <div className="row align-items-center gy-5">
            {/* Left Column: Text */}
            <div className="col-lg-6" id="pm-content">
              <div className="pe-lg-5">
                <h2 className="display-5 fw-bold text-whitepace-navy mb-4">
                  Project Management
                </h2>
                <p className="text-secondary mb-4 leading-relaxed" style={{ fontSize: "1.1rem" }}>
                  Images, videos, PDFs and audio files are supported. Create math equations and diagrams directly from the app. Take photos with the mobile app and save them to a note.
                </p>
                <p className="text-secondary mb-5 leading-relaxed">
                  With a robust editor design, format code blocks, render complex math calculations, and coordinate deliverables. Never lose your focus with clutter-free templates.
                </p>

                {/* Math Previewer Interactive Block inside page */}
                <div className="card border-0 bg-light p-4 mb-5 shadow-sm rounded">
                  <span className="mono-font text-xs text-whitepace-blue fw-bold text-uppercase mb-2">
                    🧮 Live Equation Engine
                  </span>
                  <div className="row align-items-center g-3">
                    <div className="col-auto">
                      <label className="text-xs text-muted mb-1 d-block">Variable A</label>
                      <input 
                        type="number" 
                        value={mathA} 
                        onChange={(e) => setMathA(Number(e.target.value))} 
                        className="form-control form-control-sm" 
                        style={{ width: "80px" }}
                      />
                    </div>
                    <div className="col-auto">
                      <label className="text-xs text-muted mb-1 d-block">Variable B</label>
                      <input 
                        type="number" 
                        value={mathB} 
                        onChange={(e) => setMathB(Number(e.target.value))} 
                        className="form-control form-control-sm" 
                        style={{ width: "80px" }}
                      />
                    </div>
                    <div className="col">
                      <div className="bg-white p-2 text-center rounded border">
                        <span className="mono-font text-muted font-light overflow-x-auto text-xs">
                          {"c = \\sqrt{"}{mathA}² + {mathB}²{"}"}
                        </span>
                        <div className="fw-bold text-whitepace-navy mt-1" style={{ fontSize: "0.95rem" }}>
                          Hypotenuse c = <span className="text-primary">{Math.sqrt(mathA * mathA + mathB * mathB).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a href="#pricing" className="btn btn-whitepace-primary py-3 px-5 rounded d-inline-flex align-items-center gap-2">
                  Get Started <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Note Workspace Visual */}
            <div className="col-lg-6" id="pm-image">
              <div className="card shadow border-0 bg-whitepace-skyblue p-4 rounded-4" style={{ minHeight: "350px" }}>
                <span className="mono-font text-dark-50 text-xs text-uppercase fw-semibold mb-3">
                  🗒️ Multi-format rich elements workspace
                </span>

                <div className="row g-3">
                  {/* Visual card 1: Math note */}
                  <div className="col-sm-6">
                    <div className="card border-0 shadow-sm p-3 h-100 rounded bg-white">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <i className="bi bi-file-earmark-code text-danger fs-5"></i>
                        <h6 className="fw-bold mb-0 text-dark text-xs">Pythagorean Note</h6>
                      </div>
                      <p className="text-muted text-xxs mb-3" style={{ fontSize: "11px" }}>Computed result for triangle calculation is verified successfully.</p>
                      <div className="bg-light p-2 rounded text-center border">
                        <code className="text-danger text-xxs block">{"c = \\sqrt{a^2 + b^2}"}</code>
                      </div>
                    </div>
                  </div>

                  {/* Visual card 2: Audio/Attach note */}
                  <div className="col-sm-6">
                    <div className="card border-0 shadow-sm p-3 h-100 rounded bg-white">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <i className="bi bi-music-note-beamed text-whitepace-blue fs-5"></i>
                        <h6 className="fw-bold mb-0 text-dark text-xs">Interview Record.mp3</h6>
                      </div>
                      <div className="bg-light p-2 rounded d-flex align-items-center gap-2 mb-2">
                        <button className="btn btn-sm btn-whitepace-blue p-0 rounded-circle d-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px" }}>
                          <i className="bi bi-play-fill text-white" style={{ fontSize: "10px" }}></i>
                        </button>
                        <div className="progress flex-grow-1" style={{ height: "4px" }}>
                          <div className="progress-bar bg-primary" style={{ width: "35%" }}></div>
                        </div>
                        <span className="text-xxs text-muted" style={{ fontSize: "10px" }}>02:14</span>
                      </div>
                      <p className="text-muted mb-0" style={{ fontSize: "11px" }}>Recording from synthesis workshop.</p>
                    </div>
                  </div>

                  {/* Visual card 3: Media gallery note */}
                  <div className="col-12">
                    <div className="card border-0 shadow-sm p-3 rounded bg-white">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-image text-success fs-5"></i>
                          <h6 className="fw-bold mb-0 text-dark text-xs">Architecture board.png</h6>
                        </div>
                        <span className="badge bg-light text-muted text-xxs" style={{ fontSize: "9px" }}>980 KB</span>
                      </div>
                      <div className="row g-2">
                        <div className="col col-lg-3">
                          <div className="bg-whitepace-navy rounded text-center p-3 text-whitepace-yellow" style={{ fontSize: "14px" }}>
                            <i className="bi bi-grid-3x3-gap"></i>
                          </div>
                        </div>
                        <div className="col">
                          <div className="bg-light rounded p-2 h-100 d-flex flex-column justify-content-center">
                            <span className="text-xxs fw-bold text-stone-700" style={{ fontSize: "11px" }}>Mobile sketch captured</span>
                            <span className="text-xxs text-muted" style={{ fontSize: "10px" }}>Synchronized via iCloud auto-backup</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Work Together Section */}
      <section className="py-5" style={{ backgroundColor: "#fafbfc", paddingBottom: "100px !important" }} id="collaboration">
        <div className="container">
          <div className="row align-items-center gy-5 flex-lg-row-reverse">
            {/* Right Column: Text */}
            <div className="col-lg-6" id="collaboration-content">
              <div className="ps-lg-5">
                <h2 className="display-5 fw-bold text-whitepace-navy mb-4">
                  Work together
                </h2>
                <p className="text-secondary mb-4 leading-relaxed" style={{ fontSize: "1.1rem" }}>
                  With whitepace, share your notes with your colleagues and collaborate on them. You can also publish a note to the web and share the link with anyone.
                </p>
                <p className="text-secondary mb-5 leading-relaxed">
                  Real-time synchronization allows multiple team members to edit at once. Tag users with comments, delegate specific tasks, and watch productivity spike instantly.
                </p>

                {/* Cooperative Interactive Triggers */}
                <div className="d-flex flex-wrap gap-2 mb-5">
                  <button 
                    onClick={() => triggerCollabEdit("Alex")}
                    className={`btn btn-sm ${editorTarget === "Alex" ? "btn-whitepace-primary" : "btn-whitepace-outline-dark"} py-2 px-3`}
                  >
                    <i className="bi bi-person-fill"></i> Simulate Alex's Edit
                  </button>
                  <button 
                    onClick={() => triggerCollabEdit("Sarah")}
                    className={`btn btn-sm ${editorTarget === "Sarah" ? "btn-whitepace-primary" : "btn-whitepace-outline-dark"} py-2 px-3`}
                  >
                    <i className="bi bi-person-fill"></i> Simulate Sarah's Edit
                  </button>
                </div>

                <a href="#pricing" className="btn btn-whitepace-primary py-3 px-5 rounded d-inline-flex align-items-center gap-2">
                  Try it now <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* Left Column: Interactive typing graphic */}
            <div className="col-lg-6" id="collaboration-image">
              <div className="card shadow border-0 bg-whitepace-skyblue p-4 rounded-4 position-relative" style={{ minHeight: "350px" }}>
                <span className="mono-font text-dark-50 text-xs text-uppercase fw-semibold mb-3">
                  💬 Real-Time Co-authoring Sandbox
                </span>

                <div className="bg-white p-3 rounded shadow-sm flex-grow-1 d-flex flex-column justify-content-between mb-2">
                  <div>
                    <div className="d-flex justify-content-between align-items-center pb-2 mb-3 border-bottom">
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-warning rounded-circle" style={{ width: "10px", height: "10px" }}></div>
                        <span className="fw-bold text-xs">Shared Document: pricing_plans.docx</span>
                      </div>
                      <div className="d-flex gap-1.5 align-items-center">
                        <span className="badge bg-light text-muted text-xxs">3 Active</span>
                      </div>
                    </div>

                    <div className="p-2 bg-light rounded" style={{ minHeight: "105px" }}>
                      <p className="text-xs text-secondary mb-1">
                        We should draft an intuitive, clean interface based on the Whitepace SaaS Figma layout parameters. 
                      </p>
                      
                      {/* Live text output with highlight marker */}
                      <p className="text-xs text-dark fw-bold mb-0 position-relative">
                        {collabNotes}
                        {isTyping && (
                          <span 
                            className="position-absolute h-100 bg-whitepace-blue" 
                            style={{ width: "2px", marginLeft: "2px", animation: "blink 1s step-end infinite" }}
                          ></span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Cursor Overlays representing live editing */}
                  <div className="d-flex justify-content-between align-items-center mt-3 pt-2">
                    <div className="d-flex gap-2">
                      <div className={`badge ${editorTarget === "Alex" ? "bg-primary" : "bg-light text-muted"} p-1.5 d-flex align-items-center gap-1.5`}>
                        <i className="bi bi-cursor-fill"></i> Alex 
                        {editorTarget === "Alex" && isTyping && <span className="small text-whitepace-yellow">Typing...</span>}
                      </div>
                      <div className={`badge ${editorTarget === "Sarah" ? "bg-success" : "bg-light text-muted"} p-1.5 d-flex align-items-center gap-1.5`}>
                        <i className="bi bi-cursor-fill"></i> Sarah 
                        {editorTarget === "Sarah" && isTyping && <span className="small text-whitepace-yellow">Typing...</span>}
                      </div>
                    </div>
                    <span className="text-xxs text-muted" style={{ fontSize: "10px" }}><i className="bi bi-clock-history"></i> Auto-saved 1s ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Use as Extension (Dark Background Section) */}
      <section className="py-5 bg-whitepace-navy text-white" style={{ paddingBottom: "100px !important" }} id="extension">
        <div className="container">
          <div className="row align-items-center gy-5">
            {/* Left Column: Text */}
            <div className="col-lg-6" id="extension-content">
              <div className="pe-lg-5">
                <h2 className="display-5 fw-bold mb-4">
                  Use as Extension
                </h2>
                <p className="text-whitepace-muted mb-4 leading-relaxed" style={{ fontSize: "1.1rem" }}>
                  Customise the app with extensions, plugins and themes that help you get more done.
                </p>
                <p className="text-whitepace-muted mb-5 leading-relaxed">
                  Connect third-party web apps cleanly into your system. Use custom integrations to pipe communications from chat spaces directly into a specific canvas note.
                </p>

                {/* Extension interactive checklist */}
                <div className="card bg-dark border-0 p-4 mb-5" style={{ backgroundColor: "#062247 !important" }}>
                  <span className="mono-font text-xs text-whitepace-yellow fw-bold text-uppercase mb-3">
                    🧩 Toggle Enabled Plugins
                  </span>
                  
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="form-check form-switch bg-dark-50 p-2 rounded d-flex justify-content-between align-items-center">
                        <label className="form-check-label text-xs fw-medium ps-1" htmlFor="switch-slack">
                          <i className="bi bi-slack text-whitepace-blue me-2"></i> Slack Connector
                        </label>
                        <input 
                          className="form-check-input mt-0" 
                          type="checkbox" 
                          id="switch-slack" 
                          checked={extensions.slack} 
                          onChange={() => setExtensions({...extensions, slack: !extensions.slack})}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check form-switch bg-dark-50 p-2 rounded d-flex justify-content-between align-items-center">
                        <label className="form-check-label text-xs fw-medium ps-1" htmlFor="switch-drive">
                          <i className="bi bi-google me-2"></i> Google Drive
                        </label>
                        <input 
                          className="form-check-input mt-0" 
                          type="checkbox" 
                          id="switch-drive" 
                          checked={extensions.drive} 
                          onChange={() => setExtensions({...extensions, drive: !extensions.drive})}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check form-switch bg-dark-50 p-2 rounded d-flex justify-content-between align-items-center">
                        <label className="form-check-label text-xs fw-medium ps-1" htmlFor="switch-trello">
                          <i className="bi bi-kanban me-2 text-warning"></i> Trello Sync
                        </label>
                        <input 
                          className="form-check-input mt-0" 
                          type="checkbox" 
                          id="switch-trello" 
                          checked={extensions.trello} 
                          onChange={() => setExtensions({...extensions, trello: !extensions.trello})}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check form-switch bg-dark-50 p-2 rounded d-flex justify-content-between align-items-center">
                        <label className="form-check-label text-xs fw-medium ps-1" htmlFor="switch-github">
                          <i className="bi bi-github me-2 text-white"></i> GitHub Deployer
                        </label>
                        <input 
                          className="form-check-input mt-0" 
                          type="checkbox" 
                          id="switch-github" 
                          checked={extensions.github} 
                          onChange={() => setExtensions({...extensions, github: !extensions.github})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <a href="#pricing" className="btn btn-whitepace-primary py-3 px-5 rounded d-inline-flex align-items-center gap-2">
                  Let’s Go <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Mockup illustrating dynamic connector blocks */}
            <div className="col-lg-6" id="extension-image">
              <div className="card shadow border-0 bg-dark p-4 rounded-4 position-relative" style={{ minHeight: "350px", backgroundColor: "#062247 !important" }}>
                <span className="mono-font text-white-50 text-xs text-uppercase fw-semibold mb-3">
                  🔌 Extensions Router System
                </span>

                <div className="d-flex flex-column gap-3 justify-content-center h-100 flex-grow-1">
                  {/* Extension Channel 1 */}
                  <div className={`p-3 rounded border d-flex justify-content-between align-items-center transition-all ${extensions.slack ? "border-primary bg-dark-50 text-white" : "border-secondary text-white-50 opacity-50"}`}>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-slack fs-5 text-warning"></i>
                      <div>
                        <span className="fw-bold text-xs d-block">Slack Integration Channel</span>
                        <span className="small text-xxs block" style={{ fontSize: "10px" }}>Active webhook: #wp-notifications</span>
                      </div>
                    </div>
                    <span className={`badge ${extensions.slack ? "bg-success" : "bg-secondary"}`}>
                      {extensions.slack ? "CONNECTED" : "OFFLINE"}
                    </span>
                  </div>

                  {/* Extension Channel 2 */}
                  <div className={`p-3 rounded border d-flex justify-content-between align-items-center transition-all ${extensions.drive ? "border-primary bg-dark-50 text-white" : "border-secondary text-white-50 opacity-50"}`}>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-google fs-5 text-info"></i>
                      <div>
                        <span className="fw-bold text-xs d-block">Google Drive File Syncing</span>
                        <span className="small text-xxs block" style={{ fontSize: "10px" }}>Auto-upload PDFs and spreadsheets</span>
                      </div>
                    </div>
                    <span className={`badge ${extensions.drive ? "bg-success" : "bg-secondary"}`}>
                      {extensions.drive ? "CONNECTED" : "OFFLINE"}
                    </span>
                  </div>

                  {/* Extension Channel 3 */}
                  <div className={`p-3 rounded border d-flex justify-content-between align-items-center transition-all ${extensions.trello ? "border-primary bg-dark-50 text-white" : "border-secondary text-white-50 opacity-50"}`}>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-kanban fs-5 text-warning"></i>
                      <div>
                        <span className="fw-bold text-xs d-block">Trello Agile Card Import</span>
                        <span className="small text-xxs block" style={{ fontSize: "10px" }}>Sync cards triggers on status update</span>
                      </div>
                    </div>
                    <span className={`badge ${extensions.trello ? "bg-success" : "bg-secondary"}`}>
                      {extensions.trello ? "CONNECTED" : "OFFLINE"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Customise it to your needs */}
      <section className="py-5" style={{ paddingBottom: "100px !important" }} id="customise">
        <div className="container">
          <div className="row align-items-center gy-5 flex-lg-row-reverse">
            {/* Right Column: Text */}
            <div className="col-lg-6" id="customise-content">
              <div className="ps-lg-5">
                <h2 className="display-5 fw-bold text-whitepace-navy mb-4">
                  Customise it to your needs
                </h2>
                <p className="text-secondary mb-4 leading-relaxed" style={{ fontSize: "1.1rem" }}>
                  Customise the app with plugins, custom themes and multiple layouts to make it work for you.
                </p>
                <p className="text-secondary mb-5 leading-relaxed">
                  Choose between high-contrast light formats or ambient twilight palettes. Adjust task list patterns, sidebar alignments, and toolbar density to reflect your personal workflow.
                </p>

                {/* Theme / Layout Selector interactive controller */}
                <div className="card bg-light border-0 p-4 mb-5 shadow-sm rounded">
                  <span className="mono-font text-xs text-whitepace-blue fw-bold text-uppercase mb-3">
                    🎨 Visual customizer presets
                  </span>

                  <div className="row g-2 align-items-center">
                    <div className="col-md-6">
                      <label className="text-xs text-muted mb-1 d-block">Theme Accent</label>
                      <div className="d-flex gap-2">
                        <button 
                          onClick={() => setCustomTheme("clean")} 
                          className={`btn btn-xs py-1.5 px-3 rounded-pill border text-xs ${customTheme === "clean" ? "btn-whitepace-primary" : "btn-light"}`}
                        >
                          Classic Slate
                        </button>
                        <button 
                          onClick={() => setCustomTheme("midnight")} 
                          className={`btn btn-xs py-1.5 px-3 rounded-pill border text-xs ${customTheme === "midnight" ? "btn-whitepace-primary" : "btn-light"}`}
                        >
                          Midnight Blue
                        </button>
                        <button 
                          onClick={() => setCustomTheme("sage")} 
                          className={`btn btn-xs py-1.5 px-3 rounded-pill border text-xs ${customTheme === "sage" ? "btn-whitepace-primary" : "btn-light"}`}
                        >
                          Green Sage
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="text-xs text-muted mb-1 d-block">Workspace Display</label>
                      <div className="d-flex gap-2">
                        <button 
                          onClick={() => setLayoutType("editor")} 
                          className={`btn btn-xs py-1.5 px-3.5 border rounded text-xs ${layoutType === "editor" ? "btn-secondary text-white" : "btn-light"}`}
                        >
                          Full Note
                        </button>
                        <button 
                          onClick={() => setLayoutType("split")} 
                          className={`btn btn-xs py-1.5 px-3.5 border rounded text-xs ${layoutType === "split" ? "btn-secondary text-white" : "btn-light"}`}
                        >
                          Dual-Pane
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <a href="#pricing" className="btn btn-whitepace-primary py-3 px-5 rounded d-inline-flex align-items-center gap-2">
                  Let’s Go <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* Left Column: Visual representing dynamic UI customization */}
            <div className="col-lg-6" id="customise-image">
              <div className="card shadow border-0 bg-whitepace-skyblue p-4 rounded-4" style={{ minHeight: "350px" }}>
                <span className="mono-font text-dark-50 text-xs text-uppercase fw-semibold mb-3">
                  🖌️ Custom Theme Viewer
                </span>

                {/* Simulated Custom Client Workspace changing values live */}
                <div 
                  className={`card border-0 shadow-sm rounded-3 flex-grow-1 p-3 d-flex flex-column transition-all ${
                    customTheme === "midnight" 
                      ? "bg-dark text-white" 
                      : customTheme === "sage" 
                      ? "bg-opacity-10 bg-success text-success-emphasis" 
                      : "bg-white text-dark"
                  }`}
                  style={{ minHeight: "220px", transition: "all 0.4s ease" }}
                >
                  <div className="d-flex justify-content-between align-items-center pb-2 mb-3 border-bottom border-light-dark">
                    <span className="fw-bold text-xs"><i className="bi bi-stars"></i> Custom Workspace Pro</span>
                    <span className="badge bg-secondary text-xxs" style={{ fontSize: "9px" }}>Theme: {customTheme.toUpperCase()}</span>
                  </div>

                  {layoutType === "editor" ? (
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1">Interactive Notebook Specs</h6>
                      <p className="text-secondary text-xs mb-3">Single-pane elegant reading mode activated. Excellent for focal drafts.</p>
                      <div className="p-2 rounded bg-light border text-xxs" style={{ fontSize: "11px", color: "#333" }}>
                        💡 ProTip: You can change the layout above to 'Dual-Pane' to view templates side-by-side!
                      </div>
                    </div>
                  ) : (
                    <div className="row g-2 flex-grow-1">
                      <div className="col-6">
                        <div className="p-2 rounded h-100 border bg-light text-xxs d-flex flex-column justify-content-between" style={{ minHeight: "110px", color: "#333" }}>
                          <div>
                            <span className="fw-bold text-dark d-block">Left Workspace Panel</span>
                            <span className="text-muted text-xxs mb-2">Configure folders and layouts.</span>
                          </div>
                          <span className="badge bg-whitepace-blue text-white align-self-start text-xxs">Folders</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-2 rounded h-100 border bg-light text-xxs d-flex flex-column justify-content-between" style={{ minHeight: "110px", color: "#333" }}>
                          <div>
                            <span className="fw-bold text-dark d-block">Right Editing Panel</span>
                            <span className="text-muted text-xxs mb-2">Drafting content blocks live.</span>
                          </div>
                          <span className="badge bg-whitepace-yellow text-dark align-self-start text-xxs">Notes</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center mt-3 pt-2 text-xxs" style={{ fontSize: "10px", opacity: 0.75 }}>
                    <span>Accent color: <i className="bi bi-circle-fill text-whitepace-blue"></i></span>
                    <span>Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
