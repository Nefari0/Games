const initialState = {
    notice:null
  };

  const UPDATE_NOTICE = "UPDATE_NOTICE"

  export function updateNotice(param) { // Parameter may be text or null
    return {
        type:UPDATE_NOTICE,
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

        default:
            return state;
    }
  }