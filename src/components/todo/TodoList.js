import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Todo from "./Todo";

const TodoList = ({ todos, markAsDone, deleteTask }) => {


  return (
    <table border="1">
      <thead>
        <tr>
          <th>#</th>
          <th>Task</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, i) => {
          return (
           
              <Todo todo = {todo} i = {i} markAsDone={markAsDone} deleteTask={deleteTask}/>
           
          )
        })}
      </tbody>
    </table>
  );
}

export default TodoList;