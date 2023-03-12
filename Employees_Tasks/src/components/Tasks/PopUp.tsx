import { ReactElement } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { TaskForm } from "./TaskForm";
import { Task } from "./Task";

type propsObject = {
  show: boolean;
  handleClose: () => void;
  content : string;
  setEntity: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const PopUp = ({
  show,
  handleClose,
  content,
  setEntity,
}: propsObject): ReactElement => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set the characteristics of the {content} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* @ts-ignore */}
        <TaskForm setEntity={setEntity} handleClose={handleClose} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
