import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, X, ArrowLeft, ArrowRight } from "lucide-react";
import { ProgressBar, ProgressStep } from "./ProgressBar";

interface WorkflowContainerProps {
  children: ReactNode;
  workflowType: string;
  steps: ProgressStep[];
  currentStage: {
    title: string;
    description?: string;
    primaryAction: string;
    canGoBack?: boolean;
  };
  onPause: () => void;
  onBack?: () => void;
  onProceed: () => void;
  canProceed?: boolean;
  showRegenerateOption?: boolean;
  onRegenerate?: () => void;
}

export function WorkflowContainer({
  children,
  workflowType,
  steps,
  currentStage,
  onPause,
  onBack,
  onProceed,
  canProceed = true,
  showRegenerateOption = false,
  onRegenerate,
}: WorkflowContainerProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Workflow Header */}
      <div className="border-b border-border-light bg-background/95 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Create</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{workflowType}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onPause}>
            <X className="mr-1 h-4 w-4" />
            Pause Workflow
          </Button>
        </div>

        <div className="mt-6">
          <ProgressBar steps={steps} animated={true} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-4xl">{children}</div>
      </div>

      {/* Actions Footer */}
      <div className="border-t border-border-light bg-background/95 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            {currentStage.canGoBack && onBack && (
              <Button variant="secondary" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            {showRegenerateOption && onRegenerate && (
              <Button variant="ghost" onClick={onRegenerate}>
                Regenerate Options
              </Button>
            )}
            <Button onClick={onProceed} disabled={!canProceed}>
              {currentStage.primaryAction}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
