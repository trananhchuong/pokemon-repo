import { combineReducers } from 'redux';
import hobbyReducer from './hobbyReducer';
import authenReducer from './authenReducer';


const rootReducer = combineReducers({
    hobby: hobbyReducer,
    authen: authenReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
