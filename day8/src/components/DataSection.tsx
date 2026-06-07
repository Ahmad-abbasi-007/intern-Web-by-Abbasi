import React from "react";

export default function DataSection() {
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
    <section className="py-5 bg-white" style={{ paddingBottom: "100px !important", paddingTop: "80px !important" }} id="data-section">
      <div className="container">
        <div className="row align-items-center gy-5">
          {/* Left Column: Text */}
          <div className="col-lg-6" id="data-content">
            <div className="pe-lg-5">
              <h2 className="display-5 fw-bold text-whitepace-navy mb-4">
                100% your data
              </h2>
              <p className="text-secondary mb-4 leading-relaxed" style={{ fontSize: "1.1rem" }}>
                The app is open source and your notes are saved in an open format, so you’ll always have access to your data. No lock-in, no limits.
              </p>
              <p className="text-secondary mb-5 leading-relaxed">
                Export all your notes, canvas items, and files in a single robust JSON compilation. Never worry about provider shutdowns, restrictions, or hidden database subscription policies.
              </p>

              {/* Functional Backup Download block */}
              <div className="card border-0 bg-light p-4 mb-5 shadow-sm rounded-4 d-flex flex-row align-items-center gap-3">
                <div className="bg-whitepace-yellow rounded-circle p-3 d-flex align-items-center justify-content-center text-whitepace-navy" style={{ width: "50px", height: "50px" }}>
                  <i className="bi bi-download fs-4"></i>
                </div>
                <div className="flex-grow-1">
                  <span className="fw-bold d-block text-whitepace-navy" style={{ fontSize: "0.95rem" }}>Backup Exporter</span>
                  <span className="text-xs text-muted mb-0">Generate and download active note parameters instantly.</span>
                </div>
                <button 
                  onClick={handleDownloadBackup}
                  className="btn btn-sm btn-whitepace-primary py-2 px-3 fw-medium text-xs"
                  id="backup-download-btn"
                >
                  Export JSON
                </button>
              </div>

              <a href="#playground" className="btn btn-whitepace-primary py-3 px-5 rounded d-inline-flex align-items-center gap-2">
                Read More <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>

          {/* Right Column: Visual of lock or structured layout */}
          <div className="col-lg-6" id="data-image">
            <div className="card shadow border-0 bg-whitepace-skyblue p-4 rounded-4" style={{ minHeight: "350px" }}>
              <span className="mono-font text-dark-50 text-xs text-uppercase fw-semibold mb-3">
                🔒 Open Format Security
              </span>

              <div className="bg-white p-4 rounded shadow-sm d-flex flex-column align-items-center text-center justify-content-center h-100 flex-grow-1">
                <div className="bg-success bg-opacity-10 text-success rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
                  <i className="bi bi-shield-lock-fill display-5"></i>
                </div>
                <h5 className="fw-bold text-whitepace-navy mb-2">Encrypt, Export & Sync</h5>
                <p className="text-muted text-xs px-lg-4 mb-3">
                  Your database is sealed with industry grade AES-256 standard, syncable to Google Drive, Dropbox, or custom offline folders.
                </p>
                
                <div className="d-flex gap-2">
                  <span className="badge bg-light text-muted px-2.5 py-1.5 border" style={{ fontSize: "10px" }}><i className="bi bi-check-circle-fill text-success me-1"></i> No Vendor Lock-In</span>
                  <span className="badge bg-light text-muted px-2.5 py-1.5 border" style={{ fontSize: "10px" }}><i className="bi bi-check-circle-fill text-success me-1"></i> Open JSON Standard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
