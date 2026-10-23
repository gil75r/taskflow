import { useState, type SubmitEvent } from 'react';
import type { Project } from '../types';

interface ProjectFormProps
{
  project?: Project;
  onSave: (data: Omit<Project, 'id'>)=> void;
  onCancel: ()=> void;
}

function ProjectForm({ project, onSave, onCancel }: ProjectFormProps)
{
  const [name, setName]=useState(project?.name ?? '');
  const [description, setDescription]=useState(project?.description ?? '');
  const [progress, setProgress]=useState(project?.progress ?? 0);
  const [color, setColor]=useState(project?.color ?? '#6750e8');

  function handleSubmit(event: SubmitEvent<HTMLFormElement>)
  {
    event.preventDefault();

    if(!name.trim())
    {
        return;
    }

    onSave({ name: name.trim(), description: description.trim(), progress, color });
  }

  return(
    <form className="project-form" onSubmit={handleSubmit}>
      <h2>{project ? 'Edit Project' : 'New Project'}</h2>

      <label htmlFor="project-name">Project Name</label>
      <input
        id="project-name"
        value={name}
        onChange={(event)=> setName(event.target.value)}
        required
        maxLength={100}
      />

      <label htmlFor="project-description">Description</label>
      <textarea
        id="project-description"
        value={description}
        onChange={(event)=> setDescription(event.target.value)}
        rows={3}
      />

      <label htmlFor="project-progress">Progress: {progress}%</label>
      <input
        id="project-progress"
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(event)=> setProgress(Number(event.target.value))}
      />

      <label htmlFor="project-color">Project Color</label>
      <input
        id="project-color"
        type="color"
        value={color}
        onChange={(event)=> setColor(event.target.value)}
      />

      <div className="form-actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit" className="primary-button">
          {project ? 'Save Changes' : 'Create Project'}
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;