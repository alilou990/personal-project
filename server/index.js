require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const massive = require('massive')
const aws = require('aws-sdk')

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
app.post('/auth/logout', ctrlAuth.logout)

//world endpoints
app.get('/api/worlds', ctrlWorlds.getWorlds)
app.get('/api/world/:id', ctrlWorlds.getName)
app.post('/api/worlds/:id', ctrlWorlds.addWorld)
// app.delete('/api/worlds/:worldid', ctrlWorlds.deleteWorld)
app.put('/api/worlds/:id', ctrlWorlds.updateWorld)

//climate endpoints
app.get('/api/worlds/:id/climate', ctrlClimate.getClimate)
app.get('/api/worlds/climate/:worldid', ctrlClimate.getOneClimate)
app.post('/api/worlds/:worldid/climate', ctrlClimate.addClimate)
app.delete('/api/worlds/climate/climatearticle/:id', ctrlClimate.deleteClimate)
app.put('/api/worlds/climate/climatearticle/:id', ctrlClimate.updateClimate)

//gov endpoints
app.get('/api/worlds/:worldid/gov', ctrlGov.getGov)
app.get('/api/worlds/gov:worldid', ctrlGov.getOneGov)
app.post('/api/worlds/:worldid/gov', ctrlGov.addGov)
app.delete('/api/worlds/gov/govarticle/:id', ctrlGov.deleteGov)
app.put('/api/worlds/gov/govarticle/:id', ctrlGov.updateGov)

//lang endpoints
app.get('/api/worlds/:worldid/lang', ctrlLang.getLang)
app.get('/api/worlds/lang:worldid', ctrlLang.getOneLang)
app.post('/api/worlds/:worldid/lang', ctrlLang.addLang)
app.delete('/api/worlds/lang/langarticle/:id', ctrlLang.deleteLang)
app.put('/api/worlds/lang/langarticle/:id', ctrlLang.updateLang)

//magic endpoints
app.get('/api/worlds/:worldid/mag', ctrlMag.getMag)
app.get('/api/worlds/mag:worldid', ctrlMag.getOneMag)
app.post('/api/worlds/:worldid/mag', ctrlMag.addMag)
app.delete('/api/worlds/mag/magarticle/:id', ctrlMag.deleteMag)
app.put('/api/worlds/mag/magarticle/:id', ctrlMag.updateMag)

//religion endpoints
app.get('/api/worlds/:worldid/religion', ctrlReligion.getReligion)
app.get('/api/worlds/religion:worldid', ctrlReligion.getOneReligion)
app.post('/api/worlds/:worldid/religion', ctrlReligion.addReligion)
app.delete('/api/worlds/religion/religionarticle/:id', ctrlReligion.deleteReligion)
app.put('/api/worlds/religion/religionarticle/:id', ctrlMag.updateMag)

//trade endpoints
app.get('/api/worlds/:worldid/trade', ctrlTrade.getTrade)
app.get('/api/worlds/trade:worldid', ctrlTrade.getOneTrade)
app.post('/api/worlds/:worldid/trade', ctrlTrade.addTrade)
app.delete('/api/worlds/trade/tradearticle/:id', ctrlTrade.deleteTrade)
app.put('/api/worlds/trade/tradearticle/:id', ctrlTrade.updateTrade)

//myth endpoints
app.get('/api/worlds/:worldid/myth', ctrlMyth.getMyth)
app.get('/api/worlds/myth:worldid', ctrlMyth.getOneMyth)
app.post('/api/worlds/:worldid/myth', ctrlMyth.addMyth)
app.delete('/api/worlds/myth/mytharticle/:id', ctrlMyth.deleteMyth)
app.put('/api/worlds/myth/mytharticle/:id', ctrlMyth.updateMyth)

//profession endpoints
app.get('/api/worlds/:profid/prof', ctrlProf.getProf)
app.get('/api/worlds/prof:worldid', ctrlProf.getOneProf)
app.post('/api/worlds/:worldid/prof', ctrlProf.addProf)
app.delete('/api/worlds/prof/profarticle/:id', ctrlProf.deleteProf)
app.put('/api/worlds/prof/profarticle/:id', ctrlProf.updateProf)

//aws s3 endpoint
app.get('/sign-s3', (req, res) => {

    aws.config = {
      region: 'us-west-1',
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
    
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
  
    s3.getSignedUrl('putObject', s3Params, (error, data) => {
      if(error){
        console.log(error);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
  
      return res.send(returnData)
    });
  });


//app listening
app.listen(SERVER_PORT, () => {
    console.log('Server Running! 👾')
})
