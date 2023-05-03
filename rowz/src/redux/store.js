import { createStore,compose,combineReducers,applyMiddleware } from "redux";
import logger from "redux-logger";
import reduxPromiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import checkerReducer from "./checkerReducer";
import globalReducer from "./globalReducer";

const middlewares = [logger]

const rootReducer = combineReducers({
    currentPlayer:checkerReducer,
    globalReducer:globalReducer,
})

const composedEnhancers = compose(applyMiddleware(...middlewares))

export default createStore(
    rootReducer,
    undefined,
    composedEnhancers,
    // middlewares,
    // composeWithDevTools(applyMiddleware(reduxPromiseMiddleware))
);