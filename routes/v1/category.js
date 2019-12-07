var express = require('express');
var router = express.Router();

//import Controller Module
var category_controller = require('../../controllers/categoryController');

//List all categorys GET  #1
router.get('/', category_controller.category_list);

//Display category crete form on GET #2.1
router.get('/create', category_controller.category_create_get);

//Handle category crete form on POST #2.2
router.post('/create', category_controller.category_create_post);

//Display category update form on GET #4.1
router.get('/:id/edit', category_controller.category_edit_get);

//Handle category update form on PUT #4.2
router.put('/:id/edit', category_controller.category_edit_put);

//Display category update form on DELETE #5
router.delete('/:id', category_controller.category_delete_delete);

//Display details for a specefic category #3 : Must come in end
router.get('/:id', category_controller.category_details);

module.exports = router;