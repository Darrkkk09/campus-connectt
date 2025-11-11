"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Home,
    MonitorPlay,
    Code as CodeIcon,
    Briefcase,
    Mail,
} from "lucide-react";

export default function Navbar() {
    const [active, setActive] = useState("Home");

    const tabs = [
        { key: "Home", label: "Home", icon: Home, href: "#home" },
        {
            key: "Interview",
            label: "Interview",
            icon: MonitorPlay,
            href: "#ai-interview",
        },
        { key: "Jobs", label: "Jobs", icon: Briefcase, href: "#internships" },
        { key: "Coding", label: "Coding", icon: CodeIcon, href: "#coding" },
        { key: "Contact", label: "Contact", icon: Mail, href: "#contact" },
    ];

    useEffect(() => {
        const sections = tabs.map((tab) => document.querySelector(tab.href));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const visibleSection = tabs.find(
                            (tab) => tab.href === `#${entry.target.id}`
                        );
                        if (visibleSection) setActive(visibleSection.key);
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach((sec) => sec && observer.observe(sec));
        return () => observer.disconnect();
    }, []);

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] md:w-1/2 z-50">
            <div className="flex items-center justify-between bg-black/60 border border-[#2f2f2f] rounded-full shadow-[0_0_15px_rgba(69,227,93,0.15)] backdrop-blur-md px-6 py-3 transition-all duration-300 hover:shadow-[0_0_25px_rgba(69,227,93,0.3)]">
                {/* Logo */}
                <Link
                    href="/#home"
                    onClick={() => setActive("Home")}
                    className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
                >
                    <Image
                        src="/logo.svg"
                        alt="CampusConnect Logo"
                        width={160}
                        height={50}
                        className="object-contain"
                    />
                </Link>

                {/* Navigation Tabs */}
                <div className="hidden md:flex items-center space-x-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = active === tab.key;

                        return (
                            <a
                                key={tab.key}
                                href={tab.href}
                                onClick={() => setActive(tab.key)}
                                className={`group relative flex items-center gap-2 text-[15px] font-medium transition-all duration-300 ${
                                    isActive
                                        ? "text-[#45e35d]"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                <Icon
                                    size={18}
                                    strokeWidth={2}
                                    className={`transition-transform duration-300 ${
                                        isActive
                                            ? "scale-110 text-[#45e35d]"
                                            : "group-hover:scale-110"
                                    }`}
                                />
                                {tab.label}

                                {/* Underline animation */}
                                <span className="absolute bottom-[-5px] left-0 h-[2px] bg-[#45e35d] rounded-full transition-all duration-300 w-0 group-hover:w-full"></span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
