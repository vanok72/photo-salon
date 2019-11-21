import { createSelector } from 'reselect';
import { SPONSORS_FETCHED, SPONSORS_CREATED, SPONSORS_DELETED } from '../types';

export default function sponsors(state = {}, action = {}) {
  switch (action.type) {
    case SPONSORS_DELETED:
      return state;
    case SPONSORS_FETCHED:
    case SPONSORS_CREATED:
      return { ...state, ...action.data.entities.sponsors };
    default:
      return state;
  }
}

//SELECTORS

export const sponsorsSelector = state => state.sponsors;

export const allSponsorsSelector = createSelector(
  sponsorsSelector,
  sponsorsHash => Object.keys(sponsorsHash).map(itm => sponsorsHash[itm]),
);

// export const allBooksSelector = createSelector(
//     booksSelector, tags
//     booksHash, tags
// )
