const express = require('express')
const router = express.Router()
const userRoute = require('./userRoute')
const testmiddleware = require('../middlewares/test.middleware')
const loginRoute = require('./loginRoute')
const customerRoute = require('./customerRoute')
//const searchRoute = require('./searchRoute')



router.use('/register',testmiddleware, userRoute)
router.use('/login', testmiddleware, loginRoute)
router.use('/customer', testmiddleware, customerRoute)
//router.use('/search', testmiddleware, searchRoute)



module.exports = router;
