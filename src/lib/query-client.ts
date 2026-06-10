import { QueryClient } from '@tanstack/react-query'

/**
 * Shared QueryClient instance.
 *
 * - staleTime: 5 minutes (reduce unnecessary refetches)
 * - retry: 1 (don't hammer the server)
 * - refetchOnWindowFocus: false (admin panels usually don't need this)
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
