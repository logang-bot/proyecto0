const mongoose = require('mongoose')
const {Schema}=mongoose
const bcrypt =require('bcryptjs')
const restaurant = require('./restaurant')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    restaurants: [{
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    }],
    ordenes: [{
        type: Schema.Types.ObjectId,
        ref: 'orden'
    }]
})

userSchema.methods.encryptPass = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hash(password, salt)
    return hash
}

userSchema.methods.matchPass = async function(password){
    return await bcrypt.compare(password, this.password)
}
module.exports = mongoose.model('user', userSchema)