import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { GET_PROJECT } from "../queries/projectQueries";

const ProjectScreen = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <h2>{`Error Project Screen: ${error.message}`}</h2>;
  }
  if (!loading && !error) {
    const { name, description, status, client } = data.project;
    return (
      <>
        <div>
          <p>{name}</p>
          <p>{description}</p>
          <p>{status}</p>
          <p>Client: {client.name}</p>
          <p>{client.email}</p>
          <p>{client.email}</p>
        </div>
      </>
    );
  }
  //   return (
  //     <>
  //       {loading ? (
  //         <Spinner />
  //       ) : error ? (
  //         <h2>{`Error Project Screen: ${error.message}`}</h2>
  //               ) : (

  //         <div>
  //           <p>{data.project.name}</p>
  //           <p>{projectName}</p>
  //           <p>{description}</p>
  //           <p>{status}</p>
  //           <p>Client: {client.name}</p>
  //           <p>{client.email}</p>
  //           <p>{client.email}</p>
  //         </div>
  //       )}
  //     </>
  //   );
};

export default ProjectScreen;
