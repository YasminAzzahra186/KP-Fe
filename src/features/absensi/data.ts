// Attendance Record Type
export interface AttendanceRecord {
  id: number
  name: string
  dates: Record<string, 'hadir' | 'izin' | 'sakit' | 'alpha' | 'libur'>
}

// Status Type
export type AttendanceStatus = 'hadir' | 'izin' | 'sakit' | 'alpha' | 'libur'

// Summary Statistics
export const attendanceSummary = {
  totalDays: 14,
  hadir: {
    count: 156,
    percentage: 83,
  },
  izin: {
    count: 18,
    percentage: 9.6,
  },
  sakit: {
    count: 8,
    percentage: 4.3,
  },
  alpha: {
    count: 6,
    percentage: 3.2,
  },
}

// Attendance Records Table Data
export const attendanceRecords: AttendanceRecord[] = [
  {
    id: 1,
    name: 'Andi P.',
    dates: {
      'Mon 2': 'hadir',
      'Tue 3': 'hadir',
      'Wed 4': 'hadir',
      'Thu 5': 'hadir',
      'Fri 6': 'izin',
      'Sat 7': 'libur',
      'Sun 8': 'libur',
    },
  },
  {
    id: 2,
    name: 'Siti R.',
    dates: {
      'Mon 2': 'hadir',
      'Tue 3': 'hadir',
      'Wed 4': 'sakit',
      'Thu 5': 'sakit',
      'Fri 6': 'hadir',
      'Sat 7': 'libur',
      'Sun 8': 'libur',
    },
  },
  {
    id: 3,
    name: 'Bambang',
    dates: {
      'Mon 2': 'hadir',
      'Tue 3': 'izin',
      'Wed 4': 'izin',
      'Thu 5': 'alpha',
      'Fri 6': 'hadir',
      'Sat 7': 'libur',
      'Sun 8': 'libur',
    },
  },
  {
    id: 4,
    name: 'Devi N.',
    dates: {
      'Mon 2': 'hadir',
      'Tue 3': 'hadir',
      'Wed 4': 'hadir',
      'Thu 5': 'hadir',
      'Fri 6': 'hadir',
      'Sat 7': 'libur',
      'Sun 8': 'libur',
    },
  },
  {
    id: 5,
    name: 'Rina W.',
    dates: {
      'Mon 2': 'alpha',
      'Tue 3': 'alpha',
      'Wed 4': 'izin',
      'Thu 5': 'hadir',
      'Fri 6': 'hadir',
      'Sat 7': 'libur',
      'Sun 8': 'libur',
    },
  },
  {
    id: 6,
    name: 'Hendra S.',
    dates: {
      'Mon 2': 'hadir',
      'Tue 3': 'hadir',
      'Wed 4': 'hadir',
      'Thu 5': 'hadir',
      'Fri 6': 'hadir',
      'Sat 7': 'libur',
      'Sun 8': 'libur',
    },
  },
  {
    id: 7,
    name: 'Putri A.',
    dates: {
      'Mon 2': 'hadir',
      'Tue 3': 'hadir',
      'Wed 4': 'izin',
      'Thu 5': 'hadir',
      'Fri 6': 'hadir',
      'Sat 7': 'libur',
      'Sun 8': 'libur',
    },
  },
  {
    id: 8,
    name: 'Budi L.',
    dates: {
      'Mon 2': 'hadir',
      'Tue 3': 'hadir',
      'Wed 4': 'hadir',
      'Thu 5': 'hadir',
      'Fri 6': 'izin',
      'Sat 7': 'libur',
      'Sun 8': 'libur',
    },
  },
  {
    id: 9,
    name: 'Sinta M.',
    dates: {
      'Mon 2': 'hadir',
      'Tue 3': 'sakit',
      'Wed 4': 'sakit',
      'Thu 5': 'sakit',
      'Fri 6': 'hadir',
      'Sat 7': 'libur',
      'Sun 8': 'libur',
    },
  },
  {
    id: 10,
    name: 'Ahmad R.',
    dates: {
      'Mon 2': 'hadir',
      'Tue 3': 'hadir',
      'Wed 4': 'hadir',
      'Thu 5': 'hadir',
      'Fri 6': 'hadir',
      'Sat 7': 'libur',
      'Sun 8': 'libur',
    },
  },
  {
    id: 11,
    name: 'Nurul F.',
    dates: {
      'Mon 2': 'izin',
      'Tue 3': 'izin',
      'Wed 4': 'hadir',
      'Thu 5': 'hadir',
      'Fri 6': 'hadir',
      'Sat 7': 'libur',
      'Sun 8': 'libur',
    },
  },
  {
    id: 12,
    name: 'Yusuf B.',
    dates: {
      'Mon 2': 'hadir',
      'Tue 3': 'hadir',
      'Wed 4': 'hadir',
      'Thu 5': 'hadir',
      'Fri 6': 'hadir',
      'Sat 7': 'libur',
      'Sun 8': 'libur',
    },
  },
]

// Available Users for Filter
export const availableUsers = [
  { id: 'all', label: 'All Users (12)' },
  { id: '1', label: 'Andi P.' },
  { id: '2', label: 'Siti R.' },
  { id: '3', label: 'Bambang' },
  { id: '4', label: 'Devi N.' },
  { id: '5', label: 'Rina W.' },
  { id: '6', label: 'Hendra S.' },
  { id: '7', label: 'Putri A.' },
  { id: '8', label: 'Budi L.' },
  { id: '9', label: 'Sinta M.' },
  { id: '10', label: 'Ahmad R.' },
  { id: '11', label: 'Nurul F.' },
  { id: '12', label: 'Yusuf B.' },
]

// Available Status for Filter
export const availableStatus = [
  { id: 'all', label: 'All Status' },
  { id: 'hadir', label: 'Hadir' },
  { id: 'izin', label: 'Izin' },
  { id: 'sakit', label: 'Sakit' },
  { id: 'alpha', label: 'Alpha' },
  { id: 'libur', label: 'Libur' },
]

// Date columns for table
export const dateColumns = ['Mon 2', 'Tue 3', 'Wed 4', 'Thu 5', 'Fri 6', 'Sat 7', 'Sun 8']

// Status legend
export const statusLegend = [
  { key: 'hadir', label: 'Hadir', color: 'bg-emerald-500', emoji: '✓' },
  { key: 'izin', label: 'Izin', color: 'bg-amber-500', emoji: 'I' },
  { key: 'sakit', label: 'Sakit', color: 'bg-red-500', emoji: 'S' },
  { key: 'alpha', label: 'Alpha', color: 'bg-slate-400', emoji: 'A' },
  { key: 'libur', label: 'Libur', color: 'bg-gray-300', emoji: '—' },
]
