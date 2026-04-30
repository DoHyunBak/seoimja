import { motion, useReducedMotion } from "framer-motion";
import { Activity } from "lucide-react";
import MotionSection from "./MotionSection";

export default function PersonalityStatsSection({ stats }) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionSection
      id="cat-stats"
      kicker="Personality Stats"
      title="성격 능력치"
      description="함께 살면서 직접 관찰한 수치예요. 과장 없어요."
      className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 lg:px-10"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {stats.map((stat, index) => (
          <article key={stat.id} className="cat-card rounded-[28px] p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/45 text-[#8b735d]">
                  <Activity className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-black text-[#2f2924]">{stat.label}</h3>
                  <p className="text-sm text-[#6b6b6b]">{stat.note}</p>
                </div>
              </div>
              <span className="rounded-full bg-[#2f2924] px-3 py-1 text-sm font-black text-white">
                {stat.score}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/55">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#8b735d] via-[#bda895] to-[#d8d2ca]"
                initial={reduceMotion ? false : { width: 0 }}
                whileInView={{ width: `${stat.score}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.75, ease: "easeOut", delay: reduceMotion ? 0 : index * 0.04 }}
              />
            </div>
          </article>
        ))}
      </div>
    </MotionSection>
  );
}
