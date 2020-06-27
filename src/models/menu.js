const mongoose = require('mongoose')
const {Schema}=mongoose

const menuSchema = new Schema({
    Nombre: {type: String},
    Precio: {type: String},
    Descripcion: {type: String},
    FechadeRegistro: {type:Date, default:Date.now},
    FotoProducto : {type: String}
})

module.exports = mongoose.model('menu', menuSchema)