import { ReactElement } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { EmployeeForm } from "./EmployeeForm";
import { Employee } from "./Employee";
import { Task } from "../Tasks/Task";

type propsObject = {
  show: boolean;
  handleClose: () => void;
  content : string;
  setEntity: React.Dispatch<React.SetStateAction<Employee[] | Task[]>>;
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
        <EmployeeForm setEntity={setEntity} handleClose={handleClose} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
