import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HypeScene7Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({ frame, fps, config: { damping: 11, mass: 0.7 } });
  const pulse = Math.sin(frame * 0.25) * 16;

  // Strobe on frame 0
  const strobe = frame < 5 ? 1 - frame / 5 : 0;

  // Final fade
  const fade = interpolate(frame, [140, 180], [1, 0], {
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
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', -apple-system, sans-serif",
        textAlign: "center",
        opacity: fade,
      }}
    >
      {/* Expanding Radar Waves */}
      {[1, 2, 3].map((ring) => {
        const rSize = ((frame * 6 + ring * 140) % 700) + 100;
        const rOp = Math.max(0, 1 - rSize / 800);
        return (
          <div
            key={ring}
            style={{
              position: "absolute",
              width: rSize,
              height: rSize,
              borderRadius: "50%",
              border: "1px solid #00e5ff",
              opacity: rOp * 0.35,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* Main Lockup */}
      <div
        style={{
          transform: `scale(${logoSpring})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Emblem */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "#00e5ff",
            boxShadow: `0 0 ${40 + pulse}px #00e5ff`,
            marginBottom: 24,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 92,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: 16,
            textShadow: "0 0 60px rgba(0, 229, 255, 0.9)",
            lineHeight: 1,
            marginLeft: 16,
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
            width: 480,
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
            marginTop: 36,
            fontSize: 13,
            color: "#64748b",
            letterSpacing: 2,
          }}
        >
          ARCHITECTED & ENGINEERED BY <strong style={{ color: "#38bdf8" }}>KAARLYZ</strong> // 2026
        </div>
      </div>

      {/* Initial strobe */}
      {strobe > 0.05 && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffff",
            opacity: strobe,
            zIndex: 100,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};
