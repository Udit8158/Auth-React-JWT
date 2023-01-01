import express from "express";
import loginUser from "../controllers/loginUser.js";
import logoutUser from "../controllers/logoutUser.js";
import refreshUserToken from "../controllers/refreshUserToken.js";
import registerUser from "../controllers/registerUser.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const routes = express();

// Auth Routes
routes.route("/register").post(registerUser);
routes.route("/login").post(loginUser);
routes.route("/refresh").get(refreshUserToken);
routes.route("/logout").get(verifyToken, logoutUser);

export default routes;
