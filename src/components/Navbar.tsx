"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Publications", href: "#publications" },
    { label: "News", href: "#news" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = navLinks.map((l) => l.href.replace("#", ""));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120) { setActiveSection(sections[i]); break; }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: "0 1.5rem",
                    backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
                    background: scrolled ? "rgba(12, 16, 22, 0.88)" : "transparent",
                    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.5rem",
                            fontWeight: 900,
                            background: "var(--gradient-primary)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            textDecoration: "none",
                            position: "relative",
                        }}
                    >
                        {"<S.H />"}
                    </motion.a>

                    {/* Desktop Links */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="nav-desktop">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace("#", "");
                            return (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    whileHover={{ y: -1 }}
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: "0.82rem",
                                        fontWeight: 500,
                                        color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
                                        textDecoration: "none",
                                        padding: "8px 14px",
                                        borderRadius: 8,
                                        background: isActive ? "rgba(var(--accent-cyan-rgb), 0.1)" : "transparent",
                                        transition: "all 0.3s ease",
                                        letterSpacing: "0.02em",
                                        position: "relative",
                                    }}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            style={{
                                                position: "absolute",
                                                bottom: 2,
                                                left: "20%",
                                                right: "20%",
                                                height: 2,
                                                background: "var(--gradient-primary)",
                                                borderRadius: 1,
                                            }}
                                        />
                                    )}
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 38,
                                height: 38,
                                borderRadius: 10,
                                border: "1px solid var(--border-subtle)",
                                background: "var(--bg-glass)",
                                color: "var(--text-secondary)",
                                cursor: "pointer",
                                transition: "border-color 0.3s ease",
                            }}
                        >
                            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                        </motion.button>

                        <motion.a
                            href="/resume.pdf"
                            download
                            className="btn-primary nav-resume-btn"
                            style={{ padding: "8px 18px", fontSize: "0.8rem" }}
                            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(249,115,22,0.35)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download size={14} />
                            Resume
                        </motion.a>

                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="nav-mobile-btn"
                            aria-label="Toggle menu"
                            style={{
                                display: "none",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 38,
                                height: 38,
                                borderRadius: 10,
                                border: "1px solid var(--border-subtle)",
                                background: "var(--bg-glass)",
                                color: "var(--text-primary)",
                                cursor: "pointer",
                            }}
                        >
                            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, y: 0, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "fixed",
                            top: "72px",
                            left: 0,
                            right: 0,
                            zIndex: 999,
                            background: "rgba(10, 10, 15, 0.95)",
                            borderBottom: "1px solid var(--border-subtle)",
                            padding: "1.5rem",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: 500,
                                        color: activeSection === link.href.replace("#", "") ? "var(--accent-cyan)" : "var(--text-secondary)",
                                        textDecoration: "none",
                                        padding: "0.75rem 1rem",
                                        borderRadius: 10,
                                        background: activeSection === link.href.replace("#", "") ? "rgba(6, 182, 212, 0.08)" : "transparent",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                @media (max-width: 768px) {
                    .nav-desktop { display: none !important; }
                    .nav-mobile-btn { display: flex !important; }
                    .nav-resume-btn { display: none !important; }
                }
            `}</style>
        </>
    );
}
