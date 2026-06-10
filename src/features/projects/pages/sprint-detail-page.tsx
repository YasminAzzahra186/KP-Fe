import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  User,
  Plus,
  Edit,
  Trash2,
  Search
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn, formatDateIndonesian } from "@/lib/utils";

import type { Project, Sprint, Task, KanbanColumn } from '../types';
import {
  initialMockProjects,
  getProjectStats,
  initialMockSprints,
  initialMockTasks
} from '../data';

export function SprintDetailPage() {
  const { id, sprintId } = useParams<{ id: string; sprintId: string }>();
  const navigate = useNavigate();

  const projectId = Number(id);
  const currentSprintId = Number(sprintId);

  // Load projects from localStorage
  const [projects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('tracking_projects');
    if (saved) return JSON.parse(saved);
    return initialMockProjects.map(p => {
      const stats = getProjectStats(p.id);
      const progress = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0;
      return {
        ...p,
        taskCount: stats.totalTasks,
        completedTaskCount: stats.completedTasks,
        progress,
      };
    });
  });

  // Load sprints from localStorage
  const [sprints] = useState<Sprint[]>(() => {
    const saved = localStorage.getItem('tracking_sprints');
    return saved ? JSON.parse(saved) : initialMockSprints;
  });

  // Load tasks from localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tracking_tasks');
    return saved ? JSON.parse(saved) : initialMockTasks;
  });

  const project = projects.find(p => p.id === projectId);
  const projectSprints = sprints.filter(s => s.projectId === projectId);
  const sprint = projectSprints.find(s => s.id === currentSprintId);
  const sprintTasks = tasks.filter(t => t.sprintId === currentSprintId);
  const [columns] = useState<KanbanColumn[]>(() => {
    const saved = localStorage.getItem(`tracking_project_columns_${projectId}`);
    if (saved) return JSON.parse(saved);
    return [
      { id: 'todo', label: 'To Do', color: 'gray' },
      { id: 'in_progress', label: 'In Progress', color: 'amber' },
      { id: 'review', label: 'Review', color: 'blue' },
      { id: 'completed', label: 'Completed / Done', color: 'green' }
    ];
  });

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Progress calculations
  const totalSprintTasks = sprintTasks.length;
  const completedSprintTasks = sprintTasks.filter(t => t.status === 'completed').length;
  const sprintProgress = totalSprintTasks > 0 ? Math.round((completedSprintTasks / totalSprintTasks) * 100) : 0;

  // Filtered tasks
  const filteredTasks = sprintTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Modal and Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium' as Task['priority'],
    status: 'todo' as Task['status'],
    labels: '',
    dueDate: '',
    estHours: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const openAddModal = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      assignee: '',
      priority: 'medium',
      status: 'todo',
      labels: '',
      dueDate: '',
      estHours: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      assignee: task.assignee,
      priority: task.priority,
      status: task.status,
      labels: task.labels || '',
      dueDate: task.dueDate || '',
      estHours: task.estHours ? String(task.estHours) : '',
    });
    setIsModalOpen(true);
  };

  const handleSaveTask = () => {
    if (!formData.title.trim()) {
      alert('Mohon isi Title/Task Name terlebih dahulu.');
      return;
    }

    let updatedTasks: Task[];
    if (editingTask) {
      updatedTasks = tasks.map(t => t.id === editingTask.id ? {
        ...t,
        title: formData.title,
        description: formData.description,
        assignee: formData.assignee || 'Unassigned',
        priority: formData.priority,
        status: formData.status,
        labels: formData.labels,
        dueDate: formData.dueDate,
        estHours: Number(formData.estHours) || 0,
      } : t);
    } else {
      const newTaskId = Math.max(1000, ...tasks.map(t => t.id)) + 1;
      const newTask: Task = {
        id: newTaskId,
        sprintId: currentSprintId,
        title: formData.title,
        status: formData.status,
        assignee: formData.assignee || 'Unassigned',
        priority: formData.priority,
        description: formData.description,
        labels: formData.labels,
        dueDate: formData.dueDate,
        estHours: Number(formData.estHours) || 0,
      };
      updatedTasks = [...tasks, newTask];
    }

    localStorage.setItem('tracking_tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus task ini?')) {
      const updatedTasks = tasks.filter(t => t.id !== taskId);
      localStorage.setItem('tracking_tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    }
  };

  // Fallbacks if not found
  if (!project || !sprint) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-xl font-semibold">Sprint not found</h2>
        <Button onClick={() => navigate('/admin/projects')} className="gap-2 cursor-pointer">
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Button>
      </div>
    );
  }

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="capitalize text-[10px] px-1.5 py-0">High</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-amber-500 hover:bg-amber-600 text-white capitalize text-[10px] px-1.5 py-0 border-0">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary" className="capitalize text-[10px] px-1.5 py-0">Low</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const col = columns.find(c => c.id === status);
    if (!col) return <Badge variant="outline" className="capitalize text-[10px] px-1.5 py-0">{status}</Badge>;
    
    switch (col.color) {
      case 'gray':
        return <Badge variant="secondary" className="capitalize text-[10px] px-1.5 py-0">{col.label}</Badge>;
      case 'amber':
        return <Badge variant="default" className="bg-amber-500 hover:bg-amber-600 text-white capitalize text-[10px] px-1.5 py-0 border-0">{col.label}</Badge>;
      case 'blue':
        return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600 text-white capitalize text-[10px] px-1.5 py-0 border-0">{col.label}</Badge>;
      case 'green':
        return <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600 text-white capitalize text-[10px] px-1.5 py-0 border-0">{col.label}</Badge>;
      case 'purple':
        return <Badge variant="default" className="bg-purple-500 hover:bg-purple-600 text-white capitalize text-[10px] px-1.5 py-0 border-0">{col.label}</Badge>;
      case 'rose':
        return <Badge variant="destructive" className="capitalize text-[10px] px-1.5 py-0">{col.label}</Badge>;
      default:
        return <Badge variant="outline" className="capitalize text-[10px] px-1.5 py-0">{col.label}</Badge>;
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-6 px-3">
      {/* Header & Back Button */}
      <div className="flex flex-col gap-4 border-b pb-6 mb-6">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate(`/admin/projects/${projectId}`)}
            className="gap-2 -ml-2 mb-2 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to {project.title}
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{sprint.name}</h1>
              <Badge
                variant={
                  sprint.status === 'active'
                    ? 'default'
                    : sprint.status === 'completed'
                      ? 'secondary'
                      : 'outline'
                }
              >
                {sprint.status}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm flex items-center gap-1.5">
              <span>Project : <strong>{project.title}</strong></span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 p-3 rounded-lg border border-border/50 sm:self-start">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <span>Sprint Duration: <strong>{formatDateIndonesian(sprint.startDate)}</strong> to <strong>{formatDateIndonesian(sprint.endDate)}</strong></span>
          </div>
        </div>
      </div>

      {/* Sprint Progress Section */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-sm">Sprint Completion Progress</h3>
              <p className="text-xs text-muted-foreground">
                Completed {completedSprintTasks} of {totalSprintTasks} tasks
              </p>
            </div>
            <span className="text-lg font-bold text-primary">{sprintProgress}%</span>
          </div>
          <Progress value={sprintProgress} className="h-2.5" />
        </CardContent>
      </Card>

      {/* Task List Table Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg">Tasks List</CardTitle>
          </div>

        </CardHeader>
        <CardContent className="space-y-4 p-0">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between px-4 pb-2 sm:items-center">
            {/* Search query input */}

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-start sm:w-[500px]">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari task berdasarkan judul atau deskripsi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || 'all')}>
                <SelectTrigger className="!h-9 w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  {columns.map(col => (
                    <SelectItem key={col.id} value={col.id}>{col.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={openAddModal} className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4" /> Tambah Task
            </Button>
          </div>

          <div className="overflow-x-auto border-t border-border/60">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <th className="py-3 px-4">Task Name</th>
                  <th className="py-3 px-4">Assignee</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Hours</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      {sprintTasks.length === 0
                        ? "Belum ada task di sprint ini. Klik tombol Tambah Task untuk membuat baru."
                        : "Tidak ada task yang sesuai dengan filter pencarian."
                      }
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-accent/20 transition-colors">
                      <td className="py-3.5 px-4 font-medium max-w-[250px] truncate" title={task.title}>
                        <div className="flex flex-col">
                          <span>{task.title}</span>
                          {task.description && (
                            <span className="text-xs text-muted-foreground font-normal line-clamp-1 mt-0.5">{task.description}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{task.assignee}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {getPriorityBadge(task.priority)}
                      </td>
                      <td className="py-3.5 px-4">
                        {getStatusBadge(task.status)}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground text-xs">
                        {task.dueDate ? formatDateIndonesian(task.dueDate) : '-'}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {task.estHours ? `${task.estHours}h` : '-'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEditModal(task)} className="h-8 w-8 text-muted-foreground hover:text-primary cursor-pointer">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Add/Edit Task */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingTask ? 'Edit Task' : 'Tambah Task Baru'}</DialogTitle>
            <DialogDescription>
              Isi formulir di bawah ini untuk menyimpan detail task.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 text-sm">
            {/* Title / Task Name */}
            <div className="space-y-1">
              <Label htmlFor="task-title">Task Name</Label>
              <Input
                id="task-title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Masukkan nama task"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <Label htmlFor="task-description">Deskripsi</Label>
              <Textarea
                id="task-description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Masukkan deskripsi task"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Assignee */}
              <div className="space-y-1">
                <Label htmlFor="task-assignee">Assignee</Label>
                <Input
                  id="task-assignee"
                  value={formData.assignee}
                  onChange={(e) => handleInputChange('assignee', e.target.value)}
                  placeholder="Nama Assignee"
                />
              </div>

              {/* Priority */}
              <div className="space-y-1">
                <Label htmlFor="task-priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(val) => handleInputChange('priority', val || '')}
                >
                  <SelectTrigger id="task-priority">
                    <SelectValue placeholder="Pilih prioritas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Status */}
              <div className="space-y-1">
                <Label htmlFor="task-status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(val) => handleInputChange('status', val || '')}
                >
                  <SelectTrigger id="task-status">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map(col => (
                      <SelectItem key={col.id} value={col.id}>{col.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Est. Hours */}
              <div className="space-y-1">
                <Label htmlFor="task-estHours">Est. Hours</Label>
                <Input
                  id="task-estHours"
                  type="number"
                  min="0"
                  value={formData.estHours}
                  onChange={(e) => handleInputChange('estHours', e.target.value)}
                  placeholder="Estimasi jam"
                />
              </div>
            </div>

            {/* Labels */}
            <div className="space-y-1">
              <Label htmlFor="task-labels">Labels</Label>
              <Input
                id="task-labels"
                value={formData.labels}
                onChange={(e) => handleInputChange('labels', e.target.value)}
                placeholder="e.g. Frontend, Bug, Easy"
              />
            </div>

            {/* Due Date */}
            <div className="space-y-1 flex flex-col">
              <Label htmlFor="task-dueDate">Due Date</Label>
              <Popover>
                <PopoverTrigger
                  id="task-dueDate"
                  className={cn(
                    "h-9 w-full min-w-0 rounded-md border border-input bg-input/20 px-3 py-1.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-start text-left font-normal cursor-pointer dark:bg-input/30",
                    !formData.dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                  {formData.dueDate ? (
                    format(new Date(formData.dueDate), "PPP")
                  ) : (
                    <span>Pilih tanggal jatuh tempo</span>
                  )}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate ? new Date(formData.dueDate) : undefined}
                    onSelect={(date) => {
                      const formatted = date ? format(date, 'yyyy-MM-dd') : '';
                      handleInputChange('dueDate', formatted);
                    }}
                    disabled={{ before: today }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DialogFooter className="pt-4 border-t gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="cursor-pointer">
              Batal
            </Button>
            <Button onClick={handleSaveTask} className="cursor-pointer">
              {editingTask ? 'Simpan Perubahan' : 'Simpan Task'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
