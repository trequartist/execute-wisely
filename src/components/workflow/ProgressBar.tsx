import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface ProgressStep {
  name: string;
  status: "pending" | "in-progress" | "completed";
}

interface ProgressBarProps {
  steps: ProgressStep[];
  showLabels?: boolean;
  animated?: boolean;
  className?: string;
}

export function ProgressBar({ steps, showLabels = true, animated = true, className }: ProgressBarProps) {
  const completedSteps = steps.filter((s) => s.status === "completed").length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className={cn("w-full", className)}>
      {/* Progress Bar */}
      <div className="relative h-1 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full bg-primary transition-all duration-500 ease-out",
            animated && "relative overflow-hidden"
          )}
          style={{ width: `${progressPercentage}%` }}
        >
          {animated && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 2s linear infinite",
              }}
            />
          )}
        </div>
      </div>

      {/* Step Indicators */}
      {showLabels && (
        <div className="mt-6 flex items-start justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2"
              style={{ width: `${100 / steps.length}%` }}
            >
              {/* Dot Indicator */}
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300",
                  step.status === "completed" &&
                    "border-primary bg-primary text-primary-foreground",
                  step.status === "in-progress" &&
                    "animate-pulse-ring border-primary bg-background",
                  step.status === "pending" && "border-border bg-background"
                )}
              >
                {step.status === "completed" && (
                  <Check className="h-3 w-3 animate-fade-in" />
                )}
                {step.status === "in-progress" && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-center text-xs transition-colors",
                  step.status === "in-progress" && "font-medium text-foreground",
                  step.status === "completed" && "text-foreground",
                  step.status === "pending" && "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
