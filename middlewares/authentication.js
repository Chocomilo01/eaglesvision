const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticate = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token)
    if(!token) return res.status(401).send("Access denied. not authenticated");

    try{
        const secretKey = process.env.JWT_SECRET_KEY;
        jwt.verify(token, secretKey, function(err,decoded){
            if(err){
                console.log(err)
                return res.sendStatus(403)
            }else{
                
                next();
            }
            
        });

    } catch (ex) {
        res.status(400).send("Access denied. Token not valid")
    }
};

const adminAuthorizer = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    const jwtUser = jwt.decode(token)
    console.log(jwtUser)
    if (jwtUser.roles !== "admin") {
        return res
            .status(401)
            .json({ message: "Not authorized to access resource", success: false });
    }
    next();
};


module.exports = { authenticate, adminAuthorizer }