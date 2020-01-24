var express = require('express');
var router = express.Router();

//import Controller Module
var tableInstance_controller = require('../../controllers/tableInstanceController');

//List all tableInstances GET  #1
router.get('/', tableInstance_controller.tableInstance_list);

//Display tableInstance create form on GET #2.1
router.get('/create', tableInstance_controller.tableInstance_create_get);

//Handle tableInstance create form on POST #2.2
router.post('/create', tableInstance_controller.tableInstance_create_post);

//Display tableInstance update form on GET #4.1
router.get('/:id/edit', tableInstance_controller.tableInstance_edit_get);

//Handle tableInstance update form on PUT #4.2
router.put('/:id', tableInstance_controller.tableInstance_edit_put);

//Display tableInstance update form on DELETE #5
router.delete('/:id', tableInstance_controller.tableInstance_delete_delete);

//Display details for a specefic tableInstance #3 : Must come in end
router.get('/:id', tableInstance_controller.tableInstance_details);

module.exports = router;