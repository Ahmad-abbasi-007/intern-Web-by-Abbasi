import { useState, useEffect } from "react";

interface NavbarProps {
  onOpenLogin: () => void;
  activeSection: string;
}

export default function Navbar({ onOpenLogin, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top transition-all duration-300 ${
        isSticky
          ? "bg-whitepace-navy shadow-lg py-2"
          : "bg-whitepace-navy py-3"
      }`}
      style={{ zIndex: 1050 }}
      id="main-nav"
    >
      <div className="container">
        {/* Brand Logo */}
        <a 
          className="navbar-brand d-flex align-items-center text-white font-weight-bold" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{ fontSize: "1.5rem", letterSpacing: "-0.5px" }}
          id="nav-logo"
        >
          {/* Custom SVG Logo closely representing the Whitepace brand double-diamond/feather shape */}
          <div 
            className="bg-whitepace-blue d-flex align-items-center justify-content-center me-2 p-1"
            style={{ width: "32px", height: "32px", borderRadius: "8px", transform: "rotate(-5deg)" }}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M4 12L12 4L20 12L12 20L4 12Z" 
                fill="#FFE492" 
              />
              <path 
                d="M9 12L12 9L15 12L12 15L9 12Z" 
                fill="#043873" 
              />
            </svg>
          </div>
          <span className="fw-bold brand-font">whitepace</span>
        </a>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler text-white border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          id="navbar-toggle-btn"
        >
          <i className={`bi ${isOpen ? "bi-x-lg" : "bi-list"}`} style={{ fontSize: "1.75rem" }}></i>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbar-content">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            {/* Products Dropdown */}
            <li className="nav-item dropdown px-2">
              <a
                className="nav-link dropdown-toggle text-white-50 hover:text-white fw-medium d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="products-dropdown"
              >
                Products
              </a>
              <ul className="dropdown-menu shadow border-0 py-2 mt-2">
                <li>
                  <a className="dropdown-item py-2" href="#playground" onClick={(e) => { e.preventDefault(); scrollToSection("playground"); }}>
                    <i className="bi bi-pencil-square text-primary me-2"></i> Interactive Editor
                  </a>
                </li>
                <li>
                  <a className="dropdown-item py-2" href="#features" onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}>
                    <i className="bi bi-patch-check text-primary me-2"></i> Core Modules
                  </a>
                </li>
                <li>
                  <a className="dropdown-item py-2" href="#extension" onClick={(e) => { e.preventDefault(); scrollToSection("extension"); }}>
                    <i className="bi bi-puzzle text-primary me-2"></i> Extensions & Templates
                  </a>
                </li>
              </ul>
            </li>

            {/* Solutions Dropdown */}
            <li className="nav-item dropdown px-2">
              <a
                className="nav-link dropdown-toggle text-white-50 hover:text-white fw-medium d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="solutions-dropdown"
              >
                Solutions
              </a>
              <ul className="dropdown-menu shadow border-0 py-2 mt-2">
                <li>
                  <a className="dropdown-item py-2" href="#collaboration" onClick={(e) => { e.preventDefault(); scrollToSection("collaboration"); }}>
                    <i className="bi bi-people text-primary me-2"></i> Team Collaboration
                  </a>
                </li>
                <li>
                  <a className="dropdown-item py-2" href="#favorite-apps" onClick={(e) => { e.preventDefault(); scrollToSection("favorite-apps"); }}>
                    <i className="bi bi-cpu text-primary me-2"></i> Productivity Suite
                  </a>
                </li>
              </ul>
            </li>

            {/* Pricing Link */}
            <li className="nav-item px-2">
              <a
                className={`nav-link fw-medium ${
                  activeSection === "pricing" ? "text-white" : "text-white-50 hover:text-white"
                }`}
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("pricing");
                }}
                id="nav-link-pricing"
              >
                Pricing
              </a>
            </li>

            {/* Resources Dropdown */}
            <li className="nav-item dropdown px-2">
              <a
                className="nav-link dropdown-toggle text-white-50 hover:text-white fw-medium d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="resources-dropdown"
              >
                Resources
              </a>
              <ul className="dropdown-menu shadow border-0 py-2 mt-2">
                <li>
                  <a className="dropdown-item py-2" href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection("testimonials"); }}>
                    <i className="bi bi-chat-heart text-success me-2"></i> Customer Stories
                  </a>
                </li>
                <li>
                  <a className="dropdown-item py-2" href="#data-section" onClick={(e) => { e.preventDefault(); scrollToSection("data-section"); }}>
                    <i className="bi bi-shield-check text-info me-2"></i> Security & Open Format
                  </a>
                </li>
              </ul>
            </li>

            {/* Action Buttons */}
            <li className="nav-item ms-lg-4 mt-3 mt-lg-0 d-flex flex-column flex-lg-row gap-2">
              <button
                onClick={onOpenLogin}
                className="btn btn-whitepace-yellow py-2 px-4 rounded"
                id="nav-login-btn"
              >
                Login
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="btn btn-whitepace-primary py-2 px-4 rounded d-inline-flex align-items-center justify-content-center gap-2"
                id="nav-cta-btn"
              >
                Try Whitepace free
                <i className="bi bi-arrow-right"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
