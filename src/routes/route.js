const express = require('express')
const router = express.Router()
const usercontroller = require('../controller/userController')


//------------------------user APIs ------------------------//

router.post('/register', usercontroller.userRegister)















module.exports = router