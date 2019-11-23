import { createSelector } from 'reselect';
import {
  COLLECTIONS_FETCHED,
  COLLECTIONS_CREATED,
  COLLECTIONS_DELETED,
  COLLECTIONS_FETCHED_BY_ID,
} from '../types';

export default function collections(state = {}, action = {}) {
  switch (action.type) {
    case COLLECTIONS_DELETED:
      return state;
    case COLLECTIONS_FETCHED:
    case COLLECTIONS_FETCHED_BY_ID:
    case COLLECTIONS_CREATED:
      return { ...state, ...action.data.entities.collections };
    default:
      return state;
  }
}

//SELECTORS

export const collectionsSelector = state => state.collections;

export const allCollectionsSelector = createSelector(
  collectionsSelector,
  collectionsHash => Object.keys(collectionsHash).map(itm => collectionsHash[itm]),
);

// export const allBooksSelector = createSelector(
//     booksSelector, tags
//     booksHash, tags
// )
