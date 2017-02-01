import constants from '../constants';
// import navigationSettings from '../content/config/navigation';
// let windowState = (window && window.__padmin && window.__padmin.navigation) ? window.__padmin.navigation : {};
//TODO - if we want to use default navigation move to navigation reducer
const initialState = {
  sidebar_is_open: false,
  ui_is_loaded: false,
  nav_ui_is_loaded: false,
  app_container_ui_is_loaded: false,
  login_ui_is_loaded: false,
  header_ui_is_loaded: false,
  footer_ui_is_loaded: false,
  error_ui_is_loaded: false,
  app_data: {},
};

var containers;
var components;

const uiReducer = (state, action) => {
  switch (action.type) {
  case constants.ui.SET_UI_LOADED:
    var uiStatePayload = action.payload;
    return Object.assign({}, state, {
      ui_is_loaded: uiStatePayload,
    });  
  case constants.ui.TOGGLE_SIDEBAR:
      // var logoutFailurePayload = action.payload;
    return Object.assign({}, state, {
      sidebar_is_open: !state.sidebar_is_open,
    });
  case constants.ui.OPEN_SIDEBAR:
      // var logoutFailurePayload = action.payload;
    return Object.assign({}, state, {
      sidebar_is_open: true,
    });
  case constants.ui.CLOSE_SIDEBAR:
      // var failurePayload = action.payload;
    return Object.assign({}, state, {
      sidebar_is_open: false,
    });
  case `INIT_${ constants.ui.LOGIN_COMPONENT }`:
    containers = Object.assign({}, state.containers);
    containers.login = {};
    return Object.assign({}, state, { containers, });
  case `INIT_${ constants.ui.MAIN_COMPONENT }`:
    components = Object.assign({}, state.components, { header: {}, footer: {}, });
    return Object.assign({}, state, { components, });
  case constants.ui.LOGIN_COMPONENT:
    if (!action.payload.success) {
      console.log('There was an error retrieving login component', action.error);
      return state;
    } else {
      containers = Object.assign({}, state.containers, { login: action.payload.settings, });
      return Object.assign({}, state, { containers, login_ui_is_loaded: true });
    }
  case constants.ui.MAIN_COMPONENT:
    if (!action.payload.success) {
      console.log('There was an error retrieving main component', action.payload.error);
      return state;
    } else {
      components = Object.assign({}, state.components);
      components.header = action.payload.settings.header || {};
      components.footer = action.payload.settings.footer || {};
      return Object.assign({}, state, { components, header_ui_is_loaded: true, footer_ui_is_loaded: true });
    }
  case `INIT_${ constants.ui.ERROR_COMPONENTS }`:
    components = Object.assign({}, state.components, { error: {}, });
    return Object.assign({}, state, { components, });
  case constants.ui.ERROR_COMPONENTS:
    if (!action.payload.success) {
      console.log('There was an error retrieving error components', action.payload.error);
      return state;
    } else {
      components = Object.assign({}, state.components, { error: action.payload.settings });
      return Object.assign({}, state, { components, error_ui_is_loaded: true });
    }
  default:
    return Object.assign(initialState, state);
  }
};

export default uiReducer;