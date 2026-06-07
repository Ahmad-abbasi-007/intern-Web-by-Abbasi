import { useState } from "react";

interface PricingProps {
  onSelectPlan: (planName: string, price: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [teamSize, setTeamSize] = useState<number>(5);

  // Price calculations based on cycle and user multiplier
  const basePrices = {
    free: 0,
    personal: billingCycle === "monthly" ? 11.99 : 9.59,
    organization: billingCycle === "monthly" ? 49.99 : 39.99,
  };

  const getOrgPrice = () => {
    // Basic scaling formula for teams size
    const multiplier = Math.max(1, Math.floor(teamSize / 5));
    return (basePrices.organization * multiplier).toFixed(2);
  };

  return (
    <section className="py-5 bg-white" id="pricing" style={{ paddingBottom: "100px !important" }}>
      <div className="container">
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="mono-font text-xs text-whitepace-blue fw-bold text-uppercase tracking-wider d-block mb-3">
            💳 Flexible Subscriptions
          </span>
          <h2 className="display-5 fw-bold text-whitepace-navy mb-3">
            Choose Your Plan
          </h2>
          <p className="text-secondary leading-relaxed px-5">
            Whether you want to try our service or coordinate complex team projects, we have a plan for you. Select a billing frequency below.
          </p>

          {/* Billing Toggle Toggle */}
          <div className="d-flex align-items-center justify-content-center gap-3 mt-4 mb-4">
            <span className={`fw-semibold text-sm ${billingCycle === "monthly" ? "text-whitepace-navy" : "text-muted"}`}>
              Monthly
            </span>
            <div className="form-check form-switch ps-0 mb-0 d-flex align-items-center">
              <input 
                className="form-check-input ms-0" 
                type="checkbox" 
                role="switch" 
                id="billingToggle" 
                checked={billingCycle === "yearly"}
                onChange={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                style={{ width: "50px", height: "25px", cursor: "pointer" }}
              />
            </div>
            <span className={`fw-semibold text-sm d-flex align-items-center gap-2 ${billingCycle === "yearly" ? "text-whitepace-navy" : "text-muted"}`}>
              Yearly 
              <span className="badge bg-danger text-xxs text-white" style={{ fontSize: "10px" }}>Save 20% 🔥</span>
            </span>
          </div>
        </div>

        {/* Dynamic Calculator slider for team sizes */}
        <div className="card border-0 bg-light p-4 rounded-4 mb-5 shadow-sm max-w-3xl mx-auto">
          <div className="row align-items-center gy-3">
            <div className="col-md-5">
              <h6 className="fw-bold text-whitepace-navy mb-1">
                <i className="bi bi-calculator me-1.5 text-whitepace-blue"></i> Team Growth Estimator
              </h6>
              <p className="text-muted text-xs mb-0">Drag to estimate costs as your workspace expands.</p>
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-xs text-muted">Active Users:</span>
                <span className="fw-bold text-whitepace-navy text-xs">{teamSize} Users</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="form-range" 
                id="teamSelectorSlider"
              />
            </div>
            <div className="col-md-3 text-center text-md-end border-start-md">
              <span className="text-muted d-block text-xxs mb-1">Org Plan Tier:</span>
              <span className="h4 fw-bold text-whitepace-navy">${getOrgPrice()}</span>
              <span className="text-muted text-xxs block" style={{ fontSize: "10px" }}>/ month</span>
            </div>
          </div>
        </div>

        {/* Standard three columns plan grid */}
        <div className="row g-4 align-items-stretch" id="pricing-plans-grid">
          {/* Plan 1: Free */}
          <div className="col-lg-4">
            <div className="card h-100 border-light border-2 p-4 hover-scale rounded-4 d-flex flex-column justify-content-between">
              <div>
                <span className="fw-bold text-dark text-xs text-uppercase d-block mb-2">Free Starter</span>
                <h3 className="h1 fw-bold text-whitepace-navy mb-1">$0</h3>
                <span className="text-muted text-xs block mb-3">Keep track of your personal notes, ideas, and drafts.</span>
                <p className="text-xs text-secondary mb-4">Enjoy basic entry modules with zero subscription cost.</p>
                
                <hr className="my-4 text-light-dark" />

                <ul className="list-unstyled d-flex flex-column gap-3 mb-4 text-xs text-secondary">
                  <li>
                    <i className="bi bi-check2-circle text-success me-2"></i> Sync up to 2 devices
                  </li>
                  <li>
                    <i className="bi bi-check2-circle text-success me-2"></i> 10 MB monthly uploads
                  </li>
                  <li>
                    <i className="bi bi-check2-circle text-success me-2"></i> Clean standard rich editor layout
                  </li>
                  <li>
                    <i className="bi bi-check2-circle text-success me-2"></i> Web-only client access
                  </li>
                  <li className="text-muted text-decoration-line-through">
                    <i className="bi bi-dash-circle me-2"></i> Custom theme adjustments
                  </li>
                  <li className="text-muted text-decoration-line-through">
                    <i className="bi bi-dash-circle me-2"></i> Offline offline accessibility
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan("Free Starter", "$0")}
                className="btn btn-whitepace-outline-dark w-full py-3 fs-6 rounded fw-medium mt-auto"
                id="plan-free-signup-btn"
              >
                Sign Up for Free
              </button>
            </div>
          </div>

          {/* Plan 2: Personal (FEATURED HIGHLIGHTED TIER) */}
          <div className="col-lg-4">
            <div className="card h-100 bg-whitepace-navy text-white p-4 border-whitepace-blue border-3 hover-scale rounded-4 d-flex flex-column justify-content-between position-relative shadow-lg">
              {/* Highlight badge */}
              <div 
                className="position-absolute bg-whitepace-yellow text-whitepace-navy px-3 py-1 rounded-pill fw-bold text-uppercase text-xxs"
                style={{ top: "-14px", right: "20px", fontSize: "10px", letterSpacing: "1px", boxShadow: "0 5px 15px rgba(255, 228, 146, 0.4)" }}
              >
                🔥 Most Popular
              </div>

              <div>
                <span className="fw-bold text-whitepace-yellow text-xs text-uppercase d-block mb-2">Personal Pro</span>
                <h3 className="h1 fw-bold text-white mb-1">
                  ${basePrices.personal.toFixed(2)}
                </h3>
                <span className="text-whitepace-muted text-xs block mb-3">
                  For individuals who want to take control of their daily lives.
                </span>
                <p className="text-xs text-whitepace-muted mb-4">
                  Fully unlock templates, layouts, and sync tools seamless offline.
                </p>
                
                <hr className="my-4 border-white-10" />

                <ul className="list-unstyled d-flex flex-column gap-3 mb-4 text-xs text-whitepace-muted">
                  <li>
                    <i className="bi bi-check2-circle text-whitepace-yellow me-2"></i> <strong>Sync unlimited devices</strong>
                  </li>
                  <li>
                    <i className="bi bi-check2-circle text-whitepace-yellow me-2"></i> 10 GB monthly uploads
                  </li>
                  <li>
                    <i className="bi bi-check2-circle text-whitepace-yellow me-2"></i> Dual-pane customizable editor views
                  </li>
                  <li>
                    <i className="bi bi-check2-circle text-whitepace-yellow me-2"></i> Desktop & mobile software apps
                  </li>
                  <li>
                    <i className="bi bi-check2-circle text-whitepace-yellow me-2"></i> Full offline mode & local persistence
                  </li>
                  <li>
                    <i className="bi bi-check2-circle text-whitepace-yellow me-2"></i> Customize templates & PDF exports
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan("Personal Pro", `$${basePrices.personal.toFixed(2)}`)}
                className="btn btn-whitepace-yellow w-full py-3 fs-6 rounded mt-auto"
                id="plan-personal-buy-btn"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Plan 3: Organization */}
          <div className="col-lg-4">
            <div className="card h-100 border-light border-2 p-4 hover-scale rounded-4 d-flex flex-column justify-content-between">
              <div>
                <span className="fw-bold text-dark text-xs text-uppercase d-block mb-2">Organization Suite</span>
                <h3 className="h1 fw-bold text-whitepace-navy mb-1">
                  ${getOrgPrice()}
                </h3>
                <span className="text-muted text-xs block mb-1">
                  For team projects with advanced administrative controls.
                </span>
                <span className="badge bg-light text-muted text-xxs mb-3 border">Estimated for {teamSize} seats</span>
                <p className="text-xs text-secondary mb-4">
                  The ultimate collaborative playground for enterprises and large teams at scale.
                </p>
                
                <hr className="my-4 text-light-dark" />

                <ul className="list-unstyled d-flex flex-column gap-3 mb-4 text-xs text-secondary">
                  <li>
                    <i className="bi bi-check2-circle text-success me-2"></i> <strong>Everything in Personal Pro</strong>
                  </li>
                  <li>
                    <i className="bi bi-check2-circle text-success me-2"></i> Unlimited active users & admins
                  </li>
                  <li>
                    <i className="bi bi-check2-circle text-success me-2"></i> 100 GB monthly file uploads
                  </li>
                  <li>
                    <i className="bi bi-check2-circle text-success me-2"></i> Team workspaces & group permissions
                  </li>
                  <li>
                    <i className="bi bi-check2-circle text-success me-2"></i> Custom Single Sign-On (SSO / SAML)
                  </li>
                  <li>
                    <i className="bi bi-check2-circle text-success me-2"></i> 24/7 Priority support & SLA policy
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan("Organization Suite", `$${getOrgPrice()}`)}
                className="btn btn-whitepace-primary w-full py-3 fs-6 rounded fw-medium mt-auto"
                id="plan-org-buy-btn"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
