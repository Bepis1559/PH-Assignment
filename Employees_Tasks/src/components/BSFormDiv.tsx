import { ReactElement } from "react";


type propsObject = {
  content : string
  contentType : string
  value : string | number
  setEntity : React.Dispatch<React.SetStateAction<string | number>>;
}


export const BSFormDiv = ({content,contentType,value,setEntity}: propsObject): ReactElement => {
  const placeHolder = `Set a new ${content} `;
  return (
    <div className="mb-3 mt-3">
      <label htmlFor={content} className="form-label">
        {content}:
      </label>
      <input
      value={value}
      onChange = {(e) => setEntity(e.target.value)}
        type={contentType}
        className="form-control"
        id={content}
        placeholder={placeHolder}
        name={content}
      />
    </div>
  );
};
