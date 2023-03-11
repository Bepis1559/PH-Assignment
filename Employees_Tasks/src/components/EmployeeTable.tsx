import { ReactElement, useState, useEffect } from "react";
import { Employee } from "./Employee";
import { GetRequest } from "../helpers/GetRequest";
import { AddButton } from "./AddButton";
import text from '../helpers/propsText.json'

const URL = 'http://localhost:5000/employee/'

export type contextObject = {
    setEmployees : React.Dispatch<React.SetStateAction<Employee[]>>
}


export const EmployeeTable = () : ReactElement =>{


    const[employees,setEmployees] = useState<Employee[]>([])
   


    
    useEffect(() =>{
        GetRequest(setEmployees,URL)
    },[])
    
    
    return (
       <>
    
       <AddButton setEmployees = {setEmployees}  aria_describedby={text.Employee.AddBtn.aria_describedby} aria_label={text.Employee.AddBtn.aria_label} content={text.Employee.AddBtn.content}/>
      
        
        <table className="table table-bordered text-light">
            <thead >
        <tr>
           <th>Id</th>
           <th>Full name</th>
           <th>Email</th>
           <th>Phone number</th>
           <th>Date of birth</th>
           <th>Monthly salary</th>
           <th>Action</th>
        </tr>
     </thead>
     <tbody>
        {employees.map(employee =>
        <Employee key={employee.id} id={employee.id} fullName={employee.fullName} email = {employee.email} phoneNumber={employee.phoneNumber} dateOfBirth = {employee.dateOfBirth} monthlySalary = {employee.monthlySalary} />
        )}
    </tbody>
        </table>
       </>
       
    )
}