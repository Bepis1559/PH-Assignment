
import React, { ReactElement , useReducer } from "react";
import { ApiRequest } from "../../helpers/ApiRequest";
import text from '../../helpers/propsText.json'
import { Task } from "./Task";
import { GetAndSetToResult } from "../../helpers/GetAndSetToResult";


type propsObject = {
   handleClose : () => void
   setEntity : React.Dispatch<React.SetStateAction<Task[]>>
}




type FormAction = 
 | {type : 'setTitle';payload : string}
 | {type : 'setDescription';payload : string}
 | {type : 'setAssignee';payload : string}
 | {type : 'setDueDate';payload : string}
 | {type : 'setDone';payload : boolean}


 const initialState : Task = {
    title : '',
    description : '',
    assignee : '',
    dueDate : '',
    done : false
 }

 const formReducer = (state : Task,action : FormAction ) : Task =>{
       switch(action.type) {
        case 'setTitle' :
            return {...state,title : action.payload}
        case 'setDescription' :
            return {...state,description : action.payload }
        case 'setAssignee' :
            return {...state,assignee : action.payload }
        case 'setDueDate' :
            return {...state,dueDate : action.payload }
        case 'setDone' :
            return {...state,done : action.payload }
       }
 }

 


export const TaskForm = ({handleClose ,setEntity } : propsObject) : ReactElement =>{




    const [state,dispatch] = useReducer(formReducer,initialState)

    const apiRequestBody : Task = {
        title: state.title,
        description: state.description,
        assignee: state.assignee,
        dueDate: state.dueDate,
        done: state.done
    }

    const postOptions = {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(apiRequestBody)
    }



   

     

    const handleSubmitButton = (e : React.MouseEvent<HTMLButtonElement>) =>{
      e.preventDefault()
      
        ApiRequest(text.URL.task,postOptions)
        setTimeout(() => {
          GetAndSetToResult(setEntity,text.URL.task)
      }, 100)
        handleClose()
      
        }
    
    return(
        <form method="post" action="http://localhost:5000/task">
        <div className="mb-3 mt-3">
        <label htmlFor="title" className="form-label">Title :</label>
      <input required value={state.title} onChange={(e) => dispatch({type : "setTitle" , payload : e.target.value})} type="text" className="form-control" id="title" placeholder="Enter Title" name="title"/>
        </div>
        <div className="mb-3 mt-3">
      <label htmlFor="description" className="form-label">Description:</label>
      <input required value={state.description} onChange={(e) => dispatch({type : "setDescription" , payload : e.target.value})} type="description" className="form-control" id="description" placeholder="Enter description" name="description"/>
      </div>
        <div className="mb-3 mt-3">
      <label htmlFor="assignee" className="form-label">Assignee  :</label>
      <input required  value={state.assignee} onChange={(e) => dispatch({type:"setAssignee",payload : e.target.value})} type="text" className="form-control" id="assignee" placeholder="Enter assignee" name="assignee"/>
      </div>
        <div className="mb-3 mt-3">
      <label htmlFor="DueDate" className="form-label">Due date :</label>
      <input required value={state.dueDate} onChange={(e) => dispatch({type : "setDueDate",payload:e.target.value})} type="date" className="form-control" id="DueDate" placeholder="Enter due date : " name="DueDate"/>
      </div>
        <div className="mb-3 mt-3">
      <label htmlFor="done" className="form-label">Done :</label>
      <input  required checked={state.done} onChange={(e) => dispatch({type : "setDone",payload:e.target.checked})} type="checkbox" className="form-control  form-check-input " id="done"  name="done"/>
      </div>
      
        
        <button onClick={(e) => handleSubmitButton(e)} type="submit" className="btn btn-primary">Submit</button>
      </form> 
    )
}