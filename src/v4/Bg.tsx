import React from "react";
import { useCurrentFrame } from "remotion";

// Shared animated background — infinite 3D grid + floating particles + nebula blobs
export const Bg: React.FC = () => {
  const f = useCurrentFrame();
  const gridY = (f * 4) % 60;
  const b1x = 300 + Math.sin(f * 0.025) * 80;
  const b1y = 250 + Math.cos(f * 0.018) * 60;
  const b2x = 950 + Math.cos(f * 0.02) * 90;
  const b2y = 480 + Math.sin(f * 0.03) * 70;

  return (
    <div style={{ position: "absolute", inset: 0, backgroundColor: "#040810", overflow: "hidden" }}>
      {/* Nebula blobs */}
      <div style={{ position: "absolute", left: b1x, top: b1y, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 60%)", filter: "blur(50px)", transform: "translate(-50%,-50%)" }} />
      <div style={{ position: "absolute", left: b2x, top: b2y, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 60%)", filter: "blur(60px)", transform: "translate(-50%,-50%)" }} />

      {/* 3D perspective grid */}
      <div style={{ position: "absolute", bottom: -120, left: "-20%", width: "140%", height: "55%", perspective: 350, pointerEvents: "none", maskImage: "linear-gradient(to top, rgba(0,0,0,1) 25%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 25%, transparent 100%)" }}>
        <div style={{ width: "100%", height: "100%", transform: "rotateX(72deg)", backgroundImage: "linear-gradient(to right, rgba(0,229,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,229,255,0.12) 1px, transparent 1px)", backgroundSize: "45px 45px", backgroundPosition: `0px ${gridY}px` }} />
      </div>

      {/* Floating particles */}
      <svg style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.25 }}>
        {[...Array(20)].map((_, i) => {
          const px = (i * 67 + 30) % 1280;
          const py = ((i * 113 + f * (0.8 + (i % 4) * 0.4)) % 800) - 30;
          return <circle key={i} cx={px} cy={720 - py} r={1 + (i % 3)} fill="#00e5ff" style={{ filter: "drop-shadow(0 0 4px #00e5ff)" }} />;
        })}
      </svg>
    </div>
  );
};
