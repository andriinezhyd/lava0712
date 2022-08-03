import React from "react";

import "./Input.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export const Input = ({ className = "", isValid = true, ...props }) => (
  <div className="form-group">
    {!!props.label && <label htmlFor="input-field">{props.label}</label>}
    <input
      {...props}
      className={`form-control ${isValid ? "" : "no-valid"} ${className}`}
    />
  </div>
);
