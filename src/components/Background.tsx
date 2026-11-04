import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle floating ambient lights
  const blob1X = interpolate(frame, [0, 900], [200, 350]);
  const blob1Y = interpolate(frame, [0, 900], [150, 280]);
  const blob2X = interpolate(frame, [0, 900], [1050, 900]);
  const blob2Y = interpolate(frame, [0, 900], [550, 420]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "#070a0f",
        overflow: "hidden",
      }}
    >
      {/* Ambient gradient lights */}
      <div
        style={{
          position: "absolute",
          left: blob1X,
          top: blob1Y,
          width: 550,
          height: 550,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(7, 10, 15, 0) 70%)",
          filter: "blur(60px)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: blob2X,
          top: blob2Y,
          width: 650,
          height: 650,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(7, 10, 15, 0) 70%)",
          filter: "blur(70px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Cyberpunk Grid */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.15,
        }}
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38bdf8" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="1.5" fill="#38bdf8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};
