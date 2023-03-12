import { ReactElement } from "react";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import text from '../helpers/propsText.json'



export type Employee = {
    id? : number
    fullName : string
    email : string,
    phoneNumber : number,
    dateOfBirth : string,
    monthlySalary : number,
    setEmployees? : React.Dispatch<React.SetStateAction<Employee[]>> 
}

export const Employee = (props : Employee) : ReactElement =>{
    const {
      id , 
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      monthlySalary,
      setEmployees
    } = props


   



    return (
        <>
         <tr>
            <td >{id}</td>
            <td >{fullName}</td>
            <td>{email}</td>
            <td>{phoneNumber}</td>
            <td>{dateOfBirth}</td>
            <td>{monthlySalary}</td>
            <td className="action-td">
                {/* @ts-ignore */}
            <EditButton setEmployees = {setEmployees} aria_label={text.Employee.EditBtn.aria_label} aria_describedby={text.Employee.EditBtn.aria_describedby}/>
             {/* @ts-ignore */}
            <DeleteButton setEmployees = {setEmployees}  aria_label={text.Employee.DeleteBtn.aria_label} />
            </td>
        </tr>
       
</>
       
    )
}