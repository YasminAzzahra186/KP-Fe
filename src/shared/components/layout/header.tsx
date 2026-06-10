import { NavLink, useLocation } from 'react-router-dom'
import { useSidebarStore } from '@/shared/hooks/use-sidebar'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { Menu, Bell, LogOut, ChevronRight, PanelLeft, PanelLeftClose, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/app/providers/theme-provider'

// Ini header untuk admin panel
export function Header() {
  const { setMobileOpen, isCollapsed, toggle } = useSidebarStore()
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  // close profile saat klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Ini bagian breadcrumb nya
  const pathSegments = location.pathname.split('/').filter(Boolean)
  const breadcrumbs = pathSegments.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
    isLast: index === pathSegments.length - 1,
  }))

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="cursor-pointer shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop sidebar collapse toggle */}
      <button
        onClick={toggle}
        className="cursor-pointer hidden shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:flex"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <PanelLeft className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
      </button>

      {/* Breadcrumb */}
      <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
        <NavLink to="/admin/dashboard" className="font-medium text-foreground hover:text-foreground/80 transition-colors">Home</NavLink>
        {breadcrumbs.map((crumb) => (
          <span key={crumb.label} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" />
            <span className={cn(crumb.isLast && 'text-foreground font-medium')}>
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>

      {/* section kanan */}
      <div className="ml-auto flex items-center gap-4">
        {/* Search Input Comming soon wak....*/}
        {/* <div className="relative w-full max-w-[200px] hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors"
          />
        </div> */}

        <div className="flex items-center gap-2">
          {/* Notifications Toggle*/}
          <button className="cursor-pointer relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="cursor-pointer rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-1.5 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
          </button>

          {/* Dropdown menu profile*/}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg animate-in fade-in-0 zoom-in-95">
              <div className="border-b border-border px-3 py-2.5">
                <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
                <p className="text-xs text-muted-foreground">{user?.email || 'admin@example.com'}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    logout()
                    setIsProfileOpen(false)
                  }}
                  className="cursor-pointer flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
