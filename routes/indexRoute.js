const express = require('express')
const router = express.Router()
const userRoute = require('./userRoute')
const testmiddleware = require('../middlewares/test.middleware')
const loginRoute = require('./loginRoute')
const customerRoutes = require("./customerRoutes");
const transactionRoutes = require("./transactionRoutes");
const loanRoutes = require("./loanRoute");
//const searchRoute = require('./searchRoute')



router.use('/register', userRoute)
router.use('/login', loginRoute)
router.use("/customers", customerRoutes);
router.use("/transactions", transactionRoutes);
router.use("/loans", loanRoutes);
//router.use('/search', testmiddleware, searchRoute)



module.exports = router;
