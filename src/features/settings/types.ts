export interface AppSettings {
  appName: string
  timezone: string
  language: string
  workHoursPerDay: number
  notifications: {
    email: boolean
    push: boolean
  }
}
