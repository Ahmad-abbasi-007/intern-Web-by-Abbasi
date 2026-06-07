import React, { useState } from "react";

export default function Everywhere() {
  const [deviceChecklist, setDeviceChecklist] = useState([
    { id: 1, text: "Sync checklist items instantly", checked: true },
    { id: 2, text: "Access notes on any platform", checked: true },
    { id: 3, text: "Secure end-to-end encryption", checked: false },
  ]);

  const toggleCheck = (id: number) => {
    setDeviceChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <section 
      className="bg-whitepace-navy text-white text-center py-5 position-relative overflow-hidden" 
      id="everywhere"
      style={{ paddingBottom: "100px !important", paddingTop: "80px !important" }}
    >
      {/* Decorative behind glow */}
      <div 
        className="position-absolute bg-whitepace-blue rounded-circle opacity-10 filter blur-3xl"
        style={{ width: "350px", height: "350px", top: "10%", left: "5%", zIndex: 0 }}
      ></div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* Title Block */}
        <div className="max-w-3xl mx-auto mb-5">
          <h2 className="display-5 fw-bold mb-3 tracking-tight">
            Your work, everywhere you are
          </h2>
          <p className="text-whitepace-muted lead mb-4 font-light fs-6" style={{ lineHeight: "1.6" }}>
            Access your notes from your computer, phone or tablet by syncing with the cloud and collaborators. It is a transition you’ll never feel.
          </p>
          <a
            href="#pricing"
            className="btn btn-whitepace-primary px-5 py-3 rounded d-inline-flex align-items-center gap-2 fw-medium"
            id="everywhere-cta-btn"
          >
            Try Whitepace free
            <i className="bi bi-arrow-right"></i>
          </a>
        </div>

        {/* Sync interactive device mockup area */}
        <div className="mt-5 max-w-4xl mx-auto">
          <div className="p-4 rounded-4 bg-whitepace-skyblue p-sm-5 text-dark" style={{ backgroundColor: "#C4DEFD" }}>
            <span className="mono-font text-dark-50 text-xs text-uppercase fw-bold d-block mb-4">
              📱 Cross-Device Real-Time Syncing Sandbox (Click to toggle)
            </span>

            {/* Devices grid / layout */}
            <div className="row g-4 align-items-end justify-content-center">
              {/* Device 1: Tablet */}
              <div className="col-md-3 d-none d-md-block">
                <div 
                  className="card border-0 shadow bg-white rounded-3 overflow-hidden" 
                  style={{ minHeight: "180px", border: "4px solid #333 !important" }}
                >
                  <div className="bg-dark p-1.5 text-center text-white text-xxs d-flex justify-content-between">
                    <span>iPad OS</span>
                    <span className="text-success">● Connected</span>
                  </div>
                  <div className="p-2 text-start">
                    <span className="text-muted text-xxs d-block font-bold" style={{ fontSize: "9px" }}>TEAM SYNCHRONIZATION</span>
                    <span className="fw-bold d-block mb-2 text-xs text-whitepace-navy" style={{ fontSize: "10px" }}>Active Task Checklist</span>
                    
                    <div className="d-flex flex-column gap-1.5">
                      {deviceChecklist.map((target) => (
                        <div 
                          key={target.id} 
                          className="d-flex align-items-center gap-1 p-1 bg-light rounded"
                          style={{ cursor: "pointer", fontSize: "9px" }}
                          onClick={() => toggleCheck(target.id)}
                        >
                          <i className={`bi ${target.checked ? "bi-check-square-fill text-primary" : "bi-square"} text-xs`}></i>
                          <span className={`text-stone-700 ${target.checked ? "text-decoration-line-through text-muted" : "fw-medium"}`}>{target.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Device 2: Laptop (Center, dominant) */}
              <div className="col-md-6 col-10">
                <div 
                  className="card border-0 shadow bg-white rounded-4 overflow-hidden" 
                  style={{ border: "7px solid #222 !important", minHeight: "240px" }}
                >
                  <div className="bg-dark text-white p-2 text-xs d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-1">
                      <span className="rounded-circle bg-danger" style={{ width: "6px", height: "6px" }}></span>
                      <span className="rounded-circle bg-warning" style={{ width: "6px", height: "6px" }}></span>
                      <span className="rounded-circle bg-success" style={{ width: "6px", height: "6px" }}></span>
                    </div>
                    <span className="text-xxs text-white-50 mono-font">app.whitepace.co/sync</span>
                    <span className="badge bg-success text-xxs">Syncing Live</span>
                  </div>
                  <div className="p-3 text-start">
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                      <div>
                        <span className="text-xxs text-muted text-uppercase d-block fw-bold">WORKSPACE DRAFT</span>
                        <h6 className="fw-bold mb-0 text-whitepace-navy">Whitepace Premium Workspace</h6>
                      </div>
                      <span className="text-xxs text-muted"><i className="bi bi-clock-history"></i> Just Now</span>
                    </div>

                    <div className="d-flex flex-column gap-2 mb-2">
                      {deviceChecklist.map((item) => (
                        <div 
                          key={item.id} 
                          className="form-check p-2 bg-light rounded d-flex align-items-center"
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleCheck(item.id)}
                        >
                          <input 
                            className="form-check-input ms-0 me-2 mt-0 cursor-pointer" 
                            type="checkbox" 
                            checked={item.checked} 
                            readOnly
                            id={`sync-check-laptop-${item.id}`} 
                          />
                          <label 
                            className={`form-check-label text-xs ${item.checked ? "text-muted text-decoration-line-through" : "fw-bold text-dark"} cursor-pointer`}
                            htmlFor={`sync-check-laptop-${item.id}`}
                          >
                            {item.text}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Simulated Laptop Keyboard Base */}
                <div className="bg-secondary rounded-bottom mx-auto" style={{ height: "10px", width: "105%", backgroundColor: "#a1a1a6" }}></div>
              </div>

              {/* Device 3: Mobile Phone */}
              <div className="col-md-3 col-6">
                <div 
                  className="card border-0 shadow bg-white rounded-4 overflow-hidden" 
                  style={{ minHeight: "180px", border: "5px solid #111 !important" }}
                >
                  <div className="bg-dark p-2 text-center text-white d-flex justify-content-between align-items-center" style={{ fontSize: "8px" }}>
                    <span>WP Mobile</span>
                    <i className="bi bi-wifi text-success"></i>
                  </div>
                  <div className="p-2 text-start">
                    <span className="text-muted d-block font-bold" style={{ fontSize: "8px" }}>SYNC APP</span>
                    <span className="fw-bold d-block mb-1 text-whitepace-navy" style={{ fontSize: "9px" }}>Your Notes</span>
                    
                    <div className="d-flex flex-column gap-1">
                      {deviceChecklist.map((target) => (
                        <div 
                          key={target.id} 
                          className="d-flex align-items-center gap-1.5 p-1 bg-light rounded"
                          style={{ cursor: "pointer", fontSize: "8px" }}
                          onClick={() => toggleCheck(target.id)}
                        >
                          <i className={`bi ${target.checked ? "bi-check-square-fill text-primary" : "bi-square"}`} style={{ fontSize: "9px" }}></i>
                          <span className={`text-stone-700 ${target.checked ? "text-decoration-line-through text-muted" : "fw-medium"}`}>{target.text}</span>
                        </div>
                      ))}
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
