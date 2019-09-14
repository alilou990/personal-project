require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const massive = require('massive')

//ctrl files
const ctrlAuth = require('./controllers/authController')
const ctrlWorlds = require('./controllers/worldController')
const ctrlClimate = require('./controllers/articleContollers.js/climateController')
const ctrlGov = require('./controllers/articleContollers.js/govController')
const ctrlLang = require('./controllers/articleContollers.js/langController')
const ctrlMag = require('./controllers/articleContollers.js/magController')
const ctrlReligion = require('./controllers/articleContollers.js/religionController')
const ctrlTrade = require('./controllers/articleContollers.js/tradeController')
const ctrlMyth = require('./controllers/articleContollers.js/mythController')

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
app.delete('/api/worlds/climate/:worldid', ctrlClimate.deleteClimate)

//gov endpoints
app.get('/api/worlds/:worldid/gov', ctrlGov.getGov)
app.get('/api/worlds/gov:worldid', ctrlGov.getOneGov)
app.post('/api/worlds/:worldid/gov', ctrlGov.addGov)
app.delete('/api/worlds/gov:worldid', ctrlGov.deleteGov)

//lang endpoints
app.get('/api/worlds/:worldid/lang', ctrlLang.getLang)
app.get('/api/worlds/lang:worldid', ctrlLang.getOneLang)
app.post('/api/worlds/:worldid/lang', ctrlLang.addLang)
app.delete('/api/worlds/lang:worldid', ctrlLang.deleteLang)

//magic endpoints
app.get('/api/worlds/:worldid/mag', ctrlMag.getMag)
app.get('/api/worlds/mag:worldid', ctrlMag.getOneMag)
app.post('/api/worlds/:worldid/mag', ctrlMag.addMag)
app.delete('/api/worlds/mag:worldid', ctrlMag.deleteMag)

//religion endpoints
app.get('/api/worlds/:worldid/religion', ctrlReligion.getReligion)
app.get('/api/worlds/religion:worldid', ctrlReligion.getOneReligion)
app.post('/api/worlds/:worldid/religion', ctrlReligion.addReligion)
app.delete('/api/worlds/religion:worldid', ctrlReligion.deleteReligion)

//trade endpoints
app.get('/api/worlds/:worldid/trade', ctrlTrade.getTrade)
app.get('/api/worlds/trade:worldid', ctrlTrade.getOneTrade)
app.post('/api/worlds/:worldid/trade', ctrlTrade.addTrade)
app.delete('/api/worlds/trade:worldid', ctrlTrade.deleteTrade)

//myth endpoints
app.get('/api/worlds/:worldid/myth', ctrlMyth.getMyth)
app.get('/api/worlds/myth:worldid', ctrlMyth.getOneMyth)
app.post('/api/worlds/:worldid/myth', ctrlMyth.addMyth)
app.delete('/api/worlds/myth:worldid', ctrlMyth.deleteMyth)


//app listening
app.listen(SERVER_PORT, () => {
    console.log('Server Running! 👾')
})
