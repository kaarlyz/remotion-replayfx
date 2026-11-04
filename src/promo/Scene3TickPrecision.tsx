import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene3TickPrecision: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });
  const zoom = interpolate(frame, [0, 120], [1, 1.15]);

  // Dynamic price tick counter
  const price = interpolate(frame, [0, 60, 120], [2641.2, 2639.8, 2652.5]).toFixed(2);

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
        transform: `scale(${zoom})`,
      }}
    >
      {/* Left Pitch */}
      <div style={{ maxWidth: 520, opacity: entrance }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 14px",
            borderRadius: 20,
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            fontSize: 12,
            fontWeight: 800,
            color: "#10b981",
            letterSpacing: 2,
            marginBottom: 16,
          }}
        >
          0.8ms SUB-MILLISECOND LATENCY
        </div>
        <div style={{ fontSize: 50, fontWeight: 900, color: "#f8fafc", lineHeight: 1.1, letterSpacing: 2 }}>
          REPLAY EVERY <span style={{ color: "#00e5ff" }}>SINGLE TICK</span>.
        </div>
        <div style={{ fontSize: 16, color: "#94a3b8", marginTop: 18, lineHeight: 1.6 }}>
          Stop testing on synthetic 1-minute bars. Replay true historical bid/ask liquidity sweeps directly from Dukascopy Parquet archives.
        </div>

        {/* Live Ticker Box */}
        <div
          style={{
            marginTop: 26,
            padding: "16px 24px",
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            borderRadius: 12,
            border: "1px solid #38bdf8",
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            boxShadow: "0 0 25px rgba(56, 189, 248, 0.2)",
          }}
        >
          <div>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700 }}>LIVE XAU/USD TICK</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#10b981" }}>${price}</div>
          </div>
          <div style={{ height: 35, width: 1, backgroundColor: "rgba(255,255,255,0.1)" }} />
          <div>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700 }}>LIQUIDITY STATE</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#00e5ff" }}>SWEEP COMPLETED</div>
          </div>
        </div>
      </div>

      {/* Right Macro Candlestick Graphic */}
      <div
        style={{
          width: 500,
          height: 420,
          backgroundColor: "rgba(15, 21, 33, 0.8)",
          backdropFilter: "blur(20px)",
          borderRadius: 20,
          border: "2px solid rgba(0, 229, 255, 0.3)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 229, 255, 0.15)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, color: "#38bdf8", letterSpacing: 1 }}>
          ● M5 ASIA RANGE LOW SWEEP & EXPANSION
        </div>

        <svg style={{ flex: 1, marginTop: 10, overflow: "visible" }}>
          {/* Swept line */}
          <line x1="0" y1="280" x2="450" y2="280" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="10" y="272" fill="#ef4444" fontSize="10" fontWeight="700">
            PREVIOUS ASIA LOW (2641.50)
          </text>

          {/* Wicked Candle */}
          <line x1="220" y1="180" x2="220" y2="330" stroke="#10b981" strokeWidth="2.5" />
          <rect x="202" y="190" width="36" height="50" rx="4" fill="#10b981" />

          {/* Huge Bullish Followthrough */}
          <line x1="310" y1="80" x2="310" y2="260" stroke="#10b981" strokeWidth="2.5" />
          <rect x="290" y="90" width="40" height="150" rx="4" fill="#10b981" />

          {/* Buy Marker */}
          <circle cx="220" cy="245" r="7" fill="#00e5ff" />
          <text x="240" y="250" fill="#00e5ff" fontSize="12" fontWeight="800">
            ▲ BUY LIMIT FILLED (2644.50)
          </text>
        </svg>

        <div style={{ fontSize: 11, color: "#10b981", textAlign: "right", fontWeight: 700 }}>
          IMMUTABLE LOG ID: #TR-92810
        </div>
      </div>
    </div>
  );
};
