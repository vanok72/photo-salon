import { normalize } from 'normalizr';
import { COLLECTIONS_FETCHED, COLLECTIONS_CREATED } from '../types';
import api from '../api';
import { collectionSchema } from '../schemas';

//data.entities.books
const collectionsFetched = data => ({
  type: COLLECTIONS_FETCHED,
  data,
});

const collectionCreated = data => ({
  type: COLLECTIONS_CREATED,
  data,
});

export const fetchCollections = () => dispatch =>
  api.collections
    .fetchAll()
    .then(collections =>
      dispatch(collectionsFetched(normalize(collections, [collectionSchema]))),
    );

export const createCollection = data => dispatch =>
  api.collections
    .create(data)
    .then(collection =>
      dispatch(collectionCreated(normalize(collection, collectionSchema))),
    );
