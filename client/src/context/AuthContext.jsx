import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export const AuthContext = createContext({
  user: {},
  register: () => {},
  logIn: () => {},
  logOut: () => {},
  refreshToken: () => {},
});

const AuthContextProvider = ({ children }) => {
  const localStorageUser = localStorage.getItem("user");
  const [user, setUser] = useState(
    localStorageUser && JSON.parse(localStorage.getItem("user"))
  );
  const navigate = useNavigate();

  // refresh token
  const refreshTokenHandler = async () => {
    // console.log(user);
    try {
      const res = await axios.get("/api/v1/auth/refresh", {
        withCredentials: true,
      });
      const data = res.data;
      // console.log(data);

      const updatedUser = { ...user, accessToken: data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser((prev) => {
        return {
          ...prev,
          accessToken: data,
        };
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // register new user
  const registerHandler = async (user) => {
    // register new user
    const res = await fetch("http://localhost:3000/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!res.ok) throw Error("Unable to register");

    const data = await res.json();
    console.log(data);
  };

  // login the user
  const logInHandler = async (user) => {
    // login -> and save refresh token to the cookies

    const res = await axios.post("/api/v1/auth/login", user, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.data;
    console.log(data);

    // navigate to '/' page
    navigate("/");

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  // logout
  const logOutHandler = async () => {
    // logout route call
    const res = await axios.get("/api/v1/auth/logout", {
      withCredentials: true,
      headers: {
        authorization: "Bearer " + user.accessToken,
      },
    });
    // remove user
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth");
  };

  const initialCtx = {
    user,
    register: registerHandler,
    logIn: logInHandler,
    logOut: logOutHandler,
    refreshToken: refreshTokenHandler,
  };

  return (
    <AuthContext.Provider value={initialCtx}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
