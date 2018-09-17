const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')
const Joi = require('joi')


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true,
        minlength:6
    },
    dataCadastro: {
        type: Date,
        required: true,
        default: new Date()
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
      },
      isAdmin: {
          type: Boolean,
          default:false
      },
      active: {
          type: Boolean,
          required: true,
          default: false
      },
      activeHash: {
          type: String,
          required: true
      }
    })

userSchema.methods.generateJwt = function (){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwToken'))
    return token

}

function validateUser(user){
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(50).required().email(),
        password: Joi.string().min(3).max(255).required(),
        isAdmin: Joi.boolean()

    }

    return Joi.validate(user,schema)
}

module.exports = {
    User: mongoose.model('User' , userSchema),
    validate: validateUser
}

