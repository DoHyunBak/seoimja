import MotionSection from "./MotionSection";

const CX = 320;
const CY = 320;
const R_OUT = 235;
const R_IN = 70;
const R_TEXT = 162;
const R_LABEL_OUT = 252;

const SLICES = [
  { start: 1,   end: 8.5, label: "집사 옆에서\n자기",   color: "#B8C8DF", emoji: "🌙" },
  { start: 8.5, end: 10,  label: "깨우기\n아침밥",      color: "#EFC76A", emoji: "🍽️" },
  { start: 10,  end: 13,  label: "창밖 구경",           color: "#9ECFC2", emoji: "🪟" },
  { start: 13,  end: 20,  label: "낮잠",                color: "#C9B0C9", emoji: "😴" },
  { start: 20,  end: 22,  label: "우다다",              color: "#E8955E", emoji: "⚡" },
  { start: 22,  end: 25,  label: "인간의\n샤워구경",    color: "#8FAEC8", emoji: "🚿" },
];

function toRad(deg) {
  return (deg * Math.PI) / 180;
}
function hToClockDeg(h) {
  return ((h % 24) / 24) * 360;
}
function pt(clockDeg, r) {
  const rad = toRad(clockDeg - 90);
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}
function f(n) {
  return n.toFixed(2);
}
function arcPath(startH, endH) {
  const spanDeg = ((endH - startH) / 24) * 360;
  const large = spanDeg > 180 ? 1 : 0;
  const s  = pt(hToClockDeg(startH), R_OUT);
  const e  = pt(hToClockDeg(endH),   R_OUT);
  const si = pt(hToClockDeg(startH), R_IN);
  const ei = pt(hToClockDeg(endH),   R_IN);
  return [
    `M ${f(si.x)} ${f(si.y)}`,
    `L ${f(s.x)} ${f(s.y)}`,
    `A ${R_OUT} ${R_OUT} 0 ${large} 1 ${f(e.x)} ${f(e.y)}`,
    `L ${f(ei.x)} ${f(ei.y)}`,
    `A ${R_IN} ${R_IN} 0 ${large} 0 ${f(si.x)} ${f(si.y)}`,
    "Z",
  ].join(" ");
}

function formatTimeRange(startH, endH) {
  const fmt = (h) => {
    const actual = h % 24;
    return `${String(actual).padStart(2, "0")}:${actual === Math.floor(actual) ? "00" : "30"}`;
  };
  const fmtFull = (h) => {
    const actual = h % 24;
    const hh = Math.floor(actual);
    const mm = Math.round((actual - hh) * 60);
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  };
  return `${fmtFull(startH)} – ${fmtFull(endH)}`;
}

export default function DailyRoutineSection({ routine }) {
  return (
    <MotionSection
      id="cat-routine"
      kicker="Daily Routine"
      title="하루 루틴"
      description="매일 비슷하지만 본인은 나름 바빠요."
      className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 lg:px-10"
    >
      <div className="cat-card rounded-[28px] p-6 sm:p-8 lg:p-10">
        <div className="flex justify-center">
          <svg
            viewBox="0 0 640 640"
            className="w-full max-w-[580px]"
            aria-label="임자의 하루 루틴 시계"
          >
            <defs>
              <radialGradient id="center-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#faf7f2" />
                <stop offset="100%" stopColor="#f0ebe4" />
              </radialGradient>
            </defs>

            {/* 배경 링 */}
            <circle cx={CX} cy={CY} r={R_OUT + 18} fill="none" stroke="#e8ddd5" strokeWidth="1.5" strokeDasharray="4 6" />

            {/* 슬라이스 */}
            {SLICES.map((sl, i) => {
              const midH   = (sl.start + sl.end) / 2;
              const midDeg = hToClockDeg(midH);
              const tp     = pt(midDeg, R_TEXT);
              const isLeftHalf = midDeg > 180 && midDeg <= 360;
              const textRot = isLeftHalf ? midDeg + 90 : midDeg - 90;
              const lines  = sl.label.split("\n");
              const LINE_H = 18;
              const isNarrow = sl.end - sl.start < 2;

              return (
                <g key={i}>
                  <path
                    d={arcPath(sl.start, sl.end)}
                    fill={sl.color}
                    stroke="#faf7f2"
                    strokeWidth="3"
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
                          fontSize="14"
                          fontWeight="800"
                          fill="#2f2924"
                          opacity="0.85"
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
            <circle cx={CX} cy={CY} r={R_OUT} fill="none" stroke="#faf7f2" strokeWidth="3.5" />

            {/* 시간 눈금 */}
            {Array.from({ length: 24 }, (_, h) => {
              const deg = hToClockDeg(h);
              const big = h % 6 === 0;
              const o   = pt(deg, R_OUT);
              const inn = pt(deg, R_OUT - (big ? 16 : 7));
              return (
                <line
                  key={h}
                  x1={f(inn.x)} y1={f(inn.y)}
                  x2={f(o.x)}   y2={f(o.y)}
                  stroke={big ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)"}
                  strokeWidth={big ? 2.5 : 1.2}
                />
              );
            })}

            {/* 시간 숫자 (6시간 간격) */}
            {[0, 6, 12, 18].map((h) => {
              const p = pt(hToClockDeg(h), R_LABEL_OUT);
              return (
                <text
                  key={h}
                  x={f(p.x)} y={f(p.y)}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="13" fontWeight="700"
                  fill="#8b735d"
                >
                  {h === 0 ? "00" : h}
                </text>
              );
            })}

            {/* 중앙 원 */}
            <circle cx={CX} cy={CY} r={R_IN} fill="url(#center-grad)" stroke="#e8ddd5" strokeWidth="2" />
            <text x={CX} y={CY - 12} textAnchor="middle" dominantBaseline="middle" fontSize="26">🐾</text>
            <text
              x={CX} y={CY + 16}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontWeight="800" fill="#8b735d"
            >
              임자
            </text>
          </svg>
        </div>

        {/* 범례 */}
        <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {SLICES.map((sl) => (
            <div
              key={sl.label}
              className="flex items-center gap-3 rounded-2xl bg-white/50 px-4 py-3"
            >
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full"
                style={{ background: sl.color }}
              />
              <span className="flex-1 text-sm font-black text-[#2f2924]">
                {sl.label.replace("\n", " ")}
              </span>
              <span className="shrink-0 text-xs font-semibold text-[#8b735d]">
                {formatTimeRange(sl.start, sl.end)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
