import { Pencil, Trash2 } from 'lucide-react';
import type { Task, TaskStatus } from '../types';
import { useDraggable } from '@dnd-kit/core';
import type { CSSProperties } from 'react';

interface TaskCardProps
{
  task: Task;
  onStatusChange: (id: number, status: TaskStatus) => void;
  onEdit: (task: Task)=> void;
  onDelete: (id: number)=> void;
}

export default function TaskCard
({
  task,
  onStatusChange,
  onEdit,
  onDelete
}: TaskCardProps)
{
  const
  {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  }=useDraggable({ id: task.id });

  const style: CSSProperties=
  {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : undefined,
    position: 'relative'
  };

  return(
    <article ref={setNodeRef} className="task-card" style={style}>
      <button
        type="button"
        className="task-drag-handle"
        aria-label={`Drag ${task.title}`}
        {...attributes}
        {...listeners}
      >
        ⋮⋮ Drag
      </button>

      <div className="task-card-header">
        <h3>{task.title}</h3>

        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>

      <p className="task-description">
        {task.description}
      </p>

      <div className="task-card-footer">
        <span className="task-due-date">
          Due: {task.dueDate || 'Not set'}
        </span>

        <select
          aria-label={`Status of ${task.title}`}
          value={task.status}
          onChange={event=>
            onStatusChange
            (
              task.id,
              event.target.value as TaskStatus
            )
          }
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="task-card-actions">
        <button
          type="button"
          className="task-action-button"
          aria-label={`Edit ${task.title}`}
          onClick={()=> onEdit(task)}
        >
          <Pencil size={16} />
        </button>

        <button
          type="button"
          className="task-action-button delete"
          aria-label={`Delete ${task.title}`}
          onClick={()=> onDelete(task.id)}
        >
          <Trash2 size={16}/>
        </button>
      </div>
    </article>
  );
}