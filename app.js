var express          = require('express'),
    mongoose         = require('mongoose')

var app              = express()
var v1               = require('./routes/v1');

// app config
//mongo DB: 
// username: aayush
// password: aayush
//URL: mongodb+srv://aayush:<password>@cluster0-s6tov.mongodb.net/test?retryWrites=true&w=majority
var mongoDB = 'mongodb+srv://aayush:aayush@cluster0-s6tov.mongodb.net/local_library?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
//Get the default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Add more versioning here
app.use('/fooder/v1', v1);

// Listen to port 5000
app.listen(3000, function () {
    console.log("Mr Gusteau's, I love you 3000! -Remy");
  });
  