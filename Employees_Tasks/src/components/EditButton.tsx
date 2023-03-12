import { ReactElement, useRef, useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import text from "../helpers/propsText.json";
import { BSFormDiv } from "./BSFormDiv";
import { GetAndSetToResult } from "../helpers/GetAndSetToResult";

type propsObject = {
  aria_describedby: string
  aria_label: string
  setEmployees : () => void
};
const updateEmployee = async(data : any) =>{
  await fetch(text.URL.server,
    {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    )
 }   

export const EditButton = ({aria_describedby, aria_label,setEmployees }: propsObject): ReactElement => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    const [id,setId] = useState<number>()
    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [phoneNumber,setPhoneNumber] = useState(0)
    const [dateOfBirth,setDateOfBirth] = useState('')
    const [monthlySalary,setmonthlySalary] = useState(0)

    const editBtnRef = useRef(null)
  

   const putData = {
    id : id,
    fullName : fullName,
     email : email,
     phoneNumber : phoneNumber,
     dateOfBirth : dateOfBirth,
     monthlySalary : monthlySalary,
   }
   useEffect(() => {
    if (editBtnRef.current) {
      setId(
        // @ts-ignore 
      editBtnRef.current?.parentNode.parentNode.firstChild.textContent,
      );
    }
  }, [editBtnRef]);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // @ts-ignore
    const employeeId = editBtnRef.current?.parentNode.parentNode.firstChild.textContent
    setId(employeeId)
    updateEmployee(putData)
    setTimeout(() => {
      GetAndSetToResult(setEmployees,text.URL.server)
  }, 100)
    handleClose();

  };

  return (
    <>
      <Button
        ref={editBtnRef}
        aria-describedby={aria_describedby}
        aria-label={aria_label}
        aria-haspopup="true"
        variant="primary"
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="/action_page.php">
            {/* @ts-ignore */}
            <BSFormDiv content="Full name" contentType = "text" value = {fullName} setValue = {setFullName}    />
             {/* @ts-ignore */}
            <BSFormDiv content="Email" contentType = "email" value = {email} setValue = {setEmail}   />
             {/* @ts-ignore */}
            <BSFormDiv content={`Phone number`} contentType = "tel" value = {phoneNumber} setValue = {setPhoneNumber}   />
             {/* @ts-ignore */}
            <BSFormDiv content="Date of birth" contentType = "date"  value = {dateOfBirth} setValue = {setDateOfBirth}  />
             {/* @ts-ignore */}
            <BSFormDiv content="Monthly salary" contentType = "number" value = {monthlySalary} setValue = {setmonthlySalary}  />

            <Button
            
              type="submit"
              variant="primary"
              onClick={(e) => handleSubmit(e)}
            >
              Save Changes
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
