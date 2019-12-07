var express = require('express');
var router = express.Router();

//import Controller Module
var order_controller = require('../../controllers/orderController');

//List all orders GET  #1
router.get('/', order_controller.order_list);

//Display order crete form on GET #2.1
router.get('/create', order_controller.order_create_get);

//Handle order crete form on POST #2.2
router.post('/create', order_controller.order_create_post);

//Display order update form on GET #4.1
router.get('/:id/edit', order_controller.order_edit_get);

//Handle order update form on PUT #4.2
router.put('/:id/edit', order_controller.order_edit_put);

//Display order update form on DELETE #5
router.delete('/:id', order_controller.order_delete_delete);

//Display order cancellation form on GET #6.1
router.get('/:id/cancel', order_controller.order_cancellation_get);

//Handle order cancellation form on POST #6.2
router.post('/:id/cancel', order_controller.order_cancellation_post);

//Display details for a specefic order #3 : Must come in end
router.get('/:id', order_controller.order_details);

module.exports = router;