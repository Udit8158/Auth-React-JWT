const logoutUser = (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Successfully logged out" });
};

export default logoutUser;
