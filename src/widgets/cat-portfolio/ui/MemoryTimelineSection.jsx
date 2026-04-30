import { CalendarDays } from "lucide-react";
import MotionSection from "./MotionSection";

export default function MemoryTimelineSection({ memories }) {
  return (
    <MotionSection
      id="cat-memories"
      kicker="Memory Timeline"
      title="함께한 시간"
      description="처음 온 날부터 지금까지."
      className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:px-10"
    >
      <div className="relative">
        <div className="absolute left-5 top-0 h-full w-px bg-[#d8d2ca] sm:left-1/2" aria-hidden="true" />
        <div className="space-y-5">
          {memories.map((memory, index) => (
            <article
              key={`${memory.date}-${memory.title}`}
              className={`relative grid gap-4 sm:grid-cols-[1fr_44px_1fr] ${
                index % 2 === 0 ? "" : "sm:[&>.memory-card]:col-start-3"
              }`}
            >
              <div
              className={`memory-card cat-card ml-14 rounded-[28px] p-5 sm:ml-0 ${
                  index % 2 === 0 ? "sm:col-start-1" : "sm:col-start-3"
                }`}
              >
                <p className="text-sm font-black text-[#8b735d]">{memory.date}</p>
                <h3 className="mt-2 text-xl font-black text-[#2f2924]">{memory.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6b6b6b]">{memory.description}</p>
              </div>
              <div className="absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-[#FAF7F2] text-[#8b735d] shadow-sm sm:static sm:col-start-2">
                <CalendarDays className="h-5 w-5" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
