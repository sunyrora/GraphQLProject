import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ADD_CLIENT, DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import Client from "../Components/Client";
import Spinner from "../Components/Spinner";
import AddClientModal from "../Components/AddClientModal";

const ClientsScreen = () => {
  const [err, setError] = useState("");
  const [addCount, setAddCount] = useState(0);
  /*
    apollo updateCache arguments example
     @updateTo: String
       Client {
                        id
                        name
                        email
                        phone
                      }
    @data: Object
    */
  /* const updateCache = (cache, data = {}, updateTo = "", isDeleted = false) => {
    const updateField = isDeleted
      ? {
          clients: (existings, { readField }) => {
            return existings.filter(
              (client) => readField("_id", client) !== data.id
            );
          },
        }
      : {
          clients: (existings = []) => {
            const updatedData = cache.writeFragment({
              data: data,
              fragment: gql`
                        fragment updatedData on ${updateTo}`,
            });

            return [...existings, updatedData];
          },
        };

    console.log("updatedField: ", updateField);
    // updateField[field] = isDeleted
    //   ? (existings = []) => {
    //       const updatedData = existings.filter((item) => item.id !== data.id);
    //       console.log("updatedData: ", updatedData);
    //       cache.writeQuery({
    //         query: GET_CLIENTS,
    //         data: { [field]: updatedData },
    //       });
    //     }
    //   : (existing = []) => {
    //       const updatedData = cache.writeFragment({
    //         data: data,
    //         fragment: gql`
    //                     fragment updatedData on ${updateTo}`,
    //       });
    //       return [...existing, updatedData];
    //     };
    cache.modify({
      fields: updateField,
    });
  }; */

  const { loading, error, data: clientsData } = useQuery(GET_CLIENTS);
  const [addClient, { loading: addEnCours, error: addError }] = useMutation(
    ADD_CLIENT,
    {
      //   update: (cache, { data: { addClient } }) => {
      //     const updateTo = `Client {
      //                 id
      //                 name
      //                 email
      //                 phone
      //               }`;
      //     updateCache(cache, addClient, updateTo);
      //   },

      update(cache, { data: { addClient } }) {
        cache.modify({
          fields: {
            clients(existingClients = []) {
              const newClient = cache.writeFragment({
                data: addClient,
                fragment: gql`
                  fragment newClient on Client {
                    id
                    name
                    email
                    phone
                  }
                `,
              });
              return [...existingClients, newClient];
            },
          },
        });
      },
    }
  );
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update: (cache, { data: { deleteClient } }) => {
      const normalizedId = cache.identify({
        id: deleteClient.id,
        __typename: "Client",
      });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });

  const addClientHandler = async (e, client) => {
    e.preventDefault();

    try {
      await addClient({ variables: { ...client } });
    } catch (error) {
      console.error("addClient Error: ", error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }

    if (!addEnCours && !addError) setAddCount(addCount + 1);
  };

  const deletClientHandler = async (e, id) => {
    e.preventDefault();

    try {
      await deleteClient({ variables: { id: id } });
    } catch (error) {
      console.error("deletClient Error: ", error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h2>{`Error Clients Screen: ${error.message}`}</h2>
      ) : (
        <div className="d-grid gap-2 mb-5">
          <div className="row">
            <div className="col">
              <AddClientModal handleSubmit={addClientHandler} />
              {/* <button
                type="button"
                className="btn btn-primary"
                onClick={(e) =>
                  addClientHandler(e, {
                    name: `Add test ${addCount}`,
                    email: "algkjdflj@alfdjk.com",
                    phone: "143543646",
                  })
                }
              >
                Add Client
              </button> */}
            </div>
          </div>
          <div className="row pb-1 border-bottom fw-bold text-center">
            <div className="col">Name</div>
            <div className="col">Email</div>
            <div className="col">Phone</div>
            <div className="col-1"></div>
          </div>
          {clientsData.clients.map((client) => (
            <Client
              key={client.id}
              client={client}
              deleteHandler={(e) => deletClientHandler(e, client.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientsScreen;
