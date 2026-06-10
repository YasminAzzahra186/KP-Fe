export interface ReportFilter {
  startDate: string
  endDate: string
  userId?: string
  projectId?: string
  type: 'attendance' | 'timesheet' | 'project'
}

export interface ReportData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
  }[]
}
