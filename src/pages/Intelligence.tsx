import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Activity, BarChart2, Eye, Plus } from "lucide-react";

export default function Intelligence() {
  return (
    <WorkspaceLayout workspace="intelligence">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-display mb-2">Intelligence</h1>
          <p className="text-muted-foreground">
            Research insights, track performance, and analyze your content
          </p>
        </div>

        <Tabs defaultValue="research" className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <TabsList className="mb-8">
            <TabsTrigger value="research" className="gap-2">
              <Search className="h-4 w-4" />
              Research
            </TabsTrigger>
            <TabsTrigger value="diagnostics" className="gap-2">
              <Activity className="h-4 w-4" />
              Diagnostics
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart2 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="visibility" className="gap-2">
              <Eye className="h-4 w-4" />
              AI Visibility
            </TabsTrigger>
          </TabsList>

          <TabsContent value="research" className="space-y-6">
            <Card className="border-border-light">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Research Library</CardTitle>
                    <CardDescription>Access your market research and analysis</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Research
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex h-[400px] items-center justify-center text-muted-foreground">
                No research reports yet. Start by creating a new research request.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diagnostics">
            <Card className="border-border-light">
              <CardHeader>
                <CardTitle>Content Diagnostics</CardTitle>
                <CardDescription>Analyze your content performance and gaps</CardDescription>
              </CardHeader>
              <CardContent className="flex h-[400px] items-center justify-center text-muted-foreground">
                Diagnostics dashboard coming soon
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="border-border-light">
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Track your content metrics and ROI</CardDescription>
              </CardHeader>
              <CardContent className="flex h-[400px] items-center justify-center text-muted-foreground">
                Analytics dashboard coming soon
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visibility">
            <Card className="border-border-light">
              <CardHeader>
                <CardTitle>AI Visibility Tracking</CardTitle>
                <CardDescription>Monitor how AI systems see your content</CardDescription>
              </CardHeader>
              <CardContent className="flex h-[400px] items-center justify-center text-muted-foreground">
                AI visibility tracking coming soon
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </WorkspaceLayout>
  );
}
