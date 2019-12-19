import { normalize } from 'normalizr';
import {
  COLLECTIONS_FETCHED,
  COLLECTIONS_CREATED,
  COLLECTIONS_DELETED,
  COLLECTIONS_FETCHED_BY_ID,
} from '../types';
import api from '../api';
import { collectionSchema } from '../schemas';

//data.entities.books
const collectionsFetched = data => ({
  type: COLLECTIONS_FETCHED,
  data,
});

const collectionFetchedById = data => ({
  type: COLLECTIONS_FETCHED_BY_ID,
  data,
});

const collectionCreated = data => ({
  type: COLLECTIONS_CREATED,
  data,
});

const collectionDeleted = () => ({
  type: COLLECTIONS_DELETED,
});

export const setLocale = lang => dispatch => {
  localStorage.alhubLang = lang;
  dispatch(localeSet(lang));
};

export const fetchCollections = () => dispatch =>
  api.collections
    .fetchAll()
    .then(collections =>
      dispatch(collectionsFetched(normalize(collections, [collectionSchema]))),
    );

export const fetchCollectionById = id => dispatch =>
  api.collections
    .fetchById(id)
    .then(collection =>
      dispatch(collectionFetchedById(normalize(collection, collectionSchema))),
    );

export const createCollection = data => dispatch =>
  api.collections
    .create(data)
    .then(collection =>
      dispatch(collectionCreated(normalize(collection, collectionSchema))),
    );

export const deleteCollection = id => dispatch => {
  api.collections.delete(id);
  dispatch(collectionDeleted());
};
