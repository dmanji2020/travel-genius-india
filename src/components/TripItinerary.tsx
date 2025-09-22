import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Clock, DollarSign, Star, Info, ShoppingCart, Zap, Users, Calendar, Plane, Hotel, Camera, Heart, Car } from "lucide-react";
import { WhyThisModal } from "@/components/WhyThisModal";
import { BookingCart } from "@/components/BookingCart";
import { DayRouteMap } from "./DayRouteMap";

interface TripItineraryProps {
  onBack: () => void;
}

// Helper function to get dates starting 15 days from today
const getTripDates = () => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 15);
  
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 4); // 5 day trip
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return {
    start: formatDate(startDate),
    end: formatDate(endDate),
    days: Array.from({ length: 5 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      return {
        dayNumber: i + 1,
        date: formatDate(date),
        fullDate: date.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric',
          year: 'numeric'
        })
      };
    })
  };
};

const mockItinerary = {
  destination: "Bengaluru to Goa",
  duration: 5,
  totalBudget: 45000,
  days: getTripDates().days.map((dayInfo, index) => ({
    day: dayInfo.dayNumber,
    date: dayInfo.date,
    fullDate: dayInfo.fullDate,
    activities: (() => {
      switch (index) {
        case 0: // Day 1
          return [
            {
              id: "flight-bengaluru-goa",
              time: "7:00 AM",
              title: "Flight Bengaluru to Goa",
              description: "Direct flight, 1.5 hours (IndiGo)",
              cost: 9500,
              type: "transport",
              icon: Plane,
              whyThis: "Direct morning flight chosen for best price and arrival time, allowing full day exploration."
            },
            {
              id: "airport-transfer",
              time: "10:30 AM", 
              title: "Airport Transfer to Hotel",
              description: "Private cab to Calangute",
              cost: 800,
              type: "transport",
              icon: Car,
              whyThis: "Private transfer ensures comfort and saves time compared to public transport."
            },
            {
              id: "hotel-checkin",
              time: "12:00 PM",
              title: "Check-in at Resort Terra Paraiso",
              description: "Boutique resort near Calangute Beach",
              cost: 8000,
              type: "accommodation",
              icon: Hotel,
              hiddenGem: true,
              whyThis: "This boutique resort offers perfect balance of luxury and budget, plus walking distance to beach."
            },
            {
              id: "calangute-beach",
              time: "3:00 PM",
              title: "Calangute Beach & Water Sports",
              description: "Parasailing, jet skiing, banana boat",
              cost: 2500,
              type: "activity",
              icon: Camera,
              whyThis: "Perfect introduction to Goa's beach culture with adventure activities matching your interests."
            },
            {
              id: "titos-lane",
              time: "6:30 PM",
              title: "Tito's Lane Evening Walk",
              description: "Explore Baga's famous nightlife street",
              cost: 0,
              type: "activity",
              icon: Heart,
              hiddenGem: true,
              whyThis: "Hidden gem for experiencing Goa's nightlife culture before the crowds arrive."
            }
          ];
        case 1: // Day 2
          return [
            {
              id: "old-goa-tour",
              time: "8:00 AM",
              title: "Old Goa UNESCO Sites Tour",
              description: "Basilica of Bom Jesus, Se Cathedral",
              cost: 2000,
              type: "activity",
              icon: Camera,
              whyThis: "Perfect match for your cultural interests, UNESCO World Heritage sites with rich Portuguese history."
            },
            {
              id: "spice-farm",
              time: "12:00 PM",
              title: "Sahakari Spice Farm Experience",
              description: "Traditional Goan lunch on banana leaf",
              cost: 3500,
              type: "activity",
              icon: Heart,
              hiddenGem: true,
              whyThis: "Hidden gem combining your food and cultural interests with authentic farm-to-table experience."
            },
            {
              id: "fontainhas",
              time: "4:00 PM",
              title: "Fontainhas Latin Quarter Walk",
              description: "Portuguese colonial architecture",
              cost: 1000,
              type: "activity",
              icon: Camera,
              hiddenGem: true,
              whyThis: "Secret neighborhood with Instagram-worthy colorful houses and authentic Portuguese heritage."
            },
            {
              id: "mandovi-cruise",
              time: "7:00 PM",
              title: "Mandovi River Sunset Cruise",
              description: "Folk dance performances onboard",
              cost: 2200,
              type: "activity",
              icon: Camera,
              whyThis: "Classic Goan experience combining sunset views with traditional entertainment."
            }
          ];
        case 2: // Day 3
          return [
            {
              id: "palolem-trip",
              time: "9:00 AM",
              title: "Palolem Beach Day Trip",
              description: "Crescent-shaped beach with dolphin spotting",
              cost: 1500,
              type: "activity",
              icon: Camera,
              whyThis: "South Goa's most beautiful beach, less crowded with pristine natural beauty."
            },
            {
              id: "palolem-lunch",
              time: "1:00 PM",
              title: "Beach Shack Lunch at Palolem",
              description: "Fresh seafood with sea view",
              cost: 2000,
              type: "activity",
              icon: Heart,
              whyThis: "Authentic beach dining experience with the freshest catch of the day."
            },
            {
              id: "cabo-de-rama",
              time: "3:30 PM",
              title: "Cabo de Rama Fort",
              description: "Hidden clifftop fort with ocean views",
              cost: 500,
              type: "activity",
              icon: Camera,
              hiddenGem: true,
              whyThis: "Secret fort with panoramic ocean views, perfect for photography and solitude."
            },
            {
              id: "agonda-sunset",
              time: "6:00 PM",
              title: "Agonda Beach Sunset",
              description: "Peaceful beach with golden sunset",
              cost: 0,
              type: "activity",
              icon: Heart,
              whyThis: "Serene beach experience away from crowds, perfect for romantic sunset moments."
            }
          ];
        case 3: // Day 4
          return [
            {
              id: "dudhsagar-trek",
              time: "7:00 AM",
              title: "Dudhsagar Waterfalls Trek",
              description: "Jeep safari + trek to India's 5th highest waterfall",
              cost: 4500,
              type: "activity",
              icon: Camera,
              hiddenGem: true,
              whyThis: "Adventure experience to one of India's most spectacular waterfalls, perfect for nature lovers."
            },
            {
              id: "plantation-lunch",
              time: "2:00 PM",
              title: "Lunch at Dudhsagar Plantation",
              description: "Traditional Konkani thali",
              cost: 1500,
              type: "activity",
              icon: Heart,
              whyThis: "Authentic local cuisine in a traditional setting after your adventure."
            },
            {
              id: "chapora-fort",
              time: "5:00 PM",
              title: "Chapora Fort (Dil Chahta Hai Fort)",
              description: "Iconic fort with panoramic views",
              cost: 0,
              type: "activity",
              icon: Camera,
              whyThis: "Famous Bollywood location with stunning views of North Goa coastline."
            },
            {
              id: "saturday-market",
              time: "7:30 PM",
              title: "Saturday Night Market, Arpora",
              description: "Shopping, live music, international food",
              cost: 2000,
              type: "activity",
              icon: Heart,
              whyThis: "Vibrant night market experience combining shopping, culture, and diverse food options."
            }
          ];
        case 4: // Day 5
          return [
            {
              id: "mapusa-market",
              time: "9:00 AM",
              title: "Mapusa Friday Market",
              description: "Local spices, cashews, and handicrafts",
              cost: 1500,
              type: "activity",
              icon: Camera,
              whyThis: "Authentic local market for genuine Goan products and last-minute souvenirs."
            },
            {
              id: "final-beach-time",
              time: "12:00 PM",
              title: "Check-out & Beach Time",
              description: "Final relaxation at Calangute",
              cost: 0,
              type: "activity",
              icon: Heart,
              whyThis: "Last moments to soak in the Goan beach vibes before departure."
            },
            {
              id: "airport-return",
              time: "3:00 PM",
              title: "Airport Transfer",
              description: "Private cab to Dabolim Airport",
              cost: 800,
              type: "transport",
              icon: Car,
              whyThis: "Comfortable transfer ensuring timely arrival for your flight."
            },
            {
              id: "return-flight",
              time: "5:30 PM",
              title: "Return Flight to Bengaluru",
              description: "Evening flight (IndiGo)",
              cost: 9500,
              type: "transport",
              icon: Plane,
              whyThis: "Evening departure allows full day exploration and convenient arrival time in Bengaluru."
            }
          ];
        default:
          return [];
      }
    })()
  }))
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

  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case 'transport': return 'Transport';
      case 'accommodation': return 'Stay';
      case 'activity': return 'Activity';
      default: return 'Experience';
    }
  };

  if (showCart) {
    return <BookingCart onBack={() => setShowCart(false)} selectedItems={selectedItems} />;
  }

  const tripDates = getTripDates();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-trust text-trust-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onBack} className="text-trust-foreground hover:bg-trust-foreground/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Planning
            </Button>
            
            <Badge className="bg-trust-foreground/10 text-trust-foreground border-trust-foreground/20">
              <Zap className="w-4 h-4 mr-2" />
              AI Generated
            </Badge>
          </div>
          
          <Badge className="bg-trust-foreground/20 text-trust-foreground border-trust-foreground/30 mb-3">
            Demo Journey: Bengaluru to Goa
          </Badge>
          
          <h1 className="text-4xl font-bold mb-2">Your {mockItinerary.destination} Adventure</h1>
          <div className="flex flex-wrap gap-6 text-trust-foreground/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {tripDates.start} - {tripDates.end}
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
                  <DayRouteMap activities={day.activities} dayNumber={day.day} />
                  
                  <div className="space-y-4">
                    {day.activities.map((activity) => {
                      const IconComponent = activity.icon;
                      return (
                        <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(activity.id)}
                            onChange={() => toggleItemSelection(activity.id)}
                            className="mt-2"
                          />
                          
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Clock className="w-4 h-4 text-muted-foreground" />
                                  <span className="font-medium">{activity.time}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {getActivityTypeLabel(activity.type)}
                                  </Badge>
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
                                <div className="font-bold text-lg">
                                  {activity.cost === 0 ? 'Free' : `₹${activity.cost.toLocaleString()}`}
                                </div>
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
                      );
                    })}
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
                      <span>Flights</span>
                      <span>₹19,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accommodation</span>
                      <span>₹8,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Activities</span>
                      <span>₹15,700</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transport</span>
                      <span>₹1,600</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>₹44,300</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    Key Destinations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Calangute & Baga</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span>Old Goa Heritage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-trust rounded-full" />
                      <span>Palolem Beach</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Dudhsagar Falls</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-trust" />
                    Hidden Gems (4)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-accent" />
                      <span className="text-sm">Terra Paraiso Resort</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-accent" />
                      <span className="text-sm">Tito's Lane Walk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-accent" />
                      <span className="text-sm">Fontainhas Quarter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-accent" />
                      <span className="text-sm">Cabo de Rama Fort</span>
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
          mockData={mockItinerary.days.flatMap(day => day.activities).find(a => a.id === showWhyThis)}
        />
      )}
    </div>
  );
};