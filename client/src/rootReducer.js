import { combineReducers } from 'redux';
import user from './reducers/user';
import books from './reducers/books';
import collections from './reducers/collections';
import characters from './reducers/characters';
import locale from './reducers/locale';
import theme from './reducers/theme';
import formErrors from './reducers/formErrors';

export default combineReducers({
  user,
  books,
  collections,
  characters,
  locale,
  theme,
  formErrors,
});
