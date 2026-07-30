import { useState, useRef, useEffect } from "react";
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
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const goTo = (next: Step) => {
    setStep(next);
    localStorage.setItem("meyshaStep", next);
  };

  useEffect(() => {
    if (step !== "opening" && audioRef.current && audioRef.current.paused) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(() => {
        // autoplay blocked — mute button still lets her start it manually
      });
    }
  }, [step]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  };

  return (
    <main className="app">
      <audio ref={audioRef} src="/wedding.mp3" loop />

      <RibbonBorder />
      <FloatingDecor />

      {step !== "opening" && <Progress step={step} steps={steps} />}

      <button className="soundToggle" onClick={toggleMute}>
        {muted ? "🔇" : "🔊"}
      </button>

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