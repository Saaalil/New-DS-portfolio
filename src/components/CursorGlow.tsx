"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
    const [mounted, setMounted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
    const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });

    useEffect(() => {
        setMounted(true);

        const handleMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.style.cursor === "pointer"
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseover", handleOver);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseover", handleOver);
        };
    }, [cursorX, cursorY]);

    if (!mounted) return null;

    return (
        <>
            {/* Main cursor glow */}
            <motion.div
                style={{
                    position: "fixed",
                    left: springX,
                    top: springY,
                    width: isHovering ? 60 : 30,
                    height: isHovering ? 60 : 30,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
                    pointerEvents: "none",
                    zIndex: 9999,
                    transform: "translate(-50%, -50%)",
                    transition: "width 0.3s ease, height 0.3s ease",
                    mixBlendMode: "screen",
                }}
            />

            {/* Trailing glow orb */}
            <motion.div
                style={{
                    position: "fixed",
                    left: springX,
                    top: springY,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, rgba(139,92,246,0.02) 40%, transparent 70%)",
                    pointerEvents: "none",
                    zIndex: 9998,
                    transform: "translate(-50%, -50%)",
                    filter: "blur(1px)",
                }}
            />

            {/* Cursor dot */}
            <motion.div
                style={{
                    position: "fixed",
                    left: cursorX,
                    top: cursorY,
                    width: isHovering ? 8 : 5,
                    height: isHovering ? 8 : 5,
                    borderRadius: "50%",
                    background: "#06b6d4",
                    pointerEvents: "none",
                    zIndex: 10000,
                    transform: "translate(-50%, -50%)",
                    transition: "width 0.2s ease, height 0.2s ease",
                    boxShadow: "0 0 10px rgba(6,182,212,0.5)",
                }}
            />
        </>
    );
}
