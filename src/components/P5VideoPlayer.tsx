import p5 from "p5";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Loader2 } from "lucide-react";
import "../styles/VideoPlayer.css";

interface P5VideoPlayerProps {
  videoUrl: string;
}

const P5VideoPlayer = ({ videoUrl }: P5VideoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (!videoUrl || !containerRef.current) return;

    setIsLoading(true);
    let myP5: p5;

    const Sketch = (p: any) => {
      p.setup = () => {
        const containerWidth = containerRef.current?.offsetWidth || 640;
        const aspect = 16 / 9;
        const containerHeight = containerWidth / aspect;
        
        p.createCanvas(containerWidth, containerHeight).parent(containerRef.current);

        // Create video using p5
        const v = p.createVideo(videoUrl, () => {
          setIsLoading(false);
          setDuration(v.duration());
          console.log("Video loaded:", videoUrl);
        });

        v.size(containerWidth, containerHeight);
        v.hide(); // Hide the default HTML video element
        videoRef.current = v;
      };

      p.draw = () => {
        p.background(0);

        if (videoRef.current) {
          p.image(videoRef.current, 0, 0, p.width, p.height);
          
          // Sync state back to React (throttle slightly if needed, but p5 draw is ~60fps)
          const curr = videoRef.current.time();
          const dur = videoRef.current.duration();
          if (dur > 0) {
            setProgress((curr / dur) * 100);
            setCurrentTime(curr);
          }
        }
      };

      p.windowResized = () => {
        const containerWidth = containerRef.current?.offsetWidth || 640;
        const aspect = 16 / 9;
        const containerHeight = containerWidth / aspect;
        p.resizeCanvas(containerWidth, containerHeight);
        if (videoRef.current) {
          videoRef.current.size(containerWidth, containerHeight);
        }
      };
    };

    myP5 = new p5(Sketch);

    return () => {
      if (videoRef.current) {
        videoRef.current.stop();
        videoRef.current.remove();
      }
      myP5.remove();
    };
  }, [videoUrl]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current || !progressRef.current || duration === 0) return;

    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickPercent = Math.max(0, Math.min(1, x / rect.width));
    const newTime = clickPercent * duration;
    
    videoRef.current.time(newTime);
    setProgress(clickPercent * 100);
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="video-player-container" onClick={() => togglePlay()}>
      <div ref={containerRef}></div>
      
      {isLoading && (
        <div className="loading-spinner">
          <Loader2 className="animate-spin" size={48} />
        </div>
      )}

      {!isPlaying && !isLoading && (
        <div className="video-overlay-play">
          <Play size={40} fill="currentColor" />
        </div>
      )}

      <div className="video-controls" onClick={(e) => e.stopPropagation()}>
        <div 
          className="progress-container" 
          ref={progressRef}
          onClick={handleSeek}
        >
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}>
            <div className="scrubber-handle"></div>
          </div>
        </div>

        <div className="controls-row">
          <button className="play-pause-btn" onClick={togglePlay}>
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          </button>
          
          <div className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default P5VideoPlayer;
