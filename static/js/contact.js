/* Lunotech/static/js/contact.js */

/**
 * ContactFormManager Class
 * Handles client-side validation, submission states, and visibility animations for the contact form.
 */
class ContactFormManager {
  constructor() {
    this.formContainer = document.querySelector('.contact-form-container');
    if (!this.formContainer) return;

    this.form = this.formContainer.querySelector('form');
    this.submitBtn = this.form.querySelector('.submit-btn');
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.revealContent();
  }

  /**
   * Reveals the contact form and info container by adding the 'is-visible' class.
   * This triggers the CSS transition to change opacity from 0 to 1.
   */
  revealContent() {
    setTimeout(() => {
      const elements = document.querySelectorAll('.contact-form-container, .contact-info-container');
      elements.forEach(el => {
        el.classList.add('is-visible');
      });
    }, 100);
  }

  bindEvents() {
    if (this.form) {
      // Intercept submit to show loading state and validate
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    // Basic validation
    const requiredFields = this.form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = "red"; // Simple visual cue
      } else {
        field.style.borderColor = "";
      }
    });

    if (!isValid) {
      e.preventDefault();
      alert("Please fill in all required fields.");
      return;
    }

    // If valid, show loading state
    if (this.submitBtn) {
      // Prevent double submission
      if (this.submitBtn.disabled) {
        e.preventDefault();
        return;
      }
      
      this.submitBtn.disabled = true;
      const originalText = this.submitBtn.textContent;
      
      this.submitBtn.innerHTML = `
        <span style="display: inline-block; animation: spin 1s linear infinite; margin-right: 5px;">⟳</span> Sending...
      `;
      
      // Fallback: Re-enable after 15s in case of network timeout/no-redirect
      setTimeout(() => {
        this.submitBtn.disabled = false;
        this.submitBtn.innerHTML = originalText;
      }, 15000);
    }
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new ContactFormManager();
});
