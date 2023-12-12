const express = require('express')
const router = express.Router()
const userRoute = require('./userRoute')
const testmiddleware = require('../middlewares/test.middleware')
const customerRoutes = require("./customerRoutes");
const transactionRoutes = require("./transactionRoutes");
const loanRoutes = require("./loanRoute");
//const searchRoute = require('./searchRoute')



router.use('/users', userRoute)
router.use("/customers", customerRoutes);
router.use("/transactions", transactionRoutes);
router.use("/loans", loanRoutes);
//router.use('/search', testmiddleware, searchRoute)



module.exports = router;
