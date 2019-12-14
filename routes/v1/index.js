var express          = require('express')
var router           = express.Router();

// var v1 = router; 

// Import Routes
var employeeRouter      = require('./employee');
var cookRouter          = require('./cook');
var waiterRouter        = require('./waiter');
var tableRouter         = require('./table');
var tableInstanceRouter = require('./tableInstance');
var hallRouter          = require('./hall');
var restaurantRouter    = require('./restaurant');
var customerRouter      = require('./customer');
var bookingRouter       = require('./booking');
var dishRouter          = require('./dish');
var dishInstanceRouter  = require('./dishInstance');
var categoryRouter      = require('./category');
var orderRouter         = require('./order');
var dineRouter          = require('./dine');
var billRouter          = require('./bill');
var goodRouter          = require('./good');


//Add routes to middleware chain
router.use('/employee', employeeRouter);
router.use('/cook', cookRouter);
router.use('/waiter', waiterRouter);
router.use('/table', tableRouter);
router.use('/tableinstance', tableInstanceRouter);
router.use('/hall', hallRouter);
router.use('/restaurant', restaurantRouter);
router.use('/customer', customerRouter);
router.use('/booking', bookingRouter);
router.use('/dish', dishRouter);
router.use('/dishinstance', dishInstanceRouter);
router.use('/category', categoryRouter);
router.use('/order', orderRouter);
router.use('/dine', dineRouter);
router.use('/bill', billRouter);
router.use('/good', goodRouter);

module.exports = router;


