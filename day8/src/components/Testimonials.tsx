import React, { useState } from "react";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  avatarLetter: string;
  avatarColor: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      text: "Whitepace has completely revolutionized how our team handles launch checklists and code block audit compilations. The math formula engine is a massive help for our math-intensive engineering layouts.",
      name: "Albert Thompson",
      role: "Chief of Product",
      company: "Slack Hubs",
      rating: 5,
      avatarLetter: "AT",
      avatarColor: "bg-primary"
    },
    {
      id: 2,
      text: "We wanted a clean, single-page workspace representation that looked exactly like our design specifications. Whitepace does that flawlessly. The dual-pane customizable layout works wonders for our writers.",
      name: "Sarah Green",
      role: "Lead Creative Designer",
      company: "Aesthetic Co",
      rating: 5,
      avatarLetter: "SG",
      avatarColor: "bg-success"
    },
    {
      id: 3,
      text: "Co-authoring backups are vital to our strict security mandates. Whitepace's open JSON backup exporter allows our teams to securely pull active files anytime without lock-ins. Absolute 10/10!",
      name: "Marcus Sterling",
      role: "Principal Systems Architect",
      company: "Cloud Safe",
      rating: 5,
      avatarLetter: "MS",
      avatarColor: "bg-warning"
    }
  ]);

  // Form input states
  const [newText, setNewText] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [showForm, setShowForm] = useState(false);

  // Form submission handler
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText || !newName || !newRole) {
      alert("Please fill in Name, Role, and Review elements!");
      return;
    }

    const initials = newName.trim().substring(0, 2).toUpperCase();
    const colors = ["bg-primary", "bg-success", "bg-danger", "bg-warning", "bg-info", "bg-dark"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const updatedList: Testimonial = {
      id: Date.now(),
      text: newText,
      name: newName,
      role: newRole,
      company: newCompany || "Independent",
      rating: newRating,
      avatarLetter: initials || "U",
      avatarColor: randomColor,
    };

    setTestimonials([updatedList, ...testimonials]);
    
    // Clear form
    setNewText("");
    setNewName("");
    setNewRole("");
    setNewCompany("");
    setNewRating(5);
    setShowForm(false);
  };

  return (
    <section className="py-5 bg-white" id="testimonials" style={{ paddingBottom: "100px !important" }}>
      <div className="container">
        {/* Title Content */}
        <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-5 pb-2">
          <div>
            <span className="mono-font text-xs text-whitepace-blue fw-bold text-uppercase d-block mb-2">
              ⭐ Customer Reviews
            </span>
            <h2 className="display-5 fw-bold text-whitepace-navy mb-0">
              What our clients says
            </h2>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="btn btn-whitepace-outline-dark px-4 py-2 text-xs font-semibold rounded d-inline-flex align-items-center gap-1.5"
            id="toggle-testimonial-form"
          >
            <i className={`bi ${showForm ? "bi-dash-circle-fill" : "bi-plus-circle-fill"} text-primary`}></i>
            {showForm ? "Hide Form" : "Write a Review"}
          </button>
        </div>

        {/* Review Submission Form drawer */}
        {showForm && (
          <div className="card shadow-md border-0 bg-light p-4 rounded-4 mb-5 max-w-2xl mx-auto">
            <h5 className="fw-bold text-whitepace-navy mb-3"><i className="bi bi-chat-heart text-whitepace-blue me-1.5"></i> Submit Your Workspace Experience</h5>
            <form onSubmit={handleAddTestimonial} id="testimonial-form">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="text-xs text-muted mb-1 d-block fw-semibold">Your Name <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    placeholder="e.g., Albert Thompson" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)} 
                    className="form-control text-xs py-2" 
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="text-xs text-muted mb-1 d-block fw-semibold">Designation / Role <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    placeholder="e.g., Chief Executive Officer" 
                    value={newRole} 
                    onChange={(e) => setNewRole(e.target.value)} 
                    className="form-control text-xs py-2" 
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="text-xs text-muted mb-1 d-block fw-semibold">Organization / Company Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Slack Hubs" 
                    value={newCompany} 
                    onChange={(e) => setNewCompany(e.target.value)} 
                    className="form-control text-xs py-2" 
                  />
                </div>
                <div className="col-md-6">
                  <label className="text-xs text-muted mb-1 d-block fw-semibold">Select Star Placement Score</label>
                  <select 
                    value={newRating} 
                    onChange={(e) => setNewRating(Number(e.target.value))} 
                    className="form-select text-xs py-2"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="text-xs text-muted mb-1 d-block fw-semibold">Your Testimonial Review <span className="text-danger">*</span></label>
                  <textarea 
                    rows={3} 
                    placeholder="Tell other builders how whitepace helped organize your documents or sync your team checklists..."
                    value={newText} 
                    onChange={(e) => setNewText(e.target.value)} 
                    className="form-control text-xs p-3" 
                    required 
                  />
                </div>
                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-whitepace-primary px-4 py-2.5 text-xs fw-semibold rounded" id="submit-testimonial">
                    Publish Testimonial
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Testimonials layout grid */}
        <div className="row g-4" id="testimonials-grid">
          {testimonials.map((t) => (
            <div className="col-lg-4 col-md-6" key={t.id}>
              <div className="card h-100 p-4 border-light border-2 rounded-4 shadow-sm d-flex flex-column justify-content-between hover-scale bg-white">
                <div>
                  {/* Quotes Icon */}
                  <div className="text-whitepace-blue fs-1 lh-1 mb-2">
                    <i className="bi bi-quote"></i>
                  </div>
                  
                  {/* Reviews Stars */}
                  <div className="text-warning mb-3" style={{ fontSize: "0.85rem" }}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <i key={i} className="bi bi-star-fill me-1"></i>
                    ))}
                  </div>

                  {/* Comments Body */}
                  <p className="text-secondary leading-relaxed mb-4" style={{ fontSize: "0.95rem" }}>
                    "{t.text}"
                  </p>
                </div>

                <hr className="my-4 text-light-dark" />

                {/* Profile Bio Footer */}
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className={`${t.avatarColor} text-white fw-bold rounded-circle d-flex align-items-center justify-content-center share-avatar`} 
                    style={{ width: "45px", height: "45px", fontSize: "1rem" }}
                  >
                    {t.avatarLetter}
                  </div>
                  <div>
                    <h6 className="fw-bold text-whitepace-navy mb-0" style={{ fontSize: "0.98rem" }}>{t.name}</h6>
                    <span className="text-muted text-xxs" style={{ fontSize: "10.5px" }}>{t.role}, <span className="text-primary fw-medium">{t.company}</span></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
