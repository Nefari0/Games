import { createStore,combineReducers,applyMiddleware } from "redux";
import reduxPromiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import checkerReducer from "./checkerReducer";

const rootReducer = combineReducers({
    currentPlayer:checkerReducer
})

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(reduxPromiseMiddleware))
);