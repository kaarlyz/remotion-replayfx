import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HeaderNav } from "../components/HeaderNav";

export const Scene1Ingestion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for Title
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.8 },
  });

  const cards = [
    {
      title: "TRADINGVIEW WEBHOOK",
      subtitle: "PineScript Alert Stream Listener",
      badge: "0.4 ms LATENCY",
      accent: "#00e5ff",
      items: [
        { label: "PROTOCOL", val: "POST /api/webhooks/tradingview" },
        { label: "DEDUP FILTER", val: "SHA-256 Fingerprint Hash" },
        { label: "EXECUTION PARSER", val: "Auto Limit/Market Mapper" },
        { label: "STATUS", val: "ACTIVE LISTENER" },
      ],
      delay: 5,
    },
    {
      title: "MT5 STRATEGY PARSER",
      subtitle: "HTML Tester & Deal Graph Engine",
      badge: "QUANT METRICS",
      accent: "#3b82f6",
      items: [
        { label: "DATA EXTRACTED", val: "Deals, Orders, Equity Curves" },
        { label: "ADVANCED MATH", val: "Z-Score, Sharpe, AHPR, GHPR" },
        { label: "FINDINGS ENGINE", val: "Auto Martingale & Flaw Audit" },
        { label: "STATUS", val: "PARSER READY" },
      ],
      delay: 15,
    },
    {
      title: "PARQUET TICK PIPELINE",
      subtitle: "Dukascopy & QDM Direct Feeds",
      badge: "-85% DISK FOOTPRINT",
      accent: "#a855f7",
      items: [
        { label: "STORAGE ENGINE", val: "Apache Parquet Columnar" },
        { label: "DATA DENSITY", val: "Sub-millisecond Bid/Ask Ticks" },
        { label: "PYTHON SERVICE", val: "Dukascopy Downloader Daemon" },
        { label: "STATUS", val: "TICK STREAM READY" },
      ],
      delay: 25,
    },
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
      <HeaderNav currentTab={0} />

      {/* Header Banner */}
      <div
        style={{
          opacity: titleSpring,
          transform: `translateY(${(1 - titleSpring) * -20}px)`,
          marginBottom: 25,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              padding: "4px 10px",
              backgroundColor: "rgba(0, 229, 255, 0.15)",
              color: "#00e5ff",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            ARCHITECTURE AUDIT: CORE 01
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 800,
              color: "#f8fafc",
              letterSpacing: 1,
            }}
          >
            OMNI-CHANNEL INGESTION PIPELINE
          </h1>
        </div>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "#94a3b8" }}>
          Unified multi-source ingestion layer connecting TradingView, MetaTrader 5, and Parquet tick archives.
        </p>
      </div>

      {/* 3 Bento Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, height: 430 }}>
        {cards.map((card) => {
          const cardSpring = spring({
            frame: frame - card.delay,
            fps,
            config: { damping: 14, mass: 0.9 },
          });

          return (
            <div
              key={card.title}
              style={{
                opacity: cardSpring,
                transform: `scale(${interpolate(cardSpring, [0, 1], [0.92, 1])}) translateY(${(1 - cardSpring) * 30}px)`,
                backgroundColor: "rgba(15, 21, 33, 0.75)",
                backdropFilter: "blur(16px)",
                borderRadius: 14,
                border: `1px solid rgba(56, 189, 248, ${0.15 + cardSpring * 0.2})`,
                boxShadow: `0 10px 30px rgba(0, 0, 0, 0.4), 0 0 25px ${card.accent}15`,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  padding: "18px 20px",
                  borderBottom: "1px solid rgba(56, 189, 248, 0.12)",
                  backgroundColor: "rgba(20, 27, 42, 0.6)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: card.accent, letterSpacing: 1 }}>
                    {card.title}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: card.accent,
                      backgroundColor: `${card.accent}20`,
                      padding: "3px 8px",
                      borderRadius: 4,
                      border: `1px solid ${card.accent}40`,
                    }}
                  >
                    {card.badge}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{card.subtitle}</div>
              </div>

              {/* Card Body */}
              <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                {card.items.map((it) => (
                  <div key={it.label} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)", paddingBottom: 8 }}>
                    <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, letterSpacing: 1 }}>
                      {it.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: it.label === "STATUS" ? "#10b981" : "#e2e8f0",
                        fontWeight: 600,
                        marginTop: 3,
                      }}
                    >
                      {it.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Technology Signature */}
      <div
        style={{
          marginTop: 18,
          padding: "10px 20px",
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          borderRadius: 8,
          border: "1px solid rgba(56, 189, 248, 0.15)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 11,
          color: "#94a3b8",
        }}
      >
        <span>
          <strong style={{ color: "#f59e0b" }}>DATABASE KERNEL:</strong> SQLite + Prisma ORM (21 Data Models, Append-Only Immutable Records)
        </span>
        <span style={{ color: "#38bdf8" }}>
          ENGINE STATUS: 100% OPERATIONAL
        </span>
      </div>
    </div>
  );
};
