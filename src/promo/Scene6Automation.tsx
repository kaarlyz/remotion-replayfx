import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene6Automation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });

  const nodes = [
    { title: "TRADINGVIEW ALERTS", sub: "PineScript Instant Webhook", col: "#00e5ff", delay: 5 },
    { title: "REPLAYFX SERVER", sub: "Prisma & Fast Sub-ms Queue", col: "#3b82f6", delay: 15 },
    { title: "WHATSAPP BAILEYS BOT", sub: "Interactive Remote Control", col: "#10b981", delay: 25 },
    { title: "TELEGRAM ALERT DAEMON", sub: "Drawdown & Emergency Killswitch", col: "#f59e0b", delay: 35 },
  ];

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
        alignItems: "center",
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', monospace",
        textAlign: "center",
      }}
    >
      <div style={{ opacity: entrance, marginBottom: 40 }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 14px",
            borderRadius: 20,
            backgroundColor: "rgba(0, 229, 255, 0.15)",
            border: "1px solid rgba(0, 229, 255, 0.3)",
            fontSize: 12,
            fontWeight: 800,
            color: "#00e5ff",
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          DESKLESS TRADING MESH
        </div>
        <div style={{ fontSize: 48, fontWeight: 900, color: "#f8fafc", letterSpacing: 2 }}>
          TRADE FROM <span style={{ color: "#00e5ff" }}>ANYWHERE</span>.
        </div>
        <div style={{ fontSize: 16, color: "#94a3b8", marginTop: 8 }}>
          Leave your desk. Monitor executions, manage stops, and kill rogue EAs via WhatsApp & Telegram.
        </div>
      </div>

      {/* 4 Pipeline Nodes */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, maxWidth: 1150 }}>
        {nodes.map((n, i) => {
          const s = spring({ frame: frame - n.delay, fps, config: { damping: 12 } });
          return (
            <React.Fragment key={n.title}>
              <div
                style={{
                  transform: `scale(${s})`,
                  opacity: s,
                  padding: "24px 20px",
                  backgroundColor: "rgba(15, 23, 42, 0.85)",
                  backdropFilter: "blur(16px)",
                  borderRadius: 14,
                  border: `1px solid ${n.col}60`,
                  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px ${n.col}20`,
                  width: 210,
                  textAlign: "center",
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: n.col, margin: "0 auto 12px" }} />
                <div style={{ fontSize: 12, fontWeight: 800, color: n.col, letterSpacing: 1 }}>{n.title}</div>
                <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 6 }}>{n.sub}</div>
              </div>
              {i < nodes.length - 1 && (
                <div style={{ fontSize: 20, color: "#64748b", fontWeight: 900 }}>→</div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
