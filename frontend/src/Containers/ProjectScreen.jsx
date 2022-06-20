import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Client from "../Components/Client";
import Spinner from "../Components/Spinner";
import { CLIENT_TYPE_INSIDE_PROJECT } from "../constants";
import { GET_PROJECT } from "../queries/projectQueries";

const ProjectScreen = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

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
            <Link
              to="/"
              className="btn btn-outline-secondary btn-sm w-25 ms-auto"
            >
              Back
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectScreen;
