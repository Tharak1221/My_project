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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showTooltip, setShowTooltip] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = "Phone number must start with 6-9 and be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validate()) return;

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

      <form onSubmit={handleSignup} className="p-3 border rounded shadow bg-white">
        {[
          { name: "name", type: "text", placeholder: "Full Name" },
          { name: "username", type: "text", placeholder: "Username" },
          { name: "email", type: "email", placeholder: "Email Address" },
          { name: "password", type: "password", placeholder: "Password" },
          { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
          { name: "phone", type: "tel", placeholder: "Phone Number" },
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
              onMouseEnter={() => setShowTooltip({ ...showTooltip, [name]: true })}
              onMouseLeave={() => setShowTooltip({ ...showTooltip, [name]: false })}
            />
            {showTooltip[name] && errors[name] && <div className="tooltip-error">{errors[name]}</div>}
          </div>
        ))}

        <button type="submit" className="btn btn-success w-100">Sign Up</button>
      </form>

      <p className="mt-3 text-center">
        Already have an account?{" "}
        <button className="btn btn-link p-0" onClick={() => setPage("login")}>Login</button>
      </p>
    </div>
  );
};

export default Signup;
