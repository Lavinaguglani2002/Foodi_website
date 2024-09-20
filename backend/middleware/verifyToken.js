const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Check if the authorization header exists
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  // Extract token from the authorization header
  const token = req.headers.authorization.split(' ')[1];

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // Attach decoded data to the request object
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken;
