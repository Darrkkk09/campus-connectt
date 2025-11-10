"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Home,
    MonitorPlay,
    Code as CodeIcon,
    Briefcase,
    Mail,
    LogIn,
} from "lucide-react";

export default function Navbar() {
    const [active, setActive] = useState("Home");

    const tabs = [
        { key: "Home", label: "Home", icon: Home, href: "#" },
        {
            key: "Interview",
            label: "Interview",
            icon: MonitorPlay,
            href: "/#ai-interview",
        },
        { key: "Coding", label: "Coding", icon: CodeIcon, href: "#" },
        { key: "Jobs", label: "Jobs", icon: Briefcase, href: "#" },
        { key: "Contact", label: "Contact", icon: Mail, href: "#" },
    ];

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-3/4 z-50 bg-black/90 text-white border border-gray-700 rounded-full shadow-md backdrop-blur-md">
            <div className="max-w-[1400px] mx-auto px-5 py-3 flex items-center justify-between max-h-20">
                <Link
                    href="#"
                    onClick={() => setActive("Home")}
                    className="flex items-center gap-2"
                >
                    <Image
                        src="/logo.svg"
                        alt="CampusConnect Logo"
                        width={130}
                        height={10}
                        className="object-contain"
                    />
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = active === tab.key;
                        return (
                            <a
                                key={tab.key}
                                href={tab.href}
                                onClick={() => setActive(tab.key)}
                                className={`flex items-center gap-2 text-[15px] font-medium transition-all ${
                                    isActive
                                        ? "text-[#45e35d]"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                <Icon size={18} strokeWidth={2} />
                                {tab.label}
                            </a>
                        );
                    })}
                </div>

                {/* Login Button */}
                <Link
                    href="#"
                    className="hidden md:flex items-center gap-2 bg-[#45e35d] hover:bg-[#39d152] text-black px-5 py-2 rounded-full font-semibold text-[14px] transition-all"
                >
                    <LogIn size={18} />
                    Login
                </Link>
            </div>
        </nav>
    );
}
