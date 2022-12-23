const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    fname: { type: String, require: true },
    lname: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    profileImage: { type: String, require: true },
    phone: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    address: {
        shipping: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            pincode: { type: Number, required: true }
        },
        billing: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            pincode: { type: Number, required: true }
        }
    },

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)