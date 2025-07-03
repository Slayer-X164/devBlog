import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();
export const authenticate = async (req, res, next) => {
  const  token  = req.cookies.access_token;
  try {
    if (!token) {
      return next(403, "Unauthorized");
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    next();
  } catch (error) {
    next(500, error.message);
  }
};
