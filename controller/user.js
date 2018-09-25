const {User,validate} = require('../models/user')
const sendRegisterEmail = require('../email')
const uid = require('rand-token').uid; 
const _ = require('lodash')
const bcrypt = require('bcrypt')
const logger = require('../logger')



exports.getOneUser = async (req,res) => {
    let user
    try{
        user = await User.findById(req.params.id).select('-password')
        res.status(200).send(user)
    }catch(e){
        res.status(400).send('é necessário passar um objectId como parâmetro')
    }


}

exports.allUser = async (req,res) => {
    const user = await User.find().select('-password')
    res.status(200).send(user)
    
}

//inserir usuário
exports.postUser = async (req,res)=>{
    const { error } = validate(req.body)
    if (error) return res.send(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email})
    if (user) return res.status(400).send('Usuário já existe!')

    user = new User(_.pick(req.body,['name','password','email','isAdmin']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)
    const token = uid(16)
    user.activeHash = token
    
    try{
        await user.save()
        await sendRegisterEmail(user.email,token)
        res.status(200).send(user)
    }catch(e){
        logger.error(`USER - Post: ${e.message}`)
        res.status(400).send(`Falha: ${e.message}`)
    }  
    
}

exports.deleteUSer = async(req,res) =>{
    const result = await User.findByIdAndRemove(req.params.id).select('-password')
    if(!result) return res.status(400).send('Usuário não encontrado!')
    res.status(200).send(result)

}

exports.validateToken = async(req,res)=>{
    const user =await User.findOneAndUpdate({activeHash :req.params.token},{active: true}).select('-password')
    if(!user) return res.status(400).send('Usuário não encontrado!')
    res.status(200).send(user)
}

exports.login = async(req,res)=>{
    const credenciais = req.body

    if(!credenciais.email || !credenciais.password) return res.status(400).send('Error: Enviar Login e password!')

    const user = await User.findOne({email: credenciais.email})

    if(!user) return res.status(404).send('Usuário não cadastrado')
    if(!user.active) {
        await sendRegisterEmail(credenciais.email,user.activeHash) 
        return res.status(401).send(`Usuário não está ativo. Email de ativação reenviado para ${credenciais.email}`)
    }

    
    const isValidPassword = await bcrypt.compare(credenciais.password, user.password)

    if(!isValidPassword) return res.status(401).send('Password invalid')
    

    const token = user.generateJwt()
    res.header('x-auth-token', token).send(_.pick(user,['_id', 'name', 'email','isAdmin'])).status(200)

}