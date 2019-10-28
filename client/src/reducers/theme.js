import { THEME_SET } from '../types';

export default function theme(state = { theme: 'light' }, action = {}) {
  switch (action.type) {
    case THEME_SET:
      return { theme: action.theme };
    default:
      return state;
  }
}
