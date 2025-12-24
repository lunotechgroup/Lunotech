/* Lunotech/static/js/script.js */

/**
 * GlobalUI Class
 * Handles global components: Navigation, Language Switching, and Marquee.
 */
class GlobalUI {
  constructor() {
    this.isMobileMenuOpen = false;
    // Persist language or default to 'en'
    this.lang = localStorage.getItem("siteLang") || "en";
    this.init();
  }

  init() {
    this.applyLanguage(this.lang);
    this.bindEvents();
    this.initMarquee();
  }

  /**
   * Applies language attributes and persists the choice.
   * Leverages the [data-lang] CSS strategy to prevent dual-language flicker.
   */
  applyLanguage(lang) {
    document.body.setAttribute('data-lang', lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
    
    // Handle RTL logo flip
    document.querySelectorAll(".logo-img").forEach(img => {
      img.style.transform = (lang === "fa") ? "scaleX(-1)" : "scaleX(1)";
    });

    localStorage.setItem("siteLang", lang);
    this.syncDropdownLabels(lang);
  }

  syncDropdownLabels(lang) {
    const label = lang === "fa" ? "فارسی" : "English";
    // Update labels in desktop and mobile triggers
    document.querySelectorAll(".dropdown-trigger, .mobile-dropdown-trigger span").forEach(el => {
      if (el.tagName === 'SPAN') {
        el.textContent = label;
      } else {
        // Keeps the globe icon if present in desktop trigger
        const icon = el.querySelector('svg:first-child')?.outerHTML || '';
        const chevron = el.querySelector('.chevron')?.outerHTML || '';
        el.innerHTML = `${icon} ${label} ${chevron}`;
      }
    });
  }

  bindEvents() {
    // Language Toggling
    document.querySelectorAll(".dropdown-item, .mobile-dropdown-item").forEach(item => {
      item.addEventListener("click", (e) => {
        // Check if the item is 'English' or 'فارسی'
        const isEn = e.target.textContent.toLowerCase().includes("en") || e.target.classList.contains("EN");
        this.applyLanguage(isEn ? "en" : "fa");
      });
    });

    // Mobile Menu Toggling
    const menuBtn = document.querySelector(".menu-toggle");
    const closeBtn = document.querySelector(".mobile-close-btn");
    const overlay = document.querySelector(".mobile-overlay");

    const toggle = () => this.toggleMobileMenu();
    menuBtn?.addEventListener("click", toggle);
    closeBtn?.addEventListener("click", toggle);
    overlay?.addEventListener("click", toggle);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    const menu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".mobile-overlay");
    const menuIcon = document.querySelector(".menu-icon");
    const closeIcon = document.querySelector(".close-icon");

    menu?.classList.toggle("active", this.isMobileMenuOpen);
    overlay?.classList.toggle("active", this.isMobileMenuOpen);
    menuIcon?.classList.toggle("hidden", this.isMobileMenuOpen);
    closeIcon?.classList.toggle("hidden", !this.isMobileMenuOpen);
  }

  initMarquee() {
    const marqueeContent = document.getElementById("marqueeContent");
    if (!marqueeContent) return;
    
    // Force LTR for English marquee text regardless of site direction
    marqueeContent.style.direction = "ltr";
    
    // Check if content needs duplicating for smooth loop
    if (marqueeContent.children.length > 0 && marqueeContent.children.length < 4) {
      const items = Array.from(marqueeContent.children);
      items.forEach(item => {
        const clone = item.cloneNode(true);
        marqueeContent.appendChild(clone);
      });
    }
  }
}

// Global Initialization
document.addEventListener("DOMContentLoaded", () => {
  window.lunotechUI = new GlobalUI();
});