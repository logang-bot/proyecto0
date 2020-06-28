const router  = require('express').Router()
const user = require('../controllers/user')
const restnt = require('../controllers/restaurant')
const passport = require('passport')


//rutas para el restaurante
router.get('/restnt/list', restnt.index)
router.post('/restnt/create/:idUser', restnt.create)
router.put('/restnt/editRestnt/:idUser/:id', restnt.edit)
router.delete('/restnt/deleteRestnt/:idUser/:id', restnt.delete)
router.patch('/restnt/chanProp/:idUser/:id', restnt.change)

//rutas para el usuario
router.get('/user/list', user.index)
router.post('/user/signUp', user.signUp)
router.post('/user/logIn', user.login2, user.logIn)
router.get('/user/logOut', user.logOut)
router.put('/user/editUser/:id', user.edit)
router.delete('/user/deleteUser/:id', user.delete)

//rutas para el menu
router.get('/restnt/list', restnt.index)
router.post('/restnt/create/:idUser', restnt.create)
router.put('/restnt/editRestnt/:idUser/:id', restnt.edit)
router.delete('/restnt/deleteRestnt/:idUser/:id', restnt.delete)

//rutas para la orden


//.......
router.get('/', (req,res)=>{
    res.send('works')
})

module.exports = router