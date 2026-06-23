import { Blog } from "@/components/pages/home/Blog";
import { CaseStudy } from "@/components/pages/home/CaseStudy";
import { ContactForm } from "@/components/pages/home/ContactForm";
import { CTASection } from "@/components/pages/home/CTASection";
import { FAQ } from "@/components/pages/home/FAQ";
import { Hero } from "@/components/pages/home/Hero";
import { Process } from "@/components/pages/home/Process";
import { Services } from "@/components/pages/home/Services";
import { Stats } from "@/components/pages/home/Stats";
import { Testimonials } from "@/components/pages/home/Testimonials";
import { WhyUs } from "@/components/pages/home/WhyUs";
import { Work } from "@/components/pages/home/Work";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Stats />
      <Testimonials />
      <Work />
      <CaseStudy />
      <WhyUs />
      <Process />
      <Services />
      <CTASection />
      <FAQ />
      <Blog />
      {/* <Security /> */}
      <ContactForm />
    </main>
  );
}
