const {restaurant, menu, user} = require('../models')
const ctrl = {}
const saveimage = require('../controllers/image')

ctrl.index = async (req,res)=>{
    const{idRest}= req.params
    const menus = await menu.find({Restau: idRest}) 
    res.status(200).json({menus})
}

ctrl.create = async (req,res)=>{
    const {idRest} = req.params
    console.log(idRest)
    const rest = await restaurant.findById(idRest)
    console.log(rest)
    if(rest.idPropietario._id.equals(req.user.id)){
        const newMenu = new menu(req.body)
        const errors = []
        if(!newMenu.Nombre) errors.push({text: 'por favor insertar un nombre'})
        if(!newMenu.Precio) errors.push({text: 'por favor ingresar un precio'})
        if(!newMenu.Descripcion) errors.push({text: 'por favor ingresar una descripcion'})
        if(errors.length>0){res.status(500).json({errors})}
        else{
            const men = await menu.findOne({Nombre: req.body.Nombre})
            if(men){
                res.send('ya registro este producto')
            }
            else{
                const img = await saveimage.cre(req,res)
                if(img == "fail") {
                    res.send('el formato no es valido')
                    return 
                }
                else newMenu.FotoProducto = img
                newMenu.Restau = rest
                await newMenu.save()
                rest.menus.push(newMenu)
                await rest.save()
                console.log(newMenu)
                res.send('menu creado')
            }
        }
    }
    else{
        res.send('usted no es el propietario de este restaurante')
    }
}

ctrl.edit = async (req,res)=>{
    const men = await menu.findById(req.params.id)
    //console.log(req.params.id)
    const rest = await restaurant.findById(men.Restau._id)
    if(rest.idPropietario._id.equals(req.user.id)){
        const {Nombre, Precio, Descripcion, FotoProducto} = req.body
        const errors = []
        if(!Nombre) errors.push({text: 'por favor insertar un nombre'})
        if(!Precio) errors.push({text: 'por favor ingresar un precio'})
        if(!Descripcion) errors.push({text: 'por favor ingresar una descripcion'})
        if(!FotoProducto) errors.push({text: 'por favor ingresar una imagen'})
        if(errors.length>0){res.status(500).json({errors})}
        else{
            const menuu = await menu.findOne({Nombre: req.body.Nombre})
            if(menuu){
                res.send('ya registro este producto')
            }
            else{
                await menu.findByIdAndUpdate(req.params.id,{
                    Nombre: Nombre,
                    Precio: Precio,
                    Descripcion: Descripcion,
                    FotoProducto: FotoProducto
                })
                res.send('menu actualizado')
            }
        }
    }
    else{
        res.send('usted no es el propietario de este restaurante')
    }
}

ctrl.edFoto = async (req,res)=>{
    const {id} = req.params
    const img = await saveimage.cre(req, res)
    if(img == "fail"){
        res.send("el formato no es valido")
    }else if (img == "") res.send('debe subir un archivo')
    else {
        await menu.findByIdAndUpdate(id, {FotoProducto: img})
        res.send('Foto actualizada')
    }
}

ctrl.delFoto = async (req,res)=>{
    const {id} = req.params
    await menu.findByIdAndUpdate(id, {FotoProducto: ""})
    res.send('Foto eliminada')
}

ctrl.delete = async(req,res)=>{
    const men = await menu.findById(req.params.id)
    const rest = await restaurant.findById(men.Restau._id)
    if(rest.idPropietario._id.equals(req.user.id)){
        await menu.findByIdAndDelete(req.params.id)
        await rest.menus.remove(men)
        await rest.save()
        res.send('menu eliminado')
    }
    else{
        res.send('usted no es el propietario de este restaurante')
    }
}
module.exports = ctrl