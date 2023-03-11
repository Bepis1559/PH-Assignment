import { ReactElement } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';


type propsObject = {
  aria_describedby : string
  aria_label : string
} 

export const EditButton = ({aria_describedby,aria_label} : propsObject) : ReactElement =>{
  return(
    <button type="button" aria-describedby={aria_describedby} aria-label={aria_label} aria-haspopup="true" className="btn btn-primary "><FontAwesomeIcon icon={faEdit}/></button>

  )
}