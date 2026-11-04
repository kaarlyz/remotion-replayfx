import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy spring scale
  const s1 = spring({ frame, fps, config: { damping: 10, mass: 0.6 } });
  const s2 = spring({ frame: frame - 25, fps, config: { damping: 10, mass: 0.6 } });
  const s3 = spring({ frame: frame - 55, fps, config: { damping: 10, mass: 0.7 } });

  // Camera zoom
  const cameraZoom = interpolate(frame, [0, 90], [1, 1.1]);

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
        transform: `scale(${cameraZoom})`,
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', monospace",
        textAlign: "center",
      }}
    >
      {/* Background kinetic flash */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Tag */}
      <div
        style={{
          opacity: s1,
          transform: `translateY(${(1 - s1) * 20}px)`,
          fontSize: 14,
          fontWeight: 800,
          color: "#ef4444",
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 16,
          backgroundColor: "rgba(239, 68, 68, 0.12)",
          padding: "6px 16px",
          borderRadius: 20,
          border: "1px solid rgba(239, 68, 68, 0.3)",
        }}
      >
        THE HARSH REALITY
      </div>

      {/* Main Punchy Question */}
      <div
        style={{
          opacity: s1,
          transform: `scale(${interpolate(s1, [0, 1], [0.85, 1])})`,
          fontSize: 54,
          fontWeight: 900,
          color: "#f8fafc",
          letterSpacing: 2,
          lineHeight: 1.15,
          maxWidth: 900,
          textShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
        }}
      >
        WHY DO <span style={{ color: "#ef4444" }}>90%</span> OF TRADERS BLOW UP?
      </div>

      {/* Staggered Flaws */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 35,
          opacity: s2,
          transform: `translateY(${(1 - s2) * 20}px)`,
        }}
      >
        {["EMOTIONAL FOMO", "HIDDEN SLIPPAGE", "ZERO AUDIT"].map((flaw) => (
          <div
            key={flaw}
            style={{
              padding: "10px 20px",
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              color: "#fca5a5",
              textDecoration: "line-through",
            }}
          >
            {flaw}
          </div>
        ))}
      </div>

      {/* Callout */}
      {frame >= 55 && (
        <div
          style={{
            marginTop: 40,
            opacity: s3,
            transform: `scale(${s3})`,
            fontSize: 28,
            fontWeight: 900,
            color: "#00e5ff",
            letterSpacing: 4,
            textShadow: "0 0 20px rgba(0, 229, 255, 0.6)",
          }}
        >
          STOP TRADING BLIND.
        </div>
      )}
    </div>
  );
};
