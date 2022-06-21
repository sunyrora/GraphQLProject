import { useQuery } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Client from "../Components/Client";
import ConfirmModal from "../Components/ConfirmModal";
import Spinner from "../Components/Spinner";
import { CLIENT_TYPE_INSIDE_PROJECT } from "../constants";
import { deletProjectRequest } from "../mutations/projectMutations";
import { GET_PROJECT } from "../queries/projectQueries";

const ProjectScreen = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });
  const navigate = useNavigate();

  const deleteProjectHandler = (e) => {
    e.preventDefault();
    if (deletProjectRequest(id)) {
      navigate(-1);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h2>{`Error Project Screen: ${error.message}`}</h2>
      ) : (
        <div>
          <div className="mx-auto w-75 card p-4 mt-5">
            <div className="card-header fw-bolder fs-1">
              {data.project.name}
            </div>
            <div className="card-body">
              <div className="card-text mb-5">{data.project.description}</div>

              <div className="fw-bold h5">Status</div>
              <p className="lead">{data.project.status}</p>
            </div>
            <h5 className="mt-4">Client Information</h5>
            <Client
              client={data.project.client}
              type={CLIENT_TYPE_INSIDE_PROJECT}
            />
            <div>
              {/* <button
                className="btn btn-danger mdium"
                onClick={onClickDeleteProject}
              >
                <FaTrash className="icon" /> Delete Project
              </button> */}
              <ConfirmModal
                buttonText="Delete Project"
                message={`Delete Project "${data.project.name}" ?`}
                icon={<FaTrash className="icon" />}
                callBackConfirm={deleteProjectHandler}
              />
              <Link to="/" className="btn btn-outline-secondary mdium ms-auto">
                Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectScreen;
