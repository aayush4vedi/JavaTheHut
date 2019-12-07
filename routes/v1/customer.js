var express = require('express');
var router = express.Router();

//import Controller Module
var customer_controller = require('../../controllers/customerController');

//List all customers GET  #1
router.get('/', customer_controller.customer_list);

//Display customer crete form on GET #2.1
router.get('/create', customer_controller.customer_create_get);

//Handle customer crete form on POST #2.2
router.post('/create', customer_controller.customer_create_post);

//Display customer update form on GET #4.1
router.get('/:id/edit', customer_controller.customer_edit_get);

//Handle customer update form on PUT #4.2
router.put('/:id/edit', customer_controller.customer_edit_put);

//Display customer update form on DELETE #5
router.delete('/:id', customer_controller.customer_delete_delete);

//Display details for a specefic customer #3 : Must come in end
router.get('/:id', customer_controller.customer_details);

module.exports = router;