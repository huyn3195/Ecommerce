import { CHANGE_COLOR } from "../actions/colorActions";

const initialState = {
  bgColor: "rgba(255, 255, 255, 0.8)",
};

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COLOR:
      return { ...state, bgColor: action.payload };
    default:
      return state;
  }
};

export default colorReducer;
