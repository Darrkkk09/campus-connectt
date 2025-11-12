"use client";

import { Instagram, Linkedin, Github, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-black text-gray-400 border-t border-gray-800 py-10 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {/* Logo + Description */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Image
                            src="/logo.svg"
                            alt="CampusConnect Logo"
                            width={150}
                            height={50}
                            className="object-contain"
                        />
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Empowering students to connect with internships, coding
                        practice, and AI-driven interview preparation - built
                        with <span className="text-[#45e35d]">dedication</span>{" "}
                        and <span className="text-[#45e35d]">hard work</span>.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link
                                href="/#home"
                                className="hover:text-[#45e35d] transition-all"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#ai-interview"
                                className="hover:text-[#45e35d] transition-all"
                            >
                                AI Interview
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#internships"
                                className="hover:text-[#45e35d] transition-all"
                            >
                                Internships
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#coding"
                                className="hover:text-[#45e35d] transition-all"
                            >
                                Coding Practice
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#contact"
                                className="hover:text-[#45e35d] transition-all"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white font-semibold mb-4">
                        Contact Us
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                            <Phone size={16} className="text-[#45e35d]" />
                            <span>+91 93817 65548</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail size={16} className="text-[#45e35d]" />
                            <span>ranjitmutchakarla123@gmail.com</span>
                        </li>
                        <li>
                            <p className="text-gray-500 text-xs">
                                For hiring or collaboration, reach us via email
                                or call directly.
                            </p>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                    <div className="flex items-center space-x-4">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            className="text-gray-400 hover:text-[#45e35d] transition-all"
                        >
                            <Instagram size={28} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            className="text-gray-400 hover:text-[#45e35d] transition-all"
                        >
                            <Linkedin size={28} />
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            className="text-gray-400 hover:text-[#45e35d] transition-all"
                        >
                            <Github size={28} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
                <p>
                    © {new Date().getFullYear()}{" "}
                    <span className="text-[#45e35d] font-medium">
                        CampusConnect
                    </span>{" "}
                    - Built with 💚 for developers and students.
                </p>
            </div>
        </footer>
    );
}