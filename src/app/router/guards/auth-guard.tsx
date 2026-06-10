import { Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/use-auth'
import type { ReactNode } from 'react'

/**
 * Protects routes that require authentication.
 * Redirects to /login if user is not authenticated.
 */
export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
