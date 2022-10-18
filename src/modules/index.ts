import counter from "./counter";
import {combineReducers} from 'redux'

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({counter})

export default rootReducer;