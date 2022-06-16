const { projects, clients } = require("../sampleData");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

const Project = require("../models/Project");

const {
  getProjects,
  getProjectById,
} = require("../controller/ProjectController");
const { getClients, getClientById } = require("../controller/ClientController");

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
      resolve(parent, arg) {
        return clients.find((client) => client.id === parent.clientId);
      },
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
      resolve: (parentValue, args) => getClientById(args.id),
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

module.exports = new GraphQLSchema({
  query: RooteQuery,
});
