import { ProviderService } from "@/services/provider.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function ProvidersPage() {
  const response = await ProviderService.getProviders();
  const providers = response?.data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">All Restaurants</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Browse our complete list of partner restaurants and food providers.
        </p>
      </div>

      {providers.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-xl">
          No providers found. Check back later!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {providers.map((provider: any) => (
            <Card key={provider.id} className="overflow-hidden hover:shadow-lg transition-shadow border-muted flex flex-col">
              <div className="relative h-56 w-full">
                <Image
                  src={provider.image || "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop"}
                  alt={provider.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-md flex items-center gap-1 text-sm font-medium">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  {provider.rating?.toFixed(1) || "5.0"}
                </div>
              </div>
              <CardHeader className="p-5 pb-3">
                <CardTitle className="text-xl line-clamp-1">{provider.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0 flex-1">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {provider.description || "No description provided."}
                </p>
                <div className="mt-3">
                  <Badge variant="secondary" className="font-medium">
                    {provider.location}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0 mt-auto">
                <Button className="w-full" size="lg" asChild>
                  <Link href={`/providers/${provider.id}`}>View Menu</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
