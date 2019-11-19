import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddSponsors from '../../forms/AddSponsors/AddSponsors';

import { allSponsorsSelector } from '../../../reducers/sponsors';
import { createSponsor, fetchSponsors } from '../../../actions/sponsors';
import SponsorCard from '../../SponsorCard/SponsorCard';
import { CardGroup } from 'react-bootstrap';

class Sponsors extends Component {
  async componentDidMount() {
    await this.onInit(this.props);
  }

  onInit = props => props.fetchSponsors();

  submit = data => this.props.createSponsor(data);

  render() {
    const { sponsors } = this.props;
    const mappedSponsors =
      sponsors.length &&
      _.sortBy(sponsors, 'priority').map(sponsor => {
        return (
          <SponsorCard Source={sponsor.source} Title={sponsor.title} key={sponsor._id} />
        );
      });

    return (
      <div>
        {sponsors.length && <CardGroup>{mappedSponsors}</CardGroup>}
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

  fetchSponsors: PropTypes.func.isRequired,
  sponsors: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      priority: PropTypes.number.isRequired,
      source: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    sponsors: allSponsorsSelector(state),
  };
}

export default connect(
  mapStateToProps,
  { createSponsor, fetchSponsors },
)(Sponsors);
