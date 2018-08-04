import { PERIOD } from '../../global/definitions/index';

import { getDateStr } from '../../global/utilities/utility';

//----------------------------------------------------------------------------------------------------
// setPeriodType
//----------------------------------------------------------------------------------------------------
export const setPeriodType = (state, action) => {
  if (action.periodType !== state.periodType) {
    const today = new Date();

    switch (action.periodType) {
      case PERIOD._DAY: return {
        ...state,
        period: {
          type: action.periodType,
          fromDate: getDateStr(),
          toDate: getDateStr(),
        },
      };
      case PERIOD._WEEK: return {
        ...state,
        period: {
          type: action.periodType,
          fromDate: getDateStr(new Date(new Date(today).setDate(today.getDate() - today.getDay()))),
          toDate: getDateStr(new Date(new Date(today).setDate(today.getDate() + (6 - today.getDay())))),
        },
      };
      case PERIOD._MONTH: return {
        ...state,
        period: {
          type: action.periodType,
          fromDate: getDateStr(new Date(new Date(today).setDate(1))),
          toDate: getDateStr(new Date(new Date(new Date(today).setMonth(today.getMonth() + 1)).setDate(0))),
        },
      };
      case PERIOD._SEASON: return {
        ...state,
        period: {
          type: action.periodType,
          fromDate: getDateStr(new Date(new Date(new Date(today).setMonth(Math.floor(today.getMonth() / 3) * 3)).setDate(1))),
          toDate: getDateStr(new Date(new Date(new Date(today).setMonth((Math.floor(today.getMonth() / 3) + 1) * 3)).setDate(0))),
        },
      };
      default: return state;
    }
  }
};
//----------------------------------------------------------------------------------------------------
// setPeriod
//----------------------------------------------------------------------------------------------------
export const setPeriod = (state, action) => {
  const period = {
    ...state.period,
    fromDate: action.fromDate,
    toDate: action.toDate,
  };

  if (action.periodType) {
    period.type = action.periodType;
  }

  return {
    ...state,
    period,
  };
};
//----------------------------------------------------------------------------------------------------
// shiftPeriod
//----------------------------------------------------------------------------------------------------
export const shiftPeriod = (state, action) => {
  const offset = action.dir === PERIOD._PREV ? -1 : 1;
  let fromDate = new Date(state.period.fromDate),
    toDate = new Date(state.period.toDate);

  switch (state.period.type) {
    case PERIOD._DAY:
      fromDate = toDate = new Date(fromDate.setDate(fromDate.getDate() + offset));
      break;
    case PERIOD._WEEK:
      fromDate = new Date(fromDate.setDate(fromDate.getDate() + 7 * offset));
      toDate = new Date(toDate.setDate(toDate.getDate() + 7 * offset));
      break;
    case PERIOD._MONTH:
      fromDate = new Date(fromDate.setMonth(fromDate.getMonth() + offset));
      toDate = new Date(new Date(new Date(fromDate).setMonth(fromDate.getMonth() + 1)).setDate(0));
      break;
    case PERIOD._SEASON:
      fromDate = new Date(fromDate.setMonth(fromDate.getMonth() + 3 * offset));
      toDate = new Date(new Date(new Date(fromDate).setMonth(fromDate.getMonth() + 3)).setDate(0));
      break;
    default:
      return state;
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
