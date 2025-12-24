/* Lunotech/static/js/blog.js */

/**
 * BlogManager Class
 * Orchestrates animations for blog cards and handles 
 * pagination (Load More) functionality.
 */
class BlogManager {
  constructor() {
    this.grid = document.getElementById("blogGrid");
    this.loadMoreBtn = document.getElementById("loadMoreBtn");
    
    if (!this.grid) return;

    this.init();
  }

  init() {
    this.initScrollAnimations();
    this.bindEvents();
  }

  /**
   * IntersectionObserver for scroll-driven animations.
   * Adds 'is-visible' class to cards as they enter the viewport.
   */
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Unobserve once animated to save CPU cycles
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Watch both standard cards and the "Grok" style posts from index.html
    document.querySelectorAll(".blog-card, .grok-blog-post").forEach((post) => {
      observer.observe(post);
    });
  }

  bindEvents() {
    // Handle "Load More" - Currently a placeholder for AJAX implementation
    if (this.loadMoreBtn) {
      this.loadMoreBtn.addEventListener("click", () => this.handleLoadMore());
    }

    // Delegation for share buttons
    this.grid.addEventListener("click", (e) => {
      const shareBtn = e.target.closest(".share-btn");
      if (shareBtn) {
        this.handleShare(shareBtn.dataset.id);
      }
    });
  }

  /**
   * Placeholder for Infinite Scroll / AJAX Pagination.
   * Since search is handled by Django, we keep this lightweight.
   */
  handleLoadMore() {
    console.log("Architect: Load more triggered. Ready for AJAX integration.");
    // UI Feedback
    if (this.loadMoreBtn) {
      this.loadMoreBtn.textContent = "Loading...";
      this.loadMoreBtn.disabled = true;
    }
  }

  /**
   * Basic Share Logic
   * In a production environment, this would open a modal or use Web Share API.
   */
  handleShare(postId) {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this post from Lunotech',
        url: window.location.origin + '/blog/' + postId // Simplified path
      }).catch(err => console.error("Share failed:", err));
    } else {
      // Fallback: Copy to clipboard
      const url = window.location.origin + '/blog/' + postId;
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new BlogManager();
});