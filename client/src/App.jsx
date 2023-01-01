import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Routes>
        {user && <Route path="/" element={<Home />} />}
        {!user && <Route path="/auth" element={<Auth />} />}
        <Route
          path="*"
          element={user ? <Navigate to={"/"} /> : <Navigate to={"/auth"} />}
        />
      </Routes>
    </>
  );
}

export default App;
