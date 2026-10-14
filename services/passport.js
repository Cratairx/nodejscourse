const passport = require('passport');
const GoogleStrategy =require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);

})
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);

    })
});


passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (acessToken, refreshToken, profile, done) =>{
        console.log('acessToken', acessToken);
        console.log('refresh token',refreshToken)
        console.log('profile', profile);
        User.findOne({googleId: profile.id})
            .then(existingUser => {
                if(existingUser){
                done(null, existingUser);
                }else {
                    new User({googleId: profile.id}).save().then(user => done(null, user));
                }
            })



    })
);