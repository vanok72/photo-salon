import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import Loader from '../../Loader/Loader';
import styles from './AddSponsors.less';

class AddSponsors extends React.Component {
  state = {
    data: {
      source: '',
      title: '',
      priority: 0,
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

debugger;
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false }),
        ).then(() => this.setState({ loading: false }) );

    }
  };

  validate = data => {
    const errors = {};
    if (!data.source) errors.source = 'Invalid link';
    if (!data.title) errors.title = "Invalid title";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        {loading && <Loader isUseWall />}
        {errors.global && (
          <Alert key="sponsors_1_key" variant="danger">
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
            placeholder="Enter Link"
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
            placeholder="Enter Information About Sponsor"
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="priority">
          <Form.Label>Number Of Priority</Form.Label>
          <Form.Control
            type="number"
            name="priority"
            value={data.priority}
            onChange={this.onChange}
            isInvalid={!!errors.priority}
            placeholder="Enter Information About Sponsor"
          />
          <Form.Control.Feedback type="invalid">{errors.priority}</Form.Control.Feedback>
        </Form.Group>
        {/* {errors.password && <InlineError text={errors.password} />} */}

        <Button className={styles.red} variant="outline-success" type="submit">
          ADD SPONSOR
        </Button>
      </Form>
    );
  }
}

AddSponsors.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default AddSponsors;
