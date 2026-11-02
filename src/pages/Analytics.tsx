import {
    ClipboardList,
    CheckCircle2,
    Clock3,
    AlertTriangle
} from 'lucide-react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import { useTasks } from '../context/TasksContext';
import { useProjects } from '../context/ProjectsContext';
import { useTeam } from '../context/TeamContext';
import AnalyticsCard from '../components/AnalyticsCard';
import { getAnalytics } from '../utils/analyticsUtils';

const STATUS_COLORS=['#94a3b8', '#6750e8', '#10b981'];

export default function Analytics()
{
    const { tasks }=useTasks();
    const { projects }=useProjects();
    const { members }=useTeam();

    const validTasks=tasks.filter(task=>
        projects.some(project=> project.id===task.projectId)
    );

    const analytics=getAnalytics(validTasks, members);

    const statusChartData=analytics.statusData.map
    (
        (item, index)=>
        ({
            ...item,
            fill: STATUS_COLORS[index]
        })
    );

    return(
        <div className="analytics-page">
            <div className="analytics-page-header">
                <h1>Analytics</h1>
                <p>Track your team's productivity and task progress</p>
            </div>

            <div className="analytics-stats">
                <AnalyticsCard
                    title="Total Tasks"
                    value={analytics.totalTasks}
                    description="Across all projects"
                    icon={<ClipboardList size={20}/>}
                />

                <AnalyticsCard
                    title="Completed Tasks"
                    value={analytics.completedTasks}
                    description={`${analytics.completionRate}% completion rate`}
                    icon={<CheckCircle2 size={20}/>}
                />

                <AnalyticsCard
                    title="In Progress"
                    value={analytics.inProgressTasks}
                    description="Tasks currently being worked on"
                    icon={<Clock3 size={20}/>}
                />

                <AnalyticsCard
                    title="Overdue Tasks"
                    value={analytics.overdueTasks}
                    description="Incomplete tasks past their due date"
                    icon={<AlertTriangle size={20}/>}
                />
            </div>

            <div className="analytics-charts">
                <section className="analytics-chart-card">
                    <h2>Tasks by Status</h2>
                    <p>Distribution of task progress</p>

                    <div className="analytics-chart">
                    {
                        analytics.totalTasks===0 ?
                        (
                            <p className="analytics-empty">
                                No task data available.
                            </p>
                        ) :
                        (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusChartData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        label
                                    />
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        )
                    }
                    </div>
                </section>

                <section className="analytics-chart-card">
                    <h2>Tasks by Priority</h2>
                    <p>How tasks are distributed by priority</p>

                    <div className="analytics-chart">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analytics.priorityData}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis allowDecimals={false}/>
                                <Tooltip/>
                                <Bar
                                    dataKey="tasks"
                                    fill="#6750e8"
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                <section className="analytics-chart-card analytics-chart-wide">
                    <h2>Team Workload</h2>
                    <p>Number of tasks assigned to each team member</p>

                    <div className="analytics-chart">
                    {
                        analytics.workloadData.length===0 ?
                        (
                            <p className="analytics-empty">
                                No team workload data available.
                            </p>
                        ) :
                        (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={analytics.workloadData}
                                    layout="vertical"
                                    margin={{ left: 20, right: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis type="number" allowDecimals={false}/>
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        width={110}
                                    />
                                    <Tooltip/>
                                    <Bar
                                        dataKey="tasks"
                                        fill="#0ea5e9"
                                        radius={[0, 6, 6, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )
                    }
                    </div>
                </section>
            </div>
        </div>
    );
}