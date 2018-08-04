import ACTION from '../actionTypes';

//----------------------------------------------------------------------------------------------------
// reducer
//----------------------------------------------------------------------------------------------------
const initState = {
  //--- modal editor
  isModalEditorActivated: false,
  curContent: {},
  //--- embedded editor
  curEmbeddedEditorId: undefined,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION._OPEN_MODAL_EDITOR: return openModalEditor(state, action);
    case ACTION._CLOSE_MODAL_EDITOR: return closeModalEditor(state, action);
    case ACTION._OPEN_EMBEDDED_EDITOR: return openEmbeddedEditor(state, action);
    case ACTION._CLOSE_EMBEDDED_EDITOR: return closeEmbeddedEditor(state, action);
    default: return state;
  }
};

export default reducer;

//----------------------------------------------------------------------------------------------------
// openModalEditor
//----------------------------------------------------------------------------------------------------
const openModalEditor = (state, action) => {
  return {
    ...state,
    isModalEditorActivated: true,
    curContent: action.content,
  };
};
//----------------------------------------------------------------------------------------------------
// closeModalEditor
//----------------------------------------------------------------------------------------------------
const closeModalEditor = (state, action) => {
  return {
    ...state,
    isModalEditorActivated: false,
    curContent: {},
  };
};
//----------------------------------------------------------------------------------------------------
// openEmbeddedEditor
//----------------------------------------------------------------------------------------------------
const openEmbeddedEditor = (state, action) => {
  return {
    ...state,
    curEmbeddedEditorId: action.id,
  };
};
//----------------------------------------------------------------------------------------------------
// closeEmbeddedEditor
//----------------------------------------------------------------------------------------------------
const closeEmbeddedEditor = (state, action) => {
  return {
    ...state,
    curEmbeddedEditorId: undefined,
  };
};
