import { ReactElement, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import text from "../helpers/propsText.json";
import { ApiRequest } from "../helpers/ApiRequest";
import { GetAndSetToResult } from "../helpers/GetAndSetToResult";
import { Employee } from "./Employee";

type propsObject = {
  aria_label: string;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
};

export const DeleteButton = ({
  aria_label,
  setEmployees,
}: propsObject): ReactElement => {
  const deleteBtnRef = useRef(null);

  const [idForDeleting, setIdForDeleting] = useState(0);
  useEffect(() => {
    if (deleteBtnRef.current) {
     
      setIdForDeleting(
         // @ts-ignore
        deleteBtnRef.current?.parentNode.parentNode.firstChild.textContent,
      );
    }
  }, [deleteBtnRef]);
  const handleClick = () => {
    
    setIdForDeleting(
      // @ts-ignore
      deleteBtnRef.current?.parentNode.parentNode.firstChild.textContent,
    );
    // @ts-ignore
    ApiRequest(text.URL.server + idForDeleting?.toString(), {
      method: "DELETE",
    });
    setTimeout(() => {
      GetAndSetToResult(setEmployees, text.URL.server);
    }, 100);
  };
  return (
    <button
      ref={deleteBtnRef}
      onClick={handleClick}
      type="button"
      aria-label={aria_label}
      className="btn btn-danger "
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};
