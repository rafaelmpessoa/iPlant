const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId  = require('joi-objectid')(Joi)

const hortaSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    plant:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant',
        required: false
    }],
    dataCadastro:{
        type: Date,
        required:true,
        default:new Date()
    }
    })


function validateHorta(horta) {
    const schema = {
        user: Joi.objectId().required(),
        plant: Joi.array().items(Joi.objectId())
    }

    return Joi.validate(horta,schema)
}

function validateAddPlant(horta) {
    const schema = {
        _id: Joi.objectId().required(),
        plant: Joi.array().items(Joi.objectId().required()).required()
    }

    return Joi.validate(horta,schema)
}


module.exports = {
    Horta: mongoose.model('Horta' , hortaSchema),
    validate: validateHorta,
    validateAddPlant: validateAddPlant
}    


