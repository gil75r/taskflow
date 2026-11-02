import type { Task } from '../types';
import { formatLocalDate } from '../utils/dateUtils';

interface CalendarDayProps
{
    date: Date | null;
    tasks: Task[];
    selectedDate: string;
    onSelectDate: (date: string)=> void;
}

export default function CalendarDay
({
    date,
    tasks,
    selectedDate,
    onSelectDate
}: CalendarDayProps)
{

    if(!date)
    {
        return <div className="calendar-empty-day"/>;
    }

    const dateString=formatLocalDate(date);
    const today=formatLocalDate(new Date());

    const isToday=dateString===today;
    const isSelected=dateString===selectedDate;

    const dayTasks=tasks.filter
    (
        task=> task.dueDate===dateString
    );

    const hasOverdueTasks=dayTasks.some
    (
        task=> task.status!== 'done' && dateString<today
    );

    return(
        <button
            type="button"
            className=
            {[
                'calendar-day',
                isToday ? 'calendar-today' : '',
                isSelected ? 'calendar-selected' : '',
                hasOverdueTasks ? 'calendar-overdue' : ''
            ].filter(Boolean).join(' ')}
            onClick={()=> onSelectDate(dateString)}
            aria-label={`${date.toDateString()}, ${dayTasks.length} tasks`}
            aria-pressed={isSelected}
        >
            <span className="calendar-day-number">
                {date.getDate()}
            </span>

            <div className="calendar-day-tasks">
                {
                    dayTasks.slice(0, 2).map(task=>
                    (
                        <span
                            key={task.id}
                            className={`calendar-task calendar-task-${task.priority}`}
                        >
                            {task.title}
                        </span>
                    ))
                }

                {
                    dayTasks.length>2 &&
                    (
                        <span className="calendar-more">
                            +{dayTasks.length-2} more
                        </span>
                    )
                }
            </div>
        </button>
    );
}