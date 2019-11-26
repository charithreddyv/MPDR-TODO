import React, { useState } from 'react';
import { Card, Button, Row, Modal, Form} from 'react-bootstrap';
import Switch from "react-switch";
import axios from 'axios';

const TodoItem = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [todoItem, setTodoItem ] = useState({title: '', description: '', completed: ''})

  const submitEdit = (id) => {
   axios.put('todo/'+id+'/', {"todo": todoItem})
   .then(res => {
     setShowEdit(false)
     props.editTodo({todo: todoItem, id})
   })
   .catch(err => {
     console.log(err)
   })
  }

  const handleComplete = (check) => {
    setTodoItem({...todoItem, completed: check})
  }
  return (
    <div>
    <Card bg={props.data.completed ? "dark" : "white"} text={props.data.completed ? "white" : "dark"} border="primary"  style={{width: '28rem', paddingLeft: '10px'}}>
      <Card.Body>
        <Card.Title>
          {props.data.title}
        </Card.Title>
      <Card.Text style={{textAlign: 'center'}}>{props.data.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Button variant="outline-primary" size="sm" style={{marginRight: "10px"}} disabled={props.data.completed} onClick={() => {
            setTodoItem({title: props.data.title, description: props.data.description, completed: props.data.completed})
            setShowEdit(true)
          }}>Edit</Button>
          <Button variant="outline-danger"  size="sm" disabled={!props.data.completed} onClick={() => props.deleteitem(props.data.id)} style={{marginLeft: 'auto'}}> Delete</Button>
        </Row>
      </Card.Footer>
    </Card>
    <Modal show={showEdit}>
      <Modal.Header>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label> Title: </Form.Label>
            <Form.Control type="text" placeholder="Enter Title" value={todoItem.title || ''} onChange={(e)=> setTodoItem({...todoItem, title: e.target.value }) }/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description: </Form.Label>
            <Form.Control type="text" placeholder="Description"  value={todoItem.description || ''} onChange={(e)=> setTodoItem({...todoItem, description: e.target.value }) }/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Mark Complete:</Form.Label>
            <br />
            <Switch onChange={handleComplete} checked={props.data.completed}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={() => setShowEdit(false)}>Close</Button>
        <Button variant='outline-primary' onClick={() => submitEdit(props.data.id)}> Save </Button>
      </Modal.Footer>
    </Modal>
  </div> 
  );
}

export default TodoItem;