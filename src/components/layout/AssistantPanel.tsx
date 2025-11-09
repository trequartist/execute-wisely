import { useState } from "react";
import { Send, Paperclip, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AssistantPanelProps {
  workspace?: string;
}

export function AssistantPanel({ workspace = "create" }: AssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm your AI content assistant. How can I help you create amazing content today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const contextualTagline = {
    create: "Ready to create amazing content",
    strategy: "Your strategic planning assistant",
    intelligence: "Analyzing insights and trends",
    hub: "Managing your knowledge base",
  }[workspace];

  const suggestions = [
    "Generate blog post ideas",
    "Create LinkedIn content",
    "Help me with SEO optimization",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "I understand you need help with that. Let me assist you...",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsThinking(false);
    }, 1500);
  };

  return (
    <div className="flex h-full w-full flex-col border-l border-border-light bg-background/50 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-light px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-primary-foreground">Q</span>
          </div>
          <div>
            <h2 className="text-subheading font-semibold">ContentQ</h2>
            <p className="text-xs text-muted-foreground">{contextualTagline}</p>
          </div>
        </div>

        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-6 py-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-fade-in ${
                message.type === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {message.type === "user" ? "U" : "Q"}
              </div>

              <div className="flex flex-col gap-1 max-w-[85%]">
                <div
                  className={`rounded-lg px-4 py-3 text-sm ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {message.content}
                </div>
                <span className="text-xs text-muted-foreground px-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-3 animate-fade-in">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                Q
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 rounded-lg bg-muted px-4 py-3">
                  <div className="relative h-8 w-8">
                    <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary animate-orb" />
                    <div className="absolute inset-0 rounded-full border-2 border-primary opacity-30 animate-ring" />
                    <div
                      className="absolute inset-0 rounded-full border-2 border-primary opacity-30 animate-ring"
                      style={{ animationDelay: "1s" }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Thinking...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border-light p-4">
        {suggestions.length > 0 && messages.length <= 1 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => setInput(suggestion)}
                className="rounded-full bg-muted px-3 py-1 text-xs transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Textarea
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="min-h-[44px] max-h-32 resize-none"
            rows={1}
          />

          <div className="flex flex-col gap-2">
            <Button variant="ghost" size="icon" className="h-11 w-11 flex-shrink-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="h-11 w-11 flex-shrink-0"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
