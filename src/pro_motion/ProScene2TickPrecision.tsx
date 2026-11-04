import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ProScene2TickPrecision: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth camera dolly and slight angle rotation
  const camZoom = interpolate(frame, [0, 155], [0.95, 1.1], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const camRot = interpolate(frame, [0, 155], [-1.5, 1.2]);

  // Title entrance
  const titleSpring = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });

  // Dynamic price ticker: 2641.50 -> 2656.80
  const currentPrice = interpolate(frame, [0, 60, 155], [2641.5, 2644.0, 2658.2], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  }).toFixed(2);

  // Candlesticks layout
  const candles = [
    { x: 120, o: 300, c: 320, h: 280, l: 335, bull: false },
    { x: 200, o: 320, c: 340, h: 310, l: 355, bull: false },
    { x: 280, o: 340, c: 360, h: 330, l: 385, bull: false }, // Sweep candle
    { x: 360, o: 360, c: 310, h: 300, l: 370, bull: true },  // Strong rebound
    { x: 440, o: 310, c: 260, h: 250, l: 320, bull: true },  // Expansion
    { x: 520, o: 260, c: 210, h: 195, l: 270, bull: true },  // Massive bull
    { x: 600, o: 210, c: 160, h: 145, l: 220, bull: true },  // Target hit
  ];

  // Animated reveal of candles
  const visibleCandles = Math.min(
    candles.length,
    Math.floor(interpolate(frame, [10, 120], [1, candles.length], { extrapolateRight: "clamp" }))
  );

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 80px",
        boxSizing: "border-box",
        fontFamily: "'FiraCode Nerd Font', 'Fira Code', -apple-system, sans-serif",
        transform: `scale(${camZoom}) rotate(${camRot}deg)`,
      }}
    >
      {/* Top Header */}
      <div style={{ opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * -20}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              padding: "5px 12px",
              backgroundColor: "rgba(0, 229, 255, 0.15)",
              color: "#00e5ff",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            SUB-MILLISECOND PRECISION
          </span>
          <span style={{ fontSize: 13, color: "#64748b" }}>// DUKASCOPY PARQUET CACHE</span>
        </div>
        <div style={{ fontSize: 44, fontWeight: 900, color: "#ffffff", letterSpacing: 2, marginTop: 8 }}>
          REPLAY EVERY <span style={{ color: "#00e5ff" }}>SINGLE TICK</span>.
        </div>
      </div>

      {/* Live Interactive Chart Area */}
      <div
        style={{
          width: "100%",
          height: 380,
          position: "relative",
          backgroundColor: "rgba(12, 17, 26, 0.7)",
          backdropFilter: "blur(20px)",
          borderRadius: 16,
          border: "1px solid rgba(56, 189, 248, 0.2)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 229, 255, 0.1)",
          overflow: "hidden",
        }}
      >
        <svg style={{ width: "100%", height: "100%" }}>
          {/* Liquidity Grab Zone */}
          <rect x="0" y="340" width="100%" height="45" fill="rgba(239, 68, 68, 0.08)" />
          <line x1="0" y1="365" x2="100%" y2="365" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 6" />
          <text x="20" y="358" fill="#ef4444" fontSize="11" fontWeight="700">
            LIQUIDITY GRAB // ASIA SESSION LOW
          </text>

          {/* Animated Candlesticks */}
          {candles.slice(0, visibleCandles).map((c, i) => {
            const col = c.bull ? "#10b981" : "#ef4444";
            const top = Math.min(c.o, c.c);
            const height = Math.abs(c.c - c.o);
            return (
              <g key={i}>
                <line x1={c.x} y1={c.h} x2={c.x} y2={c.l} stroke={col} strokeWidth="2.5" />
                <rect
                  x={c.x - 16}
                  y={top}
                  width="32"
                  height={Math.max(4, height)}
                  rx="3"
                  fill={col}
                  style={{ filter: `drop-shadow(0 0 8px ${col}80)` }}
                />
              </g>
            );
          })}

          {/* Moving Price Line */}
          {visibleCandles >= 4 && (
            <>
              <line
                x1="0"
                y1={candles[visibleCandles - 1].c}
                x2="100%"
                y2={candles[visibleCandles - 1].c}
                stroke="#00e5ff"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <circle
                cx={candles[visibleCandles - 1].x}
                cy={candles[visibleCandles - 1].c}
                r="7"
                fill="#ffffff"
                stroke="#00e5ff"
                strokeWidth="3"
                style={{ filter: "drop-shadow(0 0 10px #00e5ff)" }}
              />
            </>
          )}
        </svg>

        {/* Live floating HUD pill */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 24,
            padding: "10px 18px",
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            borderRadius: 8,
            border: "1px solid #00e5ff",
            boxShadow: "0 0 20px rgba(0, 229, 255, 0.3)",
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700 }}>XAU/USD</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#10b981" }}>${currentPrice}</div>
          </div>
          <div style={{ width: 1, height: 25, backgroundColor: "rgba(255,255,255,0.15)" }} />
          <div>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700 }}>LATENCY</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#00e5ff" }}>0.82 ms</div>
          </div>
        </div>
      </div>
    </div>
  );
};
