import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Button, CardColumns } from 'react-bootstrap';
import TodoItem from './components/todoitems';


function App() {
  const [todolist, settodo] = useState([]);
  
  useEffect( () => {
    axios.get('todos')
      .then(res => {
        settodo(res.data);
      })
      .catch(err => {
        console.log(err)
      })

  },[])
  const deleteitem = (id) => {
    axios.delete('todo/'+ id)
    .then(res => {
      settodo(todolist.filter(item => item.id !== id))
    })
    .catch(err => console.log(err))
  }
  return (
    <div>
      <Button style={{marginLeft: '50%', marginTop: '10px', marginBottom: '10px'}}>Add TODO Item</Button>
      <br />
        <CardColumns style={{marginLeft: '12px', marginRight: '12px'}}>
        {
          todolist.map(data =>{
            return <TodoItem  key={data.id} data={data}  deleteitem={(id) => deleteitem(id)}/>
          } 
            )
        }
        </CardColumns>
    </div>
  );
}

export default App;
