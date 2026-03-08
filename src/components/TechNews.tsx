"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Newspaper, RefreshCcw, Rss } from "lucide-react";

type Article = {
  id: string;
  title: string;
  url: string;
  author: string;
  publishedAt: string;
  points: number;
  summary: string;
};

type NewsResponse = {
  source: string;
  summarizedBy: string;
  lastUpdated: string;
  articles: Article[];
};

export default function TechNews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<NewsResponse | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadNews = async (soft = false, force = false) => {
    if (soft) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await fetch(
        force ? `/api/tech-news?force=1&t=${Date.now()}` : "/api/tech-news",
        { cache: "no-store" },
      );
      if (!response.ok) throw new Error("Failed to load tech news.");
      const json = (await response.json()) as NewsResponse;
      setData(json);
      setError(null);
    } catch {
      setError("Unable to load live tech news right now.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews();

    const interval = setInterval(() => {
      loadNews(true);
    }, 1000 * 60 * 5);

    return () => clearInterval(interval);
  }, []);

  const updated = useMemo(() => {
    if (!data?.lastUpdated) return "-";
    return new Date(data.lastUpdated).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [data?.lastUpdated]);

  return (
    <section id="news" className="section" ref={ref}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--accent-cyan)", display: "block", marginBottom: "0.45rem" }}
          >
            {"// live.tech_news_center"}
          </motion.span>
          <h2 className="section-title">Tech News Center</h2>
          <p className="section-subtitle">Live, free, auto-refreshing technology headlines curated for your dashboard</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="glass-card"
          style={{ padding: "0.75rem 1rem", marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.6rem" }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            feed status
          </span>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <span className="tech-tag" style={{ fontSize: "0.67rem" }}>{data?.source || "Hacker News API"}</span>
            <span className="tech-tag" style={{ fontSize: "0.67rem" }}>{data?.summarizedBy || "Local summarizer"}</span>
            <span className="tech-tag" style={{ fontSize: "0.67rem", color: "#22c55e", borderColor: "rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.1)" }}>updated: {updated}</span>
          </div>
        </motion.div>

        <div className="glass-card" style={{ padding: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.8rem", gap: "0.7rem", flexWrap: "wrap" }}>
            <h3 style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              <Rss size={16} color="var(--accent-cyan)" />
              Live Headlines
            </h3>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => loadNews(true, true)}
              disabled={refreshing}
              style={{
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-glass)",
                color: "var(--text-secondary)",
                borderRadius: 10,
                padding: "0.45rem 0.65rem",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.78rem",
                cursor: refreshing ? "not-allowed" : "pointer",
              }}
            >
              <RefreshCcw size={14} /> {refreshing ? "Refreshing..." : "Refresh"}
            </motion.button>
          </div>

          {loading ? (
            <div style={{ padding: "1rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}>
              Loading live news feed...
            </div>
          ) : error ? (
            <div style={{ padding: "1rem", color: "#ef4444", fontSize: "0.85rem" }}>{error}</div>
          ) : (
            <div style={{ display: "grid", gap: "0.7rem" }}>
              {data?.articles?.map((article, index) => (
                <motion.a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.12 + index * 0.04 }}
                  className="glass-card"
                  style={{
                    textDecoration: "none",
                    padding: "0.85rem",
                    borderRadius: 10,
                    border: "1px solid var(--border-subtle)",
                    background: "rgba(11,15,20,0.52)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.8rem" }}>
                    <div>
                      <h4 style={{ color: "var(--text-primary)", fontSize: "0.95rem", lineHeight: 1.45, marginBottom: 6 }}>{article.title}</h4>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.6 }}>{article.summary}</p>
                    </div>
                    <ExternalLink size={15} color="var(--accent-cyan)" />
                  </div>
                  <div style={{ marginTop: "0.55rem", display: "flex", gap: "0.45rem", flexWrap: "wrap", alignItems: "center" }}>
                    <span className="tech-tag" style={{ fontSize: "0.64rem" }}>
                      <Newspaper size={11} style={{ marginRight: 4 }} /> {article.points} pts
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)" }}>by {article.author}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
