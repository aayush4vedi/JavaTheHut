var express = require('express');
var router = express.Router();

//import Controller Module
var restaurant_controller = require('../../controllers/restaurantController');

//List all restaurants GET  #1
router.get('/', restaurant_controller.restaurant_list);

//Display restaurant create form on GET #2.1
router.get('/create', restaurant_controller.restaurant_create_get);

//Handle restaurant create form on POST #2.2
router.post('/create', restaurant_controller.restaurant_create_post);

//Display restaurant update form on GET #4.1
router.get('/:id/edit', restaurant_controller.restaurant_edit_get);

//Handle restaurant update form on PUT #4.2
router.put('/:id', restaurant_controller.restaurant_edit_put);

//Display restaurant update form on DELETE #5
router.delete('/:id', restaurant_controller.restaurant_delete_delete);

//Display details for a specefic restaurant #3 : Must come in end
router.get('/:id', restaurant_controller.restaurant_details);

module.exports = router;