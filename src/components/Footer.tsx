"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const currentYear = new Date().getFullYear();

    const socials = [
        { icon: <Github size={18} />, href: "https://github.com/Saaalil", label: "GitHub" },
        { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/salil-hiremath-946784212/", label: "LinkedIn" },
        { icon: <Mail size={18} />, href: "mailto:salilhiremath2712@gmail.com", label: "Email" },
    ];

    const navLinks = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Skills", href: "#skills" },
        { label: "Projects", href: "#projects" },
        { label: "Experience", href: "#experience" },
        { label: "News", href: "#news" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <footer style={{ position: "relative", borderTop: "1px solid var(--border-subtle)", background: "var(--bg-primary)" }}>
            {/* Gradient border glow */}
            <div style={{ position: "absolute", top: -1, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-green), var(--accent-cyan), transparent)", opacity: 0.5 }} />

            <div className="container" style={{ padding: "3rem 2rem 1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem", marginBottom: "2.5rem" }}>
                    {/* Brand */}
                    <div>
                        <motion.a href="#home" whileHover={{ scale: 1.05 }} style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", textDecoration: "none", display: "block", marginBottom: "0.5rem" }}>
                            <span style={{ color: "var(--accent-cyan)" }}>&lt;</span>S.H<span style={{ color: "var(--accent-cyan)" }}> /&gt;</span>
                        </motion.a>
                        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", maxWidth: 260, lineHeight: 1.6 }}>
                            Monitoring-ready portfolio dashboard for ML, analytics, and systems engineering.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Navigate</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                            {navLinks.map((link) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    whileHover={{ x: 4, color: "var(--accent-cyan)" }}
                                    style={{ fontSize: "0.82rem", color: "var(--text-secondary)", textDecoration: "none", transition: "all 0.2s ease" }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.75rem" }}>Connect</h4>
                        <div style={{ display: "flex", gap: "0.6rem" }}>
                            {socials.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    whileHover={{ scale: 1.15, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid var(--border-subtle)", background: "var(--bg-glass)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", textDecoration: "none", transition: "all 0.3s ease" }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
                        © {currentYear} Salil Hiremath. <Heart size={12} style={{ color: "#ef4444" }} fill="#ef4444" /> uptime: stable.
                    </p>

                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ y: -3, boxShadow: "0 0 15px rgba(6,182,212,0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--border-subtle)", background: "var(--bg-glass)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-cyan)", cursor: "pointer", transition: "all 0.3s ease" }}
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={16} />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
