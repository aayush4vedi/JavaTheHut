var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Import Routes
var employeeRouter = require('./employee');


//Add routes to middleware chain
app.use('/employee', employeeRouter);

// Listen to port 5000
app.listen(3000, function () {
  console.log('Mr Gustau, I love you 3000! -Remy');
});
