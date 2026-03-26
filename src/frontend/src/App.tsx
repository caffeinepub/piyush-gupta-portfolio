import { useCallback, useEffect, useRef, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  color: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
const SKILLS = [
  {
    label: "Python",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
  },
  {
    label: "Java",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
  },
  {
    label: "SQL",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg",
  },
  {
    label: "Pandas",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg",
  },
  {
    label: "NumPy",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg",
  },
  {
    label: "Matplotlib",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg",
  },
  {
    label: "Seaborn",
    icon: "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg",
  },
  {
    label: "HTML",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
  },
  {
    label: "CSS",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg",
  },
  {
    label: "JavaScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
  },
  {
    label: "Git",
    icon: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
  },
  {
    label: "Jupyter",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jupyter/jupyter-original-wordmark.svg",
  },
  {
    label: "VS Code",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg",
  },
  {
    label: "Excel",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg",
  },
  {
    label: "Tableau",
    icon: "https://www.vectorlogo.zone/logos/tableau/tableau-icon.svg",
  },
];

const PROJECTS = [
  {
    icon: "📊",
    title: "Airbnb NYC Data Analysis",
    desc: "Exploratory data analysis on Airbnb NYC dataset uncovering pricing trends, availability patterns, and neighborhood insights using Python data libraries.",
    github: "https://github.com/707Piyush/EDA.git",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "EDA"],
  },
  {
    icon: "🖥️",
    title: "Mac Soft App",
    desc: "Feature-rich desktop application built with Python and Tkinter. Includes live weather updates, system controls, and utility modules with an intuitive interface.",
    github: "https://github.com/Piyush7077/mac-soft-app.git",
    tags: ["Python", "Tkinter", "Desktop", "Weather API"],
  },
  {
    icon: "🌐",
    title: "Translation Website",
    desc: "Responsive language translation web tool built with pure HTML, CSS, and JavaScript. Features clean UI design and real-time translation functionality.",
    github: "",
    tags: ["HTML", "CSS", "JavaScript", "Web Dev"],
  },
];

const CERTS = [
  {
    icon: "🐍",
    name: "Python Bootcamp",
    sub: "Certificate of Completion",
    link: "https://drive.google.com/file/d/1nyUED7UemLh33gmjmATKvPqK-4b6vqrg/view?usp=drive_link",
  },
  {
    icon: "☕",
    name: "Java Fundamentals",
    sub: "Skillstone Training Certificate",
    link: "https://drive.google.com/file/d/1-OxPcALkTIAHYEgDzd6pF5acJEbe8Fee/view?usp=drive_link",
  },
  {
    icon: "🌐",
    name: "Responsive Web Design",
    sub: "freeCodeCamp Certification",
    link: "https://drive.google.com/file/d/1RY61HW1bX-n-Dh3Ka-FXeiP2Y7fIAW5H/view?usp=drive_link",
  },
];

const ROLES = [
  "Data Science & ML Engineer",
  "Python Developer",
  "Data Analyst",
  "EDA Specialist",
];
const CV_LINK =
  "https://drive.google.com/file/d/1JGgLi5CpiR2bhjxtZ--JPSjUHD0Dqun2/view?usp=drive_link";

// ── SVG Icons ──────────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
  </svg>
);
const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.4 3.14 2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20"
    height="20"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const DocIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="14"
    height="14"
    aria-hidden="true"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <line x1="9" y1="15" x2="15" y2="15" />
  </svg>
);
const ChevronUp = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

// ── Particle canvas ────────────────────────────────────────────────────────
function useParticleCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let animId = 0;

    const particles: Particle[] = [];
    const COLORS = [
      "rgba(79,142,255,",
      "rgba(34,211,163,",
      "rgba(167,139,250,",
    ];

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }

    function newParticle(): Particle {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        life: 0,
        maxLife: Math.random() * 200 + 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    }

    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 80; i++) particles.push(newParticle());

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;
        if (p.life > p.maxLife || p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          Object.assign(p, newParticle());
        }
        const alpha =
          p.life < 30
            ? p.life / 30
            : p.life > p.maxLife - 30
              ? (p.maxLife - p.life) / 30
              : 1;
        ctx!.fillStyle = `${p.color + alpha * 0.6})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx!.strokeStyle = `rgba(79,142,255,${0.06 * (1 - dist / 100)})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [canvasRef]);
}

// ── Typing hook ────────────────────────────────────────────────────────────
function useTyping(roles: string[], delay = 1500) {
  const [text, setText] = useState("");
  useEffect(() => {
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const current = roles[roleIdx];
      if (!deleting) {
        setText(current.slice(0, charIdx + 1));
        charIdx++;
        if (charIdx === current.length) {
          timer = setTimeout(() => {
            deleting = true;
            tick();
          }, 2200);
          return;
        }
      } else {
        setText(current.slice(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      timer = setTimeout(tick, deleting ? 40 : 70);
    }

    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [roles, delay]);
  return text;
}

// ── Scroll reveal hook ─────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          const e = entries[i];
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 60);
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1 },
    );
    for (const el of els) {
      obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useParticleCanvas(canvasRef);
  const roleText = useTyping(ROLES);
  useScrollReveal();

  // Cursor glow
  useEffect(() => {
    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let id = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const animate = () => {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cx}px`;
        cursorRef.current.style.top = `${cy}px`;
      }
      id = requestAnimationFrame(animate);
    };
    document.addEventListener("mousemove", onMove);
    animate();
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  // Scroll
  useEffect(() => {
    const onScroll = () => {
      const pct =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      setScrollPct(pct);
      setNavScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Project card mouse glow
  const handleCardMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mx",
      `${((e.clientX - r.left) / r.width) * 100}%`,
    );
    e.currentTarget.style.setProperty(
      "--my",
      `${((e.clientY - r.top) / r.height) * 100}%`,
    );
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };

  return (
    <div
      style={{
        background: "var(--p-bg)",
        color: "var(--p-text)",
        minHeight: "100vh",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      {/* ── BG LAYERS ── */}
      <div
        className="grid-bg"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.5,
        }}
      />
      {/* Blobs */}
      <div
        className="blob1"
        style={{
          position: "fixed",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(79,142,255,0.09) 0%,transparent 70%)",
          top: -200,
          right: -150,
          zIndex: 0,
          pointerEvents: "none",
          filter: "blur(130px)",
        }}
      />
      <div
        className="blob2"
        style={{
          position: "fixed",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(34,211,163,0.07) 0%,transparent 70%)",
          bottom: -100,
          left: -100,
          zIndex: 0,
          pointerEvents: "none",
          filter: "blur(130px)",
        }}
      />
      <div
        className="blob3"
        style={{
          position: "fixed",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(167,139,250,0.06) 0%,transparent 70%)",
          top: "40%",
          left: "40%",
          zIndex: 0,
          pointerEvents: "none",
          filter: "blur(130px)",
        }}
      />
      {/* Noise */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          opacity: 0.03,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      {/* Cursor glow */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: 300,
          height: 300,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 1,
          background:
            "radial-gradient(circle,rgba(79,142,255,0.06) 0%,transparent 70%)",
          transform: "translate(-50%,-50%)",
          filter: "blur(20px)",
        }}
      />

      {/* ── SCROLL PROGRESS ── */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* ── NAV ── */}
      <nav
        data-ocid="nav.panel"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 5rem",
          height: 68,
          background: navScrolled ? "rgba(5,8,15,0.95)" : "rgba(5,8,15,0.8)",
          backdropFilter: "blur(28px)",
          borderBottom: navScrolled
            ? "1px solid rgba(79,142,255,0.15)"
            : "1px solid rgba(79,142,255,0.08)",
          transition: "background 0.3s, border-color 0.3s",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.82rem",
            color: "var(--p-accent)",
            letterSpacing: "0.15em",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            className="blink pulse-glow"
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--p-green)",
            }}
          />
          Piyush.dev
        </div>
        <ul
          style={{
            display: "flex",
            gap: 0,
            listStyle: "none",
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          {["about", "skills", "projects", "education", "contact"].map((s) => (
            <li key={s}>
              <button
                type="button"
                data-ocid={`nav.${s}.link`}
                onClick={() => scrollTo(s)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--p-muted)",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.5rem 1.1rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--p-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--p-muted)";
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <a
          href={CV_LINK}
          target="_blank"
          rel="noreferrer"
          data-ocid="nav.cv.button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "0.5rem 1.2rem",
            background: "transparent",
            border: "1px solid var(--p-accent)",
            color: "var(--p-accent)",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: 4,
            transition: "all 0.25s",
            marginLeft: "0.5rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--p-accent)";
            e.currentTarget.style.color = "#05080f";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--p-accent)";
          }}
        >
          <DocIcon /> View CV
        </a>
      </nav>

      {/* ── HERO ── */}
      <section
        id="about"
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "7rem 6vw 6rem",
          overflow: "hidden",
        }}
      >
        {/* ── LEFT DECORATIVE STRIP ── */}
        <div
          className="hero-side-strip hero-side-strip-left"
          aria-hidden="true"
        >
          <div className="hero-side-line" />
          <span className="hero-side-label">Portfolio 2026</span>
          <div className="hero-side-blip" />
          <div className="hero-side-blip hero-side-blip-2" />
          <div className="hero-side-blip hero-side-blip-3" />
        </div>
        {/* ── RIGHT DECORATIVE STRIP ── */}
        <div
          className="hero-side-strip hero-side-strip-right"
          aria-hidden="true"
        >
          <div className="hero-side-line" />
          <span className="hero-side-label">Data Science</span>
          <div className="hero-side-blip" />
          <div className="hero-side-blip hero-side-blip-2" />
          <div className="hero-side-blip hero-side-blip-3" />
        </div>
        {/* LEFT: circular image */}
        <div
          style={{
            flexShrink: 0,
            width: 360,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch",
          }}
        >
          {/* Orbit rings */}
          <div
            className="orbit-spin"
            style={{
              position: "absolute",
              width: 420,
              height: 420,
              borderRadius: "50%",
              border: "1px dashed rgba(79,142,255,0.18)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
          <div
            className="orbit-spin-rev"
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              border: "1px dotted rgba(34,211,163,0.1)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
          {/* Orbit dots */}
          <OrbitDot
            color="var(--p-accent)"
            size={8}
            radius={140}
            duration={20}
          />
          <OrbitDot
            color="var(--p-green)"
            size={6}
            radius={165}
            duration={30}
            reverse
          />
          <OrbitDot
            color="var(--p-orange)"
            size={5}
            radius={115}
            duration={25}
          />

          {/* Circular profile image */}
          <div
            style={{ position: "relative", zIndex: 2 }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const cx = r.left + r.width / 2;
              const cy = r.top + r.height / 2;
              const dx = (e.clientX - cx) / (r.width / 2);
              const dy = (e.clientY - cy) / (r.height / 2);
              const el = e.currentTarget.querySelector(
                ".tilt-img",
              ) as HTMLElement;
              if (el)
                el.style.transform = `perspective(600px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg)`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget.querySelector(
                ".tilt-img",
              ) as HTMLElement;
              if (el)
                el.style.transform =
                  "perspective(600px) rotateY(0deg) rotateX(0deg)";
            }}
          >
            <div
              className="tilt-img"
              style={{
                width: 300,
                height: 300,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid var(--p-accent)",
                boxShadow:
                  "0 0 30px rgba(79,142,255,0.4), 0 0 60px rgba(79,142,255,0.15)",
                flexShrink: 0,
                transition: "transform 0.1s ease",
              }}
            >
              <img
                src="https://i.ibb.co/S7Vdt0p8/photo.jpg"
                alt="Piyush Gupta"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:5rem;background:linear-gradient(135deg,#0c1220,#101828);">👤</div>`;
                  }
                }}
              />
            </div>
            {/* Floating badge */}
            <div
              className="badge-float"
              style={{
                position: "absolute",
                top: 10,
                right: -40,
                background: "rgba(12,18,32,0.92)",
                border: "1px solid rgba(34,211,163,0.35)",
                borderRadius: 14,
                padding: "10px 16px",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                zIndex: 5,
              }}
            >
              <div
                className="blink pulse-glow"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--p-green)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.68rem",
                  color: "var(--p-green)",
                  whiteSpace: "nowrap",
                }}
              >
                Available for Hire
              </span>
            </div>
            {/* Floating stat */}
            <div
              className="badge-float-delay"
              style={{
                position: "absolute",
                bottom: 10,
                left: -50,
                background: "rgba(12,18,32,0.92)",
                border: "1px solid var(--p-border2)",
                borderRadius: 14,
                padding: "14px 20px",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                zIndex: 5,
              }}
            >
              <CountUp
                target={3}
                suffix="+"
                style={{
                  fontSize: "1.9rem",
                  fontWeight: 800,
                  color: "var(--p-accent)",
                  lineHeight: 1,
                  fontFamily: "'Space Mono', monospace",
                }}
              />
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.6rem",
                  color: "var(--p-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginTop: 2,
                }}
              >
                Projects Done
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: content — gap via paddingLeft */}
        <div style={{ flex: 1, minWidth: 0, paddingLeft: "5rem" }}>
          <div
            className="fu fu-1"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 16px 6px 10px",
              background: "rgba(34,211,163,0.07)",
              border: "1px solid rgba(34,211,163,0.2)",
              borderRadius: 100,
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.68rem",
              color: "var(--p-green)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "1.8rem",
            }}
          >
            <div
              className="blink pulse-glow"
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--p-green)",
                flexShrink: 0,
              }}
            />
            Open to Opportunities
          </div>

          <h1
            className="hero-name-wrap fu fu-2"
            style={{
              fontSize: "clamp(3rem,5.5vw,5.2rem)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              marginBottom: "0.2rem",
              position: "relative",
              cursor: "default",
            }}
          >
            Piyush
            <br />
            <span
              className="glitch-name shimmer-gradient"
              style={{
                background:
                  "linear-gradient(135deg,var(--p-accent) 0%,var(--p-green) 40%,var(--p-purple) 60%,var(--p-accent) 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                position: "relative",
              }}
            >
              Gupta
            </span>
          </h1>

          <p
            className="fu fu-3"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.85rem",
              color: "var(--p-accent)",
              letterSpacing: "0.08em",
              marginBottom: "1.8rem",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 30,
                height: 1,
                background:
                  "linear-gradient(90deg,var(--p-accent),transparent)",
                flexShrink: 0,
              }}
            />
            <span className="cursor-blink">{roleText}</span>
          </p>

          <p
            className="fu fu-4"
            style={{
              color: "var(--p-muted)",
              fontSize: "1rem",
              lineHeight: 1.85,
              maxWidth: 500,
              marginBottom: "2.5rem",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            B.Tech CS student at Lovely Professional University specializing in
            Data Science and Machine Learning. I build data-driven solutions and
            clean software — from EDA pipelines to desktop apps.
          </p>

          <div
            className="fu fu-5"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            <HeroBtn
              href="https://github.com/707Piyush"
              target="_blank"
              primary
              data-ocid="hero.github.button"
            >
              <GithubIcon /> GitHub
            </HeroBtn>
            <HeroBtn
              href={CV_LINK}
              target="_blank"
              outline
              data-ocid="hero.cv.button"
            >
              <DocIcon /> View CV
            </HeroBtn>
            <HeroBtn
              href="https://www.linkedin.com/in/07piyush/"
              target="_blank"
              ghost
              data-ocid="hero.linkedin.button"
            >
              LinkedIn →
            </HeroBtn>
          </div>

          <div
            className="fu fu-6"
            style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}
          >
            <ChipLink href="mailto:piyushchand23@lpu.in">
              <MailIcon /> piyushchand23@lpu.in
            </ChipLink>
            <ChipLink href="tel:+918384005582">
              <PhoneIcon /> +91-8384005582
            </ChipLink>
          </div>
        </div>

        {/* ── SCROLL DOWN INDICATOR ── */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            opacity: 0.5,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--p-muted)",
            }}
          >
            Scroll
          </span>
          <div className="scroll-arrow-bounce">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: "var(--p-accent)" }}
              role="img"
              aria-label="Scroll down"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </section>

      <div
        style={{
          width: "100%",
          height: 1,
          background:
            "linear-gradient(90deg,transparent,var(--p-border2),transparent)",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* ── SKILLS ── */}
      <section
        id="skills"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1180,
          margin: "0 auto",
          padding: "5rem 2rem",
        }}
      >
        <SectionHead num="01" title="Skills & Tools" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))",
            gap: 10,
          }}
        >
          {SKILLS.map((s) => (
            <SkillPill key={s.label} icon={s.icon} label={s.label} />
          ))}
        </div>
      </section>

      <div
        style={{
          width: "100%",
          height: 1,
          background:
            "linear-gradient(90deg,transparent,var(--p-border2),transparent)",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1180,
          margin: "0 auto",
          padding: "5rem 2rem",
        }}
      >
        <SectionHead num="02" title="Projects" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))",
            gap: "1.5rem",
          }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              proj={p}
              onMouseMove={handleCardMove}
              index={i + 1}
            />
          ))}
        </div>
      </section>

      <div
        style={{
          width: "100%",
          height: 1,
          background:
            "linear-gradient(90deg,transparent,var(--p-border2),transparent)",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* ── EDUCATION ── */}
      <section
        id="education"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1180,
          margin: "0 auto",
          padding: "5rem 2rem",
        }}
      >
        <SectionHead num="03" title="Education" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <EduCard />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
            className="reveal"
          >
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.8rem",
                color: "var(--p-muted)",
                lineHeight: 1.8,
              }}
            >
              Pursuing a strong foundation in CS fundamentals alongside
              specialization in data science, ML, and software development.
              Actively building projects and certifications alongside academics.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "start",
                paddingTop: "0.5rem",
              }}
            >
              <StatBox n="3+" l="Projects" color="var(--p-accent)" />
              <StatBox n="3" l="Certs" color="var(--p-green)" />
              <StatBox n="15+" l="Tools" color="var(--p-orange)" />
            </div>
          </div>
        </div>

        <div
          className="reveal"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.68rem",
              color: "var(--p-accent)",
              letterSpacing: "0.15em",
              opacity: 0.7,
            }}
          >
            03.1 /
          </span>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: 0 }}>
            Certifications
          </h3>
          <div
            style={{
              flex: 1,
              height: 1,
              background: "linear-gradient(90deg,var(--p-border2),transparent)",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {CERTS.map((c, i) => (
            <CertRow key={c.name} cert={c} index={i + 1} />
          ))}
        </div>
      </section>

      <div
        style={{
          width: "100%",
          height: 1,
          background:
            "linear-gradient(90deg,transparent,var(--p-border2),transparent)",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* ── CONTACT ── */}
      <section
        id="contact"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1180,
          margin: "0 auto",
          padding: "5rem 2rem",
        }}
      >
        <SectionHead num="04" title="Contact" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ContactCard
              icon={<MailIcon />}
              colorClass="blue"
              label="Email"
              val="piyushchand23@lpu.in"
              href="mailto:piyushchand23@lpu.in"
              index={1}
            />
            <ContactCard
              icon={<PhoneIcon />}
              colorClass="green"
              label="Phone"
              val="+91-8384005582"
              href="tel:+918384005582"
              index={2}
            />
            <ContactCard
              icon={<LinkedinIcon />}
              colorClass="purple"
              label="LinkedIn"
              val="linkedin.com/in/07piyush"
              href="https://www.linkedin.com/in/07piyush/"
              index={3}
            />
            <ContactCard
              icon={<GithubIcon />}
              colorClass="orange"
              label="GitHub"
              val="github.com/707Piyush"
              href="https://github.com/707Piyush"
              index={4}
            />
          </div>
          <EmailCTA />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(26,37,64,0.6)",
          padding: "1.8rem 5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.68rem",
            color: "var(--p-muted)",
          }}
        >
          © {new Date().getFullYear()}{" "}
          <span style={{ color: "var(--p-accent)" }}>Piyush Gupta</span>. All
          rights reserved.
        </p>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.68rem",
            color: "var(--p-muted)",
          }}
        >
          Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--p-accent)", textDecoration: "none" }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* ── BACK TO TOP ── */}
      <button
        type="button"
        data-ocid="scroll.button"
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 50,
          width: 46,
          height: 46,
          borderRadius: 12,
          background: "var(--p-card2)",
          border: "1px solid var(--p-border2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--p-accent)",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0)" : "translateY(20px)",
          pointerEvents: showTop ? "all" : "none",
        }}
      >
        <ChevronUp />
      </button>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

// ── CountUp ────────────────────────────────────────────────────────────────
function CountUp({
  target,
  suffix = "",
  style,
}: { target: number; suffix?: string; style?: React.CSSProperties }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(duration / target / 16);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [target]);
  return (
    <div style={style}>
      {count}
      {suffix}
    </div>
  );
}

function OrbitDot({
  color,
  size,
  radius,
  duration,
  reverse = false,
}: {
  color: string;
  size: number;
  radius: number;
  duration: number;
  reverse?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 ${size + 4}px ${color}`,
        transformOrigin: `0 -${radius}px`,
        animation: `${reverse ? "orbitSpinRev" : "orbitSpin"} ${duration}s linear infinite`,
        marginLeft: -size / 2,
      }}
    />
  );
}

function HeroBtn({
  children,
  href,
  target,
  primary,
  outline,
  ghost,
  "data-ocid": ocid,
}: {
  children: React.ReactNode;
  href: string;
  target?: string;
  primary?: boolean;
  outline?: boolean;
  ghost?: boolean;
  "data-ocid"?: string;
}) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 9,
    padding: "0.9rem 2rem",
    fontFamily: "'Space Mono', monospace",
    fontSize: "0.76rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    textDecoration: "none",
    border: "1px solid transparent",
    cursor: "pointer",
    borderRadius: 6,
    transition: "all 0.25s",
    fontWeight: primary ? 700 : 400,
  };
  if (primary) {
    Object.assign(base, {
      background: "var(--p-accent)",
      color: "#05080f",
      boxShadow: "0 0 30px rgba(79,142,255,0.35)",
      borderColor: "var(--p-accent)",
      overflow: "hidden",
      position: "relative",
    });
  } else if (outline) {
    Object.assign(base, {
      background: "transparent",
      color: "var(--p-text)",
      borderColor: "var(--p-border2)",
    });
  } else if (ghost) {
    Object.assign(base, {
      background: "transparent",
      color: "var(--p-text)",
      borderColor: "var(--p-border2)",
    });
  }
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      data-ocid={ocid}
      style={base}
      onMouseEnter={(e) => {
        if (primary) {
          e.currentTarget.style.background = "var(--p-green)";
          e.currentTarget.style.boxShadow = "0 0 40px rgba(34,211,163,0.55)";
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.borderColor = "var(--p-green)";
        } else if (outline) {
          e.currentTarget.style.borderColor = "var(--p-purple)";
          e.currentTarget.style.color = "var(--p-purple)";
          e.currentTarget.style.transform = "translateY(-3px)";
        } else if (ghost) {
          e.currentTarget.style.borderColor = "var(--p-accent)";
          e.currentTarget.style.color = "var(--p-accent)";
          e.currentTarget.style.transform = "translateY(-3px)";
        }
      }}
      onMouseLeave={(e) => {
        if (primary) {
          e.currentTarget.style.background = "var(--p-accent)";
          e.currentTarget.style.boxShadow = "0 0 30px rgba(79,142,255,0.35)";
          e.currentTarget.style.transform = "";
          e.currentTarget.style.borderColor = "var(--p-accent)";
        } else if (outline) {
          e.currentTarget.style.borderColor = "var(--p-border2)";
          e.currentTarget.style.color = "var(--p-text)";
          e.currentTarget.style.transform = "";
        } else if (ghost) {
          e.currentTarget.style.borderColor = "var(--p-border2)";
          e.currentTarget.style.color = "var(--p-text)";
          e.currentTarget.style.transform = "";
        }
      }}
    >
      {children}
    </a>
  );
}

function ChipLink({
  href,
  children,
}: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        background: "var(--p-card)",
        border: "1px solid var(--p-border)",
        borderRadius: 100,
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.7rem",
        color: "var(--p-muted)",
        textDecoration: "none",
        transition: "all 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--p-accent)";
        e.currentTarget.style.color = "var(--p-accent)";
        e.currentTarget.style.background = "rgba(79,142,255,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--p-border)";
        e.currentTarget.style.color = "var(--p-muted)";
        e.currentTarget.style.background = "var(--p-card)";
      }}
    >
      {children}
    </a>
  );
}

function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div
      className="reveal"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: "3rem",
      }}
    >
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.68rem",
          color: "var(--p-accent)",
          letterSpacing: "0.15em",
          opacity: 0.7,
        }}
      >
        {num} /
      </span>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          margin: 0,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          flex: 1,
          height: 1,
          background: "linear-gradient(90deg,var(--p-border2),transparent)",
        }}
      />
    </div>
  );
}

function SkillPill({ icon, label }: { icon: string; label: string }) {
  return (
    <div
      className="reveal"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "13px 15px",
        background: "var(--p-card)",
        border: "1px solid var(--p-border)",
        borderRadius: 12,
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--p-accent)";
        e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
        e.currentTarget.style.boxShadow = "0 10px 30px var(--p-accent-glow)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--p-border)";
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <img
        src={icon}
        alt={label}
        style={{ width: 26, height: 26, objectFit: "contain" }}
      />
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.74rem",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function ProjectCard({
  proj,
  onMouseMove,
  index,
}: {
  proj: (typeof PROJECTS)[0];
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  index: number;
}) {
  return (
    <div
      data-ocid={`projects.item.${index}`}
      className="reveal proj-card-glow"
      onMouseMove={onMouseMove}
      style={{
        background: "var(--p-card)",
        border: "1px solid var(--p-border)",
        borderRadius: 18,
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(79,142,255,0.35)";
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 25px 70px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--p-border)";
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.3rem",
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            background: "var(--p-accent-glow)",
            border: "1px solid rgba(79,142,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.3rem",
          }}
        >
          {proj.icon}
        </div>
        {proj.github && (
          <a
            href={proj.github}
            target="_blank"
            rel="noreferrer"
            data-ocid={`projects.item.${index}.link`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 9,
              background: "var(--p-card2)",
              border: "1px solid var(--p-border)",
              color: "var(--p-muted)",
              textDecoration: "none",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--p-accent)";
              e.currentTarget.style.color = "var(--p-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--p-border)";
              e.currentTarget.style.color = "var(--p-muted)";
            }}
          >
            <GithubIcon />
          </a>
        )}
      </div>
      <h3
        style={{
          fontSize: "1.15rem",
          fontWeight: 700,
          marginBottom: "0.7rem",
          letterSpacing: "-0.01em",
        }}
      >
        {proj.title}
      </h3>
      <p
        style={{
          color: "var(--p-muted)",
          fontSize: "0.83rem",
          lineHeight: 1.75,
          marginBottom: "1.5rem",
          fontFamily: "'Space Mono', monospace",
        }}
      >
        {proj.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {proj.tags.map((t) => (
          <span
            key={t}
            style={{
              padding: "3px 10px",
              borderRadius: 100,
              background: "rgba(79,142,255,0.08)",
              border: "1px solid rgba(79,142,255,0.2)",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.64rem",
              color: "var(--p-accent)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function EduCard() {
  return (
    <div
      className="reveal"
      style={{
        background: "var(--p-card)",
        border: "1px solid var(--p-border)",
        borderRadius: 18,
        padding: "2rem",
        transition: "all 0.35s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(34,211,163,0.3)";
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 15px 50px rgba(0,0,0,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--p-border)";
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 13px",
          background: "rgba(34,211,163,0.08)",
          border: "1px solid rgba(34,211,163,0.25)",
          borderRadius: 100,
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.65rem",
          color: "var(--p-green)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "1.2rem",
        }}
      >
        <div
          className="blink pulse-glow"
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--p-green)",
          }}
        />{" "}
        Currently Enrolled
      </div>
      <h3
        style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.35rem" }}
      >
        Lovely Professional University
      </h3>
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.78rem",
          color: "var(--p-accent)",
          marginBottom: "0.3rem",
        }}
      >
        B.Tech — Computer Science
      </p>
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.72rem",
          color: "var(--p-green)",
          marginBottom: "0.5rem",
        }}
      >
        Data Science &amp; Machine Learning
      </p>
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.7rem",
          color: "var(--p-muted)",
        }}
      >
        2022 – Present · Punjab, India
      </p>
    </div>
  );
}

function StatBox({ n, l, color }: { n: string; l: string; color: string }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 80,
        padding: "1.3rem",
        background: "var(--p-card)",
        border: "1px solid var(--p-border)",
        borderRadius: 14,
        textAlign: "center",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--p-accent)";
        e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--p-border)";
        e.currentTarget.style.transform = "";
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          lineHeight: 1,
          fontFamily: "'Space Mono', monospace",
          color,
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.6rem",
          color: "var(--p-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginTop: 5,
        }}
      >
        {l}
      </div>
    </div>
  );
}

function CertRow({ cert, index }: { cert: (typeof CERTS)[0]; index: number }) {
  return (
    <a
      href={cert.link}
      target="_blank"
      rel="noreferrer"
      data-ocid={`certs.item.${index}`}
      className="reveal cert-row-bar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.2rem 1.5rem",
        background: "var(--p-card)",
        border: "1px solid var(--p-border)",
        borderRadius: 14,
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,112,67,0.35)";
        e.currentTarget.style.transform = "translateX(8px)";
        e.currentTarget.style.boxShadow = "0 4px 28px rgba(255,112,67,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--p-border)";
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 11,
            background: "rgba(255,112,67,0.1)",
            border: "1px solid rgba(255,112,67,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            flexShrink: 0,
          }}
        >
          {cert.icon}
        </div>
        <div>
          <div
            style={{ fontSize: "0.93rem", fontWeight: 600, marginBottom: 2 }}
          >
            {cert.name}
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.68rem",
              color: "var(--p-muted)",
            }}
          >
            {cert.sub}
          </div>
        </div>
      </div>
      <div
        style={{
          color: "var(--p-orange)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.7rem",
        }}
      >
        <span style={{ color: "var(--p-muted)", fontSize: "0.65rem" }}>
          View
        </span>{" "}
        →
      </div>
    </a>
  );
}

const CCARD_COLORS: Record<
  string,
  { bg: string; border: string; color: string }
> = {
  blue: {
    bg: "rgba(79,142,255,0.1)",
    border: "rgba(79,142,255,0.2)",
    color: "var(--p-accent)",
  },
  green: {
    bg: "rgba(34,211,163,0.1)",
    border: "rgba(34,211,163,0.2)",
    color: "var(--p-green)",
  },
  orange: {
    bg: "rgba(255,112,67,0.1)",
    border: "rgba(255,112,67,0.2)",
    color: "var(--p-orange)",
  },
  purple: {
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.2)",
    color: "var(--p-purple)",
  },
};

function ContactCard({
  icon,
  colorClass,
  label,
  val,
  href,
  index,
}: {
  icon: React.ReactNode;
  colorClass: string;
  label: string;
  val: string;
  href: string;
  index: number;
}) {
  const c = CCARD_COLORS[colorClass];
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      data-ocid={`contact.item.${index}`}
      className="reveal ccard-sweep"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "1.1rem 1.4rem",
        background: "var(--p-card)",
        border: "1px solid var(--p-border)",
        borderRadius: 14,
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--p-accent)";
        e.currentTarget.style.transform = "translateX(7px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--p-border)";
        e.currentTarget.style.transform = "";
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: c.bg,
          border: `1px solid ${c.border}`,
          color: c.color,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.62rem",
            color: "var(--p-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: 3,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{val}</div>
      </div>
    </a>
  );
}

function EmailCTA() {
  return (
    <div
      className="reveal"
      style={{
        background: "var(--p-card)",
        border: "1px solid var(--p-border)",
        borderRadius: 22,
        padding: "2.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(79,142,255,0.12) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -60,
          left: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(34,211,163,0.08) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 13px",
            background: "rgba(79,142,255,0.1)",
            border: "1px solid rgba(79,142,255,0.2)",
            borderRadius: 100,
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.66rem",
            color: "var(--p-accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1.2rem",
          }}
        >
          ✉️ &nbsp;Get In Touch
        </div>
        <h3
          style={{
            fontSize: "1.65rem",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "0.8rem",
          }}
        >
          Let's build
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg,var(--p-accent),var(--p-green))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            something great
          </span>{" "}
          together.
        </h3>
        <p
          style={{
            color: "var(--p-muted)",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.8rem",
            lineHeight: 1.75,
            marginBottom: "1.8rem",
          }}
        >
          I'm actively looking for internships and opportunities in data
          science, machine learning, and software development. Whether you have
          a project, a role, or just want to connect — my inbox is open.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 18px",
            background: "var(--p-bg2)",
            border: "1px solid var(--p-border2)",
            borderRadius: 12,
            marginBottom: "1.5rem",
          }}
        >
          <MailIcon />
          <a
            href="mailto:piyushchand23@lpu.in"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.83rem",
              color: "var(--p-text)",
              textDecoration: "none",
            }}
          >
            piyushchand23@lpu.in
          </a>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <HeroBtn
            href="mailto:piyushchand23@lpu.in"
            primary
            data-ocid="contact.email.button"
          >
            <MailIcon /> Send Email
          </HeroBtn>
          <HeroBtn
            href={CV_LINK}
            target="_blank"
            outline
            data-ocid="contact.cv.button"
          >
            <DocIcon /> View CV
          </HeroBtn>
          <HeroBtn
            href="https://www.linkedin.com/in/07piyush/"
            target="_blank"
            ghost
            data-ocid="contact.linkedin.button"
          >
            LinkedIn →
          </HeroBtn>
        </div>
      </div>
    </div>
  );
}
