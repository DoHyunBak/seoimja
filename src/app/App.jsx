import CatPortfolioPage from "@/pages/cat-portfolio/ui/CatPortfolioPage";
import BackToTopButton from "@/shared/ui/BackToTopButton";

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900">
      <CatPortfolioPage />
      <BackToTopButton />
    </div>
  );
}
