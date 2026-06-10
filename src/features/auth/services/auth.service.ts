import { api } from '@/lib/api'
import type { LoginCredentials, LoginResponse } from '../types'

/**
 * Auth API service.
 * All auth-related API calls go here.
 */
export const authService = {
  login: (credentials: LoginCredentials) =>
    api<LoginResponse>('/auth/login', {
      method: 'POST',
      body: credentials,
    }),

  logout: () =>
    api('/auth/logout', {
      method: 'POST',
    }),

  me: () =>
    api<LoginResponse>('/auth/me'),
}
