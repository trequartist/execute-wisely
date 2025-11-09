import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { Eye, Save, Check, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function Editor() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    // Calculate word and character count from HTML content
    const text = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    setCharCount(text.length);
    setWordCount(text.split(" ").filter((word) => word.length > 0).length);
  }, [content]);

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully");
  };

  const handlePreview = () => {
    toast.info("Preview feature coming soon");
  };

  const handleSEOCheck = () => {
    toast.info("SEO analysis feature coming soon");
  };

  const handlePublish = () => {
    toast.success("Content published successfully!");
    setTimeout(() => {
      navigate("/create");
    }, 1500);
  };

  return (
    <WorkspaceLayout workspace="create">
      <div className="flex h-full flex-col">
        {/* Editor Header */}
        <div className="border-b border-border-light bg-background/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>Create</span>
            <ChevronRight className="h-4 w-4" />
            <span>Blog Post</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Editor</span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="info" className="text-xs">
              Brief
            </Badge>
            <span className="text-sm text-muted-foreground">
              AI in Healthcare • 1,800 words • 7 min read
            </span>
            <Button variant="ghost" size="sm" className="ml-auto">
              View Full Brief
            </Button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-6 py-8">
            <div className="mb-6">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your title..."
                className="text-display border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                maxLength={100}
              />
            </div>

            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your content... Use '/' for commands"
            />
          </div>
        </div>

        {/* Editor Footer */}
        <div className="border-t border-border-light bg-background/95 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{wordCount} words</span>
              <span>•</span>
              <span>{charCount} characters</span>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={handleSaveDraft}>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button variant="secondary" onClick={handlePreview}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button variant="secondary" onClick={handleSEOCheck}>
                SEO Check
              </Button>
              <Button onClick={handlePublish}>
                <Check className="mr-2 h-4 w-4" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
