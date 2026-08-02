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
  if (step === "opening" && audioRef.current && audioRef.current.paused) {
    audioRef.current.volume = 0.1;
    audioRef.current.play().catch(() => {});
  }
  setStep(next);
  localStorage.setItem("meyshaStep", next);
};

  // restore saved playback position on load, and keep saving it while playing
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const restorePosition = () => {
    const savedTime = localStorage.getItem("weddingAudioTime");
    if (savedTime) {
      audio.currentTime = parseFloat(savedTime);
    }
  };

  if (audio.readyState >= 1) {
    // metadata already loaded
    restorePosition();
  } else {
    audio.addEventListener("loadedmetadata", restorePosition);
  }

  const interval = setInterval(() => {
    if (!audio.paused) {
      localStorage.setItem("weddingAudioTime", audio.currentTime.toString());
    }
  }, 2000);

  return () => {
    audio.removeEventListener("loadedmetadata", restorePosition);
    clearInterval(interval);
  };
}, []);


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