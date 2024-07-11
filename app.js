//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const md5 = require('md5');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT;
const uri = process.env.DB_URI;

mongoose.connect(uri).then(()=>{
    console.log("connection successfull.");
}).catch((err)=>console.log(err));

const userSchema = new mongoose.Schema({
    userName: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.get("/", function(req, res){
    res.render('home');
});

app.get('/register', function(req, res){
    res.render('register');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/register', function(req, res){
    const newUser = new User({
        userName: req.body.username,
        password: md5(req.body.password)
    })
    newUser.save();
    res.render('login');
});

app.post('/login', function(req, res){
    const username = req.body.username;
    const password = md5(req.body.password);
    User.findOne({userName: username}).then((foundUser)=>{
        if(foundUser.password === password){
            res.render('secrets');
        }else{
            alert("incorrect login details");
        }
    }).catch((err)=>console.log(err));
});

app.listen(port, function(){
    console.log("server up and running on http://localhost:3000");
});