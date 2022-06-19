import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Clients from "./Components/Clients";
import Header from "./Components/Header";

const cache = new InMemoryCache();
// {
// typePolicies: {
//   Query: {
//     fields: {
//       clients: {
//         merge(existing, incoming) {
//           return incoming;
//         },
//       },
//       projects: {
//         merge(existing, incoming) {
//           return incoming;
//         },
//       },
//     },
//   },
// },
// }

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPH_HOST,
  cache: cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
