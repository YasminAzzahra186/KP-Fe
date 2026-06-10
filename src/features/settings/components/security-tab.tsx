import { Key } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { activeSessionsList } from '../data'

export function SecurityTab() {
  return (
    <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground w-full overflow-hidden transition-colors">
      <CardContent className="p-6 md:p-8 flex flex-col">
        {/* Change Password */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Key className="w-5 h-5 text-amber-500 fill-amber-500/10" />
            <h3 className="font-bold text-foreground text-lg">Change Password</h3>
          </div>
          <div className="space-y-4 max-w-xl mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foreground/90">Current Password</label>
              <Input type="password" placeholder="Enter current password" className="border-border bg-background text-foreground h-11 focus-visible:ring-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foreground/90">New Password</label>
              <Input type="password" placeholder="Enter new password" className="border-border bg-background text-foreground h-11 focus-visible:ring-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foreground/90">Confirm Password</label>
              <Input type="password" placeholder="Confirm new password" className="border-border bg-background text-foreground h-11 focus-visible:ring-primary" />
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/95 text-primary-foreground px-6 h-11 font-semibold rounded-lg shadow-sm">
            Update Password
          </Button>
        </div>

        <hr className="border-border mb-8" />

        {/* Two-Factor Auth */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-bold text-foreground text-base mb-1">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">Add extra security to your account</p>
          </div>
          <Switch className="data-[state=checked]:bg-primary" />
        </div>

        {/* Active Sessions */}
        <div>
          <h3 className="font-bold text-foreground text-base mb-4">Active Sessions</h3>
          <div className="space-y-4">
            {activeSessionsList.map((session) => (
              <div key={session.id} className="flex items-center justify-between border border-border rounded-xl p-5">
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-foreground text-sm">{session.browser} • {session.os}</p>
                  <p className="text-xs text-muted-foreground font-medium">Last active: {session.lastActive}</p>
                </div>
                <Button variant="outline" className="text-destructive border-destructive/20 bg-background hover:bg-destructive/10 hover:text-destructive font-medium px-5 h-9 rounded-lg">
                  Revoke
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
