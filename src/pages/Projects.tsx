import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';
import ProjectForm from '../components/ProjectForm';
import ProjectCard from '../components/ProjectCard';
import type { Project } from '../types';
import { useTasks } from '../context/TasksContext';

function Projects()
{
    const
    {
        projects,
        addProject,
        updateProject,
        deleteProject
    }=useProjects();
    const { tasks, deleteTasksByProject }=useTasks();

    const [showForm, setShowForm]=useState(false);
    const [editingProject, setEditingProject]=useState<Project | null>(null);

    function handleSave(data: Omit<Project, 'id'>)
    {
        if(editingProject)
        {
        updateProject({ ...data, id: editingProject.id });
        }
        else
        {
        addProject(data);
        }

        closeForm();
    }

    function closeForm()
    {
        setShowForm(false);
        setEditingProject(null);
    }

    function handleDelete(id: number)
    {
        const project=projects.find
        (
            project=> project.id===id
        );

        if(!project)
        {
            return;
        }

        const relatedTasks=tasks.filter
        (
            task=> task.projectId===id
        );

        const message=
            relatedTasks.length>0
            ? `Delete "${project.name}" and its ${relatedTasks.length} related tasks? This cannot be undone.`
            : `Delete "${project.name}"? This cannot be undone.`;

        if(!window.confirm(message))
        {
            return;
        }

        deleteTasksByProject(id);
        deleteProject(id);
    }

    return(
        <div className="projects-page">
            <div className="page-heading">
                <div>
                    <h1>Projects</h1>
                    <p>Manage and track all your projects.</p>
                </div>

                <button
                    className="primary-button"
                    onClick={()=>
                    {
                        setEditingProject(null);
                        setShowForm(true);
                    }}
                >
                    <Plus size={18}/>
                    New Project
                </button>
            </div>

            <div className="projects-grid">
                {projects.map((project)=>
                (
                    <div className="project-item" key={project.id}>
                        <ProjectCard {...project}/>

                        <div className="project-actions">
                            <button
                                onClick={()=>
                                {
                                    setEditingProject(project);
                                    setShowForm(true);
                                }}
                            >
                                <Pencil size={16}/>
                                Edit
                            </button>

                            <button
                                className="delete-button"
                                onClick={()=> handleDelete(project.id)}
                            >
                                <Trash2 size={16}/>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {projects.length===0 &&
            (
                <p className="empty-message">
                    No projects yet. Create your first project!
                </p>
            )}

            {showForm &&
            (
                <div className="modal-backdrop">
                    <div
                        className="modal-content"
                        role="dialog"
                        aria-modal="true"
                        aria-label={ editingProject ? 'Edit Project' : 'New Project' }
                    >
                        <ProjectForm
                            key={editingProject?.id ?? 'new'}
                            project={editingProject ?? undefined}
                            onSave={handleSave}
                            onCancel={closeForm}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Projects;