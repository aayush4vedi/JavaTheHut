var app = express();

var v1 = require('./routes/v1');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Add more versioning here
app.use('/fooder/v1', v1);

// Listen to port 5000
app.listen(3000, function () {
    console.log("Mr Gusteau's, I love you 3000! -Remy");
  });
  