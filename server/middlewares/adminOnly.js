import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();
export const adminOnly = async (req, res, next) => {
  const  token  = req.cookies.access_token;
  try {
    if (!token) {
      return next(403, "Unauthorized");
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodeToken.role === "admin") {
      req.user = decodeToken;
      next();
    } else {
      return next(403, "Unauthorized");
    }
  } catch (error) {
    next(500, error.message);
  }
};
