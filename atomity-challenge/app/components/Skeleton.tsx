"use client";

export function SkeletonBar() {
  return (
    <div className="skeleton-bar" aria-hidden="true">
      <div className="skeleton-bar__label">
        <div className="skeleton skeleton--label" />
        <div className="skeleton skeleton--badge" />
      </div>
      <div className="skeleton-bar__tracks">
        <div className="skeleton-bar__track">
          <div className="skeleton skeleton--track-label" />
          <div className="skeleton skeleton--track" />
          <div className="skeleton skeleton--value" />
        </div>
        <div className="skeleton-bar__track">
          <div className="skeleton skeleton--track-label" />
          <div className="skeleton skeleton--track skeleton--track-short" />
          <div className="skeleton skeleton--value" />
        </div>
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
