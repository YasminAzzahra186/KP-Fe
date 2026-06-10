import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import { ReportHeader } from '../components/report-header'
import { ReportFilters } from '../components/report-filters'
import { TimesheetTab } from '../components/timesheet-tab'
import { AnalyticsTab } from '../components/analytics-tab'

export function ReportPage() {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  return (
    <div className="min-h-screen bg-background text-foreground p-6 font-sans flex flex-col gap-6">

      {/* Header Dropdown Section */}
      <ReportHeader />

      {/* Filters Form Panel */}
      <ReportFilters
        dateFrom={dateFrom}
        dateTo={dateTo}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
      />

      {/* Main Tabs Workspace */}
      <Tabs defaultValue="timesheet" className="w-full flex flex-col">
        <TabsList className="w-full flex justify-start border-b border-border bg-transparent p-0 mb-6 rounded-none h-auto">
          <TabsTrigger
            value="timesheet"
            className="relative h-11 rounded-none border-b-2 border-transparent bg-transparent px-6 pb-3 pt-2 font-semibold text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors"
          >
            Timesheet
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="relative h-11 rounded-none border-b-2 border-transparent bg-transparent px-6 pb-3 pt-2 font-semibold text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timesheet" className="w-full outline-none">
          <TimesheetTab />
        </TabsContent>

        <TabsContent value="analytics" className="w-full outline-none">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>

    </div>
  )
}