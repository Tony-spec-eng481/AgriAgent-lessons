import p5 from "p5";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Loader2, CloudRain } from "lucide-react";
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
  const rainSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // THE FIX: We need a ref to bridge the React state into the p5 draw loop
  const playingRef = useRef(false); 

  useEffect(() => {
    //  Forces the local file to play !
    const actualVideoUrl = "/farm_lesson.mp4"; 
    
    if (!containerRef.current) return;

    setIsLoading(true);
    
    const audio = new Audio("/rain.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    rainSoundRef.current = audio;

    let myP5: p5;

    const Sketch = (p: any) => {
      let sunX = 50;
      let plantHeight = 0;
      
      p.setup = () => {
        const containerWidth = containerRef.current?.offsetWidth || 640;
        const aspect = 16 / 9;
        const containerHeight = containerWidth / aspect;
        
        p.createCanvas(containerWidth, containerHeight).parent(containerRef.current);

        const v = p.createVideo(actualVideoUrl, () => {
          setIsLoading(false);
          setDuration(v.duration());
          console.log("Video loaded:", actualVideoUrl);
        });

        v.hide(); 
        videoRef.current = v;
      };

      p.draw = () => {
        // 1. Draw Sky Background (Back Layer)
        p.background(135, 206, 235);

        // 2. Draw & Animate Sun (Middle Layer)
        p.fill(255, 204, 0);
        p.noStroke();
        p.ellipse(sunX, 60, 60, 60);
        
        // 3. Draw Video Frame (Front Layer - Scaled down so we can see the animations!)
        if (videoRef.current) {
          const vW = p.width * 0.7; // Video takes up 70% of the screen
          const vH = p.height * 0.7;
          const vX = (p.width - vW) / 2; // Center it horizontally
          const vY = (p.height - vH) / 2 - 10; // Center it vertically
          
          p.image(videoRef.current, vX, vY, vW, vH);
          
          const curr = videoRef.current.time();
          const dur = videoRef.current.duration();
          if (dur > 0) {
            setProgress((curr / dur) * 100);
            setCurrentTime(curr);
          }
        }

        // 4. Draw Ground
        p.fill(92, 64, 51); 
        p.rect(0, p.height - 40, p.width, 40);

        // THE FIX: Use playingRef.current here instead of isPlaying
        if (playingRef.current) {
           sunX += 0.5; 
           if (sunX > p.width + 50) sunX = -50;
           
           if (plantHeight < 100) plantHeight += 0.2; 
        }

        // 5. Draw Growing Plant
        p.fill(34, 139, 34);
        p.rect(40, p.height - 40 - plantHeight, 15, plantHeight);
        if (plantHeight > 30) {
            p.ellipse(40 + 15, p.height - 40 - plantHeight + 10, 20, 10);
        }
      };

      p.windowResized = () => {
        const containerWidth = containerRef.current?.offsetWidth || 640;
        const aspect = 16 / 9;
        const containerHeight = containerWidth / aspect;
        p.resizeCanvas(containerWidth, containerHeight);
      };
    };

    myP5 = new p5(Sketch);

    return () => {
      if (videoRef.current) {
        videoRef.current.stop();
        videoRef.current.remove();
      }
      if (rainSoundRef.current) {
        rainSoundRef.current.pause();
        rainSoundRef.current = null;
      }
      myP5.remove();
    };
  }, [videoUrl]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      rainSoundRef.current?.pause();
      playingRef.current = false; // THE FIX: Sync the ref with React state
    } else {
      videoRef.current.play();
      rainSoundRef.current?.play();
      playingRef.current = true; // THE FIX: Sync the ref with React state
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
    <div className="video-player-container relative rounded-xl overflow-hidden shadow-2xl bg-black" onClick={() => togglePlay()}>
      <div ref={containerRef} className="w-full h-full"></div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
          <Loader2 className="animate-spin text-white" size={48} />
        </div>
      )}

      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors z-10">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full ring-2 ring-white/50 shadow-lg">
             <Play size={40} fill="white" className="text-white ml-1" />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 z-20 transition-opacity duration-300" onClick={(e) => e.stopPropagation()}>
        <div 
          className="relative h-2 bg-gray-600 rounded-full cursor-pointer group mb-4" 
          ref={progressRef}
          onClick={handleSeek}
        >
          <div className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-100" style={{ width: `${progress}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform shadow-md"></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button className="hover:text-green-400 transition-colors" onClick={togglePlay}>
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>
            
            <div className="text-sm font-medium font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-green-300 font-medium bg-green-900/30 px-3 py-1 rounded-full border border-green-500/30">
             <CloudRain size={14} />
             <span>Ambience Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default P5VideoPlayer;