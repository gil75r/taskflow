import type { Project } from '../types';

function ProjectCard
({
    name,
    description,
    progress,
    color
}: Project)
{
  return(
    <div className="project-card">
        <div className="project-color" style={{ backgroundColor: color }}/>
            
        <h3>{name}</h3>
        <p>{description}</p>

        <div className="progress-header">
            <span>Progress</span>
            <span>{progress}%</span>
        </div>

        <div
            className="progress-bar"
            role="progressbar"
            aria-label={`${name} progress`}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
        >
        <div
            className="progress-fill"
            style={{ width: `${progress}%`, backgroundColor: color }}/>
        </div>
    </div>
  );
}

export default ProjectCard;