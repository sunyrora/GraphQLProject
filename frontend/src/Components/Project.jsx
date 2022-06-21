import { Link } from "react-router-dom";

const Project = ({ project, deleteHandler }) => {
  const linkProps = {
    to: `/project/${project.id}`,
    id: project.id,
    state: { testState: "testState" },
  };

  return (
    <div className="col mb-3 col-md-4">
      <div className="card m-1 h-100">
        <div className="card-header">
          <div className="project-name">
            <Link
              to={linkProps.to}
              id={linkProps.id}
              state={{ ...linkProps.state }}
            >
              {project.name}
            </Link>

            {/* <a className="" href={`/project/${project.id}`}>
              {project.name}
            </a> */}
            <span className="badge project-status bg-info text-wrap small">
              {project.status}
            </span>
          </div>
        </div>
        <div className="card-body projects-screen">
          {/* <a
            href={`/project/${project.id}`}
            className="btn project-description w-100"
          > */}
          <Link
            to={linkProps.to}
            id={linkProps.id}
            state={linkProps.state}
            className="btn project-description w-100"
          >
            <div className="card-text mb-1 text-truncate">
              {project.description}
            </div>
          </Link>
          {/* </a> */}
        </div>
        <div className="card-footer projects-screen">
          <button className="btn btn-outline-success small">Edit</button>
          <button
            className="btn btn-outline-success small"
            onClick={(e) => deleteHandler(e, project.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Project;
