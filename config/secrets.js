module.exports = {
    google: {
        clientID: '848625684492-ddeinkfdo6645a09qmcvcn2pqrqno2kl.apps.googleusercontent.com',
        clientSecret: 'f8OmcYvLY7L_6JibnqVqJMX5'
    },
    linkedin:{
        clientID: '86xtttjji2tq3z',
        clientSecret: 'LKWH6TRCb9pGewls'
    },
    facebook:{
        clientID: '793280011118644',
        clientSecret: '68fee10e131443aac7b4bfd9985a74bb'
    },
    session: {
        cookieKey: 'keep it trill'
    },
    jwtSecret: process.env.JWT_SECRET || 'Who calls a secret a secret'
}