import jwt from "jsonwebtoken";

// Auth middleware to verify JWT token
const auth = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again" });
  }

  try {
    // Decode the token and attach user ID to the request body
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.body.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default auth;
