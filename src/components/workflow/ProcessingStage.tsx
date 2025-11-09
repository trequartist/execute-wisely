interface ProcessingStageProps {
  title: string;
  description: string;
  showDetails?: boolean;
  details?: {
    sourcesAnalyzed?: number;
    documentsSearched?: number;
    estimatedTime?: string;
  };
  progress?: number;
  showProgress?: boolean;
}

export function ProcessingStage({
  title,
  description,
  showDetails = false,
  details,
  progress,
  showProgress = false,
}: ProcessingStageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Three-dot spinner */}
      <div className="mb-8 flex gap-2">
        <div className="h-3 w-3 animate-dot rounded-full bg-primary" />
        <div
          className="h-3 w-3 animate-dot rounded-full bg-primary"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="h-3 w-3 animate-dot rounded-full bg-primary"
          style={{ animationDelay: "0.4s" }}
        />
      </div>

      <h3 className="text-subheading mb-2 text-center">{title}</h3>
      <p className="mb-8 max-w-md text-center text-sm text-muted-foreground">
        {description}
      </p>

      {showDetails && details && (
        <div className="w-full max-w-md space-y-2 rounded-lg border border-border-light bg-muted/50 p-4">
          {details.sourcesAnalyzed !== undefined && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sources analyzed:</span>
              <span className="font-medium">{details.sourcesAnalyzed}</span>
            </div>
          )}
          {details.documentsSearched !== undefined && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Documents searched:</span>
              <span className="font-medium">{details.documentsSearched}</span>
            </div>
          )}
          {details.estimatedTime && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Time remaining:</span>
              <span className="font-medium">{details.estimatedTime}</span>
            </div>
          )}
        </div>
      )}

      {showProgress && progress !== undefined && (
        <div className="mt-6 w-full max-w-md">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
