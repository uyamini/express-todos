var express = require('express');
var router = express.Router();
var todosCtrl = require('../controllers/todos');

// All actual paths start with "/todos"
//GET /todos
router.get('/', todosCtrl.index);

// GET /todos/new
router.get('/new', todosCtrl.new);

//GET /todos/:id
router.get('/:id', todosCtrl.show);

// GET /todos/new   <-- this new route cannot not stay here! If new was defined after the show route, then the text of "new" in the URL of the request, e.g., https://localhost:3000/todos/new would match the :id route parameter defined in the "show" route causing the todosCtrl.show function to run instead of the intended todosCtrl.new function.

//GET /todos/:id/edit
router.get('/:id/edit', todosCtrl.edit);

//POST /todos/create
router.post('/', todosCtrl.create);

//DELETE /todos/:id
router.delete('/:id', todosCtrl.delete);

//PUT /todos/:id
router.put('/:id', todosCtrl.update);

module.exports = router;
