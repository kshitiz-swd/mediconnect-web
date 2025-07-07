const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  const token = req.cookies?.['access-token'];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided in cookies" });
  }

  try {
    const decoded = jwt.verify(token, secret_key);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: "Access denied: Admins only" });
};

module.exports = { authenticate, isAdmin };
