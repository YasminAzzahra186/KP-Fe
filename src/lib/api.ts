import { ofetch } from 'ofetch'

/**
 * Configured ofetch instance for API calls.
 *
 * - Base URL from env variable
 * - credentials: 'include' for httpOnly cookie (JWT)
 * - Auto redirect to /login on 401
 */
export const api = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  onResponseError({ response }) {
    if (response.status === 401) {
      window.location.href = '/login'
    }
  },
})
