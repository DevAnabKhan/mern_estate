import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   console.log(token);
//   if (!token) return next(errorHandler(401, "Unauthorized"));

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(errorHandler(403, "forbidden"));
//     req.user = user;
//     next();
//   });
// };

export const verifyToken = (req, res, next) => {
  console.log("---- VERIFY TOKEN MIDDLEWARE ----");

  // 1️⃣ Check cookies object
  console.log("Cookies:", req.cookies);

  // 2️⃣ Extract token
  const token = req.cookies.access_token;
  console.log("Access Token:", token);

  // 3️⃣ If token missing
  if (!token) {
    console.log("❌ No token found");
    return next(errorHandler(401, "Unauthorized"));
  }

  // 4️⃣ Verify JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("❌ JWT verification failed");
      console.log("JWT Error:", err.message);
      return next(errorHandler(403, "Forbidden"));
    }

    // 5️⃣ Success
    console.log("✅ JWT verified successfully");
    console.log("Decoded user:", user);

    req.user = user;
    next();
  });
};
