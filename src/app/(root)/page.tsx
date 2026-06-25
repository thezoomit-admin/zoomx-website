import { Blog } from "@/components/pages/home/Blog";
import { CaseStudy } from "@/components/pages/home/CaseStudy";
import { ContactForm } from "@/components/pages/home/ContactForm";
import { Counter } from "@/components/pages/home/Counter";
import { CTASection } from "@/components/pages/home/CTASection";
import { FAQ } from "@/components/pages/home/FAQ";
import { Hero2 } from "@/components/pages/home/Hero2";
import { Process } from "@/components/pages/home/Process";
import { Services } from "@/components/pages/home/Services";
import { Stats } from "@/components/pages/home/Stats";
import { Testimonials } from "@/components/pages/home/Testimonials";
import { WhyUs } from "@/components/pages/home/WhyUs";
import { Work } from "@/components/pages/home/Work";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero2 />
      <Counter />
      <Stats />
      <Testimonials />
      <CaseStudy />
      <Work />
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
