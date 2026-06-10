import { Camera } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ProfileTab() {
  return (
    <Card className="border border-border shadow-sm rounded-2xl bg-card text-card-foreground w-full overflow-hidden transition-colors">
      <CardContent className="p-6 md:p-8 flex flex-col">

        {/* Avatar Section */}
        <div className="flex items-center gap-5 mb-8">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-[40px] font-semibold">
              A
            </div>
            <button className="absolute bottom-0 right-0 bg-primary p-1.5 rounded-full border-[3px] border-background text-primary-foreground hover:opacity-90 transition-opacity">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Andi Budiman</h2>
            <p className="text-muted-foreground text-sm md:text-base">andi@office.com</p>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground/90">Full Name</label>
            <Input defaultValue="Andi Budiman" className="border-border bg-background text-foreground h-11 focus-visible:ring-primary" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground/90">Email</label>
            <Input defaultValue="andi@office.com" className="border-border bg-background text-foreground h-11 focus-visible:ring-primary" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground/90">Phone</label>
            <Input defaultValue="+62 812-3456-7890" className="border-border bg-background text-foreground h-11 focus-visible:ring-primary" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground/90">Role</label>
            <Input defaultValue="Administrator" disabled className="bg-muted/30 border-border text-muted-foreground h-11 opacity-70 cursor-not-allowed" />
          </div>
        </div>

        <div className="flex justify-start">
          <Button className="bg-primary hover:bg-primary/95 text-primary-foreground px-6 h-11 font-semibold rounded-lg shadow-sm">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
