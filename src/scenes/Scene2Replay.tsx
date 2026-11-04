import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HeaderNav } from "../components/HeaderNav";

export const Scene2Replay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.8 },
  });

  // Candlestick data for SMC setup
  const rawCandles = [
    { o: 2652, h: 2654, l: 2650.5, c: 2651 },
    { o: 2651, h: 2653, l: 2649, c: 2650 },
    { o: 2650, h: 2652, l: 2648.5, c: 2651.5 },
    { o: 2651.5, h: 2653, l: 2647, c: 2648 },
    { o: 2648, h: 2649.5, l: 2645, c: 2646 },
    { o: 2646, h: 2647.5, l: 2644, c: 2645 },
    { o: 2645, h: 2646, l: 2642, c: 2643 },
    { o: 2643, h: 2644, l: 2639.8, c: 2644 }, // Liquidity grab wick
    { o: 2644, h: 2647, l: 2643.5, c: 2646.5 }, // MSS
    { o: 2646.5, h: 2648, l: 2644.2, c: 2644.8 }, // Retest FVG
    { o: 2644.8, h: 2649, l: 2644.5, c: 2648.5 }, // Impulse up
    { o: 2648.5, h: 2653, l: 2648, c: 2652.5 },
    { o: 2652.5, h: 2656, l: 2651.5, c: 2655 },
    { o: 2655, h: 2659, l: 2654.5, c: 2658.2 },
    { o: 2658.2, h: 2663.5, l: 2657.5, c: 2662.8 }, // Massive TP hit
  ];

  // Price coordinate mapper
  const minP = 2638;
  const maxP = 2666;
  const chartHeight = 360;
  const p2y = (p: number) => chartHeight - ((p - minP) / (maxP - minP)) * chartHeight;

  // Reveal candles gradually
  const numCandles = Math.min(
    rawCandles.length,
    Math.floor(interpolate(frame, [0, 160], [1, rawCandles.length], { extrapolateRight: "clamp" }))
  );

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
      <HeaderNav currentTab={1} />

      <div
        style={{
          opacity: titleSpring,
          transform: `translateY(${(1 - titleSpring) * -20}px)`,
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              padding: "4px 10px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              color: "#10b981",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            ARCHITECTURE AUDIT: CORE 02
          </span>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#f8fafc", letterSpacing: 1 }}>
            SUB-MILLISECOND REPLAY & EXCURSION FORENSICS
          </h1>
        </div>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "#94a3b8" }}>
          Lightweight-Charts tick simulation with automated MFE (Max Favorable) & MAE (Max Adverse) risk audit.
        </p>
      </div>

      <div style={{ display: "flex", gap: 24, height: 435 }}>
        {/* Chart Viewport */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(15, 21, 33, 0.75)",
            backdropFilter: "blur(16px)",
            borderRadius: 14,
            border: "1px solid rgba(56, 189, 248, 0.2)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
            padding: "20px 24px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Chart Header */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "#00e5ff", fontWeight: 700 }}>
              XAU/USD (GOLD) • M5 LIQUIDITY REPLAY
            </span>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>
              TICK FEED: DUKASCOPY (0.82 ms latency)
            </span>
          </div>

          {/* SVG Chart Area */}
          <div style={{ flex: 1, position: "relative" }}>
            <svg style={{ width: "100%", height: chartHeight, overflow: "visible" }}>
              {/* Horizontal Grid lines */}
              {[2640, 2645, 2650, 2655, 2660].map((p) => {
                const y = p2y(p);
                return (
                  <g key={p}>
                    <line x1="0" y1={y} x2="720" y2={y} stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                    <text x="730" y={y + 4} fill="#64748b" fontSize="10" fontFamily="monospace">
                      {p.toFixed(2)}
                    </text>
                  </g>
                );
              })}

              {/* Order block zone */}
              <rect
                x="0"
                y={p2y(2644)}
                width="720"
                height={p2y(2639.8) - p2y(2644)}
                fill="rgba(16, 185, 129, 0.12)"
                stroke="#10b981"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text x="16" y={p2y(2644) + 16} fill="#10b981" fontSize="10" fontWeight="700">
                ● M5 BULLISH ORDER BLOCK // LIQUIDITY SWEEP
              </text>

              {/* Candlesticks */}
              {rawCandles.slice(0, numCandles).map((c, i) => {
                const cx = 35 + i * 46;
                const isBull = c.c >= c.o;
                const color = isBull ? "#10b981" : "#ef4444";
                const bodyTop = p2y(Math.max(c.o, c.c));
                const bodyBottom = p2y(Math.min(c.o, c.c));
                const bodyHeight = Math.max(3, bodyBottom - bodyTop);

                return (
                  <g key={i}>
                    {/* Wick */}
                    <line x1={cx} y1={p2y(c.h)} x2={cx} y2={p2y(c.l)} stroke={color} strokeWidth="1.8" />
                    {/* Body */}
                    <rect
                      x={cx - 10}
                      y={bodyTop}
                      width="20"
                      height={bodyHeight}
                      fill={color}
                      rx="2"
                    />
                  </g>
                );
              })}

              {/* Excursion Measurement Overlays */}
              {numCandles >= 10 && (
                <>
                  {/* Entry Line */}
                  <line x1="0" y1={p2y(2644.5)} x2="720" y2={p2y(2644.5)} stroke="#3b82f6" strokeWidth="1.8" />
                  <text x="20" y={p2y(2644.5) - 6} fill="#3b82f6" fontSize="10" fontWeight="700">
                    ▲ ENTRY: 2644.50
                  </text>

                  {/* MAE Line (Adverse) */}
                  <line x1="0" y1={p2y(2640)} x2="720" y2={p2y(2640)} stroke="#ef4444" strokeWidth="1.8" strokeDasharray="5 5" />
                  <text x="20" y={p2y(2640) + 14} fill="#ef4444" fontSize="10" fontWeight="700">
                    ✕ MAE (MAX ADVERSE EXCURSION): -0.3R (-8 PIPS)
                  </text>

                  {/* MFE Line (Favorable / TP) */}
                  <line x1="0" y1={p2y(2662.8)} x2="720" y2={p2y(2662.8)} stroke="#10b981" strokeWidth="2" />
                  <text x="20" y={p2y(2662.8) - 8} fill="#10b981" fontSize="11" fontWeight="800">
                    ★ MFE (MAX FAVORABLE EXCURSION): +4.8R (+128 PIPS)
                  </text>
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Right Forensic Side Panel */}
        <div
          style={{
            width: 380,
            backgroundColor: "rgba(15, 21, 33, 0.75)",
            backdropFilter: "blur(16px)",
            borderRadius: 14,
            border: "1px solid rgba(56, 189, 248, 0.2)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 800, color: "#f8fafc", letterSpacing: 1 }}>
            FORENSIC EXECUTION METRICS
          </div>
          <div style={{ height: 1, backgroundColor: "rgba(56, 189, 248, 0.15)" }} />

          {[
            { label: "EXIT EFFICIENCY", val: "93.4%", desc: "capturedRR / maxPotentialRR", col: "#10b981" },
            { label: "EXECUTION LATENCY", val: "0.82 ms", desc: "Sub-millisecond tick match", col: "#00e5ff" },
            { label: "PRICE SCALE GAP", val: "0.00%", desc: "No broker scale discrepancy", col: "#10b981" },
            { label: "MODEL IDENTITY", val: "SMC_LIQUIDITY_v2", desc: "Asia range low sweep", col: "#f8fafc" },
            { label: "IMMUTABLE AUDIT", val: "SHA-256 LOGGED", desc: "Table: TradeReplayAnalysis", col: "#f59e0b" },
          ].map((item) => (
            <div key={item.label} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 10, color: "#64748b", fontWeight: 700, letterSpacing: 1 }}>
                  {item.label}
                </span>
                <span style={{ fontSize: 14, fontWeight: 800, color: item.col }}>
                  {item.val}
                </span>
              </div>
              <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{item.desc}</div>
            </div>
          ))}

          <div
            style={{
              marginTop: "auto",
              padding: "10px",
              borderRadius: 8,
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              fontSize: 10,
              color: "#10b981",
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            ✓ REPLAY VERIFIED WITH IMMUTABLE PARQUET TICKS
          </div>
        </div>
      </div>
    </div>
  );
};
