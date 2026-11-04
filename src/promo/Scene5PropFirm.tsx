import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene5PropFirm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });

  const rules = [
    { title: "FTMO 5% DAILY LOSS LIMIT", result: "SAFE: MAX -1.2%", pass: true },
    { title: "FUNDEDNEXT 10% TOTAL DRAWDOWN", result: "SAFE: MAX -3.4%", pass: true },
    { title: "PROFIT TARGET (+10.0%)", result: "ACHIEVED: +14.8%", pass: true },
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
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', monospace",
      }}
    >
      {/* Left Column */}
      <div style={{ maxWidth: 540, opacity: entrance }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 14px",
            borderRadius: 20,
            backgroundColor: "rgba(168, 85, 247, 0.15)",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            fontSize: 12,
            fontWeight: 800,
            color: "#a855f7",
            letterSpacing: 2,
            marginBottom: 16,
          }}
        >
          QUANTITATIVE RISK ENGINE
        </div>
        <div style={{ fontSize: 48, fontWeight: 900, color: "#f8fafc", lineHeight: 1.1, letterSpacing: 2 }}>
          CRUSH PROP FIRM <span style={{ color: "#a855f7" }}>EVALUATIONS</span>.
        </div>
        <div style={{ fontSize: 16, color: "#94a3b8", marginTop: 18, lineHeight: 1.6 }}>
          Run your strategies through 10,000 Monte Carlo bootstrap trials. Eliminate breach risk before paying challenge fees.
        </div>

        {/* 0.08% Ruin Badge */}
        <div
          style={{
            marginTop: 24,
            padding: "16px 24px",
            backgroundColor: "rgba(16, 185, 129, 0.12)",
            borderRadius: 14,
            border: "2px solid #10b981",
            boxShadow: "0 0 30px rgba(16, 185, 129, 0.2)",
            display: "inline-block",
          }}
        >
          <div style={{ fontSize: 11, color: "#10b981", fontWeight: 700, letterSpacing: 1 }}>
            BOOTSTRAP SURVIVAL PROBABILITY
          </div>
          <div style={{ fontSize: 38, fontWeight: 900, color: "#f8fafc", margin: "4px 0" }}>
            99.92% PASS RATE
          </div>
          <div style={{ fontSize: 11, color: "#64748b" }}>Ruin Risk: 0.08% across 10k simulations</div>
        </div>
      </div>

      {/* Right Column: Rule Passes */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 440, opacity: entrance }}>
        {rules.map((r, i) => {
          const s = spring({ frame: frame - 15 - i * 10, fps, config: { damping: 12 } });
          return (
            <div
              key={r.title}
              style={{
                transform: `scale(${s})`,
                opacity: s,
                padding: "22px 26px",
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                backdropFilter: "blur(16px)",
                borderRadius: 14,
                border: "1px solid rgba(16, 185, 129, 0.3)",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#f8fafc" }}>{r.title}</div>
                <div style={{ fontSize: 11, color: "#10b981", marginTop: 4 }}>{r.result}</div>
              </div>
              <div
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  border: "1px solid #10b981",
                  fontSize: 11,
                  fontWeight: 900,
                  color: "#10b981",
                }}
              >
                PASSED
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
