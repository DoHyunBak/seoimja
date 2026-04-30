import { useState, useEffect, useRef } from "react";
import CatPortfolioPage from "@/pages/cat-portfolio/ui/CatPortfolioPage";
import BackToTopButton from "@/shared/ui/BackToTopButton";

function CursorFurParticles() {
  const canvasRef = useRef(null);
  const trailRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseMove = (e) => {
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const trailDuration = 300; // 잔상이 유지되는 시간 (ms)

      // 오래된 좌표 제거
      trailRef.current = trailRef.current.filter(
        (t) => now - t.time < trailDuration
      );

      // 잔상 그리기
      trailRef.current.forEach((t, index) => {
        const progress = (now - t.time) / trailDuration;
        const opacity = 1 - progress;
        const size = 8 - progress * 4;

        ctx.fillStyle = `rgba(200, 180, 160, ${opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ top: 0, left: 0 }}
    />
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900">
      <CursorFurParticles />
      <CatPortfolioPage />
      <BackToTopButton />
    </div>
  );
}
