const userModel = require('../model/userModel')
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { isValidName, isValidPhone, isPasswordValid, isValidPincode } = require('../middleware/validators')

//-----------------------------------[1]-user Register---------------------------------//

const userRegister = async function (req, res) {
    try {
        let data = req.body
        let { fname, lname, email, profileImage, phone, password } = data
        let address = data.address
        let shipping = address.shipping
        let billing = address.billing

        if (Object.keys(data).length === 0) { return res.status(400).send({ status: false, msg: 'Please Provide data!' }) }

        if (!fname || typeof fname != 'string') { return res.status(400).send({ status: false, msg: 'Please Enter First Name!' }) }
        fname = fname.trim()
        if (!isValidName(fname)) { return res.status(400).send({ status: false, msg: 'Please Enter valid Name!' }) }

        if (!lname || typeof fname != 'string') { return res.status(400).send({ status: false, msg: 'Please Enter Last Name!' }) }
        lname = lname.trim()
        if (!isValidName(lname)) { return res.status(400).send({ status: false, msg: 'Please Enter valid Name!' }) }

        if (!email || typeof fname != 'string') { return res.status(400).send({ status: false, msg: 'Please Enter email Id!' }) }
        email = email.trim()
        if (!emailValidator.validate(email)) { return res.status(400).send({ status: false, msg: 'Please Enter Valid E-mail!' }) }

        if (!phone || typeof fname != 'number') { return res.status(400).send({ status: false, msg: 'Please Enter Phone Number!' }) }
        phone = phone.trim()
        if (!isValidPhone(phone)) { return res.status(400).send({ status: false, msg: 'Please Enter Valid Number!' }) }

        if (!password || typeof fname != 'string') { return res.status(400).send({ status: false, msg: 'Please Enter Password!' }) }
        password = password.trim()
        if (!isPasswordValid(password)) { return res.status(400).send({ status: false, msg: 'Please Enter Valid Password!' }) }

        let hash = await bcrypt.hash(password, 10)
        data.password = hash

        if (!shipping.street || !isValidName(shipping.street)) { return res.status(400).send({ status: false, msg: 'Please Enter  Valid Street!' }) }
        if (!billing.street || !isValidName(billing.street)) { return res.status(400).send({ status: false, msg: 'Please Enter  Valid Street!' }) }

        if (!shipping.city || !isValidName(shipping.city)) { return res.status(400).send({ status: false, msg: 'Please Enter  Valid City!' }) }
        if (!billing.city || !isValidName(billing.city)) { return res.status(400).send({ status: false, msg: 'Please Enter  Valid City!' }) }

        if (!shipping.pincode || !isValidPincode(shipping.pincode)) { return res.status(400).send({ status: false, msg: 'Please Enter Valid Pincode' }) }
        if (!billing.pincode || !isValidPincode(billing.pincode)) { return res.status(400).send({ status: false, msg: 'Please Enter Valid Pincode' }) }

        let savedData = await userModel.create(data)

        res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

//----------------------------------[2]-userLogin----------------------------------------//

const loginUser = async function (req, res) {
    try {
        let data = req.body
        let { email, password } = data

        if (!email || typeof email != 'string') { return res.status(400).send({ status: false, msg: 'Please Enter email Id!' }) }
        if (!emailValidator.validate(email)) { return res.status(400).send({ status: false, msg: 'Please Enter Valid E-mail!' }) }

        if (!password || typeof password != 'string') { return res.status(400).send({ status: false, msg: 'Please Enter Password!' }) }
        if (!isPasswordValid(password)) { return res.status(400).send({ status: false, msg: 'Please Enter Valid Password!' }) }

        //--------------- bcrypt compare password ---------------//

        let user = await userModel.findOne({ email: email })
        let match = await bcrypt.compare(password, user.password)

        if (!match) { return res.status(400).send({ status: false, msg: "Passwords do NOT match" }) }

        //--------------------json web token---------------------//

        let payload = { userId: user._id.toString() }
        let token = await jwt.sign(payload, 'secret-key-cgcy?>&*%#@^#')

        res.setHeader('x-api-key', token)

        res.status(201).send({ status: true, token: token })

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }

}

//----------------------------------[3]-user Data----------------------------------------//

const userData = async function (req, res) {
    let userId = req.params.userId

    if (!userId) { return res.status(400).send({ status: false, msg: 'UserId must be Present!' }) }
    if (!mongoose.isValidObjectId(userId)) { return res.status(400).send({ status: false, msg: 'userId is invalid!' }) }

    let user = await userModel.findById(userId)

    res.status(200).send({ status: true, data: user })

}

module.exports = { userRegister, loginUser, userData }