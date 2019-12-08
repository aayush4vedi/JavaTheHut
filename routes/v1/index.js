var express          = require('express')
var router = express.Router();

var v1 = router; 

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
var dineRouter = require('./dine');
var billRouter = require('./bill');
var goodRouter = require('./good');


//Add routes to middleware chain
v1.use('/employee', employeeRouter);
v1.use('/table', tableRouter);
v1.use('/hall', hallRouter);
v1.use('/restaurant', restaurantRouter);
v1.use('/customer', customerRouter);
v1.use('/booking', bookingRouter);
v1.use('/dish', dishRouter);
v1.use('/category', categoryRouter);
v1.use('/order', orderRouter);
v1.use('/dine', dineRouter);
v1.use('/bill', billRouter);
v1.use('/good', goodRouter);

module.exports = {
  v1
}

// Listen to port 5000
app.listen(3000, function () {
  console.log("Mr Gusteau's, I love you 3000! -Remy");
});
