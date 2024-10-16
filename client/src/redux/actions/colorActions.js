// redux/actions/colorActions.js
export const CHANGE_COLOR = "CHANGE_COLOR";

export const changeColor = (color) => ({
  type: CHANGE_COLOR,
  payload: color,
});
