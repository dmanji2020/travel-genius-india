import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Shield, CreditCard, Check, Zap, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookingCartProps {
  onBack: () => void;
  selectedItems: string[];
}

const mockCartItems = [
  { id: "arrival", name: "Mumbai to Goa Flight", cost: 8500, type: "Transport" },
  { id: "checkin", name: "Sunset Beach Resort (7 nights)", cost: 24500, type: "Accommodation" },
  { id: "beach", name: "Calangute Beach Activities", cost: 1200, type: "Activities" },
];

export const BookingCart = ({ onBack, selectedItems }: BookingCartProps) => {
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const { toast } = useToast();

  const cartItems = mockCartItems.filter(item => selectedItems.includes(item.id));
  const subtotal = cartItems.reduce((sum, item) => sum + item.cost, 0);
  const taxes = Math.round(subtotal * 0.12); // 12% GST
  const total = subtotal + taxes;

  const handleBooking = async () => {
    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsBooking(false);
    setBookingComplete(true);
    
    toast({
      title: "Booking Confirmed! 🎉",
      description: "Your trip has been successfully booked. Check your email for details.",
    });
  };

  const triggerDemo = () => {
    setShowDemo(true);
    toast({
      title: "Demo: Flight Delayed! ✈️",
      description: "AI is re-planning your itinerary to accommodate the 2-hour delay...",
    });
    
    setTimeout(() => {
      toast({
        title: "Itinerary Updated! 🔄",
        description: "Hotel check-in moved to 3 PM, afternoon activity rescheduled. No extra cost!",
      });
      setShowDemo(false);
    }, 3000);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-lg w-full shadow-travel">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-trust rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-trust-foreground" />
            </div>
            <CardTitle className="text-2xl text-trust">Booking Confirmed!</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Your Goa adventure is all set! Booking confirmation sent to your email.
              </p>
              
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                Booking ID: EMT-2024-GOA-1234
              </Badge>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-trust" />
                EaseMyTrip Guarantees
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-trust" />
                  24/7 Support & Real-time Re-planning
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-trust" />
                  No Hidden Fees - Price Locked
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-trust" />
                  Free Cancellation up to 24hrs
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <Button variant="hero" className="w-full" onClick={triggerDemo} disabled={showDemo}>
                {showDemo ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-pulse" />
                    Demo: AI Re-planning...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Demo: Trigger Flight Delay
                  </>
                )}
              </Button>
              
              <Button variant="outline" className="w-full" onClick={onBack}>
                Plan Another Trip
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Itinerary
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Your Goa Trip Booking
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <Badge variant="outline" className="mt-1">{item.type}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹{item.cost.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card className="shadow-card border-trust/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-trust" />
                  <span className="font-semibold text-trust">EaseMyTrip Trust Promise</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-trust" />
                    <span>No Hidden Fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-trust" />
                    <span>Price Protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-trust" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="shadow-card sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>₹{taxes.toLocaleString()}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-trust/10 border border-trust/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-trust" />
                    <span className="font-medium text-trust">Total Transparency</span>
                  </div>
                  <p className="text-xs text-trust">
                    This is your final price. No surprise charges, no hidden fees, no booking hassles.
                  </p>
                </div>
                
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full" 
                  onClick={handleBooking}
                  disabled={isBooking}
                >
                  {isBooking ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-pulse" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Book Now - ₹{total.toLocaleString()}
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Secure payment powered by EaseMyTrip. Your booking is protected.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};