import { FaEnvelope, FaIdBadge, FaPhone, FaTrash } from "react-icons/fa";
import { CLIENT_TYPE_LIST, CLIENT_TYPE_INSIDE_PROJECT } from "../constants";

const Client = ({ client, deleteHandler = null, type = CLIENT_TYPE_LIST }) => {
  if (!client) return <p>No Client Information</p>;

  const { name, email, phone } = client;
  let showClient;
  switch (type) {
    // in the HomeScreen
    case CLIENT_TYPE_LIST: {
      showClient = (
        <div className="row  border-bottom pb-1 text-center">
          <div className="col">{name}</div>
          <div className="col">{email}</div>
          <div className="col">{phone}</div>
          <div className="col-1">
            <button className="btn btn-danger btn-sm" onClick={deleteHandler}>
              <FaTrash />
            </button>
          </div>
        </div>
      );
      break;
    }
    // in the ProjectScreen
    case CLIENT_TYPE_INSIDE_PROJECT:
      showClient = (
        <div className="mt-1 mb-3">
          <ul className="list-group">
            <li className="list-group-item">
              <FaIdBadge className="icon" /> {client.name}
            </li>
            <li className="list-group-item">
              <FaEnvelope className="icon" /> {client.email}
            </li>
            <li className="list-group-item">
              <FaPhone className="icon" /> {client.phone}
            </li>
          </ul>
        </div>
      );
      break;
    default:
      showClient = <div>No Client data</div>;
  }

  return showClient;
};

export default Client;
