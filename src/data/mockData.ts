import type { Project, DashboardStat } from '../types';

export const projects: Project[]=
[
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Redesign the company website',
    progress: 75,
    color: '#6750e8'
  },
  {
    id: 2,
    name: 'Mobile Application',
    description: 'Develop a new mobile experience',
    progress: 45,
    color: '#0ea5e9'
  },
  {
    id: 3,
    name: 'Marketing Campaign',
    description: 'Launch the summer campaign',
    progress: 90,
    color: '#10b981'
  }
];

export const dashboardStats: DashboardStat[]=
[
  { title: 'Total Projects', value: 12, icon: 'projects' },
  { title: 'Total Tasks', value: 48, icon: 'tasks' },
  { title: 'Completed Tasks', value: 27, icon: 'completed' },
  { title: 'Overdue Tasks', value: 5, icon: 'overdue' }
];