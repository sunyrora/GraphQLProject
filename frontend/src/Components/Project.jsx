const Project = ({ project }) => {
  return (
    <div className="col-md-6">
      <div className="card m-1">
        <div className="card-header">{project.name}</div>
        <div className="card-body">
          <a href={`/project/${project.id}`} className="btn">
            <div className="card-text mb-1">{project.description}</div>
            <span className="badge bg-info text-wrap small">
              {project.status}
            </span>
          </a>
          {/* <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{project.name}</h5>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Project;
