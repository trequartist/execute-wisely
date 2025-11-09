import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload, X, FileText } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface InputStageProps {
  title: string;
  description: string;
  inputLabel: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  showCount?: boolean;
  allowFileUpload?: boolean;
  acceptedFiles?: string;
}

export function InputStage({
  title,
  description,
  inputLabel,
  placeholder,
  value,
  onChange,
  maxLength = 2000,
  showCount = true,
  allowFileUpload = false,
  acceptedFiles = ".pdf,.docx,.txt,.md",
}: InputStageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

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
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const charCount = value.length;
  const isNearLimit = charCount > maxLength * 0.8;
  const isAtLimit = charCount >= maxLength;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-heading mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{inputLabel}</label>
          <div className="relative">
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              maxLength={maxLength}
              rows={8}
              className="resize-none"
            />
            {showCount && (
              <div
                className={cn(
                  "absolute bottom-3 right-3 text-xs",
                  isAtLimit && "text-error",
                  isNearLimit && !isAtLimit && "text-warning",
                  !isNearLimit && "text-muted-foreground"
                )}
              >
                {charCount} / {maxLength}
              </div>
            )}
          </div>
        </div>

        {allowFileUpload && (
          <div className="space-y-3">
            <Card
              className={cn(
                "cursor-pointer border-2 border-dashed p-8 text-center transition-all",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-border-hover hover:bg-muted"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm">
                Drag and drop files here, or click to browse
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Accepted: {acceptedFiles}
              </p>
            </Card>

            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border-light bg-muted px-4 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
