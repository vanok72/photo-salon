import React from 'react';
import { Button, Card, ButtonToolbar } from 'react-bootstrap';

const SponsorCard = props => (
  <div>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.Source} />
      <Card.Body>
        <Card.Title>{props.Title}</Card.Title>
        <Card.Text>
          Season: <strong>{props.Season}</strong>
        </Card.Text>
        <ButtonToolbar>
          <Button variant="primary">View</Button>
          <Button variant="secondary">Edit info</Button>
          <Button variant="danger">Delete </Button>
        </ButtonToolbar>
      </Card.Body>
    </Card>
  </div>
);

export default SponsorCard;