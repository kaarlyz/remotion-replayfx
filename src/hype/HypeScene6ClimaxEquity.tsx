import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HypeScene6ClimaxEquity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Rapidly increasing balance counter
  const bal = Math.floor(interpolate(frame, [0, 110], [10000, 16420], { extrapolateRight: "clamp" }));

  // Growth curve drawing progress
  const curveProg = interpolate(frame, [0, 100], [0, 1], { extrapolateRight: "clamp" });

  const cameraScale = interpolate(frame, [0, 150], [1, 1.2]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 90px",
        boxSizing: "border-box",
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', sans-serif",
        transform: `scale(${cameraScale})`,
        overflow: "hidden",
      }}
    >
      {/* Left Pitch & Numbers */}
      <div style={{ maxWidth: 540, zIndex: 10 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#10b981", letterSpacing: 4 }}>
          THE MEASURABLE RESULT
        </div>
        <div style={{ fontSize: 72, fontWeight: 900, color: "#f8fafc", lineHeight: 1.05, margin: "10px 0" }}>
          ${bal.toLocaleString()}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: "#10b981",
            letterSpacing: 2,
            textShadow: "0 0 25px rgba(16, 185, 129, 0.8)",
          }}
        >
          +64.2% COMPOUND PROFIT
        </div>

        {/* 3 Staggered Impact Words */}
        <div style={{ display: "flex", gap: 14, marginTop: 30 }}>
          {["NO FOMO.", "NO REVENGE.", "PURE SYSTEM."].map((w, i) => {
            const s = spring({ frame: frame - i * 15, fps, config: { damping: 9, mass: 0.4 } });
            return (
              <span
                key={w}
                style={{
                  transform: `scale(${s})`,
                  padding: "8px 16px",
                  borderRadius: 6,
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  fontSize: 12,
                  fontWeight: 900,
                  color: "#10b981",
                  letterSpacing: 1,
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
      </div>

      {/* Right Giant Glowing Neon Spline */}
      <div style={{ width: 560, height: 420, position: "relative", zIndex: 5 }}>
        <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
          <defs>
            <linearGradient id="curveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="1" />
            </linearGradient>
          </defs>

          {(() => {
            const pts = [
              [0, 360], [70, 340], [140, 290], [210, 305],
              [280, 240], [350, 190], [420, 210], [490, 110], [550, 30]
            ];
            const maxIdx = Math.floor(curveProg * (pts.length - 1));
            const activePts = pts.slice(0, maxIdx + 1);

            if (activePts.length < 2) return null;
            const str = activePts.map((p) => p.join(",")).join(" ");

            return (
              <>
                {/* Neon line */}
                <polyline
                  fill="none"
                  stroke="url(#curveGrad)"
                  strokeWidth="6"
                  points={str}
                  style={{ filter: "drop-shadow(0 0 20px #10b981)" }}
                />
                {/* Glowing rocket head */}
                <circle
                  cx={activePts[activePts.length - 1][0]}
                  cy={activePts[activePts.length - 1][1]}
                  r="12"
                  fill="#ffffff"
                  stroke="#00e5ff"
                  strokeWidth="4"
                  style={{ filter: "drop-shadow(0 0 25px #00e5ff)" }}
                />
              </>
            );
          })()}
        </svg>
      </div>
    </div>
  );
};
