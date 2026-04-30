import { useState } from "react";
import MotionSection from "./MotionSection";

const SLICES = [
  {
    label: "집사 옆에서 자기",
    title: "집사 옆에서 자기",
    time: "01:00 – 08:30",
    description: "결국엔 침대 위로 올라와요. 발 위에 올라타면 화장실도 못 가요.",
  },
  {
    label: "집사 깨우기 & 아침밥",
    title: "집사 깨우기 & 아침밥",
    time: "08:30 – 10:00",
    description: "침대 주변을 한 바퀴 돌다가 얼굴 위에 올라앉아요. 밥 시간은 절대 안 놓쳐요.",
  },
  {
    label: "창밖 구경",
    title: "창밖 구경",
    time: "10:00 – 13:00",
    description: "새, 햇빛, 지나가는 사람 다 구경해요. 비둘기 보면 입이 짹짹 거려요.",
  },
  {
    label: "낮잠",
    title: "낮잠",
    time: "13:00 – 20:00",
    description: "거실이랑 방을 오가며 가장 따뜻한 자리를 찾아요. 그게 다 낮잠 자리예요.",
  },
  {
    label: "우다다 타임",
    title: "우다다 타임",
    time: "20:00 – 22:00",
    description: "아무것도 없는데 갑자기 전력 질주해요. 멈추면 아무 일도 없었던 표정이에요.",
  },
  {
    label: "인간의 샤워 구경",
    title: "인간의 샤워 구경",
    time: "22:00 – 01:00",
    description: "문 앞에서 물소리 들으면서 대기해요. 문 열리면 빠르게 확인하고 나가요.",
  },
];

export default function DailyRoutineSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const hoveredSl = hoveredIdx !== null ? SLICES[hoveredIdx] : null;

  return (
    <MotionSection
      id="cat-routine"
      kicker="Daily Routine"
      title="하루 루틴"
      description="매일 비슷하지만 본인은 나름 바빠요."
      className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 lg:px-10"
    >
      <div className="cat-card rounded-[28px] p-6 sm:p-8 lg:p-10">
        {/* ── 일직선 루틴 카드들 ── */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {SLICES.map((sl, i) => (
            <button
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`group relative overflow-hidden rounded-2xl px-4 py-4 text-center transition-all duration-200 bg-white/45 ${
                hoveredIdx === i ? "shadow-lg -translate-y-1" : ""
              }`}
            >
              <div className="text-sm font-black leading-tight text-[#2f2924]">
                {sl.label}
              </div>
              <div className="mt-2 text-xs font-semibold text-[#8b735d]">
                {sl.time}
              </div>
            </button>
          ))}
        </div>

        {hoveredSl && (
          <div className="overflow-hidden rounded-2xl border border-[#e4dcd4] bg-white/60 px-4 py-3.5 transition-all duration-300">
            <p className="text-sm font-black text-[#2f2924]">{hoveredSl.title}</p>
            <p className="mt-1.5 text-sm leading-6 text-[#6b6b6b]">{hoveredSl.description}</p>
          </div>
        )}
      </div>
    </MotionSection>
  );
}
