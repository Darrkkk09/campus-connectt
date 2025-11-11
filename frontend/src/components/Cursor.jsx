"use client";

import { useEffect, useState } from "react";
import "../app/Cursor.css";

export default function Cursor() {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            className="cursor-glow"
            style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
            }}
        />
    );
}
