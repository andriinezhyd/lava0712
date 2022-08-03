import React from "react";

import "./Button.css";

export const Button = ({ className = "", ...props }) => (
  <button id={props.id} className={`btn ${className}`} onClick={props.onClick}>
    {props.text}
  </button>
);
