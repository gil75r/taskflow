import Header from '../components/Header';
import StatCard from '../components/StatCard';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../context/ProjectsContext';
import { useTasks } from '../context/TasksContext';
import type { DashboardStat } from '../types';

function getLocalDateString()
{
    const date=new Date();

    const year=date.getFullYear();
    const month=String(date.getMonth()+1).padStart(2, '0');
    const day=String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function Dashboard()
{
    const { projects }=useProjects();
    const { tasks }=useTasks();

    const totalProjects=projects.length;

    const totalTasks=tasks.length;

    const completedTasks=tasks.filter(task=> task.status==='done').length;

    const today=getLocalDateString();

    const overdueTasks=tasks.filter
    (
        task=>
            task.dueDate!=='' &&
            task.dueDate<today &&
            task.status!=='done'
    ).length;

    const stats: DashboardStat[]=
    [
        {
            title: 'Total Projects',
            value: totalProjects,
            icon: 'projects'
        },
        {
            title: 'Total Tasks',
            value: totalTasks,
            icon: 'tasks'
        },
        {
            title: 'Completed Tasks',
            value: completedTasks,
            icon: 'completed'
        },
        {
            title: 'Overdue Tasks',
            value: overdueTasks,
            icon: 'overdue'
        }
    ];

    return(
        <div className="dashboard">
            <Header/>

            <section className="stats-grid">
            {
                stats.map((stat)=>
                (
                    <StatCard key={stat.title} {...stat}/>
                ))
            }
            </section>

            <section className="projects-section">
                <div className="section-header">
                    <h2>Recent Projects</h2>
                    <span>{projects.length} projects</span>
                </div>

                <div className="projects-grid">
                {
                    projects.slice(0, 3).map((project)=>
                    (
                        <ProjectCard key={project.id} {...project}/>
                    ))
                }
                </div>
            </section>
        </div>
    );
}

export default Dashboard;