
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTasks } from '../context/TasksContext';
import { useProjects } from '../context/ProjectsContext';
import { useTeam } from '../context/TeamContext';
import CalendarDay from '../components/CalendarDay';
import { formatLocalDate,  getMonthDays } from '../utils/dateUtils';

export default function Calendar()
{
    const { tasks }=useTasks();
    const { projects }=useProjects();
    const { members }=useTeam();

    const [currentMonth, setCurrentMonth]=useState
    (
        ()=>new Date()
    );

    const [selectedDate, setSelectedDate]=useState
    (
        ()=> formatLocalDate(new Date())
    );

    const [selectedProject, setSelectedProject]=useState<number | 'all'>('all');

    const [selectedAssignee, setSelectedAssignee]=useState<number | 'all'>('all');

    const monthDays=getMonthDays(currentMonth);

    const filteredTasks=tasks.filter(task=>
    {
        const projectExists=projects.some
        (
            project=> project.id===task.projectId
        );

        const matchesProject=selectedProject==='all' || task.projectId===selectedProject;

        const matchesAssignee= selectedAssignee==='all' || task.assigneeId===selectedAssignee;

        return(
            projectExists &&
            matchesProject &&
            matchesAssignee
        );
    });

    const selectedDayTasks=filteredTasks.filter
    (
        task=> task.dueDate===selectedDate
    );

    function changeMonth(offset: number)
    {
        const newMonth=new Date
        (
            currentMonth.getFullYear(),
            currentMonth.getMonth()+offset,
            1
        );

        setCurrentMonth(newMonth);
        setSelectedDate(formatLocalDate(newMonth));
    }

    function goToToday()
    {
        const today=new Date();

        setCurrentMonth(today);
        setSelectedDate(formatLocalDate(today));
    }

    const monthTitle=currentMonth.toLocaleDateString
    (
        'en-US',
        {
            month: 'long',
            year: 'numeric'
        }
    );

    return(
        <div className="calendar-page">
            <div className="calendar-page-header">
                <div>
                    <h1>Calendar</h1>
                    <p>Track tasks and upcoming deadlines</p>
                </div>
            </div>

            <div className="calendar-toolbar">

                <div className="calendar-navigation">
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={()=> changeMonth(-1)}
                        aria-label="Previous month"
                    >
                        <ChevronLeft size={18}/>
                    </button>

                    <h2>{monthTitle}</h2>

                    <button
                        type="button"
                        className="secondary-button"
                        onClick={()=> changeMonth(1)}
                        aria-label="Next month"
                    >
                        <ChevronRight size={18}/>
                    </button>

                    <button
                        type="button"
                        className="secondary-button"
                        onClick={goToToday}
                    >
                        Today
                    </button>
                </div>

                <div className="calendar-filters">
                    <select
                        aria-label="Filter by project"
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

                    <select
                        aria-label="Filter by assignee"
                        value={selectedAssignee}
                        onChange={event=>
                        {
                            const value=event.target.value;

                            setSelectedAssignee
                            (
                                value==='all' ? 'all' : Number(value)
                            );
                        }}
                    >
                        <option value="all">All Members</option>

                        {
                            members.map(member=>
                            (
                                <option key={member.id} value={member.id}>
                                    {member.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="calendar-container">

                <div className="calendar-grid">
                {
                    [
                        'Sun', 'Mon', 'Tue', 'Wed',
                        'Thu', 'Fri', 'Sat'
                    ].map(day=>
                    (
                        <div
                            key={day}
                            className="calendar-weekday"
                        >
                            {day}
                        </div>
                    ))
                }

                {
                    monthDays.map((date, index)=>
                    (
                        <CalendarDay
                            key={date ? formatLocalDate(date) : `empty-${index}`}
                            date={date}
                            tasks={filteredTasks}
                            selectedDate={selectedDate}
                            onSelectDate={setSelectedDate}
                        />
                    ))
                }
                </div>

            </div>

            <section className="calendar-selected-tasks">
                <h2>
                    Tasks for {selectedDate}
                </h2>

                {
                    selectedDayTasks.length===0 ?
                    (
                        <p>No tasks scheduled for this day.</p>
                    ) :
                    (
                        <div className="calendar-task-list">
                        {
                            selectedDayTasks.map(task=>
                            {
                                const project=projects.find
                                (
                                    project=> project.id===task.projectId
                                );

                                const assignee=members.find
                                (
                                    member=> member.id===task.assigneeId
                                );

                                return(
                                    <div
                                        key={task.id}
                                        className="calendar-task-detail"
                                    >
                                        <div>
                                            <h3>{task.title}</h3>
                                            <p>
                                            {project?.name ?? 'Unknown Project'}
                                            {' · '}
                                            {assignee?.name ?? 'Unassigned'}
                                            </p>
                                        </div>

                                        <span className={`calendar-priority calendar-priority-${task.priority}`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                );
                            })
                        }
                        </div>
                    )
                }
            </section>
        </div>
    );
}