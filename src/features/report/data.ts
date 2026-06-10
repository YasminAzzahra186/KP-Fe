// Static Mock-up Data for Report Page

export const hoursPerUserData = [
  { name: 'Andi', hours: 42, percentage: 100 },
  { name: 'Siti', hours: 38, percentage: 90 },
  { name: 'Budi', hours: 32, percentage: 76 },
  { name: 'Hendra', hours: 30, percentage: 71 },
  { name: 'Dewi', hours: 25, percentage: 59 },
]

export const dailyTrendData = [
  { day: 'Mon', hours: 32 },
  { day: 'Tue', hours: 45 },
  { day: 'Wed', hours: 55 },
  { day: 'Thu', hours: 38 },
  { day: 'Fri', hours: 48 },
  { day: 'Sat', hours: 15 },
  { day: 'Sun', hours: 10 },
]

export const tableDataTimesheet = [
  { id: 1, user: 'Andi B.', date: '30 May', project: 'Office Tracker', hours: '8h', overtime: '0h', status: 'Approved' },
  { id: 2, user: 'Siti R.', date: '30 May', project: 'Mobile App', hours: '9h', overtime: '1h', status: 'Pending' },
  { id: 3, user: 'Budi D.', date: '30 May', project: 'Design System', hours: '7h', overtime: '0h', status: 'Approved' },
  { id: 4, user: 'Hendra H.', date: '30 May', project: 'Office Tracker', hours: '10h', overtime: '2h', status: 'Pending' },
]

export const statusDistribution = [
  { name: 'Done', value: 45, color: '#10B981' }, // Emerald
  { name: 'In Progress', value: 25, color: '#3B82F6' }, // Blue
  { name: 'Review', value: 15, color: '#F59E0B' }, // Amber
  { name: 'Todo', value: 15, color: '#94A3B8' }, // Slate
]

export const tasksPerUserAnalytics = [
  { name: 'Andi', planned: 60, actual: 40 },
  { name: 'Siti', planned: 55, actual: 45 },
  { name: 'Budi', planned: 45, actual: 55 },
  { name: 'Hendra', planned: 40, actual: 60 },
]

export const plannedVsActualTrend = [
  { day: 'Mon', planned: 8, actual: 7 },
  { day: 'Tue', planned: 10, actual: 9 },
  { day: 'Wed', planned: 12, actual: 11 },
  { day: 'Thu', planned: 8, actual: 8 },
  { day: 'Fri', planned: 10, actual: 12 },
  { day: 'Sat', planned: 4, actual: 2 },
  { day: 'Sun', planned: 2, actual: 1 },
]

export const tableDataAnalytics = [
  { id: 1, task: 'Auth Module', assignee: 'Andi', priority: 'High', status: 'In Progress', planned: '16h', actual: '14h', variance: '-2h', varianceColor: 'text-emerald-500' },
  { id: 2, task: 'Dashboard UI', assignee: 'Budi', priority: 'Medium', status: 'Review', planned: '12h', actual: '14h', variance: '+2h', varianceColor: 'text-red-500' },
  { id: 3, task: 'API Integration', assignee: 'Hendra', priority: 'High', status: 'In Progress', planned: '10h', actual: '6h', variance: '-4h', varianceColor: 'text-emerald-500' },
]
