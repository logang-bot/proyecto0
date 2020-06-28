const {user}=require('../models')
const passport = require('passport')
const { use } = require('passport')
const ctrl={}

ctrl.index = async (req,res)=>{
    const users = await user.find({})
    res.status(200).json(users)
}

ctrl.signUp = async (req,res)=>{
    const{name, email, password, confirm_password} = req.body
    const errors=[]
    if(name.length <=0) errors.push({text: 'por favor insertar un nombre'})
    if(email.length <=0) errors.push({text: 'por favor insertar un correo'})
    if(password.length <=4) errors.push({text: 'la contrasenia debe ser mayor a 4 caracteres'})
    if(password != confirm_password) errors.push({text: 'las contrasenias no coinciden'})
    if(errors.length>0){
        res.status(500).json(errors)
        console.log(errors)
        return
    }
    else{
        const emailUser = await user.findOne({email: email})
        if(emailUser){
            res.status(500).json({message: 'este correo ya esta registrado'})
        }
        else{
            const newUser = new user({name, email,password})
            newUser.password = await newUser.encryptPass(password)
            await newUser.save()
            res.status(200).json({message: 'estas registrado'})
            console.log(newUser)
        }
    }
}

ctrl.logIn = passport.authenticate('local',{
        successRedirect: '/restnt/list',
        failureRedirect: '/'
    })

ctrl.login2 = async(req,res,next)=>{
    const userr = await user.findOne({email:req.body.email})
    if(!userr){
        res.send('el usuario no existe ')
    }
    else{
        const match = await userr.matchPass(req.body.password)
        if(match){
            res.send('logueado correctamente')
            next()
        }
        else{
            res.send('contrasenia incorrecta')
        }
    }
}
ctrl.edit = async(req,res)=>{
    const {name, email, password}=req.body
    const userr = new user({password:password})
    userr.password = await userr.encryptPass(password)
    await user.findByIdAndUpdate(req.params.id, {name,email,password: userr.password})
    res.send('actualizado correctamente')
}
ctrl.delete = async(req,res)=>{
    await user.findByIdAndDelete(req.params.id)
    res.send('el usuario fue eliminado')
}
ctrl.logOut = (req,res)=>{
    req.logout()
    res.send('te has deslogueado')
}

module.exports = ctrl