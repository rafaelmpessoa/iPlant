const express = require('express')
const router = express.Router()
const {User, validate} = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const sendEmail = require('../email')

router.get('/:id', auth , async (req,res)=>{
    const user = await User.findById(req.params.id).select('-password')
    sendEmail('rafaelmpessoa1103@gmail.com','Assunto teste')
     res.status(200).send(user)


})

router.get('/', [auth,admin], async (req,res)=>{
    const users = await User.find().select('-password')
    res.status(200).send(users)
})

// Criar um usuário inativo.
router.post('/register', async (req,res)=>{
    const { error } = validate(req.body)
    if (error) return res.send(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email})
    if (user) return res.status(400).send('Usuário já existe!')

    user = new User(_.pick(req.body,['name','password','email','isAdmin']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)
    await user.save()


    const token = user.generateJwt()
    res.header('x-auth-token', token).send(_.pick(user,['_id', 'name', 'email']))
})


module.exports = router