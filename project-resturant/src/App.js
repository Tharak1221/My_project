import React, { useState } from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="container">
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "login" && <Login setPage={setPage} />}
      {page === "home" && <Home />}
    </div>
  );
}

export default App;
