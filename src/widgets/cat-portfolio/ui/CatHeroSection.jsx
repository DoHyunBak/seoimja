import { motion, useReducedMotion } from "framer-motion";
import { CakeSlice, Coffee, Heart, Sparkles } from "lucide-react";

const summaryIcons = {
  age: CakeSlice,
  personality: Heart,
  snack: Coffee,
  mood: Sparkles,
};

export default function CatHeroSection({ profile }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1180px] items-stretch gap-8 px-5 pb-12 pt-10 sm:px-8 lg:grid-cols-[0.92fr_0.88fr] lg:px-10 lg:pb-16 lg:pt-14">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="cat-card relative z-10 rounded-[28px] p-6 sm:p-8 lg:p-10"
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/45 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#8b735d] shadow-sm backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          Cat Portfolio
        </div>
        <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight text-[#2f2924] sm:text-6xl lg:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-[#5f554c] sm:text-2xl">
          {profile.tagline}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#6b6b6b] sm:text-lg">{profile.intro}</p>

        <div className="mt-7 flex flex-wrap gap-2.5">
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/70 bg-white/45 px-3.5 py-2 text-sm font-bold text-[#6f6258] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/80 hover:text-[#2f2924]"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: reduceMotion ? 0 : 0.08 }}
        className="relative"
      >
        <div className="absolute -inset-4 rounded-[2.2rem] bg-[#bda895]/24 blur-3xl" aria-hidden="true" />
        <div className="cat-photo-card relative h-full overflow-hidden rounded-[28px] p-3">
          <img
            src={profile.heroImage}
            alt={profile.heroImageAlt}
            className="h-full w-full rounded-[20px] object-cover"
            loading="eager"
          />
        </div>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-3">
        {profile.summaryCards.map((item, index) => {
          const Icon = summaryIcons[item.id] ?? Sparkles;

          return (
            <motion.article
              key={item.id}
              className="cat-card rounded-[28px] p-5"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: reduceMotion ? 0 : index * 0.04 }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/45 text-[#8b735d]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-bold text-[#7a6f66]">{item.label}</p>
              <p className="mt-1 text-2xl font-black text-[#2f2924]">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-[#6b6b6b]">{item.note}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
