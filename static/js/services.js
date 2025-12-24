/* Lunotech/static/js/services.js */

/**
 * ServiceManager Class
 * Handles the rendering of Service Cards and the Modal Details.
 * Kept separate to keep the codebase modular.
 */
class ServiceManager {
  constructor() {
    this.grid = document.getElementById("servicesGrid");
    this.modalOverlay = document.getElementById("modalOverlay");
    this.modalContent = document.getElementById("modalContent");
    this.modalBody = document.getElementById("modalBody");
    this.closeBtn = document.getElementById("closeBtn");

    // Service Data (Refactored from original monolithic script)
    this.services = [
      {
        id: "identity",
        title_en: "Brand & Visual Identity",
        title_fa: "طراحی برند و هویت بصری",
        desc_en: "We create a unique visual identity for your business.",
        desc_fa: "ما یک هویت بصری منحصربه‌فرد برای کسب‌وکار شما خلق می‌کنیم.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m9-6l-6-3m-6 3l-6-3m18 3l-6 3m-6-3l-6 3m6-14l6 3m-6 3l-6-3"/></svg>`,
        details: {
          full_en: "Your visual identity is the first point of contact with a customer.",
          full_fa: "هویت بصری شما، اولین نقطه تماس با مشتری است.",
          features_en: ["Brand Strategy", "Logo Design", "Color Palette", "Stationery"],
          features_fa: ["استراتژی برند", "طراحی لوگو", "پالت رنگی", "ست اداری"]
        }
      },
      {
        id: "web",
        title_en: "Website Design & Development",
        title_fa: "طراحی و توسعه وب سایت",
        desc_en: "Responsive, fast, and user-friendly websites.",
        desc_fa: "وب‌سایت‌هایی واکنش‌گرا، سریع و کاربرپسند.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 7L9 3 5 7l4 4 4-4z"/><path d="m17 11 4 4-4 4-4-4 4-4z"/><path d="m8 12 4 4 6-6-4-4Z"/><path d="m16 8 3-3"/><path d="M9 21a6 6 0 0 0-6-6"/></svg>`,
        details: {
          full_en: "We design websites that convert visitors into customers.",
          full_fa: "ما وب‌سایت‌هایی طراحی می‌کنیم که بازدیدکنندگان را به مشتری تبدیل می‌کنند.",
          features_en: ["UI/UX Design", "Responsive Dev", "SEO Optimized", "E-commerce"],
          features_fa: ["طراحی UI/UX", "توسعه واکنش‌گرا", "بهینه برای سئو", "فروشگاه اینترنتی"]
        }
      },
      {
        id: "automation",
        title_en: "Intelligent Automation",
        title_fa: "اتوماسیون هوشمند",
        desc_en: "Automate repetitive processes with intelligent bots.",
        desc_fa: "فرآیندهای تکراری را با ربات‌های هوشمند خودکار کنید.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/><path d="M10 9a3 3 0 0 0 0 6"/><path d="M14 9a3 3 0 0 1 0 6"/></svg>`,
        details: {
          full_en: "Save time by automating customer support and data collection.",
          full_fa: "با خودکارسازی پشتیبانی و جمع‌آوری داده‌ها، در زمان صرفه‌جویی کنید.",
          features_en: ["Chatbots", "Telegram Bots", "Auto-Booking", "CRM Integration"],
          features_fa: ["چت‌بات", "ربات تلگرام", "رزرو خودکار", "اتصال به CRM"]
        }
      }
    ];

    if (this.grid) this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    this.grid.innerHTML = this.services.map(service => `
      <div class="service-card" data-id="${service.id}">
        <div class="glowing-edge"></div>
        <div class="service-content">
          <div class="service-icon">${service.icon}</div>
          <h3 class="service-title">
            <span class="lang-en">${service.title_en}</span>
            <span class="lang-fa">${service.title_fa}</span>
          </h3>
          <p class="service-description">
            <span class="lang-en">${service.desc_en}</span>
            <span class="lang-fa">${service.desc_fa}</span>
          </p>
          <div class="learn-more">
            <span class="lang-en">Learn More</span>
            <span class="lang-fa">بیشتر بدانید</span>
          </div>
        </div>
      </div>
    `).join("");
  }

  bindEvents() {
    this.grid.addEventListener("click", (e) => {
      const card = e.target.closest(".service-card");
      if (card) this.openModal(card.dataset.id);
    });

    this.closeBtn?.addEventListener("click", () => this.closeModal());
    this.modalOverlay?.addEventListener("click", (e) => {
      if (e.target === this.modalOverlay) this.closeModal();
    });
  }

  openModal(id) {
    const service = this.services.find(s => s.id === id);
    if (!service) return;

    this.modalBody.innerHTML = `
      <div class="modal-header">
        <div class="modal-icon">${service.icon}</div>
        <h3 class="modal-title">
          <span class="lang-en">${service.title_en}</span>
          <span class="lang-fa">${service.title_fa}</span>
        </h3>
      </div>
      <div class="modal-details">
        <p>
          <span class="lang-en">${service.details.full_en}</span>
          <span class="lang-fa">${service.details.full_fa}</span>
        </p>
        <ul>
          ${service.details.features_en.map((f, i) => `
            <li>
              <span class="lang-en">${f}</span>
              <span class="lang-fa">${service.details.features_fa[i]}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    this.modalOverlay.classList.add("active");
  }

  closeModal() {
    this.modalOverlay.classList.remove("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ServiceManager();
});