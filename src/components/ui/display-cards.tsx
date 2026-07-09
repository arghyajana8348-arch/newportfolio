"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

// 3D desktop skewed representation (for md screens and up)
function DisplayCardDesktop({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-border/80 bg-surface/80 backdrop-blur-md px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-primary/40 hover:bg-surface-elevated [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className,
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-primary/20 p-1.5">{icon}</span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg text-foreground">{description}</p>
      <p className="text-muted-foreground text-sm">{date}</p>
    </div>
  );
}

// Clean flat mobile list representation (for smaller mobile viewports)
function DisplayCardMobile({
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  return (
    <div className="flex w-full max-w-[22rem] flex-col justify-between rounded-xl border border-border bg-surface-elevated/45 backdrop-blur-sm p-4 gap-3 transition-all duration-300 hover:border-primary/30">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-primary/20 p-1.5 text-primary flex items-center justify-center">
          {icon}
        </span>
        <p className={cn("text-base font-semibold", titleClassName)}>{title}</p>
      </div>
      <p className="text-sm text-foreground/90">{description}</p>
      <p className="text-muted-foreground text-xs">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const displayCards = cards || [];

  return (
    <div className="w-full">
      {/* Mobile Clean Flat List */}
      <div className="flex flex-col gap-4 items-center w-full md:hidden">
        {displayCards.map((cardProps, index) => (
          <DisplayCardMobile key={index} {...cardProps} />
        ))}
      </div>

      {/* Desktop 3D Stack */}
      <div className="hidden md:grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
        {displayCards.map((cardProps, index) => (
          <DisplayCardDesktop key={index} {...cardProps} />
        ))}
      </div>
    </div>
  );
}
