import { FaTrash } from "react-icons/fa";

const Client = ({ client, deleteHandler }) => {
  const { name, email, phone } = client;
  return (
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
};

export default Client;
