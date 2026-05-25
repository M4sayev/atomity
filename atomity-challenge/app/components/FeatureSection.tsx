"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { useMetrics } from "../hooks/useMetrics";
import { StatCard } from "./StatCard";
import { Badge } from "./Badge";
import { SkeletonStatCard } from "./Skeleton";
import { VerticalBar } from "./VerticalBar";

export function FeatureSection() {
  const { data: metrics, isLoading, isError } = useMetrics();

  const headerRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, {
    once: true,
    margin: "-80px",
  });

  const totalValue = metrics?.reduce((sum, item) => sum + item.value, 0) ?? 0;

  const avgPercentage = metrics?.length
    ? Math.round(
        metrics.reduce((sum, item) => sum + item.percentage, 0) /
          metrics.length,
      )
    : 0;

  return (
    <section
      className="feature-section"
      aria-label="Cloud optimization analytics"
    >
      <div className="feature-section__grid" aria-hidden="true" />

      <div className="feature-section__container">
        <motion.div
          ref={headerRef}
          className="feature-section__header"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Badge variant="success" size="md">
            Cost Intelligence
          </Badge>

          <h2 className="feature-section__title">
            Infrastructure efficiency
            <br />
            <em>in real time</em>
          </h2>

          <p className="feature-section__subtitle">
            Atomity continuously analyzes cloud workloads, identifies
            inefficiencies, and surfaces optimization opportunities instantly.
          </p>
        </motion.div>

        <div
          className="feature-section__stats"
          role="list"
          aria-label="Summary statistics"
        >
          {isLoading ? (
            <>
              <SkeletonStatCard />
              <SkeletonStatCard />
              <SkeletonStatCard />
            </>
          ) : isError ? null : (
            <>
              <StatCard
                label="Total Workload"
                value={totalValue}
                suffix="k"
                description="Across active systems"
                index={0}
                variant="highlight"
              />

              <StatCard
                label="Efficiency Score"
                value={avgPercentage}
                suffix="%"
                description="Average optimization score"
                index={1}
              />

              <StatCard
                label="Active Categories"
                value={metrics?.length ?? 0}
                description="Live monitored clusters"
                index={2}
              />
            </>
          )}
        </div>

        {/* CHART */}
        <div
          className="feature-section__chart"
          role="img"
          aria-label="Animated vertical optimization chart"
        >
          {isLoading ? (
            <div className="chart-grid chart-grid--loading">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="vertical-bar-skeleton" />
              ))}
            </div>
          ) : isError ? (
            <div className="feature-section__error" role="alert">
              <p>Could not load metrics.</p>
            </div>
          ) : (
            <div className="chart-grid">
              {metrics?.map((item, i) => (
                <VerticalBar key={item.id} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
