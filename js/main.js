const projects = {
  salas: {
    title: "Salas &mdash; Agent Hub",
    category: "SaaS / Dashboard",
    description:
      "A full-featured agent management dashboard with Discord-style UI, memory block editor, session monitoring, and integrated chat. Built for orchestrating AI agent workflows.",
    role: "Full-stack development, UI design, system architecture",
    tech: "Node.js, Express, Vanilla JS, CSS, Claude Code",
    visual: "thumb-salas",
    link: "https://github.com/michaeljuliomoss-cpu/michaelmoss"
  },
  harbor: {
    title: "Harbor Bistro",
    category: "Restaurant / Web",
    description:
      "A warm, appetite-driven website for a Nassau waterfront bistro. Menu, reservations, and story-driven visuals that transport visitors before they arrive.",
    role: "Creative direction, web design, development",
    tech: "HTML, CSS, JavaScript, Responsive",
    visual: "thumb-harbor",
    link: "#"
  },
  coral: {
    title: "Coral &amp; Clay",
    category: "E-Commerce / Store",
    description:
      "An artisanal e-commerce experience for a Caribbean home goods brand. Clean product photography, seamless checkout, and a story that travels through every page.",
    role: "Brand identity, web design, Shopify",
    tech: "Shopify, HTML, CSS, JavaScript",
    visual: "thumb-coral",
    link: "#"
  },
  bahamasmed: {
    title: "Bahamas Medical",
    category: "Healthcare / Portal",
    description:
      "A patient-centered clinic portal with appointment booking, medical records access, and provider directories. Built for clarity and trust.",
    role: "UX design, frontend development, integration",
    tech: "HTML, CSS, JavaScript, PHP",
    visual: "thumb-bahamasmed",
    link: "#"
  },
  islandtaxi: {
    title: "Island Taxi",
    category: "Mobile / Booking",
    description:
      "A mobile-first booking platform connecting Nassau visitors with local drivers. Real-time availability, fare estimates, and ride tracking.",
    role: "Product design, mobile development",
    tech: "React Native, Node.js, Map API",
    visual: "thumb-islandtaxi",
    link: "#"
  },
  nassaudental: {
    title: "Nassau Dental",
    category: "Medical / Service",
    description:
      "A clean, reassuring service site for a dental practice. Online booking, service descriptions, patient resources, and before/after gallery.",
    role: "Web design, development, SEO",
    tech: "HTML, CSS, JavaScript",
    visual: "thumb-nassaudental",
    link: "#"
  },
  palmresort: {
    title: "Palm Resort",
    category: "Hospitality / Web",
    description:
      "An immersive resort website with room galleries, virtual tours, booking integration, and local attraction guides. Designed to convert lookers into guests.",
    role: "Creative direction, full-stack build",
    tech: "HTML, CSS, JavaScript, Booking API",
    visual: "thumb-palmresort",
    link: "#"
  },
  bayrealty: {
    title: "Bay Realty",
    category: "Real Estate / Platform",
    description:
      "A property listing platform for Nassau real estate. Advanced search, virtual tours, agent profiles, and marketplace tools.",
    role: "Platform strategy, design, development",
    tech: "React, Node.js, PostgreSQL, Mapbox",
    visual: "thumb-bayrealty",
    link: "#"
  },
  harbourlegal: {
    title: "Harbour Legal",
    category: "Legal / Web",
    description:
      "A professional legal services site with practice area overviews, attorney profiles, case management portal, and client resources.",
    role: "Web design, development, CMS",
    tech: "HTML, CSS, JavaScript, WordPress",
    visual: "thumb-harbourlegal",
    link: "#"
  }
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
}

function initNavigation() {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/index.html";
  const normalized = currentPath.endsWith("/") ? `${currentPath}index.html` : currentPath;

  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const isHome = link.classList.contains("is-home");
    const isCases = link.classList.contains("is-cases");
    const isContact = link.classList.contains("is-contact");

    const active =
      (isHome && (normalized.endsWith("/index.html") || normalized.endsWith("/portfolio/index.html"))) ||
      (isCases && normalized.endsWith("/cases/index.html")) ||
      (isContact && normalized.endsWith("/contact/index.html"));

    link.classList.toggle("is-active", Boolean(active));
  });
}

function initSmoothHashLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
    observer.observe(item);
  });
}

function initModal() {
  const modal = document.querySelector("[data-modal]");
  const cards = document.querySelectorAll("[data-project]");

  if (!modal || !cards.length) return;

  const visual = modal.querySelector("[data-modal-visual]");
  const category = modal.querySelector("[data-modal-category]");
  const title = modal.querySelector("[data-modal-title]");
  const description = modal.querySelector("[data-modal-description]");
  const role = modal.querySelector("[data-modal-role]");
  const tech = modal.querySelector("[data-modal-tech]");
  const link = modal.querySelector("[data-modal-link]");
  const closeButtons = modal.querySelectorAll("[data-modal-close]");
  let lastFocusedElement = null;

  const projectFromCard = (card) => projects[card.dataset.project];

  const openModal = (card) => {
    const project = projectFromCard(card);
    if (!project) return;

    lastFocusedElement = document.activeElement;
    visual.className = `modal__visual ${project.visual}`;
    category.textContent = project.category;
    title.textContent = project.title;
    description.textContent = project.description;
    role.textContent = project.role;
    tech.textContent = project.tech;
    link.href = project.link;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const closeButton = modal.querySelector(".modal__close");
    if (closeButton) closeButton.focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const note = form.querySelector("[data-form-note]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const originalText = button ? button.textContent : "";

    if (button) {
      button.disabled = true;
      button.textContent = "Message sent";
    }

    if (note) {
      note.textContent = "Thanks — this demo form captured your note locally.";
    }

    form.reset();

    window.setTimeout(() => {
      if (button) {
        button.disabled = false;
        button.textContent = originalText;
      }
      if (note) {
        note.textContent = "";
      }
    }, 3200);
  });
}

initHeader();
initNavigation();
initSmoothHashLinks();
initRevealAnimations();
initModal();
initContactForm();
