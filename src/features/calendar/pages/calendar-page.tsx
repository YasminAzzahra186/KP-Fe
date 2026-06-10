import { PlaceholderPage } from '@/shared/components/placeholder-page'
import { Calendar } from 'lucide-react'

export function CalendarPage() {
  return (
    <>
      <PlaceholderPage
        title="Calendar"
        description="Event calendar and scheduling (FullCalendar)."
        icon={Calendar}
      />
    </>
  )
}
