import { useState, type SubmitEvent  } from 'react';
import type { Task, TaskStatus, TaskPriority } from '../types';
import { useProjects } from '../context/ProjectsContext';

interface TaskFormProps
{
  task?: Task;
  onSave: (task: Omit<Task, 'id'>)=> void;
  onCancel: ()=> void;
}

export default function TaskForm
({
  task,
  onSave,
  onCancel
}: TaskFormProps)
{
    const { projects }=useProjects();

    const [title, setTitle]=useState(task?.title ?? '');
    const [description, setDescription]=useState(task?.description ?? '');

    const [projectId, setProjectId]=useState(task?.projectId ?? projects[0]?.id ?? 0);

    const [status, setStatus]=useState<TaskStatus>(task?.status ?? 'todo');

    const [priority, setPriority]=useState<TaskPriority>(task?.priority ?? 'medium');

    const [dueDate, setDueDate]=useState(task?.dueDate ?? '');

    function handleSubmit(event: SubmitEvent<HTMLFormElement>)
    {
        event.preventDefault();

        if(!title.trim() || !projects.some(p=> p.id===projectId))
        {
            return;
        }

        onSave
        ({
            title: title.trim(),
            description: description.trim(),
            projectId,
            status,
            priority,
            dueDate
        });
    }

    return(
        <form className="task-form" onSubmit={handleSubmit}>
            <h2>{task ? 'Edit Task' : 'New Task'}</h2>

            <div className="form-field">
                <label htmlFor="task-title">Task Title</label>
                <input
                id="task-title"
                type="text"
                value={title}
                onChange={event=> setTitle(event.target.value)}
                placeholder="Enter task title"
                required
                />
            </div>

            <div className="form-field">
                <label htmlFor="task-description">Description</label>
                <textarea
                id="task-description"
                value={description}
                onChange={event=> setDescription(event.target.value)}
                placeholder="Describe the task"
                rows={3}
                />
            </div>

            <div className="task-form-grid">
                <div className="form-field">
                    <label htmlFor="task-project">Project</label>
                    <select
                        id="task-project"
                        value={projectId}
                        onChange={event=>
                            setProjectId(Number(event.target.value))
                        }
                        required
                    >
                        {projects.map(project=>
                        (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="task-status">Status</label>
                    <select
                        id="task-status"
                        value={status}
                        onChange={event=>
                            setStatus(event.target.value as TaskStatus)
                        }
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="task-priority">Priority</label>
                    <select
                        id="task-priority"
                        value={priority}
                        onChange={event =>
                            setPriority(event.target.value as TaskPriority)
                        }
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="task-due-date">Due Date</label>
                    <input
                        id="task-due-date"
                        type="date"
                        value={dueDate}
                        onChange={event=> setDueDate(event.target.value)}
                    />
                </div>
            </div>

            <div className="task-form-actions">
                <button
                    type="button"
                    className="secondary-button"
                    onClick={onCancel}
                    >
                    Cancel
                </button>

                <button type="submit" className="primary-button">
                    {task ? 'Save Changes' : 'Create Task'}
                </button>
            </div>
        </form>
    );
}