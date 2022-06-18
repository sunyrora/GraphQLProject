import { FaTrash } from "react-icons/fa";
const Client = ({ client }) => {
  const { name, email, phone } = client;
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">Name</div>
        <div className="col-sm">Email</div>
        <div className="col-sm">Phone</div>
        <div className="col-sm"></div>
      </div>
      <div className="row">
        <div className="col-sm">{name}</div>
        <div className="col-sm">{email}</div>
        <div className="col-sm">{phone}</div>
        <div className="col-sm">
          <button className="btn btn-danger btn-sm">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Client;
