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