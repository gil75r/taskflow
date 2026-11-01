import type { Project, Task, TeamMember } from '../types';

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

export const initialTasks: Task[]= 
[
  {
    id: 1,
    projectId: 1,
    title: 'Design homepage',
    description: 'Create the new homepage layout',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-11-10'
  },
  {
    id: 2,
    projectId: 1,
    title: 'Build navigation',
    description: 'Implement responsive navigation',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2026-11-12'
  },
  {
    id: 3,
    projectId: 2,
    title: 'Create login screen',
    description: 'Build the authentication UI',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-11-18'
  },
  {
    id: 4,
    projectId: 2,
    title: 'Set up project',
    description: 'Configure the development environment',
    status: 'done',
    priority: 'low',
    dueDate: '2026-10-20'
  },
  {
    id: 5,
    projectId: 3,
    title: 'Prepare campaign assets',
    description: 'Create images and marketing materials',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2026-11-20'
  }
];

export const initialTeamMembers: TeamMember[]=
[
  {
    id: 1,
    name: 'John Davis',
    email: 'john@example.com',
    role: 'Frontend Developer',
    color: '#6750e8'
  },
  {
    id: 2,
    name: 'Sarah Miller',
    email: 'sarah@example.com',
    role: 'UI/UX Designer',
    color: '#0ea5e9'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael@example.com',
    role: 'Backend Developer',
    color: '#10b981'
  }
];