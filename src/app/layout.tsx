import type { Metadata } from "next";
import { Navbar } from "@/components/pages/home/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZOOMX — Get More Leads Using Quality Video Content",
  description:
    "Done-For-You organic video content systems that generate leads on autopilot. Trusted by 500+ businesses worldwide.",
  authors: [{ name: "ZOOMX" }],
  openGraph: {
    title: "ZOOMX — Get More Leads Using Quality Video Content",
    description:
      "Done-For-You organic video content systems that generate leads on autopilot.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
