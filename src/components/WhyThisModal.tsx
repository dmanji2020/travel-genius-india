import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, DollarSign, Clock, Heart, Target, TrendingUp } from "lucide-react";

interface WhyThisModalProps {
  activityId: string;
  onClose: () => void;
}

// Mock explanations - in real app, this would come from AI analysis
const explanations = {
  arrival: {
    reasons: [
      {
        icon: DollarSign,
        title: "Best Price-Time Ratio",
        description: "This flight offers 35% savings compared to premium options while maintaining convenient timing."
      },
      {
        icon: Clock,
        title: "Optimal Schedule",
        description: "Arrives at 10 AM allowing full day utilization without early morning rush."
      }
    ],
    confidence: 92
  },
  checkin: {
    reasons: [
      {
        icon: DollarSign,
        title: "Budget Sweet Spot",
        description: "Perfect balance of luxury amenities within your ₹3500/night accommodation budget."
      },
      {
        icon: Heart,
        title: "Matches Preferences",
        description: "Beachfront location aligns with your beach and relaxation interests."
      },
      {
        icon: Target,
        title: "Hidden Value",
        description: "Local gem with private beach access that most tourists miss."
      }
    ],
    confidence: 88
  },
  beach: {
    reasons: [
      {
        icon: Heart,
        title: "Interest Match",
        description: "Water sports and beach activities perfectly match your adventure preferences."
      },
      {
        icon: TrendingUp,
        title: "High Satisfaction",
        description: "96% traveler satisfaction rate for similar profiles."
      }
    ],
    confidence: 94
  }
};

export const WhyThisModal = ({ activityId, onClose }: WhyThisModalProps) => {
  const explanation = explanations[activityId as keyof typeof explanations];
  
  if (!explanation) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Recommendation Explained
          </DialogTitle>
          <DialogDescription>
            Here's why our AI selected this option for your trip
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Confidence Score</span>
            <Badge variant="secondary" className="bg-trust/10 text-trust">
              {explanation.confidence}% Match
            </Badge>
          </div>
          
          <div className="space-y-4">
            {explanation.reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                  <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">{reason.title}</h4>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-accent" />
              <span className="font-medium text-accent">Personalization Factor</span>
            </div>
            <p className="text-sm text-muted-foreground">
              This recommendation is tailored based on your budget preferences, travel interests, 
              and successful similar trips by travelers with matching profiles.
            </p>
          </div>
          
          <Button onClick={onClose} className="w-full">
            Got it, thanks!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};