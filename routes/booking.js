var express = require('express');
var router = express.Router();

//import Controller Module
var booking_controller = require('../controllers/bookingController');

//List all bookings GET  #1
router.get('/', booking_controller.booking_list);

//Display booking crete form on GET #2.1
router.get('/create', booking_controller.booking_create_get);

//Handle booking crete form on POST #2.2
router.post('/create', booking_controller.booking_create_post);

//Display booking update form on GET #4.1
router.get('/:id/edit', booking_controller.booking_edit_get);

//Handle booking update form on PUT #4.2
router.put('/:id/edit', booking_controller.booking_edit_put);

//Display booking update form on DELETE #5
router.delete('/:id', booking_controller.booking_delete_delete);

//Display all bookings by customerID on GET #6
router.get('/customer/:id', booking_controller.booking_for_customer_get);

//Display all bookings by tableID on GET #7
router.get('/table/:id', booking_controller.booking_for_table_get);

//Display all bookings by date on GET #8
router.get('/date/:d', booking_controller.booking_for_date_get);

//Display all bookings by date & tableID on GET #9
router.get('/table/:id/date/:d', booking_controller.booking_for_table_date_get);

//Display details for a specefic booking #3 : Must come in end
router.get('/:id', booking_controller.booking_details);

module.exports = router;