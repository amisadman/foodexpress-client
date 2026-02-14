"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  User,
  LayoutDashboard,
  MoreVertical,
  Hamburger,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Permanent_Marker } from "next/font/google";
import { useState } from "react";
import { UserService } from "@/services/user.service";

interface NavbarProps {
  isLoggedIn?: boolean;
  cartItemCount?: number;
}

const font = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar({
  isLoggedIn = false,
  cartItemCount = 0,
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container mx-auto">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/navLogo.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span
              className={` ${font.className} font-bold sm:inline-block text-xl`}
            >
              FoodExpress
            </span>
          </Link>

          {/* Navigation Links - Middle (Desktop) */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link href="/meals">Meals</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link href="/restaurants">Restaurants</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth & Cart - Right (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {/* Cart Button */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Login/Dashboard Button */}
            {isLoggedIn ? (
              <Button asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button asChild>
                <Link href="/login">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/register">
                  <User className="mr-2 h-4 w-4" />
                  Register
                </Link>
              </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu - Three Dots */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Menu className="h-5 w-5"></Menu>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className={font.className}>Menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-8">
                {/* Navigation Links */}
                <div className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-lg font-medium hover:bg-accent transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/meals"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-lg font-medium hover:bg-accent transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Meals
                  </Link>
                  <Link
                    href="/restaurants"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-lg font-medium hover:bg-accent transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Restaurants
                  </Link>
                </div>

                <Separator />

                {/* Cart Button */}
                <Button
                  variant="outline"
                  className="w-full justify-start text-lg h-12"
                  asChild
                >
                  <Link href="/cart" onClick={() => setOpen(false)}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Cart
                    {cartItemCount > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Link>
                </Button>

                {/* Login/Dashboard Button */}
                {isLoggedIn ? (
                  <Button className="w-full text-lg h-12" asChild>
                    <Link href="/dashboard" onClick={() => setOpen(false)}>
                      <LayoutDashboard className="mr-2 h-5 w-5" />
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button className="w-full text-lg h-12" asChild>
                      <Link href="/login" onClick={() => setOpen(false)}>
                        <User className="mr-2 h-5 w-5" />
                        Login
                      </Link>
                    </Button>
                    <Button className="w-full text-lg h-12" asChild>
                      <Link href="/register" onClick={() => setOpen(false)}>
                        <User className="mr-2 h-5 w-5" />
                        Register
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
