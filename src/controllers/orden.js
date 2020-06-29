const ctrl ={}
const {menu,orden,user}= require('../models')
const { findById } = require('../models/menu')

ctrl.index = async (req,res)=>{
    const ords = await orden.find({idUser:req.user.id})
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
        const total = men.Precio + "dsds"
        newOr.PagoTotal = 12
        newOr.idMenu = men
        newOr.idUser = req.user.id
        const usr = await user.findById(req.user.id)
        usr.cart.push(newOr)
        await usr.save()
        console.log(usr)
        await newOr.save()
        res.send('agregado correctamente')
        /*men.ContOrders+=1
        await men.save()
        res.send('agregado al carrito')
        await newOr.save()*/
    }
    
}

ctrl.getcart = async (req,res)=>{
    const {id} = req.params
    const usr = await user.findById(req.user.id)
    const carrr  = await usr.cart
    res.send(carrr)
}

ctrl.edit = async (req,res)=>{
    const {Cantidad, Long, Lat} = new orden(req.body)
    const {id} = req.params
    const errors = []
    if(!Cantidad || Cantidad == "0") errors.push({text: 'la cantidad deber ser mayor a 0'})
    if(!Long) errors.push({text: "ingresar una ubicacion valida"})
    if(!Lat) errors.push({text: "ingresar una ubicacion valida"})
    if(errors.length>0){
        res.status(500).json({errors})
    }
    else{
        const od = await orden.findById(id)
        console.log(od)
        await orden.findByIdAndUpdate(id, {
            Cantidad, Long, Lat
        })
        res.send('orden actualizada')
    }
}
ctrl.delete = async (req,res)=>{
    const {id} = req.params
    const usr = await user.findById(req.user.id)
    const od = await orden.findById(id)
    await orden.findByIdAndDelete(id)
    usr.cart.remove(od)
    await usr.save()
    res.send('orden eliminada')
}

ctrl.create = async (req,res)=>{
    const usr = await user.findById(req.user.id)
    console.log(req.user.id)
    const ords = await user.find({idUser:req.user.id, stat:"0"})
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

