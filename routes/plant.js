const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const plant_controller = require('../controller/plant')


//inseri Planta no banco de dados
router.post('/', [auth, admin], plant_controller.postPlant)

//Obter todas as plantas req.query.active(op) caso true or undefined retorna apenas as ativas se não retorna todas
router.get('/', auth, plant_controller.getAllPlants)

//atualiza o active e/ou a descricao
router.put('/:id', [auth, admin], plant_controller.updatePlant)

//deletar planta
router.delete('/:id', [auth,admin],plant_controller.deletePlant)

module.exports = router