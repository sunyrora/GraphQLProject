const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

const Project = require("../models/Project");

const {
  getProjects,
  getProjectById,
  addProject,
  deleteProject,
  updateProject,
} = require("../controller/ProjectController");
const {
  getClients,
  getClientById,
  addClient,
  deleteClient,
} = require("../controller/ClientController");

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    client: {
      type: ClientType,
      resolve: (parent, arg) => getClientById(parent.clientId),
    },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

const RooteQuery = new GraphQLObjectType({
  name: "RootequeryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve: (parent, args) => getClients(),
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => getClientById(parent.clientId),
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: (parent, args) => getProjects(),
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return getProjectById(args.id);
      },
    },
  },
});

// Mutation
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => addClient(args),
    },

    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => deleteClient(args.id),
    },
    addProject: {
      type: ProjectType,
      args: {
        clientId: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
            defaultValue: "Not Started",
          }),
        },
      },
      resolve: (parent, args) => addProject(args),
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => deleteProject(args.id),
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        clientId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve: (parent, args) => updateProject(args),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RooteQuery,
  mutation,
});
