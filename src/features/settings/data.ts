// Static Mock-up Data for Settings Page

export const pushNotificationsList = [
  { id: 'task-assigned', label: 'Task Assigned', defaultChecked: true },
  { id: 'due-soon', label: 'Due Soon', defaultChecked: true },
  { id: 'mention', label: 'Mention', defaultChecked: true },
  { id: 'sprint-reminder', label: 'Sprint Reminder', defaultChecked: false },
  { id: 'daily-digest', label: 'Daily Digest', defaultChecked: false },
]

export const emailNotificationsList = [
  { id: 'weekly-report', label: 'Weekly Report', defaultChecked: true },
  { id: 'monthly-digest', label: 'Monthly Digest', defaultChecked: true },
]

export const activeSessionsList = [
  { id: 1, browser: 'Chrome', os: 'Windows', lastActive: '2 min ago', current: true },
  { id: 2, browser: 'Safari', os: 'macOS', lastActive: '1 hour ago', current: false },
]
