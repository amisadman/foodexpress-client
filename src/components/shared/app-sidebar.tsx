"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/shared/nav-main";
import { NavProjects } from "@/components/shared/nav-projects";
import { NavUser } from "@/components/shared/nav-user";
import { TeamSwitcher } from "@/components/shared/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const ADMIN_navMain = [
  {
    title: "Admin Dashboard",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "#",
      },
      {
        title: "Analytics",
        url: "#",
      },
    ],
  },
  {
    title: "Management",
    url: "#",
    icon: Users,
    items: [
      {
        title: "Users",
        url: "#",
      },
      {
        title: "Providers",
        url: "#",
      },
      {
        title: "Categories",
        url: "#",
      },
    ],
  },
];

const PROVIDER_navMain = [
  {
    title: "Provider Dashboard",
    url: "#",
    icon: Store,
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "#",
      },
      {
        title: "My Meals",
        url: "#",
      },
      {
        title: "Orders",
        url: "#",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "Profile",
        url: "/complete-profile",
      },
    ],
  },
];

const USER_navMain = [
  {
    title: "User Dashboard",
    url: "#",
    icon: ShoppingBag,
    isActive: true,
    items: [
      {
        title: "Browse Meals",
        url: "#",
      },
      {
        title: "My Orders",
        url: "#",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "Profile",
        url: "#",
      },
    ],
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole?: "ADMIN" | "PROVIDER" | "USER" | string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

export function AppSidebar({ userRole, user, ...props }: AppSidebarProps) {
  let navItem = USER_navMain; // fallback
  if (userRole === "ADMIN") {
    navItem = ADMIN_navMain;
  } else if (userRole === "PROVIDER") {
    navItem = PROVIDER_navMain;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
      <SidebarContent>
        <NavMain items={navItem} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
