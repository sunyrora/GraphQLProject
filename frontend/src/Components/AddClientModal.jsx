import { useState } from "react";
import { FaUser } from "react-icons/fa";

const AddClientModal = ({ handleSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const tabIndex = -1;

  // const handClickAdd = (e) => {
  //   console.log(`${name}, ${email}, ${phone}`);
  // };
  const onSubmit = (e) => {
    e.preventDefault();

    handleSubmit(e, { name, email, phone });
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>
      <div
        className="modal fade"
        id="addClientModal"
        tabIndex={tabIndex}
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form onSubmit={onSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addClientModalLabel">
                  Add Client
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="m-1">
                  <label htmlFor="" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p className="fw-lighter"></p>
                  <label htmlFor="" className="form-label">
                    E-mail
                  </label>
                  <input
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    required
                    className="form-control mb-0"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="fw-light small">ex) abc@gmail.com</p>
                  <label htmlFor="" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    pattern="(No M(in!ax))|\d+"
                    required
                    className="form-control mb-0"
                    id="phone"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <p className="fw-light small">Only numbers</p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  // onClick={handClickAdd}
                  //   data-bs-dismiss="modal"
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddClientModal;
