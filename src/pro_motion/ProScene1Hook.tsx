import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ProScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Continuous smooth camera drift
  const camZoom = interpolate(frame, [0, 135], [1.0, 1.15], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Staggered words
  const words = [
    { text: "90%", color: "#ef4444", f: 0 },
    { text: "OF TRADERS", color: "#f8fafc", f: 14 },
    { text: "BLOW UP.", color: "#ef4444", f: 28 },
  ];

  const subSlam = spring({
    frame: frame - 48,
    fps,
    config: { damping: 10, mass: 0.4 },
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
        transform: `scale(${camZoom})`,
        textAlign: "center",
      }}
    >
      {/* Red ambient pulse */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      {/* Main Kinetic Title */}
      <div style={{ display: "flex", gap: 18, alignItems: "baseline", flexWrap: "wrap", justifyContent: "center" }}>
        {words.map((w) => {
          if (frame < w.f) return null;
          const s = spring({
            frame: frame - w.f,
            fps,
            config: { damping: 9, mass: 0.35, stiffness: 240 },
          });
          const sc = interpolate(s, [0, 1], [2.4, 1.0]);

          return (
            <span
              key={w.text}
              style={{
                fontSize: 82,
                fontWeight: 900,
                color: w.color,
                letterSpacing: 4,
                lineHeight: 1,
                display: "inline-block",
                transform: `scale(${sc})`,
                textShadow: `0 0 50px ${w.color}90, 0 15px 35px rgba(0,0,0,0.9)`,
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>

      {/* Subtitle Punch with Floating Animation */}
      {frame >= 48 && (
        <div
          style={{
            marginTop: 35,
            opacity: subSlam,
            transform: `scale(${subSlam}) translateY(${Math.sin(frame * 0.1) * 6}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "10px 28px",
              borderRadius: 30,
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "2px solid #00e5ff",
              boxShadow: "0 0 30px rgba(0, 229, 255, 0.4)",
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 900, color: "#00e5ff", letterSpacing: 4 }}>
              STOP TRADING BLIND
            </span>
          </div>

          <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 14, letterSpacing: 2 }}>
            THE FORENSIC MARKET REPLAY & QUANTITATIVE JOURNAL
          </div>
        </div>
      )}
    </div>
  );
};
