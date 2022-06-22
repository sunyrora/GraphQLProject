import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

const AddProjectModal = ({ handleSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  //   const [optionsClient, setOptionsClient] = useState([]);

  // select options for project status
  const optionsStatus = [
    { value: "", text: "--Choose status--" },
    { value: "new", text: "Not Started" },
    { value: "progress", text: "In Progress" },
    { value: "completed", text: "Completed" },
  ];
  const [status, setStatus] = useState(optionsStatus[0].value);
  const [clientId, setClientId] = useState("");

  // Get Clients for select
  const {
    loading: loadingClients,
    error: errorClients,
    data: dataClients,
  } = useQuery(GET_CLIENTS);

  //   useEffect(() => {
  //     console.log("####### 여긴 한 번만 들어오자!!");
  //     if (!loadingClients && !errorClients) {
  //       const options = dataClients.clients.reduce(
  //         (res, client) => [...res, { value: client.id, text: client.name }],
  //         [{ value: "", text: "--Choose a Client--" }]
  //       );
  //       setOptionsClient(options);
  //       setClientId(options[0].value);
  //     }
  //   }, []);

  // const handleChangeSelect = (e, handler) => {
  //   e.preventDefault();
  //   handler(e.target.value);
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    const project = {
      name,
      description,
      status,
      clientId,
    };

    if (handleSubmit) {
      handleSubmit(e, project);

      setName("");
      setDescription("");
      setClientId("");
      setStatus(optionsStatus[0].value);
    }
  };
  return (
    <>
      {loadingClients ? (
        <Spinner />
      ) : errorClients ? (
        <h2>Clients loading error..</h2>
      ) : (
        <div>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>Add Project</div>
            </div>
          </button>
          <div
            className="modal fade"
            id="addProjectModal"
            // tabIndex={tabIndex}
            aria-labelledby="addProjectLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <form onSubmit={onSubmit}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addProjectModalLabel">
                      New Project
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="m-1">
                      <label htmlFor="" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        id="name"
                        placeholder="Enter Project name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <label htmlFor="status" className="form-label">
                        Status
                      </label>
                      <select
                        name="status"
                        required
                        className="form-select mb-3"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
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
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value="">--Choose Client--</option>
                        {dataClients.clients.map((client) => (
                          <option value={client.id} key={client.id}>
                            {client.name}
                          </option>
                        ))}
                        {/* {optionsClient.map((option) => (
                          <option value={option.value} key={option.value}>
                            {option.text}
                          </option>
                        ))} */}
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      //   data-bs-dismiss="modal"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProjectModal;
