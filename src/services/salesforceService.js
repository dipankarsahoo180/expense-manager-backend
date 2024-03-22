

const {SF_CLIENT_ID,SF_CLIENT_SECRET,SF_LOGIN_URL,SF_REDIRECT_URL,FRONTEND_URL}  = require('../config')

const LocalStorage = require('node-localstorage').LocalStorage
const lcStorage = new LocalStorage('./info')

var jsforce = require('jsforce');
// OAuth2 client information can be shared with multiple connections.
var oauth2 = new jsforce.OAuth2({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl : SF_LOGIN_URL,
  clientId : SF_CLIENT_ID,
  clientSecret : SF_CLIENT_SECRET,
  redirectUri : SF_REDIRECT_URL
});

const login = (req,res) => {
  res.redirect(oauth2.getAuthorizationUrl({ scope : 'full' }));
};

const callback = (req,res) => {
    const {code} = req.query;
    console.log('authorization code is',code)
    if(!code){
        console.error("Failed to get authorization code from server callback")
        return res.status(500).send("Failed to get authorization code from server callback")
    }
    // console.log("code", code)
    const conn = new jsforce.Connection({oauth2:oauth2})
    conn.authorize(code, function(err){
        if(err){
            console.error(err);
            return res.status(500).send(err)
        }
        console.log("Access token", conn.accessToken)
        console.log("Connection", conn)
        console.log("Instance url", conn.instanceUrl)
        lcStorage.setItem('accessToken', conn.accessToken || '')
        lcStorage.setItem('instanceUrl', conn.instanceUrl || '')
        res.redirect(FRONTEND_URL)
    })
}

// Function to Create Connection 
const createConnection = (res) =>{
    let instanceUrl = lcStorage.getItem('instanceUrl')
    let accessToken = lcStorage.getItem('accessToken')
    if(!accessToken){
        return res.status(200).send({})
    }
    return new jsforce.Connection({
        accessToken,
        instanceUrl
    })
}
//Function to get logged-in user details
const whoAmI =(req, res)=>{
    const conn = createConnection(res)
    conn.identity((error,data)=>{
        if(error){
            //do error handling
            handleSalesforceError(error, res)
            return
        }
        res.json(data)
    })
}

//Function to log out user 
const logout =(req, res)=>{
    const conn = createConnection(res);
    conn.logout();
    console.log('logout successful')
    lcStorage.clear();
    res.redirect(`${FRONTEND_URL}/login`)
}

//Centralized error handler function

const handleSalesforceError = (error, res)=>{
    // console.log("error statusCode", JSON.stringify(error))
    if(error.errorCode === 'INVALID_SESSION_ID'){
        lcStorage.clear()
        res.status(200).send({})
    } else{
        console.error("Error", error)
        res.status(500).send(error)
    }
}


module.exports = {login,callback,whoAmI,logout}