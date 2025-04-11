
import React, { useState,useEffect } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import "./Main.css";
import loginIamge from "../images/image3.jpg";

const Login = ({ setPage , setUser}) => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);



  useEffect(() => {
      document.body.style.margin = "0";
      document.body.style.padding = "0";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      return () => {
        document.body.style.overflow = "";
        document.body.style.height = "";
      };
    }, []);

  const divStyle = {
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${loginIamge})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
    position: "fixed",
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    overflow: "hidden",
  };

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
   
    <div style ={divStyle}>
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

<div className="d-flex justify-content-center">
  <Button type="submit" variant="primary" disabled={isSubmitting}>
    {isSubmitting ? "Logging in..." : "Login"}
  </Button>
</div>
        <p className="mt-3 text-center" style={{ color: "darkblue" }}>
  Don't have an account?{" "}
  <button
    className="btn btn-link p-0 align-baseline"
    style={{ color: "Black", textDecoration: "underline" }}
    onClick={() => setPage && setPage("signup")}
  >
    Signup
  </button>
  </p>
      </form>

      {errors.form && <div className="alert alert-danger mt-3">{errors.form}</div>}

      {/* <p className="mt-3 text-center">
        Don't have an account?{" "}
        <button className="btn btn-link p-0 align-baseline" onClick={() => setPage && setPage("signup")}>
          Signup
        </button>
      </p> */}
     

    </div>
    </div>
   
  );
};

export default Login;

