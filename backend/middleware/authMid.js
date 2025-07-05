const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); // Ensure you have this package installed if not already


const secretKey = process.env.DB_SECRET_KEY;

const authenticateToken = asyncHandler((req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded;
    console.log("This is called",req.user);
    if(req.user.user_type != 1){
        console.log("This is users data",req.user.user_type)
        return res.status(403).json({ message: 'Unautharized' });
      }
    next();
  });
});

const authenticateTokenStudents = asyncHandler((req, res, next) => {
    // Retrieve the token from the headers (commonly sent as 'Authorization: Bearer <token>')
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // console.log("dashdd",token)
    // If there's no token, deny access
    if (!token) {
      return res.status(401).json({ message: 'Access Denied: No token provided' });
    }
  
    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      
    req.user = decoded;

      next();
    });
  });

module.exports = { authenticateToken, authenticateTokenStudents };
