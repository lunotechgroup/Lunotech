/**
 * Lunotech - Core Application Script
 * Optimized Architecture
 */

// ==========================================
// 1. Internationalization (Data)
// ==========================================
const I18N = {
    en: {
      _name: "English",
      home: "Home",
      about: "About",
      services: "Services",
      blog: "Blog",
      contact: "Contact Us",
      cta_text:"HAVE A PROJECT IN MIND?",
      developed:"Development by",
      credit_name:"Arash rasouly & Amir karimi",
      hero_title:"Innovation beyond the digital frontier",
      hero_description:"Your ideas and our technology unite to become a shining star in the digital universe.",
      header_services_title:"Services",
      blog_title:"Latest News",
      blog_btn:"View All",
      blog_read_btn:"Read More",
      about_section: {
          tagline: "Who We Are",
          title: "Architects of Digital Identity",
          description: "Lunotech is a digital design studio dedicated to building purposeful and integrated digital identities."
      },
      services_cards: [
        {
            title: "Brand & Visual Identity",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6"/><path d="m21 12-6-3-6 3-6-3"/><path d="m21 12-6 3-6-3-6 3"/><path d="m12 1 6 3-6 3-6-3z"/></svg>`,
            description: "We create a unique visual identity for your business.",
            details: {
                fullDescription: "Your visual identity is the first point of contact with a customer...",
                features: ["Brand Strategy", "Logo Design", "Color Palette", "Brand Guidelines"],
                applications: "Increased Recognition, Loyal Customers"
            }
        },
        {
            title: "Website Design & Development",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 7L9 3 5 7l4 4 4-4z"/><path d="m17 11 4 4-4 4-4-4 4-4z"/><path d="m8 12 4 4 6-6-4-4Z"/><path d="m16 8 3-3"/><path d="M9 21a6 6 0 0 0-6-6"/></svg>`,
            description: "We design responsive, fast, and user-friendly websites.",
            details: {
                fullDescription: "We go beyond beautiful visuals to prioritize UX and UI...",
                features: ["UI/UX Design", "Responsive Dev", "SEO Optimized", "E-commerce"],
                applications: "Sales Generation, 24/7 Availability"
            }
        },
        {
            title: "Intelligent Automation",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/><path d="M10 9a3 3 0 0 0 0 6"/><path d="M14 9a3 3 0 0 1 0 6"/></svg>`,
            description: "Automate your repetitive business processes with bots.",
            details: {
                fullDescription: "Your time is your most valuable asset. We build chatbots...",
                features: ["Telegram Bots", "Booking Systems", "CRM Integration"],
                applications: "Efficiency, Reduced Costs, 24/7 Support"
            }
        }
      ]
    },
    fa: {
      _name: "فارسی",
      home: "خانه",
      about: "درباره ما",
      services: "خدمات",
      blog: "بلاگ",
      contact: "تماس با ما",
      cta_text:"پروژه ای مد نظر دارید؟",
      developed:"توسعه توسط",
      credit_name:"آرش رسولی و امیر کریمی",
      hero_title:"نوآوری، فراتر از مرزهای دیجیتال",
      hero_description:"ایده‌های شما در کنار تخصص ما، ستاره‌ای روشن در آسمان دیجیتال خواهد شد.",
      header_services_title:"خدمات ما",
      blog_title:"آخرین اخبار",
      blog_btn:"مشاهده همه",
      blog_read_btn:"بیشتر بخوانید",
      about_section: {
          tagline: "ما که هستیم",
          title: "معماران هویت دیجیتال",
          description: "لونوتک یک گروه طراحی دیجیتال است که به ساخت و توسعه هویت‌های دیجیتال هدفمند اختصاص دارد."
      },
      services_cards: [
        {
            title: "طراحی هویت بصری",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6"/><path d="m21 12-6-3-6 3-6-3"/><path d="m21 12-6 3-6-3-6 3"/><path d="m12 1 6 3-6 3-6-3z"/></svg>`,
            description: "هویت بصری منحصربه‌فرد برای کسب‌وکار شما.",
            details: {
                fullDescription: "هویت بصری اولین نقطه تماس با مشتری است...",
                features: ["استراتژی برند", "طراحی لوگو", "پالت رنگی", "ست اداری"],
                applications: "جذب مشتری، ایجاد تمایز"
            }
        },
        {
            title: "طراحی سایت",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 7L9 3 5 7l4 4 4-4z"/><path d="m17 11 4 4-4 4-4-4 4-4z"/><path d="m8 12 4 4 6-6-4-4Z"/><path d="m16 8 3-3"/><path d="M9 21a6 6 0 0 0-6-6"/></svg>`,
            description: "وب‌سایت‌هایی واکنش‌گرا و سریع برای رشد شما.",
            details: {
                fullDescription: "ما فراتر از زیبایی، به تجربه کاربری اهمیت می‌دهیم...",
                features: ["رابط کاربری UI/UX", "ریسپانسیو", "سئو عالی", "فروشگاه اینترنتی"],
                applications: "فروش بیشتر، دسترسی دائمی"
            }
        },
        {
            title: "اتوماسیون و ربات",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/><path d="M10 9a3 3 0 0 0 0 6"/><path d="M14 9a3 3 0 0 1 0 6"/></svg>`,
            description: "هوشمندسازی فرآیندهای تکراری با ربات‌ها.",
            details: {
                fullDescription: "زمان شما ارزشمند است. با ربات‌های تلگرام و وب...",
                features: ["ربات تلگرام", "رزرو خودکار", "اتصال به CRM"],
                applications: "صرفه‌جویی در هزینه، پاسخگویی ۲۴ ساعته"
            }
        }
      ]
    }
  };
  
  // ==========================================
  // 2. Three.js Scene (Visuals)
  // ==========================================
  class LunarExplorer {
    constructor() {
      this.init();
    }
  
    init() {
      this.container = document.getElementById("canvas-container");
      if (!this.container) return;
  
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.set(0, 0, 6);
  
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize pixel ratio
      this.renderer.shadowMap.enabled = true;
      this.container.appendChild(this.renderer.domElement);
  
      // Loaders
      this.manager = new THREE.LoadingManager();
      this.manager.onLoad = () => this.onAssetsLoaded();
      this.manager.onProgress = (url, loaded, total) => {
        const bar = document.getElementById("loading-bar");
        if (bar) bar.style.width = `${(loaded / total) * 100}%`;
      };
      
      this.textureLoader = new THREE.TextureLoader(this.manager);
  
      this.createLights();
      this.createStars();
      this.loadObjects();
      
      this.animate = this.animate.bind(this);
      window.addEventListener('resize', () => this.onResize());
      
      this.animate();
    }
  
    createLights() {
      const ambient = new THREE.AmbientLight(0xffffff, 0.2);
      this.scene.add(ambient);
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(5, 5, 5);
      dirLight.castShadow = true;
      this.scene.add(dirLight);
    }
  
    createStars() {
      const geometry = new THREE.BufferGeometry();
      const count = 5000; // Optimized count
      const positions = new Float32Array(count * 3);
      for(let i=0; i<count*3; i++) {
        positions[i] = (Math.random() - 0.5) * 1000;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ size: 1, color: 0xffffff, transparent: true });
      this.stars = new THREE.Points(geometry, material);
      this.scene.add(this.stars);
    }
  
    loadObjects() {
      // Moon
      this.textureLoader.load(CONFIG.moonUrl, (tex) => {
        const geo = new THREE.SphereGeometry(2, 64, 64);
        const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8 });
        this.moon = new THREE.Mesh(geo, mat);
        this.moon.position.set(0, -3, -1);
        this.moon.scale.set(0, 0, 0); // Start hidden
        this.moon.castShadow = true;
        this.scene.add(this.moon);
      });
  
      // Mountain
      this.textureLoader.load(CONFIG.mountainUrl, (tex) => {
        const geo = new THREE.PlaneGeometry(1, 1);
        const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
        this.mountain = new THREE.Mesh(geo, mat);
        this.mountain.position.z = 2; // Closer to camera
        this.scene.add(this.mountain);
        this.onResize(); // Initial sizing
      });
    }
  
    onAssetsLoaded() {
      // Hide loading screen
      const screen = document.getElementById("loading-screen");
      if(screen) {
        screen.classList.add("hidden");
        setTimeout(() => screen.style.display = 'none', 500);
      }
      
      // Animate Moon Rise
      if(this.moon) {
        gsap.to(this.moon.scale, { x:0.765, y:0.765, z:0.765, duration: 4, ease: "power3.out" });
        gsap.to(this.moon.position, { y:0, duration: 4, ease: "power3.out" });
      }
    }
  
    onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
  
      // Cover logic for mountain
      if(this.mountain && this.mountain.material.map) {
          const img = this.mountain.material.map.image;
          if(!img) return;
          const imgRatio = img.width / img.height;
          const viewRatio = w / h;
          
          const vFOV = THREE.MathUtils.degToRad(this.camera.fov);
          // Calculate visible height at the mountain's z-depth (camera z=6, mountain z=2 => dist=4)
          const dist = 4; 
          const visibleHeight = 2 * Math.tan(vFOV / 2) * dist;
          const visibleWidth = visibleHeight * this.camera.aspect;
  
          if(viewRatio > imgRatio) {
              this.mountain.scale.set(visibleWidth, visibleWidth / imgRatio, 1);
          } else {
              this.mountain.scale.set(visibleHeight * imgRatio, visibleHeight, 1);
          }
          this.mountain.position.y = -visibleHeight/2;
      }
    }
  
    animate() {
      requestAnimationFrame(this.animate);
      if(this.stars) this.stars.rotation.y += 0.0002;
      if(this.moon) this.moon.rotation.y += 0.001;
      this.renderer.render(this.scene, this.camera);
    }
  }
  
  // ==========================================
  // 3. UI Manager (Lang, Modals, Marquee)
  // ==========================================
  class UIManager {
    constructor() {
      this.lang = localStorage.getItem("siteLang") || "en";
      this.setupLanguage();
      this.setupMarquee();
      this.setupMobileMenu();
      this.renderServices(); // Initial render
    }
  
    setupLanguage() {
      this.applyLanguage(this.lang);
  
      // Desktop & Mobile Dropdowns
      document.querySelectorAll(".dropdown-item, .mobile-dropdown-item").forEach(item => {
        item.addEventListener("click", (e) => {
          this.lang = e.target.dataset.lang;
          localStorage.setItem("siteLang", this.lang);
          this.applyLanguage(this.lang);
          
          // Close menus
          document.querySelector(".dropdown")?.classList.remove("active");
          document.querySelector(".mobile-dropdown")?.classList.remove("active");
        });
      });
  
      // Toggle logic
      document.querySelector(".dropdown-trigger")?.addEventListener("click", (e) => {
          e.stopPropagation();
          document.querySelector(".dropdown")?.classList.toggle("active");
      });
      document.addEventListener("click", () => {
          document.querySelector(".dropdown")?.classList.remove("active");
      });
    }
  
    applyLanguage(lang) {
      const isFa = lang === "fa";
      document.documentElement.lang = lang;
      document.documentElement.dir = isFa ? "rtl" : "ltr";
      document.body.classList.toggle("rtl", isFa);
  
      // Update Texts
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        // Handle nested keys like 'about_section.title'
        const val = key.split('.').reduce((o, i) => o?.[i], I18N[lang]); 
        if(val) el.textContent = val;
      });
  
      // Update Triggers
      document.querySelectorAll(".dropdown-trigger span, .mobile-dropdown-trigger span").forEach(el => {
          el.textContent = I18N[lang]._name;
      });
      
      // Update Service Cards (Re-render)
      this.renderServices();
    }
  
    setupMobileMenu() {
        const btn = document.querySelector(".menu-toggle");
        const close = document.querySelector(".mobile-close-btn");
        const menu = document.querySelector(".mobile-menu");
        const overlay = document.querySelector(".mobile-overlay");
  
        const toggle = () => {
            menu.classList.toggle("active");
            overlay.classList.toggle("active");
        };
  
        if(btn) btn.addEventListener("click", toggle);
        if(close) close.addEventListener("click", toggle);
        if(overlay) overlay.addEventListener("click", toggle);
    }
  
    setupMarquee() {
        const container = document.getElementById("marqueeContent");
        if(!container) return;
        const text = "ignite your digital dream by moonlight creativity";
        container.innerHTML = "";
        for(let i=0; i<8; i++) {
            const item = document.createElement("div");
            item.className = "marquee-item";
            item.innerHTML = `<span class="marquee-text" dir="ltr">${text}</span>`;
            container.appendChild(item);
        }
    }
  
    renderServices() {
        const grid = document.getElementById("servicesGrid");
        if(!grid) return;
        
        grid.innerHTML = "";
        const cards = I18N[this.lang].services_cards;
        
        cards.forEach(service => {
            const div = document.createElement("div");
            div.className = "service-card animate";
            div.innerHTML = `
                <div class="glowing-edge"></div>
                <div class="service-content">
                    <div class="service-icon">${service.icon}</div>
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-description">${service.description}</p>
                    <div class="learn-more">${this.lang === 'en' ? 'Learn More' : 'بیشتر بدانید'}</div>
                </div>
            `;
            div.addEventListener("click", () => this.openModal(service));
            grid.appendChild(div);
        });
        
        // Retrigger animations
        this.animateCards();
    }
  
    animateCards() {
        const cards = document.querySelectorAll('.service-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, idx) => {
                if(entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('animate'), idx * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        cards.forEach(c => observer.observe(c));
    }
  
    openModal(service) {
        const modal = document.getElementById("modalOverlay");
        const body = document.getElementById("modalBody");
        if(!modal || !body) return;
  
        body.innerHTML = `
            <div class="modal-header">
                <div class="modal-icon">${service.icon}</div>
                <h3 class="modal-title">${service.title}</h3>
                <p class="modal-description">${service.details.fullDescription}</p>
            </div>
            <div class="features-section">
                <h4>${this.lang==='fa'?'ویژگی‌ها':'Features'}</h4>
                <ul class="features-list">
                    ${service.details.features.map(f => `<li><div class="feature-bullet"></div>${f}</li>`).join('')}
                </ul>
            </div>
        `;
        
        modal.classList.add("active");
        
        // Close logic
        const close = () => modal.classList.remove("active");
        document.getElementById("closeBtn").onclick = close;
        modal.onclick = (e) => { if(e.target === modal) close(); };
    }
  }
  
  // ==========================================
  // Initialization
  // ==========================================
  document.addEventListener("DOMContentLoaded", () => {
    new LunarExplorer();
    new UIManager();
  });
