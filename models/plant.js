const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: false
    },
    dataCadastro:{
        type: Date,
        required:true,
        default:new Date()
    }
    })



module.exports = mongoose.model('Plant' , plantSchema)

