const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
require('dotenv').config()

const genAuthToken = function (obj) {
	// 1 hour
	const jwtToken = jwt.sign(obj,
					process.env.JWT_SECRET_KEY,
					{ expiresIn: '30m' }
				);
	return jwtToken;
}

const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		return {
		  expired: false,
		  decoded,
	};
	} catch (e) { 
			return {
				expired: e.message === 'jwt expired',
				decoded: null,
	  	};
	}
}
  
const decodeToken = (token) => {
	const id = jwt_decode(token)._id
	return id
}

module.exports = { genAuthToken, verifyToken, decodeToken } 