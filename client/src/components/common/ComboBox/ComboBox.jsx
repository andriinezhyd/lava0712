import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, {useState} from "react";

import "./ComboBox.scss";

export const ComboBox = ({valueProduct, setValueProduct, arrayItems = [], className = "", isValid = true, ...props}) => {

  const [value, setValue] = useState(null);
  // const [inputValue, setInputValue] = useState('');


  return (
    <div className="form-group">
      {!!props.label && <label htmlFor="input-field">{props.label}</label>}
      <Autocomplete
        value={value}
        onChange={() => {
          // setValue(newValue);
        }}
        inputValue={valueProduct}
        onInputChange={(event, newInputValue) => {
          setValueProduct(newInputValue);
        }}
        className={`form-control ${isValid ? "" : "no-valid"} ${className}`}
        disablePortal
        id={`combo-box`}
        options={arrayItems}
        // sx={{ height: 30 }}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  )
}