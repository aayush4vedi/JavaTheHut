var express = require('express');
var router = express.Router();

//import Controller Module
var dishInstance_controller = require('../../controllers/dishInstanceController');

//List all dishInstances GET  #1
router.get('/', dishInstance_controller.dishInstance_list);

//Display dishInstance create form on GET #2.1
router.get('/create', dishInstance_controller.dishInstance_create_get);

//Handle dishInstance create form on POST #2.2
router.post('/create', dishInstance_controller.dishInstance_create_post);

//Display dishInstance update form on GET #4.1
router.get('/:id/edit', dishInstance_controller.dishInstance_edit_get);

//Handle dishInstance update form on PUT #4.2
router.put('/:id', dishInstance_controller.dishInstance_edit_put);

//Display dishInstance update form on DELETE #5
router.delete('/:id', dishInstance_controller.dishInstance_delete_delete);

//Display details for a specefic dishInstance #3 : Must come in end
router.get('/:id', dishInstance_controller.dishInstance_details);

module.exports = router;