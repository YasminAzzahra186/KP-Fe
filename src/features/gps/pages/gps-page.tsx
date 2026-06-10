import { PlaceholderPage } from '@/shared/components/placeholder-page'
import { MapPin } from 'lucide-react'

export function GpsPage() {
  return (
    <PlaceholderPage
      title="GPS Tracking"
      description="Real-time GPS location tracking (Leaflet.js)."
      icon={MapPin}
    />
  )
}
