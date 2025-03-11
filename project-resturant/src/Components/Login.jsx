import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Main.css";

const Login = ({ setPage }) => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showTooltip, setShowTooltip] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.identifier) newErrors.identifier = "Invalid username or email";
    if (!formData.password) newErrors.password = "Invalid password";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const storedData = localStorage.getItem("userDetails");
    if (!storedData) {
      setErrors({ form: "Invalid details. Please try again." });
      return;
    }

    const { username, email, password: storedPassword } = JSON.parse(storedData);

    if (
      (formData.identifier.trim().toLowerCase() === username.toLowerCase() ||
        formData.identifier.trim().toLowerCase() === email.toLowerCase()) &&
      formData.password === storedPassword
    ) {
      setErrors({});
      setTimeout(() => {
        setPage("home");
      }, 1500);
    } else {
      setErrors({ form: "Invalid details. Please try again." });
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleLogin} className="p-3 border rounded shadow bg-white">
        {["identifier", "password"].map((field) => (
          <div className="mb-3 position-relative" key={field}>
            <label className="form-label">{field === "identifier" ? "Username or Email" : "Password"}</label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              className={`form-control ${errors[field] && touched[field] ? "input-error" : ""}`}
              placeholder={touched[field] && errors[field] ? errors[field] : `Enter ${field}`}
              value={formData[field]}
              onChange={handleChange}
              onBlur={() => setTouched({ ...touched, [field]: true })}
              onMouseEnter={() => setShowTooltip({ ...showTooltip, [field]: true })}
              onMouseLeave={() => setShowTooltip({ ...showTooltip, [field]: false })}
            />
            {showTooltip[field] && errors[field] && <div className="tooltip-error">{errors[field]}</div>}
          </div>
        ))}

        <Button type="submit" variant="primary">Login</Button>
      </form>

      {errors.form && <div className="alert alert-danger mt-3">{errors.form}</div>}

      <p className="mt-3">
        Don't have an account?{" "}
        <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setPage("signup")}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
