const {Plant,validate} = require('../models/plant')
const _ = require('lodash')

exports.postPlant = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let plant = await Plant.findOne({ name: req.body.name })
    //caso já exista essa Planta
    if (plant) return res.status(400).send('Não foi possivel inserir, esta planta já está cadastrada!')

    plant = new Plant(req.body)

    await plant.save()
    res.status(200).send(plant)

}

exports.getAllPlants = async (req, res) => {
    let plant
    if (req.query.active === undefined || req.query.active == 'true') {
        plant = await Plant.find({ active: true })
        return res.status(200).send(plant)
    }
    plant = await Plant.find()
    res.status(200).send(plant)
}

exports.updatePlant = async (req, res) => {
    let plant
    const query = _.pick(req.body,['descricao','active'])
    try {
         plant = await Plant.findOneAndUpdate({ _id: req.params.id }, query ,{new: true})
    } catch (e) {
        return res.status(400).send('Planta não encontrada!')
    }

    res.status(200).send(plant)
}

exports.deletePlant =  async (req,res)=>{
    let plant
    try{
        plant = await Plant.findByIdAndRemove(req.params.id)
        res.status(200).send(plant)
    }catch(e){
        res.status(400).send('é necesário passar um objectId como parâmetro')
    }
}