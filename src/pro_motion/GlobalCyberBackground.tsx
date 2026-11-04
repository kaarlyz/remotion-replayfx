import React from "react";
import { useCurrentFrame } from "remotion";

export const GlobalCyberBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Infinite grid movement
  const gridOffsetY = (frame * 3) % 60;

  // Floating ambient glowing blobs
  const blob1X = 250 + Math.sin(frame * 0.03) * 60;
  const blob1Y = 200 + Math.cos(frame * 0.02) * 50;
  const blob2X = 1000 + Math.cos(frame * 0.025) * 80;
  const blob2Y = 500 + Math.sin(frame * 0.035) * 60;

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "#05080e",
        overflow: "hidden",
      }}
    >
      {/* Ambient glowing radial nebulas */}
      <div
        style={{
          position: "absolute",
          left: blob1X,
          top: blob1Y,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.14) 0%, transparent 65%)",
          filter: "blur(60px)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: blob2X,
          top: blob2Y,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 65%)",
          filter: "blur(70px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 3D Perspective Grid Plane */}
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: "-25%",
          width: "150%",
          height: "65%",
          perspective: 400,
          transformStyle: "preserve-3d",
          pointerEvents: "none",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 30%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 30%, transparent 100%)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: "rotateX(72deg)",
            backgroundImage: `
              linear-gradient(to right, rgba(0, 229, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 229, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            backgroundPosition: `0px ${gridOffsetY}px`,
          }}
        />
      </div>

      {/* Floating ambient tech dust particles */}
      <svg style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.3 }}>
        {[...Array(15)].map((_, i) => {
          const px = (i * 92 + 40) % 1280;
          const py = ((i * 137 + frame * (1.2 + (i % 3) * 0.5)) % 750) - 20;
          const size = 1.5 + (i % 3);
          return (
            <circle
              key={i}
              cx={px}
              cy={720 - py}
              r={size}
              fill="#00e5ff"
              style={{ filter: "drop-shadow(0 0 6px #00e5ff)" }}
            />
          );
        })}
      </svg>
    </div>
  );
};
