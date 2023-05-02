// import axios from "axios";

const initialState = {
  currentPlayer: {}
};

const UPDATE_PLAYER = "UPDATE_PLAYER"

export function updatePlayer(val) {
  return {
    type: UPDATE_PLAYER,
    payload: val
  };
}

export default function checkerReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYER:
      return {
        ...state,
        currentPlayer: action.payload
      };
    default:
      return state;
  }
}