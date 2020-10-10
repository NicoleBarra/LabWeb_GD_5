const knex = require('../database/connection');

exports.PENDING = 'pending';

exports.all = () => {
  return knex
    .select('*')
    .from('tasks');
}

exports.create = (task) => {
  return knex('tasks')
    .insert({ description: task.description });
}


exports.update = (taskId, updateTask) => {
  return knex('tasks')
    .update(updateTask)
    .update('updated_at', knex.fn.now())
    .where('id', taskId);
}


exports.find = (id) => {
  return knex
    .select('*')
    .from('tasks')
    .where('id', id)
    .first();
}

exports.delete = (task) => {
  console.log("task id desu: ",task.id);
  return knex('tasks')
    .delete()
    .where('id', task.id);
}
