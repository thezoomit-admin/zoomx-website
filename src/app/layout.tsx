import type { Metadata } from "next";
import { Inter, Poppins, Syne } from "next/font/google";

import { Navbar } from "@/components/pages/home/Navbar";
import { Footer } from "@/components/pages/home/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne-next",
  display: "swap",
});

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
    <html
      lang="en"
      className={`dark ${inter.variable} ${poppins.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
