const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./secrets');
const User = require('../auth/auth-model');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {

    User.findById(user.id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/api/auth/login/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // console.log(profile)
        // check if user already exists in our own db
        // console.log(profile.id)
        User.findBy({googleid: profile.id}).then((currentUser) => {
            if(currentUser && currentUser.googleid !== null){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                User.add({
                    googleid: profile.id,
                    username: profile.id + ' google',
                    // thumbnail: profile._json.image.url
                }).then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser[0]);
                });
            }
        });
    })
);

passport.use(
    new LinkedInStrategy({
        // options for linkedin strategy
        clientID: keys.linkedin.clientID,
        clientSecret: keys.linkedin.clientSecret,
        callbackURL: '/api/auth/login/linkedin/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        // check if user already exists in our own db
        console.log(profile.id)
        User.findBy({linkedinid: profile.id}).then((currentUser) => {
            if(currentUser && currentUser.linkedinid !== null){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                User.add({
                    linkedinid: profile.id,
                    username: profile.id + ' linkedin',
                    // thumbnail: profile._json.image.url
                }).then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser[0]);
                });
            }
        });
    })

);

passport.use(
    new FacebookStrategy({
        // options for facebook strategy
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: '/api/auth/login/facebook/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        // check if user already exists in our own db
        console.log(profile.id)
        User.findBy({facebookid: profile.id}).then((currentUser) => {
            if(currentUser && currentUser.facebookid !== null){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                User.add({
                    facebookid: profile.id,
                    username: profile.id + ' facebook',
                    // thumbnail: profile._json.image.url
                }).then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser[0]);
                });
            }
        });
    })

);



