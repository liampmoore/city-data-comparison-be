module.exports = {
    google: {
        clientID: process.env.GOOGLE_CLIENT,
        clientSecret: process.env.GOOGLE_SECRET
    },
    linkedin:{
        clientID: process.env.LINKEDIN_CLIENT,
        clientSecret: process.env.LINKEDIN_SECRET
    },
    facebook:{
        clientID: process.env.FACEBOOK_CLIENT,
        clientSecret: process.env.FACEBOOK_SECRET
    },
    session: {
        cookieKey: process.env.SESSION_COOKIE_KEY
    },
    jwtSecret: process.env.JWT_SECRET || process.env.SECRET_MESSAGE
}