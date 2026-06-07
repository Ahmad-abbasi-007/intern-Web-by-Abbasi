import React, { useState, useEffect } from "react";
import FigmaSimulator from "./components/FigmaSimulator";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  // Authentication states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Subscriptions Checkout states
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState("");
  const [selectedPlanPrice, setSelectedPlanPrice] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");

  const handleOpenLogin = () => {
    setShowLoginModal(true);
    setLoginSuccess(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSuccess(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginEmail("");
      setLoginPassword("");
    }, 1000);
  };

  const handleOpenCheckout = (planName: string, price: string) => {
    setSelectedPlanName(planName);
    setSelectedPlanPrice(price);
    setCheckoutComplete(false);
    setIsCheckingOut(false);
    setCreditCardNumber("");
    setCardExpiry("");
    setShowCheckoutModal(true);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setTimeout(() => {
      // Simulate cryptographic license tag creation
      const generatedKey = `WHP-LIC-${Math.random().toString(36).substr(2, 9).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      setLicenseKey(generatedKey);
      setCheckoutComplete(true);
      setIsCheckingOut(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 overflow-hidden">
      
      {/* FIGMA SIMULATOR CANVAS VIEW */}
      <FigmaSimulator 
        onOpenLogin={handleOpenLogin} 
        onOpenCheckout={(plan) => handleOpenCheckout(plan, "$4.99/mo")} 
      />


      {/* --- MODAL 1: INTERACTIVE LOGIN OVERLAY --- */}
      {showLoginModal && (
        <div className="modal fade show d-block bg-black bg-opacity-50" tabIndex={-1} style={{ zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-whitepace-navy text-white">
                <h5 className="modal-title fw-bold brand-font"><i className="bi bi-shield-lock-fill me-2 text-whitepace-yellow"></i> Login to Your Workspace</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setShowLoginModal(false)}
                  aria-label="Close"
                  id="close-login-modal-x"
                ></button>
              </div>
              <div className="modal-body p-4 bg-white">
                {loginSuccess ? (
                  <div className="text-center py-4" id="login-success-state">
                    <div className="bg-success bg-opacity-10 text-success rounded-circle p-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "65px", height: "65px" }}>
                      <i className="bi bi-check-circle-fill display-6"></i>
                    </div>
                    <h5 className="fw-bold text-whitepace-navy mb-1">Handshake Authenticated</h5>
                    <p className="text-muted text-xs">Redirecting securely back to Whitepace notebook...</p>
                  </div>
                ) : (
                  <form onSubmit={handleLoginSubmit} id="modal-login-form">
                    <div className="mb-3">
                      <label htmlFor="loginEmailField" className="form-label text-xs fw-semibold text-secondary">Email address</label>
                      <input 
                        type="email" 
                        className="form-control text-xs" 
                        id="loginEmailField" 
                        placeholder="e.g. coder@google.com" 
                        required 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="loginPasswordField" className="form-label text-xs fw-semibold text-secondary">Password Space</label>
                      <input 
                        type="password" 
                        className="form-control text-xs" 
                        id="loginPasswordField" 
                        placeholder="••••••••" 
                        required 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 form-check d-flex align-items-center gap-2">
                      <input type="checkbox" className="form-check-input mt-0 text-xs" id="rememberCheck" style={{ width: "13px", height: "13px" }} />
                      <label className="form-check-label text-xxs text-muted" htmlFor="rememberCheck">Remember this terminal session wrapper</label>
                    </div>
                    <button type="submit" className="btn btn-whitepace-navy w-100 py-2.5 fs-6 fw-semibold text-white rounded mb-2" id="login-modal-submit">
                      Sign In
                    </button>
                    <span className="text-stone-400 d-block text-center text-xxs" style={{ fontSize: "10px" }}>* Standard sandbox configuration, do not submit actual secret database passwords in forms.</span>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: MOCK SUBSCIPTION CHECKOUT LICENSING ENGINE --- */}
      {showCheckoutModal && (
        <div className="modal fade show d-block bg-black bg-opacity-50" tabIndex={-1} style={{ zIndex: 1100 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-whitepace-navy text-white">
                <h5 className="modal-title fw-bold"><i className="bi bi-cart shadow me-2 text-whitepace-yellow"></i> Checkout: {selectedPlanName}</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setShowCheckoutModal(false)}
                  aria-label="Close"
                  id="close-checkout-modal-x"
                ></button>
              </div>
              <div className="modal-body p-4 bg-white">
                {checkoutComplete ? (
                  <div className="text-center py-3" id="checkout-complete-state">
                    <div className="bg-success bg-opacity-10 text-success rounded-circle p-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "65px", height: "65px" }}>
                      <i className="bi bi-patch-check-fill display-5"></i>
                    </div>
                    <h5 className="fw-bold text-whitepace-navy mb-1">Payment Succeeded!</h5>
                    <p className="text-secondary text-xs mb-4">Your subscription is active. Here is your generated license code:</p>
                    
                    <div className="bg-light p-3 rounded border border-dashed text-center mb-4">
                      <code className="text-danger fw-bold fs-6 tracking-wide select-all mono-font" id="license-key-display">{licenseKey}</code>
                      <p className="text-xxs text-muted mb-0 mt-2"><i className="bi bi-info-circle"></i> Click to select and copy license keys.</p>
                    </div>

                    <button 
                      onClick={() => setShowCheckoutModal(false)} 
                      className="btn btn-whitepace-navy w-100 py-2.5 fw-semibold text-white text-xs rounded"
                      id="dismiss-checkout-complete-btn"
                    >
                      Done, Open Workspace
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCheckoutSubmit} id="checkout-form">
                    <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3 mb-4 border">
                      <div>
                        <span className="text-xxs text-muted text-uppercase d-block fw-semibold">Target Tier Selection</span>
                        <span className="fw-bold text-whitepace-navy">{selectedPlanName}</span>
                      </div>
                      <div className="text-end">
                        <span className="text-xxs text-muted text-uppercase d-block fw-semibold">Billed Cost</span>
                        <span className="fw-bold h5 text-primary mb-0">{selectedPlanPrice}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="checkoutCardField" className="form-label text-xs fw-semibold text-secondary">Cardholder Signature Code (Mock Card)</label>
                      <input 
                        type="text" 
                        className="form-control text-xs" 
                        id="checkoutCardField" 
                        placeholder="e.g. 4111 2222 3333 4444" 
                        value={creditCardNumber}
                        onChange={(e) => setCreditCardNumber(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="row g-3 mb-4">
                      <div className="col-6">
                        <label className="form-label text-xs fw-semibold text-secondary">Exp Month/Year</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          className="form-control text-xs" 
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          required 
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label text-xs fw-semibold text-secondary">CVV Protection</label>
                        <input type="text" placeholder="3 Digit" className="form-control text-xs" required />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-whitepace-primary w-100 py-3 fs-6 d-flex justify-content-center align-items-center gap-2 fw-semibold text-white rounded mb-2" 
                      id="checkout-modal-submit"
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status"></span>
                          Processing Verification...
                        </>
                      ) : (
                        `Authorize Payment (${selectedPlanPrice})`
                      )}
                    </button>
                    <span className="text-stone-400 d-block text-center text-xxs" style={{ fontSize: "10px" }}>* Mock Sandbox licensing engine only, do not insert genuine financial details.</span>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
