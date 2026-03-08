"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "@/data/skills";
import { Brain, BarChart3, LayoutDashboard, Code2, Cloud, Sparkles, Database } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
    brain: <Brain size={22} />,
    "bar-chart": <BarChart3 size={22} />,
    "layout-dashboard": <LayoutDashboard size={22} />,
    code: <Code2 size={22} />,
    cloud: <Cloud size={22} />,
    sparkles: <Sparkles size={22} />,
    database: <Database size={22} />,
};

const categoryColors = [
    { border: "#06b6d4", bg: "rgba(6, 182, 212, 0.08)", glow: "rgba(6, 182, 212, 0.15)" },
    { border: "#8b5cf6", bg: "rgba(139, 92, 246, 0.08)", glow: "rgba(139, 92, 246, 0.15)" },
    { border: "#ec4899", bg: "rgba(236, 72, 153, 0.08)", glow: "rgba(236, 72, 153, 0.15)" },
    { border: "#3b82f6", bg: "rgba(59, 130, 246, 0.08)", glow: "rgba(59, 130, 246, 0.15)" },
    { border: "#10b981", bg: "rgba(16, 185, 129, 0.08)", glow: "rgba(16, 185, 129, 0.15)" },
    { border: "#f59e0b", bg: "rgba(245, 158, 11, 0.08)", glow: "rgba(245, 158, 11, 0.15)" },
];

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const totalSkills = skillCategories.reduce((sum, category) => sum + category.skills.length, 0);

    return (
        <section id="skills" className="section" ref={ref}>
            <div className="container">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                    <motion.span initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-purple)", display: "block", marginBottom: "0.5rem" }}>
                        {"// datasource.skills_inventory"}
                    </motion.span>
                    <h2 className="section-title">Skills Control Panel</h2>
                    <p className="section-subtitle">Panelized capability map for AI, data, cloud, and engineering systems</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="glass-card"
                    style={{ padding: "0.8rem 1rem", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.6rem" }}
                >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        skill telemetry
                    </span>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span className="tech-tag" style={{ fontSize: "0.68rem" }}>{skillCategories.length} categories</span>
                        <span className="tech-tag" style={{ fontSize: "0.68rem" }}>{totalSkills}+ tools tracked</span>
                        <span className="tech-tag" style={{ fontSize: "0.68rem", color: "#22c55e", borderColor: "rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.12)" }}>status: online</span>
                    </div>
                </motion.div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }} className="skills-grid">
                    {skillCategories.map((category, catIdx) => {
                        const colors = categoryColors[catIdx % categoryColors.length];
                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{ duration: 0.6, delay: catIdx * 0.1, type: "spring", stiffness: 100 }}
                                whileHover={{ y: -6, boxShadow: `0 20px 40px ${colors.glow}` }}
                                className="glass-card"
                                style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "1rem", cursor: "default", borderColor: "transparent", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.55rem" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                        panel-{String(catIdx + 1).padStart(2, "0")}
                                    </span>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", color: "#22c55e" }}>
                                        {category.skills.length} metrics
                                    </span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                    <motion.div
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                        style={{ width: 44, height: 44, borderRadius: 12, background: colors.bg, border: `1px solid ${colors.border}40`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.border, flexShrink: 0 }}
                                    >
                                        {iconMap[category.icon] || <Code2 size={22} />}
                                    </motion.div>
                                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>{category.title}</h3>
                                </div>

                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                                    {category.skills.map((skill, skillIdx) => (
                                        <motion.span
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.7 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ duration: 0.3, delay: catIdx * 0.1 + skillIdx * 0.03 + 0.3 }}
                                            whileHover={{ scale: 1.08, borderColor: colors.border, background: colors.bg, color: colors.border, boxShadow: `0 0 15px ${colors.glow}` }}
                                            style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text-secondary)", background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border-subtle)", padding: "6px 14px", borderRadius: "8px", cursor: "default", transition: "all 0.3s ease", whiteSpace: "nowrap" }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
