"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Publications from "@/components/Publications";
import Contact from "@/components/Contact";
import TechNews from "@/components/TechNews";

const bootCommands = [
  "$ ssh salil@portfolio-node",
  "Authenticating with deployment key... OK",
  "$ uname -a",
  "Linux portfolio-node 6.8.4 x86_64 GNU/Linux",
  "$ source ./env/production.sh",
  "ENV loaded: NODE_ENV=production | REGION=bom1",
  "$ nvidia-smi --query-gpu=name,memory.total --format=csv,noheader",
  "NVIDIA L4, 23034 MiB",
  "$ python train_pipeline.py --profile=prod --resume=latest",
  "[data] reading parquet shards: 16/16",
  "[feature-store] materialized features: 128",
  "[train] warmup scheduler initialized",
  "Epoch 001/100  loss: 0.421  val_acc: 0.72",
  "Epoch 010/100  loss: 0.263  val_acc: 0.82",
  "Epoch 025/100  loss: 0.164  val_acc: 0.89",
  "Epoch 050/100  loss: 0.091  val_acc: 0.93",
  "Epoch 075/100  loss: 0.041  val_acc: 0.97",
  "Epoch 100/100  loss: 0.018  val_acc: 0.987",
  "[eval] F1=0.981 | precision=0.985 | recall=0.978",
  "$ mlflow models register -m runs:/a9f21a/model -n portfolio-model",
  "Model registry version: v7",
  "$ docker build -t salil/portfolio:latest .",
  "[docker] layers cached: 14/17",
  "$ docker push registry/salil-portfolio:latest",
  "digest: sha256:c43be3... size: 1789",
  "$ vercel pull --yes --environment=production",
  "$ vercel deploy --prod --yes",
  "Inspect: https://salil-portfolio-liart.vercel.app",
  "Deployment status: READY  |  telemetry stream: ACTIVE",
  "Awaiting operator confirmation...",
];

export default function HomeWithBoot() {
  const [visible, setVisible] = useState(true);
  const [lineCount, setLineCount] = useState(0);
  const [readyToProceed, setReadyToProceed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLineCount((current) => {
        if (current >= bootCommands.length) {
          clearInterval(interval);
          return current;
        }
        return current + 1;
      });
    }, 135);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (lineCount >= bootCommands.length) {
      setReadyToProceed(true);
    }
  }, [lineCount]);

  useEffect(() => {
    if (!readyToProceed) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setVisible(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [readyToProceed]);

  const progress = useMemo(() => (lineCount / bootCommands.length) * 100, [lineCount]);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10050,
              background: "#0b0f14",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.25rem",
            }}
          >
            <div className="boot-terminal">
              <div className="boot-terminal__head">
                <div className="boot-terminal__dots">
                  <span />
                  <span />
                  <span />
                </div>
                <p>salil-monitoring-init.sh</p>
                <span className="boot-terminal__state">{readyToProceed ? "ready" : "booting"}</span>
              </div>

              <div className="boot-terminal__body">
                {bootCommands.slice(0, lineCount).map((line, index) => (
                  <div key={`${index}-${line}`} className={`boot-line ${line.startsWith("$") ? "boot-line--cmd" : ""}`}>
                    {line}
                  </div>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="boot-cursor"
                />
              </div>

              <div className="boot-terminal__footer">
                <div className="boot-progress-track">
                  <motion.div
                    className="boot-progress-fill"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut", duration: 0.2 }}
                  />
                </div>
                <span>{Math.min(100, Math.round(progress))}%</span>
              </div>

              {readyToProceed && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="boot-enter-hint"
                >
                  <span>Press Enter to proceed</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.985, filter: "blur(10px)" }}
        animate={{
          opacity: visible ? 0.18 : 1,
          y: visible ? 10 : 0,
          scale: visible ? 0.99 : 1,
          filter: visible ? "blur(4px)" : "blur(0px)",
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="dashboard-shell"
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Publications />
        <TechNews />
        <Contact />
      </motion.div>
    </>
  );
}
