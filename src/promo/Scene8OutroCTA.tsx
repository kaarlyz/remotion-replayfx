import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene8OutroCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 12, mass: 0.8 } });

  // Pulsing glow effect
  const glow = Math.sin(frame * 0.2) * 12;

  // Final fade out at the very end
  const opacity = interpolate(frame, [90, 120], [1, 0], {
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
        textAlign: "center",
        opacity,
      }}
    >
      {/* Background cyan ring */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.25) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />

      <div
        style={{
          transform: `scale(${logoSpring})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(24px)",
          padding: "50px 70px",
          borderRadius: 24,
          border: "2px solid rgba(0, 229, 255, 0.5)",
          boxShadow: `0 25px 60px rgba(0, 0, 0, 0.7), 0 0 ${40 + glow}px rgba(0, 229, 255, 0.3)`,
        }}
      >
        {/* Glowing orb */}
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "#00e5ff",
            boxShadow: "0 0 30px #00e5ff",
            marginBottom: 18,
          }}
        />

        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#f8fafc",
            letterSpacing: 8,
            textShadow: "0 0 35px rgba(0, 229, 255, 0.6)",
            lineHeight: 1,
          }}
        >
          REPLAYFX
        </div>

        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: "#00e5ff",
            letterSpacing: 4,
            marginTop: 8,
          }}
        >
          THE FORENSIC TRADING OS
        </div>

        <div
          style={{
            width: 380,
            height: 1,
            backgroundColor: "rgba(56, 189, 248, 0.3)",
            margin: "24px 0",
          }}
        />

        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#f59e0b",
            letterSpacing: 2,
          }}
        >
          MASTER THE ARCHITECTURE. DOMINATE THE MARKETS.
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#94a3b8",
            marginTop: 10,
            maxWidth: 500,
          }}
        >
          Institutional tick replay, automated prop firm validation, and behavioral journaling.
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 12,
            color: "#64748b",
            letterSpacing: 1,
          }}
        >
          Engineered by <strong style={{ color: "#38bdf8" }}>kaarlyz</strong> // 2026
        </div>
      </div>
    </div>
  );
};
