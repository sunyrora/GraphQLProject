const ConfirmModal = ({
  buttonText = "Confirm",
  icon,
  message = "Are you sure?",
  callBackConfirm,
}) => {
  const onClickYes = (e) => {
    callBackConfirm(e);
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-danger medium"
        data-bs-toggle="modal"
        data-bs-target="#confirmModal"
      >
        {icon ? icon : ""}
        {buttonText}
      </button>

      <div
        className="modal fade"
        id="confirmModal"
        // role="dialog"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmModalLabel">
                {buttonText}
              </h5>
              <button
                type="button"
                className="btn-close medium"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                {/* <span aria-hidden="true">&times;</span> */}
              </button>
            </div>
            <div className="modal-body">{message} </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClickYes}
                data-bs-dismiss="modal"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
