const express = require('express')
const router = express.Router()
const userRoute = require('./userRoute')
const testmiddleware = require('../middlewares/test.middleware')
const loginRoute = require('./loginRoute')
const customerRoute = require('./customerRoute')



router.use('/user',testmiddleware, userRoute)
router.use('/login', testmiddleware, loginRoute)
router.use('/customer', testmiddleware, customerRoute)



module.exports = router
