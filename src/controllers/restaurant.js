const ctrl  = {}
const {restaurant, user, imagen} = require('../models/')
const { findById } = require('../models/menu')
const saveimage = require('../controllers/image')

ctrl.myindex = async (req,res)=>{
    const restnts = await restaurant.find({idPropietario:req.user.id})
    res.status(200).json(restnts)
}

ctrl.index = async (req,res)=>{
    const restnts = await restaurant.find({})
    res.status(200).json(restnts)
}

ctrl.create = async (req,res)=>{
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
            const userr = await user.findById(req.user.id)
            newRestnt.idPropietario = userr
            newRestnt.Propietario = userr.name
            const img = await saveimage.cre(req,res)
            if(img == "fail") {
                res.send('el formato no es valido')
                return 
            }
            else newRestnt.Logo = img
            await newRestnt.save()
            userr.restaurants.push(newRestnt)
            await userr.save()
            res.send('restaurante creado')
            console.log('---------------')
            console.log(newRestnt)

        }
    }
}

ctrl.edit = async (req,res)=>{
    const {id} = req.params
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
            const userr = await user.findById(req.user.id)
            if(restt.idPropietario._id.equals(userr._id)){
                await restaurant.findByIdAndUpdate(id, {
                    Nombre: newRestnt.Nombre,
                    Nit: newRestnt.Nit,
                    Calle: newRestnt.Calle,
                    Telefono: newRestnt.Telefono,
                    Long: newRestnt.Long,
                    Lat: newRestnt.Lat,
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

ctrl.editLogo = async (req,res)=>{
    const {id} = req.params
    const img = await saveimage.cre(req, res)
    if(img == "fail"){
        res.send("el formato no es valido")
    }else if (img == "") res.send('debe subir un archivo')
    else {
        await restaurant.findByIdAndUpdate(id, {Logo: img})
        res.send('Logo actualizado')
    }
}

ctrl.delLogo = async (req,res)=>{
    const {id} = req.params
    await restaurant.findByIdAndUpdate(id, {Logo: ""})
    res.send('Logo eliminado')
}
ctrl.editFotoLugar = async (req,res)=>{
    const {id} = req.params
    const img = await saveimage.cre(req, res)
    if(img == "fail"){
        res.send("el formato no es valido")
    }else if (img == "") res.send('debe subir un archivo')
    else {
        await restaurant.findByIdAndUpdate(id, {FotoLugar: img})
        res.send('Foto del lugar actualizado')
    }
}

ctrl.delFotoLugar = async (req,res)=>{
    const {id} = req.params
    await restaurant.findByIdAndUpdate(id, {FotoLugar: ""})
    res.send('Foto del lugar eliminado')
}

ctrl.delete = async (req, res) => {
    const {id} = req.params
    const restt = await restaurant.findById(id)
    const userr = await user.findById(req.user.id)
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
    const {id} = req.params
    const email = req.body.email
    const restt = await restaurant.findById(id)
    const userr = await user.findById(req.user.id)
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

ctrl.lugar = async (req,res) => {
    const { id } = req.params
    const restt = await restaurant.findById(id)
    const userr = await user.findById(req.user.id)
    if (restt.idPropietario._id.equals(userr._id)) {
        const img = await saveimage.cre(req, res)
        if (img == "fail") {
            res.send("el formato no es valido")
        } else if (img == "") res.send('debe subir un archivo')
        else {
            await restaurant.findByIdAndUpdate(id, { FotoLugar: img })
            console.log('foto del lugar agregada')
            res.send('Foto del lugar agregada')
        }
    }
    else {
        console.log(restt.idPropietario)
        console.log(userr._id)
        res.send('no eres el propietario actual de este negocio')
    }
    
}

module.exports = ctrl