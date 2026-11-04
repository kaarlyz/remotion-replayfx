import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 12, mass: 0.9 } });

  // Pulsing glow
  const pulse = Math.sin(frame * 0.15) * 8;

  // Final fade out
  const opacity = interpolate(frame, [80, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', monospace",
        opacity,
      }}
    >
      {/* Central Glowing Shield / Wireframe */}
      <div
        style={{
          position: "relative",
          width: 780,
          padding: "50px 40px",
          backgroundColor: "rgba(15, 21, 33, 0.8)",
          backdropFilter: "blur(20px)",
          borderRadius: 20,
          border: "2px solid rgba(0, 229, 255, 0.4)",
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.6), 0 0 ${40 + pulse}px rgba(0, 229, 255, 0.25)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${logoSpring})`,
        }}
      >
        {/* Glow emblem */}
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: "#00e5ff",
            boxShadow: "0 0 25px #00e5ff",
            marginBottom: 20,
          }}
        />

        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: "#f8fafc",
            letterSpacing: 6,
            textShadow: "0 0 25px rgba(0, 229, 255, 0.5)",
          }}
        >
          REPLAYFX
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#00e5ff",
            letterSpacing: 3,
            marginTop: 4,
          }}
        >
          MYFXJOURNAL FORENSIC SUITE
        </div>

        <div
          style={{
            width: "60%",
            height: 1,
            backgroundColor: "rgba(56, 189, 248, 0.3)",
            margin: "24px 0",
          }}
        />

        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: "#f59e0b",
            letterSpacing: 2,
            textAlign: "center",
          }}
        >
          TRADE WITH CLARITY. MASTER THE ARCHITECTURE.
        </div>

        <div
          style={{
            fontSize: 12,
            color: "#94a3b8",
            marginTop: 10,
            textAlign: "center",
            maxWidth: 550,
            lineHeight: 1.5,
          }}
        >
          Institutional backtest replay, Dukascopy tick archives, Monte Carlo quant models, and behavioral forensics.
        </div>

        <div
          style={{
            marginTop: 35,
            fontSize: 12,
            color: "#64748b",
            letterSpacing: 1,
          }}
        >
          Architected & Engineered by <span style={{ color: "#38bdf8", fontWeight: 700 }}>kaarlyz</span> // 2026
        </div>
      </div>
    </div>
  );
};
