import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddSponsors from '../../forms/AddSponsors/AddSponsors';
import { createSponsor } from '../../../actions/sponsors';

class Sponsors extends Component {
  submit = data =>
    this.props.createSponsor(data);

  render() {
    return (
      <div>
        <h4>SPONSORS MANAGEMENT</h4>
        <AddSponsors submit={this.submit} />
      </div>
    );
  }
}

Sponsors.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  createSponsor: PropTypes.func.isRequired,
};

export default connect(
  null,
  { createSponsor },
)(Sponsors);
