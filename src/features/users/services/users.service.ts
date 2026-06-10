import { api } from '@/lib/api'
// import type { UserProfile } from '../types'

/**
 * Users API service.
 * Add your user-related API calls here.
 */
export const usersService = {
  // getAll: () => api<UserProfile[]>('/users'),
  // getById: (id: string) => api<UserProfile>(`/users/${id}`),
  // create: (data: Partial<UserProfile>) => api('/users', { method: 'POST', body: data }),
  // update: (id: string, data: Partial<UserProfile>) => api(`/users/${id}`, { method: 'PATCH', body: data }),
  // delete: (id: string) => api(`/users/${id}`, { method: 'DELETE' }),
}

// Suppress unused import warning during development
void api
