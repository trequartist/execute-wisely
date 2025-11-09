import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export interface SelectionOption {
  id: string;
  title: string;
  description: string;
  metadata?: {
    wordCount?: number;
    readingTime?: string;
    difficulty?: string;
  };
}

interface SelectionStageProps {
  options: SelectionOption[];
  selected: string[];
  onSelect: (id: string) => void;
  multiSelect?: boolean;
  title: string;
  description: string;
}

export function SelectionStage({
  options,
  selected,
  onSelect,
  multiSelect = false,
  title,
  description,
}: SelectionStageProps) {
  const isSelected = (id: string) => selected.includes(id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-heading mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {options.map((option, index) => (
          <Card
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={cn(
              "group relative cursor-pointer border-border-light transition-all duration-200 hover:scale-[1.02] hover:shadow-md",
              isSelected(option.id) &&
                "border-primary bg-primary/5 ring-2 ring-primary/20",
              "animate-fade-in"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {isSelected(option.id) && (
              <div className="absolute right-4 top-4">
                <CheckCircle2 className="h-5 w-5 text-primary animate-fade-in" />
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-subheading pr-8">{option.title}</CardTitle>
              <CardDescription className="text-sm">
                {option.description}
              </CardDescription>
            </CardHeader>

            {option.metadata && (
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {option.metadata.wordCount && (
                    <Badge variant="secondary" className="text-xs">
                      {option.metadata.wordCount} words
                    </Badge>
                  )}
                  {option.metadata.readingTime && (
                    <Badge variant="secondary" className="text-xs">
                      {option.metadata.readingTime} read
                    </Badge>
                  )}
                  {option.metadata.difficulty && (
                    <Badge variant="secondary" className="text-xs">
                      {option.metadata.difficulty}
                    </Badge>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {!multiSelect && selected.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Selected 1 option. Click another to change your selection.
        </p>
      )}
    </div>
  );
}
