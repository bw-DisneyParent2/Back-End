// module.exports = (req, res, next) => {
//       if (req.session.loggedin && (req.session.loggedin === true)) {
//         next();
//       } else {
//         res.status(400).json({ message: "Cannot Login" });
//       }
//     };

const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = ( req,res,next ) => {
  if(!req.headers.authorization) res.status(401).json({ code: 401, message: "Missing log in token, Please Log in and try again."})

  const token = req.headers.authorization.split(" ")[1];

  if (req.decodedJwt) {
    next();
  } else if (token) {
    jwt.verify(token, secrets.jwtSecret, ( err, decodedJwt ) => {
      // if the token doesn't verify
      if (err) {
        res.status(401).json({ you: "shall not pass!" });
        // if it DOES...
      } else {
        req.decodedJwt = decodedJwt;
        next();
      }
    })
  } else {
    res.status(401).json({ you: "can't touch that." });
  }
}