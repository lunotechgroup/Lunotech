/* Lunotech/static/js/blog_detail.js */

/**
 * BlogDetailManager Class
 * Manages the reading experience, specifically the sticky social share bar
 * and utility functions like "Copy Link".
 */
class BlogDetailManager {
  constructor() {
    this.shareBar = document.getElementById('social-share-bar');
    this.heroImage = document.getElementById('hero-image');
    this.footer = document.querySelector('.footer'); // Using class as in base.html
    this.copyBtn = document.getElementById('copy-link-btn');

    // State to track scroll position relative to key elements
    this.isPastHero = false;
    this.isBeforeFooter = true;

    this.init();
  }

  init() {
    this.setupCopyLink();
    
    // Only initialize scroll observers on desktop
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    if (desktopQuery.matches) {
      this.initScrollObservers();
    }

    // Re-check on resize
    desktopQuery.addEventListener('change', (e) => {
      if (e.matches) this.initScrollObservers();
      else this.disconnectObservers();
    });
  }

  setupCopyLink() {
    if (!this.copyBtn) return;
    
    this.copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Failed to copy:', err));
    });
  }

  /**
   * Sets up IntersectionObservers to toggle the share bar's visibility.
   * Logic: Show bar only when user is below the Hero Image AND above the Footer.
   */
  initScrollObservers() {
    if (!this.shareBar) return;

    // Observer 1: Watch the Hero Image
    if (this.heroImage) {
      this.heroObserver = new IntersectionObserver(([entry]) => {
        // We are "past" the hero when it is no longer intersecting the viewport
        this.isPastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        this.updateVisibility();
      }, { rootMargin: '0px 0px 0px 0px', threshold: 0 });
      
      this.heroObserver.observe(this.heroImage);
    } else {
      // If no hero image exists, we are always "past" it
      this.isPastHero = true;
      this.updateVisibility();
    }

    // Observer 2: Watch the Footer
    if (this.footer) {
      this.footerObserver = new IntersectionObserver(([entry]) => {
        // We are "before" the footer if it hasn't entered the viewport yet
        this.isBeforeFooter = !entry.isIntersecting; 
        this.updateVisibility();
      }, { rootMargin: '0px 0px 100px 0px', threshold: 0 }); // Pre-fetch margin
      
      this.footerObserver.observe(this.footer);
    }
  }

  updateVisibility() {
    if (this.isPastHero && this.isBeforeFooter) {
      this.shareBar.classList.add('visible');
    } else {
      this.shareBar.classList.remove('visible');
    }
  }

  disconnectObservers() {
    if (this.heroObserver) this.heroObserver.disconnect();
    if (this.footerObserver) this.footerObserver.disconnect();
    if (this.shareBar) this.shareBar.classList.remove('visible');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new BlogDetailManager();
});