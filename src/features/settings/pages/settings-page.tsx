import React from 'react'
import { Settings as SettingsIcon } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// --- Components Imports ---
import { ProfileTab } from '../components/profile-tab'
import { NotificationsTab } from '../components/notifications-tab'
import { SecurityTab } from '../components/security-tab'
import { AppearanceTab } from '../components/appearance-tab'

export function SettingsPage() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="space-y-6 text-foreground">

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-muted-foreground" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        </div>
      </div>

      {/* --- TABS NAVIGATION --- */}
      <Tabs defaultValue="profile" className="w-full flex flex-col">

        <TabsList className="grid grid-cols-4 w-full border-b border-border bg-transparent rounded-none h-auto p-0 mb-8">
          <TabsTrigger
            value="profile"
            className="relative h-11 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="relative h-11 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="relative h-11 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors"
          >
            Security
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="relative h-11 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors"
          >
            Appearance
          </TabsTrigger>
        </TabsList>

        <div className="w-full block">
          
          <TabsContent value="profile" className="w-full m-0 outline-none">
            <ProfileTab />
          </TabsContent>

          <TabsContent value="notifications" className="w-full m-0 outline-none">
            <NotificationsTab />
          </TabsContent>

          <TabsContent value="security" className="w-full m-0 outline-none">
            <SecurityTab />
          </TabsContent>

          <TabsContent value="appearance" className="w-full m-0 outline-none">
            <AppearanceTab theme={theme} setTheme={setTheme} />
          </TabsContent>

        </div>
      </Tabs>
    </div>
  )
}