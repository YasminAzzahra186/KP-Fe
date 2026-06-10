export interface TimeEntry {
  id: string
  userId: string
  projectId: string
  startTime: string
  endTime?: string
  duration?: number
  description?: string
}
