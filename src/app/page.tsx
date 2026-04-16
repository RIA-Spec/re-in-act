import type { Metadata } from "next";
import { Hero } from "@/components/landing/Hero";
import { DataGraphs } from "@/components/landing/DataGraphs";
import { Interfaces } from "@/components/landing/FlowShowcase";
import { FlowDemo } from "@/components/landing/FlowDemo";
import { QuickLinks } from "@/components/landing/QuickLinks";
import { RASHarness } from "@/components/landing/RASHarness";
import { Footer } from "@/components/landing/Footer";
import { SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Re in Act — Open Specification for Reason in Action",
  },
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Hero />
      <QuickLinks />
      <DataGraphs />
      <Interfaces />
      <FlowDemo />
      <RASHarness />
      <Footer />
    </main>
  );
}
