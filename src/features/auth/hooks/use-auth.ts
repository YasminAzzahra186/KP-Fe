import { useAuthStore } from '../stores/auth.store'

/**
 * Hook to access auth state and actions.
 * Wraps the Zustand store for a cleaner API.
 */
export function useAuth() {
  const { user, isAuthenticated, setUser, logout } = useAuthStore()

  return {
    user,
    isAuthenticated,
    setUser,
    logout,
  }
}
