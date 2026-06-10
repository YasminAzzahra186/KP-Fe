export interface Task {
  id: number;
  sprintId: number;
  title: string;
  status: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  description?: string;
  labels?: string;
  dueDate?: string;
  estHours?: number;
}

export interface KanbanColumn {
  id: string;
  label: string;
  color: 'gray' | 'amber' | 'blue' | 'green' | 'purple' | 'rose';
}

export interface Sprint {
  id: number;
  projectId: number;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'planned';
  description?: string;
  goal?: string;
  assignee?: string;
  priority?: 'low' | 'medium' | 'high';
  labels?: string;
  dueDate?: string;
  estHours?: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'inactive';
  memberCount: number;
  startDate?: string;
  taskCount?: number;
  completedTaskCount?: number;
  progress?: number;
}
