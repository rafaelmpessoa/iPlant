const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { Plant, validate } = require('../models/plant')
const _ = require('lodash')

//inseri Planta no banco de dados
router.post('/', [auth, admin], async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let plant = await Plant.findOne({ name: req.body.name })
    //caso já exista essa Planta
    if (plant) return res.status(400).send('Não foi possivel inserir, esta planta já está cadastrada!')

    plant = new Plant(req.body)

    await plant.save()
    res.status(200).send(plant)

})

//Obter todas as plantas req.query.active(op) caso true or undefined retorna apenas as ativas se não retorna todas
router.get('/', auth, async (req, res) => {
    let plant
    if (req.query.active === undefined || req.query.active == 'true') {
        plant = await Plant.find({ active: true })
        return res.status(200).send(plant)
    }
    plant = await Plant.find()
    res.status(200).send(plant)
})

//atualiza o active e/ou a descricao
router.put('/:id', [auth, admin], async (req, res) => {
    let plant
    const query = _.pick(req.body,['descricao','active'])
    try {
         plant = await Plant.findOneAndUpdate({ _id: req.params.id }, query ,{new: true})
    } catch (e) {
        return res.status(400).send('Planta não encontrada!')
    }

    res.status(200).send(plant)
})

module.exports = router