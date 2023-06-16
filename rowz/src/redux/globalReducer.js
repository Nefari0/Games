const initialState = {
    notice:null,
    alert:null,
  };

  const UPDATE_NOTICE = "UPDATE_NOTICE"
  const UPDATE_ALERT = "UPDATE_ALERT"

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