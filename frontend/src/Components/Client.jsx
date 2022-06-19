import { FaTrash } from "react-icons/fa";

const Client = ({ client, deleteHandler }) => {
  const { name, email, phone } = client;
  return (
    // <div className="container">
    <div className="row">
      <div className="col-sm">{name}</div>
      <div className="col-sm">{email}</div>
      <div className="col-sm">{phone}</div>
      <div className="col-sm">
        <button className="btn btn-danger btn-sm" onClick={deleteHandler}>
          <FaTrash />
        </button>
      </div>
    </div>
    // </div>
  );
};

export default Client;
