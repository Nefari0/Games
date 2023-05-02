import { createStore,combineReducers,applyMiddleware } from "redux";
import reduxPromiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import checkerReducer from "./checkerReducer";
import globalReducer from "./globalReducer";

const rootReducer = combineReducers({
    currentPlayer:checkerReducer,
    globalReducer:globalReducer,
})

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(reduxPromiseMiddleware))
);