export interface Project
{
  id: number;
  name: string;
  description: string;
  progress: number;
  color: string;
}

export interface DashboardStat
{
  title: string;
  value: number;
  icon: 'projects' | 'tasks' | 'completed' | 'overdue';
}

export type TaskStatus='todo' | 'in-progress' | 'done';

export type TaskPriority='low' | 'medium' | 'high';

export interface Task
{
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}
