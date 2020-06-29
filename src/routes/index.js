const router  = require('express').Router()
const user = require('../controllers/user')
const restnt = require('../controllers/restaurant')
const menu = require('../controllers/menu')
const orden = require('../controllers/orden')
const passport = require('passport')
const {isAuthenticated}= require('../helpers/auth')

//rutas para el usuario
router.get('/user/list', user.index)
router.post('/user/signUp', user.signUp)
router.get('/user/logIn', (req,res)=>{
    res.render('login')
})
router.post('/user/logIn', user.logIn)
router.get('/user/logOut', user.logOut)
router.put('/user/editUser/:id', user.edit)
router.delete('/user/deleteUser/:id', user.delete)

//rutas para el restaurante
router.get('/restnt' ,restnt.index)
router.get('/restnt/list' ,restnt.myindex)
router.post('/restnt/create', restnt.create)
router.put('/restnt/editRestnt/:id', restnt.edit)
router.delete('/restnt/deleteRestnt/:id', restnt.delete)
router.patch('/restnt/chanProp/:id', restnt.change)

//rutas para el menu
router.get('/menu/list/:idRest', menu.index)
router.post('/menu/create/:idRest', menu.create)
router.put('/menu/edit/:id', menu.edit)
router.delete('/menu/delete/:id', menu.delete)

//rutas para la orden
router.get('/orden/list', orden.index)
router.post('/orden/cart/:idMenu', orden.cart)
router.get('/orden/cart', orden.getcart)
router.put('/orden/edit/:id', orden.edit)
router.delete('/orden/delete/:id', orden.delete)
router.put('/orden/create', orden.create)


//.......
router.get('/', (req,res)=>{
    res.send('works')
})

module.exports = router