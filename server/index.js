require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const massive = require('massive')

//ctrl files
const ctrlAuth = require('./controllers/authController')
const ctrlWorlds = require('./controllers/worldController')
const ctrlClimate = require('./controllers/articleContollers.js/climateController')

//setting up app
const app = express()

//env variables
const {
    CONNECTION_STRING,
    SESSION_SECRET,
    SERVER_PORT
} = process.env

//TLM
app.use(express.json())
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
app.post('/auth/register', ctrlAuth.register)
app.post('/auth/login', ctrlAuth.login)
app.get('/auth/logout', ctrlAuth.logout)

//world endpoints
app.get('/api/worlds', ctrlWorlds.getWorlds)
app.post('/api/worlds', ctrlWorlds.addWorld)
// app.delete('/api/worlds/:worldid', ctrlWorlds.deleteWorld)
app.put('/api/worlds/:id', ctrlWorlds.updateWorld)

//climate endpoints
app.get('/api/worlds/:id/climate', ctrlClimate.getClimate)
app.get('/api/worlds/climate/:worldid', ctrlClimate.getOneClimate)
app.post('/api/worlds/:worldid/climate', ctrlClimate.addClimate)


//app listening
app.listen(SERVER_PORT, () => {
    console.log('Server Running! 👾')
})
