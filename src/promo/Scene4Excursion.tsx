import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene4Excursion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 12 } });
  const effCounter = Math.min(93.4, interpolate(frame, [0, 60], [0, 93.4])).toFixed(1);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        padding: "60px 80px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', monospace",
      }}
    >
      <div style={{ opacity: entrance, textAlign: "center", marginBottom: 35 }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 14px",
            borderRadius: 20,
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            fontSize: 12,
            fontWeight: 800,
            color: "#3b82f6",
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          EXCURSION FORENSICS
        </div>
        <div style={{ fontSize: 46, fontWeight: 900, color: "#f8fafc", letterSpacing: 2 }}>
          NEVER GUESS YOUR EXITS AGAIN.
        </div>
        <div style={{ fontSize: 16, color: "#94a3b8", marginTop: 8 }}>
          Quantify the exact dollar value of fear, greed, and premature closures.
        </div>
      </div>

      {/* 3 Metric Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 24, maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        {/* MAE Card */}
        <div
          style={{
            padding: "28px 24px",
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(16px)",
            borderRadius: 16,
            border: "1px solid rgba(239, 68, 68, 0.3)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: "#ef4444", letterSpacing: 1 }}>
            MAE (MAX ADVERSE EXCURSION)
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#fca5a5", margin: "14px 0 6px" }}>
            -0.3 R
          </div>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Maximum floating heat endured before price exploded into profit.
          </div>
        </div>

        {/* Center Hero Stat: EXIT EFFICIENCY */}
        <div
          style={{
            padding: "32px 28px",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            backdropFilter: "blur(20px)",
            borderRadius: 20,
            border: "2px solid #10b981",
            boxShadow: "0 0 35px rgba(16, 185, 129, 0.25)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: "#10b981", letterSpacing: 2 }}>
            EXIT EFFICIENCY SCORE
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: "#10b981", margin: "8px 0" }}>
            {effCounter}%
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>
            capturedRR / maxPotentialRR ratio
          </div>
        </div>

        {/* MFE Card */}
        <div
          style={{
            padding: "28px 24px",
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(16px)",
            borderRadius: 16,
            border: "1px solid rgba(0, 229, 255, 0.3)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: "#00e5ff", letterSpacing: 1 }}>
            MFE (MAX FAVORABLE)
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#00e5ff", margin: "14px 0 6px" }}>
            +4.8 R
          </div>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Total potential upside offered by the market structure shift.
          </div>
        </div>
      </div>
    </div>
  );
};
