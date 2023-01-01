import jwt from "jsonwebtoken";
import { users } from "../index.js";

const loginUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json("Need both username and password");

  const user = users.find((user) => user.username === username);
  if (!user) return res.status(400).json("User not exists");
  if (user.password !== password)
    return res.status(400).json("Password is incorrect");

  // Generate tokens
  const accessToken = jwt.sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "40s",
    }
  );
  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res
    .status(202)
    .cookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(new Date().getTime() + 24 * 7 * 60 * 60 * 1000), // 7days
    })
    .json({ username: user.username, accessToken });
};

export default loginUser;
