import "./globals.css";

export const metadata = {
    title: "Campus Connect",
    description: "one stop for internship preparations",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased font-sans">{children}</body>
        </html>
    );
}
