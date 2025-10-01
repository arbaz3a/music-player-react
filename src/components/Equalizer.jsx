import React, { useEffect, useRef, useContext } from "react";
import { ContextFunction } from "../context/context";

// Globals survive route changes
let audioContext = null;
let analyser = null;
let sourceNode = null;

export default function Equalizer() {
  const { songref, isplaying } = useContext(ContextFunction);
  const barsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!songref.current) return;

    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (!analyser) {
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 128;
    }
    if (!sourceNode) {
      try {
        sourceNode = audioContext.createMediaElementSource(songref.current);
        sourceNode.connect(analyser);
        analyser.connect(audioContext.destination);
      } catch (err) {
        console.warn("MediaElementSource already exists, reusing.");
      }
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);

      barsRef.current.forEach((bar, i) => {
        if (bar) {
          const h = dataArray[i] / 2;
          bar.style.height = `${h}px`;
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    if (isplaying) {
      audioContext.resume();
      draw();
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [songref, isplaying]);

  return (
    <div className="w-full sm:w-[60%] md:w-[65%] gap-[2px] sm:gap-[2px] lg:gap-[3px] flex items-end justify-center py-2 h-[15vh] sm:h-[20vh] md:h-[22vh]">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          className="w-[1px] sm:w-[2px] md:w-[3px] bg-green-500 rounded-sm transition-[height] duration-100 ease-linear"
          style={{
            height: "2px",
            maxHeight: "100%",
          }}
        />
      ))}
    </div>
  );
}
