import { FeatureSection } from "./components/FeatureSection";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <main className="page-wrapper">
      <ThemeToggle />

      <section className="page-hero">
        <p className="page-hero__eyebrow">Cloud Intelligence Platform</p>
        <h1 className="page-hero__title">
          Sovereign AI workloads, optimized at scale
        </h1>
        <p className="page-hero__desc">
          Atomity continuously monitors your cloud surface, identifies
          inefficiencies, and applies intelligent optimizations — so your team
          focuses on building, not billing.
        </p>
      </section>

      <FeatureSection />
    </main>
  );
}
