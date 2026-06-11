import { useState } from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Search, 
  MapPin, 
  Layers, 
  Maximize, 
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Import Shadcn UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- DATA STATIS ---
export const userLocations = [
  {
    id: '1',
    name: 'Andi B.',
    initials: 'AB',
    address: 'Jl. Sudirman No. 12',
    updatedAt: 'Updated 2 min ago',
    status: 'online',
    color: 'bg-pink-500',
    lat: -7.9750, 
    lng: 112.6320
  },
  {
    id: '2',
    name: 'Siti R.',
    initials: 'SR',
    address: 'Jl. Thamrin No. 45',
    updatedAt: 'Updated 5 min ago',
    status: 'online',
    color: 'bg-amber-500',
    lat: -7.9810, 
    lng: 112.6350
  },
  {
    id: '3',
    name: 'Budi D.',
    initials: 'BD',
    address: 'Jl. Gatot Subroto',
    updatedAt: 'Updated 15 min ago',
    status: 'offline',
    color: 'bg-indigo-500',
    lat: -7.9710, 
    lng: 112.6280
  },
  {
    id: '4',
    name: 'Hendra H.',
    initials: 'HH',
    address: 'Jl. Kuningan No. 78',
    updatedAt: 'Updated 1 min ago',
    status: 'online',
    color: 'bg-blue-500',
    lat: -7.9850, 
    lng: 112.6300
  },
  {
    id: '5',
    name: 'Maya K.',
    initials: 'MK',
    address: 'Jl. Merdeka Barat No. 3',
    updatedAt: 'Updated 30 sec ago',
    status: 'online',
    color: 'bg-emerald-500',
    lat: -7.9680, 
    lng: 112.6390
  },
  {
    id: '6',
    name: 'Rizky A.',
    initials: 'RA',
    address: 'Jl. Ahmad Yani No. 58',
    updatedAt: 'Updated 32 min ago',
    status: 'offline',
    color: 'bg-green-600',
    lat: -7.9900, 
    lng: 112.6250
  }
];
// -------------------

// Helper function untuk membuat custom map marker dari HTML/Tailwind
const createCustomMarker = (initials: string, bgColorClass: string, status: string) => {
  const statusColor = status === 'online' ? 'bg-emerald-500' : 'bg-slate-400';
  
  const html = `
    <div class="relative flex h-9 w-9 items-center justify-center rounded-full text-white font-bold text-xs shadow-md ${bgColorClass} ring-2 ring-background">
      ${initials}
      <div class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ${statusColor} border-2 border-background"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

export function GpsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const onlineCount = userLocations.filter(u => u.status === 'online').length;
  const offlineCount = userLocations.filter(u => u.status === 'offline').length;

  const filteredUsers = userLocations.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pusat Peta (Malang Raya)
  const mapCenter: [number, number] = [-7.9797, 112.6304];

  return (
    <div className="flex flex-col gap-4 p-6 min-h-screen bg-background font-sans">
      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">GPS Tracking</h1>
      
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px]">
        
        {/* LEFT SIDEBAR: User List */}
        <Card className="w-full lg:w-[340px] flex flex-col shrink-0 border-border bg-card shadow-sm overflow-hidden">
          <CardContent className="p-4 flex flex-col h-full gap-4">
            
            {/* Stats & Filter */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  {onlineCount} Online
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-slate-400" />
                  {offlineCount} Offline
                </span>
              </div>
              <Button variant="secondary" size="sm" className="h-8 gap-1.5 bg-secondary/50">
                <Filter className="h-3.5 w-3.5" />
                Semua
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search user..." 
                className="pl-9 bg-background border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* User List Scrollable Area */}
            <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-1">
              {filteredUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("flex items-center justify-center h-10 w-10 rounded-full text-white font-bold text-sm shrink-0", user.color)}>
                      {user.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">{user.name}</span>
                      <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" />
                        {user.address}
                      </span>
                      <span className="text-[10px] text-muted-foreground/70 mt-0.5">
                        {user.updatedAt}
                      </span>
                    </div>
                  </div>
                  <div className={cn(
                    "h-2 w-2 rounded-full shrink-0",
                    user.status === 'online' ? "bg-emerald-500" : "bg-slate-400"
                  )} />
                </div>
              ))}
            </div>
            
          </CardContent>
        </Card>

        {/* RIGHT AREA: Map View */}
        <Card className="flex-1 relative overflow-hidden border-border bg-card shadow-sm rounded-xl">
          
          {/* Overlay Map UI Elements */}
          <div className="absolute top-4 left-4 z-[400] flex items-center gap-2">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm border-border shadow-sm px-3 py-1.5 flex items-center gap-2">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </div>
              <span className="font-semibold text-foreground">Live Map View</span>
            </Badge>
          </div>

          <div className="absolute top-4 right-4 z-[400] flex items-center gap-2">
            <Button variant="secondary" size="sm" className="bg-background/90 backdrop-blur-sm border-border shadow-sm gap-1.5 h-8">
              <Layers className="h-3.5 w-3.5" />
              Satelit
            </Button>
            <Button variant="secondary" size="sm" className="bg-background/90 backdrop-blur-sm border-border shadow-sm gap-1.5 h-8">
              <Maximize className="h-3.5 w-3.5" />
              Full Map
            </Button>
          </div>

          {/* Leaflet Map Component */}
          <div className="h-full w-full bg-slate-900 z-0">
            <MapContainer 
              center={mapCenter} 
              zoom={13} 
              zoomControl={false}
              className="h-full w-full"
            >
              {/* Dark mode map tile from CartoDB */}
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              
              <ZoomControl position="bottomright" />

              {/* Render User Markers */}
              {userLocations.map((user) => (
                <Marker 
                  key={user.id}
                  position={[user.lat, user.lng]}
                  icon={createCustomMarker(user.initials, user.color, user.status)}
                />
              ))}
            </MapContainer>
          </div>
          
        </Card>
      </div>
    </div>
  );
}