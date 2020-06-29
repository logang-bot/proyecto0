const mongoose = require('mongoose')
const {Schema}=mongoose

const orSchema = new Schema({
    Cantidad: {type: Number},
    Long: {type:String},
    Lat: {type:String},
    PagoTotal: {type: Number},
    idMenu: {
        type: Schema.Types.ObjectId,
        ref: 'menu'},
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'},
    stat: {
        type: String,
        default: "0"
    }
})

module.exports = mongoose.model('orden', orSchema)