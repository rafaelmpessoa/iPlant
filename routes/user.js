const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const user_controller = require('../controller/user')


//Obter usuário
router.get('/:id', auth , user_controller.getOneUser)

router.get('/', [auth,admin], user_controller.allUser)

// Criar um usuário inativo.
router.post('/register', user_controller.postUser)

router.delete('/:id', [auth,admin], user_controller.deleteUSer)

router.get('/confirm/:token', user_controller.validateToken)

router.post('/login',user_controller.login)

module.exports = router