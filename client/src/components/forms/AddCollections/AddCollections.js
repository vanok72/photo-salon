import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Alert } from 'react-bootstrap';
import Loader from '../../Loader/Loader';
import styles from './AddCollections.less';


class AddCollections extends React.Component {
  state = {
    data: {
      title: '',
      source: '',
      season: '',
    },
    loading: false,
    errors: {},
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false }),
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.source) errors.source = 'Invalid link';
    if (!data.title) errors.title = 'Invalid title';
    if (!data.season) errors.season = 'Invalid season';
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
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
          <Form.Control.Feedback type="invalid">{errors.source}</Form.Control.Feedback>
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
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
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
          <Form.Control.Feedback type="invalid">{errors.season}</Form.Control.Feedback>
        </Form.Group>
        {/* {errors.password && <InlineError text={errors.password} />} */}

        <Button className={styles.red} variant="outline-success" type="submit">
          ADD ALBUM
        </Button>
      </Form>
    );
  }
}

AddCollections.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default AddCollections;
