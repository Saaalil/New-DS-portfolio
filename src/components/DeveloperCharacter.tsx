"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface Props {
    className?: string;
}

export default function DeveloperCharacter({ className }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    // Raw mouse position relative to character center
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for head rotation
    const headRotateX = useSpring(0, { stiffness: 50, damping: 20 });
    const headRotateY = useSpring(0, { stiffness: 50, damping: 20 });

    // Smooth springs for eye pupils
    const pupilX = useSpring(0, { stiffness: 80, damping: 15 });
    const pupilY = useSpring(0, { stiffness: 80, damping: 15 });

    // Body subtle lean
    const bodyLean = useSpring(0, { stiffness: 30, damping: 25 });

    // Transform values for SVG
    const headTranslateX = useTransform(headRotateY, [-20, 20], [-8, 8]);
    const headTranslateY = useTransform(headRotateX, [-15, 15], [5, -5]);

    // Eye/pupil transforms (must be at top level to satisfy Rules of Hooks)
    const eyebrowTranslateY = useTransform(pupilY, [-4, 4], [-1, 1]);
    const leftPupilCx = useTransform(pupilX, [-6, 6], [194, 202]);
    const leftPupilCy = useTransform(pupilY, [-4, 4], [165, 171]);
    const leftHighlightCx = useTransform(pupilX, [-6, 6], [195.5, 203.5]);
    const leftHighlightCy = useTransform(pupilY, [-4, 4], [164, 170]);
    const rightPupilCx = useTransform(pupilX, [-6, 6], [218, 226]);
    const rightPupilCy = useTransform(pupilY, [-4, 4], [165, 171]);
    const rightHighlightCx = useTransform(pupilX, [-6, 6], [219.5, 227.5]);
    const rightHighlightCy = useTransform(pupilY, [-4, 4], [164, 170]);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height * 0.3; // Head is in upper portion

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            // Normalize to -1 to 1 range (with distance falloff)
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDist = Math.max(window.innerWidth, window.innerHeight);
            const normalizedDist = Math.min(distance / maxDist, 1);

            const angleX = (deltaY / maxDist) * 30; // Up/down tilt
            const angleY = (deltaX / maxDist) * 40; // Left/right turn

            headRotateX.set(Math.max(-15, Math.min(15, angleX)));
            headRotateY.set(Math.max(-20, Math.min(20, angleY)));

            // Pupils track more aggressively
            const pupilMaxX = 6;
            const pupilMaxY = 4;
            pupilX.set(Math.max(-pupilMaxX, Math.min(pupilMaxX, (deltaX / (maxDist * 0.3)) * pupilMaxX)));
            pupilY.set(Math.max(-pupilMaxY, Math.min(pupilMaxY, (deltaY / (maxDist * 0.3)) * pupilMaxY)));

            // Subtle body lean
            bodyLean.set((deltaX / maxDist) * 3);

            mouseX.set(deltaX);
            mouseY.set(deltaY);
        },
        [headRotateX, headRotateY, pupilX, pupilY, bodyLean, mouseX, mouseY]
    );

    useEffect(() => {
        setMounted(true);
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    if (!mounted) return <div style={{ width: 420, height: 420 }} />;

    return (
        <div ref={containerRef} className={className} style={{ position: "relative", width: 420, height: 420 }}>
            {/* Ambient glow behind character */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 300,
                    height: 300,
                    background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(40px)",
                    pointerEvents: "none",
                }}
            />

            <svg
                viewBox="0 0 420 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
                <defs>
                    {/* Screen glow gradient */}
                    <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                    </linearGradient>

                    {/* Skin gradient */}
                    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf84" />
                        <stop offset="100%" stopColor="#f0a060" />
                    </linearGradient>

                    {/* Hair gradient */}
                    <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2d1b0e" />
                        <stop offset="100%" stopColor="#1a0f06" />
                    </linearGradient>

                    {/* Shirt gradient */}
                    <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>

                    {/* Desk gradient */}
                    <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#374151" />
                        <stop offset="100%" stopColor="#1f2937" />
                    </linearGradient>

                    {/* Laptop body */}
                    <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#4b5563" />
                        <stop offset="100%" stopColor="#374151" />
                    </linearGradient>

                    {/* Screen content gradient */}
                    <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0d1117" />
                        <stop offset="100%" stopColor="#161b22" />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="screenGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.3" />
                    </filter>
                </defs>

                {/* ═══ DESK ═══ */}
                <motion.rect
                    x="60" y="310" width="300" height="12" rx="4"
                    fill="url(#deskGrad)"
                    filter="url(#softShadow)"
                    style={{ translateX: bodyLean }}
                />
                {/* Desk legs */}
                <rect x="90" y="322" width="8" height="60" rx="2" fill="#374151" opacity="0.6" />
                <rect x="322" y="322" width="8" height="60" rx="2" fill="#374151" opacity="0.6" />

                {/* ═══ LAPTOP BASE ═══ */}
                <motion.g style={{ translateX: bodyLean }}>
                    {/* Laptop bottom */}
                    <rect x="130" y="296" width="160" height="14" rx="3" fill="url(#laptopGrad)" />
                    {/* Trackpad */}
                    <rect x="190" y="300" width="40" height="6" rx="2" fill="#4b5563" opacity="0.5" />

                    {/* ═══ LAPTOP SCREEN ═══ */}
                    <g transform="translate(140, 190)">
                        {/* Screen bezel */}
                        <rect x="0" y="0" width="140" height="106" rx="6" fill="#1f2937" />
                        {/* Actual screen */}
                        <rect x="6" y="6" width="128" height="88" rx="3" fill="url(#codeGrad)" />

                        {/* Screen glow effect */}
                        <rect
                            x="6" y="6" width="128" height="88" rx="3"
                            fill="url(#screenGlow)"
                            opacity="0.1"
                        />

                        {/* Code lines on screen */}
                        <g opacity="0.8">
                            {/* Line numbers */}
                            <text x="12" y="22" fontSize="5" fill="#6b7280" fontFamily="monospace">1</text>
                            <text x="12" y="30" fontSize="5" fill="#6b7280" fontFamily="monospace">2</text>
                            <text x="12" y="38" fontSize="5" fill="#6b7280" fontFamily="monospace">3</text>
                            <text x="12" y="46" fontSize="5" fill="#6b7280" fontFamily="monospace">4</text>
                            <text x="12" y="54" fontSize="5" fill="#6b7280" fontFamily="monospace">5</text>
                            <text x="12" y="62" fontSize="5" fill="#6b7280" fontFamily="monospace">6</text>
                            <text x="12" y="70" fontSize="5" fill="#6b7280" fontFamily="monospace">7</text>
                            <text x="12" y="78" fontSize="5" fill="#6b7280" fontFamily="monospace">8</text>
                            <text x="12" y="86" fontSize="5" fill="#6b7280" fontFamily="monospace">9</text>

                            {/* Code syntax highlighting */}
                            <CodeLines />
                        </g>

                        {/* Webcam dot */}
                        <circle cx="70" cy="3" r="1.5" fill="#374151" />
                        <circle cx="70" cy="3" r="0.8" fill="#22c55e" opacity="0.8" />
                    </g>
                </motion.g>

                {/* ═══ BODY / TORSO ═══ */}
                <motion.g style={{ translateX: bodyLean }}>
                    {/* Shoulders / Upper body */}
                    <path
                        d="M160,260 Q165,230 185,220 L210,215 L235,220 Q255,230 260,260 L260,310 L160,310 Z"
                        fill="url(#shirtGrad)"
                        filter="url(#softShadow)"
                    />

                    {/* Collar */}
                    <path
                        d="M195,218 L210,228 L225,218"
                        stroke="#06b6d4"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.6"
                    />

                    {/* ═══ ARMS ═══ */}
                    {/* Left arm */}
                    <path
                        d="M165,240 Q145,265 155,296"
                        stroke="#1e293b"
                        strokeWidth="20"
                        strokeLinecap="round"
                        fill="none"
                    />
                    {/* Left hand */}
                    <circle cx="155" cy="296" r="8" fill="url(#skinGrad)" />

                    {/* Right arm */}
                    <path
                        d="M255,240 Q275,265 265,296"
                        stroke="#1e293b"
                        strokeWidth="20"
                        strokeLinecap="round"
                        fill="none"
                    />
                    {/* Right hand */}
                    <circle cx="265" cy="296" r="8" fill="url(#skinGrad)" />

                    {/* Fingers on keyboard (subtle) */}
                    <g opacity="0.9">
                        <ellipse cx="170" cy="298" rx="4" ry="2.5" fill="#f0a060" />
                        <ellipse cx="180" cy="300" rx="4" ry="2.5" fill="#f0a060" />
                        <ellipse cx="240" cy="300" rx="4" ry="2.5" fill="#f0a060" />
                        <ellipse cx="250" cy="298" rx="4" ry="2.5" fill="#f0a060" />
                    </g>
                </motion.g>

                {/* ═══ HEAD (CURSOR TRACKING) ═══ */}
                <motion.g
                    style={{
                        translateX: headTranslateX,
                        translateY: headTranslateY,
                        originX: "210px",
                        originY: "185px",
                    }}
                >
                    {/* Neck */}
                    <rect x="200" y="205" width="20" height="18" rx="4" fill="url(#skinGrad)" />

                    {/* Head shape */}
                    <ellipse cx="210" cy="175" rx="35" ry="40" fill="url(#skinGrad)" filter="url(#softShadow)" />

                    {/* Hair */}
                    <path
                        d="M175,170 Q175,135 210,130 Q245,135 245,170 Q245,155 235,148 Q225,142 210,140 Q195,142 185,148 Q175,155 175,170 Z"
                        fill="url(#hairGrad)"
                    />
                    {/* Side hair */}
                    <path d="M175,170 Q173,180 176,185" stroke="#1a0f06" strokeWidth="4" fill="none" />
                    <path d="M245,170 Q247,180 244,185" stroke="#1a0f06" strokeWidth="4" fill="none" />

                    {/* ═══ FACE ═══ */}

                    {/* Eyebrows */}
                    <motion.g style={{ translateX: pupilX, translateY: eyebrowTranslateY }}>
                        <path d="M192,160 Q197,157 204,159" stroke="#2d1b0e" strokeWidth="2" strokeLinecap="round" fill="none" />
                        <path d="M216,159 Q223,157 228,160" stroke="#2d1b0e" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </motion.g>

                    {/* Eyes */}
                    <g>
                        {/* Left eye white */}
                        <ellipse cx="198" cy="168" rx="9" ry="7" fill="#fff" />
                        {/* Left pupil - tracks cursor */}
                        <motion.circle
                            r="3.5"
                            fill="#1a0f06"
                            style={{
                                cx: leftPupilCx,
                                cy: leftPupilCy,
                            }}
                        />
                        {/* Left eye highlight */}
                        <motion.circle
                            r="1.5"
                            fill="#fff"
                            opacity="0.8"
                            style={{
                                cx: leftHighlightCx,
                                cy: leftHighlightCy,
                            }}
                        />

                        {/* Right eye white */}
                        <ellipse cx="222" cy="168" rx="9" ry="7" fill="#fff" />
                        {/* Right pupil - tracks cursor */}
                        <motion.circle
                            r="3.5"
                            fill="#1a0f06"
                            style={{
                                cx: rightPupilCx,
                                cy: rightPupilCy,
                            }}
                        />
                        {/* Right eye highlight */}
                        <motion.circle
                            r="1.5"
                            fill="#fff"
                            opacity="0.8"
                            style={{
                                cx: rightHighlightCx,
                                cy: rightHighlightCy,
                            }}
                        />
                    </g>

                    {/* Screen reflection in glasses/eyes */}
                    <ellipse cx="198" cy="168" rx="9" ry="7" fill="url(#screenGlow)" opacity="0.08" />
                    <ellipse cx="222" cy="168" rx="9" ry="7" fill="url(#screenGlow)" opacity="0.08" />

                    {/* Nose */}
                    <path d="M208,175 Q210,180 212,175" stroke="#e09050" strokeWidth="1.5" fill="none" opacity="0.6" />

                    {/* Mouth - slight smile */}
                    <path d="M200,188 Q210,194 220,188" stroke="#d08050" strokeWidth="1.8" strokeLinecap="round" fill="none" />

                    {/* Ears */}
                    <ellipse cx="175" cy="175" rx="5" ry="8" fill="#f0a060" />
                    <ellipse cx="245" cy="175" rx="5" ry="8" fill="#f0a060" />

                    {/* Headphone band (optional cool detail) */}
                    <path
                        d="M175,162 Q175,135 210,130 Q245,135 245,162"
                        stroke="#374151"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.0"
                    />
                </motion.g>

                {/* ═══ FLOATING CODE ELEMENTS ═══ */}
                <FloatingElements />

                {/* ═══ SCREEN LIGHT ON FACE (subtle) ═══ */}
                <motion.ellipse
                    cx="210" cy="180" rx="30" ry="25"
                    fill="url(#screenGlow)"
                    opacity="0.04"
                    style={{
                        translateX: headTranslateX,
                        translateY: headTranslateY,
                    }}
                />
            </svg>

            {/* Coffee cup (DOM element for better animation) */}
            <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    bottom: 85,
                    right: 55,
                    fontSize: "1.5rem",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
            >
                ☕
            </motion.div>

            {/* Steam from coffee */}
            <div style={{ position: "absolute", bottom: 105, right: 62, pointerEvents: "none" }}>
                <motion.div
                    animate={{ y: [-2, -15], opacity: [0.6, 0], x: [-2, 3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}
                >
                    ~
                </motion.div>
                <motion.div
                    animate={{ y: [-2, -18], opacity: [0.4, 0], x: [2, -2] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
                    style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.2)", marginLeft: 4 }}
                >
                    ~
                </motion.div>
            </div>
        </div>
    );
}

/* Animated code lines on the laptop screen */
function CodeLines() {
    return (
        <g>
            {/* import statement */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <text x="22" y="22" fontSize="4.5" fill="#c678dd" fontFamily="monospace">import</text>
                <text x="44" y="22" fontSize="4.5" fill="#e5c07b" fontFamily="monospace"> torch</text>
            </motion.g>

            {/* def line */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <text x="22" y="30" fontSize="4.5" fill="#c678dd" fontFamily="monospace">from</text>
                <text x="38" y="30" fontSize="4.5" fill="#e5c07b" fontFamily="monospace"> sklearn</text>
                <text x="60" y="30" fontSize="4.5" fill="#c678dd" fontFamily="monospace"> import</text>
            </motion.g>

            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 1.1, duration: 0.5 }}
            >
                <text x="22" y="38" fontSize="4.5" fill="#61afef" fontFamily="monospace">  </text>
            </motion.g>

            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 1.4, duration: 0.5 }}
            >
                <text x="22" y="46" fontSize="4.5" fill="#c678dd" fontFamily="monospace">def</text>
                <text x="36" y="46" fontSize="4.5" fill="#61afef" fontFamily="monospace"> train</text>
                <text x="54" y="46" fontSize="4.5" fill="#abb2bf" fontFamily="monospace">(model):</text>
            </motion.g>

            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 1.7, duration: 0.5 }}
            >
                <text x="28" y="54" fontSize="4.5" fill="#abb2bf" fontFamily="monospace">  loss = </text>
                <text x="56" y="54" fontSize="4.5" fill="#d19a66" fontFamily="monospace">0.001</text>
            </motion.g>

            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 2.0, duration: 0.5 }}
            >
                <text x="28" y="62" fontSize="4.5" fill="#c678dd" fontFamily="monospace">  for</text>
                <text x="44" y="62" fontSize="4.5" fill="#abb2bf" fontFamily="monospace"> epoch </text>
                <text x="64" y="62" fontSize="4.5" fill="#c678dd" fontFamily="monospace">in</text>
            </motion.g>

            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 2.3, duration: 0.5 }}
            >
                <text x="28" y="70" fontSize="4.5" fill="#abb2bf" fontFamily="monospace">    model.</text>
                <text x="60" y="70" fontSize="4.5" fill="#61afef" fontFamily="monospace">fit</text>
                <text x="72" y="70" fontSize="4.5" fill="#abb2bf" fontFamily="monospace">(X)</text>
            </motion.g>

            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 2.6, duration: 0.5 }}
            >
                <text x="28" y="78" fontSize="4.5" fill="#c678dd" fontFamily="monospace">  return</text>
                <text x="56" y="78" fontSize="4.5" fill="#abb2bf" fontFamily="monospace"> model</text>
            </motion.g>

            {/* Blinking cursor */}
            <motion.rect
                x="22" y="82" width="4" height="6" rx="0.5"
                fill="#06b6d4"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
            />
        </g>
    );
}

/* Floating brackets, symbols around the developer */
function FloatingElements() {
    const elements = [
        { text: "{ }", x: 50, y: 150, delay: 0, color: "#06b6d4" },
        { text: "< />", x: 340, y: 130, delay: 0.5, color: "#8b5cf6" },
        { text: "=>", x: 360, y: 240, delay: 1, color: "#3b82f6" },
        { text: "( )", x: 40, y: 260, delay: 1.5, color: "#ec4899" },
        { text: "//", x: 70, y: 200, delay: 2, color: "#10b981" },
        { text: "[]", x: 350, y: 180, delay: 0.8, color: "#f59e0b" },
    ];

    return (
        <g>
            {elements.map((el, i) => (
                <motion.text
                    key={i}
                    x={el.x}
                    y={el.y}
                    fill={el.color}
                    fontSize="14"
                    fontFamily="'JetBrains Mono', monospace"
                    fontWeight="600"
                    opacity="0.25"
                    animate={{
                        y: [el.y, el.y - 12, el.y],
                        opacity: [0.15, 0.35, 0.15],
                    }}
                    transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        delay: el.delay,
                        ease: "easeInOut",
                    }}
                >
                    {el.text}
                </motion.text>
            ))}
        </g>
    );
}
