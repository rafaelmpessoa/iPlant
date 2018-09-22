const {Horta, validate, validateAddPlant} = require('../models/horta')
const {Plant} = require('../models/plant')
const {p_filter} = require('p-iteration')


//obter todas as hortas
exports.getAllHortas = async (req,res)=>{
    const horta = await Horta.find()
        .populate({path: 'user', select:'-password -isAdmin -activeHash'})
        .populate('plant')

    res.status(400).send(horta)


}

//obter uma as hortas
exports.getOneHortas = async (req,res)=>{
    let horta
    try{
        horta = await Horta.findById(req.params.id)
        .populate({path: 'user', select:'-password -isAdmin -activeHash'})
        .populate('plant')
        res.status(200).send(horta)
    }catch(e){
        res.status(400).send('é necessário passar um objectId como parâmetro')
    }


}

//Cadastrar uma Horta
exports.postHorta = async (req,res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const horta = new Horta(req.body)
    await horta.save()

    res.status(200).send(horta)

}

//deletar uma horta
exports.deleteOneHorta = async (req,res)=>{
   let horta
    try{
        horta = await Horta.findByIdAndRemove(req.params.id)
        res.status(200).send(horta)
    }catch(e){
        res.status(400).send('É necessário passar um objectId como parâmetro')
    }
}

//add plantas
exports.addPlant = async (req,res)=>{
 
    const {error} = validateAddPlant(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const horta = await Horta.findById(req.body._id)
    if(!horta) return res.status(400).send('Error: Horta não encontrada!')
    //verifcar se todas as plantas estão cadastradas
    const plants = req.body.plant

    const filteredPlants = await p_filter(plants,async _id =>{
        const response = await Plant.findById(_id)
        return !!response
    })

    horta.plant = horta.plant.concat(filteredPlants)
    const result = await horta.save()
    res.status(200).send(result)
}

//remove plants
exports.removePlant = async (req,res)=>{
    const {error} = validateAddPlant(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const horta = await Horta.findById(req.body._id)
    if(!horta) return res.status(400).send('Error: Horta não encontrada!')

    const plants = req.body.plant
    horta.plant = horta.plant.filter(val => !plants.includes(val.toString()))

   const result = await horta.save()

    res.status(200).send(result)

}