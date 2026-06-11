'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  attendanceSummary,
  attendanceRecords,
  availableUsers,
  availableStatus,
  dateColumns,
  statusLegend,
} from '../data'

export function AbsensiPage() {
  const [selectedUser, setSelectedUser] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter records based on selected filters
  const filteredRecords = attendanceRecords.filter((record) => {
    const userMatch = selectedUser === 'all' || record.id.toString() === selectedUser
    return userMatch
  })

  // Paginate records
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage)

  const getStatusDisplay = (status: string) => {
    const legend = statusLegend.find((item) => item.key === status)
    if (!legend) return '—'
    return legend.emoji
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'hadir':
        return 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
      case 'izin':
        return 'bg-amber-500/20 text-amber-700 dark:text-amber-400'
      case 'sakit':
        return 'bg-red-500/20 text-red-700 dark:text-red-400'
      case 'alpha':
        return 'bg-slate-500/20 text-slate-700 dark:text-slate-400'
      case 'libur':
        return 'bg-gray-300/30 text-gray-600 dark:text-gray-400'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance Recap</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-border bg-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-6 items-end">
            {/* Date Range */}
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-sm font-semibold">
                DATE RANGE
              </Label>
              <div className="flex gap-2">
                <Input
                  id="start-date"
                  type="text"
                  value="01 Jun 2026"
                  readOnly
                  className="text-sm"
                />
                <span className="flex items-center text-muted-foreground">→</span>
                <Input
                  type="text"
                  value="14 Jun 2026"
                  readOnly
                  className="text-sm"
                />
              </div>
            </div>

            {/* User Select */}
            <div className="space-y-2">
              <Label htmlFor="user-select" className="text-sm font-semibold">
                USER
              </Label>
              <Select value={selectedUser} onValueChange={(value) => setSelectedUser(value)}>
                <SelectTrigger id="user-select" className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Select */}
            <div className="space-y-2">
              <Label htmlFor="status-select" className="text-sm font-semibold">
                STATUS
              </Label>
              <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value)}>
                <SelectTrigger id="status-select" className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableStatus.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button
                className="flex-1"
                size="sm"
              >
                Apply
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedUser('all')
                  setSelectedStatus('all')
                  setCurrentPage(1)
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Total Days */}
        <Card className="shadow-sm border border-border bg-card">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-muted-foreground mb-2">TOTAL DAYS</p>
            <p className="text-3xl font-bold text-foreground">{attendanceSummary.totalDays}</p>
          </CardContent>
        </Card>

        {/* Hadir */}
        <Card className="shadow-sm border border-border bg-emerald-50 dark:bg-emerald-950/20">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
              ✓ HADIR
            </p>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {attendanceSummary.hadir.count}
            </p>
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-1">
              {attendanceSummary.hadir.percentage}%
            </p>
          </CardContent>
        </Card>

        {/* Izin */}
        <Card className="shadow-sm border border-border bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2">
              📋 IZIN
            </p>
            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {attendanceSummary.izin.count}
            </p>
            <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mt-1">
              {attendanceSummary.izin.percentage}%
            </p>
          </CardContent>
        </Card>

        {/* Sakit */}
        <Card className="shadow-sm border border-border bg-red-50 dark:bg-red-950/20">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">
              🤒 SAKIT
            </p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {attendanceSummary.sakit.count}
            </p>
            <p className="text-sm font-medium text-red-600 dark:text-red-400 mt-1">
              {attendanceSummary.sakit.percentage}%
            </p>
          </CardContent>
        </Card>

        {/* Alpha */}
        <Card className="shadow-sm border border-border bg-slate-50 dark:bg-slate-950/20">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-400 mb-2">
              ⚠️ ALPHA
            </p>
            <p className="text-3xl font-bold text-slate-600 dark:text-slate-400">
              {attendanceSummary.alpha.count}
            </p>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
              {attendanceSummary.alpha.percentage}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card className="shadow-sm border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table className="w-full">
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border">
                <TableHead className="font-semibold text-muted-foreground w-[150px]">
                  NAME
                </TableHead>
                {dateColumns.map((date) => (
                  <TableHead
                    key={date}
                    className="font-semibold text-muted-foreground text-center w-[60px]"
                  >
                    {date}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRecords.map((record) => (
                <TableRow key={record.id} className="border-border/50 hover:bg-muted/40">
                  <TableCell className="font-semibold text-foreground flex items-center gap-2">
                    👤 {record.name}
                  </TableCell>
                  {dateColumns.map((date) => (
                    <TableCell
                      key={`${record.id}-${date}`}
                      className="text-center py-3"
                    >
                      {record.dates[date] && record.dates[date] !== 'libur' ? (
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-semibold ${getStatusBadgeClass(
                            record.dates[date]
                          )}`}
                        >
                          {getStatusDisplay(record.dates[date])}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredRecords.length)} of {filteredRecords.length} users
        </p>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            ←
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="w-8"
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          >
            →
          </Button>
        </div>
      </div>

      {/* Legend */}
      <Card className="shadow-sm border border-border bg-muted/50">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-6">
            {statusLegend.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-xs font-semibold text-white ${item.color}`}>
                  {item.emoji}
                </span>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
