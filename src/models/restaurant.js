const mongoose = require('mongoose')
const {Schema}=mongoose

const resSchema = new Schema({
    Nombre: {type: String},
    Nit: {type: String},
    Propietario: {type: String},
    idPropietario: {
        type: Schema.Types.ObjectId, 
        ref:'user'
    },
    menus:[{
        type: Schema.Types.ObjectId,
        ref:'user'
    }],
    Calle: {type: String},
    Telefono: {type: String},
    Long: {type:String},
    Lat: {type:String},
    Logo: {type:String, default: ""},
    FechadeRegistro: {type:Date, default:Date.now},
    FotoLugar: {type: String, default: ""}
})

module.exports = mongoose.model('restaurant', resSchema)