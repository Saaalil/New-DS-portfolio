"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { publications, certifications, patents } from "@/data/publications";
import { BookOpen, Award, ExternalLink, ScrollText } from "lucide-react";

export default function Publications() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="publications" className="section" ref={ref}>
            <div className="container">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                    <motion.span initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-purple)", display: "block", marginBottom: "0.5rem" }}>
                        {"// artifacts.knowledge_base"}
                    </motion.span>
                    <h2 className="section-title">Research Dashboard</h2>
                    <p className="section-subtitle">Publications, patents, and certifications organized as monitored knowledge artifacts</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="glass-card"
                    style={{ padding: "0.75rem 1rem", marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.6rem" }}
                >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        artifact counters
                    </span>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span className="tech-tag" style={{ fontSize: "0.67rem" }}>{publications.length} papers</span>
                        <span className="tech-tag" style={{ fontSize: "0.67rem" }}>{patents.length} patents</span>
                        <span className="tech-tag" style={{ fontSize: "0.67rem" }}>{certifications.length} certifications</span>
                    </div>
                </motion.div>

                {/* Publications */}
                <div style={{ marginBottom: "2.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem" }}>
                        <BookOpen size={20} color="var(--accent-cyan)" />
                        Research Publications
                    </h3>

                    {publications.map((pub, i) => (
                        <motion.div
                            key={pub.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            whileHover={{ y: -3, boxShadow: "0 10px 40px rgba(6,182,212,0.1)", borderColor: "rgba(6, 182, 212, 0.3)" }}
                            className="glass-card"
                            style={{ padding: "1.5rem", marginBottom: "1rem", borderLeft: "3px solid var(--accent-cyan)", transition: "all 0.4s ease" }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                                <div>
                                    <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>{pub.title}</h4>
                                    <div style={{ display: "flex", gap: "1rem", marginBottom: 8, flexWrap: "wrap" }}>
                                        <span style={{ fontSize: "0.82rem", color: "var(--accent-cyan)", fontWeight: 600 }}>{pub.venue}</span>
                                        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{pub.year}</span>
                                    </div>
                                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{pub.description}</p>
                                </div>
                                {pub.link && (
                                    <motion.a href={pub.link} target="_blank" rel="noopener noreferrer" aria-label={`Read ${pub.title}`} whileHover={{ scale: 1.1, borderColor: "var(--accent-cyan)" }} style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", flexShrink: 0, textDecoration: "none", transition: "all 0.3s ease" }}>
                                        <ExternalLink size={14} />
                                    </motion.a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Patents */}
                {patents.length > 0 && (
                    <div style={{ marginBottom: "2.5rem" }}>
                        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem" }}>
                            <ScrollText size={20} color="var(--accent-green, #10b981)" />
                            Patents
                        </h3>

                        {patents.map((patent, i) => (
                            <motion.div
                                key={patent.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                                whileHover={{ y: -3, boxShadow: "0 10px 40px rgba(16,185,129,0.1)", borderColor: "rgba(16, 185, 129, 0.3)" }}
                                className="glass-card"
                                style={{ padding: "1.5rem", marginBottom: "1rem", borderLeft: "3px solid #10b981", transition: "all 0.4s ease" }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                                    <div>
                                        <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>{patent.title}</h4>
                                        <div style={{ display: "flex", gap: "1rem", marginBottom: 8, flexWrap: "wrap" }}>
                                            <span style={{ fontSize: "0.82rem", color: "#10b981", fontWeight: 600 }}>{patent.venue}</span>
                                            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{patent.year}</span>
                                        </div>
                                        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{patent.description}</p>
                                    </div>
                                    {patent.link && (
                                        <motion.a href={patent.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${patent.title}`} whileHover={{ scale: 1.1, borderColor: "#10b981" }} style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", flexShrink: 0, textDecoration: "none", transition: "all 0.3s ease" }}>
                                            <ExternalLink size={14} />
                                        </motion.a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Certifications */}
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem" }}>
                    <Award size={20} color="var(--accent-purple)" />
                    Professional Certifications
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }} className="certs-grid">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 + i * 0.1, type: "spring", stiffness: 100 }}
                            whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(139,92,246,0.12)", borderColor: "rgba(139, 92, 246, 0.3)" }}
                            className="glass-card"
                            style={{ padding: "1.25rem", borderLeft: "3px solid var(--accent-purple)", transition: "all 0.4s ease" }}
                        >
                            <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{cert.title}</h4>
                            <div style={{ display: "flex", gap: "0.75rem", marginBottom: 6, flexWrap: "wrap" }}>
                                <span style={{ fontSize: "0.8rem", color: "var(--accent-purple)", fontWeight: 600 }}>{cert.venue}</span>
                                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{cert.year}</span>
                            </div>
                            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{cert.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @media (max-width: 768px) { .certs-grid { grid-template-columns: 1fr !important; } }
            `}</style>
        </section>
    );
}
