const Spinner = () => {
  return (
    <div className="text-center">
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Loading...
    </div>
  );
};

export default Spinner;
