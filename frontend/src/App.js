import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Clients from "./Components/Clients";
import Header from "./Components/Header";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPH_HOST,
  cache: new InMemoryCache(),
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
