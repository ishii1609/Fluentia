const jwt = require('jsonwebtoken');
const User = require('../models/usermodel'); 

async function authCheck(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
// agr user dlt hogya and token still valid rh gya uske lie ha ye vse cascade dlt better option haii
    const user = await User.findById(decoded.id); 
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

     
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { authCheck };