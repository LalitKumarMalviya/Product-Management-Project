const express = require('express')
const router = express.Router()
const usercontroller = require('../controller/userController')
const MW = require('../middleware/middleware')


//------------------------user APIs ------------------------//

router.post('/register', usercontroller.userRegister)
router.post('/login', usercontroller.loginUser)
router.get('/user/:userId/profile', MW.authantication,usercontroller.userData)














module.exports = router