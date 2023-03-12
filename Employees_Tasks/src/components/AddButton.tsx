import { ReactElement, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Employee } from "./Employee";
import { PopUp } from "./PopUp";

type propsObject = {
  aria_describedby: string;
  aria_label: string;
  content: string;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
};

export const AddButton = ({
  aria_describedby,
  aria_label,
  content,
  setEmployees,
}: propsObject): ReactElement => {
  const [show, setShow] = useState(false);
  const handleAddBtnOnClick = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);

  return (
    <>
      <div className="add-btn-container">
        <Button
          variant="primary"
          onClick={handleAddBtnOnClick}
          type="button"
          aria-describedby={aria_describedby}
          aria-haspopup="true"
          aria-label={aria_label}
          className="btn btn-success p-2"
        >
          <FontAwesomeIcon id="faPlusIcon" icon={faPlus} />
          Add {content}
        </Button>
      </div>
      <PopUp
        setEmployees={setEmployees}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
};
