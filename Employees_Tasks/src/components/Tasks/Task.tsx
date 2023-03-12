import { ReactElement } from "react";
import text from '../../helpers/propsText.json'
import { DeleteButton } from "../DeleteButton";
import { EditButton } from "./EditButton";




export type Task = {
    id? : number
    title : string
    description : string,
    assignee : string,
    dueDate : string,
    done : boolean,
    setEntity? : React.Dispatch<React.SetStateAction<Task[]>> 
}


export const Task = (props : Task) : ReactElement => {
    const{
        id,
        title,
        description ,
        assignee ,
        dueDate ,
        done,
        setEntity 
    } = props

        return(
            <tr>
              <td>{id}</td>
              <td>{title}</td>
              <td>{description}</td>
              <td>{assignee}</td>
              <td>{dueDate}</td>
              <td>{done.toString()}</td>
              <td className="action-td">
                {/* @ts-ignore */}
               
            <EditButton setEntity = {setEntity} aria_label={text.Task.EditBtn.aria_label} aria_describedby={text.Task.EditBtn.aria_describedby}/>
             {/* @ts-ignore */}
            <DeleteButton URL = {text.URL.task} setEntity = {setEntity}  aria_label={text.Task.DeleteBtn.aria_label}/>
            </td>
            </tr>
        )
}