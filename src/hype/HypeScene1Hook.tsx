import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HypeScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera continuous forward dolly
  const cameraZ = interpolate(frame, [0, 105], [0.9, 1.25], { extrapolateRight: "clamp" });

  // Word-by-word staggered spring slams
  const words = [
    { text: "EVERY", f: 0, col: "#ffffff" },
    { text: "SINGLE", f: 16, col: "#ffffff" },
    { text: "TRADE", f: 32, col: "#00e5ff" },
    { text: "LEAVES", f: 48, col: "#ffffff" },
    { text: "A CLUE.", f: 62, col: "#ef4444" },
  ];

  // Beat drop whiteout strobe at frame 78
  const strobe = interpolate(frame, [77, 78, 85], [0, 1, 0], {
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
        transform: `scale(${cameraZ})`,
        overflow: "hidden",
      }}
    >
      {/* Dynamic Laser Speed Lines */}
      <svg style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.25 }}>
        {[-300, -150, 0, 150, 300].map((offset, i) => {
          const y = interpolate((frame * 25 + i * 200) % 800, [0, 800], [-100, 820]);
          return (
            <line
              key={i}
              x1="0"
              y1={y + offset}
              x2="1280"
              y2={y + offset + 120}
              stroke="#00e5ff"
              strokeWidth="2"
              strokeDasharray="60 140"
            />
          );
        })}
      </svg>

      {/* Part 1: Staggered Word Slams (Frames 0 - 77) */}
      {frame < 78 && (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px 28px", maxWidth: 1000 }}>
          {words.map((w) => {
            if (frame < w.f) return null;
            const s = spring({
              frame: frame - w.f,
              fps,
              config: { damping: 9, mass: 0.35, stiffness: 220 },
            });
            const scale = interpolate(s, [0, 1], [3.0, 1.0]);
            const rot = (Math.sin(w.f) * 6).toFixed(1);

            return (
              <span
                key={w.text}
                style={{
                  fontSize: 84,
                  fontWeight: 900,
                  color: w.col,
                  letterSpacing: 4,
                  lineHeight: 1,
                  display: "inline-block",
                  transform: `scale(${scale}) rotate(${rot}deg)`,
                  textShadow: `0 0 40px ${w.col}80, 0 10px 30px rgba(0,0,0,0.9)`,
                }}
              >
                {w.text}
              </span>
            );
          })}
        </div>
      )}

      {/* Part 2: Impact Drop Climax (Frames 78 - 105) */}
      {frame >= 78 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#ef4444",
              letterSpacing: 8,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            ARE YOU BLIND TO IT?
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 900,
              color: "#f8fafc",
              letterSpacing: 4,
              lineHeight: 1,
              textShadow: "0 0 50px rgba(0, 229, 255, 0.8)",
              transform: `scale(${spring({ frame: frame - 78, fps, config: { damping: 8, mass: 0.4 } })})`,
            }}
          >
            STOP TRADING <span style={{ color: "#00e5ff" }}>BLIND</span>.
          </div>
        </div>
      )}

      {/* Strobe flash overlay */}
      {strobe > 0.05 && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffff",
            opacity: strobe,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};
