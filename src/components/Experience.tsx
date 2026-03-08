"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experiences, education } from "@/data/experience";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

export default function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="experience" className="section" ref={ref}>
            <div className="container">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                    <motion.span initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-amber)", display: "block", marginBottom: "0.5rem" }}>
                        {"// timeline.execution_history"}
                    </motion.span>
                    <h2 className="section-title">Experience Timeline Dashboard</h2>
                    <p className="section-subtitle">Chronological workload history with role, impact signals, and tech stack traces</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.16 }}
                    className="glass-card"
                    style={{ padding: "0.75rem 1rem", marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.6rem", maxWidth: 800, marginInline: "auto" }}
                >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        timeline health
                    </span>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span className="tech-tag" style={{ fontSize: "0.67rem" }}>{experiences.length} work logs</span>
                        <span className="tech-tag" style={{ fontSize: "0.67rem" }}>{education.length} education logs</span>
                        <span className="tech-tag" style={{ fontSize: "0.67rem", color: "#22c55e", borderColor: "rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.1)" }}>status: synced</span>
                    </div>
                </motion.div>

                <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
                    {/* Timeline line with gradient */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{ position: "absolute", left: 24, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg, var(--accent-cyan), var(--accent-purple), transparent)", transformOrigin: "top" }}
                    />

                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -40 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.2, type: "spring", stiffness: 100 }}
                            style={{ position: "relative", paddingLeft: 60, marginBottom: "2rem" }}
                        >
                            {/* Timeline dot with pulse */}
                            <div style={{ position: "absolute", left: 16, top: 24, width: 18, height: 18, borderRadius: "50%", background: i === 0 ? "var(--gradient-primary)" : "var(--bg-tertiary)", border: `2px solid ${i === 0 ? "var(--accent-cyan)" : "var(--border-subtle)"}`, zIndex: 2 }}>
                                {i === 0 && (
                                    <motion.div
                                        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "2px solid var(--accent-cyan)" }}
                                    />
                                )}
                            </div>

                            <motion.div whileHover={{ y: -3, boxShadow: "var(--shadow-glow)" }} className="glass-card" style={{ padding: "1.5rem", transition: "all 0.4s ease" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                                    <div>
                                        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{exp.role}</h3>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.9rem", fontWeight: 600, color: "var(--accent-cyan)" }}><Briefcase size={14} />{exp.company}</span>
                                            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", color: "var(--text-muted)" }}><MapPin size={12} />{exp.location}</span>
                                        </div>
                                    </div>
                                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", padding: "4px 12px", background: "var(--bg-glass)", border: "1px solid var(--border-subtle)", borderRadius: 8, whiteSpace: "nowrap" }}><Calendar size={12} />{exp.period}</span>
                                </div>

                                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>{exp.description}</p>

                                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
                                    {exp.achievements.map((ach, j) => (
                                        <motion.li key={j} initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.2 + j * 0.05 + 0.3 }} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                                            <span style={{ marginTop: 8, width: 4, height: 4, borderRadius: "50%", background: "var(--accent-cyan)", flexShrink: 0, boxShadow: "0 0 6px var(--accent-cyan)" }} />
                                            {ach}
                                        </motion.li>
                                    ))}
                                </ul>

                                {exp.techStack.length > 0 && (
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                                        {exp.techStack.map((tech) => (
                                            <span key={tech} className="tech-tag" style={{ fontSize: "0.68rem", padding: "2px 8px" }}>{tech}</span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    ))}

                    {/* Education */}
                    {education.map((edu, i) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, x: -40 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: (experiences.length + i) * 0.2 }}
                            style={{ position: "relative", paddingLeft: 60, marginBottom: "2rem" }}
                        >
                            <div style={{ position: "absolute", left: 16, top: 24, width: 18, height: 18, borderRadius: "50%", background: "var(--bg-tertiary)", border: "2px solid var(--accent-purple)", zIndex: 2 }} />

                            <motion.div whileHover={{ y: -3, boxShadow: "0 0 30px rgba(139,92,246,0.15)" }} className="glass-card" style={{ padding: "1.5rem", transition: "all 0.4s ease" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                                    <div>
                                        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{edu.role}</h3>
                                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.9rem", fontWeight: 600, color: "var(--accent-purple)" }}><GraduationCap size={16} />{edu.company}</span>
                                    </div>
                                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", padding: "4px 12px", background: "var(--bg-glass)", border: "1px solid var(--border-subtle)", borderRadius: 8 }}><Calendar size={12} />{edu.period}</span>
                                </div>

                                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>{edu.description}</p>

                                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                    {edu.achievements.map((ach, j) => (
                                        <motion.li key={j} whileHover={{ scale: 1.05 }} className="tech-tag" style={{ fontSize: "0.72rem", borderColor: "rgba(139, 92, 246, 0.3)", background: "rgba(139, 92, 246, 0.1)", color: "var(--accent-purple)" }}>
                                            {ach}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
