import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface PlayCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  performance: {
    impressions: number;
    engagement: number;
  };
  onClick: () => void;
}

export function PlayCard({ icon: Icon, title, description, performance, onClick }: PlayCardProps) {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer border-border-light transition-all duration-200 hover:scale-[1.01] hover:border-primary/20 hover:shadow-md"
    >
      <CardHeader>
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-subheading">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <Badge variant="secondary" className="text-xs">
            {performance.impressions.toLocaleString()} views
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {performance.engagement}% engagement
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
