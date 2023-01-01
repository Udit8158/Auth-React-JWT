import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { verifyToken } from "./middlewares/verifyToken.js";
import cookieParser from "cookie-parser";
import routes from "./routes/authroutes.js";

dotenv.config();
const app = express();

// set up middlewares
app.use(cors({ credentials: true, origin: "http://localhost:5173" })); // very important for security and cookies
app.use(express.json());
app.use(cookieParser()); // easy to deal with cookies

// default users dummy for db
export const users = [
  {
    username: "Admin",
    password: "password",
  },
];

// Routes
app.use("/api/v1/auth", routes);

app.get("/api/v1/users", verifyToken, (req, res) => {
  res.status(200).json(users);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("listening on port " + port));
