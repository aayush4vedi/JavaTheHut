var express = require('express');
var router = express.Router();

//import Controller Module
var employee_controller = require('../controllers/employeeController');

//List all employees GET  #1
router.get('/', employee_controller.employee_list);

//Display employee crete form on GET #2.1
router.get('/create', employee_controller.employee_create_get);

//Handle employee crete form on POST #2.2
router.post('/create', employee_controller.employee_create_post);

//Display employee update form on GET #4.1
router.get('/:id/edit', employee_controller.employee_edit_get);

//Handle employee update form on PUT #4.2
router.put('/:id/edit', employee_controller.employee_edit_put);

//Display employee update form on DELETE #5
router.delete('/:id', employee_controller.employee_delete_delete);

//Display mark attendance form on GET #6.1
router.get('/:id/attendance', employee_controller.employee_mark_attendance_get);

//Display mark attendance form on POST #6.2
router.post('/:id/attendance', employee_controller.employee_mark_attendance_post);

//Display details for a specefic employee #3 : Must come in end
router.get('/:id', employee_controller.employee_details);

module.exports = router;