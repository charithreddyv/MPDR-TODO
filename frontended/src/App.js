import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Button, CardColumns, Modal, Form } from 'react-bootstrap';
import TodoItem from './components/todoitems';


function App() {
  const [todolist, settodo] = useState([]);
  const [itemShow, setItemShow] = useState(false);
  const [todoItem, setTodoItem ] = useState({title: '', description: '', completed: false})
  
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

  const createTodoItem = () => {
    axios.post('todos/', {"todo": todoItem})
    .then(res => {
      settodo([...todolist, res.data])
      setItemShow(false)
      setTodoItem({title: '', description: '', completed: ''})
    })
    .catch(err => setItemShow(false))
  }

  const resetEdited = (data) => {
    settodo(
      todolist.map(todo => {
        if (todo.id === data.id) {
          return {...todo, ...data.todo}
        }
        else {
          return todo
        }
      })
    )
  }

  return (
    <div>
      <Button  onClick={() => setItemShow(true)} style={{marginLeft: '50%', marginTop: '10px', marginBottom: '10px'}}>Add TODO Item</Button>
      <br />
        <CardColumns style={{marginLeft: '12px', marginRight: '12px'}}>
        {
          todolist.map(data =>{
            return <TodoItem  key={data.id} data={data}  deleteitem={(id) => deleteitem(id)} editTodo={(data) => resetEdited(data) }/>
          } 
            )
        }
        </CardColumns>
        <Modal show={itemShow}>
          <Modal.Header>
            <Modal.Title>create Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label> Title: </Form.Label>
                <Form.Control type="text" placeholder="Enter Title" value={todoItem.title || ''} onChange={(e) => setTodoItem({...todoItem, title: e.target.value})}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description: </Form.Label>
                <Form.Control type="text" placeholder="Description" value={todoItem.description || ''} onChange={(e) => setTodoItem({...todoItem, description: e.target.value})}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='outline-danger' onClick={() => setItemShow(false)}>Close</Button>
            <Button variant='outline-primary' onClick={createTodoItem}> Save </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default App;
