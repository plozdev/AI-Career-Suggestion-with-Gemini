import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import CareerForm from "@/components/CareerForm";
import CareerResults from "@/components/CareerResults";
import MarketAnalysis from "@/components/MarketAnalysis";
import Footer from "@/components/Footer";
import type { CareerAdvice, MarketAnalysis as MarketAnalysisType } from "@shared/schema";

export default function Home() {
  const [careerAdvice, setCareerAdvice] = useState<CareerAdvice | null>(null);
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysisType | null>(null);
  const [showMarketAnalysis, setShowMarketAnalysis] = useState(false);
  const careerFormRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const marketMutation = useMutation({
    mutationFn: async (careerPath: string) => {
      const response = await apiRequest("POST", "/api/market-analysis",{ careerPath } );
      return response.json();
    },
    onSuccess: (data) => {
      setMarketAnalysis(data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get market analysis",
        variant: "destructive",
      });
    },
  });

  const handleDiscoverClick = () => {
    if (careerFormRef.current) {
      careerFormRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleCareerSuccess = (advice: CareerAdvice) => {
    setCareerAdvice(advice);
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('career-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleAnalyzeMarket = () => {
    if (careerAdvice?.careerPath) {
      setShowMarketAnalysis(true);
      marketMutation.mutate(careerAdvice.careerPath);
      
      // Scroll to market analysis
      setTimeout(() => {
        const marketElement = document.getElementById('market-results');
        if (marketElement) {
          marketElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen">
      <Header onDiscoverClick={handleDiscoverClick} />
      
      <main className="main-content">
        <div className="container max-w-6xl mx-auto px-5">
          <div ref={careerFormRef}>
            <CareerForm onSuccess={handleCareerSuccess} />
          </div>
          
          <CareerResults
            advice={careerAdvice}
            isLoading={false}
            onAnalyzeMarket={handleAnalyzeMarket}
          />
          
          <MarketAnalysis
            analysis={marketAnalysis}
            isLoading={marketMutation.isPending}
            isVisible={showMarketAnalysis}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
