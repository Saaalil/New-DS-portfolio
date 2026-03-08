"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/data/projects";
import { ExternalLink, Github, ChevronDown, ChevronUp, TrendingUp } from "lucide-react";

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="section" ref={ref}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

            <div className="container" style={{ position: "relative", zIndex: 2 }}>
                <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                    <motion.span initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-green)", display: "block", marginBottom: "0.5rem" }}>
                        {"// dashboards.project_observability"}
                    </motion.span>
                    <h2 className="section-title">Projects Dashboard</h2>
                    <p className="section-subtitle">Production workloads, impact metrics, and drill-down details per project panel</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.16 }}
                    className="glass-card"
                    style={{ padding: "0.8rem 1rem", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.6rem" }}
                >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.74rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        execution overview
                    </span>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span className="tech-tag" style={{ fontSize: "0.68rem" }}>{projects.filter((p) => p.featured).length} featured panels</span>
                        <span className="tech-tag" style={{ fontSize: "0.68rem", color: "#22c55e", borderColor: "rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.1)" }}>incident rate: low</span>
                    </div>
                </motion.div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }} className="projects-grid">
                    {projects.filter((p) => p.featured).map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @media (max-width: 768px) { .projects-grid { grid-template-columns: 1fr !important; } }
            `}</style>
        </section>
    );
}

function ProjectCard({ project, index, isInView }: { project: (typeof projects)[0]; index: number; isInView: boolean }) {
    const [expanded, setExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 100 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouse}
            className="glass-card"
            style={{ padding: 0, overflow: "hidden", cursor: "default", position: "relative" }}
        >
            {/* Spotlight effect on hover */}
            {isHovered && (
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.06), transparent 60%)`,
                    pointerEvents: "none",
                    zIndex: 1,
                }} />
            )}

            {/* Gradient bar */}
            <motion.div
                animate={{ scaleX: isHovered ? 1 : 0.3, opacity: isHovered ? 1 : 0.6 }}
                transition={{ duration: 0.4 }}
                style={{ height: 3, background: "var(--gradient-primary)", transformOrigin: "left" }}
            />

            <div style={{ padding: "1.75rem", position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        panel-{String(index + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", color: "#22c55e" }}>healthy</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, flex: 1 }}>{project.title}</h3>
                    <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0, marginLeft: "1rem" }}>
                        {project.github && (
                            <motion.a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub repo for ${project.title}`} whileHover={{ scale: 1.15, borderColor: "var(--accent-cyan)" }} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", transition: "all 0.3s ease", textDecoration: "none" }}>
                                <Github size={14} />
                            </motion.a>
                        )}
                        {project.live && (
                            <motion.a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Live demo for ${project.title}`} whileHover={{ scale: 1.15, borderColor: "var(--accent-purple)" }} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", transition: "all 0.3s ease", textDecoration: "none" }}>
                                <ExternalLink size={14} />
                            </motion.a>
                        )}
                    </div>
                </div>

                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>{project.summary}</p>

                <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                    {project.metrics.map((metric) => (
                        <motion.div key={metric.label} whileHover={{ scale: 1.05, borderColor: "var(--accent-cyan)" }} style={{ padding: "8px 14px", background: "var(--gradient-card)", borderRadius: 10, border: "1px solid var(--border-accent)", display: "flex", alignItems: "center", gap: 6 }}>
                            <TrendingUp size={12} color="var(--accent-cyan)" />
                            <span style={{ fontSize: "0.8rem", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--accent-cyan)" }}>{metric.value}</span>
                            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{metric.label}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={false} animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                    <div style={{ padding: "1rem", background: "var(--bg-glass)", borderRadius: 10, border: "1px solid var(--border-subtle)", marginBottom: "1rem" }}>
                        {[
                            { label: "Problem", color: "var(--accent-purple)", text: project.problem },
                            { label: "Approach", color: "var(--accent-blue)", text: project.approach },
                            { label: "Outcome", color: "var(--accent-green)", text: project.outcome },
                        ].map((section) => (
                            <div key={section.label} style={{ marginBottom: "0.75rem" }}>
                                <span style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: section.color }}>{section.label}</span>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4, lineHeight: 1.6 }}>{section.text}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.button
                    onClick={() => setExpanded(!expanded)}
                    whileHover={{ scale: 1.03, borderColor: "var(--accent-cyan)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", fontSize: "0.78rem", fontWeight: 500, color: "var(--accent-cyan)", background: "transparent", border: "1px solid var(--border-accent)", borderRadius: 8, cursor: "pointer", transition: "all 0.3s ease", marginBottom: "1rem" }}
                >
                    {expanded ? (<>Show Less <ChevronUp size={14} /></>) : (<>Problem → Solution → Impact <ChevronDown size={14} /></>)}
                </motion.button>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {project.techStack.map((tech) => (
                        <span key={tech} className="tech-tag" style={{ fontSize: "0.7rem", padding: "3px 10px" }}>{tech}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
