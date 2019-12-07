var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Import Routes
var employeeRouter = require('./employee');
var tableRouter = require('./table');
var hallRouter = require('./hall');
var restaurantRouter = require('./restaurant');
var customerRouter = require('./customer');
var bookingRouter = require('./booking');
var dishRouter = require('./dish');
var categoryRouter = require('./category');
var orderRouter = require('./order');
var billRouter = require('./bill');
var goodRouter = require('./good');
var xRouter = require('./x');
var xRouter = require('./x');


//Add routes to middleware chain
app.use('/employee', employeeRouter);
app.use('/table', tableRouter);
app.use('/hall', hallRouter);
app.use('/restaurant', restaurantRouter);
app.use('/customer', customerRouter);
app.use('/booking', bookingRouter);
app.use('/dish', dishRouter);
app.use('/category', categoryRouter);
app.use('/order', orderRouter);
app.use('/bill', billRouter);
app.use('/good', goodRouter);
app.use('/x', xRouter);
app.use('/x', xRouter);

// Listen to port 5000
app.listen(3000, function () {
  console.log('Mr Gustau, I love you 3000! -Remy');
});
