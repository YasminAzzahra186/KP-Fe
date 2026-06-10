import {
  Settings,
  ChevronDown,
  FileText,
  BarChart as BarChartIcon
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ReportHeader() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <FileText className="w-6 h-6 text-muted-foreground" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Report</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 bg-background border border-border shadow-sm text-foreground hover:bg-muted/50 font-medium px-4">
            <Settings className="w-4 h-4 text-muted-foreground" />
            Export
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 p-1">
          <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-foreground/80">Export PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2">
            <BarChartIcon className="w-4 h-4 text-emerald-500" />
            <span className="font-medium text-foreground/80">Export Excel</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
