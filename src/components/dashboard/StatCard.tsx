
import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import BlurredCard from "@/components/ui/BlurredCard";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  trend?: "up" | "down" | "neutral";
  className?: string;
  gradientClass?: string;
  iconClass?: string;
  style?: React.CSSProperties;
}

const StatCard = ({
  title,
  value,
  icon,
  change,
  trend = "neutral",
  className,
  gradientClass,
  iconClass,
  style,
}: StatCardProps) => {
  // Format the displayed value if it's a number
  const formattedValue = typeof value === "number"
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)
    : value;

  return (
    <BlurredCard 
      className={cn("animate-slide-in-bottom", className)}
      hoverAnimation={true}
      style={style}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
          <p className="text-2xl font-semibold">{formattedValue}</p>
          
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              ) : trend === "down" ? (
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              ) : null}
              
              <span className={cn(
                "text-xs font-medium",
                trend === "up" ? "text-green-500" : 
                trend === "down" ? "text-red-500" : 
                "text-muted-foreground"
              )}>
                {change > 0 ? "+" : ""}{change}%
              </span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "rounded-xl p-3",
          gradientClass || "bg-primary/10"
        )}>
          <div className={cn(
            "text-primary",
            iconClass
          )}>
            {icon}
          </div>
        </div>
      </div>
    </BlurredCard>
  );
};

export default StatCard;
