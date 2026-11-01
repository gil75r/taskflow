import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Task, TaskPriority } from '../types';
import { useTasks } from '../context/TasksContext';
import { useProjects } from '../context/ProjectsContext';
import KanbanColumn from '../components/KanbanColumn';
import TaskForm from '../components/TaskForm';
import { DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCorners,
  type DragEndEvent } from '@dnd-kit/core';

type TaskSortOption=
  | 'default'
  | 'due-date-asc'
  | 'due-date-desc'
  | 'priority-high'
  | 'priority-low';

const priorityOrder={ low: 1, medium: 2, high: 3 };

function sortTasks(tasks: Task[], sortBy: TaskSortOption): Task[]
{
    const sortedTasks=[...tasks];

    switch(sortBy)
    {
        case 'due-date-asc':
        return sortedTasks.sort((a, b)=>
        {
            if(!a.dueDate) return 1;
            if(!b.dueDate) return -1;

            return a.dueDate.localeCompare(b.dueDate);
        });

        case 'due-date-desc':
        return sortedTasks.sort((a, b)=>
        {
            if(!a.dueDate) return 1;
            if(!b.dueDate) return -1;

            return b.dueDate.localeCompare(a.dueDate);
        });

        case 'priority-high':
        return sortedTasks.sort
        (
            (a, b)=>
            priorityOrder[b.priority]-priorityOrder[a.priority]
        );

        case 'priority-low':
        return sortedTasks.sort
        (
            (a, b)=>
            priorityOrder[a.priority]-priorityOrder[b.priority]
        );

        default:
        return sortedTasks;
    }
}

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
    const [searchQuery, setSearchQuery]=useState('');
    const [sortBy, setSortBy]=useState<TaskSortOption>('default');

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

        const normalizedSearch=searchQuery.trim().toLowerCase();

        const matchesSearch=
            task.title.toLowerCase().includes(normalizedSearch) ||
            task.description.toLowerCase().includes(normalizedSearch);

        return(
            projectExists &&
            matchesProject &&
            matchesPriority &&
            matchesSearch
        );
    });

    const displayedTasks=sortTasks(filteredTasks, sortBy);

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
{/* חחחחח */}
            <div className="task-filters">
                <div className="task-filter-field task-search-field">
                    <label htmlFor="search-tasks">Search Tasks</label>

                    <input
                        id="search-tasks"
                        type="search"
                        placeholder="Search by title or description..."
                        value={searchQuery}
                        onChange={event=> setSearchQuery(event.target.value)}
                    />
                </div>

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
                        onChange={event=>
                            setSelectedPriority
                            (
                                event.target.value as TaskPriority | 'all'
                            )
                        }
                    >
                        <option value="all">All Priorities</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <div className="task-filter-field">
                    <label htmlFor="sort-tasks">Sort By</label>

                    <select
                        id="sort-tasks"
                        value={sortBy}
                        onChange={event=>
                            setSortBy(event.target.value as TaskSortOption)
                        }
                    >
                        <option value="default">Default</option>
                        <option value="due-date-asc">Due Date: Earliest First</option>
                        <option value="due-date-desc">Due Date: Latest First</option>
                        <option value="priority-high">Priority: High to Low</option>
                        <option value="priority-low">Priority: Low to High</option>
                    </select>
                </div>

                <button
                    type="button"
                    className="secondary-button"
                    onClick={()=>
                    {
                        setSelectedProject('all');
                        setSelectedPriority('all');
                        setSearchQuery('');
                        setSortBy('default');
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
                        tasks={displayedTasks}
                        onStatusChange={changeTaskStatus}
                        onEdit={openEditTaskForm}
                        onDelete={handleDelete}
                    />

                    <KanbanColumn
                        title="In Progress"
                        status="in-progress"
                        tasks={displayedTasks}
                        onStatusChange={changeTaskStatus}
                        onEdit={openEditTaskForm}
                        onDelete={handleDelete}
                    />

                    <KanbanColumn
                        title="Done"
                        status="done"
                        tasks={displayedTasks}
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