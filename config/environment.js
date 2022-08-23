const development = {
    name : "development",
    assetpath : './assets',
    session_key :'blahsomething',
    dbname : "social_media",
    smtp : {
        host :'smtp.gmail.com',
        port: 587,
        service : "gmail",
        auth : {
            user : "connector.socialmedia27@gmail.com",
            pass : "rgbkympjuguluqpw"
        }
    },
    google_clientID :"127992776020-cu4dfl4omtcrnefgh8oska1vrktj9bsu.apps.googleusercontent.com",
    google_clientSecret : "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",
    google_callbackURL : "http://localhost:8000/users/auth/google/callback",
    JWTsecret : 'codeial',
   
}
const production = {
    name : "production",
    assetpath : "./assets",//process.env.CONNECTOR_ASSET_PATH
    session_key :process.env.CONNECTOR_SESSION_KEY,
    dbname : process.env.CONNECTOR_DBNAME,
    smtp : {
        host :process.env.CONNECTOR_SMTP_HOST,
        port: process.env.CONNECTOR_SMTP_PORT,
        service :process.env.CONNECTOR_SMTP_SERVICE,
        auth : {
            user : process.env.CONNECTOR_AUTH_USER,
            pass : process.env.CONNECTOR_AUTH_PASS,
        }
    },
    google_clientID :process.env.CONNECTOR_GOOGLE_CLIENTID,
    google_clientSecret : process.env.CONNECTOR_GOOGLE_CLIENTSECRET,
    google_callbackURL : "http://localhost:8000/users/auth/google/callback",
    JWTsecret : process.env.CONNECTOR_JWT_SECRET,
}
module.exports = production;