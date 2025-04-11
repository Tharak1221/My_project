
import React, { useState } from "react";
import axios from "axios";
import Input from "./Input";
import { validations } from "./validations";
import signupimage from "../images/image2.png";

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
  //   document.body.style.margin = "0";
  //   document.body.style.padding = "0";
  //   document.body.style.overflow = "hidden";
  //   document.body.style.height = "100vh";
  //   document.body.style.width = "100vw";
  //   return () => {
  //     document.body.style.overflow = "";
  //     document.body.style.height = "";
  //   };
  // }, []);

//   const divStyle = {
//   width: "100vw",
//   height: "100vh",
//   backgroundImage: `url(${signupimage})`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   backgroundAttachment: "fixed",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   position: "fixed",
//   overflow: "hidden",  
// };
const divStyle = {
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(${signupimage})`,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...signupData } = formData;
      const response = await axios.post("http://localhost:5000/api/signup", signupData);
      alert(response.data.message);
      setPage("login");
    } catch (error) {
      console.error("Error signing up:", error.response?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={divStyle}>
      <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
       
        <form onSubmit={handleSignup} className="p-3 border rounded shadow bg-white">
        <h2 className="mb-4 text-center">Sign Up</h2>
          {[
            { name: "name", type: "text", placeholder: "Full Name" },
            { name: "username", type: "text", placeholder: "Username" },
            { name: "email", type: "email", placeholder: "Email Address" },
            { name: "password", type: "password", placeholder: "Password" },
            { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
            { name: "phone", type: "tel", placeholder: "Phone Number" },
          ].map(({ name, type, placeholder }) => (
            <Input
              key={name}
              type={type}
              name={name}
              value={formData[name]}
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors[name]}
              touched={touched[name]}
            />
          ))}
          <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <button
              className="btn btn-link p-0 align-baseline"
              onClick={() => setPage("login")}
              type="button"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
