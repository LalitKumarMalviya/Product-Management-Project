const userModel = require('../model/userModel')
const emailValidator = require('email-validator')
const { isValidName, isValidPhone, isPasswordValid, isValidPincode } = require('../middleware/validators')

const userRegister = async function (req, res) {
    try {
        let data = req.body
        let { fname, lname, email, profileImage, phone, password } = data
        let address = data.address
        let shipping = address.shipping
        let billing = address.billing

        if (Object.keys(data).length === 0) { return res.status(400).send({ status: false, msg: 'Please Provide data!' }) }

        if (!fname) { return res.status(400).send({ status: false, msg: 'Please Enter First Name!' }) }
        fname = fname.trim()
        if (!isValidName(fname)) { return res.status(400).send({ status: false, msg: 'Please Enter valid Name!' }) }

        if (!lname) { return res.status(400).send({ status: false, msg: 'Please Enter Last Name!' }) }
        lname = lname.trim()
        if (!isValidName(lname)) { return res.status(400).send({ status: false, msg: 'Please Enter valid Name!' }) }

        if (!email) { return res.status(400).send({ status: false, msg: 'Please Enter email Id!' }) }
        email = email.trim()
        if (!emailValidator.validate(email)) { return res.status(400).send({ status: false, msg: 'Please Enter Valid E-mail!' }) }

        if (!phone) { return res.status(400).send({ status: false, msg: 'Please Enter Phone Number!' }) }
        phone = phone.trim()
        if (!isValidPhone(phone)) { return res.status(400).send({ status: false, msg: 'Please Enter Valid Number!' }) }

        if (!password) { return res.status(400).send({ status: false, msg: 'Please Enter Password!' }) }
        password = password.trim()
        if (!isPasswordValid(password)) { return res.status(400).send({ status: false, msg: 'Please Enter Valid Password!' }) }

        if (!shipping.street || !isValidName(shipping.street)) { return res.status(400).send({ status: false, msg: 'Please Enter  Valid Street!' }) }
        if (!billing.street || !isValidName(billing.street)) { return res.status(400).send({ status: false, msg: 'Please Enter  Valid Street!' }) }

        if (!shipping.city || !isValidName(shipping.city)) { return res.status(400).send({ status: false, msg: 'Please Enter  Valid City!' }) }
        if (!billing.city || !isValidName(billing.city)) { return res.status(400).send({ status: false, msg: 'Please Enter  Valid City!' }) }

        if(!shipping.pincode || !isValidPincode(shipping.pincode)) { return res.status(400).send({status: false, msg: 'Please Enter Valid Pincode'}) }
        if(!billing.pincode || !isValidPincode(billing.pincode)) { return res.status(400).send({status: false, msg: 'Please Enter Valid Pincode'}) }

        let savedData = await userModel.create(data)

        res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}



module.exports = { userRegister }