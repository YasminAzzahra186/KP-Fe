import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import type { DropResult } from '@hello-pangea/dnd';
import type { Project, Sprint, Task, KanbanColumn } from '../types';
import {
  initialMockProjects,
  getProjectStats,
  initialMockSprints,
  initialMockTasks
} from '../data';

export function useProjectDetail(projectId: number) {
  // Load columns from localStorage per project, default to the 4 standard ones
  const [columns, setColumns] = useState<KanbanColumn[]>(() => {
    const saved = localStorage.getItem(`tracking_project_columns_${projectId}`);
    if (saved) return JSON.parse(saved);
    return [
      { id: 'todo', label: 'To Do', color: 'gray' },
      { id: 'in_progress', label: 'In Progress', color: 'amber' },
      { id: 'review', label: 'Review', color: 'blue' },
      { id: 'completed', label: 'Completed / Done', color: 'green' }
    ];
  });

  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

  const handleAddColumn = (label: string, color: KanbanColumn['color']) => {
    const cleanId = label.toLowerCase().replace(/[^a-z0-9]+/g, '_').trim();
    const colId = columns.some(c => c.id === cleanId) ? `${cleanId}_${Date.now()}` : cleanId;

    const newColumn: KanbanColumn = {
      id: colId,
      label,
      color
    };

    const updated = [...columns, newColumn];
    setColumns(updated);
    localStorage.setItem(`tracking_project_columns_${projectId}`, JSON.stringify(updated));
  };

  const handleDeleteColumn = (columnId: string) => {
    const hasTasks = tasks.some(t => t.status === columnId);
    if (hasTasks) {
      alert('Status tidak dapat dihapus karena masih memiliki task.');
      return;
    }

    const updated = columns.filter(c => c.id !== columnId);
    setColumns(updated);
    localStorage.setItem(`tracking_project_columns_${projectId}`, JSON.stringify(updated));
  };
  // Load projects from localStorage
  const [projects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('tracking_projects');
    if (saved) return JSON.parse(saved);
    return initialMockProjects.map(p => {
      const stats = getProjectStats(p.id);
      const progress = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0;
      return { ...p, taskCount: stats.totalTasks, completedTaskCount: stats.completedTasks, progress };
    });
  });

  // Load sprints from localStorage
  const [sprints, setSprints] = useState<Sprint[]>(() => {
    const saved = localStorage.getItem('tracking_sprints');
    return saved ? JSON.parse(saved) : [];
  });

  // Load tasks from localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tracking_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync initial mock data to localStorage on first load
  useEffect(() => {
    if (!localStorage.getItem('tracking_sprints')) {
      localStorage.setItem('tracking_sprints', JSON.stringify(initialMockSprints));
      setSprints(initialMockSprints);
    }
    if (!localStorage.getItem('tracking_tasks')) {
      localStorage.setItem('tracking_tasks', JSON.stringify(initialMockTasks));
      setTasks(initialMockTasks);
    }
  }, []);

  const project = projects.find(p => p.id === projectId);
  const projectSprints = sprints.filter(s => s.projectId === projectId);

  // Kanban & Tabs states
  const [activeTab, setActiveTab] = useState<'sprints' | 'kanban'>('sprints');
  const [selectedSprintId, setSelectedSprintId] = useState<number | null>(() => {
    const active = initialMockSprints.find(s => s.projectId === projectId && s.status === 'active');
    if (active) return active.id;
    const firstSprint = initialMockSprints.find(s => s.projectId === projectId);
    return firstSprint ? firstSprint.id : null;
  });

  // --- Drag & Drop ---
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (type === 'column') {
      const reorderedColumns = Array.from(columns);
      const [removed] = reorderedColumns.splice(source.index, 1);
      const targetIndex = Math.min(destination.index, reorderedColumns.length);
      reorderedColumns.splice(targetIndex, 0, removed);
      setColumns(reorderedColumns);
      localStorage.setItem(`tracking_project_columns_${projectId}`, JSON.stringify(reorderedColumns));
      return;
    }

    const taskId = Number(draggableId);
    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    const sprintTasks = tasks.filter(t => t.sprintId === selectedSprintId);
    const otherTasks = tasks.filter(t => t.sprintId !== selectedSprintId);

    const movedTask = sprintTasks.find(t => t.id === taskId);
    if (!movedTask) return;

    const updatedSprintTasks = sprintTasks.filter(t => t.id !== taskId);
    const updatedMovedTask = { ...movedTask, status: destStatus };

    const tasksByStatus: Record<string, Task[]> = {};
    columns.forEach(col => {
      tasksByStatus[col.id] = updatedSprintTasks.filter(t => t.status === col.id);
    });

    if (!tasksByStatus[sourceStatus]) tasksByStatus[sourceStatus] = [];
    if (!tasksByStatus[destStatus]) tasksByStatus[destStatus] = [];

    tasksByStatus[destStatus].splice(destination.index, 0, updatedMovedTask);

    const finalSprintTasks: Task[] = [];
    columns.forEach(col => {
      finalSprintTasks.push(...(tasksByStatus[col.id] || []));
    });

    const finalTasks = [...otherTasks, ...finalSprintTasks];
    setTasks(finalTasks);
    localStorage.setItem('tracking_tasks', JSON.stringify(finalTasks));
  };

  // --- Task Modal State ---
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskFormData, setTaskFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium' as Task['priority'],
    status: 'todo' as Task['status'],
    labels: '',
    dueDate: '',
    estHours: '',
  });

  const handleTaskInputChange = (field: string, value: string) => {
    setTaskFormData(prev => ({ ...prev, [field]: value }));
  };

  const openAddTaskModal = (initialStatus: Task['status']) => {
    setEditingTask(null);
    setTaskFormData({
      title: '', description: '', assignee: '', priority: 'medium',
      status: initialStatus, labels: '', dueDate: '', estHours: '',
    });
    setIsTaskModalOpen(true);
  };

  const openEditTaskModal = (task: Task) => {
    setEditingTask(task);
    setTaskFormData({
      title: task.title,
      description: task.description || '',
      assignee: task.assignee,
      priority: task.priority,
      status: task.status,
      labels: task.labels || '',
      dueDate: task.dueDate || '',
      estHours: task.estHours ? String(task.estHours) : '',
    });
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = () => {
    if (!taskFormData.title.trim()) { alert('Mohon isi Title/Task Name terlebih dahulu.'); return; }
    if (!selectedSprintId) { alert('Pilih sprint terlebih dahulu.'); return; }

    let updatedTasks: Task[];
    if (editingTask) {
      updatedTasks = tasks.map(t => t.id === editingTask.id ? {
        ...t,
        title: taskFormData.title, description: taskFormData.description,
        assignee: taskFormData.assignee || 'Unassigned', priority: taskFormData.priority,
        status: taskFormData.status, labels: taskFormData.labels,
        dueDate: taskFormData.dueDate, estHours: Number(taskFormData.estHours) || 0,
      } : t);
    } else {
      const newTaskId = Math.max(1000, ...tasks.map(t => t.id)) + 1;
      updatedTasks = [...tasks, {
        id: newTaskId, sprintId: selectedSprintId, title: taskFormData.title,
        status: taskFormData.status, assignee: taskFormData.assignee || 'Unassigned',
        priority: taskFormData.priority, description: taskFormData.description,
        labels: taskFormData.labels, dueDate: taskFormData.dueDate,
        estHours: Number(taskFormData.estHours) || 0,
      }];
    }
    localStorage.setItem('tracking_tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setIsTaskModalOpen(false);
  };

  const handleDeleteTask = (taskId: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus task ini?')) {
      const updatedTasks = tasks.filter(t => t.id !== taskId);
      localStorage.setItem('tracking_tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    }
  };

  // --- Sprint Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', goal: '', startDate: '', endDate: '',
    status: 'planned' as 'active' | 'completed' | 'planned',
    description: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSprint = () => {
    if (!formData.name.trim()) { alert('Mohon isi nama sprint terlebih dahulu.'); return; }

    const newSprintId = Math.max(100, ...sprints.map(s => s.id)) + 1;
    const newSprint: Sprint = {
      id: newSprintId, projectId,
      name: formData.name,
      startDate: formData.startDate || format(new Date(), 'yyyy-MM-dd'),
      endDate: formData.endDate || format(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
      status: formData.status, description: formData.description, goal: formData.goal,
    };

    const newTaskId = Math.max(1000, ...tasks.map(t => t.id)) + 1;
    const newTask = {
      id: newTaskId, sprintId: newSprintId,
      title: `First task for ${formData.name}`, status: 'todo' as const,
      assignee: 'Unassigned', priority: 'medium' as const,
      description: formData.goal ? `Sprint Goal: ${formData.goal}` : '',
    };

    const updatedSprints = [...sprints, newSprint];
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem('tracking_sprints', JSON.stringify(updatedSprints));
    localStorage.setItem('tracking_tasks', JSON.stringify(updatedTasks));
    setSprints(updatedSprints);
    setTasks(updatedTasks);
    setIsModalOpen(false);
    setFormData({ name: '', goal: '', startDate: '', endDate: '', status: 'planned', description: '' });
  };

  // --- Computed Stats ---
  const projectSprintIds = projectSprints.map(s => s.id);
  const projectTasks = tasks.filter(t => projectSprintIds.includes(t.sprintId));
  const totalTasks = projectTasks.length;
  const completedTasks = projectTasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = projectTasks.filter(t => t.status === 'in_progress').length;
  const activeSprint = projectSprints.find(s => s.status === 'active')?.name || 'None';
  const projectProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return {
    project, projectSprints, tasks, setTasks,
    activeTab, setActiveTab,
    selectedSprintId, setSelectedSprintId,
    onDragEnd,
    // Task modal
    isTaskModalOpen, setIsTaskModalOpen, editingTask, taskFormData,
    handleTaskInputChange, openAddTaskModal, openEditTaskModal, handleSaveTask, handleDeleteTask,
    // Sprint modal
    isModalOpen, setIsModalOpen, formData, handleInputChange, handleAddSprint,
    // Column modal
    columns, setColumns, isColumnModalOpen, setIsColumnModalOpen, handleAddColumn, handleDeleteColumn,
    // Stats
    totalTasks, completedTasks, inProgressTasks, activeSprint, projectProgress,
    today,
  };
}
