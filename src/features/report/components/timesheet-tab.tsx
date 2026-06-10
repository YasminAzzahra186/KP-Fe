import { ArrowUp, AlertTriangle } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { hoursPerUserData, dailyTrendData, tableDataTimesheet } from '../data'

export function TimesheetTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Summary Cards Timesheet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardContent className="p-5 flex flex-col justify-center">
            <p className="text-[13px] font-semibold text-muted-foreground mb-1">Total Hours</p>
            <h3 className="text-[32px] leading-none font-bold text-foreground mb-2">342h</h3>
            <p className="text-xs font-medium text-emerald-500 flex items-center gap-1">
              <ArrowUp className="w-3 h-3" /> 12% vs last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardContent className="p-5 flex flex-col justify-center">
            <p className="text-[13px] font-semibold text-muted-foreground mb-1">Avg Daily</p>
            <h3 className="text-[32px] leading-none font-bold text-foreground mb-2">7.2h</h3>
            <p className="text-xs font-medium text-muted-foreground">per active user</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardContent className="p-5 flex flex-col justify-center">
            <p className="text-[13px] font-semibold text-muted-foreground mb-1">Active Users</p>
            <h3 className="text-[32px] leading-none font-bold text-foreground mb-2">8</h3>
            <p className="text-xs font-medium text-emerald-500 flex items-center gap-1">
              <ArrowUp className="w-3 h-3" /> 2 this period
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardContent className="p-5 flex flex-col justify-center">
            <p className="text-[13px] font-semibold text-muted-foreground mb-1">Overtime</p>
            <h3 className="text-[32px] leading-none font-bold text-red-500 mb-2">24h</h3>
            <p className="text-xs font-medium text-amber-500 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> +4h vs target
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-foreground">Hours per User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {hoursPerUserData.map((user, index) => (
              <div key={index} className="flex items-center gap-4 text-sm">
                <span className="w-[60px] font-semibold text-foreground/80">{user.name}</span>
                <div className="flex-1 h-[22px] bg-muted rounded-sm overflow-hidden">
                  <div className="h-full bg-primary rounded-sm" style={{ width: `${user.percentage}%` }} />
                </div>
                <span className="w-8 text-right font-medium text-muted-foreground">{user.hours}h</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-foreground">Daily Trend</CardTitle>
          </CardHeader>
          <CardContent className="pb-0 pl-0">
            <div className="h-[210px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyTrendData} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-popover)', color: 'var(--color-popover-foreground)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="hours" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={45} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border border-border bg-card text-card-foreground w-full overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table className="w-full">
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border">
                <TableHead className="w-[20%] font-semibold text-muted-foreground">User</TableHead>
                <TableHead className="w-[15%] font-semibold text-muted-foreground">Date</TableHead>
                <TableHead className="w-[25%] font-semibold text-muted-foreground">Project</TableHead>
                <TableHead className="w-[15%] font-semibold text-muted-foreground">Hours</TableHead>
                <TableHead className="w-[15%] font-semibold text-muted-foreground">Overtime</TableHead>
                <TableHead className="w-[10%] font-semibold text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableDataTimesheet.map((row) => (
                <TableRow key={row.id} className="border-border/50 hover:bg-muted/40">
                  <TableCell className="font-bold text-foreground">{row.user}</TableCell>
                  <TableCell className="text-muted-foreground font-medium">{row.date}</TableCell>
                  <TableCell className="text-muted-foreground font-medium">{row.project}</TableCell>
                  <TableCell className="font-bold text-foreground">{row.hours}</TableCell>
                  <TableCell className="text-muted-foreground font-medium">{row.overtime}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`font-semibold border-none px-3 py-1 ${row.status === 'Approved'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 dark:bg-amber-500/20'
                      }`}>
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
