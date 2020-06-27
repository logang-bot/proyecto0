const router  = require('express').Router()
const user = require('../controllers/user')
const passport = require('passport')
//rutas para el restaurante


//rutas para el usuario
router.get('/user/list', user.index)
router.post('/user/signUp', user.signUp)
router.post('/user/logIn', user.login2, user.logIn)
router.put('/user/editUser/:id', user.edit)
router.delete('/user/deleteUser/:id', user.delete)

//rutas para el menu


//rutas para la orden

//.......
router.get('/', (req,res)=>{
    res.send('works')
})

module.exports = router