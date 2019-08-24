var express                  = require('express'),
    mongoose                 = require('mongoose'),
    passport                 = require('passport'),
    bodyParser               = require('body-parser'),
    localStrategy            = require('passport-local'),
    passportLocalMongoose    = require('passport-local-mongoose'),
    User                     = require('./models/user')

mongoose.connect('mongodb://localhost/authDemo');
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(require('express-session')({
    secret            : "The Secret Sentence ",
    resave            : false,
    saveUninitialized : false
}));
//configure passport 
app.use(passport.initialize());
app.use(passport.session());

//coming from passport-local-mongoose package
//responsible for reading, unencrypting, decrypting data from sessions

// DEF: serializeUser is used to store id of the user in the session,
// passport.serializeUser(User.serializeUser());
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
// DEF: deserializeUser is used to retrieve the user details of the user 
// by fetching the id from the session and then fetching the whole user details from DB
// passport.deserializeUser(User.deserializeUser());
passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
        cb(err, user);
    });
});

// =========================
// ROUTES
// =========================


app.get('/',(req,res)=>{
    res.render('home');
});
app.get('/secret', (req,res)=>{
    res.render('secret');
})
// AUTH ROUTES
//show the form
app.get('/register',(req,res)=>{
    res.render('register');
});
//handle registration
app.post('/register',(req,res)=>{
    //1st parameter: username(no password here because we don't store passwords in DB)
    //2nd parameter: password(to be stored as hash)
    //3rd parameter: callback function
    User.register( new User({username: req.body.username}), req.body.password, (err,user)=>{
        if(err){
            console.log(err);
            return res.render('/');
        }
        //you can change the strategy here('facebook','google','twitter')...
        passport.authenticate('local')(req,res,()=>{
            res.redirect('/secret');
        });
    });
});


app.listen(3000, ()=>{
    console.log('I love you 3000');
})