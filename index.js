var express                 = require('express'),
    bodyParser              = require('body-parser'),
    app                     = express(),
    mongoose                = require('mongoose'),
    User                    = require('./models/User')
    Hotel                   = require('./models/hotel'),
    Comment                 = require('./models/comment'),
    seedDB                  = require('./seeds'),
    passport                = require('passport'),
    PassportLocalStrategy   = require('passport-local')

mongoose.connect('mongodb://localhost/yelp_hotel');    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+ '/public'));
app.set('view engine','ejs');
seedDB();

//PASSPORT Configure
app.use(require('express-session')({
    secret            : "The Secret Sentence ",
    resave            : false,
    saveUninitialized : false
}));
var authStrategy = new PassportLocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
}, function(username, password, done) {
	User.authenticate(username, password, function(error, user){
		done(error, user, error ? { message: error.message } : null);
	});
});

var authSerializer = function(user, done) {
	done(null, user.id);
};

var authDeserializer = function(id, done) {
	User.findById(id, function(error, user) {
		done(error, user);
	});
};

passport.use(authStrategy);
passport.serializeUser(authSerializer);
passport.deserializeUser(authDeserializer);

app.use(passport.initialize());

// ==========================
//ROUTES
// ==========================

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
    res.render('register');
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
            return res.render('register');
        }
        //you can change the strategy here('facebook','google','twitter')...
        passport.authenticate('local')(req,res,()=>{
            res.redirect('/hotels');
        });
    });
});

app.listen(3000,()=>{
    console.log('I love you 3000');
});