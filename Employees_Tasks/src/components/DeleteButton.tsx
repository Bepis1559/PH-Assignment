import { ReactElement, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import text from "../../helpers/propsText.json";
import { ApiRequest } from "../helpers/ApiRequest";
import { GetAndSetToResult } from "../helpers/GetAndSetToResult";

type propsObject = {
  aria_label: string;
  setEntity : any // cause of reusability
  URL : string
  // setEntity: React.Dispatch<React.SetStateAction<Employee[] | Task>>;
};

export const DeleteButton = ({
  aria_label,
  setEntity,
  URL
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
    ApiRequest(URL + idForDeleting?.toString(), {
      method: "DELETE",
    });
    setTimeout(() => {
      GetAndSetToResult(setEntity, URL);
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
