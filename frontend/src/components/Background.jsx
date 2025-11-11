"use client";

import React, { useRef, useEffect } from "react";

const Background = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * 100 + 50,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                speedZ: (Math.random() - 0.5) * 0.1,
                opacity: Math.random() * 0.6 + 0.3,
            });
        }

        const handleInteraction = (e) => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            mousePos.current = { x: clientX, y: clientY };
        };
        window.addEventListener("mousemove", handleInteraction);
        window.addEventListener("touchmove", handleInteraction, {
            passive: true,
        });
        window.addEventListener("touchstart", handleInteraction, {
            passive: true,
        });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                const perspective = 1000 / (1000 + p.z);
                const x = p.x * perspective;
                const y = p.y * perspective;
                const size = p.size * perspective;

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
                ctx.fill();

                p.x += p.speedX;
                p.y += p.speedY;
                p.z += p.speedZ;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                if (p.z < 25) p.z = 150;
                if (p.z > 150) p.z = 25;
            });

            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleInteraction);
            window.removeEventListener("touchmove", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
        />
    );
};

export default Background;
