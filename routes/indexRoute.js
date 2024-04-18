const express = require('express')
const router = express.Router()
const userRoute = require('./userRoute')
const testmiddleware = require('../middlewares/test.middleware')
const customerRoutes = require("./customerRoutes");
const transactionRoutes = require("./transactionRoutes");
const loanRoutes = require("./loanRoute");
const { authenticate } = require('../middlewares/authentication');
//const searchRoute = require('./searchRoute')


router.get("/healthcheck", (req, res) => {
    res.status(200).json({ message: "Server ok" });
});

router.use('/users', userRoute)
router.use("/customers",customerRoutes);
router.use("/transactions",transactionRoutes);
router.use("/loans",loanRoutes);
//router.use('/search', testmiddleware, searchRoute)

module.exports = router;
