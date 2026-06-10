import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReportFiltersProps {
  dateFrom: string
  dateTo: string
  setDateFrom: (val: string) => void
  setDateTo: (val: string) => void
}

export function ReportFilters({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo
}: ReportFiltersProps) {
  return (
    <Card className="shadow-sm border border-border bg-card text-card-foreground w-full">
      <CardContent className="p-4 flex flex-wrap items-center gap-4">
        <span className="text-sm font-semibold text-foreground/80">Filter:</span>

        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-auto text-sm border border-border bg-background text-foreground"
          />
          <span className="text-sm text-muted-foreground">to</span>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-auto text-sm border border-border bg-background text-foreground"
          />
        </div>

        <Select defaultValue="all-users">
          <SelectTrigger className="w-[140px] border border-border bg-background text-foreground">
            <SelectValue placeholder="All Users" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-users">All Users</SelectItem>
            <SelectItem value="andi">Andi</SelectItem>
            <SelectItem value="siti">Siti</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-projects">
          <SelectTrigger className="w-[150px] border border-border bg-background text-foreground">
            <SelectValue placeholder="All Projects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-projects">All Projects</SelectItem>
            <SelectItem value="office">Office Tracker</SelectItem>
            <SelectItem value="mobile">Mobile App</SelectItem>
          </SelectContent>
        </Select>

        <Button className="bg-primary hover:bg-primary/95 text-primary-foreground px-6 font-semibold shadow-sm ml-auto sm:ml-0">
          Apply
        </Button>
      </CardContent>
    </Card>
  )
}

