import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Timer,
  MapPin,
  UserCheck,
  Calendar,
  BarChart3,
  Settings,
} from 'lucide-react'
import type { NavGroup } from '@/shared/types/navigation'

// ini adalah data daftar navigation untuk side bar admin
export const sidebarNavigation: NavGroup[] = [
  {
    label: 'Main',
    items: [
      {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: 'Management',
    items: [
      {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
      },
      {
        title: 'Projects',
        href: '/admin/projects',
        icon: FolderKanban,
      },
    ],
  },
  {
    label: 'Tracking',
    items: [
      {
        title: 'Timer',
        href: '/admin/timer',
        icon: Timer,
      },
      {
        title: 'GPS',
        href: '/admin/gps',
        icon: MapPin,
      },
      {
        title: 'Absensi',
        href: '/admin/absensi',
        icon: UserCheck,
      },
    ],
  },
  {
    label: 'Other',
    items: [
      {
        title: 'Calendar',
        href: '/admin/calendar',
        icon: Calendar,
      },
      {
        title: 'Report',
        href: '/admin/report',
        icon: BarChart3,
      },
      {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings,
      },
    ],
  },
]
