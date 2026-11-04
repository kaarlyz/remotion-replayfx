import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ProScene3Excursion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dynamic 3D tilt
  const rotY = interpolate(frame, [0, 155], [-8, 6], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const rotX = interpolate(frame, [0, 155], [4, -3]);

  // Entrance
  const sLeft = spring({ frame, fps, config: { damping: 11, mass: 0.5 } });
  const sRight = spring({ frame: frame - 15, fps, config: { damping: 11, mass: 0.5 } });
  const sCenter = spring({ frame: frame - 35, fps, config: { damping: 9, mass: 0.4 } });

  const pulse = Math.sin(frame * 0.15) * 8;

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 1000,
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Left Side: MFE (+4.8R) */}
        <div
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: "rgba(16, 185, 129, 0.06)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${sLeft})`,
            padding: 40,
            borderRight: "1px solid rgba(0, 229, 255, 0.3)",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 800, color: "#10b981", letterSpacing: 4 }}>
            MAX FAVORABLE EXCURSION (MFE)
          </div>
          <div
            style={{
              fontSize: 105,
              fontWeight: 900,
              color: "#10b981",
              lineHeight: 1,
              margin: "12px 0",
              textShadow: "0 0 50px rgba(16, 185, 129, 0.9)",
            }}
          >
            +4.8R
          </div>
          <div style={{ fontSize: 14, color: "#cbd5e1", letterSpacing: 2 }}>
            REALIZED MARKET UPSIDE
          </div>
        </div>

        {/* Right Side: MAE (-0.3R) */}
        <div
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: "rgba(239, 68, 68, 0.06)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${sRight})`,
            padding: 40,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 800, color: "#ef4444", letterSpacing: 4 }}>
            MAX ADVERSE EXCURSION (MAE)
          </div>
          <div
            style={{
              fontSize: 105,
              fontWeight: 900,
              color: "#fca5a5",
              lineHeight: 1,
              margin: "12px 0",
              textShadow: "0 0 50px rgba(239, 68, 68, 0.9)",
            }}
          >
            -0.3R
          </div>
          <div style={{ fontSize: 14, color: "#cbd5e1", letterSpacing: 2 }}>
            MICROSCOPIC DRAWDOWN
          </div>
        </div>

        {/* Center Hero Badge */}
        {frame >= 35 && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) scale(${sCenter})`,
              padding: "24px 50px",
              backgroundColor: "#070a0f",
              borderRadius: 24,
              border: "3px solid #00e5ff",
              boxShadow: `0 0 ${40 + pulse}px rgba(0, 229, 255, 0.6), 0 25px 60px rgba(0,0,0,0.9)`,
              textAlign: "center",
              zIndex: 30,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: "#94a3b8", letterSpacing: 3 }}>
              EXIT EFFICIENCY RATING
            </div>
            <div style={{ fontSize: 68, fontWeight: 900, color: "#00e5ff", lineHeight: 1.05 }}>
              93.4%
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#10b981", letterSpacing: 1 }}>
              STOP LEAVING MONEY ON THE TABLE
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
