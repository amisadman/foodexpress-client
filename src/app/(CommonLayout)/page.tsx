import HeroSection from "@/components/modules/home/HeroSection";
import TopRestaurants from "@/components/modules/home/TopRestaurants";
import TopMeals from "@/components/modules/home/TopMeals";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <div className="flex-1 w-full flex flex-col items-center">
        <TopRestaurants />
        <TopMeals />
      </div>
    </div>
  );
}
