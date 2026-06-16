import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock Data
const restaurants = [
  {
    id: "1",
    name: "Burger Joint",
    cuisine: "American",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Sushi Master",
    cuisine: "Japanese",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Pasta Palace",
    cuisine: "Italian",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2132&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1980&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Green Bowl",
    cuisine: "Healthy",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function TopRestaurants() {
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
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow border-muted">
            <div className="relative h-48 w-full">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-sm font-medium">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                {restaurant.rating}
              </div>
            </div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg">{restaurant.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Badge variant="secondary" className="text-xs font-normal">
                {restaurant.cuisine}
              </Badge>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/providers/${restaurant.id}`}>View Menu</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 sm:hidden">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/providers">Show More Restaurants</Link>
        </Button>
      </div>
    </section>
  );
}
