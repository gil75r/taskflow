import type { Task, TeamMember } from '../types';
import { formatLocalDate } from './dateUtils';

export function getAnalytics(tasks: Task[], members: TeamMember[])
{
    const totalTasks=tasks.length;

    const completedTasks=tasks.filter
    (
        task=> task.status==='done'
    ).length;

    const inProgressTasks=tasks.filter
    (
        task=> task.status==='in-progress'
    ).length;

    const todoTasks=tasks.filter
    (
        task=> task.status==='todo'
    ).length;

    const today=formatLocalDate(new Date());

    const overdueTasks=tasks.filter
    (
        task=>
            task.dueDate!== '' &&
            task.dueDate<today &&
            task.status!== 'done'
    ).length;

    const completionRate=totalTasks===0
        ? 0
        : Math.round((completedTasks/totalTasks)*100);

    const statusData=
    [
        { name: 'To Do', value: todoTasks },
        { name: 'In Progress', value: inProgressTasks },
        { name: 'Done', value: completedTasks }
    ];

    const priorityData=
    [
        {
            name: 'Low',
            tasks: tasks.filter(task=> task.priority==='low').length
        },
        {
            name: 'Medium',
            tasks: tasks.filter(task=> task.priority==='medium').length
        },
        {
            name: 'High',
            tasks: tasks.filter(task=> task.priority==='high').length
        }
    ];

    const workloadData=members.map(member=>
    ({
        name: member.name,
        tasks: tasks.filter
        (
            task=> task.assigneeId===member.id
        ).length
    }));

    const unassignedTasks=tasks.filter
    (
        task=> !members.some(member=> member.id===task.assigneeId)
    ).length;

    if(unassignedTasks>0)
    {
        workloadData.push
        ({
            name: 'Unassigned',
            tasks: unassignedTasks
        });
    }

    return{
        totalTasks,
        completedTasks,
        inProgressTasks,
        todoTasks,
        overdueTasks,
        completionRate,
        statusData,
        priorityData,
        workloadData
    };
}