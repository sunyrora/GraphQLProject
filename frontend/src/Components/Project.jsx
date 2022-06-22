import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const Project = ({ project, deleteHandler }) => {
  const linkProps = {
    to: `/project/${project.id}`,
    id: project.id,
    state: { testState: "testState" },
  };

  const onClickDelete = (e) => {
    e.preventDefault();
    if (deleteHandler) {
      deleteHandler(e, project.id);
    }
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
            <span className="badge project-status bg-info text-wrap small">
              {project.status}
            </span>
          </div>
        </div>
        <div className="card-body projects-screen">
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
        </div>
        <div className="card-footer projects-screen">
          <button className="btn btn-outline-success small">
            <FaEdit className="icon" /> Edit
          </button>
          <ConfirmModal
            buttonText="Delete"
            buttonStyle="btn btn-outline-danger small"
            message={`Delete Project "${project.name}" ?`}
            icon={<FaTrash className="icon" />}
            callBackConfirm={onClickDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Project;
