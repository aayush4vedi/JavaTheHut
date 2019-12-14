var express = require('express');
var router = express.Router();

//import Controller Module
var waiter_controller = require('../../controllers/waiterController');

//List all waiters GET  #1
router.get('/', waiter_controller.waiter_list);

//Display waiter create form on GET #2.1
router.get('/create', waiter_controller.waiter_create_get);

//Handle waiter create form on POST #2.2
router.post('/create', waiter_controller.waiter_create_post);

//Display waiter update form on GET #4.1
router.get('/:id/edit', waiter_controller.waiter_edit_get);

//Handle waiter update form on PUT #4.2
router.put('/:id/edit', waiter_controller.waiter_edit_put);

//Display waiter update form on DELETE #5
router.delete('/:id', waiter_controller.waiter_delete_delete);

//Display mark attendance form on GET #6.1
router.get('/:id/attendance', waiter_controller.waiter_mark_attendance_get);

//Display mark attendance form on POST #6.2
router.post('/:id/attendance', waiter_controller.waiter_mark_attendance_post);

//Display details for a specefic waiter #3 : Must come in end
router.get('/:id', waiter_controller.waiter_details);

module.exports = router;