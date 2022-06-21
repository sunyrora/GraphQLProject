import { apolloClient } from "../App";

const { gql } = require("@apollo/client");

const ADD_PROJECT = gql`
  mutation addProject(
    $clientId: ID!
    $name: String!
    $description: String!
    $status: ProjectStatus!
  ) {
    addProject(
      clientId: $clientId
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      status
      description
      client {
        id
      }
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      name
    }
  }
`;

const deletProjectRequest = async (projectId) => {
  apolloClient
    .mutate({
      mutation: DELETE_PROJECT,
      variables: { id: projectId },
      update: (cache, { data: { deleteProject } }) => {
        const normalizedId = cache.identify({
          id: deleteProject.id,
          __typename: "Project",
        });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    })
    .then((data) => {
      console.log("Delete project done");
      return data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export { ADD_PROJECT, DELETE_PROJECT, deletProjectRequest };
