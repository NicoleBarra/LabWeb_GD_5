function storeTask() {
  console.log('Stores the tasks');
  // Javascript
  let taskDescription = document.getElementById('task_description').value;
  console.log('taskDescription', taskDescription);

  let payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ description: taskDescription })
  };
  fetch('/tasks', payload)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then(task => {
      document.getElementById('task_description').value = '';
      addTask(task);
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

function addTask(task) {
  let html =
  `
  <div id="${task.id}" class="card my-3">
    <div class="card-body">
      <p class="card-text">${task.description}</p>
        <a href="javascript:;"  onclick="doneTask(${task.id});"  class="card-link">Done</a>
        <a href="javascript:;"  onclick="deleteTask(${task.id});"  class="card-link">Delete</a>
    </div>
  </div>
  `;
  let node = document.createRange().createContextualFragment(html);
  document.getElementById('task_list').prepend(node);
}

function doneTask(taskId) {

  console.log("taskId");
  console.log(taskId);

  let payload = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: taskId })
  };
  fetch('/done', payload)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax a done";
      }
    })
    .then(task => {
      let html =
      `
      <div id="${task.id}" class="card my-3 bg-light">
      <div class="card-body">
        <p class="card-text">${task.description}</p>
        <a href="javascript:;"  onclick="deleteTask(${task.id});"  class="card-link">Delete</a>
      </div>
      </div>
      `;
      console.log("html new");
      console.log(html);
      document.getElementById(taskId).innerHTML = html;
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

function deleteTask(taskId) {

  console.log("taskId");
  console.log(taskId);

  let payload = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: taskId })
  };
  fetch('/delete', payload)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax a done";
      }
    })
    .then(task => {
      console.log(taskId);
      var div = document.getElementById(taskId);
      div.parentNode.removeChild(div);
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

