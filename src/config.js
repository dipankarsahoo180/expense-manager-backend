require('dotenv').config()
module.exports={
    SF_CLIENT_ID:process.env.SF_CLIENT_ID,
    SF_CLIENT_SECRET:process.env.SF_CLIENT_SECRET,
    SF_LOGIN_URL:process.env.SF_LOGIN_URL,
    SF_REDIRECT_URL:process.env.SF_REDIRECT_URL,
    SF_USER_NAME:process.env.SF_USER_NAME,
    SF_PASSWORD:process.env.SF_PASSWORD,
    SF_SECURITY_TOKEN:process.env.SF_SECURITY_TOKEN,
    PORT: process.env.PORT,
    BACKEND_URL :process.env.BACKEND_URL,
    FRONTEND_URL :process.env.FRONTEND_URL,
}