import SectionHeader from "@/shared/ui/SectionHeader";

function LevelBadge({ level }) {
  const classNameByLevel = {
    잘함: "bg-white text-black",
    보통: "border border-zinc-700 bg-zinc-800 text-zinc-300",
    시작: "border border-zinc-800 bg-transparent text-zinc-500",
  };

  const className = classNameByLevel[level] ?? "border border-zinc-800 bg-transparent text-zinc-500";

  return (
    <span
      className={`shrink-0 rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wider font-mono ${className}`}
    >
      {level}
    </span>
  );
}

export default function LanguageSection({ languages }) {
  return (
    <section id="language" className="space-y-10 border-t border-zinc-900 pt-8">
      <SectionHeader title="Language" description="Communication readiness for global collaboration." />

      <div className="border-t border-zinc-800">
        {languages.map((item) => (
          <div
            key={item.language}
            className="-mx-4 flex flex-col items-start gap-4 rounded-xl border-b border-zinc-800/50 px-4 py-6 transition-colors hover:bg-zinc-900/20 md:flex-row md:items-center md:gap-12 md:py-8"
          >
            <div className="flex w-full items-center gap-3 md:w-1/3">
              <LevelBadge level={item.level} />
              <h4 className="font-bold text-white">{item.language}</h4>
            </div>
            <div className="w-full md:w-2/3">
              <p className="text-sm leading-relaxed text-zinc-400 font-mono">{item.level}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
