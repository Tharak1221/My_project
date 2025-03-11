import React from "react";

const Prop = ({
  label,
  type,
  name,
  value,
  placeholder,
  error,
  touched,
  onChange,
  onBlur,
}) => {
  return (
    <div className="mb-3 position-relative">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        className={`form-control ${error && touched ? "input-error" : ""}`}
        placeholder={touched && error ? error : placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {touched && error && <div className="tooltip-error">{error}</div>}
    </div>
  );
};

export default Prop;
