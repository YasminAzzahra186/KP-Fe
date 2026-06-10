import { Smartphone, Mail } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { pushNotificationsList, emailNotificationsList } from '../data'

export function NotificationsTab() {
  return (
    <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground w-full overflow-hidden transition-colors">
      <CardContent className="p-6 md:p-8 flex flex-col">
        {/* Push Notifications */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Smartphone className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-bold text-foreground text-lg">Push Notifications</h3>
          </div>
          <div className="space-y-6">
            {pushNotificationsList.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span className="text-foreground/80 font-medium">{item.label}</span>
                <Switch defaultChecked={item.defaultChecked} className="data-[state=checked]:bg-primary" />
              </div>
            ))}
          </div>
        </div>

        <hr className="border-border mb-8" />

        {/* Email Notifications */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Mail className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground text-lg">Email Notifications</h3>
          </div>
          <div className="space-y-6">
            {emailNotificationsList.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span className="text-foreground/80 font-medium">{item.label}</span>
                <Switch defaultChecked={item.defaultChecked} className="data-[state=checked]:bg-primary" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
