const initialState = {
    notice:null,
    alert:null,
    devToolsOn:false
  };

  const UPDATE_NOTICE = "UPDATE_NOTICE"
  const UPDATE_ALERT = "UPDATE_ALERT"
  const UPDATE_DEV_TOOLS = "UPDATE_DEV_TOOLS"

  export function updateDevTools(param) {
    return {
      type:UPDATE_DEV_TOOLS,
      payload:!param
    }
  }

  export function updateNotice(param) { // Parameter may be text or null
    return {
        type:UPDATE_NOTICE,
        payload:param
    }
  }

  export function updateAlert(param) { // Parameter may be text or null
    return {
        type:UPDATE_ALERT,
        payload:param
    }
  }

  export default function globalReducer(state = initialState,action) {
      switch(action.type) {
        case UPDATE_DEV_TOOLS:
          return {
            ...state,
            devToolsOn:action.payload
          }
        case UPDATE_NOTICE:
          return {
            ...state,
            notice:action.payload
          };
        case UPDATE_ALERT:
          return {
            ...state,
            alert:action.payload
          }
        default:
            return state;
    }
  }