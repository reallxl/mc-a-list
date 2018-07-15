import ACTION from '../actionTypes';
import RANGE from '../../definitions/ranges';

import { sortTodos, getLocalDate, getDateStr } from './utility';

//----------------------------------------------------------------------------------------------------
// reducer
//----------------------------------------------------------------------------------------------------
const initState = {
  period: {
    type: RANGE._DAY,
    fromDate: getDateStr(getLocalDate()),
    toDate: getDateStr(getLocalDate()),
  },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION._SET_PERIOD_TYPE: return setPeriodType(state, action);
    case ACTION._SHIFT_PERIOD: return updatePeriod(state, action);
    default: return state;
  }
};

export default reducer;

//----------------------------------------------------------------------------------------------------
// setPeriodType
//----------------------------------------------------------------------------------------------------
const setPeriodType = (state, action) => {
  if (action.periodType !== state.period.type ||
    //--- switch to explicitly specified date
    (action.periodType === RANGE._DAY && action.date)) {
    const today = getLocalDate();
    let fromDate, toDate;

    switch (action.periodType) {
      default:
      case RANGE._DAY: {
        fromDate = toDate = action.date ? new Date(action.date) : today;
        break;
      }
      case RANGE._WEEK: {
        fromDate = new Date(new Date(today).setDate(today.getDate() - today.getDay()));
        toDate = new Date(new Date(today).setDate(today.getDate() + (6 - today.getDay())));
        break;
      }
      case RANGE._MONTH: {
        fromDate = new Date(new Date(today).setDate(1));
        toDate = new Date(new Date(new Date(today).setMonth(today.getMonth() + 1)).setDate(0));
        break;
      }
      case RANGE._SEASON: {
        fromDate = new Date(new Date(new Date(today).setMonth(Math.floor(today.getMonth() / 3) * 3)).setDate(1));
        toDate = new Date(new Date(new Date(today).setMonth((Math.floor(today.getMonth() / 3) + 1) * 3)).setDate(0));
        break;
      }
    }

    state = {
      ...state,
      period: {
        type: action.periodType,
        fromDate: getDateStr(fromDate),
        toDate: getDateStr(toDate),
      },
    };
  }

  return state;
};
//----------------------------------------------------------------------------------------------------
// updatePeriod
//----------------------------------------------------------------------------------------------------
const updatePeriod = (state, action) => {
  const offset = action.dir === RANGE._PREV ? -1 : 1;
  let fromDate = new Date(state.period.fromDate),
    toDate = new Date(state.period.toDate);

  switch (state.period.type) {
    case RANGE._DAY: {
      fromDate = toDate = new Date(fromDate.setDate(fromDate.getDate() + offset));
      break;
    }
    case RANGE._WEEK: {
      fromDate = new Date(fromDate.setDate(fromDate.getDate() + 7 * offset));
      toDate = new Date(toDate.setDate(toDate.getDate() + 7 * offset));
      break;
    }
    case RANGE._MONTH: {
      fromDate = new Date(fromDate.setMonth(fromDate.getMonth() + offset));
      toDate = action.dir === RANGE._PREV ?
        new Date(toDate.setDate(0)) :
        new Date(new Date(toDate.setMonth(toDate.getMonth() + 2 * offset)).setDate(0));
      break;
    }
    case RANGE._SEASON: {
      fromDate = new Date(fromDate.setMonth(fromDate.getMonth() + 3 * offset));
      toDate = action.dir === RANGE._PREV ?
        new Date(new Date(toDate.setMonth(toDate.getMonth() + 3 * offset + 1)).setDate(0)) :
        new Date(new Date(toDate.setMonth(toDate.getMonth() + 4 * offset)).setDate(0));
      break;
    }
    default: {
      break;
    }
  }

  return {
    ...state,
    period: {
      ...state.period,
      fromDate: getDateStr(fromDate),
      toDate: getDateStr(toDate),
    },
  };
}
