"use client";

import { useEffect, useRef, useState } from "react";

export default function CurtainIntroOverlay() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  const dismiss = () => {
    setFading(true);
    setTimeout(() => setVisible(false), 500);
  };

  useEffect(() => {
    // Only show curtain intro ONCE per browser session
    const hasShown = sessionStorage.getItem("sega_curtain_shown");
    if (hasShown) {
      return;
    }
    sessionStorage.setItem("sega_curtain_shown", "true");
    setVisible(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let animFrameId: number;
    let playTimer: ReturnType<typeof setTimeout>;
    let cutTimer: ReturnType<typeof setTimeout>;
    let safetyTimer: ReturnType<typeof setTimeout>;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    // Explicitly set Safari attributes on the native video element
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      if (ctx && video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        const len = data.length;

        // Smooth Green Screen Keying
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (g > r + 5 && g > b + 5) {
            const greenDominance = g - Math.max(r, b);
            if (greenDominance > 30) {
              data[i + 3] = 0;
            } else {
              const alpha = Math.max(0, 255 - (greenDominance / 30) * 255);
              data[i + 3] = alpha;
              data[i + 1] = Math.max(r, b);
            }
          } else {
            data[i + 3] = 255;
          }
        }
        ctx.putImageData(frame, 0, 0);
      }

      if (!video.ended) {
        animFrameId = requestAnimationFrame(render);
      }
    };

    animFrameId = requestAnimationFrame(render);

    const startPlayback = () => {
      // Pause initially on 1st frame
      video.pause();
      
      playTimer = setTimeout(() => {
        video.playbackRate = 2.0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              video.playbackRate = 2.0;
            })
            .catch((err) => {
              console.warn("Autoplay blocked or failed on Safari:", err);
              dismiss();
            });
        }

        cutTimer = setTimeout(() => {
          dismiss();
        }, 1800);
      }, 500);
    };

    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener("loadeddata", startPlayback, { once: true });
    }

    const handleEnded = () => {
      dismiss();
    };

    video.addEventListener("ended", handleEnded);

    safetyTimer = setTimeout(() => {
      dismiss();
    }, 4500);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(playTimer);
      clearTimeout(cutTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener("resize", handleResize);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadeddata", startPlayback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        pointerEvents: fading ? "none" : "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.4s ease-out",
        cursor: "pointer",
      }}
    >
      {/* Off-screen video element (NOT display:none) so Safari WebKit decodes video frames to Canvas */}
      <video
        ref={videoRef}
        src="/assets/curtainopening3.mp4"
        autoPlay
        muted
        playsInline
        style={{
          position: "absolute",
          top: -9999,
          left: -9999,
          width: "1px",
          height: "1px",
          opacity: 0.001,
          pointerEvents: "none",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          transform: "scale(1.3)",
        }}
      />
    </div>
  );
}
