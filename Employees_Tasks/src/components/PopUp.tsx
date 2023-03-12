import { ReactElement } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { EmployeeForm } from "./EmployeeForm";
import { Employee } from "./Employee";

type propsObject = {
  show: boolean;
  handleClose: () => void;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
};

export const PopUp = ({
  show,
  handleClose,
  setEmployees,
}: propsObject): ReactElement => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set the characteristics of the employee </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EmployeeForm setEmployees={setEmployees} handleClose={handleClose} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
