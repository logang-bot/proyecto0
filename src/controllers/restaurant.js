const ctrl  = {}
const {restaurant, user} = require('../models/')
const { findById } = require('../models/menu')

ctrl.index = async (req,res)=>{
    const restnts = await restaurant.find({})
    res.status(200).json(restnts)
}

ctrl.create = async (req,res)=>{
    const {idUser} = req.params
    const newRestnt = new restaurant(req.body)
    const errors = []
    if(!newRestnt.Nombre){
        errors.push({text: 'por favor insertar un nombre'})
    }
    if(!newRestnt.Nit){
        errors.push({text: 'por favor insertar un Nit'})
    }
    if(!newRestnt.Calle){
        errors.push({text: 'por favor insertar una Direccion'})
    }
    if(!newRestnt.Telefono){
        errors.push({text: 'por favor insertar un Telefono'})
    }
    if(errors.length>0){
        res.status(500).json({errors})
    }
    else{
        const rest = await restaurant.findOne({Nombre:req.body.Nombre})
        if(rest){
            res.send('este nombre ya esta en uso')
        }
        else{
            const userr = await user.findById(idUser)
            newRestnt.idPropietario = userr
            newRestnt.Propietario = userr.name
            await newRestnt.save()
            userr.restaurants.push(newRestnt)
            await userr.save()
            res.send('restaurante creado')
            console.log(newRestnt)
        }
    }
   
}

ctrl.edit = async (req,res)=>{
    const {idUser, id} = req.params
    const newRestnt = new restaurant(req.body)
    const errors = []
    if(!newRestnt.Nombre){
        errors.push({text: 'por favor insertar un nombre'})
    }
    if(!newRestnt.Nit){
        errors.push({text: 'por favor insertar un Nit'})
    }
    if(!newRestnt.Calle){
        errors.push({text: 'por favor insertar una Direccion'})
    }
    if(!newRestnt.Telefono){
        errors.push({text: 'por favor insertar un Telefono'})
    }
    if(errors.length>0){
        res.status(500).json({errors})
    }
    else{
        const rest = await restaurant.findOne({Nombre:req.body.Nombre})
        if(rest){
            res.send('este nombre ya esta en uso')
        }
        else{
            const restt = await restaurant.findById(id)
            const userr = await user.findById(idUser)
            if(restt.idPropietario._id.equals(userr._id)){
                await restaurant.findByIdAndUpdate(id, {
                    Nombre: newRestnt.Nombre,
                    Nit: newRestnt.Nit,
                    Calle: newRestnt.Calle,
                    Telefono: newRestnt.Telefono,
                    Long: newRestnt.Long,
                    Lat: newRestnt.Lat,
                    Logo: newRestnt.Logo,
                    FotoLugar : newRestnt.FotoLugar
                })
                res.send('restaurante actualizado correctamente')
            }
            else{
                console.log(restt.idPropietario)
                console.log(userr._id)
                res.send('no eres el propietario de este negocio')
            }
            
        }
    }
}

ctrl.delete = async (req, res) => {
    const {idUser, id} = req.params
    const restt = await restaurant.findById(id)
    const userr = await user.findById(idUser)
    if (restt.idPropietario._id.equals(userr._id)) {
        await restaurant.findByIdAndDelete(id)
        await userr.restaurants.remove(restt)
        await userr.save()
        res.send('restaurante eliminado satisfactoriamente')
    }
    else {
        console.log(restt.idPropietario)
        console.log(userr._id)
        res.send('no tienes permiso para esta accion')
    }
}

ctrl.change = async (req,res) =>{
    const {idUser, id} = req.params
    const email = req.body.email
    const restt = await restaurant.findById(id)
    const userr = await user.findById(idUser)
    const nuser = await user.findOne({email: email})
    console.log(email)
    if (nuser){
        if (restt.idPropietario._id.equals(userr._id)) {
            await restaurant.findByIdAndUpdate(id, {idPropietario:nuser, Propietario:nuser.name})
            await userr.restaurants.remove(restt)
            await userr.save()
            nuser.restaurants.push(restt)
            await nuser.save()
            res.send('cambio de propietario satisfactorio')
        }
        else {
            console.log(restt.idPropietario)
            console.log(userr._id)
            res.send('no eres el propietario actual de este negocio')
        }
    }
    else{
        res.send('el usuario no esta registrado')
    }
    
}

module.exports = ctrl