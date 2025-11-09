import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Link as LinkIcon, Upload, Folder } from "lucide-react";
import { useState } from "react";

export default function Hub() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop
  };

  return (
    <WorkspaceLayout workspace="hub">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-display mb-2">Hub</h1>
          <p className="text-muted-foreground">
            Manage your documents, sources, and knowledge base
          </p>
        </div>

        <Tabs defaultValue="documents" className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <TabsList className="mb-8">
            <TabsTrigger value="documents" className="gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="sources" className="gap-2">
              <LinkIcon className="h-4 w-4" />
              Sources
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents">
            <Card className="border-border-light">
              <CardHeader>
                <CardTitle>Document Library</CardTitle>
                <CardDescription>All your uploaded documents and files</CardDescription>
              </CardHeader>
              <CardContent className="flex h-[400px] items-center justify-center text-muted-foreground">
                No documents yet. Upload files to get started.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <Card className="border-border-light">
              <CardHeader>
                <CardTitle>External Sources</CardTitle>
                <CardDescription>URLs and external content you're monitoring</CardDescription>
              </CardHeader>
              <CardContent className="flex h-[400px] items-center justify-center text-muted-foreground">
                No sources added yet. Add URLs to monitor external content.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload">
            <Card className="border-border-light">
              <CardHeader>
                <CardTitle>Upload Files</CardTitle>
                <CardDescription>Add documents to your knowledge base</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`relative rounded-lg border-2 border-dashed p-16 text-center transition-all duration-200 ${
                    isDragging
                      ? "border-primary bg-primary/5 animate-pulse-ring"
                      : "border-border hover:border-border-hover hover:bg-muted"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  {isDragging ? (
                    <div className="animate-fade-in">
                      <Upload className="mx-auto mb-4 h-12 w-12 text-primary" />
                      <p className="text-heading mb-2">Drop files here</p>
                      <p className="text-sm text-muted-foreground">
                        PDF, DOCX, TXT, MD files supported
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
                      <p className="mb-1">Drag and drop files here, or click to browse</p>
                      <p className="mb-6 text-sm text-muted-foreground">
                        You can also paste URLs to monitor external content
                      </p>
                      <div className="flex justify-center gap-3">
                        <Button className="gap-2">
                          <Folder className="h-4 w-4" />
                          Browse Files
                        </Button>
                        <Button variant="secondary" className="gap-2">
                          <LinkIcon className="h-4 w-4" />
                          Add URL
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </WorkspaceLayout>
  );
}
