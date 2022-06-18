import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import Client from "./Client";
import Spinner from "./Spinner";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h2>{`Error Clients Screen: ${error.message}`}</h2>
      ) : (
        <div>
          {data.clients.map((client) => (
            <Client key={client.id} client={client} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;
