import { useAuth } from '@/features/auth/hooks/use-auth'
import { dashboardStats } from '../data'

/**
 * Dashboard page — landing page after login.
 * Shows overview stats and placeholder content.
 */
export function DashboardPage() {
  const { user } = useAuth()

  const stats = dashboardStats

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.name || 'Admin'} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here's an overview of your tracking application.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Activity feed will be displayed here.
          </p>
          <div className="mt-4 flex h-48 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
            Connect to backend API
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Chart Overview</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Charts (Recharts) will be rendered here.
          </p>
          <div className="mt-4 flex h-48 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
            Connect to backend API
          </div>
        </div>
      </div>
    </div>
  )
}
