"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { Activity, AlertTriangle, CheckCircle2, Cpu, Database, Gauge, TrendingUp, User2 } from "lucide-react";

const kpis = [
  { label: "Projects Delivered", value: "10+", trend: "+18%", icon: <Gauge size={16} />, status: "healthy" },
  { label: "Internships", value: "4", trend: "+1", icon: <User2 size={16} />, status: "healthy" },
  { label: "Publications", value: "1", trend: "IEEE", icon: <Database size={16} />, status: "stable" },
  { label: "Model Accuracy Peak", value: "99.5%", trend: "best run", icon: <Cpu size={16} />, status: "healthy" },
];

const incidents = [
  { time: "11:41", msg: "Radar training pipeline reached 96.5% accuracy", level: "info" },
  { time: "10:28", msg: "MediCure NLP endpoint latency reduced by 31ms", level: "success" },
  { time: "09:52", msg: "Enterprise forecasting model drift check completed", level: "info" },
  { time: "08:17", msg: "No critical alerts in production workload", level: "success" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const bars = useMemo(() => [44, 58, 49, 71, 67, 82, 76, 88, 84, 92], []);

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--accent-cyan)", display: "block", marginBottom: "0.45rem" }}
          >
            {"// observability.overview"}
          </motion.span>
          <h2 className="section-title">About Me — Live Dashboard</h2>
          <p className="section-subtitle">Real-time snapshot of profile health, impact metrics, and execution history</p>
        </motion.div>

        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1.3fr 0.7fr" }} className="about-dash-grid">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="glass-card"
            style={{ padding: "1rem", borderRadius: 12 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.8rem" }}>
              <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                System KPI Overview
              </h3>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.73rem", color: "#22c55e", fontFamily: "var(--font-mono)" }}>
                <CheckCircle2 size={14} /> all systems nominal
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "0.7rem" }} className="about-kpi-grid">
              {kpis.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + idx * 0.06, duration: 0.35 }}
                  style={{
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 10,
                    background: "rgba(15,20,27,0.65)",
                    padding: "0.8rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>{item.label}</span>
                    <span style={{ color: item.status === "healthy" ? "#22c55e" : "#f59e0b" }}>{item.icon}</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>{item.value}</div>
                  <div style={{ marginTop: 4, fontSize: "0.72rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)" }}>{item.trend}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="glass-card"
            style={{ padding: "1rem", borderRadius: 12 }}
          >
            <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
              Alert Channel
            </h3>

            <div style={{ display: "grid", gap: "0.5rem" }}>
              <StatusRow label="Critical Alerts" value="0" tone="#22c55e" icon={<CheckCircle2 size={14} />} />
              <StatusRow label="Warning Alerts" value="1" tone="#f59e0b" icon={<AlertTriangle size={14} />} />
              <StatusRow label="Telemetry" value="ACTIVE" tone="#3b82f6" icon={<Activity size={14} />} />
            </div>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }} className="about-panels-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card"
            style={{ padding: "1rem", borderRadius: 12 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Impact Trend</h3>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#22c55e", fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>
                <TrendingUp size={13} /> +12.4%
              </span>
            </div>

            <div style={{ height: 120, display: "flex", alignItems: "end", gap: 6 }}>
              {bars.map((bar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ height: 0 }}
                  animate={isInView ? { height: `${bar}%` } : {}}
                  transition={{ duration: 0.45, delay: 0.38 + idx * 0.04 }}
                  style={{
                    flex: 1,
                    borderRadius: "6px 6px 2px 2px",
                    background: idx > 7 ? "linear-gradient(180deg,#22c55e,#14532d)" : "linear-gradient(180deg,#f97316,#7c2d12)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              ))}
            </div>

            <p style={{ marginTop: "0.7rem", fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              ML and analytics systems across defense, healthcare, and enterprise domains show strong upward reliability and performance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="glass-card"
            style={{ padding: "1rem", borderRadius: 12 }}
          >
            <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Live Event Feed
            </h3>

            <div style={{ display: "grid", gap: "0.45rem" }}>
              {incidents.map((log, idx) => (
                <motion.div
                  key={`${log.time}-${idx}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.42 + idx * 0.08 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "52px 1fr",
                    gap: "0.6rem",
                    padding: "0.45rem 0.55rem",
                    borderRadius: 8,
                    border: "1px solid var(--border-subtle)",
                    background: "rgba(11,15,20,0.58)",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>{log.time}</span>
                  <span style={{ fontSize: "0.78rem", color: log.level === "success" ? "#86efac" : "var(--text-secondary)" }}>{log.msg}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.44 }}
          className="glass-card"
          style={{ marginTop: "1rem", padding: "1rem", borderRadius: 12 }}
        >
          <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.7rem" }}>
            Operator Summary
          </h3>
          <p style={{ fontSize: "0.94rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
            I&apos;m <strong style={{ color: "var(--text-primary)" }}>Salil Hiremath</strong>, focused on building ML systems that convert raw data into actionable decisions.
            Current focus areas include production AI pipelines, real-time inference, and outcome-driven analytics for defense, healthcare, and enterprise environments.
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 980px) {
          .about-dash-grid { grid-template-columns: 1fr !important; }
          .about-kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .about-panels-grid { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 560px) {
          .about-kpi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function StatusRow({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: string;
  tone: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
        border: "1px solid var(--border-subtle)",
        padding: "0.6rem 0.7rem",
        background: "rgba(11,15,20,0.58)",
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--text-secondary)", fontSize: "0.8rem" }}>
        <span style={{ color: tone }}>{icon}</span>
        {label}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", color: tone, fontSize: "0.76rem" }}>{value}</span>
    </div>
  );
}
