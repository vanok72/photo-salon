import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { collectionByIdSelector } from '../../../reducers/collections';
import { fetchCollectionById } from '../../../actions/collections';
import EditCollection from '../../forms/EditCollection/EditCollection';
import CollectionCard from '../../CollectionCard/CollectionCard';

class EditCollectionPage extends Component {
  state = {
    loading: true,
    success: false,
    collection: {},
  };

  // componentDidMount() {
  //   debugger;
  //   this.props
  //     .fetchCollectionById(this.props.match.params.id)
  //     .then(data => this.setState({ data: data, loading: false, success: true }))
  //     .catch(() => this.setState({ loading: false, success: false }));
  // }

  componentDidMount() {
    this.onInit(this.props.match.params.id);
  }

  onInit = id => this.props.fetchCollectionById(id);

  render() {
    const { collection } = this.props;
    return collection ? (
      <CollectionCard
        Source={collection.source}
        Season={collection.season}
        Title={collection.title}
        Key={collection._id}
        onDeleteClick={() => this.delete(collection._id)}
        onUpdateClick={() => this.createCollection(collection._id)}
      />
    ) : (
      // <div>
      //   <React.Fragment>
      //     <h1>EDIT HERE</h1>
      //     <EditCollection data={this.props.data} submit={this.submit} />
      //   </React.Fragment>
      // </div>
      <div>no data</div>
    );
  }
}

EditCollectionPage.propTypes = {
  fetchCollectionById: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  collection: PropTypes.shape({
    source: PropTypes.string.isRequired,
    season: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    collection: collectionByIdSelector(state.collection),
  };
}

export default connect(
  mapStateToProps,
  { fetchCollectionById },
)(EditCollectionPage);
