"use client";

import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();

    // Hide Navbar + Footer on interview and feedback pages
    const isFullScreen =
        pathname.startsWith("/interview/session") ||
        pathname.startsWith("/interview/feedback");

    return (
        <>
            <div className="bg-black">
                {!isFullScreen && <Navbar />}
                <div className={!isFullScreen ? "pt-24" : ""}>{children}</div>
                {!isFullScreen && <Footer />}
            </div>
        </>
    );
}
