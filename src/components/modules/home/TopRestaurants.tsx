import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProviderService } from "@/services/provider.service";

export default async function TopRestaurants() {
  const response = await ProviderService.getProviders();
  const providers = response?.data?.data || [];
  
  // We only show top 5 for the homepage
  const topProviders = providers.slice(0, 5);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Top Restaurants</h2>
          <p className="text-muted-foreground mt-2">Discover the best places to eat around you.</p>
        </div>
        <Button variant="ghost" asChild className="hidden sm:flex group">
          <Link href="/providers">
            Show More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {topProviders.map((provider: any) => (
          <Card key={provider.id} className="overflow-hidden hover:shadow-lg transition-shadow border-muted flex flex-col">
            <div className="relative h-48 w-full">
              <Image
                src={provider.image || "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop"}
                alt={provider.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-sm font-medium">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                {provider.rating?.toFixed(1) || "5.0"}
              </div>
            </div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg line-clamp-1">{provider.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {provider.description || "No description available."}
              </p>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs font-normal">
                  {provider.location}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/providers/${provider.id}`}>View Menu</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        {topProviders.length === 0 && (
          <div className="col-span-full py-10 text-center text-muted-foreground">
            No providers available yet.
          </div>
        )}
      </div>
      
      <div className="mt-8 sm:hidden">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/providers">Show More Restaurants</Link>
        </Button>
      </div>
    </section>
  );
}
