import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/shared/hooks/use-sidebar'
import { sidebarNavigation } from './sidebar-nav-config'
import { Compass } from 'lucide-react'
import { useAuth } from '@/features/auth/hooks/use-auth'

/**
 * Sidebar component with collapsible navigation groups.
 */
export function Sidebar() {
  let { isCollapsed, isMobileOpen, setMobileOpen } = useSidebarStore()
  const { user } = useAuth()

  if (isMobileOpen) {
    isCollapsed = false;
  }
  
  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300',
          isCollapsed ? 'w-[68px]' : 'w-[260px]',
          // Mobile: slide in/out
          'max-lg:-translate-x-full max-lg:shadow-2xl',
          isMobileOpen && 'max-lg:translate-x-0'
        )}
      >
        {/* Logo / Brand */}
        <div className="flex h-16 items-center border-b border-sidebar-border px-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Compass className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-semibold">
                  Tracking App
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Admin Panel
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {sidebarNavigation.map((group) => (
            <div key={group.label} className="mb-6">
              {!isCollapsed && (
                <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </p>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                          'hover:bg-accent hover:text-accent-foreground',
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground',
                          isCollapsed && 'justify-center px-2'
                        )
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && (
                        <span className="truncate text-[13px]">{item.title}</span>
                      )}
                      {!isCollapsed && item.badge && (
                        <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* User profile footer */}
        <div className="border-t border-sidebar-border p-4 bg-sidebar-footer">
          <div className={cn(
            "flex items-center gap-3 overflow-hidden",
            isCollapsed && "justify-center"
          )}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="truncate text-sm font-medium text-foreground">
                  {user?.name || 'Admin User'}
                </span>
                <span className="truncate text-xs text-muted-foreground leading-none mt-0.5">
                  {user?.email || 'admin@example.com'}
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
