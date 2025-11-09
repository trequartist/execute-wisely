import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar as CalendarIcon, Dna, RefreshCw } from "lucide-react";

export default function Strategy() {
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
              <Card className="border-border-light">
                <CardHeader>
                  <CardTitle>Blog Playbook</CardTitle>
                  <CardDescription>12 active plays • Last updated 3 days ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    View Playbook
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border-light">
                <CardHeader>
                  <CardTitle>LinkedIn Playbook</CardTitle>
                  <CardDescription>8 active plays • Last updated 1 week ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    View Playbook
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border-light">
              <CardHeader>
                <CardTitle>Regenerate Playbooks</CardTitle>
                <CardDescription>
                  Update your playbooks based on latest performance data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="gap-2">
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
