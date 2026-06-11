import { useAuth } from '@/features/auth/hooks/use-auth'
import { 
  ClipboardList, 
  Users, 
  Pin, 
  Timer, 
  BarChart3, 
  Circle,
  CalendarDays,
  Clock 
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Import Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// --- DATA STATIS ---
export const dashboardStats = [
  {
    label: 'Total Projects',
    value: '12',
    icon: ClipboardList,
    badgeText: '↑2 last month',
    badgeVariant: 'secondary',
    badgeClass: 'bg-primary/10 text-primary hover:bg-primary/20'
  },
  {
    label: 'Active Users',
    value: '8',
    icon: Users,
    badgeText: '3 online now',
    badgeVariant: 'secondary',
    badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
  },
  {
    label: 'Tasks Today',
    value: '14',
    icon: Pin,
    badgeText: '⚠️ 6 overdue',
    badgeVariant: 'secondary',
    badgeClass: 'bg-destructive/10 text-destructive hover:bg-destructive/20'
  },
  {
    label: 'Hours Today',
    value: '6h 45m',
    icon: Timer,
    badgeText: '8/12 logged',
    badgeVariant: 'secondary',
    badgeClass: 'bg-primary/10 text-primary hover:bg-primary/20'
  }
];

export const weeklyActivityData = [
  { day: 'Mon', height: 'h-[45%]', active: true },
  { day: 'Tue', height: 'h-[60%]', active: true },
  { day: 'Wed', height: 'h-[75%]', active: true },
  { day: 'Thu', height: 'h-[55%]', active: true },
  { day: 'Fri', height: 'h-[70%]', active: true },
  { day: 'Sat', height: 'h-[20%]', active: false },
  { day: 'Sun', height: 'h-[15%]', active: false },
];

export const onlineUsers = [
  { initials: 'AB', name: 'Andi B.', activity: 'Working on Office Tracker' },
  { initials: 'SR', name: 'Siti R.', activity: 'Reviewing pull requests' },
  { initials: 'BD', name: 'Budi D.', activity: 'Designing UI components' },
];

export const recentActivities = [
  { text: 'Andi created Task #142', time: '2 minutes ago' },
  { text: 'Siti completed Sprint 2', time: '1 hour ago' },
  { text: 'Budi uploaded mockup v3', time: '3 hours ago' },
  { text: 'Dewi joined Project #2', time: '5 hours ago' },
];

export const upcomingDeadlines = [
  { title: 'Sprint 3 Release', due: 'Due Today', indicatorColor: 'bg-destructive', borderClass: 'border-l-destructive bg-destructive/5' },
  { title: 'API Integration', due: 'Due Tomorrow', indicatorColor: 'bg-amber-500', borderClass: 'border-l-amber-500 bg-amber-500/5' },
  { title: 'Design Review', due: 'Due in 3 days', indicatorColor: 'bg-primary', borderClass: 'border-l-primary bg-primary/5' },
];
// -------------------

export function DashboardPage() {
  const { user } = useAuth();
  
  const todayDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-background font-sans">
      {/* Welcome Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Good morning, {user?.name || 'Andi'} 👋
        </h1>
        <p className="text-sm font-medium text-muted-foreground">
          {todayDate}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 w-full">
        {dashboardStats.map((stat) => (
          <Card key={stat.label} className="shadow-sm border border-border bg-card text-card-foreground">
            <CardContent className="p-5 flex flex-col justify-between h-[120px]">
              <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-2 text-muted-foreground text-[13px] font-semibold">
                  <stat.icon className="h-4 w-4" />
                  {stat.label}
                </div>
                <Badge 
                  variant={stat.badgeVariant as any} 
                  className={cn("font-semibold border-none px-2.5 py-0.5 shadow-none", stat.badgeClass)}
                >
                  {stat.badgeText}
                </Badge>
              </div>
              <p className="text-[32px] leading-none font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Section */}
      <Card className="shadow-sm border border-border bg-card text-card-foreground w-full">
        <CardHeader className="pb-0 pt-6 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle className="text-base font-bold text-foreground">Weekly Activity</CardTitle>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Hours logged this week</p>
        </CardHeader>
        <CardContent className="pt-6 pb-5">
          {/* Bar Chart Mockup Using CSS */}
          <div className="h-48 w-full flex items-end justify-between gap-2 sm:gap-4 border-b border-border pb-2">
            {weeklyActivityData.map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div 
                  className={cn(
                    "w-full rounded-t-sm transition-all group-hover:opacity-80",
                    bar.height,
                    bar.active ? "bg-primary" : "bg-primary/20"
                  )}
                />
                <span className="text-xs text-muted-foreground font-semibold">{bar.day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3-Column Bottom Layout */}
      <div className="grid gap-4 lg:grid-cols-3 w-full">
        
        {/* Online Now */}
        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardHeader className="pb-5 pt-6">
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 fill-emerald-500 text-emerald-500" />
              <CardTitle className="text-base font-bold text-foreground">Online Now</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {onlineUsers.map((u) => (
              <div key={u.initials} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                    {u.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{u.name}</p>
                    <p className="text-xs font-medium text-muted-foreground">{u.activity}</p>
                  </div>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardHeader className="pb-5 pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-bold text-foreground">Recent Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative border-l-2 border-border ml-2 space-y-6">
              {recentActivities.map((act, idx) => (
                <div key={idx} className="relative pl-6">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                  <p className="text-sm font-bold text-foreground">{act.text}</p>
                  <p className="text-xs font-medium text-muted-foreground mt-1">{act.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardHeader className="pb-5 pt-6">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-bold text-foreground">Upcoming Deadlines</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDeadlines.map((item, idx) => (
              <div 
                key={idx} 
                className={cn("p-4 rounded-lg border-l-4", item.borderClass)}
              >
                <p className="text-sm font-bold text-foreground">{item.title}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className={cn("h-2 w-2 rounded-full", item.indicatorColor)} />
                  <p className="text-xs font-semibold text-muted-foreground">{item.due}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}