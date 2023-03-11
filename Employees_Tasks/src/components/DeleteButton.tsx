import { ReactElement } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';



type propsObject = {
    aria_label : string
}
export const DeleteButton = ({aria_label} : propsObject) : ReactElement =>{
    return(
        <button type="button" aria-label={aria_label} className="btn btn-danger "><FontAwesomeIcon icon={faTrash}/></button>
    )
}