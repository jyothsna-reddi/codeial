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
    name : "production"
}
module.exports = development