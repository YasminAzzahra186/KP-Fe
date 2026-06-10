export type { User } from './stores/auth.store'

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: {
    id: string
    name: string
    email: string
    role: string
    avatar?: string
  }
}
