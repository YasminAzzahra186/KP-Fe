import { ArrowUp, LineChart } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  statusDistribution,
  tasksPerUserAnalytics,
  plannedVsActualTrend,
  tableDataAnalytics
} from '../data'

export function AnalyticsTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Summary Cards Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardContent className="p-5 flex flex-col justify-center">
            <p className="text-[13px] font-semibold text-muted-foreground mb-1">Completion Rate</p>
            <h3 className="text-[32px] leading-none font-bold text-foreground mb-2">78%</h3>
            <p className="text-xs font-medium text-emerald-500 flex items-center gap-1">
              <ArrowUp className="w-3 h-3" /> 5% vs last sprint
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardContent className="p-5 flex flex-col justify-center">
            <p className="text-[13px] font-semibold text-muted-foreground mb-1">On Time</p>
            <h3 className="text-[32px] leading-none font-bold text-foreground mb-2">62%</h3>
            <p className="text-xs font-medium text-muted-foreground">of tasks completed on time</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardContent className="p-5 flex flex-col justify-center">
            <p className="text-[13px] font-semibold text-muted-foreground mb-1">Delayed</p>
            <h3 className="text-[32px] leading-none font-bold text-red-500 mb-2">16%</h3>
            <p className="text-xs font-medium text-red-500 flex items-center gap-1">tasks past deadline</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardContent className="p-5 flex flex-col justify-center">
            <p className="text-[13px] font-semibold text-muted-foreground mb-1">Avg per Task</p>
            <h3 className="text-[32px] leading-none font-bold text-foreground mb-2">4.2h</h3>
            <p className="text-xs font-medium text-muted-foreground">across all projects</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
        {/* Task Status Distribution (Donut Chart) */}
        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardHeader className="pb-0">
            <CardTitle className="text-base font-bold text-foreground">Task Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="h-[180px] w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusDistribution} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                    {statusDistribution.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill="var(--primary)"
                        fillOpacity={
                          index === 0 ? 1 :
                          index === 1 ? 0.65 :
                          index === 2 ? 0.35 :
                          0.12
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Custom Legend */}
            <div className="flex flex-col gap-3 ml-4">
              {statusDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm bg-primary"
                    style={{
                      opacity:
                        index === 0 ? 1 :
                        index === 1 ? 0.65 :
                        index === 2 ? 0.35 :
                        0.12
                    }}
                  />
                  <span className="text-sm text-foreground/80 font-medium">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks per User (Stacked Bar Custom) */}
        <Card className="shadow-sm border border-border bg-card text-card-foreground">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-foreground">Tasks per User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasksPerUserAnalytics.map((user, index) => (
              <div key={index} className="flex items-center gap-4 text-sm">
                <span className="w-[60px] font-semibold text-foreground/80">{user.name}</span>
                <div className="flex-1 h-5 flex rounded-sm overflow-hidden bg-muted">
                  <div className="h-full bg-primary" style={{ width: `${user.planned}%` }} />
                  <div className="h-full bg-primary/40" style={{ width: `${user.actual}%` }} />
                </div>
              </div>
            ))}
            {/* Legend for Tasks per User */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
                <span className="text-xs font-medium text-muted-foreground">Planned</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-primary/40" />
                <span className="text-xs font-medium text-muted-foreground">Actual</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Planned vs Actual Trend (Grouped Bar Chart) */}
      <Card className="shadow-sm border border-border bg-card text-card-foreground w-full">
        <CardHeader className="pb-2 flex flex-row items-center gap-2">
          <div className="bg-primary/10 p-1 rounded-sm">
            <LineChart className="w-4 h-4 text-primary" />
          </div>
          <CardTitle className="text-base font-bold text-foreground m-0 leading-none">Planned vs Actual Trend</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 pt-6">
          <div className="h-[200px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={plannedVsActualTrend} margin={{ top: 0, right: 10, left: 10, bottom: 0 }} barGap={2}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-popover)', color: 'var(--color-popover-foreground)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="planned" fill="var(--primary)" radius={[2, 2, 0, 0]} maxBarSize={60} />
                <Bar dataKey="actual" fill="var(--primary)" fillOpacity={0.4} radius={[2, 2, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
              <span className="text-xs font-medium text-muted-foreground">Planned</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/40" />
              <span className="text-xs font-medium text-muted-foreground">Actual</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Data Table */}
      <Card className="shadow-sm border border-border bg-card text-card-foreground w-full overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table className="w-full">
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border">
                <TableHead className="w-[20%] font-semibold text-muted-foreground">Task</TableHead>
                <TableHead className="w-[15%] font-semibold text-muted-foreground">Assignee</TableHead>
                <TableHead className="w-[15%] font-semibold text-muted-foreground">Priority</TableHead>
                <TableHead className="w-[15%] font-semibold text-muted-foreground">Status</TableHead>
                <TableHead className="w-[10%] font-semibold text-muted-foreground">Planned</TableHead>
                <TableHead className="w-[10%] font-semibold text-muted-foreground">Actual</TableHead>
                <TableHead className="w-[15%] font-semibold text-muted-foreground">Variance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableDataAnalytics.map((row) => (
                <TableRow key={row.id} className="border-border/50 hover:bg-muted/40">
                  <TableCell className="font-bold text-foreground">{row.task}</TableCell>
                  <TableCell className="text-foreground/85 font-medium">{row.assignee}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`font-semibold border-none px-3 py-1 ${row.priority === 'High'
                      ? 'bg-destructive/10 text-destructive dark:bg-destructive/20'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 dark:bg-amber-500/20'
                      }`}>
                      {row.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`font-semibold border-none px-3 py-1 ${row.status === 'In Progress'
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-500/20'
                      : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 dark:bg-yellow-500/20'
                      }`}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground/80 font-medium">{row.planned}</TableCell>
                  <TableCell className="text-foreground/80 font-medium">{row.actual}</TableCell>
                  <TableCell className={`font-bold ${row.varianceColor}`}>{row.variance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
