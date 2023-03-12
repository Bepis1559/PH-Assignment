import { ReactElement, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Employee } from "./Employee";
import { PopUp } from "./PopUp";
import { Task } from "../Tasks/Task";

type propsObject = {
  aria_describedby: string;
  aria_label: string;
  content: string;
  setEntity: React.Dispatch<React.SetStateAction<Employee[] | Task[]>>;
};

export const AddButton = ({
  aria_describedby,
  aria_label,
  content,
  setEntity,
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
        setEntity={setEntity}
        content = {content}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
};
