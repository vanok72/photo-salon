import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createCollection } from '../../../actions/collections';
import AddCollections from '../../forms/AddCollections/AddCollections';

class NewCollectionPage extends Component {
  //   state = {
  //     book: null,
  //   };

  submit = data => this.props.createCollection(data);

  render() {
    return (
      <div>
        <React.Fragment>
          <h1>Add new album to your collection</h1>
          <AddCollections submit={this.submit} />
        </React.Fragment>
      </div>
    );
  }
}

NewCollectionPage.propTypes = {
  createCollection: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  null,
  { createCollection },
)(NewCollectionPage);
