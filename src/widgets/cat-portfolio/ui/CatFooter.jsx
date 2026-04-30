export default function CatFooter({ meta }) {
  const servants = meta.servants ?? [];

  return (
    <footer id="cat-servant" className="mx-auto max-w-[1180px] scroll-mt-24 px-5 pb-10 pt-8 sm:px-8 lg:px-10">
      <div className="cat-card rounded-[28px] px-6 py-8 text-center">
        <p className="text-lg font-black text-[#2f2924]">{meta.ownerCredit}</p>

        {servants.length > 0 && (
          <div className="mx-auto mt-5 grid max-w-2xl gap-3 sm:grid-cols-2">
            {servants.map((servant) => (
              <a
                key={servant.id}
                href={servant.href}
                target="_blank"
                rel="noreferrer"
                className="cat-inner-panel rounded-2xl px-4 py-4 text-center transition hover:-translate-y-0.5 hover:bg-white/70 focus:outline-none focus:ring-4 focus:ring-[#bda895]/45"
              >
                <span className="block text-xs font-black uppercase tracking-[0.16em] text-[#9b8878]">
                  {servant.role}
                </span>
                <span className="mt-1 block text-lg font-black text-[#2f2924]">{servant.label}</span>
              </a>
            ))}
          </div>
        )}

        <p className="mt-2 text-sm text-[#6b6b6b]">{meta.dedication}</p>
      </div>
    </footer>
  );
}
