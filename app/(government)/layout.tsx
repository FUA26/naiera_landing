import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/landing-header";
import { Footer } from "@/components/layout/landing-footer";
import { getVisibleServicesGroupedByCategory } from "@/lib/services-data";

export default async function GovernmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch services data for this section
  const servicesByCategory = await getVisibleServicesGroupedByCategory();

  return (
    <div className="min-h-screen">
      <TopBar />
      <Header servicesByCategory={servicesByCategory} />
      {children}
      <Footer />
    </div>
  );
}
