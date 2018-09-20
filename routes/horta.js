const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const horta_controller = require('../controller/horta')

//onter todas as Hortas
router.get('/', [auth,admin], horta_controller.getAllHortas)

//obter uma Horta
router.get('/:id', auth, horta_controller.getOneHortas)

//cadastrar Horta
router.post('/', auth, horta_controller.postHorta)

//deletar horta
router.get('/:id', [auth,admin], horta_controller.deleteOneHorta)

//add uma planta na horta
router.put('/plant/add/',auth,horta_controller.addPlant)

//add uma planta na horta
router.put('/plant/remove/',auth,horta_controller.removePlant)


module.exports = router