const Project = ({ project }) => {
  return (
    <div className="col mb-3 col-sm-3">
      <div className="card m-1 h-100">
        <div className="card-header text-truncate">{project.name}</div>
        <div className="card-body d-flex d-flex flex-column justify-content-start align-items-center p-1">
          <a
            href={`/project/${project.id}`}
            className="btn project-description w-100 d-flex flex-column justify-content-center"
          >
            <div className="card-text mb-1 text-truncate">
              {project.description}
            </div>
          </a>
          <div>
            <span className="badge bg-info text-wrap small">
              {project.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
