import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Task, TaskPriority } from '../types';
import { useTasks } from '../context/TasksContext';
import { useProjects } from '../context/ProjectsContext';
import KanbanColumn from '../components/KanbanColumn';
import TaskForm from '../components/TaskForm';
import { DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCorners,
  type DragEndEvent } from '@dnd-kit/core';

export default function Tasks()
{
    const
    {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        changeTaskStatus
    }=useTasks();

    const { projects }=useProjects();

    const [showForm, setShowForm]=useState(false);
    const [editingTask, setEditingTask]=useState<Task | null>(null);
    const [selectedProject, setSelectedProject]=useState<number | 'all'>('all');
    const [selectedPriority, setSelectedPriority]=useState<TaskPriority | 'all'>('all');

    function openNewTaskForm()
    {
        setEditingTask(null);
        setShowForm(true);
    }

    function openEditTaskForm(task: Task)
    {
        setEditingTask(task);
        setShowForm(true);
    }

    function closeForm()
    {
        setShowForm(false);
        setEditingTask(null);
    }

    function handleSave(data: Omit<Task, 'id'>)
    {
        const projectExists=projects.some
        (
            project=> project.id===data.projectId
        );

        if(!projectExists)
        {
            window.alert('Please select a valid project.');
            return;
        }

        if(editingTask)
        {
            updateTask
            ({
                ...data,
                id: editingTask.id
            });
        }
        else
        {
            addTask(data);
        }

        closeForm();
    }

    function handleDelete(id: number)
    {
        const confirmed=window.confirm('Are you sure you want to delete this task?');

        if(confirmed)
        {
            deleteTask(id);
        }
    }

    const sensors=useSensors
    (
        useSensor(PointerSensor,
        {
            activationConstraint:
            {
                distance: 8
            }
        }),
        useSensor(KeyboardSensor)
    );

    function handleDragEnd(event: DragEndEvent)
    {
        const { active, over }=event;

        if(!over)
        {
            return;
        }

        const taskId=Number(active.id);
        const newStatus=String(over.id);

        if
        (
            newStatus!=='todo' &&
            newStatus!=='in-progress' &&
            newStatus!=='done'
        )
        {
            return;
        }

        changeTaskStatus(taskId, newStatus);
    }

    const filteredTasks=tasks.filter(task=>
    {
        const projectExists=projects.some
        (
            project=> project.id===task.projectId
        );

        const matchesProject=
            selectedProject==='all' ||
            task.projectId===selectedProject;

        const matchesPriority=
            selectedPriority==='all' ||
            task.priority===selectedPriority;

        return(
            projectExists &&
            matchesProject &&
            matchesPriority
        );
    });

    return(
        <div className="tasks-page">
            <div className="tasks-page-header">
                <div>
                    <h1>My Tasks</h1>
                    <p>Organize and track your work</p>
                </div>

                <button
                    className="primary-button"
                    onClick={openNewTaskForm}
                    disabled={projects.length===0}
                    >
                    <Plus size={18}/>
                    New Task
                </button>
            </div>

            {
                projects.length===0 &&
                (
                    <p className="empty-message">
                        Create a project before adding tasks.
                    </p>
                )
            }

            <div className="task-filters">
                <div className="task-filter-field">
                    <label htmlFor="filter-project">Project</label>

                    <select
                        id="filter-project"
                        value={selectedProject}
                        onChange={event=>
                        {
                            const value=event.target.value;

                            setSelectedProject
                            (
                                value==='all' ? 'all' : Number(value)
                            );
                        }}
                    >
                    <option value="all">All Projects</option>

                    {
                        projects.map(project=>
                        (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))
                    }
                    </select>
                </div>

                <div className="task-filter-field">
                    <label htmlFor="filter-priority">Priority</label>

                    <select
                        id="filter-priority"
                        value={selectedPriority}
                        onChange={event=> setSelectedPriority
                        (
                            event.target.value as TaskPriority | 'all'
                        )}
                    >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                    </select>
                </div>

                <button
                    type="button"
                    className="secondary-button"
                    onClick={()=>
                    {
                        setSelectedProject('all');
                        setSelectedPriority('all');
                    }}
                >
                    Clear Filters
                </button>
            </div>

            <p className="filter-results">
                Showing {filteredTasks.length} of {tasks.length} tasks
            </p>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
            >
                <div className="kanban-board">
                    <KanbanColumn
                        title="To Do"
                        status="todo"
                        tasks={filteredTasks}
                        onStatusChange={changeTaskStatus}
                        onEdit={openEditTaskForm}
                        onDelete={handleDelete}
                    />

                    <KanbanColumn
                        title="In Progress"
                        status="in-progress"
                        tasks={filteredTasks}
                        onStatusChange={changeTaskStatus}
                        onEdit={openEditTaskForm}
                        onDelete={handleDelete}
                    />

                    <KanbanColumn
                        title="Done"
                        status="done"
                        tasks={filteredTasks}
                        onStatusChange={changeTaskStatus}
                        onEdit={openEditTaskForm}
                        onDelete={handleDelete}
                    />
                </div>
            </DndContext>

            {
                showForm &&
                (
                    <div className="modal-backdrop">
                        <div
                            className="modal-content"
                            role="dialog"
                            aria-modal="true"
                            aria-label={editingTask ? 'Edit Task' : 'New Task'}
                        >
                            <TaskForm
                                key={editingTask?.id ?? 'new'}
                                task={editingTask ?? undefined}
                                onSave={handleSave}
                                onCancel={closeForm}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
}