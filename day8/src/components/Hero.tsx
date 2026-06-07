import { useState } from "react";

interface HeroProps {
  onStartTrial: () => void;
}

export default function Hero({ onStartTrial }: HeroProps) {
  const [activeTab, setActiveTab] = useState<"board" | "analytics" | "tasks">("board");

  return (
    <section 
      style={{ paddingTop: "120px", paddingBottom: "100px" }}
      className="bg-whitepace-navy text-white d-flex align-items-center"
      id="hero"
    >
      <div className="container">
        <div className="row align-items-center gy-5">
          {/* Hero Left Content */}
          <div className="col-lg-6" id="hero-content">
            <div className="pe-lg-4">
              <span className="badge bg-whitepace-blue text-white mb-3 text-uppercase fw-semibold tracking-wider px-3 py-2 rounded-pill">
                ✨ Rated #1 Productivity Tool
              </span>
              <h1 className="display-4 fw-bold mb-4 tracking-tight" style={{ lineHeight: "1.2" }}>
                Get More Done with <span className="position-relative">
                  whitepace
                  <svg className="position-absolute start-0 bottom-0 text-whitepace-yellow" style={{ width: "100%", height: "8px", transform: "translateY(4px)" }} viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="lead text-whitepace-muted mb-5" style={{ fontSize: "1.2rem", fontWeight: "300" }}>
                Project management software that enables your teams to collaborate, plan, analyze and manage everyday tasks. Customize your space and supercharge your output.
              </p>
              
              <div className="d-flex flex-wrap gap-3">
                <button
                  onClick={onStartTrial}
                  className="btn btn-whitepace-primary px-4 py-3 rounded d-inline-flex align-items-center gap-2 fw-medium"
                  style={{ fontSize: "1.1rem" }}
                  id="hero-cta-btn"
                >
                  Try Whitepace free
                  <i className="bi bi-arrow-right"></i>
                </button>
                <a
                  href="#playground"
                  className="btn btn-whitepace-outline-light px-4 py-3 rounded d-inline-flex align-items-center gap-2 fw-medium"
                  style={{ fontSize: "1.1rem" }}
                  id="hero-secondary-btn"
                >
                  <i className="bi bi-play-circle-fill text-whitepace-yellow"></i>
                  Play Live Demo
                </a>
              </div>

              {/* Stat elements */}
              <div className="row mt-5 pt-4 border-top border-white-10">
                <div className="col-4">
                  <h4 className="fw-bold text-whitepace-yellow mb-1">200k+</h4>
                  <p className="small text-whitepace-muted mb-0">Active Users</p>
                </div>
                <div className="col-4">
                  <h4 className="fw-bold text-whitepace-yellow mb-1">99.9%</h4>
                  <p className="small text-whitepace-muted mb-0">Uptime SLA</p>
                </div>
                <div className="col-4">
                  <h4 className="fw-bold text-whitepace-yellow mb-1">4.9/5</h4>
                  <p className="small text-whitepace-muted mb-0">G2 Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Graphic - Interactive Workspace Mockup */}
          <div className="col-lg-6" id="hero-image">
            <div className="position-relative">
              {/* Decorative behind glow */}
              <div 
                className="position-absolute bg-whitepace-blue rounded-circle opacity-10 filter blur-3xl"
                style={{ width: "400px", height: "400px", top: "-50px", right: "-50px", zIndex: 0 }}
              ></div>

              {/* Interface Window Mockup */}
              <div className="card border-0 mock-window bg-dark position-relative" style={{ zIndex: 1, border: "1px solid #1a3250 !important" }}>
                <div className="mock-titlebar d-flex justify-content-between align-items-center" style={{ backgroundColor: "#062247" }}>
                  <div className="d-flex align-items-center gap-1.5">
                    <span className="mock-dot bg-danger" style={{ width: "12px", height: "12px" }}></span>
                    <span className="mock-dot bg-warning mx-1" style={{ width: "12px", height: "12px" }}></span>
                    <span className="mock-dot bg-success" style={{ width: "12px", height: "12px" }}></span>
                  </div>
                  <div className="text-white-50 small mono-font px-3 py-0.5 rounded" style={{ backgroundColor: "#041935", fontSize: "0.80rem" }}>
                    app.whitepace.co/dashboard
                  </div>
                  <div>
                    <i className="bi bi-three-dots text-white-50"></i>
                  </div>
                </div>

                <div className="card-body p-0 text-dark bg-light" style={{ minHeight: "330px" }}>
                  {/* Dashboard Sidebar + Content Layout */}
                  <div className="row g-0 h-100" style={{ minHeight: "330px" }}>
                    {/* Tiny Sidebar */}
                    <div className="col-3 bg-whitepace-navy text-white-50 p-2 d-none d-sm-block border-end border-white-10">
                      <div className="d-flex align-items-center gap-2 mb-3 px-2">
                        <div className="bg-whitepace-blue rounded" style={{ width: "18px", height: "18px" }}></div>
                        <span className="fw-bold text-white text-xs">WP Space</span>
                      </div>
                      <div className="d-flex flex-column gap-1">
                        <button 
                          onClick={() => setActiveTab("board")}
                          className={`btn btn-sm text-start text-xs border-0 py-1.5 px-2 ${activeTab === "board" ? "bg-whitepace-blue text-white fw-bold" : "text-white-50"}`}
                        >
                          <i className="bi bi-kanban me-1.5"></i> Board
                        </button>
                        <button 
                          onClick={() => setActiveTab("analytics")}
                          className={`btn btn-sm text-start text-xs border-0 py-1.5 px-2 ${activeTab === "analytics" ? "bg-whitepace-blue text-white fw-bold" : "text-white-50"}`}
                        >
                          <i className="bi bi-graph-up me-1.5"></i> Analytics
                        </button>
                        <button 
                          onClick={() => setActiveTab("tasks")}
                          className={`btn btn-sm text-start text-xs border-0 py-1.5 px-2 ${activeTab === "tasks" ? "bg-whitepace-blue text-white fw-bold" : "text-white-50"}`}
                        >
                          <i className="bi bi-check2-square me-1.5"></i> Tasks
                        </button>
                      </div>
                    </div>

                    {/* Window Content */}
                    <div className="col p-3 bg-white d-flex flex-column justify-content-between">
                      {activeTab === "board" && (
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold mb-0">Project Board <span className="badge bg-secondary">Product Launch</span></h6>
                            <span className="text-xs text-muted">Updated Just Now</span>
                          </div>
                          
                          <div className="row g-2">
                            {/* Card 1 */}
                            <div className="col-md-6">
                              <div className="card border-0 shadow-sm p-2 bg-light hover-scale">
                                <span className="badge bg-whitepace-blue text-white align-self-start mb-1 text-xs">Research</span>
                                <p className="small mb-2 fw-medium">Collect competitors core design parameters</p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex -space-x-1">
                                    <div className="rounded-circle bg-danger text-white text-xxs d-flex align-items-center justify-content-center me-1" style={{ width: "20px", height: "20px", fontSize: "9px" }}>JS</div>
                                    <div className="rounded-circle bg-success text-white text-xxs d-flex align-items-center justify-content-center" style={{ width: "20px", height: "20px", fontSize: "9px" }}>AM</div>
                                  </div>
                                  <span className="text-muted text-xxs" style={{ fontSize: "10px" }}><i className="bi bi-chat-right me-1"></i> 3</span>
                                </div>
                              </div>
                            </div>

                            {/* Card 2 */}
                            <div className="col-md-6">
                              <div className="card border-0 shadow-sm p-2 bg-light hover-scale">
                                <span className="badge bg-success text-white align-self-start mb-1 text-xs">Design</span>
                                <p className="small mb-2 fw-medium">Whitepace brand identity specs</p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="rounded-circle bg-warning text-dark text-xxs d-flex align-items-center justify-content-center" style={{ width: "20px", height: "20px", fontSize: "9px" }}>TB</div>
                                  <span className="text-muted text-xxs" style={{ fontSize: "10px" }}><i className="bi bi-paperclip me-1"></i> 2</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "analytics" && (
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold mb-0">Performance Trend</h6>
                            <span className="text-xs text-success fw-bold"><i className="bi bi-arrow-up-right"></i> +24% increased</span>
                          </div>

                          <div className="card border-0 p-3 bg-light text-center">
                            <i className="bi bi-activity text-whitepace-blue display-6 mb-2"></i>
                            <div className="progress mb-2" style={{ height: "6px" }}>
                              <div className="progress-bar bg-whitepace-blue" role="progressbar" style={{ width: "75%" }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                            <span className="small text-muted">Weekly targeted metrics: 75% completed</span>
                          </div>
                        </div>
                      )}

                      {activeTab === "tasks" && (
                        <div>
                          <h6 className="fw-bold mb-3">Team Checklists</h6>
                          <div className="d-flex flex-column gap-2">
                            <div className="form-check p-2 bg-light rounded d-flex align-items-center">
                              <input className="form-check-input ms-0 me-2 mt-0" type="checkbox" defaultChecked id="check-1" />
                              <label className="form-check-label small text-muted text-decoration-line-through fw-medium" htmlFor="check-1">Configure workspace databases</label>
                            </div>
                            <div className="form-check p-2 bg-light rounded d-flex align-items-center">
                              <input className="form-check-input ms-0 me-2 mt-0" type="checkbox" defaultChecked id="check-2" />
                              <label className="form-check-label small text-muted text-decoration-line-through fw-medium" htmlFor="check-2">Refine design typography systems</label>
                            </div>
                            <div className="form-check p-2 bg-light rounded d-flex align-items-center">
                              <input className="form-check-input ms-0 me-2 mt-0" type="checkbox" id="check-3" />
                              <label className="form-check-label small fw-bold text-dark" htmlFor="check-3">Deploy final responsive Bootstrap layouts</label>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Micro tab buttons for small screens without slide preview */}
                      <div className="d-flex justify-content-around bg-light p-2 rounded mt-3 d-sm-none">
                        <button onClick={() => setActiveTab("board")} className={`btn btn-xs py-1 px-2 border-0 ${activeTab === "board" ? "bg-whitepace-blue text-white" : "text-muted"}`} style={{ fontSize: "11px" }}>Board</button>
                        <button onClick={() => setActiveTab("analytics")} className={`btn btn-xs py-1 px-2 border-0 ${activeTab === "analytics" ? "bg-whitepace-blue text-white" : "text-muted"}`} style={{ fontSize: "11px" }}>Analytics</button>
                        <button onClick={() => setActiveTab("tasks")} className={`btn btn-xs py-1 px-2 border-0 ${activeTab === "tasks" ? "bg-whitepace-blue text-white" : "text-muted"}`} style={{ fontSize: "11px" }}>Tasks</button>
                      </div>

                      <div className="d-flex justify-content-between align-items-center border-top pt-2 mt-3 text-muted text-xxs">
                        <span><i className="bi bi-lock-fill"></i> Secured by SSL</span>
                        <span className="text-whitepace-blue fw-bold" style={{ cursor: "pointer" }} onClick={onStartTrial}>Go Fullscreen <i className="bi bi-chevron-right"></i></span>
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
  );
}
