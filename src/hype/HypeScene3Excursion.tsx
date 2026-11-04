import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HypeScene3Excursion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split-screen horizontal slide
  const leftSlide = spring({ frame, fps, config: { damping: 11, mass: 0.6 } });
  const rightSlide = spring({ frame: frame - 10, fps, config: { damping: 11, mass: 0.6 } });
  const centerSlam = spring({ frame: frame - 35, fps, config: { damping: 9, mass: 0.4 } });

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Laser Split Beam */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 3,
          backgroundColor: "#00e5ff",
          boxShadow: "0 0 30px #00e5ff, 0 0 60px #00e5ff",
          zIndex: 15,
        }}
      />

      {/* Left Half: MFE (+4.8R) */}
      <div
        style={{
          flex: 1,
          height: "100%",
          backgroundColor: "rgba(16, 185, 129, 0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateX(${(1 - leftSlide) * -300}px)`,
          padding: 40,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 800, color: "#10b981", letterSpacing: 4 }}>
          MAX FAVORABLE (MFE)
        </div>
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: "#10b981",
            lineHeight: 1,
            margin: "10px 0",
            textShadow: "0 0 50px rgba(16, 185, 129, 0.8)",
          }}
        >
          +4.8R
        </div>
        <div style={{ fontSize: 16, color: "#cbd5e1", letterSpacing: 2 }}>
          +128 PIPS POTENTIAL
        </div>
      </div>

      {/* Right Half: MAE (-0.3R) */}
      <div
        style={{
          flex: 1,
          height: "100%",
          backgroundColor: "rgba(239, 68, 68, 0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateX(${(1 - rightSlide) * 300}px)`,
          padding: 40,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 800, color: "#ef4444", letterSpacing: 4 }}>
          MAX ADVERSE (MAE)
        </div>
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: "#fca5a5",
            lineHeight: 1,
            margin: "10px 0",
            textShadow: "0 0 50px rgba(239, 68, 68, 0.8)",
          }}
        >
          -0.3R
        </div>
        <div style={{ fontSize: 16, color: "#cbd5e1", letterSpacing: 2 }}>
          TIGHT 8 PIP DRAWDOWN
        </div>
      </div>

      {/* Center Slam Badge: 93.4% EFFICIENCY */}
      {frame >= 35 && (
        <div
          style={{
            position: "absolute",
            zIndex: 20,
            transform: `scale(${interpolate(centerSlam, [0, 1], [2.2, 1])})`,
            padding: "20px 48px",
            backgroundColor: "#070a0f",
            borderRadius: 20,
            border: "3px solid #00e5ff",
            boxShadow: "0 0 50px rgba(0, 229, 255, 0.7), 0 20px 50px rgba(0,0,0,0.9)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 800, color: "#94a3b8", letterSpacing: 3 }}>
            AUDITED EXIT EFFICIENCY
          </div>
          <div style={{ fontSize: 62, fontWeight: 900, color: "#00e5ff", lineHeight: 1.1 }}>
            93.4%
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#10b981", letterSpacing: 1 }}>
            NEVER EXIT EARLY AGAIN
          </div>
        </div>
      )}
    </div>
  );
};
