
// import React from "react";

// import homePlaceholder from "../images/image2.png";

// const HomePlaceholder = () => {
//   const divStyle = {
//     width: "100vw",
//     height: "calc(100vh - 112px)", // Adjusted height
//     backgroundImage: `url(${homePlaceholder})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     backgroundAttachment: "fixed",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "20px",
//     textAlign: "center",
//     position: "fixed",
    
//     top: 0,
//     left: 0,
//     margin: 0,
//     padding: 0,
//     zIndex: +10,
//     overflow: "hidden",
//   };

//   return (
//     <div style={divStyle}>
//       <h1
//         style={{
//           fontSize: "3.2rem",
//           fontWeight: "bold",
//           marginBottom: "25px",
//           color: "#2c3e50",
//         }}
//       >
//         Welcome to My Restaurant Portal
//       </h1>
//       <p
//         style={{
//           fontSize: "1.25rem",
//           maxWidth: "800px",
//           color: "#6c757d",
//           lineHeight: "1.6",
//         }}
//       >
//         Manage roles, departments, and employees effortlessly through our modern
//         and intuitive admin panel. Optimize your workflow, assign roles, and stay
//         in control — all in one place.
//       </p>
//       {/* <div className="d-flex gap-3 mt-3 justify-content-center">
//         <Button variant="primary" size="lg" onClick={() => window.scrollTo(0, 0)}>
//           Get Started
//         </Button>
//         <Button size="lg" variant="light" onClick={() => alert("Learn more clicked")}>
//           Learn More
//         </Button> */}
//       {/* </div> */}
//     </div>
//   );
// };

// export default HomePlaceholder;
import React from "react";
import homePlaceholder from "../images/image2.png";

const HomePlaceholder = () => {
  const containerStyle = {
    width: "100vw",
    height: "calc(100vh - 112px)",
    position: "relative",
    overflow: "hidden",
  };

  const backgroundStyle = {
    backgroundImage: `url(${homePlaceholder})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 0,
  };

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.6)", // darker overlay
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 1,
    position: "fixed",
  };

  const contentStyle = {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    textAlign: "center",
    color: "white",
    position: "fixed",
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <h1 style={{ fontSize: "3.2rem", fontWeight: "bold", marginBottom: "25px" }}>
          Welcome to My Restaurant Portal
        </h1>
        <p style={{ fontSize: "1.25rem", maxWidth: "800px", lineHeight: "1.6" }}>
          Manage roles, departments, and employees effortlessly through our modern
          and intuitive admin panel. Optimize your workflow, assign roles, and stay
          in control — all in one place.
        </p>
      </div>
    </div>
  );
};

export default HomePlaceholder;
