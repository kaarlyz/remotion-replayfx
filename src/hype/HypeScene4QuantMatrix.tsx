import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HypeScene4QuantMatrix: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Rapid camera shake on impact (frames 0 - 25)
  const shakeX = frame < 25 ? (Math.sin(frame * 2.8) * (25 - frame) * 0.8).toFixed(1) : 0;
  const shakeY = frame < 25 ? (Math.cos(frame * 2.5) * (25 - frame) * 0.8).toFixed(1) : 0;

  const count10k = Math.min(10000, Math.floor(interpolate(frame, [0, 45], [0, 10000])));

  const badges = [
    { name: "FTMO", f: 20, col: "#10b981" },
    { name: "FUNDEDNEXT", f: 35, col: "#00e5ff" },
    { name: "MFF", f: 50, col: "#3b82f6" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', sans-serif",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        overflow: "hidden",
      }}
    >
      {/* Background Matrix Rain of Numbers */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.12,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 16,
          color: "#00e5ff",
          userSelect: "none",
        }}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              transform: `translateY(${-((frame * 15 + i * 80) % 600)}px)`,
            }}
          >
            {"+4.8R 0.82ms 2644.50 PASS WIN 93.4% Z:2.15 SHARPE:2.84 +14.8%".repeat(6)}
          </div>
        ))}
      </div>

      {/* Main Quantitative Number Slam */}
      <div style={{ textAlign: "center", zIndex: 10 }}>
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#a855f7",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          MONTE CARLO STRESS TEST
        </div>

        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: 4,
            lineHeight: 1,
            textShadow: "0 0 50px rgba(168, 85, 247, 0.8)",
          }}
        >
          {count10k.toLocaleString()} <span style={{ color: "#a855f7" }}>RUNS</span>
        </div>

        {/* 3 Prop Firm Badges Slam */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 28 }}>
          {badges.map((b) => {
            if (frame < b.f) return null;
            const s = spring({ frame: frame - b.f, fps, config: { damping: 8, mass: 0.3 } });
            return (
              <div
                key={b.name}
                style={{
                  transform: `scale(${s})`,
                  padding: "12px 28px",
                  borderRadius: 8,
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  border: `2px solid ${b.col}`,
                  boxShadow: `0 0 25px ${b.col}50`,
                  fontSize: 16,
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: 2,
                }}
              >
                {b.name}: <span style={{ color: b.col }}>PASSED</span>
              </div>
            );
          })}
        </div>

        {/* 0.08% Risk of Ruin Callout */}
        {frame >= 60 && (
          <div
            style={{
              marginTop: 35,
              fontSize: 32,
              fontWeight: 900,
              color: "#10b981",
              letterSpacing: 4,
              textShadow: "0 0 30px rgba(16, 185, 129, 0.8)",
              transform: `scale(${spring({ frame: frame - 60, fps, config: { damping: 9 } })})`,
            }}
          >
            0.08% RISK OF RUIN. ZERO BLOW-UPS.
          </div>
        )}
      </div>
    </div>
  );
};
