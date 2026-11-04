import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene2Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const heroSpring = spring({ frame, fps, config: { damping: 12, mass: 0.8 } });
  const cardSpring = spring({ frame: frame - 20, fps, config: { damping: 14 } });

  // 3D perspective rotation
  const rotY = interpolate(frame, [0, 105], [-15, 0], { extrapolateRight: "clamp" });
  const rotX = interpolate(frame, [0, 105], [10, 0], { extrapolateRight: "clamp" });

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
        perspective: 1000,
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', monospace",
      }}
    >
      {/* Cyan ambient spotlight */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.22) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          transform: `scale(${heroSpring}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            padding: "8px 24px",
            borderRadius: 30,
            backgroundColor: "rgba(0, 229, 255, 0.12)",
            border: "1px solid rgba(0, 229, 255, 0.4)",
            fontSize: 13,
            fontWeight: 800,
            color: "#00e5ff",
            letterSpacing: 3,
            marginBottom: 20,
            boxShadow: "0 0 20px rgba(0, 229, 255, 0.25)",
          }}
        >
          THE INSTITUTIONAL ADVANTAGE
        </div>

        {/* Hero Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#f8fafc",
            letterSpacing: 8,
            textShadow: "0 0 35px rgba(0, 229, 255, 0.6)",
            lineHeight: 1.1,
          }}
        >
          REPLAYFX
        </div>

        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#38bdf8",
            letterSpacing: 4,
            marginTop: 8,
          }}
        >
          NOT JUST A JOURNAL. A FORENSIC WEAPON.
        </div>

        {/* 3 Value Pillars */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 36,
            opacity: cardSpring,
            transform: `translateY(${(1 - cardSpring) * 30}px)`,
          }}
        >
          {[
            { title: "TICK-BY-TICK REPLAY", sub: "Dukascopy & QDM Parquet" },
            { title: "MFE / MAE FORENSICS", sub: "Quantifiable Exit Efficiency" },
            { title: "MONTE CARLO LAB", sub: "10,000 Path Ruin Simulator" },
          ].map((pill) => (
            <div
              key={pill.title}
              style={{
                padding: "16px 24px",
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                backdropFilter: "blur(16px)",
                borderRadius: 12,
                border: "1px solid rgba(56, 189, 248, 0.25)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                textAlign: "left",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: "#10b981", letterSpacing: 1 }}>
                {pill.title}
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{pill.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
