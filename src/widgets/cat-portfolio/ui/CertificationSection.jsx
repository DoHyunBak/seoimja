import { ShieldCheck } from "lucide-react";
import MotionSection, { MotionCard } from "./MotionSection";

export default function CertificationSection({ certifications }) {
  return (
    <MotionSection
      id="cat-certifications"
      kicker="Certifications"
      title="자격 및 건강 이력"
      description="취업 준비 중인 고양이의 공식 건강 기록이에요. 집사가 챙겨줬지만 본인도 인정해요."
      className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 lg:px-10"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {certifications.map((cert, index) => (
          <MotionCard key={cert.id} className="cat-card rounded-[28px] p-6" delay={index * 0.05}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/45 text-[#8b735d]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black text-[#2f2924]">{cert.name}</h3>
            </div>

            <div className="mb-5 space-y-2">
              {cert.records.map((rec) => (
                <div key={rec.round} className="flex items-center justify-between rounded-2xl bg-white/50 px-4 py-2.5">
                  <span className="text-sm font-bold text-[#8b735d]">{rec.round}</span>
                  <span className="font-mono text-sm font-black text-[#2f2924]">{rec.date}</span>
                </div>
              ))}
            </div>

            <p className="border-t border-[#e8e2da] pt-4 text-sm leading-6 text-[#6b6b6b] before:mr-1 before:content-['🐾']">
              {cert.catComment}
            </p>
          </MotionCard>
        ))}
      </div>
    </MotionSection>
  );
}
