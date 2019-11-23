import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Loader from '../../Loader/Loader';
import styles from '../../forms/AddCollections/AddCollections.less';

class UpdateCollection extends React.Component {
  state = {
    data: {
      title: '',
      source: '',
      season: '',
    },
    loading: false,
    errors: {},
    show: false,
  };

  handleOpen = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  render() {
    const { data, errors, loading, show } = this.state;
    return (
      <div>
        <Button variant="primary" onClick={this.handleOpen}>
          Launch demo modal
        </Button>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Insert your changes here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {' '}
            <Form onSubmit={this.onSubmit}>
              {loading && <Loader isUseWall />}
              {errors.global && (
                <Alert key="collections_1_key" variant="danger">
                  <Alert.Heading>Something went wrong! You got an error!</Alert.Heading>
                  <p>{errors.global}</p>
                </Alert>
              )}
              <Form.Group controlId="source">
                <Form.Label>Link for image</Form.Label>
                <Form.Control
                  type="text"
                  name="source"
                  value={data.source}
                  onChange={this.onChange}
                  isInvalid={!!errors.source}
                  placeholder="Enter Link For An Image"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.source}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="title">
                <Form.Label>Enter title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={this.onChange}
                  isInvalid={!!errors.title}
                  placeholder="Enter Album's Title"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="season">
                <Form.Label>Season</Form.Label>
                <Form.Control
                  type="text"
                  name="season"
                  value={data.season}
                  onChange={this.onChange}
                  isInvalid={!!errors.season}
                  placeholder="Enter season of the album"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.season}
                </Form.Control.Feedback>
              </Form.Group>
              {/* {errors.password && <InlineError text={errors.password} />} */}
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button className={styles.red} variant="success" type="submit">
                Update Info
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

UpdateCollection.propTypes = {
  Season: PropTypes.string.isRequired,
  Source: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default UpdateCollection;
