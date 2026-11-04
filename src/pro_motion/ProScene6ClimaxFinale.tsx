import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ProScene6ClimaxFinale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part 1: Equity Rocket (0 - 95 frames)
  const isPart1 = frame < 95;

  // Counter
  const bal = Math.floor(
    interpolate(frame, [0, 85], [10000, 16420], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateRight: "clamp",
    })
  );

  // Curve progress
  const curveProg = interpolate(frame, [0, 80], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: "clamp",
  });

  // Part 2: Logo Finale (95 - 220 frames)
  const finaleFrame = Math.max(0, frame - 95);
  const logoSpring = spring({ frame: finaleFrame, fps, config: { damping: 11, mass: 0.6 } });
  const pulse = Math.sin(frame * 0.2) * 15;

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {isPart1 ? (
        /* PART 1: The Exponential Growth */
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 90px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ maxWidth: 520, zIndex: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#10b981", letterSpacing: 4 }}>
              THE AUDITED RESULT
            </div>
            <div style={{ fontSize: 78, fontWeight: 900, color: "#ffffff", lineHeight: 1.05, margin: "10px 0" }}>
              ${bal.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#10b981",
                letterSpacing: 2,
                textShadow: "0 0 30px rgba(16, 185, 129, 0.8)",
              }}
            >
              +64.2% COMPOUND PROFIT
            </div>

            <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
              {["NO FOMO", "NO REVENGE", "PURE SYSTEM"].map((w, i) => {
                const s = spring({ frame: frame - i * 12, fps, config: { damping: 9, mass: 0.4 } });
                return (
                  <span
                    key={w}
                    style={{
                      transform: `scale(${s})`,
                      padding: "8px 16px",
                      borderRadius: 8,
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

          {/* SVG Rocket Path */}
          <div style={{ width: 520, height: 380, position: "relative" }}>
            <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
              <defs>
                <linearGradient id="curveG" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#00e5ff" />
                </linearGradient>
              </defs>

              {(() => {
                const pts = [
                  [0, 340], [60, 320], [130, 270], [200, 290],
                  [270, 220], [340, 170], [410, 190], [480, 90], [520, 20]
                ];
                const maxIdx = Math.floor(curveProg * (pts.length - 1));
                const active = pts.slice(0, maxIdx + 1);
                if (active.length < 2) return null;
                const str = active.map((p) => p.join(",")).join(" ");

                return (
                  <>
                    <polyline
                      fill="none"
                      stroke="url(#curveG)"
                      strokeWidth="7"
                      points={str}
                      style={{ filter: "drop-shadow(0 0 25px #10b981)" }}
                    />
                    <circle
                      cx={active[active.length - 1][0]}
                      cy={active[active.length - 1][1]}
                      r="12"
                      fill="#ffffff"
                      stroke="#00e5ff"
                      strokeWidth="4"
                      style={{ filter: "drop-shadow(0 0 30px #00e5ff)" }}
                    />
                  </>
                );
              })()}
            </svg>
          </div>
        </div>
      ) : (
        /* PART 2: The Iconic Finale */
        <div
          style={{
            transform: `scale(${logoSpring})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          {/* Cyan Core Emblem */}
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: "#00e5ff",
              boxShadow: `0 0 ${45 + pulse}px #00e5ff`,
              marginBottom: 24,
            }}
          />

          <div
            style={{
              fontSize: 98,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: 18,
              textShadow: "0 0 60px rgba(0, 229, 255, 0.9)",
              lineHeight: 1,
              marginLeft: 18,
            }}
          >
            REPLAYFX
          </div>

          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#00e5ff",
              letterSpacing: 6,
              marginTop: 14,
              textTransform: "uppercase",
            }}
          >
            THE FORENSIC TRADING SYSTEM
          </div>

          <div
            style={{
              width: 500,
              height: 1,
              backgroundColor: "rgba(56, 189, 248, 0.3)",
              margin: "28px 0",
            }}
          />

          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#f59e0b",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            MASTER THE ARCHITECTURE. DOMINATE THE MARKETS.
          </div>

          <div
            style={{
              marginTop: 34,
              fontSize: 13,
              color: "#64748b",
              letterSpacing: 2,
            }}
          >
            ARCHITECTED & ENGINEERED BY <strong style={{ color: "#38bdf8" }}>KAARLYZ</strong> // 2026
          </div>
        </div>
      )}
    </div>
  );
};
