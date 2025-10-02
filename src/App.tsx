import React, { useEffect, useMemo, useState } from "react";
import {
  Download,
  Instagram,
  Linkedin,
  Github,
  Mail,
  ArrowDown,
  Code,
  Database,
  Palette,
  Smartphone,
  Globe,
  Zap,
  Menu,
  X,
} from "lucide-react";

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // headshot path (served from /public)
  const headshotSrc = "/images/headshot.jpeg";
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
    { id: "skills", label: "Skills", color: "from-fuchsia-400 to-fuchsia-500" },
    { id: "timeline", label: "Journey", color: "from-amber-400 to-amber-500" },
    { id: "contact", label: "Contact", color: "from-violet-400 to-violet-500" },
  ];
  
  const holdHoverColor: Record<string, string> = {
    home:    "group-hover:text-emerald-400",
    about:   "group-hover:text-sky-400",
    skills:  "group-hover:text-fuchsia-400",
    timeline:"group-hover:text-amber-300",
    contact: "group-hover:text-violet-400",
  };

  const skills = [
    { name: "React", icon: Code },
    { name: "Node.js", icon: Database },
    { name: "UI/UX", icon: Palette },
    { name: "Mobile", icon: Smartphone },
    { name: "Web Dev", icon: Globe },
    { name: "Performance", icon: Zap },
  ];

  const timeline = [
    { date: "2024", title: "Senior Developer", desc: "Led team of 5 engineers", grade: "V7" },
    { date: "2023", title: "Full Stack Project", desc: "Built SaaS platform", grade: "V5" },
    { date: "2022", title: "Open Source", desc: "Major contributor", grade: "V4" },
    { date: "2021", title: "First Dev Role", desc: "Started journey", grade: "V2" },
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
    { icon: Download,  label: "Resume",   shape: JugHold,   href: "/resume.pdf" },
    { icon: Instagram, label: "Instagram",shape: PinchHold, href: "https://instagram.com/_apekel_" },
    { icon: Linkedin,  label: "LinkedIn", shape: SlopeHold, href: "https://www.linkedin.com/in/adilpekel" },
    { icon: Github,    label: "GitHub",   shape: PocketHold,href: "https://github.com/AdilPekel" },
  ];

  // Hero background holds with parallax translate + spin
  const bgHolds = useMemo(
    () => [
      { Comp: VolumeHold, left: "6%", top: "18%", size: 180, rot: -8, color: "rgba(147,197,253,0.06)", speed: 0.02, spin: 0.05 },
      { Comp: JugHold, left: "18%", top: "32%", size: 140, rot: -4, color: "rgba(16,185,129,0.07)", speed: 0.05, spin: -0.07 },
      { Comp: CrimpHold, left: "35%", top: "20%", size: 140, rot: 6, color: "rgba(250,204,21,0.06)", speed: 0.03, spin: 0.09 },
      { Comp: ScrewOn, left: "12%", top: "55%", size: 90, rot: -2, color: "rgba(244,114,182,0.08)", speed: 0.06, spin: -0.12 },
      { Comp: PinchHold, left: "74%", top: "22%", size: 150, rot: 10, color: "rgba(94,234,212,0.06)", speed: 0.02, spin: 0.04 },
      { Comp: SlopeHold, left: "82%", top: "48%", size: 170, rot: -12, color: "rgba(209,213,219,0.06)", speed: 0.04, spin: -0.06 },
      { Comp: PocketHold, left: "68%", top: "68%", size: 160, rot: -6, color: "rgba(167,139,250,0.07)", speed: 0.05, spin: 0.08 },
      { Comp: ScrewOn, left: "58%", top: "12%", size: 80, rot: 4, color: "rgba(96,165,250,0.08)", speed: 0.03, spin: -0.1 },
      { Comp: CrimpHold, left: "8%", top: "78%", size: 150, rot: -4, color: "rgba(251,191,36,0.06)", speed: 0.02, spin: 0.06 },
      { Comp: JugHold, left: "44%", top: "70%", size: 170, rot: 2, color: "rgba(45,212,191,0.06)", speed: 0.04, spin: -0.05 },
      { Comp: ScrewOn, left: "36%", top: "86%", size: 70, rot: 8, color: "rgba(248,113,113,0.08)", speed: 0.05, spin: 0.12 },
      { Comp: PocketHold, left: "86%", top: "78%", size: 140, rot: 0, color: "rgba(147,197,253,0.06)", speed: 0.03, spin: -0.07 },
    ],
    []
  );

  return (
    <div className="min-h-screen text-white">
      {/* ===== NAV ===== */}
      <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-light tracking-wider">
              <span className="text-white/90">ADIL</span>
              <span className="text-emerald-400 ml-1">PEKEL</span>
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
                          activeSection === item.id ? "text-white opacity-100" : `text-white/10 ${holdHoverColor[item.id]} group-hover:opacity-100`
                        }`}
                      />
                    </div>
                    <span
                      className={`relative z-10 text-xs font-medium tracking-wide transition-all duration-300 ${
                        activeSection === item.id ? "text-white" : "text-white/60 group-hover:text-white/90"
                      }`}
                    >
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
        {/* Background holds with parallax + spin */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {bgHolds.map((h, i) => {
            const T = (h as any).speed * scrollY;
            const rot = (h as any).rot + scrollY * (h as any).spin;
            const Comp: any = (h as any).Comp;
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: (h as any).left,
                  top: (h as any).top,
                  color: (h as any).color,
                  width: (h as any).size,
                  height: (h as any).size,
                  transform: `translateY(${T}px) rotate(${rot}deg)`,
                  transformOrigin: "50% 50%",
                  willChange: "transform",
                }}
              >
                <Comp className="w-full h-full" />
              </div>
            );
          })}
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-thin tracking-wide mb-4">
            <span className="text-white/90">ADIL</span>
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-gradient ml-3">PEKEL</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base tracking-widest uppercase mb-16">Full Stack Developer</p>
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
            {!imgFailed ? (
              <img
                src={headshotSrc}
                onError={() => setImgFailed(true)}
                alt="Adil Pekel headshot"
                className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border border-white/10 shadow-[0_0_0_4px_rgba(255,255,255,0.03)]"
              />
            ) : (
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 border border-white/10 flex items-center justify-center text-white/70 font-medium">
                AP
              </div>
            )}
          </div>

          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-white/70 leading-relaxed font-light">
              Full-stack developer with a passion for creating elegant, innovative solutions. Each project is a unique
              problem to solve—finding the right approach, testing different routes, and pushing through to reach new
              heights.
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
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                    <Shape className="w-24 h-24 text-white" />
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

      {/* ===== SKILLS ===== */}
      <section id="skills" className="py-24 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-thin text-center mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gradient">Skills</span>
          </h2>
        <p className="text-center text-white/40 text-sm uppercase tracking-widest mb-12">Technical Grip Strength</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {skills.map((skill, i) => {
              const Icon = skill.icon as any;
              const HoldShape = holdShapes[i % holdShapes.length] as any;
              return (
                <div key={i} className="relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <HoldShape className="w-32 h-32 text-white/10 group-hover:text-white/20 transition-all duration-500 group-hover:scale-110" />
                  </div>
                  <div className="relative z-10 bg-white/[0.02] border border-white/5 p-8 rounded-2xl transition-all duration-500 hover:bg-white/[0.05] hover:border-white/10">
                    <Icon className="w-6 h-6 mx-auto mb-3 text-white/60 group-hover:text-white/90 transition-colors" />
                    <h3 className="text-sm text-center text-white/70 font-light tracking-wide">{skill.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE (wavy route) ===== */}
      <section id="timeline" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-thin text-center mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-gradient">Journey</span>
          </h2>
          <p className="text-center text-white/40 text-sm uppercase tracking-widest mb-12">Climbing Route Beta</p>

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
              const HoldShape = holdShapes[(i + 2) % holdShapes.length] as any;
              const xOffsets = [-28, 22, -20, 18];
              const markerOffset = xOffsets[i % xOffsets.length];
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

                  {/* Hold marker offset along the rope */}
                  <div className="relative z-10 p-2" style={{ transform: `translateX(${markerOffset}px)` }}>
                    <HoldShape className="w-10 h-10 text-white/20 transition-all duration-500 hover:text-white/40 hover:scale-110" />
                  </div>

                  <div className="w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CONTACT (smaller, jug background) ===== */}
      <section id="contact" className="py-24 bg-white/[0.01]">
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
                  href="mailto:contact@adilpekel.com"
                  className="inline-flex items-center gap-3 px-7 py-2.5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-950 rounded-full hover:shadow-lg hover:shadow-emerald-400/20 transition-all duration-300 group"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-medium text-sm">Get In Touch</span>
                </a>

                <p className="text-white/40 text-sm mt-8 font-light">Ready to tackle your next big project together</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-white/20 text-xs font-light tracking-wide">© 2024 Adil Pekel · Built with precision and passion</p>
        </div>
      </footer>

      {/* local style helper for gradient text (not styled-jsx) */}
      <style>{`
        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
