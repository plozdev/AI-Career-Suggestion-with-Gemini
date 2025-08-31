import { useEffect, useState } from "react";
import {
  LoadingDialog,
  LoadingDialogContent,
  LoadingDialogDescription,
  LoadingDialogHeader,
  LoadingDialogTitle,
} from "@/components/ui/loading-dialog";

interface CareerLoadingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const LOADING_MESSAGES = [
  {
    title: "🔍 Analyzing Your Profile...",
    description: "Understanding your skills, interests, and goals"
  },
  {
    title: "🧠 AI Processing...",
    description: "Our Gemini AI is matching your profile with career opportunities"
  },
  {
    title: "📊 Evaluating Career Paths...",
    description: "Comparing salary ranges, growth potential, and market demand"
  },
  {
    title: "✨ Personalizing Recommendations...",
    description: "Creating tailored advice based on your unique profile"
  },
  {
    title: "🎯 Almost Ready...",
    description: "Finalizing your personalized career guidance"
  }
];

export default function CareerLoadingDialog({ 
  isOpen, 
  onOpenChange 
}: CareerLoadingDialogProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentMessageIndex(0);
      setProgress(0);
      return;
    }

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => 
        prev < LOADING_MESSAGES.length - 1 ? prev + 1 : prev
      );
    }, 2500);

    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev; // Don't reach 100% until actually done
        return prev + Math.random() * 3 + 1; // Random increments
      });
    }, 200);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [isOpen]);

  const currentMessage = LOADING_MESSAGES[currentMessageIndex];

  return (
    <LoadingDialog open={isOpen} onOpenChange={onOpenChange}>
      <LoadingDialogContent className="sm:max-w-md loading-dialog-content loading-dialog-animate">
        <LoadingDialogHeader className="text-center space-y-4">
          {/* Animated Gemini Logo */}
          <div className="mx-auto w-16 h-16 relative">
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(45deg, #4285f4, #9c27b0, #e91e63)',
                animation: 'gemini-spin 3s linear infinite'
              }}
            ></div>
            <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <LoadingDialogTitle className="text-xl font-bold loading-text-gradient">
            {currentMessage.title}
          </LoadingDialogTitle>
          
          <LoadingDialogDescription className="text-base text-gray-600">
            {currentMessage.description}
          </LoadingDialogDescription>
        </LoadingDialogHeader>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out progress-bar-animated"
              style={{ width: `${Math.min(progress, 95)}%` }}
            />
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            {Math.min(Math.round(progress), 95)}% Complete
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>

        {/* Tip */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> The more detailed your answers, the better your personalized career advice will be!
          </p>
        </div>
      </LoadingDialogContent>
    </LoadingDialog>
  );
}
