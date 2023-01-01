import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const { logIn, register } = useContext(AuthContext);

  // switch register or login mode
  const switchAuthMode = () => setIsRegistering((curr) => !curr);

  // submit form login or register
  const submitHandler = (e) => {
    e.preventDefault();

    const userInput = {
      username: e.target[0].value,
      password: e.target[1].value,
    };

    isRegistering ? register(userInput) : logIn(userInput);
  };
  return (
    <div>
      <form
        className="flex flex-col gap-3 w-6/12 mx-auto mt-40"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="outline-none p-2 focus:border-2 border-blue-600 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="outline-none p-2 focus:border-2 border-blue-600 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span
            className="text-sm text-center font-light text-gray-500  cursor-pointer"
            onClick={switchAuthMode}
          >
            {isRegistering
              ? "All ready have an account ? Sign In"
              : "Don't have an account ? Create one"}
          </span>
          <button type="submit" className="bg-blue-600 rounded-md p-3 ">
            {isRegistering ? "Create an account" : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
