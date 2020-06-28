const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const routes  = require('../routes')

const path = require('path')
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars')

const app=express()
require('../config/passport')

app.set('port', process.env.PORT || 8000)
app.use(morgan('dev'))

app.set('views', path.join(__dirname, '../views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}))
app.set('view engine', '.hbs')

app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/',routes)

module.exports = app
