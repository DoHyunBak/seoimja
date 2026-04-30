import { useState } from "react";
import MotionSection from "./MotionSection";

const CX = 300;
const CY = 300;
const R_OUT = 248;
const R_IN  = 74;
const R_TEXT = 170;
const R_LABEL = 265;

const SLICES = [
  {
    start: 1,   end: 8.5,
    label: "집사 옆에서\n자기",
    color: "#C4C8DC",
    title: "집사 옆에서 자기",
    time: "01:00 – 08:30",
    description: "결국엔 침대 위로 올라와요. 발 위에 올라타면 화장실도 못 가요.",
  },
  {
    start: 8.5, end: 10,
    label: "깨우기\n아침밥",
    color: "#EACF6C",
    title: "집사 깨우기 & 아침밥",
    time: "08:30 – 10:00",
    description: "침대 주변을 한 바퀴 돌다가 얼굴 위에 올라앉아요. 밥 시간은 절대 안 놓쳐요.",
  },
  {
    start: 10,  end: 13,
    label: "창밖 구경",
    color: "#B4CEBC",
    title: "창밖 구경",
    time: "10:00 – 13:00",
    description: "새, 햇빛, 지나가는 사람 다 구경해요. 비둘기 보면 입이 짹짹 거려요.",
  },
  {
    start: 13,  end: 20,
    label: "낮잠",
    color: "#E2C0B8",
    title: "낮잠",
    time: "13:00 – 20:00",
    description: "거실이랑 방을 오가며 가장 따뜻한 자리를 찾아요. 그게 다 낮잠 자리예요.",
  },
  {
    start: 20,  end: 22,
    label: "우다다",
    color: "#D89050",
    title: "우다다 타임",
    time: "20:00 – 22:00",
    description: "아무것도 없는데 갑자기 전력 질주해요. 멈추면 아무 일도 없었던 표정이에요.",
  },
  {
    start: 22,  end: 25,
    label: "인간의\n샤워구경",
    color: "#B4BCDC",
    title: "인간의 샤워 구경",
    time: "22:00 – 01:00",
    description: "문 앞에서 물소리 들으면서 대기해요. 문 열리면 빠르게 확인하고 나가요.",
  },
];

function toRad(deg) { return (deg * Math.PI) / 180; }
function hToClockDeg(h) { return ((h % 24) / 24) * 360; }
function pt(clockDeg, r) {
  const rad = toRad(clockDeg - 90);
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}
function f(n) { return n.toFixed(2); }

function arcPath(startH, endH, rOut = R_OUT) {
  const spanDeg = ((endH - startH) / 24) * 360;
  const large = spanDeg > 180 ? 1 : 0;
  const s  = pt(hToClockDeg(startH), rOut);
  const e  = pt(hToClockDeg(endH),   rOut);
  const si = pt(hToClockDeg(startH), R_IN);
  const ei = pt(hToClockDeg(endH),   R_IN);
  return [
    `M ${f(si.x)} ${f(si.y)}`,
    `L ${f(s.x)} ${f(s.y)}`,
    `A ${rOut} ${rOut} 0 ${large} 1 ${f(e.x)} ${f(e.y)}`,
    `L ${f(ei.x)} ${f(ei.y)}`,
    `A ${R_IN} ${R_IN} 0 ${large} 0 ${f(si.x)} ${f(si.y)}`,
    "Z",
  ].join(" ");
}

export default function DailyRoutineSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeIdx,  setActiveIdx]  = useState(null);

  const activeSl = activeIdx !== null ? SLICES[activeIdx] : null;

  return (
    <MotionSection
      id="cat-routine"
      kicker="Daily Routine"
      title="하루 루틴"
      description="매일 비슷하지만 본인은 나름 바빠요."
      className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 lg:px-10"
    >
      <div className="cat-card rounded-[28px] p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col items-center gap-8 xl:flex-row xl:items-center xl:gap-10">

          {/* 차트 */}
          <div className="flex w-full justify-center xl:flex-1">
            <svg
              viewBox="0 0 600 600"
              className="w-full max-w-[520px] xl:max-w-full"
              aria-label="임자의 하루 루틴 시계"
              style={{ overflow: "visible" }}
            >
              <defs>
                <radialGradient id="rg-center" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="#faf7f2" />
                  <stop offset="100%" stopColor="#ede8e0" />
                </radialGradient>
              </defs>

              {/* 슬라이스 */}
              {SLICES.map((sl, i) => {
                const isHovered = hoveredIdx === i;
                const isActive  = activeIdx  === i;
                const lifted    = isHovered || isActive;

                const midH   = (sl.start + sl.end) / 2;
                const midDeg = hToClockDeg(midH);
                const tp     = pt(midDeg, R_TEXT);
                const isLeft = midDeg > 180 && midDeg <= 360;
                const textRot = isLeft ? midDeg + 90 : midDeg - 90;
                const lines   = sl.label.split("\n");
                const LINE_H  = 17;
                const isNarrow = sl.end - sl.start < 2;

                return (
                  <g
                    key={i}
                    style={{
                      cursor: "pointer",
                      transform: lifted
                        ? `translate(${CX}px,${CY}px) scale(1.055) translate(${-CX}px,${-CY}px)`
                        : "none",
                      transition: "transform 200ms cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={() => setActiveIdx(i === activeIdx ? null : i)}
                  >
                    <path
                      d={arcPath(sl.start, sl.end)}
                      fill={sl.color}
                      stroke={isActive ? "#8b735d" : "#faf7f2"}
                      strokeWidth={isActive ? "2" : "3.5"}
                      style={{
                        filter: lifted ? "drop-shadow(0 4px 12px rgba(47,41,36,0.22))" : "none",
                      }}
                    />
                    {!isNarrow && (
                      <g transform={`rotate(${f(textRot)}, ${f(tp.x)}, ${f(tp.y)})`}>
                        {lines.map((line, li) => (
                          <text
                            key={li}
                            x={f(tp.x)}
                            y={f(tp.y + (li - (lines.length - 1) / 2) * LINE_H)}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="13"
                            fontWeight="800"
                            fill="#2f2924"
                          >
                            {line}
                          </text>
                        ))}
                      </g>
                    )}
                  </g>
                );
              })}

              {/* 외곽 테두리 */}
              <circle cx={CX} cy={CY} r={R_OUT} fill="none" stroke="#faf7f2" strokeWidth="4" />

              {/* 눈금 */}
              {Array.from({ length: 24 }, (_, h) => {
                const deg = hToClockDeg(h);
                const big = h % 6 === 0;
                const o   = pt(deg, R_OUT);
                const inn = pt(deg, R_OUT - (big ? 18 : 8));
                return (
                  <line key={h}
                    x1={f(inn.x)} y1={f(inn.y)}
                    x2={f(o.x)}   y2={f(o.y)}
                    stroke={big ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)"}
                    strokeWidth={big ? 2.5 : 1.2}
                  />
                );
              })}

              {/* 6시간 레이블 */}
              {[0, 6, 12, 18].map((h) => {
                const p = pt(hToClockDeg(h), R_LABEL);
                return (
                  <text key={h}
                    x={f(p.x)} y={f(p.y)}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="13" fontWeight="700" fill="#8b735d"
                  >
                    {h === 0 ? "00" : h}
                  </text>
                );
              })}

              {/* 중앙 — 선택 시 해당 슬라이스 정보 표시 */}
              <circle cx={CX} cy={CY} r={R_IN} fill="url(#rg-center)" stroke="#e4dcd4" strokeWidth="2" />
              {activeSl ? (
                <>
                  <text x={CX} y={CY - 16}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="9" fontWeight="700" fill="#8b735d"
                    letterSpacing="0.06em"
                  >
                    {activeSl.time.split(" – ")[0]}
                  </text>
                  <text x={CX} y={CY - 4}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="9" fontWeight="700" fill="#8b735d"
                    letterSpacing="0.06em"
                  >
                    ↓
                  </text>
                  <text x={CX} y={CY + 8}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="9" fontWeight="700" fill="#8b735d"
                    letterSpacing="0.06em"
                  >
                    {activeSl.time.split(" – ")[1]}
                  </text>
                </>
              ) : (
                <>
                  <text x={CX} y={CY - 12} textAnchor="middle" dominantBaseline="middle" fontSize="28">🐾</text>
                  <text x={CX} y={CY + 18}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="11" fontWeight="800" fill="#8b735d"
                  >
                    임자
                  </text>
                </>
              )}
            </svg>
          </div>

          {/* 범례 + 상세 */}
          <div className="w-full xl:w-72 xl:shrink-0">
            <div className="space-y-2">
              {SLICES.map((sl, i) => {
                const isActive = activeIdx === i;
                return (
                  <button
                    key={sl.label}
                    onClick={() => setActiveIdx(i === activeIdx ? null : i)}
                    className={`flex w-full items-center gap-3.5 rounded-2xl px-4 py-3 text-left transition duration-150 ${
                      isActive
                        ? "bg-white/80 shadow-sm ring-1 ring-[#bda895]/50"
                        : "bg-white/45 hover:bg-white/70"
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full shadow-sm"
                      style={{ background: sl.color }}
                    />
                    <span className="flex-1 text-sm font-black text-[#2f2924]">
                      {sl.label.replace("\n", " ")}
                    </span>
                    <span className="shrink-0 font-mono text-xs font-semibold text-[#8b735d]">
                      {sl.time.replace(" – ", "–")}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 상세 설명 */}
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: activeSl ? "120px" : "0px", marginTop: activeSl ? "12px" : "0px" }}
            >
              {activeSl && (
                <div className="rounded-2xl border border-[#e4dcd4] bg-white/60 px-4 py-3.5">
                  <p className="text-sm font-black text-[#2f2924]">{activeSl.title}</p>
                  <p className="mt-1.5 text-sm leading-6 text-[#6b6b6b]">{activeSl.description}</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </MotionSection>
  );
}
