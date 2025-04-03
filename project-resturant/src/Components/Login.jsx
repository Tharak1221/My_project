
import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./Main.css";

const Login = ({ setPage , setUser}) => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const validateField = (name, value) => {
    if (!value) {
      return name === "identifier" ? "Enter username or email" : "Enter password";
    }
    return "";
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);
      
      if (response.data.success) {
        setErrors({});
        setTimeout(() => {
          if (typeof setPage === "function") {
              console.log("Login successful! Navigating to Home Page...");
              setUser(response.data.user); 
              localStorage.setItem("token", response.data. data.token); 
              setUser(response.data.user);
            setPage("home"); 
          } else {
            console.error("setPage is not a function");
          }
        }, 1000);
      } else {
        setErrors({ form: response.data.message || "Invalid details. Please try again." });
      }
    } catch (error) {
      setErrors({ form: error.response?.data?.message || "Login failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="p-3 border rounded shadow bg-white">
        {[
          { name: "identifier", type: "text", placeholder: "Username or Email" },
          { name: "password", type: "password", placeholder: "Password" }
        ].map(({ name, type, placeholder }) => (
          <div className="mb-3 position-relative" key={name}>
            <input
              type={type}
              name={name}
              className={`form-control ${errors[name] && touched[name] ? "input-error" : ""}`}
              placeholder={touched[name] && errors[name] ? errors[name] : placeholder}
              value={formData[name]}
              onChange={handleChange}
              onBlur={() => setTouched({ ...touched, [name]: true })}
            />
            {errors[name] && touched[name] && <div className="tooltip-error">{errors[name]}</div>}
          </div>
        ))}

        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>

      {errors.form && <div className="alert alert-danger mt-3">{errors.form}</div>}

      <p className="mt-3 text-center">
        Don't have an account?{" "}
        <button className="btn btn-link p-0 align-baseline" onClick={() => setPage && setPage("signup")}>
          Signup
        </button>
      </p>
    </div>
  );
};

export default Login;

