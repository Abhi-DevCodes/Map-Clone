import mongoose from "mongoose";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const middleware = async (req, res, next) => {
  //   const unSecList = ;
  const reqPath = req.path;
  if (
    ["/api/user/signin", "/api/user/register", "/api/user/verifyotp"].includes(
      reqPath
    )
  )
    return next();

  //resolve cookies
  const cookies = req.headers["cookie"];
  if (!cookies) return res.status(401).json({ message: "C-Unauthorised" });

  const [token, email] = cookies.split(";");
  if (!token || !email)
    return res.status(401).json({ message: "C-Unauthorised" });
  const utoken = token.trim().replace("Authorization=", "");
  const uemail = decodeURIComponent(email.trim().replace("user=", ""));

  console.log(uemail);

  const userObject = await User.findOne({ email: uemail });
  if (!userObject) return res.status(401).json({ message: "U-Unauthorised" });

  const jwt_secret = process.env.JWT_SECRET;

  console.log(utoken);
  console.log(email);

  jwt.verify(utoken, jwt_secret, (err, user) => {
    if (err) return res.status(401).json({ message: "J-Unauthorised" });
    next();
  });
};
