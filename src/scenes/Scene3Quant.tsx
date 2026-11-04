import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HeaderNav } from "../components/HeaderNav";

export const Scene3Quant: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 16, mass: 0.8 } });

  // Top metric counters
  const metrics = [
    { label: "SHARPE RATIO", val: "2.84", sub: "Annualized Return / Volatility", col: "#10b981", delay: 5 },
    { label: "Z-SCORE", val: "2.15", sub: "96.8% Streak Confidence", col: "#00e5ff", delay: 10 },
    { label: "PROFIT FACTOR", val: "3.12", sub: "Gross Win: $42.5k / Loss: $13.6k", col: "#f59e0b", delay: 15 },
    { label: "RUIN PROBABILITY", val: "0.08%", sub: "Monte Carlo 10,000 Iterations", col: "#a855f7", delay: 20 },
  ];

  // Prop firm compliance items
  const rules = [
    { name: "Max Daily Drawdown (-5.0%)", status: "PASS", val: "Current: -1.24%", col: "#10b981" },
    { name: "Max Overall Drawdown (-10.0%)", status: "PASS", val: "Current: -3.42%", col: "#10b981" },
    { name: "Profit Target (+10.0%)", status: "PASSED", val: "Current: +14.80%", col: "#10b981" },
    { name: "Min Trading Days (4 Days)", status: "COMPLIANT", val: "Completed: 8 Days", col: "#00e5ff" },
    { name: "Weekend Risk Policy", status: "VERIFIED", val: "Zero Weekend Positions", col: "#00e5ff" },
  ];

  // Monte Carlo simulation progress
  const simProgress = interpolate(frame, [0, 180], [0, 1], { extrapolateRight: "clamp" });

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
      <HeaderNav currentTab={2} />

      <div style={{ opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * -20}px)`, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              padding: "4px 10px",
              backgroundColor: "rgba(168, 85, 247, 0.15)",
              color: "#a855f7",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            ARCHITECTURE AUDIT: CORE 03
          </span>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#f8fafc", letterSpacing: 1 }}>
            QUANTITATIVE LAB & PROP FIRM ENGINE
          </h1>
        </div>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "#94a3b8" }}>
          Full Monte Carlo bootstrap simulation, MT5 statistical models, and institutional prop firm pass/fail auditing.
        </p>
      </div>

      {/* Top 4 Metric Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
        {metrics.map((m) => {
          const s = spring({ frame: frame - m.delay, fps, config: { damping: 14 } });
          return (
            <div
              key={m.label}
              style={{
                opacity: s,
                transform: `scale(${interpolate(s, [0, 1], [0.92, 1])})`,
                backgroundColor: "rgba(15, 21, 33, 0.75)",
                backdropFilter: "blur(14px)",
                borderRadius: 12,
                border: "1px solid rgba(56, 189, 248, 0.15)",
                padding: "16px 20px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, letterSpacing: 1 }}>{m.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: m.col, margin: "6px 0" }}>{m.val}</div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>{m.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Bottom Split: Prop Firm Rules vs Monte Carlo Chart */}
      <div style={{ display: "flex", gap: 20, height: 320 }}>
        {/* Prop Firm Compliance */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(15, 21, 33, 0.75)",
            backdropFilter: "blur(16px)",
            borderRadius: 14,
            border: "1px solid rgba(56, 189, 248, 0.2)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 800, color: "#f8fafc", letterSpacing: 1, marginBottom: 14 }}>
            PROP FIRM RULE SIMULATOR (FTMO / FUNDEDNEXT)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, justifyContent: "space-around" }}>
            {rules.map((r) => (
              <div
                key={r.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                  paddingBottom: 8,
                }}
              >
                <div>
                  <div style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 600 }}>{r.name}</div>
                  <div style={{ fontSize: 10, color: "#64748b" }}>{r.val}</div>
                </div>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 800,
                    backgroundColor: `${r.col}20`,
                    border: `1px solid ${r.col}60`,
                    color: r.col,
                  }}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Monte Carlo Visualizer */}
        <div
          style={{
            flex: 1.2,
            backgroundColor: "rgba(15, 21, 33, 0.75)",
            backdropFilter: "blur(16px)",
            borderRadius: 14,
            border: "1px solid rgba(56, 189, 248, 0.2)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#f8fafc", letterSpacing: 1 }}>
              MONTE CARLO SIMULATION (10,000 PATHS)
            </span>
            <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700 }}>
              0.08% RISK OF RUIN
            </span>
          </div>

          <div style={{ flex: 1, position: "relative" }}>
            <svg style={{ width: "100%", height: "100%", overflow: "hidden" }}>
              {/* Background grid */}
              {[40, 90, 140, 190].map((gy) => (
                <line key={gy} x1="0" y1={gy} x2="600" y2={gy} stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
              ))}

              {/* 10 Simulation Curves */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => {
                const points: string[] = [];
                const numSteps = Math.floor(simProgress * 20);
                for (let step = 0; step <= numSteps; step++) {
                  const x = (step / 20) * 550;
                  const drift = step * 6;
                  const noise = Math.sin(step * 0.8 + idx * 1.5) * 22;
                  const y = 200 - drift - noise;
                  points.push(`${x},${y}`);
                }
                const isTop = idx === 3 || idx === 7;
                return (
                  <polyline
                    key={idx}
                    fill="none"
                    stroke={isTop ? "#00e5ff" : "#10b981"}
                    strokeWidth={isTop ? 2.2 : 1.2}
                    strokeOpacity={0.4 + (idx % 3) * 0.2}
                    points={points.join(" ")}
                  />
                );
              })}
            </svg>
          </div>
          <div style={{ fontSize: 10, color: "#94a3b8", textAlign: "right" }}>
            Bootstrap confidence interval: 99.92% Survival rate
          </div>
        </div>
      </div>
    </div>
  );
};
