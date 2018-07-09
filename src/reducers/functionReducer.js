import FUNC from '../definitions/functions';

const initState = {

};

const functionReducer = (state = initState, action) => {
  switch (action.type) {
    case FUNC._ALIGN:
      break;
    case FUNC._FILTER:
      break;
    case FUNC._LAYOUT:
      break;
    default:
      break;
  }

  return state;
};

export default functionReducer;
