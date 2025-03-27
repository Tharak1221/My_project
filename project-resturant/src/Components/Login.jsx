// // // import React, { useState } from "react";
// // // import { Button } from "react-bootstrap";
// // // import "./Main.css";

// // // const Login = ({ setPage }) => {
// // //   const [formData, setFormData] = useState({ identifier: "", password: "" });
// // //   const [errors, setErrors] = useState({});
// // //   const [touched, setTouched] = useState({});

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData({ ...formData, [name]: value });

// // //     setErrors((prevErrors) => ({
// // //       ...prevErrors,
// // //       [name]: validateField(name, value),
// // //     }));
// // //   };

// // //   const validateField = (name, value) => {
// // //     if (name === "identifier" && !value) {
// // //       return "Invalid username or email";
// // //     }

// // //     if (name === "password" && !value) {
// // //       return "Invalid password";
// // //     }

// // //     return "";
// // //   };

// // //   const validate = () => {
// // //     const newErrors = {};

// // //     Object.keys(formData).forEach((field) => {
// // //       const error = validateField(field, formData[field]);
// // //       if (error) {
// // //         newErrors[field] = error;
// // //       }
// // //     });

// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleLogin = (e) => {
// // //     e.preventDefault();
// // //     if (!validate()) return;

// // //     const storedData = localStorage.getItem("userDetails");
// // //     if (!storedData) {
// // //       setErrors({ form: "Invalid details. Please try again." });
// // //       return;
// // //     }

// // //     const { username, email, password: storedPassword } = JSON.parse(storedData);

// // //     if (
// // //       (formData.identifier.trim().toLowerCase() === username.toLowerCase() ||
// // //         formData.identifier.trim().toLowerCase() === email.toLowerCase()) &&
// // //       formData.password === storedPassword
// // //     ) {
// // //       setErrors({});
// // //       setTimeout(() => {
// // //         setPage("home");
// // //       }, 1500);
// // //     } else {
// // //       setErrors({ form: "Invalid details. Please try again." });
// // //     }
// // //   };

// // //   return (
// // //     <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
// // //       <h2 className="mb-4">Login</h2>
// // //       <form onSubmit={handleLogin} className="p-3 border rounded shadow bg-white">
// // //         {["username or email", "password"].map((field) => (
// // //           <div className="mb-3 position-relative" key={field}>
// // //             <input
// // //               type={field === "password" ? "password" : "text"}
// // //               name={field}
// // //               className={`form-control ${errors[field] && touched[field] ? "input-error" : ""}`}
// // //               placeholder={touched[field] && errors[field] ? errors[field] : `Enter ${field}`}
// // //               value={formData[field]}
// // //               onChange={handleChange}
// // //               onBlur={() => setTouched({ ...touched, [field]: true })}
// // //             />
// // //             {errors[field] && touched[field] && <div className="tooltip-error">{errors[field]}</div>}
// // //           </div>
// // //         ))}

// // //         <Button type="submit" variant="primary">Login</Button>
// // //       </form>

// // //       {errors.form && <div className="alert alert-danger mt-3">{errors.form}</div>}

// // //       <p className="mt-3 text-center">
// // //         Don't have an account?{" "}
// // //         <button className="btn btn-link  p-0 align-baseline" onClick={() => setPage("signup")}>
// // //           Signup
// // //         </button>
// // //       </p>
// // //     </div>
// // //   );
// // // };

// // // export default Login;
// // import React, { useState } from "react";
// // import axios from "axios";
// // import { Button } from "react-bootstrap";
// // import "./Main.css";

// // const Login = ({ setPage }) => {
// //   const [formData, setFormData] = useState({ identifier: "", password: "" });
// //   const [errors, setErrors] = useState({});
// //   const [touched, setTouched] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });

// //     if (touched[name]) {
// //       setErrors({ ...errors, [name]: validateField(name, value) });
// //     }
// //   };

// //   const validateField = (name, value) => {
// //     if (!value) {
// //       return name === "identifier" ? "Enter username or email" : "Enter password";
// //     }
// //     return "";
// //   };

// //   const validate = () => {
// //     const newErrors = {};
// //     Object.keys(formData).forEach((field) => {
// //       const error = validateField(field, formData[field]);
// //       if (error) {
// //         newErrors[field] = error;
// //       }
// //     });

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     if (!validate()) return;

// //     setIsSubmitting(true);
// //     try {
// //       const response = await axios.post("http://localhost:5000/api/login", formData);
      
// //       if (response.data.success) {
// //         setErrors({});
// //         setTimeout(() => {
// //           setPage("home"); 
// //         }, 1000);
// //       } else {
// //         setErrors({ form: response.data.message || "Invalid details. Please try again." });
// //       }
// //     } catch (error) {
// //       setErrors({ form: error.response?.data?.message || "Login failed. Please try again." });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
// //       <h2 className="mb-4">Login</h2>
// //       <form onSubmit={handleLogin} className="p-3 border rounded shadow bg-white">
// //         {[
// //           { name: "identifier", type: "text", placeholder: "Username or Email" },
// //           { name: "password", type: "password", placeholder: "Password" }
// //         ].map(({ name, type, placeholder }) => (
// //           <div className="mb-3 position-relative" key={name}>
// //             <input
// //               type={type}
// //               name={name}
// //               className={`form-control ${errors[name] && touched[name] ? "input-error" : ""}`}
// //               placeholder={touched[name] && errors[name] ? errors[name] : placeholder}
// //               value={formData[name]}
// //               onChange={handleChange}
// //               onBlur={() => setTouched({ ...touched, [name]: true })}
// //             />
// //             {errors[name] && touched[name] && <div className="tooltip-error">{errors[name]}</div>}
// //           </div>
// //         ))}

// //         <Button type="submit" variant="primary" disabled={isSubmitting}>
// //           {isSubmitting ? "Logging in..." : "Login"}
// //         </Button>
// //       </form>

// //       {errors.form && <div className="alert alert-danger mt-3">{errors.form}</div>}

// //       <p className="mt-3 text-center">
// //         Don't have an account?{" "}
// //         <button className="btn btn-link p-0 align-baseline" onClick={() => setPage("signup")}>
// //           Signup
// //         </button>
// //       </p>
// //     </div>
// //   );
// // };

// // export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { Button } from "react-bootstrap";
// import "./Main.css";

// const Login = ({ setPage }) => {
//   const [formData, setFormData] = useState({ identifier: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (touched[name]) {
//       setErrors({ ...errors, [name]: validateField(name, value) });
//     }
//   };

//   const validateField = (name, value) => {
//     if (!value) {
//       return name === "identifier" ? "Enter username or email" : "Enter password";
//     }
//     return "";
//   };

//   const validate = () => {
//     const newErrors = {};
//     Object.keys(formData).forEach((field) => {
//       const error = validateField(field, formData[field]);
//       if (error) {
//         newErrors[field] = error;
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setIsSubmitting(true);
//     try {
//       const response = await axios.post("http://localhost:5000/api/login", formData);
//       console.log(response); // Check the response in the console

//       if (response.data.success) {
//         setErrors({});
//         console.log("Login successful, navigating to home");
//         setPage("home");  // Set the page to "home" after successful login
//       } else {
//         setErrors({ form: response.data.message || "Invalid details. Please try again." });
//       }
//     } catch (error) {
//       setErrors({ form: error.response?.data?.message || "Login failed. Please try again." });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
//       <h2 className="mb-4">Login</h2>
//       <form onSubmit={handleLogin} className="p-3 border rounded shadow bg-white">
//         {[{ name: "identifier", type: "text", placeholder: "Username or Email" },
//           { name: "password", type: "password", placeholder: "Password" }
//         ].map(({ name, type, placeholder }) => (
//           <div className="mb-3 position-relative" key={name}>
//             <input
//               type={type}
//               name={name}
//               className={`form-control ${errors[name] && touched[name] ? "input-error" : ""}`}
//               placeholder={touched[name] && errors[name] ? errors[name] : placeholder}
//               value={formData[name]}
//               onChange={handleChange}
//               onBlur={() => setTouched({ ...touched, [name]: true })}
//             />
//             {errors[name] && touched[name] && <div className="tooltip-error">{errors[name]}</div>}
//           </div>
//         ))}

//         <Button type="submit" variant="primary" disabled={isSubmitting}>
//           {isSubmitting ? "Logging in..." : "Login"}
//         </Button>
//       </form>

//       {errors.form && <div className="alert alert-danger mt-3">{errors.form}</div>}

//       <p className="mt-3 text-center">
//         Don't have an account?{" "}
//         <button className="btn btn-link p-0 align-baseline" onClick={() => setPage("signup")}>
//           Signup
//         </button>
//       </p>
//     </div>
//   );
// };

// export default Login;
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
              localStorage.setItem("token", response.data.token); // ✅ Store token
              setPage(response.data.user);
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
      <h2 className="mb-4">Login</h2>
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

