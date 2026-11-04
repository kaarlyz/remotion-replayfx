import React from "react";
import { useCurrentFrame } from "remotion";

interface HeaderNavProps {
  currentTab: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ currentTab }) => {
  const frame = useCurrentFrame();
  const blink = Math.sin(frame * 0.25) > 0;

  const tabs = [
    "01. OMNI-INGESTION",
    "02. TICK FORENSIC",
    "03. QUANT & PROP",
    "04. BEHAVIORAL LEDGER",
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 36px",
        backgroundColor: "rgba(12, 17, 26, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(56, 189, 248, 0.15)",
        zIndex: 50,
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', monospace",
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            backgroundColor: "#00e5ff",
            boxShadow: "0 0 12px #00e5ff",
          }}
        />
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#f8fafc",
            letterSpacing: 2,
          }}
        >
          REPLAYFX
        </span>
        <span
          style={{
            fontSize: 12,
            color: "#64748b",
            letterSpacing: 1,
            marginLeft: 4,
          }}
        >
          // MYFXJOURNAL ENGINE
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 10 }}>
        {tabs.map((tab, idx) => {
          const isActive = idx === currentTab;
          return (
            <div
              key={tab}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1,
                color: isActive ? "#00e5ff" : "#64748b",
                backgroundColor: isActive
                  ? "rgba(0, 229, 255, 0.1)"
                  : "transparent",
                border: isActive
                  ? "1px solid rgba(0, 229, 255, 0.4)"
                  : "1px solid transparent",
                transition: "all 0.3s ease",
              }}
            >
              {tab}
            </div>
          );
        })}
      </div>

      {/* Live Status Telemetry */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: blink ? "#10b981" : "rgba(16, 185, 129, 0.3)",
            boxShadow: blink ? "0 0 8px #10b981" : "none",
          }}
        />
        <span style={{ fontSize: 11, color: "#10b981", fontWeight: 600, letterSpacing: 1 }}>
          IMMUTABLE LEDGER: VERIFIED
        </span>
      </div>
    </div>
  );
};
