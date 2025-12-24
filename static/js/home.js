/* Lunotech/static/js/home.js */

/**
 * LunarExplorer Class
 * Handles the Three.js 3D hero scene including starfields, 
 * low-res to high-res texture upgrades, and the moonrise animation.
 */
class LunarExplorer {
  constructor() {
    this.container = document.getElementById("canvas-container");
    if (!this.container) return;

    // Data attributes provided by Django templates/index.html
    this.moonUrl = this.container.dataset.moonUrl;
    this.mountainUrl = this.container.dataset.mountainUrl;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.moon = null;
    this.stars = null;
    this.mountain = null;
    this.moonriseStarted = false;

    this.init();
  }

  init() {
    this.setupScene();
    this.createStarfield();
    this.setupLighting();
    this.loadAssets();
    this.animate();

    window.addEventListener("resize", () => this.onWindowResize());
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 6);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance cap
    
    this.container.appendChild(this.renderer.domElement);
  }

  createStarfield() {
    const starCount = 6000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      transparent: true,
      opacity: 0.8,
    });

    this.stars = new THREE.Points(geometry, material);
    this.scene.add(this.stars);
  }

  loadAssets() {
    const manager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(manager);

    manager.onLoad = () => {
      this.hideLoadingScreen();
      this.triggerMoonrise();
      this.upgradeToHighRes();
    };

    // Load low-res placeholders first for instant LCP
    const lowMoon = this.moonUrl.replace('.jpg', '_low.jpg');
    const lowMountain = this.mountainUrl.replace('.png', '_low.png');

    textureLoader.load(lowMoon, (tex) => this.createMoon(tex), undefined, () => {
      textureLoader.load(this.moonUrl, (tex) => this.createMoon(tex)); // Fallback
    });

    textureLoader.load(lowMountain, (tex) => this.createMountain(tex), undefined, () => {
      textureLoader.load(this.mountainUrl, (tex) => this.createMountain(tex)); // Fallback
    });
  }

  createMoon(texture) {
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.9 });
    this.moon = new THREE.Mesh(geometry, material);
    this.moon.position.set(0, -3, -1); // Start below horizon
    this.moon.scale.set(0, 0, 0);
    this.scene.add(this.moon);
  }

  createMountain(texture) {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.05 });
    this.mountain = new THREE.Mesh(geometry, material);
    this.mountain.position.z = 2; // Closer to camera
    this.scene.add(this.mountain);
    this.onWindowResize(); // Force initial scale
  }

  triggerMoonrise() {
    if (!this.moon || this.moonriseStarted) return;
    this.moonriseStarted = true;

    gsap.to(this.moon.scale, { x: 0.76, y: 0.76, z: 0.76, duration: 4, ease: "power2.out" });
    gsap.to(this.moon.position, { y: 0, z: 0, duration: 4, ease: "power2.out" });
  }

  upgradeToHighRes() {
    const loader = new THREE.TextureLoader();
    loader.load(this.moonUrl, (tex) => {
      if (this.moon) {
        this.moon.material.map = tex;
        this.moon.material.needsUpdate = true;
      }
    });
  }

  setupLighting() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    const sun = new THREE.DirectionalLight(0xffffff, 0.8);
    sun.position.set(5, 5, 5);
    this.scene.add(ambient, sun);
  }

  onWindowResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);

    if (this.mountain) {
      const scale = Math.max(w / 1920, h / 1080) * 2.2;
      this.mountain.scale.setScalar(scale);
      this.mountain.position.y = -h * 0.0012;
    }
  }

  hideLoadingScreen() {
    const loader = document.getElementById("loading-screen");
    if (loader) {
      loader.classList.add("hidden");
      setTimeout(() => loader.style.display = "none", 500);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    if (this.stars) this.stars.rotation.y += 0.0001;
    if (this.moon && this.moonriseStarted) this.moon.rotation.y += 0.001;

    this.renderer.render(this.scene, this.camera);
  }
}

// Initializing with performance consideration
document.addEventListener("DOMContentLoaded", () => {
  if (window.requestIdleCallback) {
    requestIdleCallback(() => new LunarExplorer());
  } else {
    setTimeout(() => new LunarExplorer(), 200);
  }
});