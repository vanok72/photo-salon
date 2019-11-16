import { schema } from 'normalizr';

export const bookSchema = new schema.Entity('books', {}, { idAttribute: '_id' });
export const sponsorSchema = new schema.Entity('sponsors', {}, { idAttribute: '_id' });
