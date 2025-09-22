import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Route } from 'lucide-react';

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  cost: number;
  type: string;
  icon: any; // Lucide icon component
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  whyThis?: string;
  hiddenGem?: boolean;
}

interface DayRouteMapProps {
  activities: Activity[];
  dayNumber: number;
}

// Mock coordinates for Goa locations
const mockLocations = {
  'hotel': { lat: 15.2993, lng: 74.1240, address: 'Panaji, Goa' },
  'beach': { lat: 15.2832, lng: 73.9712, address: 'Calangute Beach, Goa' },
  'fort': { lat: 15.4909, lng: 73.8278, address: 'Aguada Fort, Goa' },
  'restaurant': { lat: 15.2760, lng: 73.9673, address: 'Baga Beach, Goa' },
  'market': { lat: 15.2832, lng: 74.1240, address: 'Mapusa Market, Goa' },
  'temple': { lat: 15.3004, lng: 74.1402, address: 'Mangeshi Temple, Goa' },
  'wildlife': { lat: 15.4218, lng: 74.1100, address: 'Bhagwan Mahavir Sanctuary, Goa' },
  'church': { lat: 15.5010, lng: 73.9120, address: 'Basilica of Bom Jesus, Goa' },
  'cafe': { lat: 15.2760, lng: 73.9673, address: 'Anjuna Beach, Goa' },
  'spice': { lat: 15.3820, lng: 74.1500, address: 'Sahakari Spice Farm, Goa' }
};

const getLocationForActivity = (activity: Activity, index: number): { lat: number; lng: number; address: string } => {
  const type = activity.type.toLowerCase();
  if (mockLocations[type as keyof typeof mockLocations]) {
    return mockLocations[type as keyof typeof mockLocations];
  }
  
  // Fallback with slight variations for different activities
  const baseLocation = { lat: 15.2993 + (index * 0.01), lng: 74.1240 + (index * 0.01) };
  return {
    ...baseLocation,
    address: `${activity.title}, Goa`
  };
};

export const DayRouteMap: React.FC<DayRouteMapProps> = ({ activities, dayNumber }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [totalDistance, setTotalDistance] = useState<string>('');
  const [totalDuration, setTotalDuration] = useState<string>('');

  const initializeMap = async (googleMapsApiKey: string) => {
    if (!mapRef.current || !googleMapsApiKey) return;

    try {
      const loader = new Loader({
        apiKey: googleMapsApiKey,
        version: 'weekly',
        libraries: ['geometry', 'places']
      });

      const google = await loader.load();
      
      const mapInstance = new google.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: 15.2993, lng: 74.1240 }, // Goa center
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      setMap(mapInstance);

      // Add markers and route
      const waypoints: google.maps.LatLng[] = [];
      const infoWindows: google.maps.InfoWindow[] = [];

      activities.forEach((activity, index) => {
        const location = getLocationForActivity(activity, index);
        const position = new google.maps.LatLng(location.lat, location.lng);
        waypoints.push(position);

        const marker = new google.maps.Marker({
          position,
          map: mapInstance,
          title: activity.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: index === 0 ? '#22c55e' : index === activities.length - 1 ? '#ef4444' : '#3b82f6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
          label: {
            text: (index + 1).toString(),
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 'bold'
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-2 max-w-xs">
              <h3 class="font-semibold text-sm mb-1">${activity.title}</h3>
              <p class="text-xs text-gray-600 mb-1">${activity.time}</p>
              <p class="text-xs mb-1">${activity.description}</p>
              <p class="text-xs font-medium">₹${activity.cost}</p>
              <p class="text-xs text-gray-500">${location.address}</p>
            </div>
          `
        });

        infoWindows.push(infoWindow);

        marker.addListener('click', () => {
          infoWindows.forEach(iw => iw.close());
          infoWindow.open(mapInstance, marker);
        });
      });

      // Create route if there are multiple waypoints
      if (waypoints.length > 1) {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: '#3b82f6',
            strokeWeight: 3,
            strokeOpacity: 0.8
          }
        });

        directionsRenderer.setMap(mapInstance);

        const request: google.maps.DirectionsRequest = {
          origin: waypoints[0],
          destination: waypoints[waypoints.length - 1],
          waypoints: waypoints.slice(1, -1).map(wp => ({ location: wp, stopover: true })),
          travelMode: google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true
        };

        directionsService.route(request, (result, status) => {
          if (status === 'OK' && result) {
            directionsRenderer.setDirections(result);
            
            const route = result.routes[0];
            let totalDistanceM = 0;
            let totalDurationS = 0;
            
            route.legs.forEach(leg => {
              if (leg.distance?.value) totalDistanceM += leg.distance.value;
              if (leg.duration?.value) totalDurationS += leg.duration.value;
            });
            
            setTotalDistance(`${(totalDistanceM / 1000).toFixed(1)} km`);
            setTotalDuration(`${Math.round(totalDurationS / 60)} min`);
          }
        });
      }

      // Adjust map bounds to fit all markers
      if (waypoints.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        waypoints.forEach(point => bounds.extend(point));
        mapInstance.fitBounds(bounds);
        
        if (waypoints.length === 1) {
          mapInstance.setZoom(15);
        }
      }

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setIsApiKeySet(true);
      initializeMap(apiKey.trim());
    }
  };

  useEffect(() => {
    if (isApiKeySet && apiKey) {
      initializeMap(apiKey);
    }
  }, [activities, isApiKeySet]);

  if (!isApiKeySet) {
    return (
      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Day {dayNumber} Route Map</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Enter your Google Maps API key to view the interactive route map for this day's activities.
          </p>
          <div className="space-y-2">
            <Label htmlFor="api-key">Google Maps API Key</Label>
            <div className="flex gap-2">
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your Google Maps API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleApiKeySubmit} disabled={!apiKey.trim()}>
                Load Map
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your API key from the <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a>
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 mb-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Day {dayNumber} Route Map</h3>
          </div>
          {totalDistance && totalDuration && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Route className="h-4 w-4" />
                <span>{totalDistance}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{totalDuration}</span>
              </div>
            </div>
          )}
        </div>
        
        <div 
          ref={mapRef} 
          className="w-full h-64 rounded-lg border"
          style={{ minHeight: '256px' }}
        />
        
        <div className="text-xs text-muted-foreground">
          🟢 Start • 🔵 Activities • 🔴 End • Click markers for details
        </div>
      </div>
    </Card>
  );
};