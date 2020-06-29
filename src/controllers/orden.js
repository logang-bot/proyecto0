const ctrl ={}
const {menu,orden,user}= require('../models')
const { findById } = require('../models/menu')

ctrl.index = async (req,res)=>{
    const ords = await orden.find({idUser:req.user.id, stat: "1"})
    res.status(200).json(ords)
}

ctrl.cart = async (req,res)=>{
    const newOr = new orden(req.body)
    const {idMenu} = req.params
    const errors = []
    if(!newOr.Cantidad || newOr.Cantidad == "0") errors.push({text: 'la cantidad deber ser mayor a 0'})
    if(!newOr.Long) errors.push({text: "ingresar una ubicacion valida"})
    if(!newOr.Lat) errors.push({text: "ingresar una ubicacion valida"})
    if(errors.length>0){
        res.status(500).json({errors})
    }
    else{
        const men = await menu.findById(idMenu)
        console.log(men)
        const total = parseFloat(men.Precio)*parseFloat(newOr.Cantidad)
        newOr.PagoTotal = total
        newOr.idMenu = men
        newOr.idUser = req.user.id
        await newOr.save()
        men.ContOrders+=1
        await men.save()
        res.send('agregado correctamente')
    }
}

ctrl.getcart = async (req,res)=>{
    const ords = await orden.find({idUser:req.user.id, stat: "0"})
    res.status(200).json(ords)
}

ctrl.edit = async (req,res)=>{
    const {Cantidad, Long, Lat} = new orden(req.body)
    const {id} = req.params
    const od = await orden.findOne({_id: id, stat: 0})
    if (od) {
        const errors = []
        if (!Cantidad || Cantidad == "0") errors.push({ text: 'la cantidad deber ser mayor a 0' })
        if (!Long) errors.push({ text: "ingresar una ubicacion valida" })
        if (!Lat) errors.push({ text: "ingresar una ubicacion valida" })
        if (errors.length > 0) {
            res.status(500).json({ errors })
        }
        else {
            console.log(od)
            await orden.findByIdAndUpdate(id, {
                Cantidad, Long, Lat
            })
            res.send('orden actualizada')
        }
    }
    else{
        res.send('esta orden ya fue finalizada')
    }
    
}
ctrl.delete = async (req,res)=>{
    const {id} = req.params
    const od = await orden.findOne({_id: id, stat: 0})
    if(od){
        await orden.findByIdAndDelete(id)
        res.send('orden eliminada')
    }
    else{
        res.send('esta orden ya fue finalizada')
    }
}

ctrl.create = async (req,res)=>{
    console.log(req.user.id)
    const ords = await orden.find({idUser: req.user.id, stat:"0"})
    console.log(ords)
    if(ords.length == 0){
        res.send('el carrito esta vacio')
    }
    else{
        await orden.updateMany({idUser:req.user.id, stat:"0"},{stat:"1"})
        res.send('se realizo la compra')
    }
}

module.exports = ctrl

