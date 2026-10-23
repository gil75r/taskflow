import { FolderKanban, ListTodo, CircleCheck, AlertCircle } from 'lucide-react';
import type { DashboardStat } from '../types';

const icons=
{
  projects: FolderKanban,
  tasks: ListTodo,
  completed: CircleCheck,
  overdue: AlertCircle
};

function StatCard({ title, value, icon }: DashboardStat)
{
  const Icon=icons[icon];

  return(
    <div className="stat-card">
        <div className="stat-card-top">
            <span>{title}</span>
            <Icon size={22}/>
        </div>

        <h2>{value}</h2>
    </div>
  );
}

export default StatCard;