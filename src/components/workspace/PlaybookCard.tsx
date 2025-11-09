import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PlaybookCardProps {
  type: "blog" | "linkedin";
  activePlays: number;
  lastUpdated: string;
  performance: {
    change: number;
    trend: "up" | "down" | "neutral";
  };
  onClick: () => void;
}

export function PlaybookCard({ type, activePlays, lastUpdated, performance, onClick }: PlaybookCardProps) {
  const getTrendIcon = () => {
    switch (performance.trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-error" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (performance.trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-error";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="group border-border-light hover:border-primary/20 hover:shadow-md transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="capitalize">{type} Playbook</CardTitle>
            <CardDescription>{activePlays} active plays • Last updated {lastUpdated}</CardDescription>
          </div>
          <Badge variant="secondary" className="gap-1">
            {getTrendIcon()}
            <span className={getTrendColor()}>{Math.abs(performance.change)}%</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full" onClick={onClick}>
          View Playbook
        </Button>
      </CardContent>
    </Card>
  );
}
