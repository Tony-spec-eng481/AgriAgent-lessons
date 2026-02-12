import p5 from "p5";
import { useEffect, useRef, useState } from "react";

import { Volume2, Headphones, Play, Pause } from "lucide-react";
import "../styles/Audio.css"; // Ensure the path matches your structure

interface IntroAudioProps {
  audioUrl: string;
}

const IntroAudio = ({ audioUrl }: IntroAudioProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);  
  const isPlayingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => console.log("User interaction required"));
    }
    setIsPlaying(!isPlaying);
    isPlayingRef.current = !isPlaying;
  };

  useEffect(() => {
    if (!audioUrl || !containerRef.current) return;

    let analyzer: AnalyserNode | null = null;
    let source: MediaElementAudioSourceNode | null = null;

    const Sketch = (p: any) => {
      p.setup = () => {
        p.createCanvas(60, 60).parent(containerRef.current);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        try {
          const AudioCtx =
            window.AudioContext || (window as any).webkitAudioContext;
          const audioContext = new AudioCtx();
          audioCtxRef.current = audioContext;

          analyzer = audioContext.createAnalyser();
          source = audioContext.createMediaElementSource(audio);
          source.connect(analyzer);
          analyzer.connect(audioContext.destination);
          analyzer.fftSize = 128;
        } catch (err) {
          console.log("Viz not supported", err);
        }

        audio.addEventListener("play", () => {
          setIsPlaying(true);
          isPlayingRef.current = true;
        });
        audio.addEventListener("pause", () => {
          setIsPlaying(false);
          isPlayingRef.current = false;
        });
        audio.addEventListener("ended", () => {
          setIsPlaying(false);
          isPlayingRef.current = false;
        });
      };

      p.draw = () => {
        p.clear();
        if (!analyzer) return;

        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyzer.getByteFrequencyData(dataArray);

        p.noStroke();
        p.fill(72, 187, 120); // Professional Green

        const barWidth = p.width / bufferLength;
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * p.height;
          p.rect(
            i * barWidth,
            p.height - barHeight,
            barWidth - 1,
            barHeight,
            2,
          );
        }
      };
    };

    const myP5 = new p5(Sketch);
    return () => {
      audioRef.current?.pause();
      myP5.remove();
    };
  }, [audioUrl]);

  return (
    <div
      className={`audio-card ${isPlaying ? "active" : ""}`}
      onClick={togglePlay}
    >
      <div className="visualizer-section">
        <div ref={containerRef} className="canvas-container" />
        <div className="overlay-icon">
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </div>
      </div>

      <div className="audio-info">
        <div className="header-row">
          <Headphones size={14} className="icon-green" />
          <span className="title">Intro Narration</span>
        </div>
        <p className="subtitle">
          {isPlaying ? "Now playing..." : "Click to listen"}
        </p>
      </div>

      <div className="status-badge">
        <Volume2 size={18} className={isPlaying ? "pulse" : ""} />
        <span className="label">{isPlaying ? "Live" : "Ready"}</span>
      </div>
    </div>
  );
};

export default IntroAudio;
