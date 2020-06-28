const passport = require('passport')
const localStrategy  = require('passport-local').Strategy

const {user}=require('../models')
const {findById} = require('../models/user')

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email,password,done)=>{
    const userr = await user.findOne({email:email})
    if(!userr){
        console.log('el usuario no existe ')
        return done(null,false)
    }
    else{
        const match = await userr.matchPass(password)
        if(match){
            console.log('logueado correctamente')
            return done(null,userr)
        }
        else{
            console.log('contrasenia incorrecta')
            return done(null,false)
        }
    }
}))

passport.serializeUser((userr,done)=>{
    done(null, userr.id)
})

passport.deserializeUser((id, done)=>{
    user.findById(id,(err,userr)=>{
        done(err,userr)
    })
})

module.exports=passport