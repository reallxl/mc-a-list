const ACTION = Object.freeze({
  //--- database
  _ADD: 'ADD',
  _UPDATE: 'UPDATE',
  _DELETE: 'DELETE',
  //--- display_period
  _SET_PERIOD_TYPE: '_SET_PERIOD_TYPE',
  _SET_PERIOD: 'SET_PERIOD',
  _SHIFT_PERIOD: 'SHIFT_PERIOD',
  //--- display
  _RELOAD: 'RELOAD',
  _RENDER: 'RENDER',
  _RE_RENDER: 'RE_RENDER',
  _HIDE: 'HIDE',
  _SELECT: 'SELECT',
  _SORT: 'SORT',
});

export default ACTION;
