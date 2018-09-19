const mongoose = require('mongoose')
const Joi = require('joi')


const plantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    descricao: {
        type: String,
        required: true
    },
    imagePathSmall: {
        type: String,
        required: false
    },
    imagePathBig: {
        type: String,
        required: false
    },
    dataCadastro:{
        type: Date,
        required:true,
        default:new Date()
    },
    active: {
        type: Boolean,
        required:true,
        default: true
    }
    })


    function validatePlant(plant){
        const schema = {
            name: Joi.string().min(3).max(50).required(),
            descricao: Joi.string().min(3).max(255).required(),
            imagePathSmall: Joi.string(),
            imagePathBig: Joi.string()
        }
    
        return Joi.validate(plant,schema)
    }


module.exports ={
    Plant: mongoose.model('Plant' , plantSchema),
    validate: validatePlant
}

