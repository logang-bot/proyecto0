const mongoose = require('mongoose')
const {Schema}=mongoose

const menuSchema = new Schema({
    Nombre: {type: String},
    Precio: {type: Number},
    Descripcion: {type: String},
    FechadeRegistro: {type:Date, default: Date.now},
    FotoProducto : {type: String, default: ""},
    Restau: {
        type:Schema.Types.ObjectId, 
        ref:'restaurant'},
    ContOrders: {
        type:Number,
        default: 0
    }
})

module.exports = mongoose.model('menu', menuSchema)