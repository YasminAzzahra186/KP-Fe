import { Sun, Moon } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface AppearanceTabProps {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export function AppearanceTab({ theme, setTheme }: AppearanceTabProps) {
  return (
    <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground w-full overflow-hidden transition-colors">
      <CardContent className="p-6 md:p-8 space-y-8 flex flex-col">
        {/* Theme */}
        <div>
          <h3 className="font-bold text-foreground text-base mb-4">Theme</h3>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setTheme('light')}
              className={cn(
                "flex items-center gap-2 px-6 h-11 rounded-lg font-semibold shadow-sm transition-all",
                theme === 'light'
                  ? "bg-primary hover:bg-primary/95 text-primary-foreground"
                  : "bg-background border border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <Sun className={cn("w-4 h-4 transition-colors", theme === 'light' ? "text-amber-300 fill-amber-300" : "text-muted-foreground")} />
              Light
            </Button>
            <Button
              onClick={() => setTheme('dark')}
              className={cn(
                "flex items-center gap-2 px-6 h-11 rounded-lg font-semibold shadow-sm transition-all",
                theme === 'dark'
                  ? "bg-primary hover:bg-primary/95 text-primary-foreground"
                  : "bg-background border border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <Moon className={cn("w-4 h-4 transition-colors", theme === 'dark' ? "text-amber-300 fill-amber-300" : "text-muted-foreground")} />
              Dark
            </Button>
          </div>
        </div>

        {/* Compact Mode */}
        <div>
          <h3 className="font-bold text-foreground text-base mb-4">Compact Mode</h3>
          <Switch className="data-[state=checked]:bg-primary" />
        </div>

        {/* Font Size */}
        <div>
          <h3 className="font-bold text-foreground text-base mb-4">Font Size</h3>
          <Select defaultValue="medium">
            <SelectTrigger className="w-full sm:w-[200px] border-border bg-background text-foreground h-11 rounded-lg focus:ring-primary">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
