import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plane, Calendar, Users, Star, Shield, TrendingUp, Heart } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";
import hiddenGemsImage from "@/assets/hidden-gems.jpg";
import { PlanningWizard } from "@/components/PlanningWizard";
import { TripItinerary } from "@/components/TripItinerary";

const Index = () => {
  const [showPlanning, setShowPlanning] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  if (showItinerary) {
    return <TripItinerary onBack={() => setShowItinerary(false)} />;
  }

  if (showPlanning) {
    return <PlanningWizard 
      onComplete={() => {
        setShowPlanning(false);
        setShowItinerary(true);
      }} 
      onBack={() => {
        setShowPlanning(false);
        setIsDemoMode(false);
      }}
      isDemoMode={isDemoMode}
    />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/40" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Shield className="w-4 h-4 mr-2" />
              Gen AI Exchange Hackathon Prototype - powered by Google AI.
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-sunset bg-clip-text text-transparent">
              AI-Powered Trip Planning
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Plan, customize, and book your perfect Indian getaway with our intelligent travel companion. 
              From hidden gems to transparent pricing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => setShowPlanning(true)}
                className="text-lg px-8 py-4"
              >
                <Plane className="w-5 h-5 mr-2" />
                Start Planning Your Trip
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => {
                  setIsDemoMode(true);
                  setShowPlanning(true);
                }}
              >
                <Star className="w-5 h-5 mr-2" />
                See Demo Journey
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Shield className="w-5 h-5 text-trust" />
                <span>100% Transparent Pricing</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span>Real-time Adaptation</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Heart className="w-5 h-5 text-primary" />
                <span>Hidden Gem Discovery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our AI Planner?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of travel planning with intelligent recommendations and seamless booking
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-travel transition-all duration-300">
              <CardHeader>
                <MapPin className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Smart Itinerary Builder</CardTitle>
                <CardDescription>
                  AI analyzes your preferences, budget, and constraints to create the perfect multi-day itinerary
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-card hover:shadow-travel transition-all duration-300">
              <CardHeader>
                <Calendar className="w-12 h-12 text-accent mb-4" />
                <CardTitle>Real-time Re-planning</CardTitle>
                <CardDescription>
                  Instant adaptation to flight delays, weather changes, or price fluctuations without breaking your budget
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-card hover:shadow-travel transition-all duration-300">
              <CardHeader>
                <Users className="w-12 h-12 text-trust mb-4" />
                <CardTitle>Collaborative Planning</CardTitle>
                <CardDescription>
                  Invite friends and family to vote on destinations, activities, and create the perfect group trip
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Hidden Gems Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                Local Experiences
              </Badge>
              <h2 className="text-4xl font-bold mb-6">Discover India's Hidden Gems</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our AI doesn't just recommend popular tourist spots. We curate authentic local experiences, 
                from secret spice markets in Old Delhi to pristine beaches in Andaman, ensuring your trip 
                is uniquely memorable.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-sunset rounded-full" />
                  <span>Traditional homestays in rural Rajasthan</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-mountain rounded-full" />
                  <span>Secret waterfalls in Western Ghats</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-trust rounded-full" />
                  <span>Authentic street food tours with locals</span>
                </div>
              </div>
              
              <Button variant="accent" size="lg">
                Explore Hidden Experiences
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={hiddenGemsImage} 
                alt="Hidden gems of India" 
                className="rounded-lg shadow-card w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-trust text-trust-foreground">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-6">Built on Trust & Transparency</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            No hidden fees, no surprise charges. See exactly what you're paying for with our transparent 
            pricing model. EaseMyTrip's commitment to honest travel planning, powered by AI.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-trust-foreground/10 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2">₹0</h3>
              <p className="opacity-90">Hidden Fees</p>
            </div>
            <div className="bg-trust-foreground/10 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2">100%</h3>
              <p className="opacity-90">Price Transparency</p>
            </div>
            <div className="bg-trust-foreground/10 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2">24/7</h3>
              <p className="opacity-90">Support & Re-planning</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience the Future of Travel?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who've discovered smarter, more personalized trip planning with our AI assistant.
          </p>
          
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => setShowPlanning(true)}
            className="text-lg px-8 py-4"
          >
            <Plane className="w-5 h-5 mr-2" />
            Plan Your Dream Trip Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;