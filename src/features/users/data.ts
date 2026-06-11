// User Type
export interface User {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Manager' | 'Staff'
  status: 'Active' | 'Inactive'
  lastActive: string
  avatar: string
  color: string
}

// Users Table Data
export const usersData: User[] = [
  {
    id: 1,
    name: 'Andi Budiman',
    email: 'andi@office.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '2 min ago',
    avatar: 'AB',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Siti Rahmawati',
    email: 'siti@office.com',
    role: 'Manager',
    status: 'Active',
    lastActive: '1 hour ago',
    avatar: 'SR',
    color: 'bg-pink-500',
  },
  {
    id: 3,
    name: 'Budi Darmawan',
    email: 'budi@office.com',
    role: 'Staff',
    status: 'Active',
    lastActive: '3 hours ago',
    avatar: 'BD',
    color: 'bg-emerald-500',
  },
  {
    id: 4,
    name: 'Dewi Wulandari',
    email: 'dewi@office.com',
    role: 'Staff',
    status: 'Inactive',
    lastActive: 'Yesterday',
    avatar: 'DW',
    color: 'bg-amber-500',
  },
  {
    id: 5,
    name: 'Hendra Hidayat',
    email: 'hendra@office.com',
    role: 'Manager',
    status: 'Active',
    lastActive: '30 min ago',
    avatar: 'HH',
    color: 'bg-blue-400',
  },
  {
    id: 6,
    name: 'Rina Pratiwi',
    email: 'rina@office.com',
    role: 'Staff',
    status: 'Active',
    lastActive: '2 hours ago',
    avatar: 'RP',
    color: 'bg-red-500',
  },
  {
    id: 7,
    name: 'Ahmad Rizki',
    email: 'ahmad@office.com',
    role: 'Staff',
    status: 'Active',
    lastActive: '1 hour ago',
    avatar: 'AR',
    color: 'bg-purple-500',
  },
  {
    id: 8,
    name: 'Nurul Fitri',
    email: 'nurul@office.com',
    role: 'Manager',
    status: 'Active',
    lastActive: '45 min ago',
    avatar: 'NF',
    color: 'bg-indigo-500',
  },
  {
    id: 9,
    name: 'Yusuf Bahri',
    email: 'yusuf@office.com',
    role: 'Staff',
    status: 'Active',
    lastActive: '20 min ago',
    avatar: 'YB',
    color: 'bg-cyan-500',
  },
  {
    id: 10,
    name: 'Putri Andini',
    email: 'putri@office.com',
    role: 'Staff',
    status: 'Inactive',
    lastActive: '3 days ago',
    avatar: 'PA',
    color: 'bg-teal-500',
  },
  {
    id: 11,
    name: 'Bambang Sutanto',
    email: 'bambang@office.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '5 min ago',
    avatar: 'BS',
    color: 'bg-fuchsia-500',
  },
  {
    id: 12,
    name: 'Lina Kusuma',
    email: 'lina@office.com',
    role: 'Manager',
    status: 'Active',
    lastActive: '1 hour ago',
    avatar: 'LK',
    color: 'bg-orange-500',
  },
]

// Role badge colors
export const roleColors: Record<string, string> = {
  Admin: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-500/20',
  Manager: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 dark:bg-amber-500/20',
  Staff: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20',
}

// Status badge colors
export const statusColors: Record<string, string> = {
  Active: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20',
  Inactive: 'bg-red-500/10 text-red-600 dark:text-red-400 dark:bg-red-500/20',
}
