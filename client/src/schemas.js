import { schema } from 'normalizr';

export const bookSchema = new schema.Entity('books', {}, { idAttribute: '_id' });
export const sponsorSchema = new schema.Entity('sponsors', {}, { idAttribute: '_id' });
export const collectionSchema = new schema.Entity(
  'collections',
  {},
  { idAttribute: '_id' },
);
