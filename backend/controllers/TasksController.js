const Task = require('../models/Task');

exports.store = (req, res) => {
  let task = {};
  console.log(req);
  task.description = req.body.description;
  Task.create(task).then((id) => {
    console.log('Task created with id: ', id);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      Task.find(id).then((task) => res.json(task));
    } else {
      res.redirect('/');
    }
  });
}

exports.done = (req, res) => {
  let task = {};
  taskId = req.body.id;
  task.id = req.body.id;
  task.description = req.body.description;
  task.status = "done";
  let updateTask = {
    status: "done"
  }
  console.log('Task created with id: ', taskId);
  Task.update(taskId, updateTask).then((id) => {
    console.log('Task created with id: ', taskId);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      Task.find(taskId).then((task) => res.json(task));
    } else {
      res.redirect('/');
    }
  });
}

exports.delete = (req, res) => {
  console.log(req);
  let task = {};
  taskId = req.body.id;
  task.id = req.body.id;
  task.description = req.body.description;
  Task.delete(task).then((id) => {
    console.log('Task deleted with id: ', taskId);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.json(task);
    } else {
      res.redirect('/');
    }
  });
}