import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/landing-header";
import { Footer } from "@/components/layout/landing-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section-server";
import { FeaturesSection } from "@/components/sections/features-section";
import { NewsSection } from "@/components/sections/news-section-server";
import { EventsSection } from "@/components/sections/events-section-server";
import { AppDownloadSection } from "@/components/sections/app-download-section";
import { getVisibleServicesGroupedByCategory } from "@/lib/services-data";

export default async function Page() {
  // Fetch services data for the header menu
  const servicesByCategory = await getVisibleServicesGroupedByCategory();

  return (
    <div className="min-h-screen">
      <TopBar />
      <Header servicesByCategory={servicesByCategory} />
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
