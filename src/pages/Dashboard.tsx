import Header from '../components/Header';
import StatCard from '../components/StatCard';
import ProjectCard from '../components/ProjectCard';
import { dashboardStats } from '../data/mockData';
import { useProjects } from '../context/ProjectsContext';

function Dashboard()
{
    const { projects }=useProjects();

    const stats=dashboardStats.map((stat)=>
        stat.icon==='projects'
        ? { ...stat, value: projects.length }
        : stat
    );

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