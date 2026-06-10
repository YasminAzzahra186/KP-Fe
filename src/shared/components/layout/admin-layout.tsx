import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { useSidebarStore } from '@/shared/hooks/use-sidebar'
import { cn } from '@/lib/utils'

/**
 * Main admin layout with sidebar + header + content area.
 * Used as the layout wrapper for all authenticated routes.
 */
export function AdminLayout() {
  const { isCollapsed } = useSidebarStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main content area — shifts right based on sidebar width */}
      <div
        className={cn(
          'flex min-h-screen flex-col transition-all duration-300',
          isCollapsed ? 'lg:pl-[68px]' : 'lg:pl-[260px]'
        )}
      >
        <Header />

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
