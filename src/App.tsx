import React, { useEffect, useMemo, useState } from "react";
import {
  Download,
  Instagram,
  Linkedin,
  Github,
  Mail,
  ArrowDown,
  Menu,
  X,
} from "lucide-react";

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // headshot path (served from /public)
  const headshotSrc = "/images/headshot.jpg";
  const gymSrc = "/images/BPSL.webp"; // place your photo at public/images/gym.jpg
  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || window.pageYOffset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Start", color: "from-emerald-400 to-emerald-500" },
    { id: "about", label: "About", color: "from-blue-400 to-blue-500" },
    { id: "timeline", label: "Journey", color: "from-amber-400 to-amber-500" },
    { id: "contact", label: "Contact", color: "from-violet-400 to-violet-500" },
  ];
  
  const holdHoverColor: Record<string, string> = {
    home:    "group-hover:text-emerald-400",
    about:   "group-hover:text-sky-400",
    timeline:"group-hover:text-amber-300",
    contact: "group-hover:text-violet-400",
  };

  const holdActiveColor: Record<string, string> = {
    home: "text-emerald-400",
    about: "text-sky-400",
    timeline: "text-amber-300",
    contact: "text-violet-400",
  };

  // Skills section removed

  const timeline = [
    { date: "202X", title: "SWE Intern", desc: "Coming Soon...", grade: "V9" },
    { date: "2028", title: "AI Masters", desc: "UT Austin", grade: "V7" },
    { date: "2026", title: "CS Bachelors", desc: "Arizona State University", grade: "V5" },
    { date: "2024", title: "IT Intern", desc: "CS&S Computer Systems", grade: "V3" },
  ];

  // ---------- SVG Hold Shapes (with bolt holes & shading) ----------
  const Bolt: React.FC<{ cx: number; cy: number; r?: number }> = ({ cx, cy, r = 3 }) => (
    <>
      <circle cx={cx} cy={cy} r={r} fill="#0b0b0b" opacity="0.6" />
      <circle cx={cx} cy={cy} r={r - 1} fill="#1a1a1a" opacity="0.7" />
    </>
  );

  const JugHold: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 120 90" className={className} aria-label="Jug hold">
      <defs>
        <linearGradient id="jugHighlight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <path d="M12,55 C12,28 38,10 60,10 S108,28 108,55 88,78 60,78 12,82 12,55 Z" fill="currentColor" />
      <path d="M20,48 C30,32 92,32 102,48 96,58 84,65 68,70 50,75 30,71 20,48Z" fill="url(#jugHighlight)" />
      <path d="M26,54 C34,44 86,44 94,54 88,60 79,64 66,68 50,72 36,68 26,54Z" fill="#000" opacity="0.18" />
      <Bolt cx={46} cy={58} r={3.2} />
      <Bolt cx={78} cy={60} r={3.2} />
    </svg>
  );

  const CrimpHold: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 120 50" className={className} aria-label="Crimp hold">
      <path d="M8,35 C28,14 92,14 112,35 L112,45 L8,45 Z" fill="currentColor" />
      <rect x="10" y="32" width="100" height="4" rx="2" fill="#fff" opacity="0.16" />
      <rect x="10" y="38" width="100" height="5" rx="2" fill="#000" opacity="0.25" />
      <Bolt cx={36} cy={40} />
      <Bolt cx={86} cy={41} />
    </svg>
  );

  const SlopeHold: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 110 90" className={className} aria-label="Sloper hold">
      <defs>
        <radialGradient id="slopeLight" cx="30%" cy="25%" r="70%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <path d="M10,70 C18,30 90,10 98,38 102,52 86,78 58,82 36,85 18,82 10,70 Z" fill="currentColor" />
      <path d="M10,70 C18,30 90,10 98,38 102,52 86,78 58,82 36,85 18,82 10,70 Z" fill="url(#slopeLight)" />
      <Bolt cx={62} cy={64} />
    </svg>
  );

  const PinchHold: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 60 110" className={className} aria-label="Pinch hold">
      <path d="M30,8 C46,14 54,34 54,55 54,76 46,96 30,102 14,96 6,76 6,55 6,34 14,14 30,8 Z" fill="currentColor" />
      <path d="M12,52 C20,48 40,48 48,52 46,56 44,60 40,64 34,70 26,70 20,64 16,60 14,56 12,52 Z" fill="#000" opacity="0.2" />
      <Bolt cx={30} cy={30} />
      <Bolt cx={30} cy={80} />
    </svg>
  );

  const PocketHold: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 110 110" className={className} aria-label="Pocket hold">
      <defs>
        <radialGradient id="pocketShade" cx="50%" cy="45%" r="45%">
          <stop offset="0" stopColor="#000" stopOpacity="0.35" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="55" cy="55" r="44" fill="currentColor" />
      <circle cx="55" cy="55" r="22" fill="#000" opacity="0.4" />
      <circle cx="50" cy="50" r="22" fill="url(#pocketShade)" />
      <Bolt cx={70} cy={36} />
      <Bolt cx={38} cy={74} />
    </svg>
  );

  const VolumeHold: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 120 100" className={className} aria-label="Volume">
      <polygon points="12,88 60,12 108,88" fill="currentColor" />
      <polygon points="12,88 60,12 48,88" fill="#000" opacity="0.25" />
      <polygon points="108,88 60,12 72,88" fill="#fff" opacity="0.12" />
      <Bolt cx={60} cy={70} />
      <Bolt cx={42} cy={78} />
      <Bolt cx={78} cy={78} />
    </svg>
  );

  const ScrewOn: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 70 30" className={className} aria-label="Screw-on hold">
      <rect x="6" y="6" width="58" height="18" rx="6" fill="currentColor" />
      <Bolt cx={20} cy={15} r={2.4} />
      <Bolt cx={50} cy={15} r={2.4} />
    </svg>
  );

  const holdShapes = [JugHold, CrimpHold, SlopeHold, PinchHold, PocketHold, VolumeHold];

  const links = [
    { icon: Download,  label: "Resume",   shape: JugHold,   href: resumeHref },
    { icon: Instagram, label: "Instagram",shape: PinchHold, href: "https://instagram.com/_apekel_" },
    { icon: Linkedin,  label: "LinkedIn", shape: SlopeHold, href: "https://www.linkedin.com/in/adilpekel" },
    { icon: Github,    label: "GitHub",   shape: PocketHold,href: "https://github.com/AdilPekel" },
  ];

  // Base tint + hover color for each social hold (match order of `links`)
  const socialHoldBase = [
    "text-emerald-400/30", // Resume
    "text-rose-400/30",    // Instagram
    "text-sky-400/30",     // LinkedIn
    "text-violet-400/30",  // GitHub
  ];

  const socialHoldHover = [
    "group-hover:text-emerald-400",
    "group-hover:text-rose-400",
    "group-hover:text-sky-400",
    "group-hover:text-violet-400",
  ];

  // Hero background holds with parallax translate + spin
  const bgHolds = useMemo(
    () => [
      { Comp: VolumeHold, left: "6%",  top: "18%", size: 180, rot: -8,  baseColor: "rgba(147,197,253,0.06)", flashColor: "rgba(147,197,253,0.55)", speed: 0.02, spin: 0.05 },
      { Comp: JugHold,    left: "18%", top: "32%", size: 140, rot: -4,  baseColor: "rgba(16,185,129,0.07)",  flashColor: "rgba(16,185,129,0.60)",  speed: 0.05, spin: -0.07 },
      { Comp: CrimpHold,  left: "35%", top: "20%", size: 140, rot: 6,   baseColor: "rgba(250,204,21,0.06)",  flashColor: "rgba(250,204,21,0.60)",  speed: 0.03, spin: 0.09 },
      { Comp: ScrewOn,    left: "12%", top: "55%", size: 90,  rot: -2,  baseColor: "rgba(244,114,182,0.08)", flashColor: "rgba(244,114,182,0.60)", speed: 0.06, spin: -0.12 },
      { Comp: PinchHold,  left: "74%", top: "22%", size: 150, rot: 10,  baseColor: "rgba(94,234,212,0.06)",  flashColor: "rgba(94,234,212,0.50)",  speed: 0.02, spin: 0.04 },
      { Comp: SlopeHold,  left: "82%", top: "48%", size: 170, rot: -12, baseColor: "rgba(209,213,219,0.06)", flashColor: "rgba(209,213,219,0.45)", speed: 0.04, spin: -0.06 },
      { Comp: PocketHold, left: "68%", top: "68%", size: 160, rot: -6,  baseColor: "rgba(167,139,250,0.07)", flashColor: "rgba(167,139,250,0.55)", speed: 0.05, spin: 0.08 },
      { Comp: ScrewOn,    left: "58%", top: "12%", size: 80,  rot: 4,   baseColor: "rgba(96,165,250,0.08)",  flashColor: "rgba(96,165,250,0.55)",  speed: 0.03, spin: -0.10 },
      { Comp: CrimpHold,  left: "8%",  top: "78%", size: 150, rot: -4,  baseColor: "rgba(251,191,36,0.06)",  flashColor: "rgba(251,191,36,0.60)",  speed: 0.02, spin: 0.06 },
      { Comp: JugHold,    left: "44%", top: "70%", size: 170, rot: 2,   baseColor: "rgba(45,212,191,0.06)",  flashColor: "rgba(45,212,191,0.55)",  speed: 0.04, spin: -0.05 },
      { Comp: ScrewOn,    left: "36%", top: "86%", size: 70,  rot: 8,   baseColor: "rgba(248,113,113,0.08)", flashColor: "rgba(248,113,113,0.60)", speed: 0.05, spin: 0.12 },
      { Comp: PocketHold, left: "86%", top: "78%", size: 140, rot: 0,   baseColor: "rgba(147,197,253,0.06)", flashColor: "rgba(147,197,253,0.55)", speed: 0.03, spin: -0.07 },
    ],
    []
  );

  // --- Random flash config ---
  const FLASH_ON_MS = 1000;            // how long a hold stays bright
  const MIN_GAP_MS = 600;              // min time between flashes
  const MAX_GAP_MS = 2000;             // max time between flashes

  // Track which holds are flashing (by index)
  const [flashing, setFlashing] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isTouch || isMobile) return; 
    let mounted = true;
    let scheduleId: number | undefined;

    const scheduleNext = () => {
      const gap = MIN_GAP_MS + Math.random() * (MAX_GAP_MS - MIN_GAP_MS);
      scheduleId = window.setTimeout(triggerFlash, gap);
    };

    const triggerFlash = () => {
      if (!mounted || bgHolds.length === 0) return;
      const idx = Math.floor(Math.random() * bgHolds.length);

      // turn one on
      setFlashing(prev => {
        const next = new Set(prev);
        next.add(idx);
        return next;
      });

      // turn it off after FLASH_ON_MS, then schedule the next one
      window.setTimeout(() => {
        if (!mounted) return;
        setFlashing(prev => {
          const next = new Set(prev);
          next.delete(idx);
          return next;
        });
        scheduleNext();
      }, FLASH_ON_MS);
    };

    scheduleNext();
    return () => { mounted = false; if (scheduleId) clearTimeout(scheduleId); };
  }, [bgHolds.length]);

  // --- Drag-to-scroll on holds ---
  const DRAG_FACTOR = 1.4; // higher = faster scroll per pixel of drag
  const DRAG_DIR = -1;

  type DragState = { active: boolean; startY: number; startScroll: number; idx: number | null };
  const [drag, setDrag] = useState<DragState>({ active: false, startY: 0, startScroll: 0, idx: null });

  const startDrag = (idx: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouch || isMobile || e.pointerType === "touch") return;
    if (e.button !== 0) return; // left click only
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setDrag({ active: true, startY: e.clientY, startScroll: window.scrollY, idx });
  };

  useEffect(() => {
    if (!drag.active) return;

    const onMove = (e: PointerEvent) => {
      const dy = (e.clientY - drag.startY) * DRAG_DIR; // ← apply direction
      const next = drag.startScroll + dy * DRAG_FACTOR;
      window.scrollTo({ top: next, behavior: "auto" });
    };

    const end = () => setDrag(d => ({ ...d, active: false, idx: null }));

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [drag.active, drag.startY, drag.startScroll]);

  // Random hint position on the Start screen (kept stable after mount)
  const [hintPos] = useState(() => {
    const left = 12 + Math.random() * 76; // 12%..88% (avoid edges)
    const top  = 30 + Math.random() * 50; // 30%..80% (below nav)
    return { left, top };
  });

  const [isTouch, setIsTouch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const coarse = window.matchMedia?.("(pointer: coarse)").matches;
      const hasTouch = "ontouchstart" in window || (navigator as any).maxTouchPoints > 0;
      setIsTouch(Boolean(coarse || hasTouch));
      setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="min-h-screen text-white">
      {/* ===== NAV ===== */}
      <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-light tracking-wider">
              <span className="text-white/90">A</span>
              <span className="text-emerald-400">P</span>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, i) => {
                const HoldShape = holdShapes[i % holdShapes.length];
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative group px-4 py-2 transition-all duration-300"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <HoldShape
                        className={`w-12 h-12 transition-all duration-300 ${
                          activeSection === item.id ? `${holdActiveColor[item.id]} opacity-100` : `text-white/10 ${holdHoverColor[item.id]} group-hover:opacity-100`
                        }`}
                      />
                    </div>
                    <span className="relative z-10 text-xs font-medium tracking-wide text-white">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white/60">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-white/5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-6 py-3 text-white/60 hover:text-white transition-colors text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section id="home" className="min-h-screen flex items-center justify-center relative bg-gray-950">
        {!isTouch && !isMobile && (
          <div className="absolute inset-0 overflow-hidden select-none">
            {bgHolds.map((h, i) => {
              const T   = (h as any).speed * scrollY;
              const rot = (h as any).rot + scrollY * (h as any).spin;
              const Comp: any = (h as any).Comp;

              const isFlashing = flashing.has(i);
              const grabbed    = drag.active && drag.idx === i;

              const displayColor = grabbed
                ? (h as any).flashColor
                : (isFlashing ? (h as any).flashColor : (h as any).baseColor);

              return (
                <div
                  key={i}
                  onPointerDown={startDrag(i)}
                  className="hold-drag absolute pointer-events-auto transition-all duration-200"
                  style={{
                    left:  (h as any).left,
                    top:   (h as any).top,
                    color: displayColor,
                    width: (h as any).size,
                    height:(h as any).size,
                    transform: `translateY(${T}px) rotate(${rot}deg)${grabbed ? " scale(1.06)" : ""}`,
                    transformOrigin: "50% 50%",
                    willChange: "transform",
                    zIndex: grabbed ? 20 : 1,
                    filter: grabbed
                      ? "saturate(1.75) contrast(1.15) drop-shadow(0 8px 14px rgba(0,0,0,.28))"
                      : (isFlashing ? "saturate(1.5) contrast(1.1)" : "none"),
                    touchAction: "none",
                  }}
                  aria-label="Climbing hold"
                >
                  <Comp className="w-full h-full" />
                </div>
              );
            })}
            <div
              style={{ left: `${hintPos.left}%`, top: `${hintPos.top}%`, transform: `translate(-50%, -50%)` }}
              className="absolute z-20 pointer-events-none select-none"
            >
              <span className="font-fun tip-wiggle text-xs md:text-sm text-emerald-200/90 px-3 py-1">
                * click & drag a climbing hold *
              </span>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-6 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-thin tracking-wide mb-4">
            <span className="text-white/90">ADIL</span>
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-gradient ml-3">PEKEL</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base tracking-widest uppercase mb-16">Machine Learning Engineer</p>
          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-white/20 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-thin text-center mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 text-gradient">About</span>
          </h2>
          <p className="text-center text-white/40 text-sm uppercase tracking-widest mb-6">Climbing Through Code</p>

          <div className="flex justify-center mb-10">
            <div className="relative w-80 h-80 md:w-92 md:h-92 rounded-full overflow-hidden border border-white/10 shadow-[0_0_0_4px_rgba(255,255,255,0.03)]">
              {!imgFailed ? (
                <img
                  src={headshotSrc}
                  onError={() => setImgFailed(true)}
                  alt="Adil Pekel headshot"
                  className="absolute inset-0 w-full h-full object-cover
                            transition-transform duration-700 ease-out
                            scale-[1.75]"
                  style={{ transformOrigin: '40% 18%', objectPosition: '50% 40%' }} // tweak crop center
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20
                                flex items-center justify-center text-white/70 font-medium">
                  AP
                </div>
              )}
            </div>
          </div>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-white/70 leading-relaxed font-light">
              I’m a Computer Science student at Arizona State University planning a master’s in AI. 
              I’m focused on applied machine learning with a strong interest in game development using reinforcement learning. 
              I’m looking for internships or research where I can train decision-making models, build reliable ML pipelines, and apply AI to real gameplay and tools.
            </p>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {links.map((link, i) => {
              const Icon = link.icon as any;
              const Shape = link.shape as any;
              const isExternal = link.href.startsWith("http");
              return (
                <a
                  key={i}
                  href={link.href}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="relative group bg-white/[0.02] border border-white/5 p-8 rounded-2xl transition-all duration-500 hover:bg-white/[0.05] hover:border-white/10"
                >
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-20 group-hover:opacity-90">
                    <Shape
                      className={`w-24 h-24 transition-colors duration-300
                                  ${socialHoldBase[i]} ${socialHoldHover[i]}`}
                    />
                  </div>
                  <Icon className="w-5 h-5 mx-auto mb-3 text-white/60 group-hover:text-white/90 transition-colors relative z-10" />
                  <span className="block text-xs text-white/40 group-hover:text-white/70 transition-colors font-light tracking-wide relative z-10 text-center">
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills section removed */}

      {/* ===== TIMELINE (wavy route) ===== */}
      <section id="timeline" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-thin text-center mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-gradient">Journey</span>
          </h2>
          <p className="text-center text-white/40 text-sm uppercase tracking-widest mb-12">My Climbing Route</p>

          <div className="relative max-w-3xl mx-auto">
            {/* Wavy rope path */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="ropeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="40%" stopColor="rgba(255,255,255,0.28)" />
                  <stop offset="60%" stopColor="rgba(255,255,255,0.28)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <path
                d="M50,0 C70,8 80,20 62,30 S28,48 40,60 S72,78 54,90"
                fill="none"
                stroke="url(#ropeGrad)"
                strokeWidth="1.2"
              />
            </svg>
            {timeline.map((item, i) => {
              const leftRight = i % 2 === 0 ? "flex-row" : "flex-row-reverse";
              return (
                <div key={i} className={`flex items-center mb-16 ${leftRight}`}>
                  <div className={`w-1/2 ${i % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                    <div className="group">
                      <span
                        className={`inline-block px-3 py-1 text-xs rounded-full mb-3 font-light tracking-wide bg-gradient-to-r ${
                          ["from-red-400 to-orange-400", "from-amber-400 to-yellow-400", "from-emerald-400 to-green-400", "from-cyan-400 to-blue-400"][i]
                        } text-gray-950`}
                      >
                        {item.grade}
                      </span>
                      <h3 className="text-lg font-light text-white/90 mb-1">{item.title}</h3>
                      <p className="text-sm text-white/50 font-light mb-2">{item.desc}</p>
                      <span className="text-xs text-white/30">{item.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOME GYM ===== */}
      <section id="gym" className="py-4">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-thin text-center mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-gradient">
              Bouldering Gym
            </span>
          </h2>

          <p className="text-center text-white/60 text-sm md:text-base max-w-3xl mx-auto mb-8">
            If you couldn’t tell from the theme already, I love climbing.
            If you want to come and connect,
            I’m usually always at AZBP.
          </p>

          <figure className="relative max-w-3xl mx-auto group">
            <img
              src={gymSrc}
              alt="My home bouldering gym"
              className="w-full h-72 md:h-[420px] object-cover rounded-2xl
                        border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            />
            {/* subtle top-to-bottom fade for depth on dark theme */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl
                            bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
          </figure>
        </div>
      </section>

      {/* ===== CONTACT (smaller, jug background) ===== */}
      <section id="contact" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-thin text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-gradient">Contact</span>
          </h2>

          <p className="text-center text-white/40 text-sm uppercase tracking-widest mb-10">Send Your Beta</p>

          <div className="max-w-md mx-auto text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <JugHold className="w-56 h-56 text-white" />
              </div>
              <div className="relative z-10 bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
                <a
                  href="mailto:apekel@asu.edu"
                  className="inline-flex items-center gap-3 px-7 py-2.5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-950 rounded-full hover:shadow-lg hover:shadow-emerald-400/20 transition-all duration-300 group"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-medium text-sm">Get In Touch</span>
                </a>
                <p className="text-white/40 text-sm mt-2 font-light">apekel@asu.edu</p>
                <p className="text-white/40 text-sm mt-2 font-light">Ready to tackle any problem together</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-white/20 text-xs font-light tracking-wide">© 2025 Adil Pekel · Built with technique and tons of beta ;)</p>
        </div>
      </footer>

      {/* local style helper for gradient text (not styled-jsx) */}
      <style>{`
          .text-gradient {
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          /* show arrow by default, hand on hover, closed hand while dragging */
          .hold-drag { cursor: default; }
          .hold-drag:hover { cursor: grab; cursor: -webkit-grab; }
          .hold-drag:active { cursor: grabbing; cursor: -webkit-grabbing; }

          .font-fun { 
            font-family: 'Indie Flower','Comic Sans MS',ui-sans-serif,system-ui,cursive;
            letter-spacing: .02em;
          }
          .tip-wiggle { 
            display: inline-block;
            animation: tip-wiggle 4s ease-in-out infinite;
          }
          @keyframes tip-wiggle {
            0%, 100% { transform: rotate(-5deg); }
            50%      { transform: rotate(5deg); }
          }
        }
      `}</style>
    </div>
  );
}
