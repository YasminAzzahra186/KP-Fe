import { Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/use-auth'
import type { ReactNode } from 'react'

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: string[]
}

/**
 * Guard to restrict access to routes based on user roles.
 * Must be wrapped inside <AuthGuard> to guarantee the user is logged in.
 */
export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user } = useAuth()

  if (!user || !allowedRoles.includes(user.role)) {
    // If user's role is not authorized, redirect to their default home
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
