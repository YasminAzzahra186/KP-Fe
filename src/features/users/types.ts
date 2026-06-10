// Users feature types
// Add your user-related types here

export interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  avatar?: string
  createdAt: string
}
