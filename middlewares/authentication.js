const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//user must sign in
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied. Not authenticated");
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        console.log(err);
        return res.sendStatus(403); // Forbidden
      } else {
        req.user = decoded; // Attach user information to the request object
        next();
      }
    });
  } catch (ex) {
    res.status(400).send("Access denied. Token not valid");
  }
};
// const authenticate = (req, res, next) => {
//   const token = req.headers["authorization"].split(" ")[1];
//   console.log(token);
//   if (!token) return res.status(401).send("Access denied. not authenticated");

//   try {
//     const secretKey = process.env.JWT_SECRET_KEY;
//     jwt.verify(token, secretKey, function (err, decoded) {
//       if (err) {
//         console.log(err);
//         return res.sendStatus(403);
//       } else {
//         next();
//       }
//     });
//   } catch (ex) {
//     res.status(400).send("Access denied. Token not valid");
//   }
// };
//authorization & Permission "account Officer", "assistant manager", "dpo"
const adminAuthorizer = (req, res, next) => {
  const value = "superAdmin"
  if (req.user.roles == value) next()
  
  else return res.status(401).json({
    message: `Sorry your, Not an ${value}`, 
    success: false
  })
};
//authorization & Permission
const admin_managerAuthorizer = (req, res, next) => {
  
  const value = ["superAdmin", "manager"]
  if (req.user.roles == value[0] || req.user.roles == value[1] ) next()
  
  else return res.status(401).json({
    message: `Sorry your, Not an ${value}`, 
    success: false
  })
};
//authorization & Permission
const accountOfficerAuthorizer = (req, res, next) => {
  const value = "accountOfficer"
  if (req.user.roles == value) next()
  
  else return res.status(401).json({
    message: `Sorry your, Not an ${value}`, 
    success: false
  })
};
//authorization & Permission
const managerAuthorizer = (req, res, next) => {
  const value = "manager"
  if (req.user.roles == value) next()
  
  else return res.status(401).json({
    message: `Sorry your, Not an ${value}`, 
    success: false
  })
};
//authorization & Permission
const accountManagerAuthorizer = (req, res, next) => {
  const value = "accountManager"
  if (req.user.roles == value) next()
  
  else return res.status(401).json({
    message: `Sorry your, Not an ${value}`, 
    success: false
  })
};
//authorization & Permission dpo
const dpoAuthorizer = (req, res, next) => {
  const value = "dpo"
  if (req.user.roles == value) next()
  
  else return res.status(401).json({
    message: `Sorry your, Not an ${value}`, 
    success: false
  })
};

module.exports = {
  authenticate,
  adminAuthorizer,
  accountOfficerAuthorizer,
  admin_managerAuthorizer,
  managerAuthorizer,
  accountManagerAuthorizer,
  dpoAuthorizer,
};
