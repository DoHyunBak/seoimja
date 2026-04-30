import { Camera } from "lucide-react";
import MotionSection from "./MotionSection";

export default function GallerySection({ gallery }) {
  return (
    <MotionSection
      id="cat-gallery"
      kicker="Gallery"
      title="사진 아카이브"
      description="찍히기 싫다고 했지만 다 찍혔어요."
      className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 lg:px-10"
    >
      <div className="grid grid-flow-dense auto-rows-[220px] gap-4 sm:auto-rows-[240px] sm:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-4">
        {gallery.map((item) => (
          <figure
            key={item.id}
            tabIndex={0}
            className={`group relative overflow-hidden rounded-[28px] bg-[#e8e2da] shadow-[0_20px_50px_rgba(71,61,52,0.14)] outline-none ring-[#bda895]/45 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(71,61,52,0.18)] focus:ring-4 ${
              item.featured ? "sm:col-span-2 sm:row-span-2 lg:col-start-2 lg:col-span-2 lg:row-start-2 lg:row-span-2" : ""
            }`}
          >
            <img src={item.src} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211813]/80 via-[#211813]/16 to-transparent opacity-65 transition group-hover:opacity-90 group-focus:opacity-90" />
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-2xl bg-white/18 backdrop-blur">
                <Camera className="h-4 w-4" />
              </div>
              <p className="text-lg font-black">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-white/82">{item.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </MotionSection>
  );
}
