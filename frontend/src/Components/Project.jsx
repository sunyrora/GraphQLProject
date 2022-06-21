const Project = ({ project, deletHandler }) => {
  return (
    <div className="col mb-3 col-sm-4">
      <div className="card m-1 h-100">
        <a
          href={`/project/${project.id}`}
          className="project-name w-100 d-flex flex-column justify-content-center"
        >
          <div className="card-header text-truncate">{project.name}</div>
        </a>
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
        <div className="card-footer d-flex justify-content-center">
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
