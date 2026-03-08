"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)",
                transformOrigin: "0%",
                scaleX,
                zIndex: 10001,
            }}
        />
    );
}
