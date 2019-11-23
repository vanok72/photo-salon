import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCollectionById } from '../../../actions/collections';
import EditCollection from '../../forms/EditCollection/EditCollection';

class EditCollectionPage extends Component {
  state = {
    data: {
      title: '',
      source: '',
      season: '',
    },
    loading: true,
    success: false,
  };

  componentDidMount() {
    debugger;
    this.props
      .fetchCollectionById(this.props.match.params.id)
      .then(data => this.setState({ data: data, loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    return (
      <div>
        <React.Fragment>
          <h1>EDIT HERE</h1>
          <EditCollection data={this.state.data} submit={this.submit} />
        </React.Fragment>
      </div>
    );
  }
}

EditCollectionPage.propTypes = {
  fetchCollectionById: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  null,
  { fetchCollectionById },
)(EditCollectionPage);
