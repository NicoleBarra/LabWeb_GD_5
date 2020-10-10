const router = require('express').Router();
const homepageController = require('../controllers/HomepageController');
const tasksController = require('../controllers/TasksController');

router.get('/', homepageController.index);

router.post('/tasks', tasksController.store);

router.post('/done', tasksController.done);

router.post('/delete', tasksController.delete);

module.exports = router;
