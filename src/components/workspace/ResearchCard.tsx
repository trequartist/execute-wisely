import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, ExternalLink } from "lucide-react";

interface ResearchCardProps {
  title: string;
  status: "running" | "completed";
  progress?: number;
  sources?: number;
  estimatedTime?: string;
  date?: string;
  keyFindings?: string[];
  onView?: () => void;
  onExport?: () => void;
}

export function ResearchCard({
  title,
  status,
  progress,
  sources,
  estimatedTime,
  date,
  keyFindings,
  onView,
  onExport,
}: ResearchCardProps) {
  return (
    <Card className="border-border-light">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <Badge variant={status === "running" ? "warning" : "success"} className="text-xs">
                {status === "running" ? "In Progress" : "Completed"}
              </Badge>
              {date && <span className="text-xs text-muted-foreground">{date}</span>}
            </div>
            <CardTitle className="text-subheading line-clamp-2">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === "running" && progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{sources} sources analyzed</span>
              <span>{estimatedTime} remaining</span>
            </div>
          </div>
        )}

        {status === "completed" && keyFindings && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Key Findings:</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {keyFindings.slice(0, 2).map((finding, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span className="line-clamp-1">{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {status === "completed" && (onView || onExport) && (
          <div className="flex gap-2">
            {onView && (
              <Button variant="outline" size="sm" className="flex-1" onClick={onView}>
                <ExternalLink className="mr-2 h-3 w-3" />
                View Report
              </Button>
            )}
            {onExport && (
              <Button variant="ghost" size="sm" onClick={onExport}>
                Export
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
