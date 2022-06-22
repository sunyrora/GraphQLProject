import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditProjectScreen from "./Containers/EditProjectScreen";
import HomeScreen from "./Containers/HomeScreen";
import NotFoundScreen from "./Containers/NotFoundScreen";
import ProjectDetailScreen from "./Containers/ProjectDetailScreen";

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPH_HOST,
  cache: cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/project/:id" element={<ProjectDetailScreen />} />
            <Route path="/editProject" element={<EditProjectScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
