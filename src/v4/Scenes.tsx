import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Scene 1: OPENING STROBE + "90% OF TRADERS BLOW UP" (0-2.5s, 75f)
export const S01: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = interpolate(f, [0, 75], [1.0, 1.2], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const strobeOp = f < 3 ? 1 - f / 3 : 0;

  const words = [
    { t: "90%", c: "#ef4444", d: 0 },
    { t: "OF TRADERS", c: "#e2e8f0", d: 8 },
    { t: "BLOW UP.", c: "#ef4444", d: 16 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'FiraCode Nerd Font', monospace", transform: `scale(${zoom})` }}>
      {/* Red pulse */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 60%)", filter: "blur(60px)" }} />

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {words.map((w) => {
          if (f < w.d) return null;
          const s = spring({ frame: f - w.d, fps, config: { damping: 8, mass: 0.3, stiffness: 260 } });
          const sc = interpolate(s, [0, 1], [3, 1]);
          return (
            <span key={w.t} style={{ fontSize: 80, fontWeight: 900, color: w.c, transform: `scale(${sc})`, display: "inline-block", textShadow: `0 0 40px ${w.c}90` }}>
              {w.t}
            </span>
          );
        })}
      </div>

      {strobeOp > 0 && <div style={{ position: "absolute", inset: 0, backgroundColor: "#fff", opacity: strobeOp, zIndex: 50 }} />}
    </div>
  );
};

// Scene 2: "STOP TRADING BLIND" + Product Name Reveal (2.5-5s, 75f)
export const S02: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = interpolate(f, [0, 75], [1.15, 1.0], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const tagSpring = spring({ frame: f, fps, config: { damping: 10, mass: 0.4 } });
  const nameSpring = spring({ frame: f - 18, fps, config: { damping: 12, mass: 0.5 } });
  const subSpring = spring({ frame: f - 35, fps, config: { damping: 11, mass: 0.4 } });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'FiraCode Nerd Font', monospace", transform: `scale(${zoom})`, textAlign: "center" }}>
      <div style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b", letterSpacing: 6, opacity: tagSpring, transform: `translateY(${(1 - tagSpring) * 30}px)` }}>
        STOP TRADING BLIND.
      </div>
      {f >= 18 && (
        <div style={{ fontSize: 96, fontWeight: 900, color: "#fff", letterSpacing: 14, marginTop: 8, opacity: nameSpring, transform: `scale(${interpolate(nameSpring, [0, 1], [0.6, 1])})`, textShadow: "0 0 60px rgba(0,229,255,0.7)" }}>
          REPLAYFX
        </div>
      )}
      {f >= 35 && (
        <div style={{ fontSize: 16, color: "#00e5ff", letterSpacing: 4, marginTop: 12, opacity: subSpring, transform: `translateY(${(1 - subSpring) * 20}px)` }}>
          THE FORENSIC TRADING SYSTEM
        </div>
      )}
    </div>
  );
};

// Scene 3: Three Value Pillars pop in (5-7.5s, 75f)
export const S03: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = interpolate(f, [0, 75], [0.95, 1.08]);

  const pillars = [
    { icon: "🔬", title: "TICK FORENSICS", sub: "Sub-ms replay precision", d: 0, col: "#00e5ff" },
    { icon: "📊", title: "QUANT ENGINE", sub: "Monte Carlo risk analysis", d: 12, col: "#10b981" },
    { icon: "🤖", title: "AUTO DISPATCH", sub: "WhatsApp + Telegram alerts", d: 24, col: "#f59e0b" },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 28, fontFamily: "'FiraCode Nerd Font', monospace", transform: `scale(${zoom})`, padding: "0 60px" }}>
      {pillars.map((p) => {
        if (f < p.d) return null;
        const s = spring({ frame: f - p.d, fps, config: { damping: 10, mass: 0.4 } });
        const floatY = Math.sin((f - p.d) * 0.12) * 5;
        return (
          <div key={p.title} style={{ flex: 1, padding: "32px 24px", backgroundColor: "rgba(15,23,42,0.7)", backdropFilter: "blur(16px)", borderRadius: 16, border: `1px solid ${p.col}40`, boxShadow: `0 0 30px ${p.col}25`, textAlign: "center", transform: `scale(${s}) translateY(${floatY}px)` }}>
            <div style={{ fontSize: 36 }}>{p.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: p.col, letterSpacing: 2, marginTop: 12 }}>{p.title}</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>{p.sub}</div>
          </div>
        );
      })}
    </div>
  );
};

// Scene 4: Animated Candlestick Chart Building (7.5-10s, 75f)
export const S04: React.FC = () => {
  const f = useCurrentFrame();
  useVideoConfig(); // keep consistent
  const zoom = interpolate(f, [0, 75], [1.0, 1.12], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const rot = interpolate(f, [0, 75], [-1, 1.5]);

  const candles = [
    { x: 80, o: 320, c: 340, h: 300, l: 360, bull: false },
    { x: 160, o: 340, c: 360, h: 330, l: 380, bull: false },
    { x: 240, o: 360, c: 390, h: 350, l: 400, bull: false },
    { x: 320, o: 390, c: 350, h: 340, l: 400, bull: true },
    { x: 400, o: 350, c: 300, h: 290, l: 360, bull: true },
    { x: 480, o: 300, c: 240, h: 230, l: 310, bull: true },
    { x: 560, o: 240, c: 180, h: 165, l: 250, bull: true },
    { x: 640, o: 180, c: 130, h: 115, l: 190, bull: true },
  ];
  const vis = Math.min(candles.length, Math.floor(interpolate(f, [5, 65], [1, candles.length], { extrapolateRight: "clamp" })));

  const price = interpolate(f, [0, 75], [2641.5, 2659.8]).toFixed(2);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: "'FiraCode Nerd Font', monospace", transform: `scale(${zoom}) rotate(${rot}deg)`, padding: "50px 70px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#00e5ff", letterSpacing: 3 }}>TICK-BY-TICK REPLAY</span>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", marginTop: 4 }}>XAU/USD <span style={{ color: "#10b981" }}>${price}</span></div>
        </div>
        <div style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #00e5ff", backgroundColor: "rgba(0,229,255,0.08)" }}>
          <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700 }}>LATENCY</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: "#00e5ff" }}>0.82ms</div>
        </div>
      </div>

      <div style={{ width: "100%", height: 420, backgroundColor: "rgba(10,15,25,0.6)", backdropFilter: "blur(16px)", borderRadius: 16, border: "1px solid rgba(0,229,255,0.15)", position: "relative", overflow: "hidden" }}>
        <svg style={{ width: "100%", height: "100%" }}>
          <rect x="0" y="370" width="100%" height="35" fill="rgba(239,68,68,0.06)" />
          <line x1="0" y1="385" x2="100%" y2="385" stroke="#ef444480" strokeWidth="1" strokeDasharray="4 4" />
          <text x="15" y="380" fill="#ef4444" fontSize="10" fontWeight="700">LIQUIDITY SWEEP ZONE</text>
          {candles.slice(0, vis).map((c, i) => {
            const col = c.bull ? "#10b981" : "#ef4444";
            const top = Math.min(c.o, c.c);
            const h = Math.abs(c.c - c.o);
            return (
              <g key={i}>
                <line x1={c.x} y1={c.h} x2={c.x} y2={c.l} stroke={col} strokeWidth="2" />
                <rect x={c.x - 14} y={top} width="28" height={Math.max(4, h)} rx="2" fill={col} style={{ filter: `drop-shadow(0 0 6px ${col}80)` }} />
              </g>
            );
          })}
          {vis >= 2 && (
            <>
              <line x1="0" y1={candles[vis - 1].c} x2="100%" y2={candles[vis - 1].c} stroke="#00e5ff" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx={candles[vis - 1].x} cy={candles[vis - 1].c} r="6" fill="#fff" stroke="#00e5ff" strokeWidth="3" style={{ filter: "drop-shadow(0 0 8px #00e5ff)" }} />
            </>
          )}
        </svg>
      </div>
    </div>
  );
};

// Scene 5: TP Hit! +$1,450 Profit Flash (10-12s, 60f)
export const S05: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 8, mass: 0.3, stiffness: 250 } });
  const sc = interpolate(s, [0, 1], [4, 1]);
  const pulse = Math.sin(f * 0.3) * 12;
  const flash = f < 2 ? 0.8 : 0;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'FiraCode Nerd Font', monospace" }}>
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 55%)", filter: "blur(50px)" }} />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#10b981", letterSpacing: 4, opacity: s }}>TARGET PRICE REACHED</div>
      <div style={{ fontSize: 110, fontWeight: 900, color: "#10b981", transform: `scale(${sc})`, textShadow: `0 0 ${40 + pulse}px rgba(16,185,129,0.9)`, lineHeight: 1 }}>
        +$1,450
      </div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "#f8fafc", marginTop: 10, opacity: s }}>
        +4.8R CAPTURED — POSITION CLOSED
      </div>
      {flash > 0 && <div style={{ position: "absolute", inset: 0, backgroundColor: "#10b981", opacity: flash, zIndex: 50 }} />}
    </div>
  );
};

// Scene 6: MFE vs MAE Split Screen (12-14.5s, 75f)
export const S06: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sL = spring({ frame: f, fps, config: { damping: 10, mass: 0.45 } });
  const sR = spring({ frame: f - 10, fps, config: { damping: 10, mass: 0.45 } });
  const sBadge = spring({ frame: f - 30, fps, config: { damping: 9, mass: 0.35 } });
  const tilt = interpolate(f, [0, 75], [-3, 4]);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", fontFamily: "'FiraCode Nerd Font', monospace", perspective: 900, overflow: "hidden" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${sL}) rotateY(${tilt}deg)`, backgroundColor: "rgba(16,185,129,0.04)" }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#10b981", letterSpacing: 3 }}>MFE — MAX FAVORABLE</div>
        <div style={{ fontSize: 100, fontWeight: 900, color: "#10b981", textShadow: "0 0 40px rgba(16,185,129,0.8)", lineHeight: 1, marginTop: 8 }}>+4.8R</div>
      </div>
      <div style={{ width: 2, backgroundColor: "#00e5ff40", boxShadow: "0 0 20px #00e5ff" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${sR}) rotateY(${tilt}deg)`, backgroundColor: "rgba(239,68,68,0.04)" }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#ef4444", letterSpacing: 3 }}>MAE — MAX ADVERSE</div>
        <div style={{ fontSize: 100, fontWeight: 900, color: "#fca5a5", textShadow: "0 0 40px rgba(239,68,68,0.8)", lineHeight: 1, marginTop: 8 }}>-0.3R</div>
      </div>
      {f >= 30 && (
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) scale(${sBadge})`, padding: "20px 40px", backgroundColor: "#070a0f", borderRadius: 20, border: "2px solid #00e5ff", boxShadow: "0 0 40px rgba(0,229,255,0.5)", textAlign: "center", zIndex: 20 }}>
          <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 800, letterSpacing: 2 }}>EXIT EFFICIENCY</div>
          <div style={{ fontSize: 56, fontWeight: 900, color: "#00e5ff", lineHeight: 1 }}>93.4%</div>
        </div>
      )}
    </div>
  );
};

// Scene 7: Monte Carlo 10K Sim (14.5-17s, 75f)
export const S07: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, 75], [0.96, 1.1]);
  const shake = f >= 40 && f < 55 ? Math.sin((f - 40) * 2) * 3 : 0;
  const prog = interpolate(f, [5, 65], [0, 1], { extrapolateRight: "clamp" });
  const counterVal = Math.floor(interpolate(f, [5, 55], [0, 10000], { extrapolateRight: "clamp" }));

  const paths = [
    [300, 280, 250, 200, 170, 120, 70],
    [300, 290, 260, 230, 200, 160, 110],
    [300, 310, 280, 260, 220, 180, 140],
    [300, 275, 230, 180, 140, 100, 50],
    [300, 295, 300, 270, 230, 190, 130],
    [300, 260, 220, 170, 130, 90, 40],
    [300, 305, 270, 240, 200, 170, 130],
    [300, 320, 300, 280, 250, 220, 190],
  ];

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: "'FiraCode Nerd Font', monospace", transform: `scale(${zoom}) translate(${shake}px, ${shake * 0.7}px)`, padding: "50px 70px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#10b981", letterSpacing: 3 }}>MONTE CARLO SIMULATION</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: "#fff", marginTop: 4 }}>{counterVal.toLocaleString()} <span style={{ fontSize: 18, color: "#64748b" }}>ITERATIONS</span></div>
        </div>
        <div style={{ padding: "10px 18px", borderRadius: 10, border: "1px solid #10b981", backgroundColor: "rgba(16,185,129,0.08)" }}>
          <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700 }}>RISK OF RUIN</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#10b981" }}>0.08%</div>
        </div>
      </div>
      <div style={{ width: "100%", height: 380, backgroundColor: "rgba(10,15,25,0.6)", backdropFilter: "blur(16px)", borderRadius: 16, border: "1px solid rgba(16,185,129,0.2)", overflow: "hidden" }}>
        <svg style={{ width: "100%", height: "100%" }}>
          {paths.map((path, idx) => {
            const maxI = Math.floor(prog * (path.length - 1));
            const pts = path.slice(0, maxI + 1).map((y, i) => `${40 + i * 85},${y}`).join(" ");
            return <polyline key={idx} fill="none" stroke={idx === 3 ? "#00e5ff" : "#10b981"} strokeWidth={idx === 3 ? 3 : 1.5} opacity={0.35 + (idx % 3) * 0.2} points={pts} />;
          })}
        </svg>
      </div>
    </div>
  );
};

// Scene 8: Prop Firm Stamps (17-19s, 60f)
export const S08: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const firms = [
    { name: "FTMO", rule: "5% DAILY LOSS LIMIT", d: 0 },
    { name: "FUNDEDNEXT", rule: "10% MAX DRAWDOWN", d: 12 },
    { name: "MFF", rule: "+10% PROFIT TARGET", d: 24 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'FiraCode Nerd Font', monospace", gap: 18 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#f59e0b", letterSpacing: 4, marginBottom: 10 }}>PROP FIRM COMPLIANCE SHIELD</div>
      {firms.map((firm) => {
        if (f < firm.d) return null;
        const s = spring({ frame: f - firm.d, fps, config: { damping: 8, mass: 0.35, stiffness: 200 } });
        const shk = f >= firm.d && f < firm.d + 6 ? Math.sin((f - firm.d) * 3) * 4 : 0;
        return (
          <div key={firm.name} style={{ transform: `scale(${s}) translateX(${shk}px)`, padding: "18px 36px", backgroundColor: "rgba(15,23,42,0.8)", backdropFilter: "blur(16px)", borderRadius: 14, border: "1px solid rgba(16,185,129,0.3)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", display: "flex", justifyContent: "space-between", alignItems: "center", width: 520, gap: 20 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#f8fafc" }}>{firm.name}</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{firm.rule}</div>
            </div>
            <div style={{ padding: "6px 16px", borderRadius: 20, backgroundColor: "rgba(16,185,129,0.2)", border: "1px solid #10b981", boxShadow: "0 0 15px rgba(16,185,129,0.4)" }}>
              <span style={{ fontSize: 13, fontWeight: 900, color: "#10b981" }}>✓ PASSED</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Scene 9: WhatsApp Push Notification (19-21s, 60f)
export const S09: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleS = spring({ frame: f, fps, config: { damping: 11 } });
  const cardS = spring({ frame: f - 15, fps, config: { damping: 9, mass: 0.4 } });
  const floatY = Math.sin(f * 0.1) * 5;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'FiraCode Nerd Font', monospace" }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#00e5ff", letterSpacing: 4, opacity: titleS, marginBottom: 8 }}>HEADLESS DISPATCH MESH</div>
      <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", opacity: titleS, transform: `translateY(${(1 - titleS) * 20}px)` }}>
        TRADE WITHOUT <span style={{ color: "#00e5ff" }}>A DESK</span>.
      </div>

      {f >= 15 && (
        <div style={{ marginTop: 30, transform: `scale(${cardS}) translateY(${floatY}px)`, width: 560, padding: "18px 24px", backgroundColor: "rgba(15,23,42,0.85)", backdropFilter: "blur(24px)", borderRadius: 18, border: "2px solid #10b981", boxShadow: "0 0 40px rgba(16,185,129,0.35), 0 25px 60px rgba(0,0,0,0.7)", display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: "0 0 18px #10b981" }}>💬</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#10b981" }}>REPLAYFX WHATSAPP</span>
              <span style={{ fontSize: 10, color: "#64748b" }}>NOW</span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 900, color: "#f8fafc", marginTop: 3 }}>★ XAU/USD TARGET: +$1,450.00</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>+4.8R | 93.4% Efficiency | EA Locked.</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Scene 10: Equity Curve Rocket (21-24s, 90f)
export const S10: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = interpolate(f, [0, 90], [0.98, 1.15], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const bal = Math.floor(interpolate(f, [0, 75], [10000, 16420], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }));
  const curveProg = interpolate(f, [0, 70], [0, 1], { extrapolateRight: "clamp" });

  const tags = ["NO FOMO", "NO REVENGE", "PURE SYSTEM"];

  const pts = [[0, 330], [55, 310], [120, 260], [190, 280], [260, 210], [330, 160], [400, 180], [470, 85], [520, 20]];
  const maxI = Math.floor(curveProg * (pts.length - 1));
  const active = pts.slice(0, maxI + 1);
  const str = active.map(p => p.join(",")).join(" ");

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "'FiraCode Nerd Font', monospace", transform: `scale(${zoom})`, padding: "0 80px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 480 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#10b981", letterSpacing: 3 }}>THE COMPOUNDING RESULT</div>
        <div style={{ fontSize: 72, fontWeight: 900, color: "#fff", lineHeight: 1, margin: "6px 0" }}>${bal.toLocaleString()}</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: "#10b981", textShadow: "0 0 25px rgba(16,185,129,0.7)" }}>+64.2% NET PROFIT</div>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          {tags.map((t, i) => {
            const ts = spring({ frame: f - i * 10, fps, config: { damping: 9, mass: 0.35 } });
            return <span key={t} style={{ transform: `scale(${ts})`, padding: "7px 14px", borderRadius: 6, backgroundColor: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", fontSize: 11, fontWeight: 900, color: "#10b981" }}>{t}</span>;
          })}
        </div>
      </div>

      <div style={{ width: 520, height: 360 }}>
        <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
          <defs>
            <linearGradient id="cg" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#00e5ff" />
            </linearGradient>
          </defs>
          {active.length >= 2 && (
            <>
              <polyline fill="none" stroke="url(#cg)" strokeWidth="6" points={str} style={{ filter: "drop-shadow(0 0 20px #10b981)" }} />
              <circle cx={active[active.length - 1][0]} cy={active[active.length - 1][1]} r="10" fill="#fff" stroke="#00e5ff" strokeWidth="3" style={{ filter: "drop-shadow(0 0 20px #00e5ff)" }} />
            </>
          )}
        </svg>
      </div>
    </div>
  );
};

// Scene 11: Tech Stack Flyover (24-26s, 60f)
export const S11: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stack = [
    { t: "TRADINGVIEW WEBHOOKS", d: 0 },
    { t: "MT5 REPORT PARSER", d: 8 },
    { t: "DUKASCOPY PARQUET", d: 16 },
    { t: "MONTE CARLO ENGINE", d: 24 },
    { t: "WHATSAPP BAILEYS", d: 32 },
    { t: "TELEGRAM KILLSWITCH", d: 40 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'FiraCode Nerd Font', monospace", gap: 10 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#64748b", letterSpacing: 3, marginBottom: 12 }}>POWERED BY</div>
      {stack.map((s) => {
        if (f < s.d) return null;
        const sp = spring({ frame: f - s.d, fps, config: { damping: 10, mass: 0.3 } });
        return (
          <div key={s.t} style={{ opacity: sp, transform: `translateX(${(1 - sp) * 80}px)`, padding: "10px 28px", borderRadius: 8, backgroundColor: "rgba(15,23,42,0.6)", border: "1px solid rgba(0,229,255,0.15)", fontSize: 15, fontWeight: 800, color: "#e2e8f0", letterSpacing: 2 }}>
            {s.t}
          </div>
        );
      })}
    </div>
  );
};

// Scene 12: Grand Finale Logo + CTA (26-30s, 120f)
export const S12: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame: f, fps, config: { damping: 12, mass: 0.6 } });
  const tagS = spring({ frame: f - 20, fps, config: { damping: 11, mass: 0.5 } });
  const ctaS = spring({ frame: f - 40, fps, config: { damping: 10, mass: 0.4 } });
  const creditS = spring({ frame: f - 55, fps, config: { damping: 11, mass: 0.4 } });
  const pulse = Math.sin(f * 0.2) * 14;
  const fadeOut = interpolate(f, [100, 120], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'FiraCode Nerd Font', monospace", textAlign: "center", opacity: fadeOut }}>
      {/* Expanding rings */}
      {[1, 2, 3].map((r) => {
        const sz = ((f * 5 + r * 120) % 600) + 80;
        return <div key={r} style={{ position: "absolute", width: sz, height: sz, borderRadius: "50%", border: "1px solid #00e5ff", opacity: Math.max(0, 1 - sz / 700) * 0.3 }} />;
      })}

      <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#00e5ff", boxShadow: `0 0 ${35 + pulse}px #00e5ff`, marginBottom: 20, transform: `scale(${logoS})` }} />
      <div style={{ fontSize: 92, fontWeight: 900, color: "#fff", letterSpacing: 16, textShadow: "0 0 50px rgba(0,229,255,0.8)", transform: `scale(${logoS})`, marginLeft: 16 }}>
        REPLAYFX
      </div>
      {f >= 20 && (
        <div style={{ fontSize: 20, fontWeight: 800, color: "#00e5ff", letterSpacing: 5, marginTop: 12, opacity: tagS, transform: `translateY(${(1 - tagS) * 15}px)` }}>
          THE FORENSIC TRADING SYSTEM
        </div>
      )}
      {f >= 40 && (
        <>
          <div style={{ width: 460, height: 1, backgroundColor: "rgba(56,189,248,0.25)", margin: "24px 0", opacity: ctaS }} />
          <div style={{ fontSize: 20, fontWeight: 900, color: "#f59e0b", letterSpacing: 3, opacity: ctaS, transform: `translateY(${(1 - ctaS) * 10}px)` }}>
            MASTER THE ARCHITECTURE. DOMINATE THE MARKETS.
          </div>
        </>
      )}
      {f >= 55 && (
        <div style={{ marginTop: 30, fontSize: 12, color: "#64748b", letterSpacing: 2, opacity: creditS }}>
          ENGINEERED BY <strong style={{ color: "#38bdf8" }}>KAARLYZ</strong> // 2026
        </div>
      )}
    </div>
  );
};
