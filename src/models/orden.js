const mongoose = require('mongoose')
const {Schema}=mongoose

const orSchema = new Schema({
    idMenu: {
        type: Schema.Types.ObjectId,
        ref: 'menu'},
    idRestaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant'},
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'},
    cantidad: {type: Number},
    Long: {type:String},
    Lat: {type:String},
    pagoTotal: {type: Number}

})

module.exports = mongoose.model('orden', orSchema)