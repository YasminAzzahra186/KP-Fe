import { useState } from 'react'
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Import Shadcn UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Import Komponen Modal yang baru dibuat
import { CreateEventDialog } from '@/features/calendar/components/create-event-dialog'

// --- DATA STATIS ---
export const calendarDays = [
  { date: 30, isCurrentMonth: false, dots: [] },
  { date: 31, isCurrentMonth: false, dots: [] },
  { date: 1, isCurrentMonth: true, dots: ['bg-primary'] },
  { date: 2, isCurrentMonth: true, dots: [] },
  { date: 3, isCurrentMonth: true, dots: [] },
  { date: 4, isCurrentMonth: true, dots: ['bg-emerald-500'] },
  { date: 5, isCurrentMonth: true, dots: ['bg-amber-500'] },
  { date: 6, isCurrentMonth: true, dots: [] },
  { date: 7, isCurrentMonth: true, dots: [] },
  { date: 8, isCurrentMonth: true, dots: ['bg-primary', 'bg-destructive'] },
  { date: 9, isCurrentMonth: true, dots: [] },
  { date: 10, isCurrentMonth: true, dots: ['bg-emerald-500'] },
  { date: 11, isCurrentMonth: true, dots: [] },
  { date: 12, isCurrentMonth: true, dots: [] },
  { date: 13, isCurrentMonth: true, dots: ['bg-amber-500'] },
  { date: 14, isCurrentMonth: true, dots: [] },
  { date: 15, isCurrentMonth: true, isToday: true, dots: [] },
  { date: 16, isCurrentMonth: true, dots: [] },
  { date: 17, isCurrentMonth: true, dots: [] },
  { date: 18, isCurrentMonth: true, dots: [] },
  { date: 19, isCurrentMonth: true, dots: ['bg-primary'] },
  { date: 20, isCurrentMonth: true, dots: ['bg-destructive'] },
  { date: 21, isCurrentMonth: true, dots: [] },
  { date: 22, isCurrentMonth: true, dots: [] },
  { date: 23, isCurrentMonth: true, dots: [] },
  { date: 24, isCurrentMonth: true, dots: [] },
  { date: 25, isCurrentMonth: true, dots: [] },
  { date: 26, isCurrentMonth: true, dots: [] },
  { date: 27, isCurrentMonth: true, dots: [] },
  { date: 28, isCurrentMonth: true, dots: [] },
  { date: 29, isCurrentMonth: true, dots: ['bg-emerald-500'] },
  { date: 30, isCurrentMonth: true, dots: [] },
  { date: 1, isCurrentMonth: false, dots: [] },
  { date: 2, isCurrentMonth: false, dots: [] },
  { date: 3, isCurrentMonth: false, dots: [] },
  { date: 4, isCurrentMonth: false, dots: [] },
  { date: 5, isCurrentMonth: false, dots: [] },
];

export const upcomingEvents = [
  {
    id: 1,
    time: '09:00-10:00',
    title: 'Sprint Planning',
    type: 'Meeting',
    attendees: 'Andi, Siti, Budi',
    borderClass: 'border-l-primary',
    badgeClass: 'bg-primary/10 text-primary dark:bg-primary/20',
  },
  {
    id: 2,
    time: '14:00-16:00',
    title: 'Design Review',
    type: 'Task',
    attendees: 'Budi, Dewi',
    borderClass: 'border-l-emerald-500',
    badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 3,
    time: 'All day',
    title: 'Siti Leave',
    type: 'Leave',
    attendees: 'Personal',
    borderClass: 'border-l-amber-500',
    badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  {
    id: 4,
    time: 'All day',
    title: 'Public Holiday',
    type: 'Holiday',
    attendees: 'National',
    borderClass: 'border-l-destructive',
    badgeClass: 'bg-destructive/10 text-destructive',
  },
];

const filters = ['All', 'Tasks', 'Meetings', 'Leave'];
// -------------------

export function CalendarPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  // State untuk mengontrol pop-up Create Event
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans p-6">
      
      {/* Top Navigation / Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-card border border-border shadow-sm">
          <CalendarIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex items-center gap-3">
          {/* Tombol yang akan membuka Modal */}
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 shadow-sm"
          >
            <Plus className="h-4 w-4" /> Create Event
          </Button>
          <Button variant="outline" className="bg-card shadow-sm border-border">
            Today
          </Button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        
        {/* LEFT: Calendar View */}
        <Card className="shadow-sm border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-6 pt-6 px-8">
            <CardTitle className="text-xl font-bold text-foreground">June 2026</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8 border-border">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 border-border">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid grid-cols-7 text-center mb-6">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-sm font-semibold text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-y-6 gap-x-2 text-center">
              {calendarDays.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center justify-start min-h-[48px]">
                  <div 
                    className={cn(
                      "flex items-center justify-center h-9 w-9 rounded-full text-sm font-semibold transition-colors cursor-pointer",
                      !day.isCurrentMonth && "text-muted-foreground/40",
                      day.isCurrentMonth && !day.isToday && "text-foreground hover:bg-muted",
                      day.isToday && "bg-primary/20 text-primary"
                    )}
                  >
                    {day.date}
                  </div>
                  
                  <div className="flex gap-1 mt-1 h-1.5">
                    {day.dots.map((dotColor, dotIdx) => (
                      <div key={dotIdx} className={cn("h-1.5 w-1.5 rounded-full", dotColor)} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* RIGHT: Upcoming Events Sidebar */}
        <Card className="shadow-sm border border-border bg-card">
          <CardHeader className="pb-4 pt-6 px-6">
            <CardTitle className="text-lg font-bold text-foreground">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
              {filters.map(filter => (
                <Badge 
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer rounded-full px-4 py-1.5 text-xs transition-colors shadow-none font-semibold",
                    activeFilter === filter 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "text-muted-foreground border-border hover:text-foreground"
                  )}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Badge>
              ))}
            </div>

            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div 
                  key={event.id} 
                  className={cn(
                    "p-4 rounded-xl border border-border bg-card hover:bg-muted/40 transition-colors flex flex-col gap-1",
                    event.borderClass,
                    "border-l-4" 
                  )}
                >
                  <p className="text-xs font-semibold text-muted-foreground">{event.time}</p>
                  <p className="text-sm font-bold text-foreground">{event.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className={cn("border-none px-2 py-0.5 rounded-md font-semibold text-[11px]", event.badgeClass)}>
                      {event.type}
                    </Badge>
                    <span className="text-[13px] font-medium text-muted-foreground truncate">
                      {event.attendees}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
          </CardContent>
        </Card>
      </div>

      {/* Render komponen pop-up di sini */}
      <CreateEventDialog 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen} 
      />

    </div>
  )
}