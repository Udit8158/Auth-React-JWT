import jwt from "jsonwebtoken";

// verify user has access to the site or not by using access token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json("Unauthenticated");

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).json("Forbidden");

    req.user = decoded;
    next();
  });
};
