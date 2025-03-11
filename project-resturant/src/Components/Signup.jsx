import React, { useState } from "react";
import "./Main.css"; 

const Signup = ({ setPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({}); // Holds validation errors
  const [touched, setTouched] = useState({}); // Tracks if field has been interacted with
  const [showTooltip, setShowTooltip] = useState({}); // Controls tooltip visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Remove error when user types
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true }); // Mark field as touched
  };

  const handleMouseEnter = (field) => {
    if (errors[field]) {
      setShowTooltip({ ...showTooltip, [field]: true }); // Show tooltip if there's an error
    }
  };

  const handleMouseLeave = (field) => {
    setShowTooltip({ ...showTooltip, [field]: false }); // Hide tooltip
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!/^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!/^[6-9]\d{9}$/.test(formData.phone))
      newErrors.phone = "Phone number must start with 6-9 and be 10 digits";
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validate()) return; // Stop if validation fails

    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    );

    setTimeout(() => setPage("login"), 2000);
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="mb-4 text-center">Sign Up</h2>

      <form
        onSubmit={handleSignup}
        className="p-3 border rounded shadow bg-white"
      >
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Username", name: "username", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "Confirm Password", name: "confirmPassword", type: "password" },
          { label: "Phone Number", name: "phone", type: "tel" },
        ].map(({ label, name, type }) => (
          <div className="mb-3 position-relative" key={name}>
            <label className="form-label">{label}</label>

            
            <input
              type={type}
              name={name}
              className={`form-control ${errors[name] && touched[name] ? "input-error" : ""}`} // Apply red border if error
              placeholder={touched[name] && errors[name] ? errors[name] : `Enter your ${label.toLowerCase()}`} // Show error inside input
              value={formData[name]}
              onChange={handleChange}
              onBlur={handleBlur}       
              onMouseEnter={() => handleMouseEnter(name)} 
              onMouseLeave={() => handleMouseLeave(name)} 
            />

           
            {showTooltip[name] && errors[name] && (
              <div className="tooltip-error">{errors[name]}</div>
            )}
          </div>
        ))}

        <button type="submit" className="btn btn-success w-100">
          Sign Up
        </button>
      </form>

      <p className="mt-3 text-center">
        Already have an account?{" "}
        <button className="btn btn-link p-0" onClick={() => setPage("login")}>
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
