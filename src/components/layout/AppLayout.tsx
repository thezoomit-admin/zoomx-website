import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Navbar2 as Navbar } from "@/components/layout/Navbar2";

/**
 * Site-wide chrome: navbar, page content, footer.
 * Keeps `app/layout.tsx` lean — swap which navbar is rendered here without
 * touching the Next.js root layout.
 */
export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pb-20 lg:pb-0">
        {children}
        <Footer />
      </main>
      <MobileBottomNav />
    </>
  );
}
