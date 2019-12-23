var express = require('express');
var router = express.Router();

//import Controller Module
var hall_controller = require('../../controllers/hallController');

//List all halls GET  #1
router.get('/', hall_controller.hall_list);

//Display hall create form on GET #2.1
router.get('/create', hall_controller.hall_create_get);

//Handle hall create form on POST #2.2
router.post('/create', hall_controller.hall_create_post);

//Display hall update form on GET #4.1
router.get('/:id/edit', hall_controller.hall_edit_get);

//Handle hall update form on PUT #4.2
router.put('/:id', hall_controller.hall_edit_put);

//Display hall update form on DELETE #5
router.delete('/:id', hall_controller.hall_delete_delete);

//Display details for a specefic hall #3 : Must come in end
router.get('/:id', hall_controller.hall_details);

module.exports = router;