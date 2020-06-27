const passport = require('passport')
const localStrategy  = require('passport-local').Strategy

const {user}=require('../models')

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email,password,done)=>{
    const userr = await user.findOne({email:email})
    if(!userr){
        console.log('el usuario no existe ')
        return
    }
    else{
        const match = await userr.matchPass(password)
        if(match){
            //res.send('jk')
            console.log('logueado correctamente')
            return
        }
        else{
            //res.send('jk')
            console.log('contrasenia incorrecta')
            return 
        }
        return
    }
}))

passport.serializeUser((user,done)=>{
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    user.findById(id,(err,user)=>{
        done(err,user)
    })
})

module.exports=passport