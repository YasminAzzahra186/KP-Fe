import type { Project, Sprint, Task } from './types';

// Initial mock projects (base structures)
export const initialMockProjects: Project[] = [
  {
    id: 1,
    title: 'Website Redesign',
    description: 'Mendesain ulang tampilan website perusahaan dengan pendekatan modern',
    status: 'active' as const,
    memberCount: 5,
    startDate: '2026-05-01',
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Pengembangan aplikasi mobile untuk e-commerce',
    status: 'active' as const,
    memberCount: 8,
    startDate: '2026-05-15',
  },
  {
    id: 3,
    title: 'Cloud Migration',
    description: 'Migrasi infrastruktur ke cloud AWS',
    status: 'inactive' as const,
    memberCount: 3,
    startDate: '2026-04-10',
  },
  {
    id: 4,
    title: 'Data Analytics Dashboard',
    description: 'Membangun dashboard analitik untuk tim marketing',
    status: 'active' as const,
    memberCount: 4,
    startDate: '2026-06-01',
  },
];

// Initial mock sprints
export const initialMockSprints: Sprint[] = [
  // Project 1 Sprints
  { id: 101, projectId: 1, name: 'Sprint 1: Design Phase', startDate: '2026-05-01', endDate: '2026-05-14', status: 'completed' },
  { id: 102, projectId: 1, name: 'Sprint 2: Core Development', startDate: '2026-05-15', endDate: '2026-05-28', status: 'active' },
  { id: 103, projectId: 1, name: 'Sprint 3: Testing & Deployment', startDate: '2026-05-29', endDate: '2026-06-12', status: 'planned' },

  // Project 2 Sprints
  { id: 201, projectId: 2, name: 'Sprint 1: UI Implementation', startDate: '2026-05-15', endDate: '2026-05-28', status: 'completed' },
  { id: 202, projectId: 2, name: 'Sprint 2: Integration & APIs', startDate: '2026-05-29', endDate: '2026-06-11', status: 'active' },

  // Project 3 Sprints
  { id: 301, projectId: 3, name: 'Sprint 1: Setup AWS Environment', startDate: '2026-04-10', endDate: '2026-04-24', status: 'completed' },

  // Project 4 Sprints
  { id: 401, projectId: 4, name: 'Sprint 1: Initial Requirements & Setup', startDate: '2026-06-01', endDate: '2026-06-14', status: 'active' },
];

// Initial mock tasks
export const initialMockTasks: Task[] = [
  // Project 1, Sprint 1 (Design Phase) - All Completed
  { id: 1001, sprintId: 101, title: 'Design landing page wireframe', status: 'completed', assignee: 'Budi', priority: 'medium' },
  { id: 1002, sprintId: 101, title: 'Create UI design mockups', status: 'completed', assignee: 'Siti', priority: 'high' },
  { id: 1003, sprintId: 101, title: 'Gather assets and logo icons', status: 'completed', assignee: 'Ani', priority: 'low' },

  // Project 1, Sprint 2 (Core Development)
  { id: 1004, sprintId: 102, title: 'Setup project with Vite and Tailwind', status: 'completed', assignee: 'Rian', priority: 'medium' },
  { id: 1005, sprintId: 102, title: 'Implement Responsive Navigation Bar', status: 'completed', assignee: 'Budi', priority: 'low' },
  { id: 1006, sprintId: 102, title: 'Develop Login & Registration Page', status: 'review', assignee: 'Ani', priority: 'high' },
  { id: 1007, sprintId: 102, title: 'Integrate state management (Zustand)', status: 'todo', assignee: 'Rian', priority: 'high' },

  // Project 1, Sprint 3 (Testing & Deployment) - All Todo
  { id: 1008, sprintId: 103, title: 'Perform cross-browser compatibility tests', status: 'todo', assignee: 'Siti', priority: 'medium' },
  { id: 1009, sprintId: 103, title: 'Configure staging and production CI/CD pipelines', status: 'todo', assignee: 'Rian', priority: 'high' },

  // Project 2, Sprint 1 (UI Implementation)
  { id: 2001, sprintId: 201, title: 'Create app icon and splash screen design', status: 'completed', assignee: 'Siti', priority: 'medium' },
  { id: 2002, sprintId: 201, title: 'Implement Home and Products screens', status: 'completed', assignee: 'Budi', priority: 'high' },

  // Project 2, Sprint 2 (Integration & APIs)
  { id: 2003, sprintId: 202, title: 'Integrate Payment Gateway API', status: 'in_progress', assignee: 'Ani', priority: 'high' },
  { id: 2004, sprintId: 202, title: 'Configure Push Notifications', status: 'todo', assignee: 'Rian', priority: 'medium' },
  { id: 2005, sprintId: 202, title: 'Fix scrolling performance issues', status: 'completed', assignee: 'Budi', priority: 'low' },

  // Project 3, Sprint 1 (AWS Migration)
  { id: 3001, sprintId: 301, title: 'Audit current database architecture', status: 'completed', assignee: 'Rian', priority: 'high' },
  { id: 3002, sprintId: 301, title: 'Setup RDS instance and configure backups', status: 'completed', assignee: 'Ani', priority: 'high' },

  // Project 4, Sprint 1 (Setup Requirements)
  { id: 4001, sprintId: 401, title: 'Identify core data sources and metrics', status: 'in_progress', assignee: 'Budi', priority: 'high' },
  { id: 4002, sprintId: 401, title: 'Mock UI charts components', status: 'todo', assignee: 'Siti', priority: 'medium' },
];

/**
 * Gets list of sprints for a project
 */
export function getProjectSprints(projectId: number): Sprint[] {
  return initialMockSprints.filter(s => s.projectId === projectId);
}

/**
 * Gets tasks for a specific sprint
 */
export function getSprintTasks(sprintId: number): Task[] {
  return initialMockTasks.filter(t => t.sprintId === sprintId);
}

/**
 * Computes stats for a project
 */
export function getProjectStats(projectId: number) {
  const sprints = getProjectSprints(projectId);
  const sprintIds = sprints.map(s => s.id);
  const tasks = initialMockTasks.filter(t => sprintIds.includes(t.sprintId));

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const activeSprint = sprints.find(s => s.status === 'active')?.name || 'None';

  return {
    totalTasks,
    completedTasks,
    inProgressTasks,
    activeSprint,
  };
}
