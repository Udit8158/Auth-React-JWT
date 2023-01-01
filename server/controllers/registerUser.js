import { users } from "../index.js";

const registerUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json("Need both username and password");

  const duplicate = users.find((user) => user.username === username);
  if (duplicate) return res.status(400).json("Username already exists");

  users.push({ username, password });
  res.status(200).json({ message: "User registered successfully" });
};

export default registerUser;
