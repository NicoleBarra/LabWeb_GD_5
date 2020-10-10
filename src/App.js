import React, {useState, useEffect} from 'react';
import Create from './components/todo/Create';
import TodoList from './components/todo/TodoList';
import Todo from './components/todo/Todo';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

function App() {
  
  useEffect(() => {
    fetchTodos();
    console.log("FETCH");
  }, []);

  const fetchTodos = async () => {
    await axios("http://localhost:8000/").then((res) => {
      console.log(res.data);
      setTodos(res.data);
    });
    //setTodos(result.data);
  };

  const [todos, setTodos] = useState([
    { id:'1', description:'limpiar arenero', status: 'pending'},
    { id:'2', description:'hacerme bolita', status: 'pending'},
  ]);

  useEffect(() => {
    axios("http://localhost:8000/")
      .then((result) => {
        console.log(result);
        setTodos(result.data);
        
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });
  }, []);


  const addTodo = async (description) => {
    let cTodos = Object.assign([], todos);

    await axios.post("http://localhost:8000/tasks", {
        description: description
      }
    )
      .then((result) => {
        console.log(result);
        cTodos.push({
          id: result.data.id,
          description: description,
          status: "pending",
        });
        
      })
      .catch((error) => {
        console.log("There was an error: ", error);
      });
    
    setTodos(cTodos);
    console.log(todos);
    console.log(cTodos);
  }

  const markAsDone = async (task, id) => {
    console.log("id");
    console.log(id);
    let cTodos = Object.assign([], todos);

    await axios.post("http://localhost:8000/done", {
      id:id
    }
  )
    .then((result) => {
      console.log(result);
      
    })
    .catch((error) => {
      console.log("There was an error: ", error);
    });
    
    cTodos[task].status = 'done';
    setTodos(cTodos);
    console.log(todos);
  };

  const deleteTask = async (task, id) => {
    let cTodos = Object.assign([], todos);
    
    cTodos.splice(task, 1);
    setTodos(cTodos);

    await axios.post("http://localhost:8000/delete",  {id: id }
  )
    .then((result) => {
      console.log(result);
      
    })
    .catch((error) => {
      console.log("There was an error: ", error);
    });
    fetchTodos();
    console.log(todos);

  }

  return (
      <BrowserRouter>
        <div>
            <Switch>
            <Route exact path="/">
                <h1>Todo list</h1>
                <Create addTodo={addTodo}/>
                <TodoList todos={todos} markAsDone={markAsDone} deleteTask={deleteTask} />
          
              </Route>
              <Route exact path="/tasks/:id">
                <Todo todos={todos} />
              </Route>
            </Switch>
          
        </div>
      </BrowserRouter>
    );
}

export default App;