import {
  BadgeInfo,
  CakeSlice,
  Coffee,
  Globe2,
  Heart,
  Home,
  PawPrint,
  Sparkles,
  Stethoscope,
  UserRound,
} from "lucide-react";
import MotionSection, { MotionCard } from "./MotionSection";

const detailIcons = {
  paw: PawPrint,
  cake: CakeSlice,
  badge: BadgeInfo,
  user: UserRound,
  sparkles: Sparkles,
  heart: Heart,
  coffee: Coffee,
  home: Home,
  stethoscope: Stethoscope,
  globe: Globe2,
};

export default function ProfileSection({ profile }) {
  return (
    <MotionSection
      id="cat-profile"
      kicker="Profile"
      title={`${profile.name} 기본 정보`}
      description="임자의 공식 기본 정보예요."
      className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 lg:px-10"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profile.details.map((item, index) => {
          const Icon = detailIcons[item.icon] ?? PawPrint;

          return (
            <MotionCard key={item.id} className="cat-card rounded-[28px] p-5" delay={index * 0.025}>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/45 text-[#8b735d]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#7a6f66]">{item.label}</p>
                  <p className="mt-1 text-lg font-black leading-6 text-[#2f2924]">{item.value}</p>
                </div>
              </div>
            </MotionCard>
          );
        })}
      </div>
    </MotionSection>
  );
}
