import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-muted/40">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
          alt="Delicious food spread"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Craving something <span className="text-primary">delicious?</span> <br />
            We&apos;ll deliver.
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Discover the best meals and top-rated restaurants around you. Fast delivery, fresh food, directly to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild className="text-lg px-8">
              <Link href="/meals">Order Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent text-white hover:bg-white/20 hover:text-white border-white">
              <Link href="/providers">Explore Restaurants</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
