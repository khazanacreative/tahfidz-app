
import React from "react";
import { cn } from "@/lib/utils";

interface BlurredCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glassEffect?: "light" | "medium" | "strong";
  hoverAnimation?: boolean;
}

const BlurredCard = ({
  children,
  className,
  glassEffect = "medium",
  hoverAnimation = false,
  ...props
}: BlurredCardProps) => {
  const glassStyles = {
    light: "bg-white/50 backdrop-blur-sm border border-white/10",
    medium: "glass-card",
    strong: "bg-white/80 backdrop-blur-xl border border-white/30",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        glassStyles[glassEffect],
        hoverAnimation && "hover-scale",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BlurredCard;
