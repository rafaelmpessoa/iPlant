const mongoose = require('mongoose')

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



module.exports = mongoose.model('Horta' , hortaSchema)

