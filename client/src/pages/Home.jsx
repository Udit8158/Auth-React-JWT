import React, { useContext, useEffect, useState } from "react";
import { axiosAuth } from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";

const Home = () => {
  const [users, setUsers] = useState([]);
  const { user, logOut, refreshToken } = useContext(AuthContext);

  // check the access token expiration automatically
  axiosAuth.interceptors.request.use(
    async (config) => {
      console.log("Run axios interceptor");
      const currentDate = new Date();
      console.log(currentDate.getTime());
      const decodedAccessToken = jwt_decode(user.accessToken);
      console.log("decoded: ", decodedAccessToken);
      if (decodedAccessToken.exp * 1000 < currentDate.getTime()) {
        console.log("Refresh");
        const newAccessToken = await refreshToken(); // for this you must use two different axios instances
        console.log(newAccessToken);
        config.headers["authorization"] = "Bearer " + newAccessToken;
      }
      console.log(config);

      return config;
    },
    (err) => Promise.reject(err)
  );

  // getting users every time page loads
  useEffect(() => {
    const getUsers = async () => {
      try {
        console.log(user.accessToken);
        const res = await axiosAuth.get("/api/v1/users", {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        });

        const data = res.data;
        console.log(data);

        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <div className="flex gap-10 justify-center mt-10">
        <h1 className="text-3xl text-center">Welcome {user.username}</h1>
        <button className="p-2 bg-red-600 rounded-md" onClick={logOut}>
          Log Out
        </button>
        {/* <button className="p-2 bg-blue-600 rounded-md" onClick={refreshToken}>
          Refresh Toke
        </button> */}
      </div>
      <div className="mt-10 w-4/12 mx-auto">
        <h2 className="text-lg text-center mb-10">Our Users</h2>
        {users.map((user) => {
          return <h1 key={Math.random()}>{user.username}</h1>;
        })}
      </div>
    </div>
  );
};

export default Home;
