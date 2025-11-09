import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { WorkflowContainer } from "@/components/workflow/WorkflowContainer";
import { SelectionStage, SelectionOption } from "@/components/workflow/SelectionStage";
import { InputStage } from "@/components/workflow/InputStage";
import { ProcessingStage } from "@/components/workflow/ProcessingStage";
import { ProgressStep } from "@/components/workflow/ProgressBar";

type WorkflowStage = "input" | "research" | "topics" | "brief" | "content";

const mockTopics: SelectionOption[] = [
  {
    id: "1",
    title: "The Evolution of AI in Healthcare Diagnostics",
    description: "How machine learning algorithms are revolutionizing early disease detection and diagnosis accuracy",
    metadata: {
      wordCount: 1800,
      readingTime: "7 min",
      difficulty: "Intermediate",
    },
  },
  {
    id: "2",
    title: "AI-Powered Patient Care: Real-World Success Stories",
    description: "Case studies from leading hospitals implementing AI for personalized treatment plans",
    metadata: {
      wordCount: 1500,
      readingTime: "6 min",
      difficulty: "Beginner",
    },
  },
  {
    id: "3",
    title: "The Ethics of AI in Medical Decision Making",
    description: "Exploring the ethical considerations and regulatory challenges of AI-assisted healthcare",
    metadata: {
      wordCount: 2200,
      readingTime: "9 min",
      difficulty: "Advanced",
    },
  },
  {
    id: "4",
    title: "Predictive Analytics: AI's Role in Preventive Medicine",
    description: "Using artificial intelligence to predict and prevent health issues before they occur",
    metadata: {
      wordCount: 1600,
      readingTime: "6 min",
      difficulty: "Intermediate",
    },
  },
];

export default function CreateWorkflow() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState<WorkflowStage>("input");
  const [userInput, setUserInput] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const workflowType = type === "blog" ? "Blog Post" : type === "linkedin" ? "LinkedIn Post" : "Content";

  const steps: ProgressStep[] = [
    {
      name: "Input",
      status: currentStage === "input" ? "in-progress" : "completed",
    },
    {
      name: "Research",
      status:
        currentStage === "input"
          ? "pending"
          : currentStage === "research"
          ? "in-progress"
          : "completed",
    },
    {
      name: "Topics",
      status:
        currentStage === "input" || currentStage === "research"
          ? "pending"
          : currentStage === "topics"
          ? "in-progress"
          : "completed",
    },
    {
      name: "Brief",
      status:
        currentStage === "content" ? "completed" : currentStage === "brief" ? "in-progress" : "pending",
    },
    {
      name: "Content",
      status: currentStage === "content" ? "in-progress" : "pending",
    },
  ];

  const handlePause = () => {
    navigate("/create");
  };

  const handleProceed = () => {
    if (currentStage === "input") {
      setIsProcessing(true);
      setCurrentStage("research");
      // Simulate AI research
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStage("topics");
      }, 3000);
    } else if (currentStage === "topics") {
      setIsProcessing(true);
      setCurrentStage("brief");
      setTimeout(() => {
        setIsProcessing(false);
        navigate("/create/editor/demo");
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStage === "topics") {
      setCurrentStage("input");
    }
  };

  const handleTopicSelect = (id: string) => {
    setSelectedTopics([id]); // Single select for now
  };

  const getStageConfig = () => {
    switch (currentStage) {
      case "input":
        return {
          title: "What do you want to write about?",
          description: "Share your ideas, and I'll help you create amazing content",
          primaryAction: "Start Research",
          canGoBack: false,
        };
      case "topics":
        return {
          title: "Select Your Topic",
          description: "Choose the angle that resonates with your audience",
          primaryAction: "Continue to Brief",
          canGoBack: true,
        };
      default:
        return {
          title: "Processing",
          description: "Please wait...",
          primaryAction: "Continue",
          canGoBack: false,
        };
    }
  };

  const stageConfig = getStageConfig();

  return (
    <WorkspaceLayout workspace="create">
      <WorkflowContainer
        workflowType={workflowType}
        steps={steps}
        currentStage={stageConfig}
        onPause={handlePause}
        onBack={currentStage === "topics" ? handleBack : undefined}
        onProceed={handleProceed}
        canProceed={
          currentStage === "input" ? userInput.length > 10 : selectedTopics.length > 0
        }
        showRegenerateOption={currentStage === "topics"}
        onRegenerate={() => console.log("Regenerate")}
      >
        {currentStage === "input" && (
          <InputStage
            title="Share Your Ideas"
            description="Tell me what you want to write about. The more details you provide, the better I can help."
            inputLabel="Your Content Brief"
            placeholder="I want to write about AI in healthcare, focusing on how machine learning is helping doctors diagnose diseases earlier..."
            value={userInput}
            onChange={setUserInput}
            maxLength={2000}
            showCount={true}
            allowFileUpload={true}
            acceptedFiles=".pdf,.docx,.txt,.md"
          />
        )}

        {currentStage === "research" && (
          <ProcessingStage
            title="Researching Your Topic"
            description="I'm analyzing relevant sources and gathering insights to help you create compelling content"
            showDetails={true}
            details={{
              sourcesAnalyzed: 47,
              documentsSearched: 12,
              estimatedTime: "~30 seconds",
            }}
            showProgress={true}
            progress={65}
          />
        )}

        {currentStage === "topics" && !isProcessing && (
          <SelectionStage
            title="Select Your Angle"
            description="Based on my research, here are the most compelling angles for your content"
            options={mockTopics}
            selected={selectedTopics}
            onSelect={handleTopicSelect}
            multiSelect={false}
          />
        )}

        {currentStage === "brief" && (
          <ProcessingStage
            title="Creating Your Content Brief"
            description="I'm putting together a comprehensive brief with outline, key points, and SEO recommendations"
            showProgress={true}
            progress={80}
          />
        )}
      </WorkflowContainer>
    </WorkspaceLayout>
  );
}
