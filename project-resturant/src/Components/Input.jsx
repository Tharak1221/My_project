// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
 
// const Input = ({ type, name, value, placeholder, onChange, onBlur, error }) => {
//   return (
//     <div className="mb-3">
//       <input
//         type={type}
//         name={name}
//         value={value}
//         placeholder={placeholder}
//         onChange={onChange}
//         onBlur={onBlur}
//         className={`form-control ${error ? "is-invalid" : ""}`}
//       />
//       {error && <div className="invalid-feedback">{error}</div>}
//     </div>
//   );
// };
 
// export default Input;
import React from "react";

const Input = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  const borderColor = touched
    ? error
      ? "2px solid #dc3545" // red
      : "2px solid #28a745" // green
    : "1px solid #ced4da"; // default

  return (
    <div className="mb-3 position-relative">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className="form-control"
        style={{
          border: borderColor,
          boxShadow: "none",
        }}
      />
      {touched && error && (
        <div
          style={{
            position: "absolute",
            top: "-0.4rem",
            right: "0.5rem",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            fontSize: "0.75rem",
            padding: "4px 8px",
            borderRadius: "0.25rem",
            whiteSpace: "nowrap",
            zIndex: "5",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
