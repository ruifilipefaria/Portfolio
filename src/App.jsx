import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import * as THREE from "three";

const data = {
  name: "Rui Faria",
  title: "Video Editor",
  tagline: "Experience videos that elevate your brand and storytelling.",
    about: `Hey! Welcome to my portfolio. I have been editing videos for around 2 years. I focus on clean pacing, strong hooks, visual storytelling that increases your retention rate and makes ideas visually easier to understand. I specialise in educational, talking-head, documentary and commentary niches.`,
  skills: ["Davinci Resolve", "Motion Graphics", "Graphic Design"],
  projects: [
    {
      year: "2024",
      title: "Compass — Travel App",
      role: "Design & Frontend",
      description: "A minimal travel planning app with offline maps and AI-powered itinerary suggestions.",
      tags: ["React Native", "Figma", "AI"],
      link: "#",
    },
    {
      year: "2024",
      title: "Slate — Note-taking Tool",
      role: "Full-stack",
      description: "A distraction-free writing environment with beautiful typography and seamless sync.",
      tags: ["Next.js", "Supabase", "Tailwind"],
      link: "#",
    },
    {
      year: "2023",
      title: "Forma — Design System",
      role: "Design Lead",
      description: "An open-source design system used by 40+ product teams, featuring 200+ components.",
      tags: ["Design Systems", "Storybook", "TypeScript"],
      link: "#",
    },
    {
      year: "2023",
      title: "Bloom — Health Dashboard",
      role: "UI Design",
      description: "A wellness tracking dashboard visualising health data with calm, purposeful UI.",
      tags: ["Figma", "D3.js", "Data Viz"],
      link: "#",
    },
  ],
  creators: [
  { name: "La Crónica de Guns", handle: "@gunsaudionovelas2806", avatar: "https://yt3.googleusercontent.com/D1yYu3iTK8-IU5d5OX4Nx9YOxKd_-2e3fGCrgCIwePFpx9trfd8gJu6rl-RukO1JOlWhIuwxYg=s160-c-k-c0x00ffffff-no-rj", subs: "12.9K", channelUrl: "https://www.youtube.com/@gunsaudionovelas2806" },
  { name: "El Analista Loco", handle: "@ElAnalistaLoco", avatar: "https://yt3.googleusercontent.com/WssgymrNbmzP1xCVu7litWXSuDOutbxw_gYXsf8V-ebgzD5R0lMHimmK04NIgwiQgfiIeZcJyw=s160-c-k-c0x00ffffff-no-rj",  subs: "649",  channelUrl: "https://www.youtube.com/@ElAnalistaLoco" },
  { name: "PLACEHOLDER", handle: "@PLACEHOLDER", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY62vsraRt8wxfs4DT1uZjGGbbCZuN9rJ8Pw&s",  subs: "0",  channelUrl: "#" },
  { name: "PLACEHOLDER", handle: "@PLACEHOLDER", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY62vsraRt8wxfs4DT1uZjGGbbCZuN9rJ8Pw&s",  subs: "0",  channelUrl: "#" },
  { name: "PLACEHOLDER", handle: "@PLACEHOLDER", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY62vsraRt8wxfs4DT1uZjGGbbCZuN9rJ8Pw&s",  subs: "0",  channelUrl: "#" },
  { name: "PLACEHOLDER", handle: "@PLACEHOLDER", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY62vsraRt8wxfs4DT1uZjGGbbCZuN9rJ8Pw&s", subs: "0", channelUrl: "#" },
  { name: "PLACEHOLDER", handle: "@PLACEHOLDER", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY62vsraRt8wxfs4DT1uZjGGbbCZuN9rJ8Pw&s", subs: "0", channelUrl: "#" },
  { name: "PLACEHOLDER", handle: "@PLACEHOLDER", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY62vsraRt8wxfs4DT1uZjGGbbCZuN9rJ8Pw&s", subs: "0", channelUrl: "#" },
  { name: "PLACEHOLDER", handle: "@PLACEHOLDER", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY62vsraRt8wxfs4DT1uZjGGbbCZuN9rJ8Pw&s", subs: "0",  channelUrl: "#" },
  { name: "PLACEHOLDER", handle: "@PLACEHOLDER", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY62vsraRt8wxfs4DT1uZjGGbbCZuN9rJ8Pw&s", subs: "0", channelUrl: "#" },
  { name: "PLACEHOLDER", handle: "@PLACEHOLDER", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY62vsraRt8wxfs4DT1uZjGGbbCZuN9rJ8Pw&s", subs: "0",  channelUrl: "#" },
  { name: "PLACEHOLDER", handle: "@PLACEHOLDER", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY62vsraRt8wxfs4DT1uZjGGbbCZuN9rJ8Pw&s", subs: "0", channelUrl: "#" },
  ],
  videos: [
    { title: "An ordinary farmer...", category: "Commentary", year: "2026", duration: "9:53", views: "311", src: "https://www.youtube.com/watch?v=Tg_o6ZmCyRg&t=122s", thumb: "" },
    { title: "Por Que tu odio hacia Emilia Clarke...", category: "Commentary", year: "2026", duration: "12:50", views: "4", src: "https://www.youtube.com/watch?v=SHj42FFciTw", thumb: "" },
    { title: "Trading 212- Practice", category: "Highlight", year: "2026", duration: "0:14", views: "3", src: "https://youtu.be/G9FtJPgcxaQ", thumb: "" },
    { title: "CodeTheCure", category: "Trial", year: "2026", duration: "0:31", views: "", src: "https://youtu.be/_mD7-1aADTo", thumb: "" },
    { title: "Editing Ad", category: "Highlight", year: "2025", duration: "0:31", views: "8", src: "https://youtu.be/wLGQ85krcq8", thumb: "" },
    { title: "Coming Soon", category: "N/A", year: "2026", duration: "N/A", views: "N/A", src: "", thumb: "" },
    { title: "Coming Soon", category: "N/A", year: "2026", duration: "N/A", views: "N/A", src: "", thumb: "" },
    { title: "Coming Soon", category: "N/A", year: "2026", duration: "N/A", views: "N/A", src: "", thumb: "" },
    { title: "Coming Soon", category: "N/A", year: "2026", duration: "N/A", views: "N/A", src: "", thumb: "" },
    { title: "Coming Soon", category: "N/A", year: "2026", duration: "N/A", views: "N/A", src: "", thumb: "" },
    { title: "Coming Soon", category: "N/A", year: "2026", duration: "N/A", views: "N/A", src: "", thumb: "" },
    { title: "Coming Soon", category: "N/A", year: "2026", duration: "N/A", views: "N/A", src: "", thumb: "" },
    { title: "Coming Soon", category: "N/A", year: "2026", duration: "N/A", views: "N/A", src: "", thumb: "" },
    { title: "Coming Soon", category: "N/A", year: "2026", duration: "N/A", views: "N/A", src: "", thumb: "" },
    { title: "Coming Soon", category: "N/A", year: "2026", duration: "N/A", views: "N/A", src: "", thumb: "" },
  ],
  faq: [
    {
      q: "What is your typical turnaround time?",
      a: "Long-form videos: 5 business days / Short-form videos: 2 business days / Rush delivery available upon request / Turnaround begins once all required assets and confirmed payment have been received.",
    },
    {
      q: "How do I send my footage",
      a: "You can send it through Google Drive or any other cloud service. The format for assets and footage should be as follows; Folder (Video name) → Footage → Audio → Assets (logos, overlays, brand kit) → Music → Notes.txt.",
    },
    {
      q: "How many revisions are included?",
      a: "I offer one round of revision free of charge.",
    },
    {
      q: "What type of content do you edit?",
      a: "I specialise in long-form educational, documentary, commentary and talking-head content niches. However, I am also able to make short-form content for these niches.",
    },
    {
      q: "How does pricing and payment work?",
      a: "Payments are processed through Stripe, and if unavailable other payment methods such as PayPal, direct Bank transfers can also be used. As for pricing, it is project dependent and rush requests will usually incur an extra fee due to the urgency.",
    },
  ],
  testimonials: [
    { quote: "This is epic, honestly", channel: "La Crónica de Guns", subs: "12.9K" },
    { quote: "Perfect", channel: "El Analista Lo", subs: "649" },
    { quote: "Put your channel here!", channel: "Working on it...", subs: "—" },
    { quote: "Put your channel here!", channel: "Working on it...", subs: "—" },
    { quote: "Put your channel here!", channel: "Working on it...", subs: "—" },
    { quote: "Put your channel here!", channel: "Working on it...", subs: "—" },
  ],
  contact: {
    email: "rui@framedmotion.co.uk",
    links: [
        { label: "Twitter / X", href: "https://x.com/framedmotion" },
    ],
  },
};

const themes = {
  light: {
    bg: "#FAFAF8", bgAlt: "#F4F4F0", bgCard: "#ffffff",
    text: "#1a1a18", textMuted: "#666660", textSubtle: "#aaa8a0",
    border: "#e8e8e4", borderHover: "#c8c8c0",
    navBg: "rgba(250,250,248,0.92)",
    heroNum: "#eeeee8",
    skillBg: "#f0f0ec", skillColor: "#555550",
    scrollbarTrack: "#FAFAF8", scrollbarThumb: "#d0d0c8",
    shadowCard: "0 12px 40px rgba(0,0,0,0.07)",
  },
  dark: {
    bg: "#111110", bgAlt: "#181817", bgCard: "#1e1e1c",
    text: "#edede9", textMuted: "#a0a09a", textSubtle: "#555550",
    border: "#2a2a28", borderHover: "#44443e",
    navBg: "rgba(17,17,16,0.92)",
    heroNum: "#1e1e1c",
    skillBg: "#252523", skillColor: "#a0a09a",
    scrollbarTrack: "#111110", scrollbarThumb: "#333330",
    shadowCard: "0 12px 40px rgba(0,0,0,0.4)",
  },
};

// ── ColorBends (ReactBits) ────────────────────────────────────────────────────
const MAX_COLORS = 8;

const _frag = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-6.0 / exp(6.0 * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;
  } else {
    vec2 s = q;
    for (int k = 0; k < 3; ++k) {
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float m = mix(m0, m1, kMix);
      col[k] = 1.0 - exp(-6.0 / exp(6.0 * m));
    }
    a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
  }

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = (uTransparent > 0) ? col * a : col;
  gl_FragColor = vec4(rgb, a);
}
`;

const _vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

function ColorBends({
  style,
  rotation = 45,
  speed = 0.2,
  colors = [],
  transparent = true,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.1,
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const rafRef = useRef(null);
  const materialRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const rotationRef = useRef(rotation);
  const autoRotateRef = useRef(autoRotate);
  const pointerTargetRef = useRef(new THREE.Vector2(0, 0));
  const pointerCurrentRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uColorsArray = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3(0, 0, 0));

    const material = new THREE.ShaderMaterial({
      vertexShader: _vert,
      fragmentShader: _frag,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uRot: { value: new THREE.Vector2(1, 0) },
        uColorCount: { value: 0 },
        uColors: { value: uColorsArray },
        uTransparent: { value: transparent ? 1 : 0 },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: mouseInfluence },
        uParallax: { value: parallax },
        uNoise: { value: noise },
      },
      premultipliedAlpha: true,
      transparent: true,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance", alpha: true });
    rendererRef.current = renderer;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, transparent ? 0 : 1);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block;";
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();

    const handleResize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      material.uniforms.uCanvas.value.set(w, h);
    };
    handleResize();

    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(handleResize);
      ro.observe(container);
      resizeObserverRef.current = ro;
    } else {
      window.addEventListener("resize", handleResize);
    }

    const loop = () => {
      const dt = clock.getDelta();
      const elapsed = clock.elapsedTime;
      material.uniforms.uTime.value = elapsed;
      const deg = (rotationRef.current % 360) + autoRotateRef.current * elapsed;
      const rad = (deg * Math.PI) / 180;
      material.uniforms.uRot.value.set(Math.cos(rad), Math.sin(rad));
      const cur = pointerCurrentRef.current;
      const tgt = pointerTargetRef.current;
      cur.lerp(tgt, Math.min(1, dt * 8));
      material.uniforms.uPointer.value.copy(cur);
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      else window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement?.parentElement === container) container.removeChild(renderer.domElement);
    };
  }, [frequency, mouseInfluence, noise, parallax, scale, speed, transparent, warpStrength]);

  useEffect(() => {
    const material = materialRef.current;
    const renderer = rendererRef.current;
    if (!material) return;
    rotationRef.current = rotation;
    autoRotateRef.current = autoRotate;
    material.uniforms.uSpeed.value = speed;
    material.uniforms.uScale.value = scale;
    material.uniforms.uFrequency.value = frequency;
    material.uniforms.uWarpStrength.value = warpStrength;
    material.uniforms.uMouseInfluence.value = mouseInfluence;
    material.uniforms.uParallax.value = parallax;
    material.uniforms.uNoise.value = noise;

    const toVec3 = hex => {
      const h = hex.replace("#", "").trim();
      const v = h.length === 3
        ? [parseInt(h[0]+h[0],16), parseInt(h[1]+h[1],16), parseInt(h[2]+h[2],16)]
        : [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
      return new THREE.Vector3(v[0]/255, v[1]/255, v[2]/255);
    };

    const arr = (colors||[]).filter(Boolean).slice(0, MAX_COLORS).map(toVec3);
    for (let i = 0; i < MAX_COLORS; i++) {
      const vec = material.uniforms.uColors.value[i];
      if (i < arr.length) vec.copy(arr[i]); else vec.set(0,0,0);
    }
    material.uniforms.uColorCount.value = arr.length;
    material.uniforms.uTransparent.value = transparent ? 1 : 0;
    if (renderer) renderer.setClearColor(0x000000, transparent ? 0 : 1);
  }, [rotation, autoRotate, speed, scale, frequency, warpStrength, mouseInfluence, parallax, noise, colors, transparent]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onPointer = e => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
      const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);
      pointerTargetRef.current.set(x, y);
    };
    container.addEventListener("pointermove", onPointer);
    return () => container.removeEventListener("pointermove", onPointer);
  }, []);

  return (
    <div ref={containerRef} style={{
      position: "fixed", inset: 0, width: "100%", height: "100%",
      zIndex: 0, pointerEvents: "none", overflow: "hidden",
      ...style,
    }} />
  );
}
// ─────────────────────────────────────────────────────────────────────────────


function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function StarBorder({ as: Tag = "div", children, color = "#0086ff", speed = "6s", className = "", style = {}, href, onClick }) {
  const El = href ? "a" : Tag === "button" ? "button" : "div";
  return (
    <El
      href={href}
      onClick={onClick}
      className={`star-border-btn ${className}`}
      style={{
        "--star-color": color,
        "--star-speed": speed,
        ...style,
      }}
    >
      <span className="star-border-track" aria-hidden="true" />
      <span className="star-border-inner">{children}</span>
    </El>
  );
}

function GradientBtn({ href, onClick, children, style = {} }) {
  return (
    <StarBorder
      href={href}
      onClick={onClick}
      color="#0086ff"
      speed="5s"
      style={style}
    >
      {children}
    </StarBorder>
  );
}



function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = ["#5227FF", "#FF9FFC", "#B19EEF"],
  style = {},
  className = "",
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6
}) {
  const mountRef = useRef(null);
  const webglRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const rafRef = useRef(null);
  const intersectionObserverRef = useRef(null);
  const isVisibleRef = useRef(true);
  const resizeRafRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    function makePaletteTexture(stops) {
      let arr;
      if (Array.isArray(stops) && stops.length > 0) {
        arr = stops.length === 1 ? [stops[0], stops[0]] : stops;
      } else {
        arr = ["#ffffff", "#ffffff"];
      }
      const w = arr.length;
      const data = new Uint8Array(w * 4);
      for (let i = 0; i < w; i++) {
        const c = new THREE.Color(arr[i]);
        data[i * 4 + 0] = Math.round(c.r * 255);
        data[i * 4 + 1] = Math.round(c.g * 255);
        data[i * 4 + 2] = Math.round(c.b * 255);
        data[i * 4 + 3] = 255;
      }
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);
      tex.magFilter = THREE.LinearFilter;
      tex.minFilter = THREE.LinearFilter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      return tex;
    }

    const paletteTex = makePaletteTexture(colors);
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0);

    class CommonClass {
      constructor() { this.width=0;this.height=0;this.aspect=1;this.pixelRatio=1;this.fboWidth=null;this.fboHeight=null;this.time=0;this.delta=0;this.container=null;this.renderer=null;this.clock=null; }
      init(container) {
        this.container = container;
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        this.resize();
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(0x000000), 0);
        this.renderer.setPixelRatio(this.pixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.domElement.style.width = "100%";
        this.renderer.domElement.style.height = "100%";
        this.renderer.domElement.style.display = "block";
        this.clock = new THREE.Clock();
        this.clock.start();
      }
      resize() {
        if (!this.container) return;
        const rect = this.container.getBoundingClientRect();
        this.width = Math.max(1, Math.floor(rect.width));
        this.height = Math.max(1, Math.floor(rect.height));
        this.aspect = this.width / this.height;
        if (this.renderer) this.renderer.setSize(this.width, this.height, false);
      }
      update() { this.delta = this.clock.getDelta(); this.time += this.delta; }
    }
    const Common = new CommonClass();

    class MouseClass {
      constructor() {
        this.mouseMoved=false; this.coords=new THREE.Vector2(); this.coords_old=new THREE.Vector2(); this.diff=new THREE.Vector2();
        this.timer=null; this.container=null; this.docTarget=null; this.listenerTarget=null; this.isHoverInside=false;
        this.hasUserControl=false; this.isAutoActive=false; this.autoIntensity=2.0; this.takeoverActive=false;
        this.takeoverStartTime=0; this.takeoverDuration=0.25; this.takeoverFrom=new THREE.Vector2(); this.takeoverTo=new THREE.Vector2();
        this.onInteract=null;
        this._onMouseMove=this.onDocumentMouseMove.bind(this);
        this._onTouchStart=this.onDocumentTouchStart.bind(this);
        this._onTouchMove=this.onDocumentTouchMove.bind(this);
        this._onTouchEnd=this.onTouchEnd.bind(this);
        this._onDocumentLeave=this.onDocumentLeave.bind(this);
      }
      init(container) {
        this.container = container;
        this.docTarget = container.ownerDocument || null;
        const dv = (this.docTarget && this.docTarget.defaultView) || (typeof window !== "undefined" ? window : null);
        if (!dv) return;
        this.listenerTarget = dv;
        this.listenerTarget.addEventListener("mousemove", this._onMouseMove);
        this.listenerTarget.addEventListener("touchstart", this._onTouchStart, { passive: true });
        this.listenerTarget.addEventListener("touchmove", this._onTouchMove, { passive: true });
        this.listenerTarget.addEventListener("touchend", this._onTouchEnd);
        if (this.docTarget) this.docTarget.addEventListener("mouseleave", this._onDocumentLeave);
      }
      dispose() {
        if (this.listenerTarget) {
          this.listenerTarget.removeEventListener("mousemove", this._onMouseMove);
          this.listenerTarget.removeEventListener("touchstart", this._onTouchStart);
          this.listenerTarget.removeEventListener("touchmove", this._onTouchMove);
          this.listenerTarget.removeEventListener("touchend", this._onTouchEnd);
        }
        if (this.docTarget) this.docTarget.removeEventListener("mouseleave", this._onDocumentLeave);
        this.listenerTarget=null; this.docTarget=null; this.container=null;
      }
      isPointInside(cx,cy) {
        if (!this.container) return false;
        const r=this.container.getBoundingClientRect();
        if (r.width===0||r.height===0) return false;
        return cx>=r.left&&cx<=r.right&&cy>=r.top&&cy<=r.bottom;
      }
      updateHoverState(cx,cy) { this.isHoverInside=this.isPointInside(cx,cy); return this.isHoverInside; }
      setCoords(x,y) {
        if (!this.container) return;
        if (this.timer) window.clearTimeout(this.timer);
        const r=this.container.getBoundingClientRect();
        if (r.width===0||r.height===0) return;
        this.coords.set(((x-r.left)/r.width)*2-1, -(((y-r.top)/r.height)*2-1));
        this.mouseMoved=true;
        this.timer=window.setTimeout(()=>{ this.mouseMoved=false; },100);
      }
      setNormalized(nx,ny) { this.coords.set(nx,ny); this.mouseMoved=true; }
      onDocumentMouseMove(e) {
        if (!this.updateHoverState(e.clientX,e.clientY)) return;
        if (this.onInteract) this.onInteract();
        if (this.isAutoActive&&!this.hasUserControl&&!this.takeoverActive) {
          if (!this.container) return;
          const r=this.container.getBoundingClientRect();
          if (r.width===0||r.height===0) return;
          const nx=(e.clientX-r.left)/r.width; const ny=(e.clientY-r.top)/r.height;
          this.takeoverFrom.copy(this.coords); this.takeoverTo.set(nx*2-1,-(ny*2-1));
          this.takeoverStartTime=performance.now(); this.takeoverActive=true; this.hasUserControl=true; this.isAutoActive=false;
          return;
        }
        this.setCoords(e.clientX,e.clientY); this.hasUserControl=true;
      }
      onDocumentTouchStart(e) {
        if (e.touches.length!==1) return; const t=e.touches[0];
        if (!this.updateHoverState(t.clientX,t.clientY)) return;
        if (this.onInteract) this.onInteract();
        this.setCoords(t.clientX,t.clientY); this.hasUserControl=true;
      }
      onDocumentTouchMove(e) {
        if (e.touches.length!==1) return; const t=e.touches[0];
        if (!this.updateHoverState(t.clientX,t.clientY)) return;
        if (this.onInteract) this.onInteract();
        this.setCoords(t.clientX,t.clientY);
      }
      onTouchEnd() { this.isHoverInside=false; }
      onDocumentLeave() { this.isHoverInside=false; }
      update() {
        if (this.takeoverActive) {
          const t=(performance.now()-this.takeoverStartTime)/(this.takeoverDuration*1000);
          if (t>=1) { this.takeoverActive=false; this.coords.copy(this.takeoverTo); this.coords_old.copy(this.coords); this.diff.set(0,0); }
          else { const k=t*t*(3-2*t); this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo,k); }
        }
        this.diff.subVectors(this.coords,this.coords_old); this.coords_old.copy(this.coords);
        if (this.coords_old.x===0&&this.coords_old.y===0) this.diff.set(0,0);
        if (this.isAutoActive&&!this.takeoverActive) this.diff.multiplyScalar(this.autoIntensity);
      }
    }
    const Mouse = new MouseClass();

    class AutoDriver {
      constructor(mouse,manager,opts) {
        this.mouse=mouse; this.manager=manager; this.enabled=opts.enabled; this.speed=opts.speed;
        this.resumeDelay=opts.resumeDelay||3000; this.rampDurationMs=(opts.rampDuration||0)*1000;
        this.active=false; this.current=new THREE.Vector2(0,0); this.target=new THREE.Vector2();
        this.lastTime=performance.now(); this.activationTime=0; this.margin=0.2;
        this._tmpDir=new THREE.Vector2(); this.pickNewTarget();
      }
      pickNewTarget() { const r=Math.random; this.target.set((r()*2-1)*(1-this.margin),(r()*2-1)*(1-this.margin)); }
      forceStop() { this.active=false; this.mouse.isAutoActive=false; }
      update() {
        if (!this.enabled) return;
        const now=performance.now(); const idle=now-this.manager.lastUserInteraction;
        if (idle<this.resumeDelay) { if (this.active) this.forceStop(); return; }
        if (this.mouse.isHoverInside) { if (this.active) this.forceStop(); return; }
        if (!this.active) { this.active=true; this.current.copy(this.mouse.coords); this.lastTime=now; this.activationTime=now; }
        this.mouse.isAutoActive=true;
        let dtSec=(now-this.lastTime)/1000; this.lastTime=now;
        if (dtSec>0.2) dtSec=0.016;
        const dir=this._tmpDir.subVectors(this.target,this.current); const dist=dir.length();
        if (dist<0.01) { this.pickNewTarget(); return; }
        dir.normalize();
        let ramp=1;
        if (this.rampDurationMs>0) { const t=Math.min(1,(now-this.activationTime)/this.rampDurationMs); ramp=t*t*(3-2*t); }
        const step=this.speed*dtSec*ramp; const move=Math.min(step,dist);
        this.current.addScaledVector(dir,move); this.mouse.setNormalized(this.current.x,this.current.y);
      }
    }

    const face_vert=`attribute vec3 position;uniform vec2 px;uniform vec2 boundarySpace;varying vec2 uv;precision highp float;void main(){vec3 pos=position;vec2 scale=1.0-boundarySpace*2.0;pos.xy=pos.xy*scale;uv=vec2(0.5)+(pos.xy)*0.5;gl_Position=vec4(pos,1.0);}`;
    const line_vert=`attribute vec3 position;uniform vec2 px;precision highp float;varying vec2 uv;void main(){vec3 pos=position;uv=0.5+pos.xy*0.5;vec2 n=sign(pos.xy);pos.xy=abs(pos.xy)-px*1.0;pos.xy*=n;gl_Position=vec4(pos,1.0);}`;
    const mouse_vert=`precision highp float;attribute vec3 position;attribute vec2 uv;uniform vec2 center;uniform vec2 scale;uniform vec2 px;varying vec2 vUv;void main(){vec2 pos=position.xy*scale*2.0*px+center;vUv=uv;gl_Position=vec4(pos,0.0,1.0);}`;
    const advection_frag=`precision highp float;uniform sampler2D velocity;uniform float dt;uniform bool isBFECC;uniform vec2 fboSize;uniform vec2 px;varying vec2 uv;void main(){vec2 ratio=max(fboSize.x,fboSize.y)/fboSize;if(isBFECC==false){vec2 vel=texture2D(velocity,uv).xy;vec2 uv2=uv-vel*dt*ratio;vec2 newVel=texture2D(velocity,uv2).xy;gl_FragColor=vec4(newVel,0.0,0.0);}else{vec2 spot_new=uv;vec2 vel_old=texture2D(velocity,uv).xy;vec2 spot_old=spot_new-vel_old*dt*ratio;vec2 vel_new1=texture2D(velocity,spot_old).xy;vec2 spot_new2=spot_old+vel_new1*dt*ratio;vec2 error=spot_new2-spot_new;vec2 spot_new3=spot_new-error/2.0;vec2 vel_2=texture2D(velocity,spot_new3).xy;vec2 spot_old2=spot_new3-vel_2*dt*ratio;vec2 newVel2=texture2D(velocity,spot_old2).xy;gl_FragColor=vec4(newVel2,0.0,0.0);}}`;
    const color_frag=`precision highp float;uniform sampler2D velocity;uniform sampler2D palette;uniform vec4 bgColor;varying vec2 uv;void main(){vec2 vel=texture2D(velocity,uv).xy;float lenv=clamp(length(vel),0.0,1.0);vec3 c=texture2D(palette,vec2(lenv,0.5)).rgb;vec3 outRGB=mix(bgColor.rgb,c,lenv);float outA=mix(bgColor.a,1.0,lenv);gl_FragColor=vec4(outRGB,outA);}`;
    const divergence_frag=`precision highp float;uniform sampler2D velocity;uniform float dt;uniform vec2 px;varying vec2 uv;void main(){float x0=texture2D(velocity,uv-vec2(px.x,0.0)).x;float x1=texture2D(velocity,uv+vec2(px.x,0.0)).x;float y0=texture2D(velocity,uv-vec2(0.0,px.y)).y;float y1=texture2D(velocity,uv+vec2(0.0,px.y)).y;float divergence=(x1-x0+y1-y0)/2.0;gl_FragColor=vec4(divergence/dt);}`;
    const externalForce_frag=`precision highp float;uniform vec2 force;uniform vec2 center;uniform vec2 scale;uniform vec2 px;varying vec2 vUv;void main(){vec2 circle=(vUv-0.5)*2.0;float d=1.0-min(length(circle),1.0);d*=d;gl_FragColor=vec4(force*d,0.0,1.0);}`;
    const poisson_frag=`precision highp float;uniform sampler2D pressure;uniform sampler2D divergence;uniform vec2 px;varying vec2 uv;void main(){float p0=texture2D(pressure,uv+vec2(px.x*2.0,0.0)).r;float p1=texture2D(pressure,uv-vec2(px.x*2.0,0.0)).r;float p2=texture2D(pressure,uv+vec2(0.0,px.y*2.0)).r;float p3=texture2D(pressure,uv-vec2(0.0,px.y*2.0)).r;float div=texture2D(divergence,uv).r;float newP=(p0+p1+p2+p3)/4.0-div;gl_FragColor=vec4(newP);}`;
    const pressure_frag=`precision highp float;uniform sampler2D pressure;uniform sampler2D velocity;uniform vec2 px;uniform float dt;varying vec2 uv;void main(){float step=1.0;float p0=texture2D(pressure,uv+vec2(px.x*step,0.0)).r;float p1=texture2D(pressure,uv-vec2(px.x*step,0.0)).r;float p2=texture2D(pressure,uv+vec2(0.0,px.y*step)).r;float p3=texture2D(pressure,uv-vec2(0.0,px.y*step)).r;vec2 v=texture2D(velocity,uv).xy;vec2 gradP=vec2(p0-p1,p2-p3)*0.5;v=v-gradP*dt;gl_FragColor=vec4(v,0.0,1.0);}`;
    const viscous_frag=`precision highp float;uniform sampler2D velocity;uniform sampler2D velocity_new;uniform float v;uniform vec2 px;uniform float dt;varying vec2 uv;void main(){vec2 old=texture2D(velocity,uv).xy;vec2 new0=texture2D(velocity_new,uv+vec2(px.x*2.0,0.0)).xy;vec2 new1=texture2D(velocity_new,uv-vec2(px.x*2.0,0.0)).xy;vec2 new2=texture2D(velocity_new,uv+vec2(0.0,px.y*2.0)).xy;vec2 new3=texture2D(velocity_new,uv-vec2(0.0,px.y*2.0)).xy;vec2 newv=4.0*old+v*dt*(new0+new1+new2+new3);newv/=4.0*(1.0+v*dt);gl_FragColor=vec4(newv,0.0,0.0);}`;

    class ShaderPass {
      constructor(props) { this.props=props||{}; this.uniforms=this.props.material?.uniforms; this.scene=null; this.camera=null; this.material=null; this.geometry=null; this.plane=null; }
      init() {
        this.scene=new THREE.Scene(); this.camera=new THREE.Camera();
        if (this.uniforms) {
          this.material=new THREE.RawShaderMaterial(this.props.material);
          this.geometry=new THREE.PlaneGeometry(2.0,2.0);
          this.plane=new THREE.Mesh(this.geometry,this.material);
          this.scene.add(this.plane);
        }
      }
      update() { Common.renderer.setRenderTarget(this.props.output||null); Common.renderer.render(this.scene,this.camera); Common.renderer.setRenderTarget(null); }
    }

    class Advection extends ShaderPass {
      constructor(simProps) {
        super({ material:{ vertexShader:face_vert,fragmentShader:advection_frag,uniforms:{ boundarySpace:{value:simProps.cellScale},px:{value:simProps.cellScale},fboSize:{value:simProps.fboSize},velocity:{value:simProps.src.texture},dt:{value:simProps.dt},isBFECC:{value:true} } },output:simProps.dst });
        this.uniforms=this.props.material.uniforms; this.init();
      }
      init() { super.init(); const bg=new THREE.BufferGeometry(); bg.setAttribute("position",new THREE.BufferAttribute(new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]),3)); this.line=new THREE.LineSegments(bg,new THREE.RawShaderMaterial({vertexShader:line_vert,fragmentShader:advection_frag,uniforms:this.uniforms})); this.scene.add(this.line); }
      update({dt,isBounce,BFECC}) { this.uniforms.dt.value=dt; this.line.visible=isBounce; this.uniforms.isBFECC.value=BFECC; super.update(); }
    }

    class ExternalForce extends ShaderPass {
      constructor(simProps) { super({output:simProps.dst}); this._init(simProps); }
      _init(simProps) {
        super.init();
        const m=new THREE.RawShaderMaterial({vertexShader:mouse_vert,fragmentShader:externalForce_frag,blending:THREE.AdditiveBlending,depthWrite:false,uniforms:{px:{value:simProps.cellScale},force:{value:new THREE.Vector2()},center:{value:new THREE.Vector2()},scale:{value:new THREE.Vector2(simProps.cursor_size,simProps.cursor_size)}}});
        this.mouse=new THREE.Mesh(new THREE.PlaneGeometry(1,1),m); this.scene.add(this.mouse);
      }
      update(props) {
        const u=this.mouse.material.uniforms;
        u.force.value.set((Mouse.diff.x/2)*props.mouse_force,(Mouse.diff.y/2)*props.mouse_force);
        const sx=props.cursor_size*props.cellScale.x; const sy=props.cursor_size*props.cellScale.y;
        u.center.value.set(Math.min(Math.max(Mouse.coords.x,-1+sx+props.cellScale.x*2),1-sx-props.cellScale.x*2),Math.min(Math.max(Mouse.coords.y,-1+sy+props.cellScale.y*2),1-sy-props.cellScale.y*2));
        u.scale.value.set(props.cursor_size,props.cursor_size); super.update();
      }
    }

    class Viscous extends ShaderPass {
      constructor(simProps) {
        super({ material:{vertexShader:face_vert,fragmentShader:viscous_frag,uniforms:{boundarySpace:{value:simProps.boundarySpace},velocity:{value:simProps.src.texture},velocity_new:{value:simProps.dst_.texture},v:{value:simProps.viscous},px:{value:simProps.cellScale},dt:{value:simProps.dt}}},output:simProps.dst,output0:simProps.dst_,output1:simProps.dst });
        this.init();
      }
      update({viscous,iterations,dt}) {
        this.uniforms.v.value=viscous;
        let fi,fo;
        for (let i=0;i<iterations;i++) { if(i%2===0){fi=this.props.output0;fo=this.props.output1;}else{fi=this.props.output1;fo=this.props.output0;} this.uniforms.velocity_new.value=fi.texture; this.props.output=fo; this.uniforms.dt.value=dt; super.update(); }
        return fo;
      }
    }

    class Divergence extends ShaderPass {
      constructor(simProps) { super({material:{vertexShader:face_vert,fragmentShader:divergence_frag,uniforms:{boundarySpace:{value:simProps.boundarySpace},velocity:{value:simProps.src.texture},px:{value:simProps.cellScale},dt:{value:simProps.dt}}},output:simProps.dst}); this.init(); }
      update({vel}) { this.uniforms.velocity.value=vel.texture; super.update(); }
    }

    class Poisson extends ShaderPass {
      constructor(simProps) { super({material:{vertexShader:face_vert,fragmentShader:poisson_frag,uniforms:{boundarySpace:{value:simProps.boundarySpace},pressure:{value:simProps.dst_.texture},divergence:{value:simProps.src.texture},px:{value:simProps.cellScale}}},output:simProps.dst,output0:simProps.dst_,output1:simProps.dst}); this.init(); }
      update({iterations}) {
        let pi,po;
        for (let i=0;i<iterations;i++) { if(i%2===0){pi=this.props.output0;po=this.props.output1;}else{pi=this.props.output1;po=this.props.output0;} this.uniforms.pressure.value=pi.texture; this.props.output=po; super.update(); }
        return po;
      }
    }

    class Pressure extends ShaderPass {
      constructor(simProps) { super({material:{vertexShader:face_vert,fragmentShader:pressure_frag,uniforms:{boundarySpace:{value:simProps.boundarySpace},pressure:{value:simProps.src_p.texture},velocity:{value:simProps.src_v.texture},px:{value:simProps.cellScale},dt:{value:simProps.dt}}},output:simProps.dst}); this.init(); }
      update({vel,pressure}) { this.uniforms.velocity.value=vel.texture; this.uniforms.pressure.value=pressure.texture; super.update(); }
    }

    class Simulation {
      constructor(options) {
        this.options={iterations_poisson:32,iterations_viscous:32,mouse_force:20,resolution:0.5,cursor_size:100,viscous:30,isBounce:false,dt:0.014,isViscous:false,BFECC:true,...options};
        this.fbos={vel_0:null,vel_1:null,vel_viscous0:null,vel_viscous1:null,div:null,pressure_0:null,pressure_1:null};
        this.fboSize=new THREE.Vector2(); this.cellScale=new THREE.Vector2(); this.boundarySpace=new THREE.Vector2();
        this.init();
      }
      init() { this.calcSize(); this.createAllFBO(); this.createShaderPass(); }
      getFloatType() { return /(iPad|iPhone|iPod)/i.test(navigator.userAgent)?THREE.HalfFloatType:THREE.FloatType; }
      createAllFBO() {
        const type=this.getFloatType(); const opts={type,depthBuffer:false,stencilBuffer:false,minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,wrapS:THREE.ClampToEdgeWrapping,wrapT:THREE.ClampToEdgeWrapping};
        for (let k in this.fbos) this.fbos[k]=new THREE.WebGLRenderTarget(this.fboSize.x,this.fboSize.y,opts);
      }
      createShaderPass() {
        this.advection=new Advection({cellScale:this.cellScale,fboSize:this.fboSize,dt:this.options.dt,src:this.fbos.vel_0,dst:this.fbos.vel_1});
        this.externalForce=new ExternalForce({cellScale:this.cellScale,cursor_size:this.options.cursor_size,dst:this.fbos.vel_1});
        this.viscous=new Viscous({cellScale:this.cellScale,boundarySpace:this.boundarySpace,viscous:this.options.viscous,src:this.fbos.vel_1,dst:this.fbos.vel_viscous1,dst_:this.fbos.vel_viscous0,dt:this.options.dt});
        this.divergence=new Divergence({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.vel_viscous0,dst:this.fbos.div,dt:this.options.dt});
        this.poisson=new Poisson({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src:this.fbos.div,dst:this.fbos.pressure_1,dst_:this.fbos.pressure_0});
        this.pressure=new Pressure({cellScale:this.cellScale,boundarySpace:this.boundarySpace,src_p:this.fbos.pressure_0,src_v:this.fbos.vel_viscous0,dst:this.fbos.vel_0,dt:this.options.dt});
      }
      calcSize() {
        const w=Math.max(1,Math.round(this.options.resolution*Common.width)); const h=Math.max(1,Math.round(this.options.resolution*Common.height));
        this.cellScale.set(1/w,1/h); this.fboSize.set(w,h);
      }
      resize() { this.calcSize(); for (let k in this.fbos) this.fbos[k].setSize(this.fboSize.x,this.fboSize.y); }
      update() {
        this.boundarySpace[this.options.isBounce?"set":"copy"](this.options.isBounce?new THREE.Vector2():this.cellScale);
        this.advection.update({dt:this.options.dt,isBounce:this.options.isBounce,BFECC:this.options.BFECC});
        this.externalForce.update({cursor_size:this.options.cursor_size,mouse_force:this.options.mouse_force,cellScale:this.cellScale});
        let vel=this.fbos.vel_1;
        if (this.options.isViscous) vel=this.viscous.update({viscous:this.options.viscous,iterations:this.options.iterations_viscous,dt:this.options.dt});
        this.divergence.update({vel});
        const pressure=this.poisson.update({iterations:this.options.iterations_poisson});
        this.pressure.update({vel,pressure});
      }
    }

    class Output {
      constructor() { this.init(); }
      init() {
        this.simulation=new Simulation();
        this.scene=new THREE.Scene(); this.camera=new THREE.Camera();
        this.output=new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.RawShaderMaterial({vertexShader:face_vert,fragmentShader:color_frag,transparent:true,depthWrite:false,uniforms:{velocity:{value:this.simulation.fbos.vel_0.texture},boundarySpace:{value:new THREE.Vector2()},palette:{value:paletteTex},bgColor:{value:bgVec4}}}));
        this.scene.add(this.output);
      }
      resize() { this.simulation.resize(); }
      render() { Common.renderer.setRenderTarget(null); Common.renderer.render(this.scene,this.camera); }
      update() { this.simulation.update(); this.render(); }
    }

    class WebGLManager {
      constructor(props) {
        this.props=props; Common.init(props.$wrapper); Mouse.init(props.$wrapper);
        Mouse.autoIntensity=props.autoIntensity; Mouse.takeoverDuration=props.takeoverDuration;
        this.lastUserInteraction=performance.now();
        Mouse.onInteract=()=>{ this.lastUserInteraction=performance.now(); if(this.autoDriver) this.autoDriver.forceStop(); };
        this.autoDriver=new AutoDriver(Mouse,this,{enabled:props.autoDemo,speed:props.autoSpeed,resumeDelay:props.autoResumeDelay,rampDuration:props.autoRampDuration});
        this.init(); this._loop=this.loop.bind(this); this._resize=this.resize.bind(this);
        window.addEventListener("resize",this._resize);
        this._onVisibility=()=>{ if(document.hidden){this.pause();}else if(isVisibleRef.current){this.start();} };
        document.addEventListener("visibilitychange",this._onVisibility);
        this.running=false;
      }
      init() { this.props.$wrapper.prepend(Common.renderer.domElement); this.output=new Output(); }
      resize() { Common.resize(); this.output.resize(); }
      render() { if(this.autoDriver) this.autoDriver.update(); Mouse.update(); Common.update(); this.output.update(); }
      loop() { if(!this.running) return; this.render(); rafRef.current=requestAnimationFrame(this._loop); }
      start() { if(this.running) return; this.running=true; this._loop(); }
      pause() { this.running=false; if(rafRef.current){cancelAnimationFrame(rafRef.current);rafRef.current=null;} }
      dispose() {
        try { window.removeEventListener("resize",this._resize); document.removeEventListener("visibilitychange",this._onVisibility); Mouse.dispose(); if(Common.renderer){const c=Common.renderer.domElement;if(c&&c.parentNode)c.parentNode.removeChild(c);Common.renderer.dispose();} } catch(e){}
      }
    }

    const container=mountRef.current;
    container.style.position=container.style.position||"relative";
    container.style.overflow=container.style.overflow||"hidden";

    const webgl=new WebGLManager({$wrapper:container,autoDemo,autoSpeed,autoIntensity,takeoverDuration,autoResumeDelay,autoRampDuration});
    webglRef.current=webgl;

    const applyOpts=()=>{
      if (!webglRef.current) return;
      const sim=webglRef.current.output?.simulation; if(!sim) return;
      const prevRes=sim.options.resolution;
      Object.assign(sim.options,{mouse_force:mouseForce,cursor_size:cursorSize,isViscous,viscous,iterations_viscous:iterationsViscous,iterations_poisson:iterationsPoisson,dt,BFECC,resolution,isBounce});
      if (resolution!==prevRes) sim.resize();
    };
    applyOpts(); webgl.start();

    const io=new IntersectionObserver(entries=>{
      const v=entries[0].isIntersecting&&entries[0].intersectionRatio>0;
      isVisibleRef.current=v;
      if (!webglRef.current) return;
      if (v&&!document.hidden) webglRef.current.start(); else webglRef.current.pause();
    },{threshold:[0,0.01,0.1]});
    io.observe(container); intersectionObserverRef.current=io;

    const ro=new ResizeObserver(()=>{
      if (!webglRef.current) return;
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
      resizeRafRef.current=requestAnimationFrame(()=>{ if(webglRef.current) webglRef.current.resize(); });
    });
    ro.observe(container); resizeObserverRef.current=ro;

    return ()=>{
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try { resizeObserverRef.current?.disconnect(); } catch(e){}
      try { intersectionObserverRef.current?.disconnect(); } catch(e){}
      if (webglRef.current) { webglRef.current.dispose(); webglRef.current=null; }
    };
  }, [BFECC,cursorSize,dt,isBounce,isViscous,iterationsPoisson,iterationsViscous,mouseForce,resolution,viscous,colors,autoDemo,autoSpeed,autoIntensity,takeoverDuration,autoResumeDelay,autoRampDuration]);

  useEffect(() => {
    const webgl=webglRef.current; if(!webgl) return;
    const sim=webgl.output?.simulation; if(!sim) return;
    const prevRes=sim.options.resolution;
    Object.assign(sim.options,{mouse_force:mouseForce,cursor_size:cursorSize,isViscous,viscous,iterations_viscous:iterationsViscous,iterations_poisson:iterationsPoisson,dt,BFECC,resolution,isBounce});
    if (webgl.autoDriver) { webgl.autoDriver.enabled=autoDemo; webgl.autoDriver.speed=autoSpeed; webgl.autoDriver.resumeDelay=autoResumeDelay; webgl.autoDriver.rampDurationMs=autoRampDuration*1000; if(webgl.autoDriver.mouse){webgl.autoDriver.mouse.autoIntensity=autoIntensity;webgl.autoDriver.mouse.takeoverDuration=takeoverDuration;} }
    if (resolution!==prevRes) sim.resize();
  }, [mouseForce,cursorSize,isViscous,viscous,iterationsViscous,iterationsPoisson,dt,BFECC,resolution,isBounce,autoDemo,autoSpeed,autoIntensity,takeoverDuration,autoResumeDelay,autoRampDuration]);

  return (
    <div
      ref={mountRef}
      className={`liquid-ether-container ${className||""}`}
      style={{ position:"absolute",inset:0,width:"100%",height:"100%",overflow:"hidden",...style }}
    />
  );
}

function SpotlightCard({ children, className = "", spotlightColor = "rgba(255,255,255,0.12)", style = {} }) {
  const divRef = useRef(null);
  const handleMouseMove = e => {
    const rect = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    divRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
    divRef.current.style.setProperty("--spotlight-opacity", "1");
  };
  const handleMouseLeave = () => {
    divRef.current.style.setProperty("--spotlight-opacity", "0");
  };
  return (
    <div ref={divRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`card-spotlight ${className}`} style={style}>
      {children}
    </div>
  );
}

function FaqItem({ q, a, t, dark }) {
  const [open, setOpen] = useState(false);
  const spotlightColor = dark ? "rgba(100,160,255,0.1)" : "rgba(0,100,255,0.06)";
  const glowRgb = dark ? "100,160,255" : "80,120,220";
  return (
    <SpotlightCard spotlightColor={spotlightColor} style={{ "--stroke-glow-rgb": glowRgb, borderBottom: `1px solid ${t.border}` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "1.5rem 1.5rem", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem",
        }}
      >
        <span style={{ fontFamily: "'Lora', serif", fontSize: "1.05rem", fontWeight: 400, color: t.text, lineHeight: 1.4 }}>{q}</span>
        <span style={{
          flexShrink: 0, width: "26px", height: "26px", borderRadius: "50%",
          border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center",
          color: t.textSubtle, fontSize: "1.1rem", fontFamily: "'DM Sans', sans-serif",
          transition: "transform 0.35s ease, border-color 0.3s",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}>+</span>
      </button>
      <div style={{
        overflow: "hidden",
        maxHeight: open ? "300px" : "0",
        opacity: open ? 1 : 0,
        transition: "max-height 0.4s ease, opacity 0.3s ease",
      }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.92rem", color: t.textMuted, lineHeight: 1.75, padding: "0 1.5rem 1.5rem" }}>{a}</p>
      </div>
    </SpotlightCard>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function getYouTubeThumbnail(src) {
  if (!src) return "";
  const shortMatch = src.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (shortMatch) return `https://img.youtube.com/vi/${shortMatch[1]}/hqdefault.jpg`;
  const watchMatch = src.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (watchMatch) return `https://img.youtube.com/vi/${watchMatch[1]}/hqdefault.jpg`;
  return "";
}

function getYouTubeEmbedUrl(src) {
  if (!src) return "";
  // youtu.be/ID
  const shortMatch = src.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (shortMatch) return `https://www.youtube-nocookie.com/embed/${shortMatch[1]}?autoplay=1`;
  // youtube.com/watch?v=ID
  const watchMatch = src.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (watchMatch) return `https://www.youtube-nocookie.com/embed/${watchMatch[1]}?autoplay=1`;
  // vimeo
  const vimeoMatch = src.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  // already an embed or unknown
  return src;
}

function VideoCard({ video, t }) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const isEmbed = video.src && (video.src.includes("youtube") || video.src.includes("youtu.be") || video.src.includes("vimeo"));
  const isEmpty = !video.src;

  const handleMouseMove = (e) => {
    if (playing) return;
    const rect = cardRef.current.getBoundingClientRect();
    const ox = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const oy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: -oy * 10, y: ox * 10 });
  };
  const handleMouseEnter = () => { if (!playing) setHovered(true); };
  const handleMouseLeave = () => { setHovered(false); setTilt({ x: 0, y: 0 }); };

  const tiltStyle = (!playing && hovered)
    ? { transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.04,1.04,1.04)`, transition: "transform 0.1s ease-out", zIndex: 2 }
    : { transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)", transition: "transform 0.5s ease", zIndex: 1 };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", borderRadius: "4px", overflow: "hidden", background: t.bgCard, border: `1px solid ${t.border}`, display: "flex", flexDirection: "column", ...tiltStyle }}
    >
      {/* Video / Thumbnail area — fixed 16:9 */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", background: t.bgAlt, overflow: "hidden", flexShrink: 0 }}>
        {playing && video.src ? (
          isEmbed ? (
            <iframe src={getYouTubeEmbedUrl(video.src)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          ) : (
            <video src={video.src} autoPlay controls
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          )
        ) : (
          <>
            {(video.thumb || getYouTubeThumbnail(video.src)) ? (
              <img src={video.thumb || getYouTubeThumbnail(video.src)} alt={video.title}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: `linear-gradient(135deg, ${t.bgAlt} 0%, ${t.border} 100%)` }}>
                <div style={{ opacity: 0.25 }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={t.textSubtle} strokeWidth="1.2">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: t.textSubtle, opacity: 0.6 }}>Coming soon</span>
              </div>
            )}

            {!isEmpty && (
              <div onClick={() => { setPlaying(true); setHovered(false); setTilt({ x: 0, y: 0 }); }}
                style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: hovered ? "rgba(0,0,0,0.42)" : "rgba(0,0,0,0.28)", transition: "background 0.2s", cursor: "pointer" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", paddingLeft: "3px", boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)", transform: hovered ? "scale(1.12)" : "scale(1)", transition: "transform 0.2s ease" }}>
                  <PlayIcon />
                </div>
              </div>
            )}

            {video.duration && (
              <span style={{ position: "absolute", bottom: "10px", right: "10px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.05em", background: "rgba(0,0,0,0.6)", color: "#fff", padding: "2px 7px", borderRadius: "3px", backdropFilter: "blur(4px)" }}>{video.duration}</span>
            )}
          </>
        )}
      </div>

      {/* Card meta */}
      <div style={{ padding: "1.1rem 1.3rem", height: "80px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: t.textSubtle }}>{video.category}</span>
          <div style={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
            {video.views && (
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: t.textSubtle, display: "flex", alignItems: "center", gap: "3px" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                {video.views}
              </span>
            )}
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: t.textSubtle, letterSpacing: "0.05em" }}>{video.year}</span>
          </div>
        </div>
        <h3 style={{ fontFamily: "'Lora', serif", fontSize: "0.95rem", fontWeight: 400, color: t.text, lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{video.title}</h3>
      </div>
    </div>
  );
}


function formatSubs(raw) {
  if (!raw || raw === "0") return "";
  // Already has a unit suffix (K, M, B) — return as-is
  if (/[KkMmBb]$/.test(String(raw))) return String(raw) + " subs";
  const n = parseFloat(raw);
  if (isNaN(n)) return String(raw);
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M subs";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K subs";
  return String(raw) + " subs";
}

// ── OrbitImages ───────────────────────────────────────────────────────────────
function OrbitImages({ creators, itemSize = 54, duration = 120, radiusX = 0.88, radiusY = 0.48 }) {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const offsetRef = useRef(0);
  const currentSpeedRef = useRef(1);
  const targetSpeedRef = useRef(1);
  const itemRefs = useRef([]);
  const n = creators.length;

  useEffect(() => {
    const baseSpeed = (2 * Math.PI) / (duration * 60);

    const tick = () => {
      currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * 0.05;
      offsetRef.current += baseSpeed * currentSpeedRef.current;

      const container = containerRef.current;
      if (!container) { rafRef.current = requestAnimationFrame(tick); return; }
      const W = container.clientWidth;
      const H = container.clientHeight;
      const cx = W / 2;
      const cy = H / 2;
      const rx = (W / 2) * radiusX;
      const ry = (H / 2) * radiusY;

      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const angle = offsetRef.current + (i / n) * Math.PI * 2;
        const x = cx + rx * Math.cos(angle);
        const y = cy + ry * Math.sin(angle);
        const depth = (Math.sin(angle) + 1) / 2;
        const sc = 0.5 + 0.5 * depth;
        const op = 0.18 + 0.82 * depth;
        const zi = Math.round(depth * 20);
        el.style.transform = `translate(${x - itemSize / 2}px, ${y - itemSize / 2}px) scale(${sc})`;
        el.style.opacity = op;
        el.style.zIndex = zi;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [creators, itemSize, duration, radiusX, radiusY, n]);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "220px" }}>
      {creators.map((c, i) => (
        <a
          key={c.handle}
          href={c.channelUrl || "#"}
          target="_blank"
          rel="noreferrer"
          ref={el => itemRefs.current[i] = el}
          onMouseEnter={() => { targetSpeedRef.current = 0.08; }}
          onMouseLeave={() => { targetSpeedRef.current = 1; }}
          title={`${c.name} · ${c.subs} subscribers`}
          style={{
            position: "absolute", top: 0, left: 0,
            display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
            textDecoration: "none", willChange: "transform, opacity",
          }}
        >
          <div style={{
            width: itemSize, height: itemSize, borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.12)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
            overflow: "hidden", flexShrink: 0, position: "relative",
          }}>
            <img
              src={c.avatar}
              alt={c.name}
              crossOrigin="anonymous"
              onError={e => {
                e.currentTarget.style.display = "none";
                const fb = e.currentTarget.parentNode.querySelector(".avatar-fallback");
                if (fb) fb.style.display = "flex";
              }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "50%" }}
            />
            <div className="avatar-fallback" style={{
              display: "none", position: "absolute", inset: 0, borderRadius: "50%",
              background: "linear-gradient(135deg, #0086ff, #f4900c)",
              alignItems: "center", justifyContent: "center",
              fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#fff",
            }}>{c.name.charAt(0).toUpperCase()}</div>
          </div>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.58rem",
            color: "#aaa", whiteSpace: "nowrap", maxWidth: "72px",
            overflow: "hidden", textOverflow: "ellipsis", textAlign: "center", lineHeight: 1.2,
          }}>{c.name}</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem",
            color: "rgba(255,255,255,0.82)", textAlign: "center", fontWeight: 400,
          }}>{formatSubs(c.subs)}</span>
        </a>
      ))}
    </div>
  );
}

// ── ParticleBtn (MagicBento-style, no GSAP) ──────────────────────────────────
function ParticleBtn({ href, onClick, children, glowColor = "0, 134, 255" }) {
  const btnRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const hoveredRef = useRef(false);
  const tiltRafRef = useRef(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const spawnParticle = () => {
      if (!hoveredRef.current || !el) return;
      const { width, height } = el.getBoundingClientRect();
      const p = document.createElement("div");
      const size = 3 + Math.random() * 3;
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      p.style.cssText = `
        position:absolute;width:${size}px;height:${size}px;border-radius:50%;
        background:rgba(${glowColor},0.9);box-shadow:0 0 6px rgba(${glowColor},0.7);
        pointer-events:none;z-index:10;left:${startX}px;top:${startY}px;
        transition:opacity 0.3s;
      `;
      el.appendChild(p);
      particlesRef.current.push(p);

      const dx = (Math.random() - 0.5) * 60;
      const dy = (Math.random() - 0.5) * 60;
      const dur = 1200 + Math.random() * 800;
      const start = performance.now();

      const animate = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        p.style.transform = `translate(${dx * ease}px, ${dy * ease}px) scale(${1 - t * 0.5})`;
        p.style.opacity = t < 0.5 ? String(t * 2) : String(2 - t * 2);
        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          p.remove();
          particlesRef.current = particlesRef.current.filter(x => x !== p);
        }
      };
      requestAnimationFrame(animate);
    };

    let spawnInterval;

    const onEnter = () => {
      hoveredRef.current = true;
      spawnInterval = setInterval(spawnParticle, 80);
    };

    const onLeave = () => {
      hoveredRef.current = false;
      clearInterval(spawnInterval);
      // Reset tilt
      el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -8;
      const ry = ((x - cx) / cx) * 8;
      el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
    };

    const onClick = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxD = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position:absolute;border-radius:50%;pointer-events:none;z-index:20;
        width:${maxD * 2}px;height:${maxD * 2}px;
        left:${x - maxD}px;top:${y - maxD}px;
        background:radial-gradient(circle, rgba(${glowColor},0.35) 0%, rgba(${glowColor},0.15) 35%, transparent 70%);
        animation:particleRipple 0.7s ease-out forwards;
      `;
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("click", onClick);
    return () => {
      clearInterval(spawnInterval);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("click", onClick);
    };
  }, [glowColor]);

  const Tag = href ? "a" : "button";
  return (
    <Tag
      ref={btnRef}
      href={href}
      onClick={onClick}
      style={{
        position: "relative", overflow: "hidden", cursor: "pointer",
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "8px 22px", borderRadius: "8px",
        fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem",
        letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 500,
        color: "#fff", textDecoration: "none",
        background: `linear-gradient(135deg, rgba(${glowColor},0.18) 0%, rgba(${glowColor},0.06) 100%)`,
        border: `1px solid rgba(${glowColor},0.35)`,
        boxShadow: `0 0 16px rgba(${glowColor},0.15), inset 0 1px 0 rgba(255,255,255,0.06)`,
        transition: "transform 0.15s ease, box-shadow 0.2s ease",
        marginLeft: "1.5rem",
        willChange: "transform",
      }}
    >
      {children}
    </Tag>
  );
}

function ShineBtn({ href, onClick, children }) {
  const ref = useRef(null);
  const [hov, setHov] = useState(false);
  const [shimPos, setShimPos] = useState({ x: 50, y: 50 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setShimPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const Tag = href ? "a" : "button";
  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseMove={onMove}
      className="message-btn"
      style={{
        position: "relative", display: "inline-flex", alignItems: "center",
        justifyContent: "center", borderRadius: "100px", padding: "1px",
        background: "transparent", border: "none", textDecoration: "none",
        cursor: "pointer", overflow: "hidden",
        transform: hov ? "scale(1.07)" : "scale(1)",
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
        boxShadow: hov
          ? "0 0 28px 6px rgba(0,134,255,0.45), 0 0 60px 10px rgba(0,134,255,0.18)"
          : "0 0 12px 2px rgba(0,134,255,0.2)",
      }}
    >
      {/* Spinning comet border track */}
      <span aria-hidden="true" style={{
        position: "absolute", inset: 0, borderRadius: "100px",
        padding: "1px",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        overflow: "hidden",
      }}>
        <span style={{
          position: "absolute",
          width: "200%", aspectRatio: "1",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%) rotate(0deg)",
          background: "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(0,134,255,0.9) 330deg, #ffffff 345deg, rgba(0,134,255,0.9) 360deg)",
          animation: "starSpin 3s linear infinite",
          borderRadius: "50%",
        }} />
      </span>
      {/* Inner fill */}
      <span style={{
        position: "relative", zIndex: 1,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        padding: "14px 42px", borderRadius: "100px",
        background: hov ? "rgba(8,8,18,0.75)" : "rgba(8,8,18,0.88)",
        fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
        letterSpacing: "0.07em", textTransform: "uppercase",
        color: "#fff", whiteSpace: "nowrap",
        transition: "background 0.25s ease",
        overflow: "hidden",
      }}>
        {/* Cursor-follow inner glow */}
        <span style={{
          position: "absolute", inset: 0, borderRadius: "100px", pointerEvents: "none",
          background: hov
            ? `radial-gradient(circle at ${shimPos.x}% ${shimPos.y}%, rgba(255,255,255,0.14) 0%, rgba(0,134,255,0.07) 45%, transparent 70%)`
            : "none",
          opacity: hov ? 1 : 0, transition: "opacity 0.2s ease",
        }} />
        <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      </span>
    </Tag>
  );
}

function NavPill({ label, onClick, isActive }) {
  const [hovered, setHovered] = useState(false);
  const active = isActive || hovered;
  return (
    <a
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
        letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 400,
        color: "#edede9", textDecoration: "none",
        padding: active ? "5px 16px" : "5px 16px",
        background: active ? "rgba(255,255,255,0.08)" : "transparent",
        backdropFilter: active ? "blur(14px)" : "none",
        WebkitBackdropFilter: active ? "blur(14px)" : "none",
        border: active ? "1px solid rgba(255,255,255,0.16)" : "1px solid transparent",
        borderRadius: "100px",
        boxShadow: active ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 12px rgba(0,0,0,0.25)" : "none",
        transition: "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, backdrop-filter 0.25s ease",
      }}
    >{label}</a>
  );
}


// ── ScrollReveal (GSAP-style scroll scrub, no external dep) ─────────────────
function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  style = {},
  as: Tag = 'h2',
}) {
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const rafRef = useRef(null);
  const revealedRef = useRef(false);
  const listenerRef = useRef(null);
  const isString = typeof children === 'string';

  const wordList = useMemo(() => {
    if (!isString) return [];
    return children.split(/(\s+)/);
  }, [children, isString]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    revealedRef.current = false;

    const lockFinal = () => {
      el.style.transform = 'rotate(0deg)';
      el.style.opacity = '1';
      el.style.filter = 'none';
      if (isString) {
        wordRefs.current.forEach(word => {
          if (!word) return;
          word.style.opacity = '1';
          word.style.filter = 'none';
          word.style.willChange = 'auto';
        });
      }
      revealedRef.current = true;
      if (listenerRef.current) {
        window.removeEventListener('scroll', listenerRef.current);
        listenerRef.current = null;
      }
    };

    const update = () => {
      if (revealedRef.current) return;
      const rect = el.getBoundingClientRect();
      const wH = window.innerHeight;

      // If element is fully inside viewport or scrolled past → lock immediately
      if (rect.top < wH * 0.2 && rect.bottom <= wH + 20) { lockFinal(); return; }

      // Rotation: element fully de-rotates once its top is 35% down viewport
      const rotT = Math.max(0, Math.min(1, (wH * 0.9 - rect.top) / (rect.height + wH * 0.45)));
      el.style.transform = `rotate(${(baseRotation * (1 - rotT)).toFixed(3)}deg)`;
      el.style.transformOrigin = '0% 50%';

      let allDone = true;

      if (isString) {
        const nonSpace = wordList.filter(w => !/^\s+$/.test(w));
        const totalWords = nonSpace.length;
        let wIdx = 0;
        wordRefs.current.forEach((word, i) => {
          if (!word) return;
          if (wordList[i] && /^\s+$/.test(wordList[i])) return;
          const stagger = totalWords > 1 ? (wIdx / (totalWords - 1)) * 0.3 : 0;
          // Faster reveal: starts when top hits 90% viewport, ends at 40%
          const wordT = Math.max(0, Math.min(1, (wH * 0.9 - rect.top) / (rect.height + wH * 0.35)));
          const t = Math.max(0, Math.min(1, (wordT - stagger) / Math.max(0.01, 1 - stagger)));
          word.style.opacity = (baseOpacity + (1 - baseOpacity) * t).toFixed(3);
          if (enableBlur) word.style.filter = `blur(${(blurStrength * (1 - t)).toFixed(2)}px)`;
          if (t < 0.999) allDone = false;
          wIdx++;
        });
      } else {
        const fadeT = Math.max(0, Math.min(1, (wH * 0.9 - rect.top) / (rect.height + wH * 0.35)));
        el.style.opacity = (baseOpacity + (1 - baseOpacity) * fadeT).toFixed(3);
        if (enableBlur) el.style.filter = `blur(${(blurStrength * (1 - fadeT)).toFixed(2)}px)`;
        if (fadeT < 0.999) allDone = false;
      }

      if (allDone && rotT >= 0.999) lockFinal();
    };

    const onScroll = () => {
      if (revealedRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    listenerRef.current = onScroll;
    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once immediately — catches elements already in view on mount
    requestAnimationFrame(update);

    return () => {
      if (listenerRef.current) window.removeEventListener('scroll', listenerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isString, enableBlur, baseRotation, baseOpacity, blurStrength, wordList]);

  if (isString) {
    return (
      <Tag ref={containerRef} style={style}>
        {wordList.map((word, i) => {
          if (/^\s+$/.test(word)) return word;
          return (
            <span key={i} ref={el => { wordRefs.current[i] = el; }}
              style={{ display: 'inline-block', opacity: baseOpacity, willChange: 'opacity, filter' }}>
              {word}
            </span>
          );
        })}
      </Tag>
    );
  }

  return (
    <Tag ref={containerRef} style={{ ...style, opacity: baseOpacity, willChange: 'opacity, transform, filter' }}>
      {children}
    </Tag>
  );
}


// ── FaultyTerminal (Three.js port — no ogl dependency) ──────────────────────
const _FT_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const _FT_FRAG = `
precision mediump float;
varying vec2 vUv;
uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;
uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uChromaticAberration;
uniform float uDither;
uniform float uCurvature;
uniform vec3  uTint;
uniform float uBrightness;
uniform vec3  uBgColor;
float time;
float hash21(vec2 p){ p=fract(p*234.56); p+=dot(p,p+34.56); return fract(p.x*p.y); }
float noise(vec2 p){ return sin(p.x*10.0)*sin(p.y*(3.0+sin(time*0.090909)))+0.2; }
mat2 mrot(float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }
float fbm(vec2 p){
  p*=1.1; float f=0.0,amp=0.5*uNoiseAmp;
  f+=amp*noise(p); p=mrot(time*0.02)*p*2.0; amp*=0.454545;
  f+=amp*noise(p); p=mrot(time*0.02)*p*2.0; amp*=0.454545;
  f+=amp*noise(p); return f;
}
float pattern(vec2 p,out vec2 q,out vec2 r){
  q=vec2(fbm(p+vec2(1.0)),fbm(mrot(0.1*time)*p+vec2(1.0)));
  r=vec2(fbm(mrot(0.1)*q+vec2(0.0)),fbm(q+vec2(0.0)));
  return fbm(p+r);
}
float digit(vec2 p){
  vec2 grid=uGridMul*15.0;
  vec2 s=floor(p*grid)/grid;
  p=p*grid;
  vec2 q,r;
  float intensity=pattern(s*0.1,q,r)*1.3-0.03;
  p=fract(p); p*=uDigitSize;
  float px5=p.x*5.0, py5=(1.0-p.y)*5.0;
  float x=fract(px5), y=fract(py5);
  float i=floor(py5)-2.0, j=floor(px5)-2.0;
  float n=i*i+j*j, f=n*0.0625;
  float isOn=step(0.1,intensity-f);
  float brightness=isOn*(0.2+y*0.8)*(0.75+x*0.25);
  return step(0.0,p.x)*step(p.x,1.0)*step(0.0,p.y)*step(p.y,1.0)*brightness;
}
float onOff(float a,float b,float c){ return step(c,sin(iTime+a*cos(iTime*b)))*uFlickerAmount; }
float displace(vec2 look){
  float y=look.y-mod(iTime*0.25,1.0);
  float window=1.0/(1.0+50.0*y*y);
  return sin(look.y*20.0+iTime)*0.0125*onOff(4.0,2.0,0.8)*(1.0+cos(iTime*60.0))*window;
}
vec3 getColor(vec2 p){
  float bar=step(mod(p.y+time*20.0,1.0),0.2)*0.4+1.0; bar*=uScanlineIntensity;
  float displacement=displace(p); p.x+=displacement;
  if(uGlitchAmount!=1.0){ float extra=displacement*(uGlitchAmount-1.0); p.x+=extra; }
  float middle=digit(p);
  const float off=0.002;
  float sum=digit(p+vec2(-off,-off))+digit(p+vec2(0.0,-off))+digit(p+vec2(off,-off))+
            digit(p+vec2(-off,0.0))+digit(p+vec2(0.0,0.0))+digit(p+vec2(off,0.0))+
            digit(p+vec2(-off,off))+digit(p+vec2(0.0,off))+digit(p+vec2(off,off));
  return vec3(0.9)*middle+sum*0.1*vec3(1.0)*bar;
}
vec2 barrel(vec2 uv){ vec2 c=uv*2.0-1.0; float r2=dot(c,c); c*=1.0+uCurvature*r2; return c*0.5+0.5; }
void main(){
  time=iTime*0.333333;
  vec2 uv=vUv;
  if(uCurvature!=0.0) uv=barrel(uv);
  vec2 p=uv*uScale;
  vec3 col=getColor(p);
  if(uChromaticAberration!=0.0){
    vec2 ca=vec2(uChromaticAberration)/iResolution.xy;
    col.r=getColor(p+ca).r; col.b=getColor(p-ca).b;
  }
  col*=uTint*uBrightness;
  if(uDither>0.0){ float rnd=hash21(gl_FragCoord.xy); col+=(rnd-0.5)*(uDither*0.003922); }
  col = uBgColor + col;
  gl_FragColor=vec4(col,1.0);
}
`;

function FaultyTerminal({
  scale = 1.2,
  gridMul = [2, 1],
  digitSize = 1.5,
  timeScale = 0.25,
  scanlineIntensity = 0.28,
  glitchAmount = 1,
  flickerAmount = 0.6,
  noiseAmp = 0.5,
  chromaticAberration = 0,
  dither = 0,
  curvature = 0,
  tint = [0.3, 0.6, 1.0],
  brightness = 0.55,
  style = {},
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      vertexShader: _FT_VERT,
      fragmentShader: _FT_FRAG,
      uniforms: {
        iTime:               { value: 0 },
        iResolution:         { value: new THREE.Vector3(1, 1, 1) },
        uScale:              { value: scale },
        uGridMul:            { value: new THREE.Vector2(gridMul[0], gridMul[1]) },
        uDigitSize:          { value: digitSize },
        uScanlineIntensity:  { value: scanlineIntensity },
        uGlitchAmount:       { value: glitchAmount },
        uFlickerAmount:      { value: flickerAmount },
        uNoiseAmp:           { value: noiseAmp },
        uChromaticAberration:{ value: chromaticAberration },
        uDither:             { value: typeof dither === 'boolean' ? (dither ? 1 : 0) : dither },
        uCurvature:          { value: curvature },
        uTint:               { value: new THREE.Vector3(tint[0], tint[1], tint[2]) },
        uBrightness:         { value: brightness },
        uBgColor:            { value: new THREE.Vector3(17/255, 17/255, 16/255) },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    const timeOffset = Math.random() * 100;
    let raf;

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      material.uniforms.iResolution.value.set(w, h, w / h);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const loop = () => {
      material.uniforms.iTime.value = (clock.getElapsedTime() + timeOffset) * timeScale;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement);
    };
  }, [scale, gridMul, digitSize, timeScale, scanlineIntensity, glitchAmount,
      flickerAmount, noiseAmp, chromaticAberration, dither, curvature, brightness]);

  return (
    <div ref={mountRef} style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      overflow: 'hidden', pointerEvents: 'none', ...style,
    }} />
  );
}


// ── TestimonialCard ────────────────────────────────────────────────────────
function TestimonialCard({ item, cardW }) {
  const ref = useRef(null);
  const [tilt, setTilt]   = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50, show: false });

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const ox = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const oy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    setTilt({ x: -oy * 10, y: ox * 10 });
    setShine({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100, show: true });
  };
  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setShine(s => ({ ...s, show: false }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setShine(s => ({ ...s, show: true }))}
      onMouseLeave={onMouseLeave}
      style={{
        flexShrink: 0, width: `${cardW}px`, height: "260px",
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${shine.show ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.09)"}`,
        borderRadius: "18px",
        padding: "2.2rem 1.8rem",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        willChange: "transform, opacity",
        position: "relative", overflow: "hidden",
        transform: shine.show
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.04,1.04,1.04)`
          : "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
        transition: shine.show ? "transform 0.1s ease-out, border-color 0.2s" : "transform 0.5s ease, border-color 0.3s",
      }}
    >
      {/* Cursor-follow radial shine */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, borderRadius: "18px", pointerEvents: "none",
        background: shine.show
          ? `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(244,144,12,0.18) 0%, rgba(244,144,12,0.06) 40%, transparent 70%)`
          : "none",
        opacity: shine.show ? 1 : 0,
        transition: "opacity 0.25s ease",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontFamily: "'Zilla Slab', serif", fontSize: "2.8rem", lineHeight: 0.9, color: "rgba(255,255,255,0.12)", marginBottom: "0.75rem", userSelect: "none" }}>"</div>
        <p style={{ fontFamily: "'Zilla Slab', serif", fontSize: "1.1rem", color: item.quote === "Working on it..." ? "rgba(255,255,255,0.2)" : "#fff", lineHeight: 1.55, textAlign: "center", fontStyle: "italic", margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" }}>
          {item.quote}
        </p>
      </div>
      <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.88rem", color: item.channel === "Working on it..." ? "rgba(255,255,255,0.2)" : "#fff", fontWeight: 700, margin: 0 }}>{item.channel}</p>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.74rem", color: "rgba(255,255,255,0.42)", margin: "0.25rem 0 0" }}>{item.subs !== "—" ? `${item.subs} subscribers` : ""}</p>
      </div>
    </div>
  );
}

// ── TestimonialCarousel ────────────────────────────────────────────────────
function TestimonialCarousel({ items }) {
  const containerRef = useRef(null);
  const trackRef     = useRef(null);
  const posRef       = useRef(0);
  const velRef       = useRef(0);
  const dragRef      = useRef({ down: false, startX: 0, startPos: 0 });
  const rafRef       = useRef(null);

  const CARD_W = 360;
  const GAP    = 28;
  const STEP   = CARD_W + GAP;
  const N      = items.length;
  const LOOP_W = N * STEP;

  // Triple items for seamless infinite loop
  const tripled = useMemo(() => [...items, ...items, ...items], [items]);

  useEffect(() => {
    posRef.current = LOOP_W; // start at middle copy
    velRef.current = 0;

    const loop = () => {
      const container = containerRef.current;
      const track     = trackRef.current;
      if (!container || !track) { rafRef.current = requestAnimationFrame(loop); return; }

      if (!dragRef.current.down) {
        posRef.current += 0.08; // constant auto-scroll
      }
      velRef.current *= 0.92;
      posRef.current += velRef.current;

      // Seamless wrap
      if (posRef.current >= LOOP_W * 2) posRef.current -= LOOP_W;
      if (posRef.current < LOOP_W)      posRef.current += LOOP_W;

      track.style.transform = `translateX(${-posRef.current}px)`;

      // Circular arc bend — same math as the OGL CircularGallery component
      const cW   = container.clientWidth;
      const H    = cW / 2;
      const BEND = 2.8;
      const R    = H > 0 ? (H * H + BEND * BEND) / (2 * BEND) : 1e6;
      const PX_SCALE = cW / 140; // arc → pixels

      Array.from(track.children).forEach((card, i) => {
        const cardCX = i * STEP + CARD_W / 2;
        const x      = cardCX - posRef.current - H; // signed dist from viewport centre
        const effX   = Math.min(Math.abs(x), H);
        const arc    = R - Math.sqrt(Math.max(0, R * R - effX * effX));
        const yPx    = arc * PX_SCALE;
        const rotRad = Math.asin(Math.min(effX / R, 1));
        const rotDeg = (-Math.sign(x) * rotRad * 180) / Math.PI;
        const opacity = Math.max(0.15, 1 - (Math.abs(x) / cW) * 0.75);
        card.style.transform = `translateY(${yPx.toFixed(1)}px) rotateZ(${rotDeg.toFixed(2)}deg)`;
        card.style.opacity   = opacity.toFixed(2);
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [LOOP_W, STEP]);

  const onPD = useCallback((e) => {
    dragRef.current = { down: true, startX: e.clientX, startPos: posRef.current };
    velRef.current  = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);
  const onPM = useCallback((e) => {
    if (!dragRef.current.down) return;
    posRef.current  = dragRef.current.startPos - (e.clientX - dragRef.current.startX) * 1.4;
    velRef.current  = -(e.movementX || 0) * 0.8;
  }, []);
  const onPU = useCallback(() => { dragRef.current.down = false; }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU} onPointerLeave={onPU}
      style={{ overflow: "hidden", paddingBlock: "3.5rem", cursor: "grab", userSelect: "none", touchAction: "pan-y" }}
    >
      <div ref={trackRef} style={{ display: "flex", gap: `${GAP}px`, willChange: "transform", alignItems: "flex-start" }}>
        {tripled.map((item, i) => (
          <TestimonialCard key={i} item={item} cardW={CARD_W} />
        ))}
      </div>
      <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginTop: "1.5rem", pointerEvents: "none", userSelect: "none" }}>
        ← Drag to see more →
      </p>
    </div>
  );
}

export default function Portfolio() {
  const [dark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [page, setPage] = useState("home");
  const [pageVisible, setPageVisible] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  const t = themes.dark;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(data.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const goVideos = () => {
    setPage("videos");
    setVisibleCount(9);
    window.scrollTo(0, 0);
    setMenuOpen(false);
  };

  const goHome = () => {
    setPage("home");
    window.scrollTo(0, 0);
    setMenuOpen(false);
  };

  const scrollTo = (id) => {
    if (page !== "home") {
      setPage("home");
      window.scrollTo(0, 0);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const navLinks = ["About", "Videos", "FAQ", "Contact"];

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: t.bg, color: t.text, minHeight: "100vh", transition: "background 0.4s, color 0.4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&family=Nunito:wght@300;400;500;600&family=Zilla+Slab:ital,wght@0,400;0,600;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        .nav-link {
          position: relative; text-decoration: none;
          font-family: 'DM Sans', sans-serif; font-size: 0.85rem; letter-spacing: 0.06em;
          text-transform: uppercase; font-weight: 400;
          color: ${t.text};
          background: linear-gradient(90deg, #0086ff, #f4900c, #0086ff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: ${t.text};
          background-clip: text;
          animation: none;
        }
        .nav-link-active { -webkit-text-fill-color: transparent !important; animation: navGradient 8s linear infinite !important; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: ${t.text}; transition: width 0.25s ease; }
        .nav-link:hover {
          -webkit-text-fill-color: transparent;
          animation: navGradient 8s linear infinite;
        }
        @keyframes navGradient {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .project-card {
          background: ${t.bgCard}; border: 1px solid ${t.border}; border-radius: 2px; padding: 2rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.4s ease; cursor: default;
        }
        .project-card:hover { transform: translateY(-4px); box-shadow: ${t.shadowCard}; border-color: ${t.borderHover}; }

        .tag {
          display: inline-block; font-family: 'DM Sans', sans-serif; font-size: 0.72rem;
          letter-spacing: 0.08em; text-transform: uppercase; color: ${t.textSubtle};
          border: 1px solid ${t.border}; padding: 3px 10px; border-radius: 100px; transition: color 0.3s, border-color 0.3s;
        }
        .skill-pill {
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem; color: ${t.skillColor};
          background: ${t.skillBg}; padding: 6px 14px; border-radius: 100px;
          border: 1px solid transparent;
          position: relative; overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .skill-pill::after {
          content: '';
          position: absolute;
          top: -50%; left: -80%;
          width: 55%; height: 200%;
          background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%);
          transform: skewX(-20deg);
          animation: none;
          pointer-events: none;
        }
        .skill-pill:hover {
          border-color: rgba(0, 134, 255, 0.7);
          box-shadow: 0 0 0 1px rgba(0, 134, 255, 0.2), 0 0 8px rgba(0, 134, 255, 0.15);
        }
        .skill-pill:hover::after {
          animation: glintSweep 0.55s ease forwards;
        }
        @keyframes glintSweep {
          from { left: -80%; }
          to   { left: 130%; }
        }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 0.85rem; letter-spacing: 0.05em;
          text-transform: uppercase; padding: 14px 28px;
          position: relative; overflow: hidden;
          border-radius: 100px;
          border: 1px solid ${dark ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.7)"};
          background: ${dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.45)"};
          color: ${t.text};
          backdrop-filter: blur(16px) saturate(1.6);
          -webkit-backdrop-filter: blur(16px) saturate(1.6);
          box-shadow: ${dark
            ? "0 2px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)"
            : "0 2px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.06)"};
          cursor: pointer; text-decoration: none;
          transition: box-shadow 0.25s ease, background 0.25s ease, transform 0.2s ease, border-color 0.3s;
        }
        .cta-btn::before {
          content: '';
          position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(105deg, transparent 20%, ${dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.55)"} 50%, transparent 80%);
          transform: skewX(-15deg);
          transition: left 0.5s ease;
          pointer-events: none;
        }
        .cta-btn:hover::before { left: 120%; }
        .cta-btn:hover {
          transform: translateY(-1px);
          background: ${dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.65)"};
          box-shadow: ${dark
            ? "0 6px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.25)"
            : "0 6px 28px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(0,0,0,0.07)"};
        }
        .cta-btn:active { transform: translateY(0px); }
        .cta-btn.filled {
          background: ${dark ? "rgba(240,240,236,0.14)" : "rgba(26,26,24,0.82)"};
          color: ${dark ? t.text : "#FAFAF8"};
          border-color: ${dark ? "rgba(255,255,255,0.2)" : "rgba(26,26,24,0.5)"};
          box-shadow: ${dark
            ? "0 2px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.3)"
            : "0 2px 16px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.2)"};
        }
        .cta-btn.filled:hover {
          background: ${dark ? "rgba(240,240,236,0.2)" : "rgba(26,26,24,0.92)"};
          box-shadow: ${dark
            ? "0 6px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.15)"
            : "0 6px 28px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)"};
        }

        .social-link {
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem; letter-spacing: 0.05em;
          text-transform: uppercase; color: ${t.textSubtle}; text-decoration: none; transition: color 0.2s;
        }
        .social-link:hover { color: ${t.text}; }

        .section-label { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: ${t.textSubtle}; transition: color 0.3s; }
        .divider { width: 40px; height: 1px; background: ${t.border}; transition: background 0.3s; }
        .hero-num {
          font-family: 'Lora', serif; font-size: clamp(5rem, 15vw, 11rem); font-weight: 400;
          line-height: 0.85; color: ${t.heroNum}; position: absolute; right: -10px; top: -20px;
          user-select: none; pointer-events: none; z-index: 0; transition: color 0.4s;
        }
        .toggle-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid ${t.border}; background: transparent; color: ${t.text};
          cursor: pointer; transition: background 0.2s, border-color 0.3s, color 0.3s; flex-shrink: 0;
        }
        .toggle-btn:hover { background: ${t.skillBg}; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${t.scrollbarTrack}; }
        ::-webkit-scrollbar-thumb { background: ${t.scrollbarThumb}; border-radius: 4px; }

        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .mobile-menu-btn { display: block !important; }
          .video-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) and (min-width: 641px) {
          .video-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        .mobile-toggle { display: none; }
        .mobile-menu-btn { display: none; }

        .star-border-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 100px;
          padding: 1px;
          background: transparent;
          border: none;
          text-decoration: none;
          cursor: pointer;
          overflow: hidden;
          box-shadow: none;
          transition: box-shadow 0.3s ease;
        }
        .star-border-btn:hover {
          box-shadow: 0 0 16px 3px rgba(0,134,255,0.5), 0 0 40px 8px rgba(0,134,255,0.2);
        }
        .star-border-track {
          position: absolute;
          inset: 0;
          border-radius: 100px;
          padding: 1.5px;
          background: transparent;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          overflow: hidden;
        }
        .star-border-track::before {
          content: '';
          position: absolute;
          width: 200%;
          aspect-ratio: 1;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(0deg);
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 270deg,
            var(--star-color, #0086ff) 310deg,
            #ffffff 338deg,
            var(--star-color, #0086ff) 360deg
          );
          animation: starSpin var(--star-speed, 6s) linear infinite;
          border-radius: 50%;
        }
        @keyframes starSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .star-border-inner {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 13px 27px;
          border-radius: 100px;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(12px);
          color: #fff;
          white-space: nowrap;
          transition: background 0.25s ease;
        }
        .star-border-btn:hover .star-border-inner {
          background: rgba(20, 20, 20, 0.7);
        }

        .card-spotlight {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          transition: border-color 0.3s;
        }
        .card-spotlight::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            220px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            var(--spotlight-color, transparent),
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
          opacity: var(--spotlight-opacity, 0);
          transition: opacity 0.4s ease;
        }
        .card-spotlight::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(100,160,255,0.75) 30%, rgba(100,160,255,0.75) 70%, transparent);
          opacity: var(--spotlight-opacity, 0);
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 2;
        }
        .card-spotlight > * { position: relative; z-index: 1; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes creatorSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes particleRipple { from { transform: scale(0); opacity: 1; } to { transform: scale(1); opacity: 0; } }
      `}</style>

      {/* COLOR BENDS BACKGROUND */}
      <ColorBends
        rotation={0}
        speed={0.2}
        colors={["#0086ff", "#f4900c"]}
        transparent
        autoRotate={0}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.1}
      />

      {/* GRAIN TEXTURE OVERLAY */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
        opacity: dark ? 0.055 : 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
        transition: "opacity 0.4s",
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 clamp(1.5rem, 5vw, 4rem)", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled
          ? t.navBg
          : "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <a onClick={goHome} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
          <span style={{ fontFamily: "'Lora', serif", fontSize: "1.1rem", fontWeight: 400, letterSpacing: "-0.01em" }}>
            {data.name.split(" ")[0]}<span style={{ color: t.textSubtle }}>.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {[
            { label: "About",   action: () => scrollTo("about"),   isActive: false },
            { label: "Videos",  action: goVideos,                   isActive: page === "videos" },
            { label: "FAQ",     action: () => scrollTo("faq"),      isActive: false },
            { label: "Contact", action: () => scrollTo("contact"),  isActive: false },
          ].map(({ label, action, isActive }) => (
            <NavPill key={label} label={label} onClick={action} isActive={isActive} />
          ))}
          <ParticleBtn href="https://x.com/framedmotion">Hire me</ParticleBtn>
        </div>

        {/* Mobile controls */}
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: t.text }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99, background: t.bg,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem",
        }}>
          <a onClick={() => scrollTo("about")} className="nav-link" style={{ fontSize: "1.1rem", cursor: "pointer" }}>About</a>
          <a onClick={goVideos} className="nav-link" style={{ fontSize: "1.1rem", cursor: "pointer" }}>Videos</a>
          <a onClick={() => scrollTo("faq")} className="nav-link" style={{ fontSize: "1.1rem", cursor: "pointer" }}>FAQ</a>
          <a onClick={() => scrollTo("contact")} className="nav-link" style={{ fontSize: "1.1rem", cursor: "pointer" }}>Contact</a>
        </div>
      )}

      {/* PAGE CONTENT */}
      <div>

      {/* ── HOME (single scrolling page) ── */}
      <div style={{ display: page === "home" ? "block" : "none" }}>
      <>

        {/* HERO */}
        <section id="top" style={{
          minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          padding: "0 clamp(1.5rem, 5vw, 4rem)", paddingTop: "80px", position: "relative", overflow: "hidden",
          textAlign: "center", zIndex: 1, background: "transparent",
        }}>
          <div style={{ position: "relative", maxWidth: "820px", width: "100%" }}>
            <div style={{ opacity: 0, animation: "fadeUp 0.8s 0.1s forwards" }}>
              <h1 style={{ fontFamily: "'Zilla Slab', serif", fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem", position: "relative", zIndex: 1, textShadow: "0 4px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)" }}>
                <span style={{ color: "#ecdfcc" }}>{data.name}</span><br />
                <em style={{ fontStyle: "italic", color: t.textMuted }}>{data.title}</em>
              </h1>
            </div>
            <div style={{ opacity: 0, animation: "fadeUp 0.8s 0.35s forwards" }}>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300, fontSize: "clamp(1rem, 2vw, 1.2rem)", color: t.textMuted, maxWidth: "520px", lineHeight: 1.7, margin: "0 auto 2.5rem", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
                <mark style={{
                  background: "rgba(0,134,255,0.45)",
                  color: "rgba(255,255,255,0.95)",
                  borderRadius: "8px",
                  padding: "0.15em 0.45em",
                  WebkitBoxDecorationBreak: "clone",
                  boxDecorationBreak: "clone",
                  backdropFilter: "blur(10px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(10px) saturate(1.4)",
                  border: "1px solid rgba(0,134,255,0.6)",
                  boxShadow: "0 2px 16px rgba(0,134,255,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}>Experience videos that elevate your brand and storytelling.</mark>
              </p>
            </div>
            <div style={{ opacity: 0, animation: "fadeUp 0.8s 0.5s forwards", display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
              <a onClick={goVideos} className="cta-btn filled" style={{ cursor: "pointer", background: "rgba(10,10,10,0.85)", borderColor: "rgba(255,255,255,0.25)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 2px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)", color: "rgba(220,220,216,0.95)" }}>View Work</a>
              <GradientBtn href="https://x.com/framedmotion">Get in touch</GradientBtn>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0, animation: "fadeUp 0.8s 0.9s forwards" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: t.textSubtle }}>Scroll</span>
            <div style={{ width: "1px", height: "40px", background: `linear-gradient(to bottom, ${t.textSubtle}, transparent)` }} />
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)", background: dark ? "rgba(24,24,23,0.82)" : "rgba(244,244,240,0.82)", backdropFilter: "blur(2px)", transition: "background 0.4s", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <FadeIn><div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}><span className="section-label">About</span><div className="divider" /></div></FadeIn>
            <ScrollReveal as="p" baseOpacity={0.1} baseRotation={2} blurStrength={4} enableBlur={true}
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 400, fontSize: "clamp(1.05rem, 2vw, 1.3rem)", lineHeight: 1.75, color: t.textMuted }}>
              {data.about}
            </ScrollReveal>
            <FadeIn delay={0.2}>
              <div style={{ marginTop: "3rem" }}>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: t.textSubtle, marginBottom: "1rem" }}>Skills & Tools</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {data.skills.map(s => <span key={s} className="skill-pill">{s}</span>)}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div style={{ marginTop: "3.5rem" }}>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: t.textSubtle, marginBottom: "1.8rem" }}>Creators I've collaborated with</p>
                <OrbitImages creators={data.creators} />
              </div>
            </FadeIn>

          </div>
        </section>

        {/* VIDEOS PREVIEW */}
        <section id="videos" style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)", background: dark ? "rgba(17,17,16,0.78)" : "rgba(250,250,248,0.78)", backdropFilter: "blur(2px)", transition: "background 0.4s", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <FadeIn><div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}><span className="section-label">Video Work</span><div className="divider" /></div></FadeIn>
            <ScrollReveal as="h2" baseRotation={3} baseOpacity={0.08} blurStrength={5}
              style={{ fontFamily: "'Zilla Slab', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "3rem" }}>
              My best <em style={{ color: t.textMuted, fontStyle: "italic" }}>work.</em>
            </ScrollReveal>
            <div className="video-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.75rem" }}>
              {data.videos.slice(0, 4).map((v, i) => (
                <FadeIn key={v.title} delay={i * 0.1}><VideoCard video={v} t={t} /></FadeIn>
              ))}
            </div>
            <FadeIn delay={0.25}>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
                <a onClick={goVideos} className="cta-btn" style={{ gap: "10px", cursor: "pointer" }}>
                  See all work
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)", background: dark ? "rgba(17,17,16,0.78)" : "rgba(250,250,248,0.78)", backdropFilter: "blur(2px)", transition: "background 0.4s", position: "relative", zIndex: 1, overflow: "hidden" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <FadeIn><div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}><span className="section-label">Testimonials</span><div className="divider" /></div></FadeIn>
            <ScrollReveal as="h2" baseRotation={3} baseOpacity={0.08} blurStrength={5}
              style={{ fontFamily: "'Zilla Slab', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "3rem" }}>
              Don't trust me yet?<br /><em style={{ color: t.textMuted, fontStyle: "italic" }}>Success shown from clients.</em>
            </ScrollReveal>
          </div>
          <TestimonialCarousel items={data.testimonials} />
        </section>

        {/* FAQ */}
        <section id="faq" style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)", background: dark ? "rgba(24,24,23,0.82)" : "rgba(244,244,240,0.82)", backdropFilter: "blur(2px)", transition: "background 0.4s", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <FadeIn><div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}><span className="section-label">FAQ</span><div className="divider" /></div></FadeIn>
            <ScrollReveal as="h2" baseRotation={3} baseOpacity={0.08} blurStrength={5}
              style={{ fontFamily: "'Zilla Slab', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "3rem" }}>
              Common questions,<br /><em style={{ color: t.textMuted, fontStyle: "italic" }}>answered.</em>
            </ScrollReveal>
            <FadeIn delay={0.15}>
              <div style={{ borderTop: `1px solid ${t.border}`, transition: "border-color 0.3s" }}>
                {data.faq.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} t={t} dark={dark} />)}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)", background: dark ? "rgba(17,17,16,0.78)" : "rgba(250,250,248,0.78)", backdropFilter: "blur(2px)", transition: "background 0.4s", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <FadeIn><div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}><span className="section-label">Contact</span><div className="divider" /></div></FadeIn>
            <ScrollReveal as="h2" baseRotation={3} baseOpacity={0.08} blurStrength={5}
              style={{ fontFamily: "'Zilla Slab', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, lineHeight: 1.15, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
              Make your next video<br /><em style={{ fontStyle: "italic", color: t.textMuted }}>impossible to ignore</em>
            </ScrollReveal>
            <FadeIn delay={0.2}><p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1rem", color: t.textMuted, maxWidth: "440px", lineHeight: 1.7, marginBottom: "2.5rem" }}>Open for work, send me an email below if you're ready to scale your channel.</p></FadeIn>
            <FadeIn delay={0.3}>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", marginBottom: "4rem" }}>
                <GradientBtn href={`mailto:${data.contact.email}`}>{data.contact.email}</GradientBtn>
                <button onClick={copyEmail} className="cta-btn" style={{ fontSize: "0.78rem" }}>{copied ? "Copied ✓" : "Copy email"}</button>
              </div>
            </FadeIn>
          </div>
        </section>

      </>
      </div>

      {/* ── VIDEOS PAGE ── */}
      <div style={{ display: page === "videos" ? "block" : "none" }}>
        <div style={{ position: "relative", minHeight: "100vh", background: dark ? "rgba(10,10,12,1)" : "rgba(18,18,22,1)" }}>

          {/* LIQUID ETHER BACKGROUND */}
          <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
            <LiquidEther
              mouseForce={12}
              cursorSize={80}
              isViscous={true}
              viscous={65}
              iterationsViscous={48}
              iterationsPoisson={32}
              dt={0.010}
              BFECC={true}
              resolution={0.5}
              isBounce={false}
              colors={["#0a0a12", "#0086ff", "#1a0a2e", "#f4900c", "#0a0a12"]}
              autoDemo={true}
              autoSpeed={0.25}
              autoIntensity={1.5}
              takeoverDuration={0.25}
              autoResumeDelay={1000}
              autoRampDuration={0.6}
              style={{ background: "#070710" }}
            />
          </div>

          {/* VIDEOS HEADER */}
          <header style={{ position: "relative", zIndex: 10, padding: "clamp(6rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem,6vw,5rem)", textAlign: "center", background: "linear-gradient(to bottom, rgba(10,10,14,0.75) 0%, transparent 100%)" }}>
            <FadeIn>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "1.2rem" }}>Portfolio</span>
              <h1 style={{ fontFamily: "'Zilla Slab', serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff", marginBottom: "1.4rem" }}>
                Better visuals,<br /><em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>better storytelling.</em>
              </h1>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "rgba(255,255,255,0.5)", maxWidth: "480px", margin: "0 auto 2.2rem", lineHeight: 1.7 }}>
                Explore my work, this is where your brand levels up.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <GradientBtn href="https://x.com/framedmotion">Work with me</GradientBtn>
                <a onClick={goHome} className="cta-btn" style={{ cursor: "pointer", fontSize: "0.82rem" }}>← Back home</a>
              </div>
            </FadeIn>
          </header>

                    {/* VIDEO GRID */}
          <section style={{ position: "relative", zIndex: 10, padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(4rem,8vw,6rem)" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              {(() => {
                const allVideos = data.videos;
                const shown = allVideos.slice(0, visibleCount);
                const hasMore = visibleCount < allVideos.length;
                return (<>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.75rem" }}>
                    {shown.map((v, i) => (
                      <FadeIn key={`${v.title}-${i}`} delay={Math.min(i % 3, 2) * 0.07}>
                        <VideoCard video={v} t={t} />
                      </FadeIn>
                    ))}
                  </div>

                  {/* SEE MORE / SEE LESS */}
                  <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "3rem" }}>
                    {hasMore && (
                      <button
                        onClick={() => setVisibleCount(c => c + 9)}
                        className="cta-btn"
                        style={{ fontSize: "0.82rem", gap: "10px", color: "#fff", borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.06)" }}
                      >
                        See more
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
                        </svg>
                      </button>
                    )}
                    {visibleCount > 9 && (
                      <button
                        onClick={() => { setVisibleCount(9); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="cta-btn"
                        style={{ fontSize: "0.82rem", gap: "10px", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.1)", background: "transparent" }}
                      >
                        See less
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </>);
              })()}

              {/* BOTTOM CTA */}
              <FadeIn delay={0.3}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem", marginTop: "4rem", padding: "3rem 2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <p style={{ fontFamily: "'Zilla Slab', serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 400, color: "#fff", textAlign: "center", lineHeight: 1.4 }}>
                    Ready to start your journey?<br /><em style={{ color: "rgba(255,255,255,0.45)", fontStyle: "italic" }}>Let's start now.</em>
                  </p>
                  <ShineBtn href="https://x.com/framedmotion">Message me</ShineBtn>
                </div>
              </FadeIn>
            </div>
          </section>

        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        padding: "2.5rem clamp(1.5rem, 5vw, 4rem)",
        borderTop: `1px solid ${t.border}`,
        display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center",
        gap: "1rem",
        position: "relative", zIndex: 1, overflow: "hidden",
        minHeight: "72px",
      }}>
        {/* FaultyTerminal background */}
        <FaultyTerminal
          scale={1.2}
          gridMul={[2, 1]}
          digitSize={1.5}
          timeScale={0.22}
          scanlineIntensity={0.25}
          noiseAmp={0.5}
          flickerAmount={0.5}
          tint={[1.0, 1.0, 1.0]}
          brightness={0.32}
          style={{ zIndex: 0 }}
        />
        {/* Dark overlay */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to right, rgba(17,17,16,0.72) 0%, rgba(17,17,16,0.45) 50%, rgba(17,17,16,0.72) 100%)",
          pointerEvents: "none",
        }} />
        {/* Left: name */}
        <span style={{ fontFamily: "'Lora', serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", position: "relative", zIndex: 2 }}>{data.name}</span>
        {/* Centre: Twitter/X */}
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", position: "relative", zIndex: 2 }}>
          {data.contact.links.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.85)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
            >{l.label}</a>
          ))}
        </div>
        {/* Right: copyright */}
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em", textAlign: "right", position: "relative", zIndex: 2 }}>© {new Date().getFullYear()} — All rights reserved</span>
      </footer>

      </div>
    </div>
  );
}
