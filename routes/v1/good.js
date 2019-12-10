var express = require('express');
var router = express.Router();

//import Controller Module
var good_controller = require('../../controllers/goodController');

//List all goods GET  #1
router.get('/', good_controller.good_list);

//Display good create form on GET #2.1
router.get('/create', good_controller.good_create_get);

//Handle good create form on POST #2.2
router.post('/create', good_controller.good_create_post);

//Display good update form on GET #4.1
router.get('/:id/edit', good_controller.good_edit_get);

//Handle good update form on PUT #4.2
router.put('/:id/edit', good_controller.good_edit_put);

//Display good update form on DELETE #5
router.delete('/:id', good_controller.good_delete_delete);

//Display details for a specefic good #3 : Must come in end
router.get('/:id', good_controller.good_details);

module.exports = router;