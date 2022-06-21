import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFoundScreen = () => {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <FaExclamationTriangle
          className="text-danger"
          size="5em"
        ></FaExclamationTriangle>
        <h1>404</h1>
        <p className="lead">Sorry, this page des not exist</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </>
  );
};

export default NotFoundScreen;