const jwt = require("jsonwebtoken"); 

const genAuthToken = (user) => {
    const secretKey = process.env.JWT_SECRET_KEY

    const token = jwt.sign(
        {
           
        _id: user._id, 
        name: user.name,
        email: user.email,
        roles: user.roles,
        userId: user.userId
    },
     secretKey
    );
    return token;
};

module.exports = genAuthToken