import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ProScene5DesklessMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth camera zoom
  const camZoom = interpolate(frame, [0, 155], [0.95, 1.08], { easing: Easing.bezier(0.16, 1, 0.3, 1) });

  const titleSpring = spring({ frame, fps, config: { damping: 11, mass: 0.5 } });
  const notifSpring = spring({ frame: frame - 28, fps, config: { damping: 9, mass: 0.45, stiffness: 180 } });

  // Floating bounce of the notification card
  const floatY = Math.sin(frame * 0.08) * 6;

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
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", zIndex: 10, opacity: titleSpring, marginBottom: 35 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#00e5ff", letterSpacing: 4 }}>
          HEADLESS DISPATCH MESH
        </div>
        <div style={{ fontSize: 56, fontWeight: 900, color: "#ffffff", letterSpacing: 2, marginTop: 8 }}>
          TRADE WITHOUT <span style={{ color: "#00e5ff" }}>A DESK</span>.
        </div>
        <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 8, letterSpacing: 2 }}>
          TRADINGVIEW WEBHOOKS • WHATSAPP BAILEYS BOT • TELEGRAM
        </div>
      </div>

      {/* Floating High-End Notification Bubble */}
      {frame >= 28 && (
        <div
          style={{
            transform: `scale(${notifSpring}) translateY(${floatY}px)`,
            width: 620,
            padding: "22px 28px",
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(24px)",
            borderRadius: 20,
            border: "2px solid #10b981",
            boxShadow: "0 0 45px rgba(16, 185, 129, 0.4), 0 30px 70px rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            gap: 20,
            zIndex: 20,
          }}
        >
          {/* Glowing Green Signal Icon */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              boxShadow: "0 0 25px #10b981",
            }}
          >
            💬
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#10b981", letterSpacing: 1 }}>
                REPLAYFX WHATSAPP DISPATCH
              </span>
              <span style={{ fontSize: 10, color: "#64748b" }}>JUST NOW</span>
            </div>
            <div style={{ fontSize: 19, fontWeight: 900, color: "#f8fafc", marginTop: 4 }}>
              ★ XAU/USD TARGET REACHED: +$1,450.00
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>
              Captured: +4.8R | Exit Efficiency: 93.4% | EA Positions Closed.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
