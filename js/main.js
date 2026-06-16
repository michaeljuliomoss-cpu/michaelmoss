const projects = {
  lumen: {
    title: "Lumen Ledger",
    category: "Fintech / Product UI",
    description:
      "A calm analytics workspace for finance teams tracking cash flow, invoices, and revenue risk. The system turns dense operational data into prioritized decisions with a restrained visual language.",
    role: "Product strategy, UX architecture, interface design, frontend prototype",
    tech: "React, TypeScript, Figma, Design System",
    visual: "thumb-lumen",
    link: "https://example.com/lumen-ledger"
  },
  atlas: {
    title: "Atlas Supply",
    category: "Commerce / Web",
    description:
      "A high-contrast commerce experience for a workwear label, combining editorial storytelling, fast product discovery, and a modular content system for seasonal drops.",
    role: "Art direction, web design, Shopify theme development",
    tech: "Shopify Liquid, CSS, JavaScript",
    visual: "thumb-atlas",
    link: "https://example.com/atlas-supply"
  },
  forma: {
    title: "Forma House",
    category: "Culture / Identity",
    description:
      "A brand and launch site for an independent cultural venue. The identity uses a simple circular mark, generous spacing, and an editorial rhythm that adapts across posters, tickets, and social content.",
    role: "Brand identity, visual system, responsive website",
    tech: "Figma, HTML, CSS, JavaScript",
    visual: "thumb-forma",
    link: "https://example.com/forma-house"
  },
  orbit: {
    title: "Orbit Studio",
    category: "AI / Interface",
    description:
      "An AI-assisted creative workspace designed for rapid concept generation, review, and version control. The interface keeps automation visible without overwhelming the creative process.",
    role: "Product design, interaction model, design system",
    tech: "Next.js, React, Tailwind, OpenAI API",
    visual: "thumb-orbit",
    link: "https://example.com/orbit-studio"
  },
  maru: {
    title: "Maru Rooms",
    category: "Hospitality / Brand",
    description:
      "A boutique hotel identity and booking experience built around quiet ritual, tactile materials, and a booking flow that feels more like a concierge conversation than a form.",
    role: "Brand strategy, identity, booking UX",
    tech: "Figma, Webflow, CMS",
    visual: "thumb-maru",
    link: "https://example.com/maru-rooms"
  },
  kin: {
    title: "Kin Health",
    category: "Health / App",
    description:
      "A patient support app for chronic-care check-ins, medication reminders, and practitioner messaging. The product balances warmth with clinical clarity.",
    role: "UX research, mobile UX, accessibility audit",
    tech: "React Native, Node.js, WCAG 2.2",
    visual: "thumb-kin",
    link: "https://example.com/kin-health"
  },
  sable: {
    title: "Sable Journal",
    category: "Editorial / Web",
    description:
      "A digital journal for long-form essays and archival research. The system prioritizes reading comfort, issue navigation, and a flexible template for contributors.",
    role: "Editorial design, frontend development, CMS architecture",
    tech: "Next.js, Sanity, CSS Modules",
    visual: "thumb-sable",
    link: "https://example.com/sable-journal"
  },
  field: {
    title: "Field Signal",
    category: "Climate / Data",
    description:
      "A data platform for environmental teams monitoring field sensors, alerts, and mitigation progress across distributed project sites.",
    role: "Dashboard UX, data visualization, design system",
    tech: "Vue, D3, Python API, Design Tokens",
    visual: "thumb-field",
    link: "https://example.com/field-signal"
  },
  northstar: {
    title: "Northstar Fleet",
    category: "Mobility / Platform",
    description:
      "An operations platform for electric vehicle fleets, pairing route intelligence, maintenance scheduling, and driver-facing updates in one unified workspace.",
    role: "Platform strategy, product design, prototype testing",
    tech: "React, GraphQL, Mapbox, Storybook",
    visual: "thumb-northstar",
    link: "https://example.com/northstar-fleet"
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
