import React, { useState } from 'react';

const Create = ({addTodo}) => {

  const [todo, setTodo] = useState('');

  const handleTodoChange = (event) => {
    let val = event.target.value;
    setTodo(val);
  }
  
  // el evento de creación es envíado al padre
  const handleCreateClick = (event) => {
    addTodo(todo);
    setTodo('');
  }

  return (
    <div>
      <label htmlFor="create-form"></label>
      <input 
        type="text" 
        value={todo} 
        id="create-form"
        onChange={handleTodoChange}/>
      <input type="button" value="Create" onClick={handleCreateClick}/>
    </div>
  )
}

export default Create;