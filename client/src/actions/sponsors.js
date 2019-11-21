import { normalize } from 'normalizr';
import { SPONSORS_FETCHED, SPONSORS_CREATED, SPONSORS_DELETED } from '../types';
import api from '../api';
import { sponsorSchema } from '../schemas';

//data.entities.books
const sponsorsFetched = data => ({
  type: SPONSORS_FETCHED,
  data,
});

const sponsorCreated = data => ({
    type: SPONSORS_CREATED,
    data,
  });

  const sponsorDeleted = () => ({
    type: SPONSORS_DELETED,
  });

export const fetchSponsors = () => dispatch =>
  api.sponsors
    .fetchAll()
    .then(sponsors => dispatch(sponsorsFetched(normalize(sponsors, [sponsorSchema]))));

export const createSponsor = data => dispatch =>
  api.sponsors.create(data).then(sponsor => dispatch(sponsorCreated(normalize(sponsor, sponsorSchema))));

export const deleteSponsor = id => dispatch => {
  api.sponsors.delete(id);
  dispatch(sponsorDeleted());
}
