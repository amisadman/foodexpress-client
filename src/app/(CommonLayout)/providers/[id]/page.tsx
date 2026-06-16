import { ProviderService } from "@/services/provider.service";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProviderDetailsPage({ params }: { params: { id: string } }) {
  const response = await ProviderService.getProviderWithId(params.id);
  const provider = response?.data;

  if (!provider) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      {/* Provider Hero */}
      <div className="relative h-[300px] md:h-[400px] w-full">
        <Image
          src={provider.image || "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop"}
          alt={provider.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
                {provider.name}
              </h1>
              <div className="flex items-center gap-4 text-gray-200">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-bold text-lg">{provider.rating?.toFixed(1) || "5.0"}</span>
                  <span className="text-sm opacity-80">(100+ ratings)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm">{provider.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* About Section */}
        <div className="bg-background rounded-xl p-6 shadow-sm border border-muted mb-8">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-muted-foreground leading-relaxed">
            {provider.description || "This restaurant has not provided a description yet. They are known for serving delicious meals in the local area."}
          </p>
        </div>

        {/* Menu Section (Placeholder for meals) */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-6">Menu</h2>
          <div className="text-center py-20 bg-background rounded-xl border border-muted border-dashed">
            <h3 className="text-xl font-medium text-muted-foreground mb-2">No meals listed yet</h3>
            <p className="text-muted-foreground/80">Check back later to see what {provider.name} has to offer.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
