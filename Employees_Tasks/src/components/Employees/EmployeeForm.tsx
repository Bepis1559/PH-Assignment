
import React, { ReactElement , useReducer } from "react";
import { ApiRequest } from "../../helpers/ApiRequest";
import text from '../../helpers/propsText.json'
import { Employee } from "./Employee";
import { GetAndSetToResult } from "../../helpers/GetAndSetToResult";
import { Task } from "../Tasks/Task";


type propsObject = {
   handleClose : () => void
   setEntity : React.Dispatch<React.SetStateAction<Employee[] | Task[]>>
}




type FormAction = 
 | {type : 'setFullName';payload : string}
 | {type : 'setEmail';payload : string}
 | {type : 'setPhone';payload : number}
 | {type : 'setdateOfBirth';payload : string}
 | {type : 'setMonthlySalary';payload : number}


 const initialState : Employee = {
    fullName : '',
    email : '',
    phoneNumber : 0,
    dateOfBirth : '',
    monthlySalary : 0,
 }

 const formReducer = (state : Employee,action : FormAction ) : Employee =>{
       switch(action.type) {
        case 'setFullName' :
            return {...state,fullName : action.payload}
        case 'setEmail' :
            return {...state,email : action.payload }
        case 'setPhone' :
            return {...state,phoneNumber : action.payload }
        case 'setdateOfBirth' :
            return {...state,dateOfBirth : action.payload }
        case 'setMonthlySalary' :
            return {...state,monthlySalary : action.payload }
       }
 }

 


export const EmployeeForm = ({handleClose ,setEntity } : propsObject) : ReactElement =>{




    const [state,dispatch] = useReducer(formReducer,initialState)

    const apiRequestBody : Employee = {
        fullName: state.fullName,
        email: state.email,
        phoneNumber: state.phoneNumber,
        dateOfBirth: state.dateOfBirth,
        monthlySalary: state.monthlySalary
    }

    const postOptions = {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(apiRequestBody)
    }

    
    
    const handleSubmitButton = (e : React.MouseEvent<HTMLButtonElement>) =>{
      
        e.preventDefault()
        ApiRequest(text.URL.employee,postOptions)
        setTimeout(() => {
          GetAndSetToResult(setEntity,text.URL.employee)
      }, 100)
        handleClose()
     
        
    }
    
    // Typescript cries too much if I try to make onChange with a function
    return(
        <form method="post" action="http://localhost:5000/employee">
        <div className="mb-3 mt-3">
        <label htmlFor="FullName" className="form-label">Full name:</label>
      <input required value={state.fullName} onChange={(e) => dispatch({type : "setFullName" , payload : e.target.value})} type="text" className="form-control" id="FullName" placeholder="Enter full name" name="FullName"/>
        </div>
        <div className="mb-3 mt-3">
      <label htmlFor="email" className="form-label">Email:</label>
      <input required value={state.email} onChange={(e) => dispatch({type : "setEmail" , payload : e.target.value})} type="email" className="form-control" id="email" placeholder="Enter email" name="email"/>
      </div>
        <div className="mb-3 mt-3">
      <label htmlFor="PhoneNumber" className="form-label">Phone number:</label>
      <input required  value={state.phoneNumber} onChange={(e) => dispatch({type:"setPhone",payload : parseInt(e.target.value)})} type="tel" className="form-control" id="PhoneNumber" placeholder="Enter phone number" name="PhoneNumber"/>
      </div>
        <div className="mb-3 mt-3">
      <label htmlFor="Date_of_birth" className="form-label">Date of birth:</label>
      <input required value={state.dateOfBirth} onChange={(e) => dispatch({type : "setdateOfBirth",payload:e.target.value})} type="date" className="form-control" id="Date_of_birth" placeholder="Enter date of birth" name="Date_of_birth"/>
      </div>
        <div className="mb-3 mt-3">
      <label htmlFor="Monthly_salary" className="form-label">Monthly salary:</label>
      <input required value={state.monthlySalary} onChange={(e) => dispatch({type : "setMonthlySalary",payload : parseInt(e.target.value)}) } type="number" className="form-control" id="Monthly_salary" placeholder="Enter monthly salary" name="Monthly_salary"/>
      </div>
        
        <button onClick={(e) => handleSubmitButton(e)} type="submit" className="btn btn-primary">Submit</button>
      </form> 
    )
}