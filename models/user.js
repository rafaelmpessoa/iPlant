const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    login: {
        type: String,
        required:true,
        minlength:6
    },
    password: {
        type: String,
        required:true,
        minlength:6
    }
    })

userSchema.methods.generateJwt = function (){
    const token = jwt.sign({_id: this._id}, config.get('jwToken'))
    return token

}

module.exports = mongoose.model('User' , userSchema)

