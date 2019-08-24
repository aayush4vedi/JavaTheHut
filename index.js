var express                  = require('express'),
    mongoose                 = require('mongoose'),
    passport                 = require('passport'),
    bodyParser               = require('body-parser'),
    localStrategy            = require('passport-local'),
    passportLocalMongoose    = require('passport-local-mongoose'),
    User                     = require('./models/user')

mongoose.connect('mongodb://localhost/auth_demo')  

var app = express();
app.set('view engine', 'ejs');

app.use(require('express-session')({
    secret            : "The Secret Sentence ",
    resave            : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.render('home');
});
app.get('/secret', (req,res)=>{
    res.render('secret');
})



app.listen(3000, ()=>{
    console.log('I love you 3000');
})