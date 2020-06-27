const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const routes  = require('../routes')

const app=express()
require('../config/passport')

app.set('port', process.env.PORT || 8000)
app.use(morgan('dev'))

app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/',routes)

module.exports = app
