import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar as CalendarIcon, Dna, RefreshCw, Target, Zap, TrendingUp } from "lucide-react";
import { PlaybookCard } from "@/components/workspace/PlaybookCard";
import { PlayCard } from "@/components/workspace/PlayCard";
import { toast } from "sonner";

const activePlays = [
  {
    id: "1",
    icon: Target,
    title: "Problem-Solution Framework",
    description: "Address pain points with actionable solutions",
    performance: { impressions: 12500, engagement: 8.2 },
  },
  {
    id: "2",
    icon: Zap,
    title: "Quick Win Tactics",
    description: "Share immediately actionable tips",
    performance: { impressions: 9800, engagement: 12.5 },
  },
  {
    id: "3",
    icon: TrendingUp,
    title: "Industry Trend Analysis",
    description: "Position as thought leader on emerging trends",
    performance: { impressions: 15200, engagement: 6.8 },
  },
];

export default function Strategy() {
  const handleViewPlaybook = (type: string) => {
    toast.info(`${type} playbook viewer coming soon`);
  };

  const handleViewPlay = (playId: string) => {
    toast.info("Play details coming soon");
  };

  const handleRegeneratePlaybooks = () => {
    toast.success("Regenerating playbooks...", {
      description: "This will take a few minutes",
    });
  };

  return (
    <WorkspaceLayout workspace="strategy">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-display mb-2">Strategy</h1>
          <p className="text-muted-foreground">
            Plan your content strategy and manage your playbooks
          </p>
        </div>

        <Tabs defaultValue="playbooks" className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <TabsList className="mb-8">
            <TabsTrigger value="playbooks" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Playbooks
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="dna" className="gap-2">
              <Dna className="h-4 w-4" />
              Content DNA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="playbooks" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <PlaybookCard
                type="blog"
                activePlays={12}
                lastUpdated="3 days ago"
                performance={{ change: 15, trend: "up" }}
                onClick={() => handleViewPlaybook("Blog")}
              />
              <PlaybookCard
                type="linkedin"
                activePlays={8}
                lastUpdated="1 week ago"
                performance={{ change: -3, trend: "down" }}
                onClick={() => handleViewPlaybook("LinkedIn")}
              />
            </div>

            <div>
              <h3 className="text-label mb-4">YOUR ACTIVE PLAYS</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {activePlays.map((play) => (
                  <PlayCard
                    key={play.id}
                    icon={play.icon}
                    title={play.title}
                    description={play.description}
                    performance={play.performance}
                    onClick={() => handleViewPlay(play.id)}
                  />
                ))}
              </div>
            </div>

            <Card className="border-border-light">
              <CardHeader>
                <CardTitle>Regenerate Playbooks</CardTitle>
                <CardDescription>
                  Update your playbooks based on latest performance data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="gap-2" onClick={handleRegeneratePlaybooks}>
                  <RefreshCw className="h-4 w-4" />
                  Regenerate All Playbooks
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="border-border-light">
              <CardHeader>
                <CardTitle>Content Calendar</CardTitle>
                <CardDescription>Plan and schedule your content</CardDescription>
              </CardHeader>
              <CardContent className="flex h-[400px] items-center justify-center text-muted-foreground">
                Calendar view coming soon
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dna">
            <Card className="border-border-light">
              <CardHeader>
                <CardTitle>Content DNA</CardTitle>
                <CardDescription>Your unique content style and voice</CardDescription>
              </CardHeader>
              <CardContent className="flex h-[400px] items-center justify-center text-muted-foreground">
                Content DNA management coming soon
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </WorkspaceLayout>
  );
}
