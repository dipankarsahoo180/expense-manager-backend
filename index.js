const {PORT,BACKEND_URL,FRONTEND_URL}  = require('./src/config')
const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const alloweOrigins = [FRONTEND_URL,'http://localhost:300']
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors({origin:alloweOrigins}))
// const {SF_CLIENT_ID,SF_CLIENT_SECRET,SF_LOGIN_URL,SF_USER_NAME,SF_PASSWORD,SF_SECURITY_TOKEN,PORT,BACKEND_URL}  = require('./src/config')
const authController = require('./src/controllers/authController')
const expenseController = require('./src/controllers/expenseController')
// var jsforce = require('jsforce');
// var conn = new jsforce.Connection({
//     loginUrl:SF_LOGIN_URL
// });


app.listen(PORT,()=>{
    console.log(`server is running on ${BACKEND_URL} ${PORT}`)
})

app.get('/',async(req,res)=>{
    // await conn.login(SF_USER_NAME, SF_PASSWORD+SF_SECURITY_TOKEN, function(err, res) {
    //     if (err) { return console.error(err); }
    //     conn.query('SELECT Id, Name FROM Account', function(err, res) {
    //       if (err) { return console.error(err); }
    //       //console.log(res);
    //     });
    //   });
    res.send('<h1>Congrats</h1>')
})

app.use('/oauth2',authController)
app.use('/expenses',expenseController)