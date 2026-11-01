import type { Task, TaskStatus } from '../types';
import TaskCard from './TaskCard';
import { useDroppable } from '@dnd-kit/core';

interface KanbanColumnProps
{
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onStatusChange: (id: number, status: TaskStatus) => void;
  onEdit: (task: Task)=> void;
  onDelete: (id: number)=> void;
}

export default function KanbanColumn
({
  title,
  status,
  tasks,
  onStatusChange,
  onEdit,
  onDelete
}: KanbanColumnProps)
{
    const columnTasks=tasks.filter
    (
        task=> task.status===status
    );

    const { setNodeRef, isOver }=useDroppable
    ({
        id: status
    });

    return(
        <section ref={setNodeRef} className={`kanban-column ${isOver ? 'kanban-column-over' : ''}`}>
            <div className="kanban-column-header">
                <h2>{title}</h2>

                <span className="task-count">
                    {columnTasks.length}
                </span>
            </div>

            <div className="kanban-column-content">
                {columnTasks.map(task=>
                (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onStatusChange={onStatusChange}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}

                {
                    columnTasks.length===0 &&
                    (
                        <p className="empty-column">
                            No tasks
                        </p>
                    )
                }
            </div>
        </section>
  );
}