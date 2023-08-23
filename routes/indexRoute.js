const express = require('express')
const router = express.Router()
const userRoute = require('./userRoute')
const testmiddleware = require('../middlewares/test.middleware')
const loginRoute = require('./loginRoute')
const customerRoutes = require("./customerRoutes");
const transactionRoutes = require("./transactionRoutes");
//const searchRoute = require('./searchRoute')



router.use('/register',testmiddleware, userRoute)
router.use('/login', testmiddleware, loginRoute)
router.use("/customers", testmiddleware, customerRoutes);
router.use("/transactions", testmiddleware, transactionRoutes);

//router.use('/search', testmiddleware, searchRoute)



module.exports = router;
