import { THEME_SET } from '../types';

export const themeSet = theme => ({
  type: THEME_SET,
  theme,
});

export const setTheme = theme => dispatch => {
  localStorage.alhubTheme = theme;
  dispatch(themeSet(theme));
};
