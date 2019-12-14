var express = require('express');
var router = express.Router();

//import Controller Module
var cook_controller = require('../../controllers/cookController');

//List all cooks GET  #1
router.get('/', cook_controller.cook_list);

//Display cook create form on GET #2.1
router.get('/create', cook_controller.cook_create_get);

//Handle cook create form on POST #2.2
router.post('/create', cook_controller.cook_create_post);

//Display cook update form on GET #4.1
router.get('/:id/edit', cook_controller.cook_edit_get);

//Handle cook update form on PUT #4.2
router.put('/:id/edit', cook_controller.cook_edit_put);

//Display cook update form on DELETE #5
router.delete('/:id', cook_controller.cook_delete_delete);

//Display mark attendance form on GET #6.1
router.get('/:id/attendance', cook_controller.cook_mark_attendance_get);

//Display mark attendance form on POST #6.2
router.post('/:id/attendance', cook_controller.cook_mark_attendance_post);

//Display details for a specefic cook #3 : Must come in end
router.get('/:id', cook_controller.cook_details);

module.exports = router;