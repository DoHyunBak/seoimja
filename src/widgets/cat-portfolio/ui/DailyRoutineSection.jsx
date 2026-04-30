import MotionSection from "./MotionSection";

const CX = 320;
const CY = 320;
const R_OUT = 222;
const R_IN = 54;
const R_TEXT = 148;

const SLICES = [
  { start: 1,   end: 8.5, label: "집사 옆에서\n자기",    color: "#8AAED4" },
  { start: 8.5, end: 10,  label: "깨우기\n아침밥",       color: "#FFD07B" },
  { start: 10,  end: 13,  label: "창밖 구경",            color: "#98D0E0" },
  { start: 13,  end: 20,  label: "낮잠",                 color: "#D4AACF" },
  { start: 20,  end: 22,  label: "우다다",               color: "#F5A050" },
  { start: 22,  end: 25,  label: "인간의\n샤워구경",     color: "#9CB6E0" },
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

export default function DailyRoutineSection({ routine }) {
  return (
    <MotionSection
      id="cat-routine"
      kicker="Daily Routine"
      title="하루 루틴"
      description="매일 비슷하지만 본인은 나름 바빠요."
      className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 lg:px-10"
    >
      <div className="flex justify-center">
        <svg viewBox="0 0 640 640" className="w-full max-w-[500px]" aria-label="임자의 하루 루틴 시계">

          {/* 꽃잎 장식 */}
          {Array.from({ length: 32 }, (_, i) => {
            const deg = (i / 32) * 360;
            const p = pt(deg, 248);
            return (
              <ellipse
                key={i}
                cx={f(p.x)} cy={f(p.y)}
                rx="11" ry="18"
                fill="#FAD87A"
                opacity="0.88"
                transform={`rotate(${deg}, ${f(p.x)}, ${f(p.y)})`}
              />
            );
          })}

          {/* 슬라이스 */}
          {SLICES.map((sl, i) => {
            const midH      = (sl.start + sl.end) / 2;
            const midDeg    = hToClockDeg(midH);
            const tp        = pt(midDeg, R_TEXT);
            const isLeftHalf = midDeg > 180 && midDeg <= 360;
            const textRot   = isLeftHalf ? midDeg + 90 : midDeg - 90;
            const lines     = sl.label.split("\n");
            const LINE_H    = 15;
            const isNarrow  = sl.end - sl.start < 2;

            return (
              <g key={i}>
                <path
                  d={arcPath(sl.start, sl.end)}
                  fill={sl.color}
                  stroke="#fff"
                  strokeWidth="2.5"
                />
                <g transform={`rotate(${f(textRot)}, ${f(tp.x)}, ${f(tp.y)})`}>
                  {lines.map((line, li) => (
                    <text
                      key={li}
                      x={f(tp.x)}
                      y={f(tp.y + (li - (lines.length - 1) / 2) * LINE_H)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={isNarrow ? "10" : "13"}
                      fontWeight="800"
                      fill="#3a2a20"
                    >
                      {line}
                    </text>
                  ))}
                </g>
              </g>
            );
          })}

          {/* 외곽 흰 테두리 */}
          <circle cx={CX} cy={CY} r={R_OUT} fill="none" stroke="#fff" strokeWidth="3" />

          {/* 시간 눈금 */}
          {Array.from({ length: 24 }, (_, h) => {
            const deg  = hToClockDeg(h);
            const big  = h % 6 === 0;
            const o    = pt(deg, R_OUT);
            const inn  = pt(deg, R_OUT - (big ? 14 : 7));
            return (
              <line key={h}
                x1={f(inn.x)} y1={f(inn.y)}
                x2={f(o.x)}   y2={f(o.y)}
                stroke={big ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)"}
                strokeWidth={big ? 2.5 : 1}
              />
            );
          })}

          {/* 시간 숫자 (3시간 간격) */}
          {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => {
            const p = pt(hToClockDeg(h), 238);
            return (
              <text key={h}
                x={f(p.x)} y={f(p.y)}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="9" fontWeight="700"
                fill="rgba(255,255,255,0.9)"
              >
                {h === 0 ? "00" : h}
              </text>
            );
          })}

          {/* 중앙 원 */}
          <circle cx={CX} cy={CY} r={R_IN} fill="#faf7f2" stroke="#e8ddd5" strokeWidth="2" />
          <text x={CX} y={CY - 10} textAnchor="middle" dominantBaseline="middle" fontSize="22">🐾</text>
          <text
            x={CX} y={CY + 16}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="10" fontWeight="800" fill="#8b735d"
          >
            임자
          </text>
        </svg>
      </div>
    </MotionSection>
  );
}
