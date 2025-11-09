import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Linkedin, Calendar, ArrowRight, Clock } from "lucide-react";

const workflows = [
  {
    id: "blog",
    title: "Blog Post",
    description: "Long-form content for your blog",
    icon: FileText,
    shortcut: "B",
  },
  {
    id: "linkedin",
    title: "LinkedIn Post",
    description: "Professional update for LinkedIn",
    icon: Linkedin,
    shortcut: "L",
  },
  {
    id: "calendar",
    title: "From Calendar",
    description: "Create from scheduled topic",
    icon: Calendar,
    shortcut: "C",
  },
];

const drafts = [
  {
    id: "1",
    title: "AI in Healthcare: How machine learning is revolutionizing patient care",
    status: "Topics Selection",
    lastModified: "2 hours ago",
    progress: 45,
    wordCount: 1500,
  },
  {
    id: "2",
    title: "The Future of Remote Work",
    status: "Brief Review",
    lastModified: "1 day ago",
    progress: 70,
    wordCount: 2100,
  },
];

export default function Create() {
  return (
    <WorkspaceLayout workspace="create">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-display mb-2">Create Content</h1>
          <p className="text-muted-foreground">
            Start a new piece of content or continue where you left off
          </p>
        </div>

        {/* Start New Section */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h2 className="text-label mb-4">START NEW</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {workflows.map((workflow, index) => {
              const Icon = workflow.icon;
              return (
                <Card
                  key={workflow.id}
                  className="group relative overflow-hidden border-border-light bg-card transition-all duration-200 hover:scale-[1.02] hover:border-primary/20 hover:shadow-lg cursor-pointer"
                  style={{ animationDelay: `${150 + index * 50}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </div>
                      <kbd className="hidden h-6 w-6 items-center justify-center rounded-md border border-border bg-muted text-xs font-semibold opacity-0 transition-opacity group-hover:flex group-hover:opacity-100">
                        {workflow.shortcut}
                      </kbd>
                    </div>
                    <CardTitle className="text-subheading">{workflow.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {workflow.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="group/btn w-full">
                      Start
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Continue Working Section */}
        <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h2 className="text-label mb-4">CONTINUE WORKING</h2>
          <div className="space-y-3">
            {drafts.map((draft, index) => (
              <Card
                key={draft.id}
                className="group relative overflow-hidden border-border-light transition-all duration-200 hover:scale-[1.01] hover:border-primary/20 hover:shadow-md cursor-pointer"
                style={{ animationDelay: `${350 + index * 50}ms` }}
              >
                {/* Progress indicator */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-500"
                  style={{ width: `${draft.progress}%` }}
                />

                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {draft.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {draft.progress}% complete
                        </span>
                      </div>
                      <CardTitle className="text-subheading mb-1 line-clamp-1">
                        {draft.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {draft.lastModified}
                        </span>
                        <span>•</span>
                        <span>{draft.wordCount.toLocaleString()} words</span>
                      </CardDescription>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
