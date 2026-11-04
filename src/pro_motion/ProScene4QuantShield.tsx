import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ProScene4QuantShield: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera drift
  const camZoom = interpolate(frame, [0, 155], [0.96, 1.08], { easing: Easing.bezier(0.16, 1, 0.3, 1) });

  // Camera shake on frame 40 (sim impact)
  const shake = frame >= 40 && frame <= 60 ? Math.sin((frame - 40) * 1.5) * 4 : 0;

  // Title entrance
  const titleSpring = spring({ frame, fps, config: { damping: 11, mass: 0.5 } });

  // Monte carlo curves expansion
  const curveProg = interpolate(frame, [15, 120], [0, 1], { extrapolateRight: "clamp" });

  const firmBadges = [
    { name: "FTMO", rule: "5% DAILY DD PASSED", f: 50 },
    { name: "FUNDEDNEXT", rule: "10% MAX DD PASSED", f: 65 },
    { name: "MFF", rule: "+10% TARGET MET", f: 80 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 80px",
        boxSizing: "border-box",
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', -apple-system, sans-serif",
        transform: `scale(${camZoom}) translate(${shake}px, ${shake}px)`,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * -20}px)` }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#10b981", letterSpacing: 4 }}>
          QUANTITATIVE RISK ENGINE
        </div>
        <div style={{ fontSize: 44, fontWeight: 900, color: "#ffffff", letterSpacing: 2, marginTop: 6 }}>
          10,000 <span style={{ color: "#10b981" }}>MONTE CARLO</span> ITERATIONS.
        </div>
      </div>

      {/* Center Graph + Badges */}
      <div style={{ display: "flex", gap: 30, alignItems: "center", height: 360 }}>
        {/* Monte Carlo Visualizer */}
        <div
          style={{
            flex: 1.4,
            height: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(20px)",
            borderRadius: 16,
            border: "1px solid rgba(16, 185, 129, 0.3)",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 0 35px rgba(16, 185, 129, 0.15)",
          }}
        >
          <svg style={{ width: "100%", height: "100%" }}>
            {/* Draw 10 randomized paths */}
            {[
              [320, 290, 270, 220, 180, 140, 90],
              [320, 305, 280, 240, 210, 170, 130],
              [320, 310, 290, 260, 230, 190, 160],
              [320, 280, 250, 210, 190, 130, 80],
              [320, 300, 310, 280, 240, 200, 140],
              [320, 270, 230, 180, 150, 110, 60],
              [320, 295, 260, 230, 190, 160, 120],
              [320, 315, 290, 270, 240, 210, 180],
            ].map((path, idx) => {
              const xStep = 70;
              const maxIdx = Math.floor(curveProg * (path.length - 1));
              const pts = path
                .slice(0, maxIdx + 1)
                .map((y, i) => `${30 + i * xStep},${y}`)
                .join(" ");

              if (pts.length === 0) return null;

              return (
                <polyline
                  key={idx}
                  fill="none"
                  stroke={idx === 5 ? "#00e5ff" : "#10b981"}
                  strokeWidth={idx === 5 ? 3 : 1.5}
                  opacity={0.3 + (idx % 4) * 0.2}
                  points={pts}
                />
              );
            })}
          </svg>

          {/* Floating Risk of Ruin Metric */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 25,
              padding: "12px 20px",
              backgroundColor: "rgba(10, 15, 26, 0.9)",
              borderRadius: 10,
              border: "1px solid #10b981",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
            }}
          >
            <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 800 }}>RISK OF RUIN</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#10b981" }}>0.08%</div>
          </div>
        </div>

        {/* Right Prop Firm Badges */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          {firmBadges.map((b) => {
            if (frame < b.f) return null;
            const bs = spring({ frame: frame - b.f, fps, config: { damping: 10, mass: 0.4 } });
            return (
              <div
                key={b.name}
                style={{
                  transform: `scale(${bs})`,
                  padding: "16px 22px",
                  backgroundColor: "rgba(15, 23, 42, 0.8)",
                  borderRadius: 12,
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "#f8fafc" }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{b.rule}</div>
                </div>
                <div
                  style={{
                    padding: "4px 10px",
                    borderRadius: 20,
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    color: "#10b981",
                    fontSize: 11,
                    fontWeight: 900,
                  }}
                >
                  PASSED
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
