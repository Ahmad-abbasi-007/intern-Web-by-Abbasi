import React, { useState } from "react";

export default function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setSubscribed(true);
      setIsSubmitting(false);
      setEmailInput("");
    }, 500);
  };

  return (
    <footer 
      className="text-white pt-5 pb-4" 
      style={{ backgroundColor: "#041930", fontSize: "0.9rem" }}
      id="footer"
    >
      <div className="container">
        {/* Main Columns Grid Row */}
        <div className="row gy-5 mb-5 align-items-start">
          {/* Col 1: Whitepace Brand Info */}
          <div className="col-lg-3 col-md-6" id="footer-col-brand">
            <a 
              className="navbar-brand d-flex align-items-center text-white mb-3" 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{ fontSize: "1.4rem", letterSpacing: "-0.5px" }}
              id="footer-logo"
            >
              <div 
                className="bg-whitepace-blue d-flex align-items-center justify-content-center me-2 p-1"
                style={{ width: "28px", height: "28px", borderRadius: "6px" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12L12 4L20 12L12 20L4 12Z" fill="#FFE492" />
                </svg>
              </div>
              <span className="fw-bold brand-font">whitepace</span>
            </a>
            <p className="text-whitepace-muted pr-lg-4 leading-relaxed text-xs">
              Project management software that enables your teams to collaborate, plan, analyze and manage everyday tasks. Powering modern builders worldwide.
            </p>
            {/* Social links icons row */}
            <div className="d-flex gap-3 mt-4" id="footer-social-anchors">
              <a href="#" className="text-whitepace-muted hover:text-white fs-5" aria-label="Slack Link"><i className="bi bi-slack"></i></a>
              <a href="#" className="text-whitepace-muted hover:text-white fs-5" aria-label="Twitter X Link"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-whitepace-muted hover:text-white fs-5" aria-label="Github Link"><i className="bi bi-github"></i></a>
              <a href="#" className="text-whitepace-muted hover:text-white fs-5" aria-label="Linkedin Link"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Col 2: Products Links list */}
          <div className="col-lg-2 col-md-6" id="footer-col-products">
            <h6 className="fw-bold text-white mb-3 text-uppercase tracking-wider text-xs" style={{ fontSize: "0.80rem" }}>Product</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-xs">
              <li><a href="#playground" className="text-whitepace-muted text-decoration-none hover:text-white text-xs">Overview</a></li>
              <li><a href="#pricing" className="text-whitepace-muted text-decoration-none hover:text-white text-xs">Pricing</a></li>
              <li><a href="#testimonials" className="text-whitepace-muted text-decoration-none hover:text-white text-xs">Customer stories</a></li>
              <li><a href="#favorite-apps" className="text-whitepace-muted text-decoration-none hover:text-white text-xs">Integrations Hub</a></li>
              <li><button onClick={() => window.location.reload()} className="btn btn-link p-0 text-whitepace-muted text-decoration-none hover:text-white text-xs text-start">Software Downloads</button></li>
            </ul>
          </div>

          {/* Col 3: Resources Links list */}
          <div className="col-lg-2 col-md-6" id="footer-col-resources">
            <h6 className="fw-bold text-white mb-3 text-uppercase tracking-wider text-xs" style={{ fontSize: "0.80rem" }}>Resources</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-xs">
              <li><a href="#" className="text-whitepace-muted text-decoration-none hover:text-white text-xs">Knowledge Base</a></li>
              <li><a href="#" className="text-whitepace-muted text-decoration-none hover:text-white text-xs">Guides & Tutorials</a></li>
              <li><a href="#" className="text-whitepace-muted text-decoration-none hover:text-white text-xs">Technical API docs</a></li>
              <li><a href="#" className="text-whitepace-muted text-decoration-none hover:text-white text-xs">Security Standards</a></li>
              <li><a href="#" className="text-whitepace-muted text-decoration-none hover:text-white text-xs">Help Center Desk</a></li>
            </ul>
          </div>

          {/* Col 4: Company Links list */}
          <div className="col-lg-2 col-md-6" id="footer-col-company">
            <h6 className="fw-bold text-white mb-3 text-uppercase tracking-wider text-xs" style={{ fontSize: "0.80rem" }}>Company</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-xs">
              <li><a href="#" className="text-whitepace-muted text-decoration-none hover:text-white text-xs">About Us</a></li>
              <li><a href="#" className="text-whitepace-muted text-decoration-none hover:text-white text-xs">Careers Openings</a></li>
              <li><a href="#" className="text-whitepace-muted text-decoration-none hover:text-white text-xs">Press Media Kit</a></li>
              <li><a href="#" className="text-whitepace-muted text-decoration-none hover:text-white text-xs">Contact Sales</a></li>
              <li><a href="#" className="text-whitepace-muted text-decoration-none hover:text-white text-xs">Partner Program</a></li>
            </ul>
          </div>

          {/* Col 5: Newsletters Subscribe try-today form */}
          <div className="col-lg-3 col-md-6" id="footer-col-subscribe">
            <h6 className="fw-bold text-white mb-3 text-uppercase tracking-wider text-xs" style={{ fontSize: "0.80rem" }}>Try It Today</h6>
            <p className="text-whitepace-muted mb-3 text-xs leading-relaxed">
              Get started for free. Add your team members as your needs grow.
            </p>

            {subscribed ? (
              <div className="alert bg-success bg-opacity-10 border-success border-opacity-20 text-success p-3 rounded" style={{ fontSize: "11px" }} id="subscribe-success-alert">
                <i className="bi bi-patch-check-fill me-1.5 fs-6"></i>
                <strong>Successfully Joined!</strong> We've dispatched a welcome toolkit securely. Check your inbox!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="input-group" id="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="form-control text-xs border-light-dark p-2.5 text-white bg-dark-50"
                  style={{ backgroundColor: "#061d36", border: "1px solid #1a3250", color: "white" }}
                  required 
                  id="newsletter-email-input"
                />
                <button 
                  type="submit" 
                  className="btn btn-whitepace-primary px-3 d-flex align-items-center justify-content-center"
                  disabled={isSubmitting}
                  id="newsletter-submit-btn"
                >
                  {isSubmitting ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    <i className="bi bi-arrow-right-short fs-4"></i>
                  )}
                </button>
              </form>
            )}

            {/* Simulated Google Play/App Store badges */}
            <div className="d-flex gap-2 mt-4">
              <a href="#" className="btn btn-dark btn-sm d-flex align-items-center gap-2 border bg-black" style={{ fontSize: "10px", borderColor: "#1a3250 !important" }}>
                <i className="bi bi-apple fs-6"></i>
                <div className="text-start">
                  <span className="text-white-50 d-block leading-none" style={{ fontSize: "8px" }}>Download on the</span>
                  <span className="fw-bold">App Store</span>
                </div>
              </a>
              <a href="#" className="btn btn-dark btn-sm d-flex align-items-center gap-2 border bg-black" style={{ fontSize: "10px", borderColor: "#1a3250 !important" }}>
                <i className="bi bi-play-fill fs-6 text-success"></i>
                <div className="text-start">
                  <span className="text-white-50 d-block leading-none" style={{ fontSize: "8px" }}>GET IT ON</span>
                  <span className="fw-bold">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="border-top pt-4 mt-4 d-flex flex-column flex-md-row align-items-center justify-content-between text-xxs text-whitepace-muted" style={{ fontSize: "11px" }}>
          <div className="d-flex align-items-center gap-3 flex-wrap mb-3 mb-md-0" id="footer-bottom-info">
            <div className="dropdown">
              <button 
                className="btn btn-link btn-sm text-whitepace-muted text-decoration-none dropdown-toggle p-0 text-xxs d-flex align-items-center gap-1"
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                id="languageSelector"
              >
                <i className="bi bi-globe me-1"></i> English
              </button>
              <ul className="dropdown-menu dropdown-menu-dark shadow border-0" style={{ fontSize: "11px" }}>
                <li><a className="dropdown-item active" href="#">English</a></li>
                <li><a className="dropdown-item" href="#">Español</a></li>
                <li><a className="dropdown-item" href="#">Français</a></li>
                <li><a className="dropdown-item" href="#">Deutsch</a></li>
              </ul>
            </div>
            <span>© 2026 Whitepace SaaS Inc. All rights reserved.</span>
          </div>

          {/* Legal bottom row anchors */}
          <div className="d-flex gap-4 flex-wrap" id="footer-legal-anchors">
            <a href="#" className="text-whitepace-muted text-decoration-none hover:text-white">Terms of Service</a>
            <a href="#" className="text-whitepace-muted text-decoration-none hover:text-white">Security Directory</a>
            <a href="#" className="text-whitepace-muted text-decoration-none hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
