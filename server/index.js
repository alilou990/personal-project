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
const ctrlProf = require('./controllers/articleContollers.js/profController')

//middleware files
const authMiddleware = require('./controllers/middlewareController')

//setting up app
const app = express()

app.use( express.static( `${__dirname}/../build` ) );

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
app.post('/auth/logout', ctrlAuth.logout)

//world endpoints
app.get('/api/worlds', authMiddleware.usersOnly, ctrlWorlds.getWorlds)
app.get('/api/world/:id', authMiddleware.usersOnly, ctrlWorlds.getName)
app.post('/api/worlds/:id', authMiddleware.usersOnly, ctrlWorlds.addWorld)
// app.delete('/api/worlds/:worldid', ctrlWorlds.deleteWorld)
app.put('/api/worlds/:id', authMiddleware.usersOnly, ctrlWorlds.updateWorld)

//climate endpoints
app.get('/api/worlds/:id/climate', authMiddleware.usersOnly, ctrlClimate.getClimate)
app.get('/api/worlds/climate/:worldid', authMiddleware.usersOnly, ctrlClimate.getOneClimate)
app.post('/api/worlds/:worldid/climate', authMiddleware.usersOnly, ctrlClimate.addClimate)
app.delete('/api/worlds/climate/climatearticle/:id', authMiddleware.usersOnly, ctrlClimate.deleteClimate)
app.put('/api/worlds/climate/climatearticle/:id', authMiddleware.usersOnly, ctrlClimate.updateClimate)

//gov endpoints
app.get('/api/worlds/:worldid/gov', authMiddleware.usersOnly, ctrlGov.getGov)
app.get('/api/worlds/gov:worldid', authMiddleware.usersOnly, ctrlGov.getOneGov)
app.post('/api/worlds/:worldid/gov', authMiddleware.usersOnly, ctrlGov.addGov)
app.delete('/api/worlds/gov/govarticle/:id', authMiddleware.usersOnly, ctrlGov.deleteGov)
app.put('/api/worlds/gov/govarticle/:id', authMiddleware.usersOnly, ctrlGov.updateGov)

//lang endpoints
app.get('/api/worlds/:worldid/lang', authMiddleware.usersOnly, ctrlLang.getLang)
app.get('/api/worlds/lang:worldid', authMiddleware.usersOnly, ctrlLang.getOneLang)
app.post('/api/worlds/:worldid/lang', authMiddleware.usersOnly, ctrlLang.addLang)
app.delete('/api/worlds/lang/langarticle/:id', authMiddleware.usersOnly, ctrlLang.deleteLang)
app.put('/api/worlds/lang/langarticle/:id', authMiddleware.usersOnly, ctrlLang.updateLang)

//magic endpoints
app.get('/api/worlds/:worldid/mag', authMiddleware.usersOnly, ctrlMag.getMag)
app.get('/api/worlds/mag:worldid', authMiddleware.usersOnly, ctrlMag.getOneMag)
app.post('/api/worlds/:worldid/mag', authMiddleware.usersOnly, ctrlMag.addMag)
app.delete('/api/worlds/mag/magarticle/:id', authMiddleware.usersOnly, ctrlMag.deleteMag)
app.put('/api/worlds/mag/magarticle/:id', authMiddleware.usersOnly, ctrlMag.updateMag)

//religion endpoints
app.get('/api/worlds/:worldid/religion', authMiddleware.usersOnly, ctrlReligion.getReligion)
app.get('/api/worlds/religion:worldid', authMiddleware.usersOnly, ctrlReligion.getOneReligion)
app.post('/api/worlds/:worldid/religion', authMiddleware.usersOnly, ctrlReligion.addReligion)
app.delete('/api/worlds/religion/religionarticle/:id', authMiddleware.usersOnly, ctrlReligion.deleteReligion)
app.put('/api/worlds/religion/religionarticle/:id', authMiddleware.usersOnly, ctrlMag.updateMag)

//trade endpoints
app.get('/api/worlds/:worldid/trade', authMiddleware.usersOnly, ctrlTrade.getTrade)
app.get('/api/worlds/trade:worldid', authMiddleware.usersOnly, ctrlTrade.getOneTrade)
app.post('/api/worlds/:worldid/trade', authMiddleware.usersOnly, ctrlTrade.addTrade)
app.delete('/api/worlds/trade/tradearticle/:id', authMiddleware.usersOnly, ctrlTrade.deleteTrade)
app.put('/api/worlds/trade/tradearticle/:id', authMiddleware.usersOnly, ctrlTrade.updateTrade)

//myth endpoints
app.get('/api/worlds/:worldid/myth', authMiddleware.usersOnly, ctrlMyth.getMyth)
app.get('/api/worlds/myth:worldid', authMiddleware.usersOnly, ctrlMyth.getOneMyth)
app.post('/api/worlds/:worldid/myth', authMiddleware.usersOnly, ctrlMyth.addMyth)
app.delete('/api/worlds/myth/mytharticle/:id', authMiddleware.usersOnly, ctrlMyth.deleteMyth)
app.put('/api/worlds/myth/mytharticle/:id', authMiddleware.usersOnly, ctrlMyth.updateMyth)

//profession endpoints
app.get('/api/worlds/:profid/prof', authMiddleware.usersOnly, ctrlProf.getProf)
app.get('/api/worlds/prof:worldid', authMiddleware.usersOnly, ctrlProf.getOneProf)
app.post('/api/worlds/:worldid/prof', authMiddleware.usersOnly, ctrlProf.addProf)
app.delete('/api/worlds/prof/profarticle/:id', authMiddleware.usersOnly, ctrlProf.deleteProf)
app.put('/api/worlds/prof/profarticle/:id', authMiddleware.usersOnly, ctrlProf.updateProf)



//app listening
app.listen(SERVER_PORT, () => {
    console.log('Server Running! 👾')
})
