"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AppCard } from "./app-card";
import { useState } from "react";
import { App } from "@/lib/types/app";
import { AppCardComingSoon } from "./app-card-coming-soon";
import comingsoon from "@/lib/comingsoon/comingsoon.json";
interface AppGridProps {
  apps: App[];
}

export function AppGrid({ apps }: AppGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = Array.from(new Set(apps.flatMap((app) => app.categories)));

  const filteredApps = apps.filter((app) => {
    const matchesNameOrDescriptionOrCategory =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.categories.some((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "all" || app.categories.includes(selectedCategory);

    return matchesNameOrDescriptionOrCategory && matchesCategory;
  });

  const comingSoonApps = comingsoon;

  return (
    <div className="space-y-6 w-full max-w-full">
      <div className="flex items-center gap-3 flex-wrap w-full">
        <Input
          placeholder="Search apps by name, description, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm w-full"
        />

        <Select onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="all" />
          </SelectTrigger>
          <SelectContent>
            {["all", ...categories].map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* <Select onValueChange={setSelectedTag}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Tags" />
          </SelectTrigger>
          <SelectContent>
            {["all", ...tags].map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {filteredApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>

      <div className="relative flex items-center my-6 w-full">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 whitespace-nowrap">
          Coming Soon
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {comingSoonApps.map((app) => {
          return (
            <AppCardComingSoon
              key={app.title}
              title={app.title}
              description={app.description}
              logo={app.logo}
            />
          );
        })}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center text-muted-foreground w-full">
          No apps found matching your criteria
        </div>
      )}
    </div>
  );
}
