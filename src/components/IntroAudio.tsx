import { useEffect, useRef } from 'react';
import p5 from 'p5';

const IntroAudio = ({ audioUrl }: { audioUrl: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!audioUrl) return;

    const Sketch = (p: any) => {
      let audio: HTMLAudioElement;

      p.preload = () => {
        // p5.sound needs a separate import or global inclusion, 
        // for now we'll use base HTML5 audio with p5 visual feedback
      };

      p.setup = () => {
        p.createCanvas(100, 100).parent(containerRef.current);
        audio = new Audio(audioUrl);
        
        // Auto-play requirement
        audio.play().catch(() => console.log("Auto-play blocked, interaction needed"));
      };

      p.draw = () => {
        p.clear();
        p.noFill();
        p.stroke(45, 90, 39); // agriculture-green
        p.strokeWeight(3);
        
        // Simple "sound ripple" animation
        if (!audio.paused) {
          let radius = p.map(p.sin(p.frameCount * 0.1), -1, 1, 20, 40);
          p.circle(p.width/2, p.height/2, radius);
          p.circle(p.width/2, p.height/2, radius + 10);
        } else {
          p.circle(p.width/2, p.height/2, 30);
        }
      };
    };

    const myP5 = new p5(Sketch);
    return () => myP5.remove();
  }, [audioUrl]);

  return (
    <div className="flex items-center gap-4 p-4 bg-agriculture-cream/20 rounded-2xl border border-agriculture-green/10">
      <div ref={containerRef} className="w-12 h-12" />
      <div>
        <h4 className="font-bold text-agriculture-green">Intro Narration</h4>
        <p className="text-xs text-agriculture-brown">Listen to the lesson overview</p>
      </div>
    </div>
  );
};

export default IntroAudio;
