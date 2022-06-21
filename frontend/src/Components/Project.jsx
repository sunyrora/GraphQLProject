const Project = ({ project, deletHandler }) => {
  return (
    <div className="col mb-3 col-sm-4">
      <div className="card m-1 h-100">
        <div className="card-header">
          <div className="project-name">
            <a className="" href={`/project/${project.id}`}>
              {project.name}
            </a>
            <span className="badge project-status bg-info text-wrap small">
              {project.status}
            </span>
          </div>
        </div>
        <div className="card-body">
          <a
            href={`/project/${project.id}`}
            className="btn project-description w-100"
          >
            <div className="card-text mb-1 text-truncate">
              {project.description}
            </div>
          </a>
        </div>
        <div className="card-footer">
          <button className="btn btn-outline-success small">Edit</button>
          <button
            className="btn btn-outline-success small"
            onClick={(e) => deletHandler(e, project.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Project;
