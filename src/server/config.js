const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const routes  = require('../routes')
const multer = require('multer')

const path = require('path')
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars')

const app=express()
require('../config/passport')


//middlewares
app.set('port', process.env.PORT || 8000)


app.set('views', path.join(__dirname, '../views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}))
app.set('view engine', '.hbs')


app.use(morgan('dev'))
app.use(multer({
    dest: path.join(__dirname, '../public/upload/temp')
}).single('Logo' || 'FotoLugar'))
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/',routes)

app.use('/public', express.static(path.join(__dirname, '../public')))

module.exports = app
