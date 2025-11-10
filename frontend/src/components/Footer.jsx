"use client";

export default function Footer() {
    return (
        <footer className="w-full bg-black border-t border-gray-800 py-5 text-center text-gray-500">
            <p>
                © {new Date().getFullYear()} CampusConnect — Empowering Future
                Talent.
            </p>
        </footer>
    );
}
