var express        = require('express'),
    app            = express(),
    port           = process.env.PORT || 3000,
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    flash          = require('connect-flash'),   
    morgan         = require('morgan'),
    cookieParser   = require('cookie-parser'),
    bodyParser     = require('body-parser'),
    session        = require('express-session'),    
    configDB       = require('./config/database.js'),
    User           = require('./models/User')
    Hotel          = require('./models/hotel'),
    Comment        = require('./models/comment'),
    seedDB         = require('./seeds'),


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use((req,res,next)=>{
    res.locals.currUser = req.user;
    next();
})
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
app.get('/hotels/:id/comments/new',isLoggedIn,(req,res)=>{
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
app.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/hotels', // redirect to the secure profile section
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));
//LOGIN
app.get('/login',(req,res)=>{
    res.render('auth/login');
});
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/hotels', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));
//LOGOUT
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// ROUTE MIDDLEWARE to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}


// launch ======================================================================
app.listen(port,()=>{
    console.log('I love you 3000');
});