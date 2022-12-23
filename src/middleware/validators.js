//------ Name Validator

let isValidName = function (value) {
    let nameRegex = /^[a-zA-Z\s]{5,}$/
    return nameRegex.test(value)
}

//------ Phone Validator

let isValidPhone = function(value) {
    let phoneRegex = /^[6789][0-9]{9}$/
    return phoneRegex.test(value)
}

//------ Password Validator

let isPasswordValid = function(value) {
    let passwordRegex = /^[a-zA-Z0-9*<>@#$%^&]{8,30}$/
    return passwordRegex.test(value)
}

//----- Pincode Validator

let isValidPincode = function(value) {
    let pincodeRegex = /^[0-9]{6}$/
    return pincodeRegex.test(value)
}


module.exports = { isValidName, isValidPhone, isPasswordValid, isValidPincode }