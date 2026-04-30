import { useEffect } from "react";
import { HeartHandshake, Images, PawPrint, ShieldCheck, Timer, UserRound } from "lucide-react";
import { catPortfolioData } from "@/entities/cat/model/catPortfolioData";
import CatFooter from "@/widgets/cat-portfolio/ui/CatFooter";
import CatHeroSection from "@/widgets/cat-portfolio/ui/CatHeroSection";
import CertificationSection from "@/widgets/cat-portfolio/ui/CertificationSection";
import DailyRoutineSection from "@/widgets/cat-portfolio/ui/DailyRoutineSection";
import GallerySection from "@/widgets/cat-portfolio/ui/GallerySection";
import MemoryTimelineSection from "@/widgets/cat-portfolio/ui/MemoryTimelineSection";
import PersonalityStatsSection from "@/widgets/cat-portfolio/ui/PersonalityStatsSection";
import ProfileSection from "@/widgets/cat-portfolio/ui/ProfileSection";

const navItems = [
  { id: "cat-profile", label: "Profile", icon: UserRound },
  { id: "cat-stats", label: "Stats", icon: PawPrint },
  { id: "cat-gallery", label: "Gallery", icon: Images },
  { id: "cat-routine", label: "Routine", icon: Timer },
  { id: "cat-certifications", label: "Certification", icon: ShieldCheck },
  { id: "cat-servant", label: "Servants", icon: HeartHandshake },
];

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
}

function CatNavigation() {
  return (
    <nav className="cat-ios-nav sticky top-0 z-50">
      <div className="mx-auto flex min-h-16 max-w-[1180px] flex-col justify-center gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={() => scrollToSection("cat-top")}
          className="cat-wordmark min-h-11 shrink-0 rounded-md text-left text-[1.38rem] leading-none outline-none focus-visible:ring-4 focus-visible:ring-[#bda895]/40"
          aria-label="Cat Portfolio 상단으로 이동"
        >
          IMJA
        </button>

        <div className="grid w-full max-w-[calc(100vw-40px)] grid-cols-6 gap-1.5 sm:flex sm:w-auto sm:max-w-none sm:flex-wrap sm:justify-end sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="cat-nav-link inline-flex items-center justify-center gap-1 rounded-md border border-transparent px-2.5 py-2 text-center text-xs font-semibold text-[#6b6b6b] outline-none transition hover:text-[#2f2924] focus-visible:ring-4 focus-visible:ring-[#bda895]/40 sm:px-3 sm:text-sm"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default function CatPortfolioPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${catPortfolioData.profile.name} | Cat Portfolio`;

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div id="cat-top" className="cat-portfolio-canvas min-h-screen overflow-hidden text-[#2f2924]">
      <CatNavigation />
      <main className="relative z-10">
        <CatHeroSection profile={catPortfolioData.profile} />
        <ProfileSection profile={catPortfolioData.profile} />
        <PersonalityStatsSection stats={catPortfolioData.stats} />
        <GallerySection gallery={catPortfolioData.gallery} />
        <DailyRoutineSection routine={catPortfolioData.routine} />
        <CertificationSection certifications={catPortfolioData.certifications} />
        <MemoryTimelineSection memories={catPortfolioData.memories} />
      </main>
      <CatFooter meta={catPortfolioData.meta} />
    </div>
  );
}
