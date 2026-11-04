import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene7EquityGrowth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });

  // Progressive balance counter: $10,000 -> $16,420
  const balance = Math.floor(interpolate(frame, [0, 90], [10000, 16420], { extrapolateRight: "clamp" }));

  // Animated spline path
  const curveProgress = interpolate(frame, [0, 90], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        padding: "60px 80px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', monospace",
      }}
    >
      {/* Left Column */}
      <div style={{ maxWidth: 480, opacity: entrance }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 14px",
            borderRadius: 20,
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            fontSize: 12,
            fontWeight: 800,
            color: "#10b981",
            letterSpacing: 2,
            marginBottom: 16,
          }}
        >
          MEASURABLE EDGE
        </div>
        <div style={{ fontSize: 52, fontWeight: 900, color: "#f8fafc", lineHeight: 1.1, letterSpacing: 2 }}>
          COMPOUND <span style={{ color: "#10b981" }}>CONSISTENCY</span>.
        </div>
        <div style={{ fontSize: 16, color: "#94a3b8", marginTop: 18, lineHeight: 1.6 }}>
          Eliminate revenge trades. Execute with surgical precision. Transform chaotic PnL into exponential growth.
        </div>

        {/* Balance Metric Callout */}
        <div
          style={{
            marginTop: 28,
            padding: "20px 28px",
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            borderRadius: 16,
            border: "2px solid #10b981",
            boxShadow: "0 0 35px rgba(16, 185, 129, 0.25)",
            display: "inline-block",
          }}
        >
          <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700 }}>VERIFIED EQUITY CURVE</div>
          <div style={{ fontSize: 44, fontWeight: 900, color: "#10b981", margin: "4px 0" }}>
            ${balance.toLocaleString()}
          </div>
          <div style={{ fontSize: 13, color: "#38bdf8", fontWeight: 700 }}>
            NET RETURN: +64.2% (142 TRADES)
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic SVG Chart */}
      <div
        style={{
          width: 540,
          height: 380,
          backgroundColor: "rgba(15, 21, 33, 0.8)",
          backdropFilter: "blur(20px)",
          borderRadius: 20,
          border: "1px solid rgba(56, 189, 248, 0.25)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, color: "#f8fafc", letterSpacing: 1 }}>
          PORTFOLIO EXPANSION CURVE
        </div>

        <div style={{ flex: 1, position: "relative", marginTop: 10 }}>
          <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
            {/* Grid */}
            {[50, 120, 190, 260].map((gy) => (
              <line key={gy} x1="0" y1={gy} x2="490" y2={gy} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            ))}

            {/* Glowing Spline */}
            {(() => {
              const fullPoints = [
                [0, 280], [60, 265], [120, 230], [180, 240],
                [240, 190], [300, 160], [360, 170], [420, 110], [480, 45]
              ];
              const maxIdx = Math.floor(curveProgress * (fullPoints.length - 1));
              const pts = fullPoints.slice(0, maxIdx + 1);

              if (pts.length < 2) return null;
              const polyStr = pts.map((p) => p.join(",")).join(" ");

              return (
                <>
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    points={polyStr}
                    style={{ filter: "drop-shadow(0 0 10px #10b981)" }}
                  />
                  {/* Glowing end point */}
                  <circle
                    cx={pts[pts.length - 1][0]}
                    cy={pts[pts.length - 1][1]}
                    r="8"
                    fill="#00e5ff"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </>
              );
            })()}
          </svg>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b" }}>
          <span>SEP 01: $10,000</span>
          <span style={{ color: "#10b981", fontWeight: 700 }}>OCT 01: $16,420 (+64.2%)</span>
        </div>
      </div>
    </div>
  );
};
