"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DeveloperCharacter from "./DeveloperCharacter";

/* ─── Typing Effect ─── */
function TypingEffect({ words }: { words: string[] }) {
    const [currentWord, setCurrentWord] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[currentWord];
        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    setText(word.substring(0, text.length + 1));
                    if (text.length + 1 === word.length) {
                        setTimeout(() => setIsDeleting(true), 2000);
                    }
                } else {
                    setText(word.substring(0, text.length - 1));
                    if (text.length === 0) {
                        setIsDeleting(false);
                        setCurrentWord((prev) => (prev + 1) % words.length);
                    }
                }
            },
            isDeleting ? 40 : 80
        );
        return () => clearTimeout(timeout);
    }, [text, isDeleting, currentWord, words]);

    return (
        <span
            style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                fontWeight: 500,
                color: "var(--accent-cyan)",
            }}
        >
            {text}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{
                    display: "inline-block",
                    width: 2,
                    height: "1.1em",
                    background: "var(--accent-cyan)",
                    marginLeft: 2,
                    verticalAlign: "text-bottom",
                    boxShadow: "0 0 8px var(--accent-cyan)",
                }}
            />
        </span>
    );
}

/* ─── Social Icon ─── */
function SocialIcon({ href, icon, label, delay }: { href: string; icon: React.ReactNode; label: string; delay: number }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.15, y: -4, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)", borderColor: "rgba(6, 182, 212, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 46,
                height: 46,
                borderRadius: 14,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-glass)",
                color: "var(--text-secondary)",
                transition: "color 0.3s ease",
                textDecoration: "none",
            }}
        >
            {icon}
        </motion.a>
    );
}

/* ─── Terminal Window ─── */
function TerminalWindow() {
    const [lines, setLines] = useState<string[]>([]);
    const allLines = [
        "[11:42:01] $ python train_pipeline.py --profile=prod",
        "[11:42:07] Data loader initialized (245k rows)",
        "[11:42:13] Feature normalization complete",
        "[11:42:30] Epoch 001/100 | loss: 0.421 | val_acc: 0.72",
        "[11:43:10] Epoch 050/100 | loss: 0.091 | val_acc: 0.93",
        "[11:43:55] Epoch 100/100 | loss: 0.018 | val_acc: 0.987",
        "[11:44:01] Model artifact pushed -> registry:v7",
        "[11:44:07] $ vercel deploy --prod --yes",
        "[11:44:14] Deployment READY | health-check: PASS",
    ];

    useEffect(() => {
        let cancelled = false;
        let i = 0;
        const interval = setInterval(() => {
            if (cancelled) return;
            if (i < allLines.length) {
                const currentLine = allLines[i];
                i++;
                setLines((prev) => [...prev, currentLine]);
            } else {
                clearInterval(interval);
            }
        }, 600);
        return () => { cancelled = true; clearInterval(interval); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="hero-terminal"
            style={{
                position: "absolute",
                bottom: -20,
                left: -30,
                width: 320,
                background: "rgba(12, 16, 22, 0.96)",
                borderRadius: 12,
                border: "1px solid rgba(249, 115, 22, 0.28)",
                overflow: "hidden",
                boxShadow: "0 22px 60px rgba(0, 0, 0, 0.52), 0 0 30px rgba(249, 115, 22, 0.16)",
                backdropFilter: "blur(20px)",
                zIndex: 5,
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                <span style={{ marginLeft: 8, fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: 4 }}>
                    <Terminal size={10} /> prod-runtime / monitoring
                </span>
                <span style={{ marginLeft: "auto", fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.35)", borderRadius: 999, padding: "2px 8px" }}>
                    ACTIVE
                </span>
            </div>
            <div style={{ padding: "12px 14px", maxHeight: 180, overflow: "hidden" }}>
                {lines.filter(Boolean).map((line, i) => (
                    <motion.div
                        key={`${i}-${line}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.62rem",
                            lineHeight: 1.8,
                            color: line.includes("$") ? "#f97316" : line.includes("READY") || line.includes("PASS") || line.includes("pushed") ? "#22c55e" : line.includes("loss") || line.includes("val_acc") ? "#60a5fa" : "var(--text-secondary)",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {line}
                    </motion.div>
                ))}
                <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} style={{ display: "inline-block", width: 6, height: 12, background: "var(--accent-cyan)", marginTop: 4 }} />
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                    <motion.div
                        animate={{ width: ["20%", "70%", "92%"] }}
                        transition={{ duration: 3.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        style={{ height: "100%", background: "linear-gradient(90deg, #f97316, #22c55e)" }}
                    />
                </div>
                <span style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>cluster-sync</span>
            </div>
        </motion.div>
    );
}

/* ─── Floating Status Badge ─── */
function StatusBadge({ text, icon, x, y, delay, color }: { text: string; icon: string; x: number; y: number; delay: number; color: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5, type: "spring", stiffness: 200 }}
            style={{ position: "absolute", left: x, top: y, zIndex: 4 }}
            className="hero-badge"
        >
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 14px",
                    background: "rgba(22, 22, 35, 0.9)",
                    border: `1px solid ${color}33`,
                    borderRadius: 20,
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color,
                    fontFamily: "var(--font-mono)",
                    backdropFilter: "blur(10px)",
                    boxShadow: `0 4px 20px ${color}15`,
                    whiteSpace: "nowrap",
                }}
            >
                <span>{icon}</span>{text}
            </motion.div>
        </motion.div>
    );
}

/* ═══ HERO EXPORT ═══ */
const titleWords = ["Data Scientist", "ML Engineer", "AI Researcher", "Deep Learning Dev"];

export default function Hero() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

    return (
        <section id="home" ref={sectionRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "6rem 1.5rem 4rem" }}>
            {/* Animated gradient orbs */}
            <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: "5%", right: "15%", width: 500, height: 500, background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
            <motion.div animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", bottom: "10%", left: "5%", width: 450, height: 450, background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />

            <motion.div style={{ y: bgY, width: "100%" }}>
                <div className="container hero-grid" style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "2rem" }}>
                    {/* LEFT: TEXT */}
                    <motion.div style={{ opacity: textOpacity, y: textY }}>
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 20px", background: "rgba(6, 182, 212, 0.08)", border: "1px solid rgba(6, 182, 212, 0.2)", borderRadius: 9999, fontSize: "0.82rem", fontWeight: 500, marginBottom: "2rem" }}>
                            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
                            <span style={{ color: "var(--text-secondary)" }}>Currently @ <span style={{ color: "var(--accent-cyan)", fontWeight: 600 }}>Myntra</span> · Data Science Intern</span>
                        </motion.div>

                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--accent-cyan)", marginBottom: "0.75rem", opacity: 0.8 }}>
                            {"// Hello World, I'm"}
                        </motion.p>

                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
                            <span style={{ color: "var(--text-primary)" }}>Salil</span><br />
                            <span className="animate-gradient" style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)", backgroundSize: "300% 300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Hiremath</span>
                        </motion.h1>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--text-muted)" }}>role:</span>
                            <TypingEffect words={titleWords} />
                        </motion.div>

                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }} style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: 480, marginBottom: "2rem", lineHeight: 1.8 }}>
                            Building ML systems that drive decision-level insights. Specializing in deep learning, NLP, and large-scale analytics across defense, healthcare, and enterprise domains.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem" }}>
                            <motion.a href="#projects" className="btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>View My Work <ArrowDown size={16} /></motion.a>
                            <motion.a href="/resume.pdf" download className="btn-secondary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}><Download size={16} /> Download CV</motion.a>
                            <motion.a href="#contact" className="btn-secondary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}><Mail size={16} /> Contact</motion.a>
                        </motion.div>

                        <div style={{ display: "flex", gap: "0.75rem" }}>
                            <SocialIcon href="https://github.com/Saaalil" icon={<Github size={18} />} label="GitHub" delay={1.1} />
                            <SocialIcon href="https://www.linkedin.com/in/salil-hiremath-946784212/" icon={<Linkedin size={18} />} label="LinkedIn" delay={1.2} />
                            <SocialIcon href="mailto:salilhiremath2712@gmail.com" icon={<Mail size={18} />} label="Email" delay={1.3} />
                            <SocialIcon href="https://leetcode.com/u/KyreX/" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l.501.4c.425.34 1.048.272 1.392-.152.345-.424.267-1.047-.152-1.392l-.502-.4c-2.648-2.12-6.058-1.82-8.402.678l.001.002-.014.015-4.277 4.193c-2.1 2.06-2.34 5.326-.537 7.674L13.483 0Z"/></svg>} label="LeetCode" delay={1.4} />
                        </div>
                    </motion.div>

                    {/* RIGHT: DEVELOPER CHARACTER */}
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.6 }} className="hero-visual" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                        <DeveloperCharacter />
                        <StatusBadge text="Python" icon="🐍" x={-40} y={60} delay={1.5} color="#3b82f6" />
                        <StatusBadge text="TensorFlow" icon="🧠" x={320} y={40} delay={1.8} color="#f59e0b" />
                        <StatusBadge text="99.5% acc" icon="📊" x={-20} y={280} delay={2.1} color="#10b981" />
                        <StatusBadge text="PyTorch" icon="🔥" x={330} y={290} delay={2.4} color="#ec4899" />
                        <TerminalWindow />
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 10 }}>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} style={{ color: "var(--text-muted)", fontSize: "0.7rem", letterSpacing: "0.15em", fontFamily: "var(--font-mono)" }}>SCROLL DOWN</motion.span>
                <motion.div style={{ width: 20, height: 32, borderRadius: 10, border: "1.5px solid var(--text-muted)", display: "flex", justifyContent: "center", paddingTop: 6 }}>
                    <motion.div animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 3, height: 6, borderRadius: 3, background: "var(--accent-cyan)", boxShadow: "0 0 6px var(--accent-cyan)" }} />
                </motion.div>
            </motion.div>

            <style jsx global>{`
                @media (max-width: 900px) {
                    .hero-grid { grid-template-columns: 1fr !important; }
                    .hero-visual, .hero-terminal, .hero-badge { display: none !important; }
                }
            `}</style>
        </section>
    );
}
