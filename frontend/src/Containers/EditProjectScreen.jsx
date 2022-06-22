import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

const EditProjectScreen = () => {
  // select options for project status
  const optionsStatus = [
    { value: "", text: "--Choose status--" },
    { value: "new", text: "Not Started" },
    { value: "progress", text: "In Progress" },
    { value: "completed", text: "Completed" },
  ];

  const [project, setProject] = useState({
    id: "",
    name: "",
    description: "",
    status: "",
    clientId: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Get Clients for select
  const {
    loading: loadingClients,
    error: errorClients,
    data: dataClients,
  } = useQuery(GET_CLIENTS);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    update(cache, { data: { updateProject } }) {
      cache.modify({
        fields: {
          projects(existing = []) {
            const updated = cache.writeFragment({
              data: updateProject,
              fragment: gql`
                fragment updated on Project {
                  id
                  name
                  description
                  status
                  client {
                    id
                    name
                  }
                }
              `,
            });
            return [...existing, updated];
          },
        },
      });
    },
  });

  useEffect(() => {
    const {
      id,
      name,
      description,
      status: projectStatus,
    } = location.state.project;
    const clientId = location.state.project.client.id;

    let status = "";
    if (projectStatus === "Not Started") status = "new";
    else if (projectStatus === "In Progress") status = "progress";
    else if (projectStatus === "Completed") status = "completed";

    setProject({ id, name, description, status, clientId });
  }, []);

  const handleClickCancel = (e) => {
    e.preventDefault();
    // navigate("/", {replace: true});
    navigate(-1);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("Update data!!: ", project);

    updateProject({ variables: { ...project } })
      .then((data) => {
        console.log("Update completed!!");
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  };

  return (
    <>
      {loadingClients ? (
        <Spinner />
      ) : errorClients ? (
        <h2>Clients loading error..</h2>
      ) : (
        <div className="mx-auto w-75 card p-4 mt-5">
          <form onSubmit={onSubmit}>
            <div className="card-header fw-bolder fs-1">
              <div className="modal-header">Edit Project</div>
            </div>
            <div className="card-body">
              <label htmlFor="" className="form-label">
                Name
              </label>
              <input
                type="text"
                required
                className="form-control"
                id="name"
                placeholder="Enter Project name"
                value={project.name}
                onChange={(e) =>
                  setProject((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <p className="fw-lighter"></p>
              <label htmlFor="" className="form-label">
                Description
              </label>
              <textarea
                required
                className="form-control mb-3"
                id="description"
                placeholder="Enter description"
                value={project.description}
                onChange={(e) =>
                  setProject((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                name="status"
                required
                className="form-select mb-3"
                id="status"
                value={project.status}
                onChange={(e) =>
                  setProject((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              >
                {optionsStatus.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <label htmlFor="clientId" className="form-label">
                Client
              </label>
              <select
                name="clientId"
                id="clientId"
                className="form-select mb-3"
                required
                value={project.clientId}
                onChange={(e) =>
                  setProject((prev) => ({
                    ...prev,
                    clientId: e.target.value,
                  }))
                }
              >
                <option value="">--Choose Client--</option>
                {dataClients.clients.map((client) => (
                  <option value={client.id} key={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleClickCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditProjectScreen;
