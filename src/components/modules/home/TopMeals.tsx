import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock Data
const meals = [
  {
    id: "1",
    name: "Classic Cheeseburger",
    price: "$12.99",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1999&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Spicy Tuna Roll",
    price: "$14.50",
    tag: "Spicy",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1927&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Margherita Pizza",
    price: "$16.00",
    tag: "Vegetarian",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Chicken Tikka Masala",
    price: "$18.50",
    tag: "Chef's Special",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1971&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Avocado Toast",
    price: "$9.99",
    tag: "Healthy",
    image: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function TopMeals() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-muted/20 rounded-3xl mb-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Top Meals</h2>
          <p className="text-muted-foreground mt-2">Delicious meals highly rated by our customers.</p>
        </div>
        <Button variant="ghost" asChild className="hidden sm:flex group">
          <Link href="/meals">
            Show More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {meals.map((meal) => (
          <Card key={meal.id} className="overflow-hidden hover:shadow-lg transition-shadow border-muted">
            <div className="relative h-48 w-full">
              <Image
                src={meal.image}
                alt={meal.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2">
                <Badge variant={meal.tag === "Vegetarian" || meal.tag === "Healthy" ? "secondary" : "default"} className="font-medium">
                  {meal.tag}
                </Badge>
              </div>
            </div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg line-clamp-1">{meal.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-lg font-bold text-primary">{meal.price}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 sm:hidden">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/meals">Show More Meals</Link>
        </Button>
      </div>
    </section>
  );
}
