"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type App } from "@/lib/types/app";
import { IdDisplay } from "@/components/apps/id-display";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface AppCardProps {
  app: App;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Link href={`/apps/${app.name}`} className="block h-full w-full">
      <Card className="h-full w-full transition-shadow hover:shadow-lg flex flex-col overflow-hidden">
        <CardHeader className="space-y-3 flex-shrink-0 p-4">
          <div className="flex items-center justify-between w-full gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={app.logo}
                  alt={`${app.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <CardTitle className="truncate text-sm sm:text-base font-medium min-w-0">
                {app.display_name}
              </CardTitle>
            </div>
            <div className="flex-shrink-0 w-16 sm:w-20">
              <IdDisplay id={app.name} />
            </div>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CardDescription className="line-clamp-2 sm:line-clamp-3 overflow-hidden text-xs sm:text-sm">
                  {app.description}
                </CardDescription>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{app.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="mt-auto flex justify-between flex-wrap gap-2 p-4 pt-0">
          <div className="flex flex-wrap items-start gap-1.5">
            {app.categories.map((category) => (
              <span
                key={category}
                className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 border border-gray-200"
              >
                {category}
              </span>
            ))}
          </div>
          <TooltipProvider>
            <div className="flex justify-end items-end flex-wrap gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 font-medium text-gray-600 border rounded-full border-gray-200">
                    {app.functions.length}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    {`Functions in This App: ${app.functions.length}`}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </Link>
  );
}
