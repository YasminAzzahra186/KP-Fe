import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'
import type { ReactNode } from 'react'


// ini untuk menyatukan semua provider/context agar bisa digunakan
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </ThemeProvider>
  )
}
