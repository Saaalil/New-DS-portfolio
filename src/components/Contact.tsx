"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Github, Linkedin, Mail, MapPin, Phone, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setError(null);

        const result = await sendContactEmail(formState);

        if (result.success) {
            setSubmitted(true);
            setFormState({ name: "", email: "", message: "" });
            setTimeout(() => setSubmitted(false), 4000);
        } else {
            setError(result.error || "Something went wrong.");
            setTimeout(() => setError(null), 5000);
        }

        setSending(false);
    };

    const contactInfo = [
        { icon: <Mail size={18} />, label: "Email", value: "salilhiremath2712@gmail.com", href: "mailto:salilhiremath2712@gmail.com" },
        { icon: <MapPin size={18} />, label: "Location", value: "Bangalore, India", href: "#" },
        { icon: <Phone size={18} />, label: "Phone", value: "Available on request", href: "#" },
    ];

    const socials = [
        { icon: <Github size={20} />, href: "https://github.com/Saaalil", label: "GitHub" },
        { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/salil-hiremath-946784212/", label: "LinkedIn" },
        { icon: <Mail size={20} />, href: "mailto:salilhiremath2712@gmail.com", label: "Email" },
        { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l.501.4c.425.34 1.048.272 1.392-.152.345-.424.267-1.047-.152-1.392l-.502-.4c-2.648-2.12-6.058-1.82-8.402.678l.001.002-.014.015-4.277 4.193c-2.1 2.06-2.34 5.326-.537 7.674L13.483 0Z"/></svg>, href: "https://leetcode.com/u/KyreX/", label: "LeetCode" },
    ];

    const inputStyle = (field: string): React.CSSProperties => ({
        width: "100%",
        padding: "14px 16px",
        background: "var(--bg-glass)",
        border: `1.5px solid ${focusedField === field ? "var(--accent-cyan)" : "var(--border-subtle)"}`,
        borderRadius: 12,
        color: "var(--text-primary)",
        fontSize: "0.9rem",
        fontFamily: "var(--font-body)",
        outline: "none",
        transition: "all 0.3s ease",
        boxShadow: focusedField === field ? "0 0 0 3px rgba(6, 182, 212, 0.1), 0 0 20px rgba(6, 182, 212, 0.05)" : "none",
    });

    return (
        <section id="contact" className="section" ref={ref}>
            <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

            <div className="container" style={{ position: "relative", zIndex: 2 }}>
                <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                    <motion.span initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-cyan)", display: "block", marginBottom: "0.5rem" }}>
                        {"// comms.operator_console"}
                    </motion.span>
                    <h2 className="section-title">Contact Console</h2>
                    <p className="section-subtitle">Open communication channel for collaboration, research, and engineering opportunities</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.14 }}
                    className="glass-card"
                    style={{ padding: "0.75rem 1rem", marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.6rem" }}
                >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        channel status
                    </span>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span className="tech-tag" style={{ fontSize: "0.67rem", color: "#22c55e", borderColor: "rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.1)" }}>smtp: active</span>
                        <span className="tech-tag" style={{ fontSize: "0.67rem" }}>sla: &lt;24h response</span>
                    </div>
                </motion.div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }} className="contact-grid">
                    {/* Left: Contact Info */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
                        <motion.div whileHover={{ boxShadow: "var(--shadow-glow)" }} className="glass-card" style={{ padding: "2rem", marginBottom: "1.5rem", transition: "all 0.4s ease" }}>
                            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--text-primary)" }}>Endpoint Metadata</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                {contactInfo.map((item, i) => (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        whileHover={{ x: 6 }}
                                        style={{ display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none", color: "var(--text-secondary)", transition: "all 0.3s ease" }}
                                    >
                                        <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--gradient-card)", border: "1px solid var(--border-accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-cyan)", flexShrink: 0 }}>{item.icon}</div>
                                        <div>
                                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{item.label}</div>
                                            <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>{item.value}</div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        <div style={{ display: "flex", gap: "0.75rem" }}>
                            {socials.map((social, i) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    whileHover={{ scale: 1.1, y: -3, boxShadow: "0 0 20px rgba(6,182,212,0.2)" }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ width: 48, height: 48, borderRadius: 12, border: "1px solid var(--border-subtle)", background: "var(--bg-glass)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", transition: "all 0.3s ease", textDecoration: "none" }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
                        <motion.form onSubmit={handleSubmit} whileHover={{ boxShadow: "0 0 40px rgba(6,182,212,0.08)" }} className="glass-card" style={{ padding: "2rem", transition: "all 0.4s ease" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                {[
                                    { id: "name", label: "Name", type: "text", placeholder: "Your name", value: formState.name, onChange: (v: string) => setFormState({ ...formState, name: v }) },
                                    { id: "email", label: "Email", type: "email", placeholder: "your@email.com", value: formState.email, onChange: (v: string) => setFormState({ ...formState, email: v }) },
                                ].map((field) => (
                                    <div key={field.id}>
                                        <label htmlFor={field.id} style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: focusedField === field.id ? "var(--accent-cyan)" : "var(--text-secondary)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em", transition: "color 0.3s ease" }}>{field.label}</label>
                                        <input
                                            id={field.id}
                                            type={field.type}
                                            required
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            onFocus={() => setFocusedField(field.id)}
                                            onBlur={() => setFocusedField(null)}
                                            style={inputStyle(field.id)}
                                            placeholder={field.placeholder}
                                        />
                                    </div>
                                ))}

                                <div>
                                    <label htmlFor="message" style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: focusedField === "message" ? "var(--accent-cyan)" : "var(--text-secondary)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em", transition: "color 0.3s ease" }}>Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={5}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        onFocus={() => setFocusedField("message")}
                                        onBlur={() => setFocusedField(null)}
                                        style={{ ...inputStyle("message"), resize: "vertical" }}
                                        placeholder="Tell me about your project or opportunity..."
                                    />
                                </div>

                                {error && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: 10, color: "#ef4444", fontSize: "0.85rem" }}>
                                        <AlertCircle size={16} /> {error}
                                    </motion.div>
                                )}

                                <motion.button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={sending}
                                    whileHover={sending ? {} : { scale: 1.02, boxShadow: "0 8px 30px rgba(6, 182, 212, 0.4)" }}
                                    whileTap={sending ? {} : { scale: 0.98 }}
                                    style={{ width: "100%", justifyContent: "center", padding: "14px", position: "relative", overflow: "hidden", opacity: sending ? 0.7 : 1, cursor: sending ? "not-allowed" : "pointer" }}
                                >
                                    {submitted ? (
                                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <CheckCircle2 size={18} /> Message Sent!
                                        </motion.span>
                                    ) : sending ? (
                                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: "flex" }}>
                                                <Loader2 size={18} />
                                            </motion.span>
                                            Sending...
                                        </span>
                                    ) : (
                                        <><Send size={18} /> Send Message</>
                                    )}
                                </motion.button>
                            </div>
                        </motion.form>
                    </motion.div>
                </div>
            </div>

            <style jsx global>{`
                @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
            `}</style>
        </section>
    );
}
