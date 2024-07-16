//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const md5 = require('md5');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'Rolling Thunder Again',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT;
const uri = process.env.DB_URI;

mongoose.connect(uri).then(()=>{
    console.log("connection successfull.");
}).catch((err)=>console.log(err));

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);


passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username: username}).then((user)=>{
            if(!user){
                return done(null, false, {message: 'Incorrect username'});
            }
            if(!md5(user.password) === md5(password)){
                return done(null, false, {message: 'Incorrect password'});
            }
            return done(null, user);
        }).catch((err)=>{
            return done(err)
        });
    }
  ));

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", function(req, res){
    res.render('home');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
);

app.get('/auth/google/secrets', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect secrets.
      res.redirect('/secrets');
    });

app.get('/register', function(req, res){
    res.render('register');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/secrets', function(req, res){
    if(req.isAuthenticated()){
        res.render('secrets');
    }else{
        res.redirect('/login');
    }
})

app.get('/logout', function(req, res, next){
    req.logout(function(err){
        if(err)return next(err);
        res.redirect('/');
    });
})

app.post('/register', function(req, res,){
    User.findOne({username: req.body.username}).then((user)=>{
        if(user){
           res.redirect('/login'); 
        }
        if(!user){
            const newUser = new User({
                username: req.body.username,
                password: md5(req.body.password)
            });
            newUser.save();
            res.redirect('/login');
        }
    }).catch((err)=>{
        console.log(err);
    })
});

app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/secrets');
    }
);

app.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

app.listen(port, function(){
    console.log("server up and running on http://localhost:3000");
});