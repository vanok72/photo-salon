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
import { CardGroup, Modal, Button } from 'react-bootstrap';
import updateCollection from '../../Modals/updateCollection/UpdateCollection';

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

  updateCollectionStepOne = id => this.props.updateCollection(id);

  handleOpen = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  render() {
    const { collections } = this.props;
    const { show } = this.state;

    return (
      <div>
        <div>
          <CardGroup>
            {collections.length &&
              collections.map(collection => {
                return (
                  <CollectionCard
                    Source={collection.source}
                    Season={collection.season}
                    Title={collection.title}
                    key={collection._id}
                    onDeleteClick={() => this.delete(collection._id)}
                    onUpdateClick={() => this.updateCollectionStepOne(collection._id)}
                  />
                );
              })}
          </CardGroup>
          <h4>ADD YOUR NEW ALBUM HERE!</h4>
          <AddCollections submit={this.submit} />
        </div>
        <div>
          <Button variant="primary" onClick={this.handleOpen}>
            Launch demo modal
          </Button>
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
  updateCollection: PropTypes.func.isRequired,
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
  { createCollection, fetchCollections, deleteCollection, updateCollection },
)(Collections);
