var express = require('express');
var router = express.Router();

//import Controller Module
var dine_controller = require('../../controllers/dineController');

//List all dines GET  #1
router.get('/', dine_controller.dine_list);

//Display dine create form on GET #2.1
router.get('/create', dine_controller.dine_create_get);

//Handle dine create form on POST #2.2
router.post('/create', dine_controller.dine_create_post);

//Display dine update form on GET #4.1
router.get('/:id/edit', dine_controller.dine_edit_get);

//Handle dine update form on PUT #4.2
router.put('/:id', dine_controller.dine_edit_put);

//Display dine update form on DELETE #5
router.delete('/:id', dine_controller.dine_delete_delete);

//Display dine order update form on GET #6.1
router.get('/:id/orderupdate', dine_controller.dine_new_order_get);

//Handle dine order update form on POST #6.2
router.post('/:id/orderupdate', dine_controller.dine_order_update);

//Display details for a specefic dine #3 : Must come in end
router.get('/:id', dine_controller.dine_details);

module.exports = router;