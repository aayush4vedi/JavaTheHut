var express = require('express');
var router = express.Router();

//import Controller Module
var table_controller = require('../../controllers/tableController');

//List all tables GET  #1
router.get('/', table_controller.table_list);

//Display table create form on GET #2.1
router.get('/create', table_controller.table_create_get);

//Handle table create form on POST #2.2
router.post('/create', table_controller.table_create_post);

//Display table update form on GET #4.1
router.get('/:id/edit', table_controller.table_edit_get);

//Handle table update form on PUT #4.2
router.put('/:id/edit', table_controller.table_edit_put);

//Display table update form on DELETE #5
router.delete('/:id', table_controller.table_delete_delete);

//Display table coordinates GET #6
router.get('/:id/location', table_controller.table_location_get);

//show availability: GET #7.1
router.get('/:id/time/:t/availability', table_controller.table_availability_get);

//update availabiltity- show form: GET #7.2
router.get('/:id/time/:t/availability/edit', table_controller.table_update_availability_get);

//update availabiltity: PUT #7.3
router.put('/:id/time/:t/availability', table_controller.table_update_availability_put);

//Display details for a specefic table #3 : Must come in end
router.get('/:id', table_controller.table_details);

module.exports = router;