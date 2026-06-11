'use client'

import { useState, useMemo } from 'react'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { usersData, roleColors, statusColors } from '../data'
import { AddUserModal } from '../components/add-user-modal'

export function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsPerPage = 6

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    return usersData.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  // Paginate users
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <span className="text-lg font-bold text-primary">👥</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setCurrentPage(1)
          }}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto w-full">
          <Table className="w-full">
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border">
                <TableHead className="font-semibold text-muted-foreground">User</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Email</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Role</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Last Active</TableHead>
                <TableHead className="font-semibold text-muted-foreground text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id} className="border-border/50 hover:bg-muted/40">
                    {/* User */}
                    <TableCell className="font-semibold text-foreground">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold text-sm ${user.color}`}>
                          {user.avatar}
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </TableCell>

                    {/* Email */}
                    <TableCell className="text-foreground/85">{user.email}</TableCell>

                    {/* Role */}
                    <TableCell>
                      <Badge variant="secondary" className={`font-semibold border-none px-3 py-1 ${roleColors[user.role]}`}>
                        {user.role}
                      </Badge>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge variant="secondary" className={`font-semibold border-none px-3 py-1 ${statusColors[user.status]}`}>
                        {user.status}
                      </Badge>
                    </TableCell>

                    {/* Last Active */}
                    <TableCell className="text-foreground/75">{user.lastActive}</TableCell>

                    {/* Actions */}
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-amber-600 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-400"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredUsers.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length}
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

      {/* Add User Modal */}
      <AddUserModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
