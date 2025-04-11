// // // About.jsx
// // import React from "react";
// // import { Container } from "react-bootstrap";
// // import signupimage from "../images/about-img_files/image.jpg";
// // const About = () => {
// //   const divStyle = {
// //     width: "100vw",
// //     height: "100vh",
// //     backgroundImage: `url(${signupimage})`,
// //     backgroundSize: "cover",
// //     backgroundPosition: "center",
// //     backgroundRepeat: "no-repeat",
// //     backgroundAttachment: "fixed",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   };
// //   return (
// //     <div style={divStyle}>
// //     <Container style={{ marginTop: "80px", padding: "20px" }}>
// //       <h2>About Us</h2>
// //       <p>
// //         Welcome to our restaurant management dashboard. Here you can manage your restaurant's operations, view detailed reports, and manage roles and staff.
// //       </p>
// //       <p>
// //         Our platform is designed to simplify your daily tasks and improve overall efficiency.
// //       </p>
// //     </Container>
// //     </div>
// //   );
// // };

// // export default About;
// import React, { useEffect } from "react";
// import { Container } from "react-bootstrap";
// import signupimage from "../images/about-img_files/image.jpg";

// const About = () => {
//   useEffect(() => {
//     document.body.style.backgroundImage = `url(${signupimage})`;
//     document.body.style.backgroundSize = "cover";
//     document.body.style.backgroundPosition = "center";
//     document.body.style.backgroundRepeat = "no-repeat";
//     document.body.style.backgroundAttachment = "fixed";

//     return () => {
//       document.body.style.backgroundImage = "";
//     };
//   }, []);

//   return (
//     <Container style={{ marginTop: "80px", padding: "20px", color: "#fff" }}>
//       <h2>About Us</h2>
//       <p>
//         Welcome to our restaurant management dashboard. Here you can manage your restaurant's operations, view detailed reports, and manage roles and staff.
//       </p>
//       <p>
//         Our platform is designed to simplify your daily tasks and improve overall efficiency.
//       </p>
//     </Container>
//   );
// };

// export default About;
import React from "react";
import { Container } from "react-bootstrap";
import image1 from "../images/image1.jpg";
import image2 from "../images/2014_05_2823-scaled.jpg";
import image3 from "../images/image2.png";
import image4 from "../images/image-2.jpg";
import image5 from "../images/2014_05_2823-scaled.jpg";

const sections = [
  {
    image: image1,
    title: "Welcome to Our Restaurant",
    text: "Experience world-class dining and seamless management.",
  },
  {
    image: image2,
    title: "Manage Staff",
    text: "Add, edit, and manage staff roles with ease.",
  },
  {
    image: image3,
    title: "Track Performance",
    text: "Access detailed reports and improve operational flow.",
  },
  {
    image: image4,
    title: "Customer Satisfaction",
    text: "Ensure top-notch service to keep customers returning.",
  },
  {
    image: image5,
    title: "Innovative Dashboard",
    text: "Designed to simplify your daily restaurant tasks.",
  },
];

const sectionStyle = (image) => ({
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  height: "100vh",
  width:"100wh",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  // padding: "20px",
 
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  overflow: "hidden",
  flexDirection: 'row',
});

const About = () => {
  return (
    <div>
      {sections.map((section, index) => (
        <div key={index} style={sectionStyle(section.image)}>
          <Container>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{section.title}</h2>
            <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "auto" }}>{section.text}</p>
          </Container>
        </div>
      ))}
    </div>
  );
};

export default About;
