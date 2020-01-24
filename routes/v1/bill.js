var express = require('express');
var router = express.Router();

//import Controller Module
var bill_controller = require('../../controllers/billController');

//List all bills GET  #1
router.get('/', bill_controller.bill_list);

//Display bill create form on GET #2.1
router.get('/create', bill_controller.bill_create_get);

//Handle bill create form on POST #2.2
router.post('/create', bill_controller.bill_create_post);

//Display bill update form on GET #4.1
router.get('/:id/edit', bill_controller.bill_edit_get);

//Handle bill update form on PUT #4.2 ::only authorised person can do this(not customer)
router.put('/:id', bill_controller.bill_edit_put);

//Display bill update form on DELETE #5
router.delete('/:id', bill_controller.bill_delete_delete);

//Display details for a specefic bill #3 : Must come in end
router.get('/:id', bill_controller.bill_details);

module.exports = router;