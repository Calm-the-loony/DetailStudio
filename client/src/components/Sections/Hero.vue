<template>
  <section class="hero">
    <div class="hero__overlay">
      <div class="hero__content">
        <h1 class="hero__title">
          Вернем блеск<br />
          <span>вашего автомобиля</span>
        </h1>

        <p class="hero__subtitle">
          Профессиональный детейлинг, керамическое покрытие, полировка фар, химчистка салона и
          защита кузова. Работаем с премиальными брендами.
        </p>

        <div class="hero__buttons">
          <a href="#services" class="hero__cta-btn">
            <span>Наши услуги</span>
            <svg
              class="hero__cta-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>

          <a href="#contact" class="hero__cta-btn hero__cta-btn--outline">
            <span>Связаться с нами</span>
          </a>
        </div>
      </div>

      <div class="hero__visual">
        <div ref="modelContainer" class="hero__model-container"></div>
      </div>
    </div>

    <!-- Мягкие декоративные элементы -->
    <div class="hero__blob hero__blob--1"></div>
    <div class="hero__blob hero__blob--2"></div>
    <div class="hero__line hero__line--vertical"></div>
    <div class="hero__line hero__line--horizontal"></div>
  </section>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ref, onMounted, onBeforeUnmount } from "vue";

// Цвета
const COLORS = {
  primary: "#fbbf24",
  primaryDark: "#f59e0b",
  primaryLight: "#fcd34d",
  dark: "#0a0a0a",
  darkLight: "#1a1a1a",
  text: "#ffffff",
  yellow: "#FFD700",
  yellowLight: "#FFE55C",
  yellowDark: "#B8860B",
};

export default {
  name: "HeroSection",
  setup() {
    const modelContainer = ref(null);

    // Переменные Three.js
    let scene = null;
    let camera = null;
    let renderer = null;
    let model = null;
    let controls = null;
    let particles = null;
    let animationFrameId = null;
    let mixer = null;

    const initThree = () => {
      if (!modelContainer.value) return;

      scene = new THREE.Scene();
      scene.background = null;

      camera = new THREE.PerspectiveCamera(
        45,
        modelContainer.value.clientWidth / modelContainer.value.clientHeight,
        0.1,
        1000
      );
      camera.position.set(4, 1.5, 6);
      camera.lookAt(0, 0.5, 0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(modelContainer.value.clientWidth, modelContainer.value.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = false;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      modelContainer.value.appendChild(renderer.domElement);

      setupLights();

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2.0;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.maxPolarAngle = Math.PI / 2.2;
      controls.minPolarAngle = Math.PI / 3;
      controls.target.set(0, 0.5, 0);

      addStars();

      window.addEventListener("resize", handleResize);
    };

    const setupLights = () => {
      if (!scene) return;

      const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
      mainLight.position.set(2, 5, 5);
      scene.add(mainLight);

      const fillLightRight = new THREE.DirectionalLight(0x4466aa, 0.8);
      fillLightRight.position.set(3, 2, 2);
      scene.add(fillLightRight);

      const fillLightLeft = new THREE.DirectionalLight(0xffaa66, 0.8);
      fillLightLeft.position.set(-3, 2, 2);
      scene.add(fillLightLeft);

      const backLight = new THREE.PointLight(0x445566, 0.5);
      backLight.position.set(0, 1, -5);
      scene.add(backLight);

      const bottomLight = new THREE.PointLight(0x3366aa, 0.3);
      bottomLight.position.set(0, -2, 2);
      scene.add(bottomLight);

      const goldLight = new THREE.PointLight(COLORS.primary, 0.8);
      goldLight.position.set(2, 3, 3);
      scene.add(goldLight);

      const goldLight2 = new THREE.PointLight(COLORS.primaryLight, 0.5);
      goldLight2.position.set(-1, 2, 4);
      scene.add(goldLight2);

      const sparkLight1 = new THREE.PointLight(0xffffff, 0.4);
      sparkLight1.position.set(1, 2, 3);
      scene.add(sparkLight1);

      const sparkLight2 = new THREE.PointLight(0xffffff, 0.3);
      sparkLight2.position.set(-1.5, 1.5, 2.5);
      scene.add(sparkLight2);

      const planeGeometry = new THREE.CircleGeometry(8, 64);
      const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.3,
        metalness: 0.7,
        emissive: new THREE.Color(0x111111),
        emissiveIntensity: 0.1,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = -0.5;
      scene.add(plane);

      const gridHelper = new THREE.GridHelper(8, 20, COLORS.primary, 0x333333);
      gridHelper.position.y = -0.48;
      gridHelper.material.opacity = 0.15;
      gridHelper.material.transparent = true;
      scene.add(gridHelper);
    };

    const addStars = () => {
      if (!scene) return;

      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 800;
      const starsPositions = new Float32Array(starsCount * 3);

      for (let i = 0; i < starsCount * 3; i += 3) {
        const radius = 15;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        starsPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
        starsPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starsPositions[i + 2] = radius * Math.cos(phi);
      }

      starsGeometry.setAttribute("position", new THREE.BufferAttribute(starsPositions, 3));

      const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.05,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      });

      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);
    };

    const loadModel = () => {
      const loader = new GLTFLoader();

      loader.load(
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Lamborghini_Aventador/glTF/Lamborghini_Aventador.gltf",
        (gltf) => {
          model = gltf.scene.clone(true);

          model.scale.set(0.8, 0.8, 0.8);
          model.position.y = 0.2;
          model.rotation.y = -Math.PI / 4;

          model.traverse((node) => {
            if (node.isMesh) {
              if (Array.isArray(node.material)) {
                node.material = node.material.map((mat) => {
                  const newMat = mat.clone();

                  const isBody =
                    node.name.toLowerCase().includes("body") ||
                    node.name.toLowerCase().includes("car") ||
                    node.name.toLowerCase().includes("chassis");

                  if (isBody) {
                    newMat.color.setHex(0xffd700);
                    newMat.emissive.setHex(0x442200);
                    newMat.roughness = 0.2;
                    newMat.metalness = 0.8;
                    newMat.emissiveIntensity = 0.15;
                  } else if (
                    node.name.toLowerCase().includes("glass") ||
                    node.name.toLowerCase().includes("window")
                  ) {
                    newMat.transparent = true;
                    newMat.opacity = 0.3;
                    newMat.color.setHex(0x88aaff);
                    newMat.roughness = 0.1;
                    newMat.metalness = 0.9;
                  } else if (
                    node.name.toLowerCase().includes("wheel") ||
                    node.name.toLowerCase().includes("tire")
                  ) {
                    newMat.roughness = 0.7;
                    newMat.metalness = 0.3;
                  } else if (
                    node.name.toLowerCase().includes("light") ||
                    node.name.toLowerCase().includes("headlight")
                  ) {
                    newMat.emissive.setHex(0xffaa00);
                    newMat.emissiveIntensity = 0.5;
                    newMat.color.setHex(0xffffff);
                  }

                  return newMat;
                });
              } else {
                const newMat = node.material.clone();

                const isBody =
                  node.name.toLowerCase().includes("body") ||
                  node.name.toLowerCase().includes("car") ||
                  node.name.toLowerCase().includes("chassis");

                if (isBody) {
                  newMat.color.setHex(0xffd700);
                  newMat.emissive.setHex(0x442200);
                  newMat.roughness = 0.2;
                  newMat.metalness = 0.8;
                  newMat.emissiveIntensity = 0.15;
                } else if (
                  node.name.toLowerCase().includes("glass") ||
                  node.name.toLowerCase().includes("window")
                ) {
                  newMat.transparent = true;
                  newMat.opacity = 0.3;
                  newMat.color.setHex(0x88aaff);
                  newMat.roughness = 0.1;
                  newMat.metalness = 0.9;
                } else if (
                  node.name.toLowerCase().includes("wheel") ||
                  node.name.toLowerCase().includes("tire")
                ) {
                  newMat.roughness = 0.7;
                  newMat.metalness = 0.3;
                } else if (
                  node.name.toLowerCase().includes("light") ||
                  node.name.toLowerCase().includes("headlight")
                ) {
                  newMat.emissive.setHex(0xffaa00);
                  newMat.emissiveIntensity = 0.5;
                  newMat.color.setHex(0xffffff);
                }

                node.material = newMat;
              }
            }
          });

          if (scene) {
            scene.add(model);
            addGlowEffect();
            startAnimation();
          }
        },
        (xhr) => {
          console.log(`Загрузка модели: ${((xhr.loaded / xhr.total) * 100).toFixed(0)}%`);
        },
        (error) => {
          console.warn("Не удалось загрузить Lamborghini, загружаем запасную модель:", error);
          loadYellowCarFallback();
        }
      );
    };

    const loadYellowCarFallback = () => {
      const carGroup = new THREE.Group();

      const bodyGeo = new THREE.BoxGeometry(2.2, 0.6, 4.5);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: COLORS.yellow,
        roughness: 0.2,
        metalness: 0.8,
        emissive: new THREE.Color(0x442200),
        emissiveIntensity: 0.1,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 0.4;
      body.castShadow = true;
      body.receiveShadow = true;
      carGroup.add(body);

      const roofGeo = new THREE.BoxGeometry(1.4, 0.4, 2.0);
      const roofMat = new THREE.MeshStandardMaterial({
        color: COLORS.yellowLight,
        roughness: 0.3,
        metalness: 0.7,
      });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.set(0, 0.9, -0.3);
      roof.castShadow = true;
      roof.receiveShadow = true;
      carGroup.add(roof);

      const windshieldGeo = new THREE.BoxGeometry(1.3, 0.3, 0.8);
      const windshieldMat = new THREE.MeshStandardMaterial({
        color: 0x88aaff,
        transparent: true,
        opacity: 0.4,
        roughness: 0.1,
        metalness: 0.9,
      });
      const windshield = new THREE.Mesh(windshieldGeo, windshieldMat);
      windshield.position.set(0, 0.8, 0.8);
      windshield.castShadow = true;
      windshield.receiveShadow = true;
      carGroup.add(windshield);

      const hoodGeo = new THREE.BoxGeometry(1.8, 0.2, 1.2);
      const hoodMat = new THREE.MeshStandardMaterial({
        color: COLORS.yellow,
        roughness: 0.2,
        metalness: 0.9,
      });
      const hood = new THREE.Mesh(hoodGeo, hoodMat);
      hood.position.set(0, 0.7, 1.3);
      hood.castShadow = true;
      hood.receiveShadow = true;
      carGroup.add(hood);

      const headlightMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: COLORS.yellow,
        emissiveIntensity: 0.5,
      });

      const headlightLeft = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16), headlightMat);
      headlightLeft.position.set(-0.8, 0.5, 2.0);
      carGroup.add(headlightLeft);

      const headlightRight = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16), headlightMat);
      headlightRight.position.set(0.8, 0.5, 2.0);
      carGroup.add(headlightRight);

      const taillightMat = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0x440000,
        emissiveIntensity: 0.3,
      });

      const taillightLeft = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.1), taillightMat);
      taillightLeft.position.set(-0.9, 0.5, -2.0);
      carGroup.add(taillightLeft);

      const taillightRight = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.1), taillightMat);
      taillightRight.position.set(0.9, 0.5, -2.0);
      carGroup.add(taillightRight);

      const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32);
      const wheelMat = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.4,
        metalness: 0.6,
      });

      const rimGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.51, 16);
      const rimMat = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        roughness: 0.3,
        metalness: 0.9,
      });

      const positions = [
        [-1.0, 0.3, 1.4],
        [1.0, 0.3, 1.4],
        [-1.0, 0.3, -1.4],
        [1.0, 0.3, -1.4],
      ];

      positions.forEach((pos) => {
        const wheel = new THREE.Mesh(wheelGeo, wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(pos[0], pos[1], pos[2]);
        wheel.castShadow = true;
        wheel.receiveShadow = true;
        carGroup.add(wheel);

        const rim = new THREE.Mesh(rimGeo, rimMat);
        rim.rotation.z = Math.PI / 2;
        rim.position.set(pos[0], pos[1], pos[2]);
        rim.castShadow = true;
        rim.receiveShadow = true;
        carGroup.add(rim);
      });

      const stripeGeo = new THREE.BoxGeometry(0.2, 0.1, 3.5);
      const stripeMat = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0.3,
        metalness: 0.2,
      });

      const stripe1 = new THREE.Mesh(stripeGeo, stripeMat);
      stripe1.position.set(0.5, 0.7, 0);
      carGroup.add(stripe1);

      const stripe2 = new THREE.Mesh(stripeGeo, stripeMat);
      stripe2.position.set(-0.5, 0.7, 0);
      carGroup.add(stripe2);

      carGroup.position.y = 0;
      carGroup.rotation.y = -Math.PI / 4;
      carGroup.scale.set(0.9, 0.9, 0.9);

      model = carGroup;

      if (scene) {
        scene.add(carGroup);
        addGlowEffect();
        startAnimation();
      }
    };

    const addGlowEffect = () => {
      if (!scene) return;

      const glowGeometry = new THREE.SphereGeometry(2.8, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: COLORS.yellow,
        transparent: true,
        opacity: 0.06,
        side: THREE.BackSide,
      });
      const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
      glowSphere.position.y = 0.5;
      scene.add(glowSphere);

      const particleCount = 300;
      const particleGeo = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const radius = 2.5 + Math.random() * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + 0.5;
        particlePositions[i * 3 + 2] = radius * Math.cos(phi);

        const colorVal = 0.8 + Math.random() * 0.4;
        particleColors[i * 3] = colorVal;
        particleColors[i * 3 + 1] = colorVal * 0.9;
        particleColors[i * 3 + 2] = 0.2;
      }

      particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);
    };

    const startAnimation = () => {
      const animate = () => {
        if (!scene || !camera || !renderer) return;

        animationFrameId = requestAnimationFrame(animate);

        if (controls) {
          controls.update();
        }

        if (particles) {
          particles.rotation.y += 0.001;
        }

        if (model) {
          const time = Date.now() * 0.001;
          const pulseIntensity = Math.sin(time * 2) * 0.1 + 0.2;

          const updateMaterials = (obj) => {
            if (obj.material) {
              if (Array.isArray(obj.material)) {
                obj.material.forEach((mat) => {
                  if (mat.emissive) {
                    mat.emissiveIntensity = pulseIntensity;
                  }
                });
              } else if (obj.material.emissive) {
                obj.material.emissiveIntensity = pulseIntensity;
              }
            }
            if (obj.children && obj.children.length > 0) {
              obj.children.forEach((child) => updateMaterials(child));
            }
          };

          updateMaterials(model);
        }

        renderer.render(scene, camera);
      };

      animate();
    };

    const handleResize = () => {
      if (!modelContainer.value || !camera || !renderer) return;

      camera.aspect = modelContainer.value.clientWidth / modelContainer.value.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(modelContainer.value.clientWidth, modelContainer.value.clientHeight);
    };

    const cleanupThree = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("resize", handleResize);

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }

      if (scene) {
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }

      if (mixer) {
        mixer.stopAllAction();
      }

      scene = null;
      camera = null;
      renderer = null;
      model = null;
      controls = null;
      particles = null;
      mixer = null;
    };

    onMounted(() => {
      initThree();
      loadModel();
    });

    onBeforeUnmount(() => {
      cleanupThree();
    });

    return {
      modelContainer,
    };
  },
};
</script>

<style src="@/styles/Hero.scss" lang="scss" scoped></style>
