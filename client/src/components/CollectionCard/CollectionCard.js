import React from 'react';
import { Button, Card, ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CollectionCard = props => (
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
          <Button variant="danger" onClick={props.onDeleteClick}>
            Delete{' '}
          </Button>
        </ButtonToolbar>
      </Card.Body>
    </Card>
  </div>
);

CollectionCard.propTypes = {
  Season: PropTypes.string.isRequired,
  Source: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CollectionCard;
