"use client";
export function VerticalBarSkeleton() {
  return (
    <div className="vertical-bar" aria-hidden="true">
      <div className="vertical-bar__top">
        <div className="skeleton skeleton--badge" />
      </div>
      <div className="vertical-bar__wrapper">
        <div className="vertical-bar-skeleton-fill" />
      </div>
      <div className="vertical-bar__label">
        <div className="skeleton skeleton--label" />
      </div>
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="stat-card stat-card--skeleton">
      <div className="skeleton skeleton--stat-label" />
      <div className="skeleton skeleton--stat-value" />
      <div className="skeleton skeleton--stat-desc" />
    </div>
  );
}
