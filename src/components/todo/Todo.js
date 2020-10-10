  
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Todo = ({todo, i, markAsDone, deleteTask}) => {
  
  const handleMarkAsDone = (event, index, id) => {
    console.log("index");
    console.log(index);
    console.log("id");
    console.log(id);
    markAsDone(index, id);
  }

  const handleDelete = (event, index, id) => {
    console.log("index");
    console.log(index);
    console.log("id");
    console.log(id);
    deleteTask(index, id);
  }

  return (
    <>
              <tr key={todo.id} style={{backgroundColor: todo.status == 'pending' ? 'white' : 'grey'}}>
              <td>#{(i + 1)}</td>
              <td>{todo.description}</td>
              <td>
                {todo.status == 'pending' && (
                  <input type="button" value="terminado?" onClick={(event) => handleMarkAsDone(event, i, todo.id)}/>
                )}
                <input type="button" value="eliminar" onClick={(event) => handleDelete(event, i, todo.id)}/>
              </td>
              </tr>
    </>
  );
  
};


export default Todo;