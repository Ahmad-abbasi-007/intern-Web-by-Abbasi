import { PortfolioData, ThemeConfig } from "../types";

export function generateBootstrapHtml(data: PortfolioData, config: ThemeConfig): string {
  const { fullName, title, bioHeader, bioDetailed, skills, projects, experience, education, socials } = data;
  const { primaryColor, fontFamily, visualStyle } = config;

  // Map theme colors to specific hex & Bootstrap utilities
  let colors = {
    bg: "#f8f9fa",
    text: "#212529",
    primary: "#0d6efd",
    secondary: "#6c757d",
    cardBg: "#ffffff",
    border: "#dee2e6",
    heroBg: "linear-gradient(135deg, #f1f3f5 0%, #e9ecef 100%)",
    accent: "#ffc107"
  };

  if (visualStyle === "dark-cosmic") {
    colors = {
      bg: "#0B0C10",
      text: "#C5C6C7",
      primary: "#66FCF1",
      secondary: "#45A29E",
      cardBg: "#1F2833",
      border: "#2C3539",
      heroBg: "radial-gradient(circle at 50% 50%, #15102a 0%, #05050c 100%)",
      accent: "#ff007f"
    };
  } else if (visualStyle === "cyber") {
    colors = {
      bg: "#0d0e15",
      text: "#00ffcc",
      primary: "#00ffcc",
      secondary: "#ff007f",
      cardBg: "#161824",
      border: "#00ffcc44",
      heroBg: "linear-gradient(180deg, #10111a 0%, #050609 100%)",
      accent: "#ff007f"
    };
  } else if (visualStyle === "warm") {
    colors = {
      bg: "#FAF6F0",
      text: "#403D39",
      primary: "#D48C6F",
      secondary: "#7D7461",
      cardBg: "#FFFDF9",
      border: "#EADECA",
      heroBg: "linear-gradient(135deg, #F5EFEB 0%, #EFE5C9 100%)",
      accent: "#A78255"
    };
  } else if (visualStyle === "swiss-modern") {
    colors = {
      bg: "#f4f4f4",
      text: "#1a1a1a",
      primary: "#d9383a",
      secondary: "#555555",
      cardBg: "#ffffff",
      border: "#e5e5e5",
      heroBg: "linear-gradient(135deg, #ffffff 0%, #ededed 100%)",
      accent: "#1a1a1a"
    };
  } else { // minimal (light modern)
    colors = {
      bg: "#fbfbfb",
      text: "#1c1917",
      primary: "#18181b",
      secondary: "#52525b",
      cardBg: "#ffffff",
      border: "#e4e4e7",
      heroBg: "linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 100%)",
      accent: "#a1a1aa"
    };
  }

  // Get active CSS fonts
  let fontImport = "";
  let fontStack = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  if (fontFamily === "Space Grotesk") {
    fontImport = '@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap");';
    fontStack = "'Space Grotesk', -apple-system, sans-serif";
  } else if (fontFamily === "Playfair Display") {
    fontImport = '@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap");';
    fontStack = "'Playfair Display', serif";
  } else if (fontFamily === "JetBrains Mono") {
    fontImport = '@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap");';
    fontStack = "'JetBrains Mono', monospace";
  } else { // Inter
    fontImport = '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");';
    fontStack = "'Inter', -apple-system, sans-serif";
  }

  // Generate unique filter categories from database projects
  const categories = Array.from(new Set(projects.map(p => p.projectType)));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fullName} | Professional Portfolio</title>
  
  <!-- Bootstrap 5.3 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  
  <!-- FontAwesome Icon Suite -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet">
  
  <style>
    ${fontImport}

    :root {
      --color-bg: ${colors.bg};
      --color-text: ${colors.text};
      --color-primary: ${colors.primary};
      --color-secondary: ${colors.secondary};
      --color-card-bg: ${colors.cardBg};
      --color-border: ${colors.border};
      --color-accent: ${colors.accent};
      --font-primary: ${fontStack};
    }

    body {
      background-color: var(--color-bg);
      color: var(--color-text);
      font-family: var(--font-primary);
      overflow-x: hidden;
      scroll-behavior: smooth;
      transition: background-color 0.3s, color 0.3s;
    }

    /* Core Spacing & Typography */
    h1, h2, h3, h4, h5, h6 {
      font-family: ${fontFamily === "Playfair Display" ? fontStack : "var(--font-primary)"};
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    /* Navbar styling */
    .navbar {
      background-color: var(--color-card-bg) !important;
      border-bottom: 1px solid var(--color-border);
      backdrop-filter: blur(10px);
      padding: 0.8rem 1.5rem;
    }

    .navbar-brand {
      font-weight: 800;
      color: var(--color-primary) !important;
      letter-spacing: -0.03em;
    }

    .nav-link {
      color: var(--color-text) !important;
      font-weight: 500;
      opacity: 0.82;
      transition: all 0.2s ease;
      margin: 0 0.5rem;
    }

    .nav-link:hover, .nav-link.active {
      color: var(--color-primary) !important;
      opacity: 1;
    }

    /* Hero Section styling */
    .hero-section {
      background: ${colors.heroBg};
      padding: 120px 0 80px 0;
      border-bottom: 1px solid var(--color-border);
      position: relative;
    }

    ${visualStyle === "cyber" ? `
    .hero-section::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
    }
    ` : ""}

    .badge-primary {
      background-color: var(--color-primary);
      color: ${visualStyle === "cyber" || visualStyle === "dark-cosmic" ? "#000" : "#fff"};
      font-size: 0.9rem;
      padding: 0.5em 1em;
      border-radius: 50px;
    }

    /* Animated Buttons */
    .btn-custom {
      background-color: var(--color-primary);
      color: ${visualStyle === "cyber" || visualStyle === "dark-cosmic" ? "#000" : "#fff"};
      font-weight: 600;
      border: 1px solid var(--color-primary);
      padding: 0.6rem 1.5rem;
      border-radius: 6px;
      transition: all 0.2s ease;
    }

    .btn-custom:hover {
      background-color: transparent;
      color: var(--color-primary);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .btn-outline-custom {
      background-color: transparent;
      color: var(--color-text);
      border: 1px solid var(--color-border);
      font-weight: 600;
      padding: 0.6rem 1.5rem;
      border-radius: 6px;
      transition: all 0.2s ease;
    }

    .btn-outline-custom:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
    }

    /* Card styling */
    .card {
      background-color: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      border-color: var(--color-primary);
    }

    /* Skills layout */
    .skill-bar-container {
      margin-bottom: 1.5rem;
    }

    .skill-bar {
      height: 8px;
      background-color: var(--color-border);
      border-radius: 50px;
      overflow: hidden;
    }

    .skill-progress {
      height: 100%;
      background-color: var(--color-primary);
      border-radius: 50px;
      transition: width 1s cubic-bezier(0.1, 0.8, 0.3, 1);
    }

    /* Filter buttons */
    .filter-btn {
      background-color: var(--color-card-bg);
      color: var(--color-text);
      border: 1px solid var(--color-border);
      padding: 0.4rem 1.2rem;
      border-radius: 50px;
      margin: 0.2rem;
      transition: all 0.2s;
    }

    .filter-btn.active, .filter-btn:hover {
      background-color: var(--color-primary);
      color: ${visualStyle === "cyber" || visualStyle === "dark-cosmic" ? "#000" : "#fff"};
      border-color: var(--color-primary);
    }

    /* Projects grid elements */
    .project-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .tech-pill {
      font-size: 0.75rem;
      background-color: var(--color-border);
      color: var(--color-text);
      padding: 0.2rem 0.6rem;
      border-radius: 50px;
      margin-right: 0.4rem;
      margin-bottom: 0.4rem;
      opacity: 0.85;
      display: inline-block;
    }

    /* Timeline module */
    .timeline {
      position: relative;
      border-left: 2px solid var(--color-border);
      padding-left: 2rem;
      margin-left: 1rem;
    }

    .timeline-item {
      position: relative;
      margin-bottom: 2.5rem;
    }

    .timeline-item::after {
      content: '';
      position: absolute;
      left: calc(-2rem - 6px);
      top: 5px;
      width: 12px;
      height: 12px;
      background-color: var(--color-primary);
      border: 2px solid var(--color-bg);
      border-radius: 50%;
    }

    .timeline-period {
      font-weight: 600;
      color: var(--color-primary);
      font-size: 0.9rem;
    }

    /* Footer styling */
    footer {
      background-color: var(--color-card-bg);
      border-top: 1px solid var(--color-border);
      padding: 3rem 0;
      margin-top: 5rem;
    }

    /* Cybernetic visual accent tweaks */
    ${visualStyle === "cyber" ? `
    body {
      text-shadow: 0 0 1px rgba(0, 255, 204, 0.2);
    }
    .card {
      border: 1px solid var(--color-primary);
      box-shadow: 0 0 10px rgba(0, 255, 204, 0.1);
    }
    .skill-progress {
      box-shadow: 0 0 10px var(--color-primary);
    }
    ` : ""}

    /* Extra Animations */
    .fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>

  <!-- Dynamic Responsive Navigation Header -->
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
      <a class="navbar-brand" href="#home">
        <i class="fa-solid class-title fa-code me-2"></i>\${namePart = "${fullName}"}
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#portfolioNav" aria-controls="portfolioNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" style="filter: ${visualStyle === "dark-cosmic" || visualStyle === "cyber" ? "invert(1)" : "none"}"></span>
      </button>
      <div class="collapse navbar-collapse" id="portfolioNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item"><a class="nav-link active" href="#home">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
          <li class="nav-item"><a class="nav-link" href="#skills">Skills</a></li>
          <li class="nav-item"><a class="nav-link" href="#projects">Projects</a></li>
          <li class="nav-item"><a class="nav-link" href="#experience">Experience</a></li>
          <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Hero / Home Section -->
  <section id="home" class="hero-section text-center d-flex align-items-center justify-content-center">
    <div class="container py-5 fade-in">
      <span class="badge badge-primary mb-3"><i class="fa-solid fa-bolt me-1"></i> Available for Opportunities</span>
      <h1 class="display-3 mb-2" style="font-weight: 800;">${fullName}</h1>
      <p class="lead text-muted fs-4 mb-4 mx-auto" style="max-width: 700px;">${title}</p>
      <div class="p-2 mb-4 fs-5 mx-auto" style="max-width: 800px; opacity: 0.9;">
        "${bioHeader}"
      </div>
      <div>
        <a href="#projects" class="btn btn-custom me-2"><i class="fa-solid fa-briefcase me-1"></i> View Projects</a>
        <a href="#contact" class="btn btn-outline-custom"><i class="fa-solid fa-envelope me-1"></i> Reach Out</a>
      </div>
    </div>
  </section>

  <!-- About Me Section -->
  <section id="about" class="py-5">
    <div class="container py-4">
      <div class="row align-items-center">
        <div class="col-lg-6 mb-4 mb-lg-0 fade-in">
          <h2 class="section-title mb-4"><span style="border-bottom: 3px solid var(--color-primary); padding-bottom: 8px;">About Me</span></h2>
          <div class="fs-6 text-muted" style="line-height: 1.8; white-space: pre-line;">
            ${bioDetailed}
          </div>
        </div>
        <div class="col-lg-5 offset-lg-1">
          <div class="card p-4 text-center">
            <div class="mb-3">
              <i class="fa-solid fa-terminal fa-3x" style="color: var(--color-primary)"></i>
            </div>
            <h4 class="mb-3">Contact Details</h4>
            <ul class="list-unstyled text-start mb-0 px-3">
              <li class="mb-3 text-muted"><i class="fa-solid fa-location-dot me-3 text-primary"></i> <strong>Location:</strong> ${socials.location || "San Francisco, CA"}</li>
              <li class="mb-3 text-muted"><i class="fa-solid fa-envelope me-3 text-primary"></i> <strong>Email:</strong> ${socials.email}</li>
              <li class="mb-3 text-muted"><i class="fa-brands fa-github me-3 text-primary"></i> <strong>GitHub:</strong> <a href="${socials.github}" target="_blank" class="text-decoration-none" style="color: var(--color-text);">${socials.github.replace("https://", "")}</a></li>
              <li class="mb-0 text-muted"><i class="fa-brands fa-linkedin me-3 text-primary"></i> <strong>LinkedIn:</strong> <a href="${socials.linkedin}" target="_blank" class="text-decoration-none" style="color: var(--color-text);">${socials.linkedin.replace("https://", "")}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section id="skills" class="py-5" style="background-color: var(--color-card-bg); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
    <div class="container py-4">
      <h2 class="text-center mb-5"><span style="border-bottom: 3px solid var(--color-primary); padding-bottom: 8px;">Professional Skills</span></h2>
      <div class="row pt-2">
        
        <!-- Frontend Skills Column -->
        <div class="col-md-4 mb-4">
          <div class="p-3">
            <h4 class="mb-4 text-primary"><i class="fa-solid fa-laptop-code me-2"></i> Frontend</h4>
            ${skills.filter(s => s.category === "Frontend").map(s => `
              <div class="skill-bar-container">
                <div class="d-flex justify-content-between mb-1">
                  <span>${s.name}</span>
                  <strong>${s.level}%</strong>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: ${s.level}%"></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Backend Skills Column -->
        <div class="col-md-4 mb-4">
          <div class="p-3">
            <h4 class="mb-4 text-primary"><i class="fa-solid fa-server me-2"></i> Backend</h4>
            ${skills.filter(s => s.category === "Backend").map(s => `
              <div class="skill-bar-container">
                <div class="d-flex justify-content-between mb-1">
                  <span>${s.name}</span>
                  <strong>${s.level}%</strong>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: ${s.level}%"></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- DevOps & Tools Skills Column -->
        <div class="col-md-4 mb-4">
          <div class="p-3">
            <h4 class="mb-4 text-primary"><i class="fa-solid fa-toolbox me-2"></i> Tools &amp; Methods</h4>
            ${skills.filter(s => s.category === "Tools/Other").map(s => `
              <div class="skill-bar-container">
                <div class="d-flex justify-content-between mb-1">
                  <span>${s.name}</span>
                  <strong>${s.level}%</strong>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: ${s.level}%"></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Projects Section (with custom category filter) -->
  <section id="projects" class="py-5">
    <div class="container py-4">
      <h2 class="text-center mb-4"><span style="border-bottom: 3px solid var(--color-primary); padding-bottom: 8px;">Featured Projects</span></h2>
      <p class="text-center text-muted col-lg-6 mx-auto mb-5">A selection of technical platforms and products. Use the category filters below to browse by technology group.</p>
      
      <!-- Interactive Category Filter Section -->
      <div class="d-flex justify-content-center flex-wrap mb-5">
        <button class="filter-btn active" onclick="filterProjects('all')">All Tech</button>
        ${categories.map(cat => `
          <button class="filter-btn" onclick="filterProjects('${cat}')">${cat}</button>
        `).join("")}
      </div>

      <!-- Projects Grid -->
      <div class="row pt-2" id="projectsContainer">
        ${projects.map((proj, idx) => `
          <div class="col-md-6 mb-4 project-item" data-category="${proj.projectType}">
            <div class="card project-card p-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="badge badge-primary bg-opacity-10 text-primary px-3 py-2 fs-7">${proj.projectType}</span>
                <div class="project-links">
                  <a href="${proj.githubUrl}" target="_blank" class="text-muted fs-5 me-3 hover-primary"><i class="fa-brands fa-github"></i></a>
                  <a href="${proj.liveUrl}" target="_blank" class="text-muted fs-5 hover-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>
              </div>
              <h4 class="mb-2">${proj.title}</h4>
              <p class="text-muted fs-6 mb-3">${proj.shortDescription}</p>
              <p class="fs-7 text-muted flex-grow-1" style="opacity: 0.95;">${proj.detailedDescription}</p>
              <div class="pt-3 border-top mt-3">
                ${proj.techStack.map(ts => `<span class="tech-pill">${ts}</span>`).join("")}
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- Education & Experience Timeline -->
  <section id="experience" class="py-5" style="background-color: var(--color-card-bg); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
    <div class="container py-4">
      <div class="row">
        
        <!-- Professional Experience Column -->
        <div class="col-lg-6 mb-5 mb-lg-0">
          <h3 class="mb-5"><i class="fa-solid fa-briefcase text-primary me-3"></i> Work Timeline</h3>
          <div class="timeline">
            ${experience.map(exp => `
              <div class="timeline-item">
                <span class="timeline-period d-block mb-1">${exp.period}</span>
                <h4 class="mb-1">${exp.role}</h4>
                <h5 class="text-muted fs-6 mb-3">${exp.company}</h5>
                <ul class="list-unstyled text-muted pl-0 fs-7" style="line-height: 1.6;">
                  ${exp.achievements.map(ach => `
                    <li class="mb-2"><i class="fa-solid fa-circle-check text-primary me-2 flex-shrink-0" style="font-size:0.75rem;"></i> ${ach}</li>
                  `).join("")}
                </ul>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Academic Foundation / Education Column -->
        <div class="col-lg-5 offset-lg-1">
          <h3 class="mb-5"><i class="fa-solid fa-graduation-cap text-primary me-3"></i> Academic Base</h3>
          <div class="timeline">
            ${education.map(edu => `
              <div class="timeline-item">
                <span class="timeline-period d-block mb-1">${edu.period}</span>
                <h4 class="mb-1">${edu.degree}</h4>
                <p class="text-muted mb-0">${edu.institution}</p>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-5">
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card p-5">
            <h2 class="text-center mb-2">Let's build something epic</h2>
            <p class="text-center text-muted mb-5">Have a question or want to collaborate? Send me a message, and I will get back to you shortly.</p>
            
            <form id="contactForm" onsubmit="handleFormSubmit(event)">
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label for="senderName" class="form-label font-semibold">Your Name</label>
                  <input type="text" class="form-control p-3 shadow-none border-secondary-subtle" id="senderName" placeholder="Alex Mercer" required>
                </div>
                <div class="col-md-6">
                  <label for="senderEmail" class="form-label font-semibold">Your Email</label>
                  <input type="email" class="form-control p-3 shadow-none border-secondary-subtle" id="senderEmail" placeholder="alex@domain.com" required>
                </div>
              </div>
              <div class="mb-4">
                <label for="senderMessage" class="form-label font-semibold">Message</label>
                <textarea class="form-control p-3 shadow-none border-secondary-subtle" id="senderMessage" rows="5" placeholder="Hi! I wanted to inquire about custom service designs..." required></textarea>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-custom px-5 py-3 w-100" id="submitBtn">
                  <i class="fa-solid fa-paper-plane me-2"></i> Dispatch Message
                </button>
              </div>
            </form>

            <!-- Submission Confirmation Notification -->
            <div id="successMessage" class="mt-4 p-4 d-none text-center rounded bg-opacity-10 bg-success text-success border border-success">
              <i class="fa-solid fa-circle-check fa-2x mb-2 d-block"></i>
              <h4>Inquiry Dispatched Successfully!</h4>
              <p class="mb-0">Your message has been cataloged. Thank you for connecting!</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer block -->
  <footer class="text-center text-muted">
    <div class="container">
      <div class="mb-4">
        <a href="${socials.github}" target="_blank" class="text-muted mx-3 fs-4 hover-primary"><i class="fa-brands fa-github"></i></a>
        <a href="${socials.linkedin}" target="_blank" class="text-muted mx-3 fs-4 hover-primary"><i class="fa-brands fa-linkedin"></i></a>
        <a href="${socials.twitter}" target="_blank" class="text-muted mx-3 fs-4 hover-primary"><i class="fa-brands fa-twitter"></i></a>
      </div>
      <p class="mb-1">&copy; 2026 ${fullName}. All Rights Reserved.</p>
      <p class="fs-8 mt-1 text-muted" style="font-size: 0.8rem;">Structured and customized using the Professional Portfolio Website Builder</p>
    </div>
  </footer>

  <!-- Bootstrap 5 Bundle JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  
  <!-- Custom Logic for dynamic interactive operations (Categories Filter and Toast Handler) -->
  <script>
    // 1. Projects Category Filtering Handler
    function filterProjects(category) {
      // Toggle button states
      const buttons = document.querySelectorAll('.filter-btn');
      buttons.forEach(btn => btn.classList.remove('active'));
      
      const activeButton = Array.from(buttons).find(btn => btn.textContent.trim().toLowerCase() === category.toLowerCase() || (category === 'all' && btn.textContent.trim().toLowerCase() === 'all tech'));
      if (activeButton) activeButton.classList.add('active');

      // Filter element viewports
      const items = document.querySelectorAll('.project-item');
      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('d-none');
          item.style.animation = 'none';
          void item.offsetWidth; // Trigger reflow
          item.style.animation = 'fadeIn 0.5s ease-out forwards';
        } else {
          item.classList.add('d-none');
        }
      });
    }

    // 2. Interactivity Scroll Spy Setup
    document.addEventListener("DOMContentLoaded", function () {
      const links = document.querySelectorAll('.nav-link');
      const sections = document.querySelectorAll('section');

      window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(sec => {
          const sectionTop = sec.offsetTop;
          if (pageYOffset >= sectionTop - 150) {
            currentSectionId = sec.getAttribute('id');
          }
        });

        links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === currentSectionId) {
            link.classList.add('active');
          }
        });
      });
    });

    // 3. Contact Form Submission simulation
    function handleFormSubmit(event) {
      event.preventDefault();
      
      const form = document.getElementById('contactForm');
      const submitBtn = document.getElementById('submitBtn');
      const successBlock = document.getElementById('successMessage');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Transmitting...';

      // Mock latency
      setTimeout(() => {
        form.classList.add('d-none');
        successBlock.classList.remove('d-none');
        successBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1200);
    }
  </script>
</body>
</html>`;
}
