import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddCollections from '../../forms/AddCollections/AddCollections';
import { createCollection } from '../../../actions/collections';

class Collections extends Component {
  submit = data => this.props.createCollection(data);

  render() {
    return (
      <div>
        <h4>ADD YOUR NEW ALBUM HERE!</h4>
        <AddCollections submit={this.submit} />
      </div>
    );
  }
}

Collections.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  createCollection: PropTypes.func.isRequired,
};

export default connect(
  null,
  { createCollection },
)(Collections);
