// import React, { useState } from "react";
// import Signup from "./Components/Signup";
// import Login from "./Components/Login";
// import Home from "./Components/Home";

// function App() {
//   const [page, setPage] = useState("login");
//   const [user, setUser] = useState(null);

//   console.log("Current Page:", page);

//   return (
//     <div className="container">
//       {page === "signup" && <Signup setPage={setPage} />}
//       {page === "login" && <Login setPage={setPage} setUser={setUser} />}
//       {page === "home" && <Home user={user}  setPage={setPage} />}
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import "antd/dist/reset.css";


function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  console.log("Current Page:", page);
  console.log("User:", user); // Debugging

  return (
    <div className="container">
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "login" && <Login setPage={setPage} setUser={setUser} />}
      {page === "home" && <Home user={user} setUser={setUser} setPage={setPage} />}
    </div>
  );
}

export default App;
