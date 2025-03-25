import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "./Input";
import { validations } from "./validations";

const Signup = ({ setPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/userdetails")
      .then(response => {
        console.log("Fetched data:", response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    if (validations[name]) {
      const validationResult =
        name === "confirmPassword"
          ? validations[name](formData.password, value)
          : validations[name](value);
      return validationResult.isValid ? "" : validationResult.message;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    );

    console.log("Navigating to login...");
    setIsSubmitting(false);
    setPage("login");
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSignup} className="p-3 border rounded shadow bg-white">
        {[
          { name: "name", type: "text", placeholder: "Full Name" },
          { name: "username", type: "text", placeholder: "Username" },
          { name: "email", type: "email", placeholder: "Email Address" },
          { name: "password", type: "password", placeholder: "Password" },
          { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
          { name: "phone", type: "tel", placeholder: "Phone Number" },
        ].map(({ name, type, placeholder }) => (
          <div key={name} className="mb-1">
            <Input
              type={type}
              name={name}
              value={formData[name]}
              placeholder={placeholder}
              error={errors[name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-3 text-center">
        Already have an account?{' '}
        <button className="btn btn-link p-0 align-baseline" onClick={() => setPage("login")}>
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
