import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Task, TaskStatus } from '../types';
import { initialTasks } from '../data/mockData';

interface TasksContextType
{
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>)=> void;
  updateTask: (task: Task)=> void;
  deleteTask: (id: number)=> void;
  changeTaskStatus: (id: number, status: TaskStatus)=> void;
  deleteTasksByProject: (projectId: number)=> void;
  unassignTasksByMember: (memberId: number)=> void;
}

const TasksContext=createContext<TasksContextType | undefined>
(
  undefined
);

export function TasksProvider
({
  children
}:
{
  children: ReactNode;
})
{
  const [tasks, setTasks]=useLocalStorage<Task[]>
  (
    'taskflow-tasks',
    initialTasks
  );

  function addTask(task: Omit<Task, 'id'>)
  {
    const newTask: Task=
    {
      ...task,
      id: Date.now()
    };

    setTasks(current=> [...current, newTask]);
  }

  function updateTask(updatedTask: Task)
  {
    setTasks(current=>
      current.map(task=>
        task.id===updatedTask.id ? updatedTask : task
      )
    );
  }

  function deleteTask(id: number)
  {
    setTasks(current=>
      current.filter(task=> task.id!==id)
    );
  }

  function changeTaskStatus(id: number, status: TaskStatus)
  {
    setTasks(current=>
      current.map(task=>
        task.id===id ? { ...task, status } : task
      )
    );
  }

  function deleteTasksByProject(projectId: number)
  {
    setTasks(currentTasks=>
      currentTasks.filter
      (
        task=> task.projectId!==projectId
      )
    );
  }

  function unassignTasksByMember(memberId: number)
  {
    setTasks(currentTasks=>
      currentTasks.map(task=>
        task.assigneeId===memberId
          ? { ...task, assigneeId: null }
          : task
      )
    );
  }

  return(
    <TasksContext.Provider
      value=
      {{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        changeTaskStatus,
        deleteTasksByProject,
        unassignTasksByMember
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks()
{
    const context=useContext(TasksContext);

    if(!context)
    {
        throw new Error('useTasks must be used inside TasksProvider');
    }

  return context;
}