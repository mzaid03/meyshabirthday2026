import { useState } from "react";
import {
  Opening,
  GiftRoom,
  FlowerGarden,
  StarSky,
  MusicBox,
  VideoDoor,
  FinalMessage,
  GoodnightMochi,
  RibbonBorder,
  FloatingDecor,
  Progress,
} from "./components";
import type { Step } from "./types";

const steps: Step[] = [
  "opening",
  "giftRoom",
  "flowerGarden",
  "starSky",
  "musicBox",
  "videoDoor",
  "final",
  "goodnight",
];

export default function App() {
  const [step, setStep] = useState<Step>(
    (localStorage.getItem("meyshaStep") as Step) || "opening"
  );

  const goTo = (next: Step) => {
    setStep(next);
    localStorage.setItem("meyshaStep", next);
  };

  return (
    <main className="app">
      <RibbonBorder />
      <FloatingDecor />

      {step !== "opening" && <Progress step={step} steps={steps} />}

      {step === "opening" && <Opening onNext={() => goTo("giftRoom")} />}
      {step === "giftRoom" && <GiftRoom onNext={() => goTo("flowerGarden")} />}
      {step === "flowerGarden" && <FlowerGarden onNext={() => goTo("starSky")} />}
      {step === "starSky" && <StarSky onNext={() => goTo("musicBox")} />}
      {step === "musicBox" && <MusicBox onNext={() => goTo("videoDoor")} />}
      {step === "videoDoor" && <VideoDoor onNext={() => goTo("final")} />}
      {step === "final" && <FinalMessage onNext={() => goTo("goodnight")} />}
      {step === "goodnight" && (
      <GoodnightMochi onReplay={() => goTo("opening")} />
)}

      <button
        className="reset"
        onClick={() => {
          localStorage.removeItem("meyshaStep");
          setStep("opening");
        }}
      >
        reset
      </button>
    </main>
  );
}