import { CATEGORY, STATUS } from '../../global/definitions/index';
import { getDateStr } from '../../global/utilities/utility';

export const _DEFAULT_CONTENT = {
  status: STATUS._ON_GOING,
  //--- tags
  category: CATEGORY._PERSONAL,
  //tags: '',
  color: '#555555',
  //--- details
  description: '',
  //place: '',
  //companion: '',
  //--- schedules
  date: getDateStr(),
  //time: '',
  //tillDate: '',
  //tillTime: '',
};

export const _CONTENT = Object.freeze({
  _TAGS: 'TAGS',
  _DETAILS: 'DETAILS',
  _SCHEDULES: 'SCHEDULES',
});
