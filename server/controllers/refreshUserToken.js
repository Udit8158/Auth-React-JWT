import jwt from "jsonwebtoken";

const refreshUserToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(400).json("Invalid refresh token");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(400).json("Invalid refresh token");
    // // check the refresh token belongs to the authenticated user
    // if (req.user.username !== decoded.username)
    // return res.status(403).json("Forbidden");

    const newAccessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "40s" }
    );
    const newRefreshToken = jwt.sign(
      { username: decoded.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res
      .cookie("refreshToken", newRefreshToken, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(new Date().getTime() + 24 * 7 * 60 * 60 * 1000), // 7days
      })
      .json(newAccessToken);
  });
};
export default refreshUserToken;
