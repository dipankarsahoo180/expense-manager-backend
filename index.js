const express = require('express')
const app = express();
const {PORT,SERVER_URL}  = require('./src/config')
// const {SF_CLIENT_ID,SF_CLIENT_SECRET,SF_LOGIN_URL,SF_USER_NAME,SF_PASSWORD,SF_SECURITY_TOKEN,PORT,SERVER_URL}  = require('./src/config')
const authController = require('./src/controllers/authController')
// var jsforce = require('jsforce');
// var conn = new jsforce.Connection({
//     loginUrl:SF_LOGIN_URL
// });


app.listen(PORT,()=>{
    console.log(`server is running on ${SERVER_URL}`)
})

app.get('/',async(req,res)=>{
    // await conn.login(SF_USER_NAME, SF_PASSWORD+SF_SECURITY_TOKEN, function(err, res) {
    //     if (err) { return console.error(err); }
    //     conn.query('SELECT Id, Name FROM Account', function(err, res) {
    //       if (err) { return console.error(err); }
    //       console.log(res);
    //     });
    //   });
    res.send('<h1>Congrats</h1>')
})

app.use('/oauth',authController)