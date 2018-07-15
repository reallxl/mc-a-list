const ACTION = Object.freeze({
  //--- database
  _ADD: 'ADD',
  _UPDATE: 'UPDATE',
  _DELETE: 'DELETE',
  //--- display
  _REFRESH: 'REFRESH',
  _PUT_ON: 'PUT_ON',
  _RERENDER: 'RERENDER',
  _TAKE_OFF: 'TAKE_OFF',
  _SELECT: 'SELECT',
  _SORT: 'SORT',
  //--- period
  _SET_PERIOD_TYPE: '_SET_PERIOD_TYPE',
  _SHIFT_PERIOD: 'SHIFT_PERIOD',
});

export default ACTION;
