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

export { ADD_PROJECT, DELETE_PROJECT };
