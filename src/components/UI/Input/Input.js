import React from "react";
// import styles from "./Input.modules.css";

const Input = ({ type, id, value, onChange, onBlur, className, htmlFor }) => {
  return (
    <div
      className={className}
    >
      <label htmlFor={htmlFor}>E-Mail</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
      />
    </div>
  )
}

export default Input;