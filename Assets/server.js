const express = require('express')
const app = express()
const PORT = process.env.PORT || '3000';
const cors = require('cors')
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const MongoClient = require('mongodb').MongoClient
app.use(cors())

var email = '';
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['Passportjs']
}));

// Initializaing Passport
app.use(passport.initialize());
app.use(passport.session());

// Using Google Strategy
passport.use(new GoogleStrategy({
    clientID: '719256991297-bu26jv3n5ntvs2h66afno1hl019orp7e.apps.googleusercontent.com',
    clientSecret: 'sEQLhEXmh1xg5J-vxrr0gGNO',
    callbackURL: "http://localhost:3000/google/callback/"
},
    // Function coming back with all profile information from google
    function (accessToken, refreshToken, profile, cb) {

        // To get the type of email address, profile._json.hd
        email = profile.emails[0].value;
        cb(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

//redirecting for google authentication
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// redirecting after google authentication
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/google' }), (req, res) => {
    console.log(email)
    res.redirect('/')
})

// Connecting to MongoDB, fetching data from MongoDB and sending data 
app.get('/', (req, res) => {
    MongoClient.connect('mongodb+srv://bitnik:Nikrinsan1$@impact-run.nf0h0.mongodb.net/<dbname>?retryWrites=true&w=majority', (err, client) => {
        var collection = client.db('Impact-Run').collection('Impact-Run');

        // Finding the details of person whose email address is authenticated by Google from DB
        collection.findOne({ Email_ID: email }, (err, result) => {
            res.send(result)
        })
    })
})

app.listen(PORT)
