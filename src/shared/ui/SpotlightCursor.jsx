import { useEffect, useRef, useState } from "react";

// Subtle cursor-following spotlight that sits behind content
export default function SpotlightCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      // 마우스 위치에 바로 붙도록 지연 없이 즉시 업데이트
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      window.setTimeout(() => setIsClicking(false), 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const size = 220; // 조금 더 얇고 집중된 스팟
  const radius = size / 2;
  const { x, y } = position;

  const transform = `translate3d(${x - radius}px, ${y - radius}px, 0)`;

  const baseGradient =
    "radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.10) 40%, transparent 70%)";
  const activeGradient =
    "radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.18) 38%, transparent 70%)";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 mix-blend-screen">
      <div
        className="absolute h-[220px] w-[220px] rounded-full opacity-80 blur-2xl will-change-transform"
        style={{
          transform,
          backgroundImage: isClicking ? activeGradient : baseGradient,
        }}
      />
    </div>
  );
}
