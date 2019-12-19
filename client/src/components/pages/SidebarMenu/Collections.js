import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddCollections from '../../forms/AddCollections/AddCollections';
import { allCollectionsSelector } from '../../../reducers/collections';
import {
  createCollection,
  fetchCollections,
  deleteCollection,
} from '../../../actions/collections';
import CollectionCard from '../../CollectionCard/CollectionCard';
import { CardGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Collections extends Component {
  state = {
    show: false,
  };

  async componentDidMount() {
    await this.onInit(this.props);
  }

  onInit = props => props.fetchCollections();

  submit = data => this.props.createCollection(data);

  delete = id => this.props.deleteCollection(id);

  handleOpen = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  render() {
    const { collections } = this.props;

    return (
      <div>
        <div>
          {collections.length && (
            <CardGroup>
              {collections.map(collection => {
                return (
                  <CollectionCard
                    Source={collection.source}
                    Season={collection.season}
                    Title={collection.title}
                    key={collection._id}
                    Id={collection._id}
                    onDeleteClick={() => this.delete(collection._id)}
                    onUpdateClick={() => this.createCollection(collection._id)}
                  />
                );
              })}
            </CardGroup>
          )}
          <h4>ADD YOUR NEW ALBUM HERE!</h4>
          <Button
            as={Link}
            to="/Collections/new"
            variant="outline-secondary"
            type="button"
          >
            +++++
          </Button>
          {/* <AddCollections submit={this.submit} /> */}
        </div>
      </div>
    );
  }
}

Collections.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  createCollection: PropTypes.func.isRequired,
  fetchCollections: PropTypes.func.isRequired,
  deleteCollection: PropTypes.func.isRequired,
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      season: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    collections: allCollectionsSelector(state),
  };
}

export default connect(
  mapStateToProps,
  { createCollection, fetchCollections, deleteCollection },
)(Collections);
