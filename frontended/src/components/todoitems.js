import React from 'react'
import { Card, Button, Row} from 'react-bootstrap';

const todoItem = (props) => {
  return (
        <Card bg="white" text='grey' border="primary"  style={{width: '28rem', paddingLeft: '10px'}}>
                <Card.Body>
                  <Card.Title>
                    {props.data.title}
                  </Card.Title>
                <Card.Text style={{textAlign: 'center'}}>{props.data.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Button variant="outline-primary" size="sm" style={{marginRight: "10px"}}>Edit</Button>
                    <Button variant="outline-danger"  size="sm" onClick={() => props.deleteitem(props.data.id)} style={{marginLeft: 'auto'}}> Delete</Button>
                  </Row>
                </Card.Footer>
              </Card>
  );
}

export default todoItem;