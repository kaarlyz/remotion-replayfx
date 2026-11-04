import React from "react";
import { AbsoluteFill, Composition, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { blurSlide } from "@remotion/transitions/blur-slide";
import { zoomInOut } from "@remotion/transitions/zoom-in-out";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";

import { Bg } from "./v4/Bg";
import { S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12 } from "./v4/Scenes";

const T = 12; // transition duration in frames

const ReplayFXV4: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#040810" }}>
      <Bg />
      <Audio src={staticFile("hype_audio.wav")} />

      <TransitionSeries>
        {/* 1. Hook: "90% OF TRADERS BLOW UP" */}
        <TransitionSeries.Sequence durationInFrames={80}>
          <S01 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        {/* 2. Product Reveal: REPLAYFX */}
        <TransitionSeries.Sequence durationInFrames={85}>
          <S02 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />

        {/* 3. Three Value Pillars */}
        <TransitionSeries.Sequence durationInFrames={80}>
          <S03 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={blurSlide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />

        {/* 4. Live Candlestick Chart */}
        <TransitionSeries.Sequence durationInFrames={85}>
          <S04 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={zoomInOut({})} timing={linearTiming({ durationInFrames: T })} />

        {/* 5. TP Hit +$1,450 Flash */}
        <TransitionSeries.Sequence durationInFrames={70}>
          <S05 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={linearTiming({ durationInFrames: T })} />

        {/* 6. MFE vs MAE Split */}
        <TransitionSeries.Sequence durationInFrames={85}>
          <S06 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />

        {/* 7. Monte Carlo 10K */}
        <TransitionSeries.Sequence durationInFrames={85}>
          <S07 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={blurSlide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />

        {/* 8. Prop Firm Stamps */}
        <TransitionSeries.Sequence durationInFrames={70}>
          <S08 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-top" })} timing={linearTiming({ durationInFrames: T })} />

        {/* 9. WhatsApp Notification */}
        <TransitionSeries.Sequence durationInFrames={70}>
          <S09 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />

        {/* 10. Equity Curve Rocket */}
        <TransitionSeries.Sequence durationInFrames={100}>
          <S10 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={zoomInOut({})} timing={linearTiming({ durationInFrames: T })} />

        {/* 11. Tech Stack Flyover */}
        <TransitionSeries.Sequence durationInFrames={70}>
          <S11 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={blurSlide({ direction: "from-left" })} timing={linearTiming({ durationInFrames: T })} />

        {/* 12. Grand Finale */}
        <TransitionSeries.Sequence durationInFrames={152}>
          <S12 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

export const RemotionCompositions: React.FC = () => {
  return (
    <Composition
      id="ReplayFXV4"
      component={ReplayFXV4}
      durationInFrames={900}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
