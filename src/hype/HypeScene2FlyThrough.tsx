import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HypeScene2FlyThrough: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3D camera push through space
  const camZ = interpolate(frame, [0, 105], [-300, 350], { extrapolateRight: "clamp" });
  const camTilt = interpolate(frame, [0, 105], [12, -8], { extrapolateRight: "clamp" });
  const titleSpring = spring({ frame, fps, config: { damping: 11, mass: 0.5 } });

  // Floating candlesticks at various 3D depths
  const candles3D = [
    { x: -380, y: -80, z: -150, h: 220, bull: true },
    { x: -220, y: 40, z: 50, h: 180, bull: false },
    { x: -80, y: -120, z: -50, h: 260, bull: true },
    { x: 100, y: -20, z: 200, h: 320, bull: true }, // Big hero candle flying right past
    { x: 260, y: 80, z: -100, h: 190, bull: false },
    { x: 420, y: -60, z: 120, h: 240, bull: true },
  ];

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        perspective: 900,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', sans-serif",
      }}
    >
      {/* Background Watermark Outlined Typography */}
      <div
        style={{
          position: "absolute",
          fontSize: 140,
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "2px rgba(56, 189, 248, 0.12)",
          letterSpacing: 12,
          whiteSpace: "nowrap",
          transform: `translateX(${interpolate(frame, [0, 105], [-100, 100])}px)`,
          zIndex: 1,
        }}
      >
        INSTITUTIONAL TICK REPLAY
      </div>

      {/* 3D Candlestick Floating Field */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: `rotateX(${camTilt}deg) translateZ(${camZ}px)`,
          zIndex: 5,
        }}
      >
        {candles3D.map((c, i) => {
          const col = c.bull ? "#10b981" : "#ef4444";
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `calc(50% + ${c.x}px)`,
                top: `calc(50% + ${c.y}px)`,
                transform: `translate3d(0, 0, ${c.z}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Wick */}
              <div style={{ width: 3, height: c.h + 60, backgroundColor: col, boxShadow: `0 0 15px ${col}` }} />
              {/* Body */}
              <div
                style={{
                  position: "absolute",
                  top: 30,
                  width: 32,
                  height: c.h,
                  backgroundColor: col,
                  borderRadius: 4,
                  boxShadow: `0 0 25px ${col}90`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Center Laser Targeting Reticle & Headline */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transform: `scale(${titleSpring})`,
        }}
      >
        {/* Reticle */}
        <div
          style={{
            padding: "8px 20px",
            backgroundColor: "rgba(0, 229, 255, 0.15)",
            border: "1px solid #00e5ff",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 800,
            color: "#00e5ff",
            letterSpacing: 3,
            marginBottom: 16,
            boxShadow: "0 0 25px rgba(0, 229, 255, 0.5)",
          }}
        >
          ● 0.8ms DUKASCOPY TICK PIPELINE
        </div>

        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: 4,
            lineHeight: 1.05,
            textShadow: "0 0 50px rgba(0, 229, 255, 0.9)",
          }}
        >
          REPLAY EVERY <span style={{ color: "#00e5ff" }}>TICK</span>.
        </div>

        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#94a3b8",
            letterSpacing: 6,
            marginTop: 14,
            textTransform: "uppercase",
          }}
        >
          ZERO BLIND SPOTS. PURE FORENSICS.
        </div>
      </div>
    </div>
  );
};
