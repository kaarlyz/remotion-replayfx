import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HeaderNav } from "../components/HeaderNav";

export const Scene4Behavioral: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 16, mass: 0.8 } });

  const behavioralMetrics = [
    { title: "DISCIPLINE RATING", val: "5 / 5", desc: "100% Pre-Trade Checklist Compliance", col: "#10b981" },
    { title: "PRIMARY EMOTION", val: "CALM / CONFIDENT", desc: "88% of Sessions Executed in Flow State", col: "#00e5ff" },
    { title: "FOMO DETECTION FILTER", val: "0 BREACHES", desc: "No Chasing Moves Past Key FVG Zones", col: "#10b981" },
    { title: "REVENGE TRADE DETECTOR", val: "LOCKED (0 DETECTED)", desc: "Cooldown Lock Triggers on 2 Consecutive Losses", col: "#10b981" },
  ];

  const dispatchServices = [
    { name: "Baileys WhatsApp Socket", port: "PORT 20128", status: "CONNECTED", sub: "Interactive Signal Delivery & EA Override", col: "#10b981" },
    { name: "Telegram Signal Daemon", port: "PID 4120", status: "ACTIVE", sub: "Real-time PnL & Drawdown Alert Push", col: "#10b981" },
    { name: "MT5 Command Watcher", port: "POLLING", status: "SYNCED", sub: "Two-way Terminal Parameter Adjustment", col: "#00e5ff" },
    { name: "Evidence Archiver", port: "NVMe LOCAL", status: "SAVED", sub: "High-res TradingView Snapshot Storage", col: "#3b82f6" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        padding: "85px 50px 40px",
        boxSizing: "border-box",
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', monospace",
      }}
    >
      <HeaderNav currentTab={3} />

      <div style={{ opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * -20}px)`, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              padding: "4px 10px",
              backgroundColor: "rgba(245, 158, 11, 0.15)",
              color: "#f59e0b",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            ARCHITECTURE AUDIT: CORE 04
          </span>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#f8fafc", letterSpacing: 1 }}>
            BEHAVIORAL LEDGER & OMNI-NOTIFIER
          </h1>
        </div>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "#94a3b8" }}>
          Full psychological discipline tracking coupled with headless WhatsApp (Baileys) and Telegram daemon dispatch.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, height: 435 }}>
        {/* Behavioral Forensic Box */}
        <div
          style={{
            backgroundColor: "rgba(15, 21, 33, 0.75)",
            backdropFilter: "blur(16px)",
            borderRadius: 14,
            border: "1px solid rgba(56, 189, 248, 0.2)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 800, color: "#f8fafc", letterSpacing: 1 }}>
            TRADER PSYCHOLOGY TAXONOMY
          </div>
          <div style={{ height: 1, backgroundColor: "rgba(56, 189, 248, 0.15)" }} />

          {behavioralMetrics.map((b) => (
            <div key={b.title} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 10, color: "#64748b", fontWeight: 700, letterSpacing: 1 }}>
                  {b.title}
                </span>
                <span style={{ fontSize: 14, fontWeight: 800, color: b.col }}>
                  {b.val}
                </span>
              </div>
              <div style={{ fontSize: 11, color: "#cbd5e1", marginTop: 2 }}>{b.desc}</div>
            </div>
          ))}

          <div
            style={{
              marginTop: "auto",
              padding: "12px",
              borderRadius: 8,
              backgroundColor: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              fontSize: 11,
              color: "#10b981",
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            ✓ ZERO REVENGE TRADING BREACHES CONFIRMED
          </div>
        </div>

        {/* Remote Dispatch Matrix */}
        <div
          style={{
            backgroundColor: "rgba(15, 21, 33, 0.75)",
            backdropFilter: "blur(16px)",
            borderRadius: 14,
            border: "1px solid rgba(56, 189, 248, 0.2)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 800, color: "#f8fafc", letterSpacing: 1 }}>
            HEADLESS DAEMON & DISPATCH MESH
          </div>
          <div style={{ height: 1, backgroundColor: "rgba(56, 189, 248, 0.15)" }} />

          {dispatchServices.map((d) => (
            <div key={d.name} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, color: "#f8fafc", fontWeight: 700 }}>{d.name}</div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>{d.port}</div>
                </div>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 800,
                    backgroundColor: `${d.col}20`,
                    border: `1px solid ${d.col}60`,
                    color: d.col,
                  }}
                >
                  {d.status}
                </span>
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{d.sub}</div>
            </div>
          ))}

          <div
            style={{
              marginTop: "auto",
              padding: "12px",
              borderRadius: 8,
              backgroundColor: "rgba(0, 229, 255, 0.08)",
              border: "1px solid rgba(0, 229, 255, 0.25)",
              fontSize: 11,
              color: "#00e5ff",
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            ● TELEGRAM & WHATSAPP REMOTE CONTROL ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
};
