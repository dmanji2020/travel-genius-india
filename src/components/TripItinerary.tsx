import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Clock, DollarSign, Star, Info, ShoppingCart, Zap, Users, Calendar } from "lucide-react";
import { WhyThisModal } from "@/components/WhyThisModal";
import { BookingCart } from "@/components/BookingCart";

interface TripItineraryProps {
  onBack: () => void;
}

const mockItinerary = {
  destination: "Goa",
  duration: 7,
  totalBudget: 45000,
  days: [
    {
      day: 1,
      date: "Dec 20, 2024",
      activities: [
        {
          id: "arrival",
          time: "10:00 AM",
          title: "Arrival at Goa Airport",
          description: "Flight from Mumbai to Goa",
          cost: 8500,
          type: "transport",
          whyThis: "Direct flight chosen for convenience and best price-to-time ratio based on your budget."
        },
        {
          id: "checkin",
          time: "12:30 PM",
          title: "Check-in at Sunset Beach Resort",
          description: "Beachfront accommodation in Calangute",
          cost: 3500,
          type: "accommodation",
          hiddenGem: true,
          whyThis: "This resort offers perfect balance of luxury and budget, plus private beach access."
        },
        {
          id: "beach",
          time: "4:00 PM",
          title: "Explore Calangute Beach",
          description: "Relax and enjoy water sports",
          cost: 1200,
          type: "activity",
          whyThis: "Popular beach with great water sports facilities matching your adventure interests."
        }
      ]
    },
    {
      day: 2,
      date: "Dec 21, 2024",
      activities: [
        {
          id: "oldgoa",
          time: "9:00 AM",
          title: "Old Goa Heritage Tour",
          description: "Visit Basilica of Bom Jesus & Se Cathedral",
          cost: 800,
          type: "activity",
          whyThis: "Perfect match for your cultural interests, UNESCO World Heritage sites."
        },
        {
          id: "spicefarm",
          time: "2:00 PM",
          title: "Sahakari Spice Farm Experience",
          description: "Authentic Goan spice plantation tour with traditional lunch",
          cost: 1500,
          type: "activity",
          hiddenGem: true,
          whyThis: "Hidden gem that combines your food and cultural interests with authentic local experience."
        }
      ]
    }
  ]
};

export const TripItinerary = ({ onBack }: TripItineraryProps) => {
  const [showWhyThis, setShowWhyThis] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getTotalSelectedCost = () => {
    return mockItinerary.days
      .flatMap(day => day.activities)
      .filter(activity => selectedItems.includes(activity.id))
      .reduce((total, activity) => total + activity.cost, 0);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'transport': return '✈️';
      case 'accommodation': return '🏨';
      case 'activity': return '🎯';
      default: return '📍';
    }
  };

  if (showCart) {
    return <BookingCart onBack={() => setShowCart(false)} selectedItems={selectedItems} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-sunset text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onBack} className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Planning
            </Button>
            
            <Badge className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
              <Zap className="w-4 h-4 mr-2" />
              AI Generated
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">Your {mockItinerary.destination} Adventure</h1>
          <div className="flex flex-wrap gap-6 text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {mockItinerary.duration} Days
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              2 Travelers
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              ₹{mockItinerary.totalBudget.toLocaleString()} Budget
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="itinerary" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="itinerary">Day-by-Day Itinerary</TabsTrigger>
            <TabsTrigger value="overview">Trip Overview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="itinerary" className="space-y-6">
            {mockItinerary.days.map((day) => (
              <Card key={day.day} className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Badge variant="outline">Day {day.day}</Badge>
                    <span>{day.date}</span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {day.activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(activity.id)}
                          onChange={() => toggleItemSelection(activity.id)}
                          className="mt-2"
                        />
                        
                        <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{activity.time}</span>
                                {activity.hiddenGem && (
                                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                                    <Star className="w-3 h-3 mr-1" />
                                    Hidden Gem
                                  </Badge>
                                )}
                              </div>
                              <h4 className="font-semibold text-lg">{activity.title}</h4>
                              <p className="text-muted-foreground">{activity.description}</p>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-bold text-lg">₹{activity.cost.toLocaleString()}</div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowWhyThis(activity.id)}
                                className="text-primary hover:text-primary/80"
                              >
                                <Info className="w-4 h-4 mr-1" />
                                Why This?
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Budget Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Transport</span>
                      <span>₹8,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accommodation</span>
                      <span>₹24,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Activities</span>
                      <span>₹9,500</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>₹42,500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    Destinations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Calangute Beach</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span>Old Goa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-trust rounded-full" />
                      <span>Sahakari Spice Farm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-trust" />
                    Hidden Gems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-accent" />
                      <span className="text-sm">Sunset Beach Resort</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-accent" />
                      <span className="text-sm">Authentic Spice Farm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Cart Button */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            variant="hero"
            size="lg"
            onClick={() => setShowCart(true)}
            className="shadow-travel"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Book Selected ({selectedItems.length}) - ₹{getTotalSelectedCost().toLocaleString()}
          </Button>
        </div>
      )}

      {/* Why This Modal */}
      {showWhyThis && (
        <WhyThisModal
          activityId={showWhyThis}
          onClose={() => setShowWhyThis(null)}
        />
      )}
    </div>
  );
};