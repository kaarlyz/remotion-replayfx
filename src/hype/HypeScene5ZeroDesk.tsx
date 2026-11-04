import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HypeScene5ZeroDesk: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 11 } });
  const notifSpring = spring({ frame: frame - 25, fps, config: { damping: 10, mass: 0.5 } });

  // Camera drift
  const camZoom = interpolate(frame, [0, 120], [1, 1.12]);

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
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', sans-serif",
        transform: `scale(${camZoom})`,
        overflow: "hidden",
      }}
    >
      {/* Background ambient mesh glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.2) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      {/* Main Punch */}
      <div style={{ textAlign: "center", zIndex: 10, opacity: titleSpring, marginBottom: 30 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#00e5ff", letterSpacing: 6, textTransform: "uppercase" }}>
          HEADLESS DISPATCH MESH
        </div>
        <div style={{ fontSize: 68, fontWeight: 900, color: "#ffffff", letterSpacing: 4, lineHeight: 1.1 }}>
          TRADE WITHOUT <span style={{ color: "#00e5ff" }}>A DESK</span>.
        </div>
        <div style={{ fontSize: 16, color: "#94a3b8", marginTop: 10, letterSpacing: 2 }}>
          TRADINGVIEW WEBHOOKS • WHATSAPP BAILEYS BOT • TELEGRAM
        </div>
      </div>

      {/* Realistic Glassmorphic Push Notification Card */}
      {frame >= 25 && (
        <div
          style={{
            zIndex: 20,
            transform: `scale(${notifSpring}) translateY(${(1 - notifSpring) * 60}px)`,
            width: 580,
            padding: "20px 28px",
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(24px)",
            borderRadius: 20,
            border: "2px solid #10b981",
            boxShadow: "0 0 45px rgba(16, 185, 129, 0.35), 0 25px 60px rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* App icon */}
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              backgroundColor: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              boxShadow: "0 0 20px #10b981",
            }}
          >
            💬
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#10b981", letterSpacing: 1 }}>
                REPLAYFX WHATSAPP DISPATCH
              </span>
              <span style={{ fontSize: 10, color: "#64748b" }}>NOW</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#f8fafc", marginTop: 4 }}>
              ★ XAU/USD TARGET REACHED: +$1,450.00
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
              Captured: +4.8R | Exit Efficiency: 93.4% | EA Locked.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
