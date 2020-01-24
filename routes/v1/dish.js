var express = require('express');
var router = express.Router();

//import Controller Module
var dish_controller = require('../../controllers/dishController');

//List all dishs GET  #1
router.get('/', dish_controller.dish_list);

//Display dish create form on GET #2.1
router.get('/create', dish_controller.dish_create_get);

//Handle dish create form on POST #2.2
router.post('/create', dish_controller.dish_create_post);

//Display dish update form on GET #4.1
router.get('/:id/edit', dish_controller.dish_edit_get);

//Handle dish update form on PUT #4.2
router.put('/:id', dish_controller.dish_edit_put);

//Display dish update form on DELETE #5
router.delete('/:id', dish_controller.dish_delete_delete);

//Display details for a specefic dish #3 : Must come in end
router.get('/:id', dish_controller.dish_details);

module.exports = router;