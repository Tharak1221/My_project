import React, { useState } from "react";
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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/userdetails")
  //     .then((response) => console.log("Fetched data:", response.data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  // Validate a single field
  const validateField = (name, value, currentFormData = formData) => {
    if (validations[name]) {
      const validationResult =
        name === "confirmPassword"
          ? validations[name](currentFormData.password, value)
          : validations[name](value);

      return validationResult.isValid ? "" : validationResult.message;
    }
    return "";
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched((prevTouched) => {
      const allTouched = {};
      Object.keys(formData).forEach((key) => {
        allTouched[key] = true;
      });
      return allTouched;
    });

    return Object.keys(newErrors).length === 0;
  };

  // Handle input change (validates in real-time after touched)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };

      // Validate field immediately after it was touched
      if (touched[name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validateField(name, value, newData),
        }));
      }

      return newData;
    });

    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  // Handle input blur (validates when leaving the field)
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    // Validate immediately when the user moves to another field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...signupData } = formData;
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        signupData
      );

      alert(response.data.message);
      setPage("login");
    } catch (error) {
      console.error(
        "Error signing up:",
        error.response?.data?.message || "Signup failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="mb-4 text-center">Sign Up</h2>
      <form
        onSubmit={handleSignup}
        className="p-3 border rounded shadow bg-white"
      >
        {[
          { name: "name", type: "text", placeholder: "Full Name" },
          { name: "username", type: "text", placeholder: "Username" },
          { name: "email", type: "email", placeholder: "Email Address" },
          { name: "password", type: "password", placeholder: "Password" },
          {
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
          },
          { name: "phone", type: "tel", placeholder: "Phone Number" },
        ].map(({ name, type, placeholder }) => (
          <div key={name} className="mb-2 position-relative">
            <Input
              type={type}
              name={name}
              value={formData[name]}
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-control ${
                touched[name] && errors[name] ? "is-invalid" : ""
              }`}
            />
            {touched[name] && errors[name] && (
              <div className="invalid-feedback" style={{ display: "block" }}>
                {errors[name]}
              </div>
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-3 text-center">
        Already have an account?{" "}
        <button
          className="btn btn-link p-0 align-baseline"
          onClick={() => setPage("login")}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
