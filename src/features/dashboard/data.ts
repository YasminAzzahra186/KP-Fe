import { BarChart3, Users, FolderKanban, Clock } from 'lucide-react'
import type { DashboardStat } from './types'

export const dashboardStats: DashboardStat[] = [
  { label: 'Total Users', value: '—', icon: Users, color: 'text-blue-500 bg-blue-500/10' },
  { label: 'Active Projects', value: '—', icon: FolderKanban, color: 'text-emerald-500 bg-emerald-500/10' },
  { label: 'Hours Tracked', value: '—', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
  { label: 'Reports', value: '—', icon: BarChart3, color: 'text-violet-500 bg-violet-500/10' },
]
