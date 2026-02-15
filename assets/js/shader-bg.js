// ================================================================
// Three.js Water-Plane Shader + Optional 3D Model Background
// ================================================================

import * as THREE from 'three';

(function () {
  'use strict';

  const container = document.getElementById('shaderBg');
  if (!container) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowEndDevice = Boolean(
    prefersReducedMotion ||
    window.innerWidth < 768 ||
    ((navigator.hardwareConcurrency || 8) <= 4) ||
    ((navigator.deviceMemory || 8) <= 4)
  );

  const CFG = {
    color1: '#2a5ad4',
    color2: '#000000',
    color3: '#8eaacf',
    uSpeed: 0.1,
    uStrength: 4.5,
    uDensity: 1.0,
    uAmplitude: 5.2,
    brightness: 0.55,
    fov: 40,
    cDistance: 4.6,
    cPolarAngle: 77,
    cAzimuthAngle: 206,
    rotationX: 45,
    rotationY: 0,
    rotationZ: 0,
  };

  /* =========================================================
     GLSL — Simplex 3D noise
     ========================================================= */
  const noiseGLSL = /* glsl */ `
    vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x,289.0); }
    vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159-0.85373472095314*r; }

    float snoise(vec3 v){
      const vec2 C=vec2(1.0/6.0,1.0/3.0);
      const vec4 D=vec4(0.0,0.5,1.0,2.0);
      vec3 i=floor(v+dot(v,C.yyy));
      vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz);
      vec3 l=1.0-g;
      vec3 i1=min(g.xyz,l.zxy);
      vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx;
      vec3 x2=x0-i2+C.yyy;
      vec3 x3=x0-D.yyy;
      i=mod(i,289.0);
      vec4 p=permute(permute(permute(
        i.z+vec4(0.0,i1.z,i2.z,1.0))
        +i.y+vec4(0.0,i1.y,i2.y,1.0))
        +i.x+vec4(0.0,i1.x,i2.x,1.0));
      float n_=1.0/7.0;
      vec3 ns=n_*D.wyz-D.xzx;
      vec4 j=p-49.0*floor(p*ns.z*ns.z);
      vec4 x_=floor(j*ns.z);
      vec4 y_=floor(j-7.0*x_);
      vec4 x=x_*ns.x+ns.yyyy;
      vec4 y=y_*ns.x+ns.yyyy;
      vec4 h=1.0-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy);
      vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.0+1.0;
      vec4 s1=floor(b1)*2.0+1.0;
      vec4 sh=-step(h,vec4(0.0));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
      vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x);
      vec3 p1=vec3(a0.zw,h.y);
      vec3 p2=vec3(a1.xy,h.z);
      vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
      vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
      m=m*m;
      return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }
  `;

  /* =========================================================
     Vertex Shader – dramatic displacement for silk-fold look
     ========================================================= */
  const vertexShader = /* glsl */ `
    ${noiseGLSL}

    uniform float uTime;
    uniform float uSpeed;
    uniform float uStrength;
    uniform float uDensity;
    uniform float uAmplitude;

    varying vec2 vUv;
    varying float vDisplacement;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPos;

    void main() {
      vUv = uv;
      float t = uTime * uSpeed;
      vec3 pos = position;

      // ---- Large-scale dramatic folds (low frequency, high amplitude) ----
      float freq = uDensity * 0.6;
      float amp = uStrength * uAmplitude * 0.12;

      // Primary fold — slow, sweeping
      float n1 = snoise(vec3(pos.x * freq + t * 0.8, pos.y * freq * 0.7 + t * 0.3, 0.0));
      // Secondary fold — cross direction
      float n2 = snoise(vec3(pos.x * freq * 0.8 - t * 0.5, pos.y * freq * 1.1 + t * 0.2, 1.7));
      // Detail layer — smaller ripples
      float n3 = snoise(vec3(pos.x * freq * 2.0 + t * 0.4, pos.y * freq * 2.0 - t * 0.3, 3.1));

      float displacement = (n1 * 0.6 + n2 * 0.3 + n3 * 0.1) * amp;
      vDisplacement = displacement;

      pos.z += displacement;

      // ---- Compute displaced normal via finite differences ----
      float e = 0.03;
      float dx1 = snoise(vec3((position.x + e) * freq + t * 0.8, position.y * freq * 0.7 + t * 0.3, 0.0));
      float dx2 = snoise(vec3((position.x + e) * freq * 0.8 - t * 0.5, position.y * freq * 1.1 + t * 0.2, 1.7));
      float dx3 = snoise(vec3((position.x + e) * freq * 2.0 + t * 0.4, position.y * freq * 2.0 - t * 0.3, 3.1));
      float dispDx = (dx1 * 0.6 + dx2 * 0.3 + dx3 * 0.1) * amp;

      float dy1 = snoise(vec3(position.x * freq + t * 0.8, (position.y + e) * freq * 0.7 + t * 0.3, 0.0));
      float dy2 = snoise(vec3(position.x * freq * 0.8 - t * 0.5, (position.y + e) * freq * 1.1 + t * 0.2, 1.7));
      float dy3 = snoise(vec3(position.x * freq * 2.0 + t * 0.4, (position.y + e) * freq * 2.0 - t * 0.3, 3.1));
      float dispDy = (dy1 * 0.6 + dy2 * 0.3 + dy3 * 0.1) * amp;

      vec3 tangent   = normalize(vec3(e, 0.0, dispDx - displacement));
      vec3 bitangent = normalize(vec3(0.0, e, dispDy - displacement));
      vec3 computedNormal = normalize(cross(tangent, bitangent));

      vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
      vWorldNormal = normalize((modelMatrix * vec4(computedNormal, 0.0)).xyz);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  /* =========================================================
     Fragment Shader – high contrast 3-color + strong lighting
     ========================================================= */
  const fragmentShader = /* glsl */ `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uBrightness;
    uniform vec3 uCameraPos;

    varying vec2 vUv;
    varying float vDisplacement;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPos;

    void main() {
      vec3 N = normalize(vWorldNormal);
      vec3 V = normalize(uCameraPos - vWorldPos);

      // ---- Color from displacement height ----
      // Map displacement to a 0-1 range with strong contrast
      float d = smoothstep(-1.8, 1.8, vDisplacement);
      // Push contrast harder
      d = smoothstep(0.1, 0.9, d);

      vec3 baseColor;
      if (d < 0.45) {
        // Black -> Blue
        baseColor = mix(uColor2, uColor1, d / 0.45);
      } else {
        // Blue -> White
        baseColor = mix(uColor1, uColor3, (d - 0.45) / 0.55);
      }

      // ---- 3D Lighting (Blinn-Phong) ----
      // Key light — from above-right
      vec3 lightDir1 = normalize(vec3(1.0, 1.5, 2.0));
      float diff1 = max(dot(N, lightDir1), 0.0);
      vec3 H1 = normalize(lightDir1 + V);
      float spec1 = pow(max(dot(N, H1), 0.0), 64.0);

      // Fill light — from left
      vec3 lightDir2 = normalize(vec3(-1.0, 0.5, 1.0));
      float diff2 = max(dot(N, lightDir2), 0.0);

      // Rim/back light
      vec3 lightDir3 = normalize(vec3(0.0, -0.5, -1.0));
      float diff3 = max(dot(N, lightDir3), 0.0);

      float ambient = 0.15;
      vec3 lighting = vec3(ambient);
      lighting += diff1 * 0.7 * vec3(1.0);
      lighting += diff2 * 0.25 * vec3(0.8, 0.85, 1.0);
      lighting += diff3 * 0.1 * vec3(0.6, 0.7, 1.0);

      // Controlled specular highlights
      vec3 specColor = vec3(0.7) * spec1 * 0.5;

      // Subtle fresnel
      float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.0);
      specColor += fresnel * 0.15 * uColor3;

      vec3 color = baseColor * lighting * uBrightness + specColor;

      // Darker tone mapping
      color = 1.0 - exp(-color * 0.9);
      color *= 0.75;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  /* =========================================================
     Scene Setup
     ========================================================= */
  const renderer = new THREE.WebGLRenderer({
    antialias: !lowEndDevice,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowEndDevice ? 1 : 1.6));
  renderer.setClearColor(new THREE.Color('#0a0e1a'));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0a0e1a');
  scene.fog = new THREE.FogExp2('#0a0e1a', lowEndDevice ? 0.14 : 0.09);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    CFG.fov,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  const polarRad = THREE.MathUtils.degToRad(CFG.cPolarAngle);
  const azimuthRad = THREE.MathUtils.degToRad(CFG.cAzimuthAngle);
  camera.position.set(
    CFG.cDistance * Math.sin(polarRad) * Math.sin(azimuthRad),
    CFG.cDistance * Math.cos(polarRad),
    CFG.cDistance * Math.sin(polarRad) * Math.cos(azimuthRad)
  );
  const baseCameraPos = camera.position.clone();
  camera.lookAt(0, 0, 0);

  // Large plane with adaptive subdivision
  const geometry = new THREE.PlaneGeometry(14, 14, lowEndDevice ? 140 : 300, lowEndDevice ? 140 : 300);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime:       { value: 0 },
      uSpeed:      { value: CFG.uSpeed },
      uStrength:   { value: CFG.uStrength },
      uDensity:    { value: CFG.uDensity },
      uAmplitude:  { value: CFG.uAmplitude },
      uColor1:     { value: new THREE.Color(CFG.color1) },
      uColor2:     { value: new THREE.Color(CFG.color2) },
      uColor3:     { value: new THREE.Color(CFG.color3) },
      uBrightness: { value: CFG.brightness },
      uCameraPos:  { value: camera.position.clone() },
    },
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = THREE.MathUtils.degToRad(CFG.rotationX);
  mesh.rotation.y = THREE.MathUtils.degToRad(CFG.rotationY);
  mesh.rotation.z = THREE.MathUtils.degToRad(CFG.rotationZ);
  mesh.renderOrder = 1;
  scene.add(mesh);

  // Lights for model + shader blend
  const hemi = new THREE.HemisphereLight(0xb9c8ff, 0x0a0e1a, lowEndDevice ? 0.28 : 0.38);
  scene.add(hemi);
  const keyLight = new THREE.DirectionalLight(0xffffff, lowEndDevice ? 0.45 : 0.6);
  keyLight.position.set(2.5, 3.2, 2.0);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0x7aa2ff, lowEndDevice ? 0.18 : 0.26);
  rimLight.position.set(-2.8, 1.6, -2.4);
  scene.add(rimLight);

  // Parallax + scroll state
  const parallaxTarget = new THREE.Vector2(0, 0);
  const parallaxCurrent = new THREE.Vector2(0, 0);

  if (!prefersReducedMotion) {
    window.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      parallaxTarget.set(nx, ny);
    }, { passive: true });

  }

  /* =========================================================
     Render Loop
     ========================================================= */
  let animId;
  const clock = new THREE.Clock();
  let running = false;

  function renderFrame(elapsed) {
    material.uniforms.uTime.value = elapsed;

    if (!prefersReducedMotion) {
      parallaxCurrent.lerp(parallaxTarget, 0.04);
      camera.position.x = baseCameraPos.x + parallaxCurrent.x * 0.18;
      camera.position.y = baseCameraPos.y - parallaxCurrent.y * 0.12;
      camera.lookAt(0, 0, 0);

      const t = elapsed;
      mesh.rotation.z = THREE.MathUtils.degToRad(CFG.rotationZ) + Math.sin(t * 0.08) * 0.04;
    }

    renderer.render(scene, camera);
  }

  function tick() {
    if (!running) return;
    animId = requestAnimationFrame(tick);
    renderFrame(clock.getElapsedTime());
  }

  function start() {
    if (running) return;
    running = true;
    clock.start();
    tick();
  }

  function stop() {
    running = false;
    cancelAnimationFrame(animId);
  }

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  // Resize
  function onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(onResize, 100);
  });

  // Reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    renderFrame(2);
    return;
  }

  start();
  console.log(`[shader-bg] Initialized (${lowEndDevice ? 'fallback' : 'full'} mode)`);
})();
