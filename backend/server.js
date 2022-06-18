require("dotenv").config();
const colors = require("colors");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();
app.use(express.json());
connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP((req, res, params) => ({
    schema,
    context: { req, res },
    graphiql: process.env.NODE_ENV !== "production",
  }))
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
