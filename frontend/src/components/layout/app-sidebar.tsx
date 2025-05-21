"use client";

import Link from "next/link";
import Image from "next/image";
import { GrAppsRounded } from "react-icons/gr";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { PiStorefront } from "react-icons/pi";
import {
  RiSettings3Line,
  RiSettings4Line,
  RiLinkUnlinkM,
} from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const sidebarItems = [
  {
    title: "App Store",
    url: `/apps`,
    icon: PiStorefront,
  },
  {
    title: "App Configurations",
    url: `/appconfigs`,
    icon: GrAppsRounded,
  },
  {
    title: "Linked Apps",
    url: `/linked-accounts`,
    icon: RiLinkUnlinkM,
  },
];

export const settingsItems = [
  {
    title: "Manage Project",
    url: "/project-setting",
    icon: RiSettings3Line,
  },
  {
    title: "Account Settings",
    url: "/account",
    icon: RiSettings4Line,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const pathname = usePathname();

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="flex flex-col bg-black text-gray-300 h-screen"
    >
      <SidebarHeader className="bg-black pb-4">
        <div
          className={cn(
            "flex items-center px-4 pt-4",
            isCollapsed ? "justify-center" : "justify-between gap-2"
          )}
        >
          {!isCollapsed && (
            <div className="relative flex items-center justify-center w-full py-2 hover:scale-105 transition-transform duration-200 cursor-pointer">
              <Image
                src="/Everyday-Wordmark-White-Blue.png"
                alt="ACI Dev Logo"
                width={220}
                height={50}
                priority
                className="object-contain"
              />
            </div>
          )}
          <SidebarTrigger />
        </div>
        <Separator className="bg-gray-700 mt-4" />
      </SidebarHeader>

      <SidebarContent className="bg-black">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const isActive =
                  pathname === item.url || pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link
                            href={item.url}
                            className={cn(
                              "flex items-center gap-4 px-4 py-3 rounded-md text-sm transition-all",
                              isCollapsed && "justify-center",
                              isActive &&
                                "bg-gray-800 text-white font-semibold"
                            )}
                          >
                            <item.icon
                              className={cn(
                                "h-5 w-5 flex-shrink-0",
                                isActive && "text-white"
                              )}
                            />
                            {!isCollapsed && <span>{item.title}</span>}
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent
                          side="right"
                          className="text-white bg-gray-800 border border-gray-700"
                        >
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-black">
        <SidebarMenu>
          {settingsItems.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center gap-4 p-4 text-sm rounded-md transition-colors",
                          isCollapsed && "justify-center",
                          isActive &&
                            "bg-gray-800 text-white font-semibold"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5 flex-shrink-0",
                            isActive && "text-white"
                          )}
                        />
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent
                      side="right"
                      className="text-white bg-gray-800 border border-gray-700"
                    >
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
