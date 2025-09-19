import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, MapPin, Calendar, DollarSign, Users, Heart, Camera, Mountain, Utensils, Music, Waves, Loader2, Sparkles } from "lucide-react";

interface PlanningWizardProps {
  onComplete: () => void;
  onBack: () => void;
  isDemoMode?: boolean;
}

const interests = [
  { id: "wellness", label: "Wellness & Spa", icon: Heart },
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "cultural", label: "Cultural Sites", icon: Camera },
  { id: "food", label: "Food & Cuisine", icon: Utensils },
  { id: "nightlife", label: "Nightlife", icon: Music },
  { id: "beaches", label: "Beaches", icon: Waves },
];

export const PlanningWizard = ({ onComplete, onBack, isDemoMode = false }: PlanningWizardProps) => {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState(isDemoMode ? [45000] : [50000]);
  const [duration, setDuration] = useState(isDemoMode ? [5] : [7]);
  const [travelers, setTravelers] = useState(isDemoMode ? 2 : 2);
  const [origin, setOrigin] = useState(isDemoMode ? "Bengaluru" : "");
  const [destination, setDestination] = useState(isDemoMode ? "Goa" : "");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    isDemoMode ? ["beaches", "food", "nightlife", "cultural"] : []
  );
  const [isGeneratingDemo, setIsGeneratingDemo] = useState(false);
  const [demoMessage, setDemoMessage] = useState("");

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const simulateDemoGeneration = async () => {
    setIsGeneratingDemo(true);
    const messages = [
      "Planning your trip...",
      "Talking to AI...",
      "Finding local experiences...",
      "Optimizing for your budget & interests..."
    ];

    for (let i = 0; i < messages.length; i++) {
      setDemoMessage(messages[i]);
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    // Complete the demo
    onComplete();
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (isDemoMode) {
        simulateDemoGeneration();
      } else {
        onComplete();
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-card">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Badge variant="outline">Step {step} of 3</Badge>
              <div className="w-20" /> {/* Spacer */}
            </div>
            
            <CardTitle className="text-3xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
              {isDemoMode && <Badge className="mb-2 bg-accent/10 text-accent border-accent/20">Demo Mode</Badge>}
              {step === 1 && "Trip Basics"}
              {step === 2 && "Budget & Duration"}
              {step === 3 && "Your Interests"}
            </CardTitle>
            
            <CardDescription className="text-lg">
              {isDemoMode && step === 1 && "This demo shows a pre-filled Bengaluru to Goa trip"}
              {isDemoMode && step === 2 && "Budget and duration optimized for a perfect 5-day Goa getaway"}
              {isDemoMode && step === 3 && "Popular interests for beach destinations pre-selected"}
              {!isDemoMode && step === 1 && "Tell us where you're going and who's traveling"}
              {!isDemoMode && step === 2 && "Set your budget and trip duration preferences"}
              {!isDemoMode && step === 3 && "Choose activities and experiences you love"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="origin" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      From (Origin City)
                    </Label>
                    <Input
                      id="origin"
                      placeholder="e.g., Mumbai, Delhi, Bangalore"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      To (Destination)
                    </Label>
                    <Input
                      id="destination"
                      placeholder="e.g., Goa, Kerala, Rajasthan"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-trust" />
                    Number of Travelers: {travelers}
                  </Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <Button
                        key={num}
                        variant={travelers === num ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTravelers(num)}
                        className="w-12 h-12"
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    Total Budget: ₹{budget[0].toLocaleString()}
                  </Label>
                  <Slider
                    value={budget}
                    onValueChange={setBudget}
                    max={200000}
                    min={10000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹10,000</span>
                    <span>₹2,00,000</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    Trip Duration: {duration[0]} day{duration[0] > 1 ? 's' : ''}
                  </Label>
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    max={21}
                    min={2}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>2 days</span>
                    <span>21 days</span>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Budget Breakdown Estimate:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Accommodation (40%)</span>
                      <span>₹{Math.round(budget[0] * 0.4).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Activities & Food (35%)</span>
                      <span>₹{Math.round(budget[0] * 0.35).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transport (25%)</span>
                      <span>₹{Math.round(budget[0] * 0.25).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {interests.map((interest) => {
                    const Icon = interest.icon;
                    const isSelected = selectedInterests.includes(interest.id);
                    
                    return (
                      <Button
                        key={interest.id}
                        variant={isSelected ? "default" : "outline"}
                        className={`h-20 flex-col gap-2 ${isSelected ? 'shadow-travel' : ''}`}
                        onClick={() => toggleInterest(interest.id)}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs">{interest.label}</span>
                      </Button>
                    );
                  })}
                </div>
                
                {selectedInterests.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Selected Interests:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedInterests.map((id) => {
                        const interest = interests.find(i => i.id === id);
                        return interest ? (
                          <Badge key={id} variant="secondary">
                            {interest.label}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={step === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button 
                variant="hero" 
                onClick={nextStep}
                disabled={
                  isGeneratingDemo || (!isDemoMode && (
                    (step === 1 && (!origin || !destination)) ||
                    (step === 3 && selectedInterests.length === 0)
                  ))
                }
              >
                {isGeneratingDemo ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {demoMessage}
                  </>
                ) : step === 3 ? (isDemoMode ? "Generate Demo Trip" : "Generate My Trip") : "Next Step"}
                {!isGeneratingDemo && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};