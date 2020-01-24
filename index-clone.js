var express                 = require('express'),
    port                    = process.env.PORT || 3000;
    bodyParser              = require('body-parser'),
    app                     = express(),
    mongoose                = require('mongoose'),
    User                    = require('./models/User')
    Hotel                   = require('./models/hotel'),
    Comment                 = require('./models/comment'),
    seedDB                  = require('./seeds'),
    passport                = require('passport'),
    session                 = require('express-session'),
    configDB                = require('./config/database.js'),
    cookieParser            = require('cookie-parser'),
    flash                   = require('flash');



// mongoose.connect('mongodb://localhost/yelp_hotel');    
mongoose.connect('configDB.url');    
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname+ '/public'));
app.set('view engine','ejs');
seedDB();

//PASSPORT Configure
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());


//================================================Not in use
//================================================Not in use
app.use(require('express-session')({
    secret            : "The Secret Sentence ",
    resave            : false,
    saveUninitialized : false
}));
// var authStrategy = new PassportLocalStrategy({
// 	username: 'username',
// 	password: 'password'
// }, function(username, password, done) {
// 	User.authenticate(username, password, function(error, user){
// 		done(error, user, error ? { message: error.message } : null);
// 	});
// });

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));



var authSerializer = function(user, done) {
	done(null, user.id);
};

var authDeserializer = function(id, done) {
	User.findById(id, function(error, user) {
		done(error, user);
	});
};

// passport.use(authStrategy);
passport.serializeUser(authSerializer);
passport.deserializeUser(authDeserializer);

//================================================Not in use

// ==========================
//ROUTES
// ==========================
require('./app/routes.js')(app, passport);


app.get('/', (req,res)=>{ 
    res.render('home'); 
});
//INDEX
app.get('/hotels', (req,res)=>{
    Hotel.find({},(err, allHotels)=>{
        if(err){
            console.log(err);
        }else{
            res.render('hotels/index',{hotels: allHotels});
        }
    });
});
//NEW
app.post('/hotels', (req,res)=>{
    Hotel.create(req.body.hotel,(err, hotel)=>{
        if(err){
            console.log(err);
        }else{
            console.log('SUCCESSFULLY created entry', hotel);
        }
    });
    res.redirect('/hotels');
});
//order is important here!!!
//CREATE 
app.get('/hotels/new', (req,res)=>{
    res.render('hotels/new');
});
//SHOW
app.get('/hotels/:id',(req,res)=>{
    Hotel.findById(req.params.id).populate('comments').exec((err,found)=>{
        if(err){
            console.log(err);
        }else{
            res.render('hotels/show',{hotel: found});
            // console.log('added comments to: ',found);
        }
    });
});
// ============================
// COMMENTS ROUTES
// ============================
//CREATE
app.get('/hotels/:id/comments/new',(req,res)=>{
    Hotel.findById(req.params.id, (err, hotel)=>{
        if(err){
            console.log(err);
        }else{
            res.render('comments/new', {hotel: hotel});
        }
    });
});
//NEW
app.post('/hotels/:id/comments',(req,res)=>{
    //lookup for hotel using id
    //create new comment
    //connect comment to hotel
    //redirect to show page
    Hotel.findById(req.params.id, (err, hotel)=>{
        if(err){
            console.log(err);
            res.redirect('/hotels/'+req.params.id);
        }else{
            Comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    console.log(err);
                }else{
                    hotel.comments.push(comment);
                    hotel.save();
                    console.log('Created comment!',comment);
                    res.redirect('/hotels/' + hotel._id);
                }
            });
        }
    });
});

//============================
// AUTH ROUTES
//============================
//REGISTER
app.get('/register',(req,res)=>{
    res.render('auth/register');
});
//SIGN-UP
app.post('/register',(req,res)=>{
    //1st parameter: username(no password here because we don't store passwords in DB)
    //2nd parameter: password(to be stored as hash)
    //3rd parameter: callback function
    var newUser = new User({username: req.body.username});
    User.register( newUser, req.body.password, (err,user)=>{
        if(err){
            console.log(err);
            return res.render('auth/register');
        }
        //you can change the strategy here('facebook','google','twitter')...
        passport.authenticate('local')(req,res,()=>{
            res.redirect('/hotels');
        });
    });
});
//LOGIN
app.get('/login',(req,res)=>{
    res.render('auth/login');
});
app.post('/login',passport.authenticate('local',{
    successRedirect: '/hotels',
    failureRedirect: '/login'
}),(req,res)=>{});

app.listen(port,()=>{
    console.log('I love you 3000');
});