import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Project } from '../types';
import { projects as initialProjects } from '../data/mockData';

interface ProjectsContextType
{
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>)=> void;
  updateProject: (project: Project)=> void;
  deleteProject: (id: number)=> void;
}

const ProjectsContext=createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children } : { children: ReactNode; })
{
  const [projects, setProjects]=useState<Project[]>
  (
    initialProjects
  );

  function addProject(project: Omit<Project, 'id'>)
  {
    const newProject: Project=
    {
      ...project,
      id: Date.now()
    };

    setProjects((current)=> [...current, newProject]);
  }

  function updateProject(updatedProject: Project)
  {
    setProjects((current)=>
      current.map((project)=> project.id===updatedProject.id ? updatedProject : project)
    );
  }

  function deleteProject(id: number)
  {
    setProjects((current)=> current.filter((project)=> project.id!==id));
  }

  return(
    <ProjectsContext.Provider
      value=
      {{
        projects,
        addProject,
        updateProject,
        deleteProject
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects()
{
    const context=useContext(ProjectsContext);

    if(!context)
    {
        throw new Error('useProjects must be used inside ProjectsProvider');
    }

  return context;
}