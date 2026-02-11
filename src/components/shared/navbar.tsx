"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  isLoggedIn?: boolean;
  cartItemCount?: number;
}

export default function Navbar({
  isLoggedIn = false,
  cartItemCount = 0,
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/icon.png"
            alt="Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="hidden font-bold sm:inline-block text-xl">
            FoodExpress
          </span>
        </Link>

        {/* Navigation Links - Middle */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/meals">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Meals
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/restaurants">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Restaurants
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth & Cart - Right */}
        <div className="flex items-center gap-2">
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
            <Button asChild>
              <Link href="/login">
                <User className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
