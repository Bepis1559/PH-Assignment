import { ReactElement, useRef, useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import text from "../../helpers/propsText.json";
import { GetAndSetToResult } from "../../helpers/GetAndSetToResult";
import { BSFormDiv } from "../BSFormDiv";

type propsObject = {
  aria_describedby: string
  aria_label: string
  setEntity : () => void
};


export const EditButton = (props: propsObject): ReactElement => {

  const {
    aria_describedby, 
    aria_label,
    setEntity
  } = props

  const updateTask = async(data : any) =>{
    await fetch(text.URL.task,
      {
        method: 'PUT',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      )
   }   

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    const [id,setId] = useState<number>()
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [assignee,setAsignee] = useState('')
    const [dueDate,setDueDate] = useState('')
    const[done,setDone] = useState(false)

    const editBtnRef = useRef(null)
  

   const putData = {
    id : id,
    title : title,
     description : description,
     assignee : assignee,
     dueDate : dueDate,
     done : done,
   }
   useEffect(() => {
    if (editBtnRef.current) {
      setId(
        // @ts-ignore 
      editBtnRef.current?.parentNode.parentNode.firstChild.textContent,
      );
    }
  }, [editBtnRef]);

  // const [allowedToAdd,setAllowedToAdd] = useState(false)

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // CheckEmployeesNames(text.URL.employee,putData,setAllowedToAdd)
  //  if(allowedToAdd){
    // @ts-ignore
    const taskId = editBtnRef.current?.parentNode.parentNode.firstChild.textContent
    setId(taskId)
    updateTask(putData)
    setTimeout(() => {
      GetAndSetToResult(setEntity,text.URL.task)
  }, 100)
    handleClose();
  //   } else{
  //   setAllowedToAdd(false)
  //   console.log('Employee does not exist ! ') 
  //  }

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
            <BSFormDiv content="Title" contentType = "text" value = {title} setEntity = {setTitle}    />
             {/* @ts-ignore */}
            <BSFormDiv content="Description" contentType = "text" value = {description} setEntity = {setDescription}   />
             {/* @ts-ignore */}
            <BSFormDiv content="Asignee" contentType = "text" value = {assignee} setEntity = {setAsignee}   />
             {/* @ts-ignore */}
            <BSFormDiv content="Due date" contentType = "date"  value = {dueDate} setEntity = {setDueDate}  />
            <div className="mb-3 mt-3">
      <label htmlFor="done" className="form-label">
        Is task done ? 
      </label>
      <input checked={done} onChange = {(e) => setDone(e.target.checked)} type="checkbox" className="form-control  form-check-input " id="done" name="done"/>
    </div>

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
