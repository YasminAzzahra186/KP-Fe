import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthGuard } from './guards/auth-guard'
import { RoleGuard } from './guards/role-guard'
import { AdminLayout } from '@/shared/components/layout/admin-layout'
import { UserLayout } from '@/shared/components/layout/user-layout'
import { useAuth } from '@/features/auth/hooks/use-auth'

// Auth pages
import { LoginPage } from '@/features/auth/pages/login-page'

// Common/Admin pages
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page'
import { UsersPage } from '@/features/users/pages/users-page'
import { ProjectsPage } from '@/features/projects/pages/projects-page'
import { ProjectDetailPage } from '@/features/projects/pages/project-detail-page'
import { SprintDetailPage } from '@/features/projects/pages/sprint-detail-page'
import { TimerPage } from '@/features/timer/pages/timer-page'
import { GpsPage } from '@/features/gps/pages/gps-page'
import { AbsensiPage } from '@/features/absensi/pages/absensi-page'
import { CalendarPage } from '@/features/calendar/pages/calendar-page'
import { ReportPage } from '@/features/report/pages/report-page'
import { SettingsPage } from '@/features/settings/pages/settings-page'

// Error pages
import { NotFoundPage } from '@/app/pages/not-found-page'

/**
 * Directs the root URL `/` to the correct dashboard based on user role.
 */
function RootRedirect() {
  const { user } = useAuth()
  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }
  return <Navigate to="/dashboard" replace />
}

/**
 * Application route definitions.
 *
 * Structure:
 * - /login                      → Public (LoginPage)
 * - /                           → Role-based redirect
 *
 * - USER PORTAL (UserLayout)
 *   - /dashboard                → User Dashboard
 *   - /timer                    → User Timer Page
 *   - /absensi                  → User Attendance Page
 *
 * - ADMIN PORTAL (AdminLayout + RoleGuard)
 *   - /admin/dashboard          → Admin Dashboard
 *   - /admin/users              → Manage Users
 *   - /admin/projects           → Manage Projects
 *   - /admin/kanban             → Admin Kanban Board
 *   - /admin/timer              → Admin Timer Overview
 *   - /admin/gps                → Admin GPS Tracking
 *   - /admin/absensi            → Admin Attendance Overview
 *   - /admin/calendar           → Admin Calendar
 *   - /admin/report             → Admin Reports
 *   - /admin/settings           → Admin Settings
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Root redirect */}
      <Route
        path="/"
        element={
          <AuthGuard>
            <RootRedirect />
          </AuthGuard>
        }
      />

      {/* 1. USER PORTAL ROUTES (wrapped in UserLayout) */}
      <Route
        element={
          <AuthGuard>
            <UserLayout />
          </AuthGuard>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/absensi" element={<AbsensiPage />} />
      </Route>

      {/* 2. ADMIN PORTAL ROUTES (wrapped in AdminLayout + RoleGuard) */}
      <Route
        path="/admin"
        element={
          <AuthGuard>
            <RoleGuard allowedRoles={['admin']}>
              <AdminLayout />
            </RoleGuard>
          </AuthGuard>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<ProjectDetailPage />} />
        <Route path="projects/:id/sprints/:sprintId" element={<SprintDetailPage />} />
        <Route path="timer" element={<TimerPage />} />
        <Route path="gps" element={<GpsPage />} />
        <Route path="absensi" element={<AbsensiPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* 404 Catch All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
