import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/landing-header";
import { Footer } from "@/components/layout/landing-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { NewsSection } from "@/components/sections/news-section";
import { EventsSection } from "@/components/sections/events-section";
import { AppDownloadSection } from "@/components/sections/app-download-section";

export default function Page() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <NewsSection />
        <EventsSection />
        <AppDownloadSection />
      </main>
      <Footer />
    </div>
  );
}
