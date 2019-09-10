require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const massive = require('massive')

//setting up app
const app = express()

//env variables
const {
    CONNECTION_STRING,
    SESSION_SECRET,
    SERVER_PORT
} = process.env

//TLM
app.use(express())
app.use(cors())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 600000
    }
}))

massive(CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance)
        console.log('Database Connected! 👽')
    })
    .catch(error => {
        console.log(error)
    })

//auth endpoints

//world endpoints

//details endpoints

//get app listening

app.listen(SERVER_PORT, () => {
    console.log('Server Running! 👾')
})

