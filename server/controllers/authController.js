const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    //body info
     const {username, password} = req.body;
     //db instance
     const db = req.app.get('db');
    //  console.log('db', db)
    //  look for an existing user with that username
     const foundUser = await db.auth.find_user([username])
        if (foundUser[0]){
            return res.status(409).send("Sorry, that username is already taken!")
        }
    //  create salt and hash for the password
     const salt = bcrypt.genSaltSync(15);
     const hash = bcrypt.hashSync(password, salt);
     //resgister the user
     newUser = await db.auth.register_user([username, hash, profile_pic])
             res.status(200).send(newUser[0])
     //store user info on the session
     req.session.userid = {...newUser[0]};
     return res.status(200).send(req.session.userid);
 
 }

 const login = async (req, res) => {
     //body info
     const {username, password} = req.body;
     //db instance
     const db = req.app.get('db');
     //find user with username
    const foundUser = await db.auth.find_user([username]);
    //check to see length of users
    if(!foundUser[0]){
        return res.status(403).send('Sorre, invalid credentials, try again!');
    };
    //see if the user is authed
    const authedPassword = bcrypt.compareSync(password, foundUser[0].password);
    if(authedPassword){
        //remove password
        delete foundUser[0].password
        //store user onto session
        req.session.userid = foundUser[0]
        res.status(200).send(req.session.userid)
    } else {
        res.status(401).send('Invalid password')
    }
 }

 const logout = (req, res) => {
     req.session.destroy()
     res.sendStatus(200)
 }

module.exports = {
    register,
    login,
    logout
}