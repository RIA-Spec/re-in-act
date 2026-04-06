import { Hero } from "@/components/landing/Hero";
import { DataGraphs } from "@/components/landing/DataGraphs";
import { Interfaces } from "@/components/landing/FlowShowcase";
import { FlowDemo } from "@/components/landing/FlowDemo";
import { QuickLinks } from "@/components/landing/QuickLinks";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Hero />
      <QuickLinks />
      <DataGraphs />
      <Interfaces />
      <FlowDemo />
      <Footer />
    </main>
  );
}
